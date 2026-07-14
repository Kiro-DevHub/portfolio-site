// Проверяет, что <link rel="preload"> в layout ведут на реально существующие файлы.
//
// Зачем: next/font не проставляет преload-ссылки сам (next-font-manifest пустой,
// см. layout.tsx), поэтому они прописаны руками с хешированными именами. Если хеш
// шрифта изменится — ссылка молча начнёт вести в 404, шрифт приедет поздно, CLS
// вернётся. Тут это ломает сборку вместо тихой деградации.
import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "out");
const PAGES = ["index.html", path.join("case", "maison.html"), "404.html"];

let failed = false;

for (const page of PAGES) {
  const file = path.join(OUT, page);
  if (!existsSync(file)) {
    console.error(`✗ нет собранной страницы: ${page}`);
    failed = true;
    continue;
  }

  const html = await readFile(file, "utf8");
  const hrefs = [...html.matchAll(/rel="preload"[^>]*href="([^"]+)"/g)].map(
    (m) => m[1],
  );

  const fonts = hrefs.filter((h) => h.endsWith(".woff2"));
  if (fonts.length === 0) {
    console.error(`✗ ${page}: нет preload-ссылок на шрифты — CLS вернётся`);
    failed = true;
    continue;
  }

  for (const href of fonts) {
    const asset = path.join(OUT, href.replace(/^\//, ""));
    if (existsSync(asset)) {
      console.log(`✓ ${page}: ${href}`);
    } else {
      console.error(`✗ ${page}: preload ведёт в никуда — ${href}`);
      console.error(`  доступные шрифты: ${(await readdir(path.join(OUT, "_next/static/media"))).join(", ")}`);
      failed = true;
    }
  }
}

if (failed) {
  console.error("\nПреload-ссылки на шрифты рассинхронизировались со сборкой.");
  console.error("Обнови хеши в src/app/layout.tsx под файлы из out/_next/static/media/.");
  process.exit(1);
}

console.log("\nПреload шрифтов на месте.");
