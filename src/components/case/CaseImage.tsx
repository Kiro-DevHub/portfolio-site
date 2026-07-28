import Image from "next/image";
import type { CaseImage as CaseImageData } from "@/content/cases/types";

/**
 * Скриншот кейса с AVIF→WebP-фолбэком. На статике (images.unoptimized) next/image
 * сам форматы не переключает, поэтому <source> задаём руками — как в секции кейсов
 * на главной. Явные width/height берём из данных (нет сдвига макета при загрузке).
 */
export function CaseImage({
  image,
  priority = false,
  className = "",
  intrinsic = false,
}: {
  image: CaseImageData;
  /** Обложка над фолдом — грузим сразу; галерея ниже — lazy. */
  priority?: boolean;
  /** Доп. классы для самого <img> (например, ограничение высоты). */
  className?: string;
  /**
   * Портретные скрины телефона (Mini App): без растяжения на всю ширину
   * контейнера — картинка держит собственные пропорции и ужимается, если
   * не помещается. Используется с центрирующим родителем (flex justify-center).
   */
  intrinsic?: boolean;
}) {
  return (
    <picture className={intrinsic ? "block" : undefined}>
      <source srcSet={`${image.src}.avif`} type="image/avif" />
      <source srcSet={`${image.src}.webp`} type="image/webp" />
      <Image
        src={`${image.src}.webp`}
        alt={image.alt}
        width={image.width}
        height={image.height}
        {...(priority ? { priority: true } : { loading: "lazy" as const })}
        className={`${intrinsic ? "h-auto w-auto max-w-full" : "h-auto w-full"} ${className}`.trim()}
      />
    </picture>
  );
}
