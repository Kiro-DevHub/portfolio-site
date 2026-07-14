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
import { fileURLToPath } from "node:url";

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

  res.writeHead(200, {
    "content-type": TYPES[extname(file).toLowerCase()] ?? "application/octet-stream",
    // Предпросмотр обязан показывать свежую сборку, а не вчерашнюю из кеша.
    "cache-control": "no-store",
  });
  createReadStream(file).pipe(res);
});

if (!(await fileAt(join(ROOT, "index.html")))) {
  console.error("serve:out — нет out/index.html. Сначала: npm run build");
  process.exit(1);
}

server.listen(PORT, HOST, () => {
  console.log(`serve:out — статика из out/ на http://${HOST}:${PORT}`);
  console.log("Раздача повторяет Cloudflare Pages: /case/maison -> case/maison.html");
});
