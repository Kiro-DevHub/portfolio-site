// Разовая конвертация исходников в AVIF/WebP для статического экспорта
// (images.unoptimized: true — серверного оптимизатора нет, форматы готовим заранее).
// Запуск: npm run optimize:images
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const TARGET_RATIO = 16 / 10;
const TARGET_WIDTH = 1400;

// rect — ручной кроп {left, top, width, height} под TARGET_RATIO. Без rect
// кропает по центру (по бокам, если исходник шире, иначе сверху/снизу).
async function convertCover(src, destBase, rect) {
  const image = sharp(src);
  const { width, height } = await image.metadata();

  let pipeline = image;
  if (rect) {
    pipeline = image.extract(rect);
  } else {
    const sourceRatio = width / height;
    if (sourceRatio > TARGET_RATIO) {
      const cropWidth = Math.round(height * TARGET_RATIO);
      pipeline = image.extract({
        left: Math.round((width - cropWidth) / 2),
        top: 0,
        width: cropWidth,
        height,
      });
    } else {
      const cropHeight = Math.round(width / TARGET_RATIO);
      pipeline = image.extract({
        left: 0,
        top: Math.round((height - cropHeight) / 2),
        width,
        height: cropHeight,
      });
    }
  }

  const resized = pipeline.resize(TARGET_WIDTH);

  await resized.clone().avif({ quality: 58 }).toFile(`${destBase}.avif`);
  await resized.clone().webp({ quality: 78 }).toFile(`${destBase}.webp`);
}

await mkdir("public/images/cases", { recursive: true });
await convertCover(
  "assets/source/case-maison.png",
  "public/images/cases/maison",
  // Плотный кроп по хиро: логотип + заголовок читаются даже в маленькой
  // рамке карточки на главной, вместо мелкого текста на полном скриншоте.
  { left: 0, top: 0, width: 1700, height: 1063 },
);

console.log("Готово: public/images/cases/maison.{avif,webp}");
