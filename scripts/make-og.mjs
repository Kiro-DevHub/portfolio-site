// Генератор public/og-image.png (1200×630).
//
// Прошлый раз картинку рендерили одноразовым скриптом, который не попал в репо —
// когда словознак сменился с «Кирилл.dev» на «Kiro.dev», перерисовать её было
// нечем. Теперь генератор лежит в репозитории и берёт бренд/роль из src/lib/site.ts,
// поэтому картинка и сайт не разъезжаются.
//
// Рендер идёт headless-Chrome, а не sharp/SVG: rsvg не грузит woff2 из @font-face,
// и Unbounded подменялся системным шрифтом. Шрифты вшиты data-URI — Chrome берёт
// их из самой страницы, без сети и без next/font.
//
// Запуск: npm run make:og

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("..", import.meta.url));

// Токены дублируем осознанно: тянуть globals.css сюда — это парсить @theme,
// а картинка перерисовывается раз в год. Значения обязаны совпадать с @theme.
const T = {
  bg: "#0b1018",
  fg: "#eef1f6",
  fgDim: "#a4acbe",
  muted: "#848c9f",
  accent: "#31d0b3",
  line: "#2a3750",
};

const CHROME_CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  `${process.env.LOCALAPPDATA ?? ""}/Google/Chrome/Application/chrome.exe`,
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
];

function findChrome() {
  const found = CHROME_CANDIDATES.find((p) => p && existsSync(p));
  if (!found) {
    console.error(
      "make:og — не нашёл Chrome. Пути, которые проверил:\n" +
        CHROME_CANDIDATES.map((p) => `  ${p}`).join("\n"),
    );
    process.exit(1);
  }
  return found;
}

/** Читает бренд/роль из site.ts регуляркой: тянуть TS-модуль в node — лишний шаг сборки. */
function readSite() {
  const src = readFileSync(join(root, "src/lib/site.ts"), "utf8");
  const field = (name) => {
    const m = src.match(new RegExp(`^\\s*${name}:\\s*"([^"]+)"`, "m"));
    if (!m) throw new Error(`make:og — не нашёл site.${name} в src/lib/site.ts`);
    return m[1];
  };
  return { brand: field("brand"), brandTld: field("brandTld"), role: field("role") };
}

const font = (file) =>
  `url(data:font/woff2;base64,${readFileSync(join(root, "src/lib/fonts", file)).toString("base64")}) format("woff2")`;

const { brand, brandTld, role } = readSite();

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @font-face { font-family: Unbounded; font-weight: 600; src: ${font("unbounded-600.woff2")}; }
  @font-face { font-family: Golos; font-weight: 400; src: ${font("golos-400.woff2")}; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; background: ${T.bg}; color: ${T.fg};
    font-family: Golos, sans-serif; position: relative; overflow: hidden;
    -webkit-font-smoothing: antialiased;
  }
  /* Фоновая сетка + радиальный свет акцента — те же мотивы, что в хиро. */
  .grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px),
      linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px);
    background-size: 88px 88px;
    -webkit-mask-image: radial-gradient(120% 90% at 12% 10%, #000 20%, transparent 75%);
  }
  .glow {
    position: absolute; inset: 0;
    background: radial-gradient(70% 60% at 8% 5%, rgba(49,208,179,0.16), transparent 60%);
  }
  .wrap { position: relative; padding: 80px; height: 100%; display: flex; flex-direction: column; }
  .path { font-family: ui-monospace, Consolas, monospace; font-size: 20px; color: ${T.accent}; letter-spacing: 0.02em; }
  h1 {
    font-family: Unbounded, sans-serif; font-weight: 600; font-size: 92px;
    letter-spacing: -0.03em; line-height: 1.05; margin-top: 26px;
  }
  h1 .dot { color: ${T.accent}; }
  h1 .tld { color: ${T.fgDim}; }
  .role { font-size: 30px; color: ${T.fgDim}; margin-top: 24px; }
  .chips { margin-top: auto; display: flex; gap: 14px; }
  .chip {
    font-family: ui-monospace, Consolas, monospace; font-size: 19px; color: ${T.muted};
    border: 1px solid ${T.line}; border-radius: 6px; padding: 11px 18px;
  }
</style>
<div class="grid"></div>
<div class="glow"></div>
<div class="wrap">
  <div class="path">~/${brand.toLowerCase()}.${brandTld}</div>
  <h1>${brand}<span class="dot">.</span><span class="tld">${brandTld}</span></h1>
  <div class="role">${role}</div>
  <div class="chips">
    <span class="chip">Next.js</span>
    <span class="chip">Telegram-боты</span>
    <span class="chip">PostgreSQL</span>
  </div>
</div>
`;

const page = join(tmpdir(), `og-${process.pid}.html`);
const shot = join(tmpdir(), `og-${process.pid}.png`);
writeFileSync(page, html);

try {
  execFileSync(
    findChrome(),
    [
      "--headless",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      "--default-background-color=00000000",
      "--window-size=1200,630",
      `--screenshot=${shot}`,
      `file://${page.replace(/\\/g, "/")}`,
    ],
    { stdio: "pipe" },
  );
  // Палитра вместо truecolor: на картинке плоский navy, один акцент и мягкий
  // радиальный свет — 256 цветов их держат без бандинга, а вес падает вдвое.
  const out = join(root, "public/og-image.png");
  await sharp(shot).png({ palette: true, effort: 10 }).toFile(out);
  const kb = (readFileSync(out).length / 1024).toFixed(1);
  console.log(`make:og — public/og-image.png готова: ${brand}.${brandTld}, ${kb} KB`);
} finally {
  rmSync(page, { force: true });
  rmSync(shot, { force: true });
}
