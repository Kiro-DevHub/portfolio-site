// Локальная раздача out/ так, как её отдаёт Cloudflare Pages.
//
// Зачем свой сервер, а не `python -m http.server`: при trailingSlash: false
// экспорт кладёт страницу кейса в out/case/maison.html, а ссылка на сайте ведёт
// на /case/maison. Cloudflare Pages сам дорезолвит расширение, http.server —
// нет, и клиентский предпросмотр падал бы в 404 ровно на флагманском кейсе.
//
// Правила совпадают с Pages: точный файл → path.html → index.html в каталоге →
// 404.html со статусом 404.
//
// Запуск: npm run serve:out  (порт можно задать первым аргументом)

import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize, resolve, sep } from "node:path";
import { pipeline } from "node:stream";
import { fileURLToPath } from "node:url";
import { createBrotliCompress, createGzip, constants as zlib } from "node:zlib";

const ROOT = resolve(fileURLToPath(new URL("../out", import.meta.url)));
const PORT = Number(process.argv[2] ?? process.env.PORT ?? 8125);
const HOST = "127.0.0.1"; // не localhost: см. CLAUDE.md (VPN/прокси в браузере)

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

// Сжимаем только текст. woff2/png/avif/webp уже сжаты — второй проход греет CPU
// и раздувает результат.
const COMPRESSIBLE = new Set([".html", ".css", ".js", ".json", ".svg", ".txt", ".xml"]);

/**
 * Без этого замер врёт. Cloudflare Pages отдаёт текст под brotli/gzip, а сервер
 * гнал сырьё: 742 KB вместо 193 KB. Lighthouse-mobile за это ставил 72
 * (FCP 3.8s, LCP 5.2s) — и это был артефакт стенда, а не сайта.
 */
function encoderFor(acceptEncoding, ext) {
  if (!COMPRESSIBLE.has(ext)) return null;

  // q-значения разбираем, а не ищем подстроку: "br;q=0" — это явный ОТКАЗ от
  // brotli, а наивный /\bbr\b/ видел там "br" и всё равно жал в brotli — такой
  // клиент ответ не распакует.
  const weights = new Map();
  for (const part of (acceptEncoding ?? "").split(",")) {
    const [name, ...params] = part.trim().split(";");
    if (!name) continue;
    const q = params
      .map((p) => p.trim().match(/^q=([\d.]+)$/i))
      .find(Boolean);
    weights.set(name.toLowerCase(), q ? Number(q[1]) : 1);
  }
  const accepts = (name) => (weights.get(name) ?? weights.get("*") ?? 0) > 0;

  if (accepts("br")) {
    return {
      name: "br",
      // Качество 5, не 11: у Pages ответ отдаётся из кеша, а здесь он жмётся на
      // каждый запрос. 11 добавлял бы к TTFB задержку, которой в проде нет.
      stream: createBrotliCompress({
        params: { [zlib.BROTLI_PARAM_QUALITY]: 5 },
      }),
    };
  }
  if (accepts("gzip")) return { name: "gzip", stream: createGzip({ level: 6 }) };
  return null;
}

/** Хешированные ассеты Next неизменяемы, HTML — всегда свежий. */
function cacheControlFor(urlPath) {
  return urlPath.startsWith("/_next/static/")
    ? "public, max-age=31536000, immutable"
    : "no-store";
}

/** Файл или null. Каталоги не считаем попаданием — их разбирает resolveFile. */
async function fileAt(path) {
  try {
    const s = await stat(path);
    return s.isFile() ? path : null;
  } catch {
    return null;
  }
}

/** Порядок проб — тот же, что у Cloudflare Pages. */
async function resolveFile(urlPath) {
  // normalize + префиксная проверка: без них ../../ вылезал бы за пределы out/.
  const rel = normalize(decodeURIComponent(urlPath)).replace(/^([/\\])+/, "");
  const target = resolve(ROOT, rel);
  if (target !== ROOT && !target.startsWith(ROOT + sep)) return null;

  return (
    (await fileAt(target)) ??
    (await fileAt(`${target}.html`)) ??
    (await fileAt(join(target, "index.html")))
  );
}

const server = createServer(async (req, res) => {
  const urlPath = new URL(req.url, `http://${HOST}`).pathname;
  const file = await resolveFile(urlPath);

  if (!file) {
    const notFound = await fileAt(join(ROOT, "404.html"));
    res.writeHead(404, { "content-type": TYPES[".html"] });
    if (notFound) return createReadStream(notFound).pipe(res);
    return res.end("404");
  }

  const ext = extname(file).toLowerCase();
  const enc = encoderFor(req.headers["accept-encoding"], ext);
  const headers = {
    "content-type": TYPES[ext] ?? "application/octet-stream",
    "cache-control": cacheControlFor(urlPath),
    // Ответ зависит от Accept-Encoding — без Vary промежуточный кеш может отдать
    // brotli клиенту, который его не просил.
    vary: "Accept-Encoding",
  };
  if (enc) headers["content-encoding"] = enc.name;

  res.writeHead(200, headers);
  const source = createReadStream(file);
  // pipeline, а не .pipe(): он сам рвёт всю цепочку, если клиент отвалился на
  // середине, и не оставляет висящий компрессор.
  if (enc) pipeline(source, enc.stream, res, () => {});
  else pipeline(source, res, () => {});
});

if (!(await fileAt(join(ROOT, "index.html")))) {
  console.error("serve:out — нет out/index.html. Сначала: npm run build");
  process.exit(1);
}

server.listen(PORT, HOST, () => {
  console.log(`serve:out — статика из out/ на http://${HOST}:${PORT}`);
  console.log("Раздача повторяет Cloudflare Pages: /case/maison -> case/maison.html");
});
