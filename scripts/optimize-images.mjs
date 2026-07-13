// Разовая конвертация исходников в AVIF/WebP для статического экспорта
// (images.unoptimized: true — серверного оптимизатора нет, форматы готовим заранее).
// Запуск: npm run optimize:images
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const TARGET_RATIO = 16 / 10;
const TARGET_WIDTH = 1400;

async function convertCover(src, destBase) {
  const image = sharp(src);
  const { width, height } = await image.metadata();
  const sourceRatio = width / height;

  let pipeline = image;
  if (sourceRatio > TARGET_RATIO) {
    // Исходник шире целевого соотношения — обрезаем по бокам, высота остаётся.
    const cropWidth = Math.round(height * TARGET_RATIO);
    pipeline = image.extract({
      left: Math.round((width - cropWidth) / 2),
      top: 0,
      width: cropWidth,
      height,
    });
  } else {
    // Исходник выше целевого соотношения — обрезаем сверху/снизу.
    const cropHeight = Math.round(width / TARGET_RATIO);
    pipeline = image.extract({
      left: 0,
      top: Math.round((height - cropHeight) / 2),
      width,
      height: cropHeight,
    });
  }

  const resized = pipeline.resize(TARGET_WIDTH);

  await resized.clone().avif({ quality: 58 }).toFile(`${destBase}.avif`);
  await resized.clone().webp({ quality: 78 }).toFile(`${destBase}.webp`);
}

await mkdir("public/images/cases", { recursive: true });
await convertCover(
  "assets/source/case-maison.png",
  "public/images/cases/maison",
);

console.log("Готово: public/images/cases/maison.{avif,webp}");
