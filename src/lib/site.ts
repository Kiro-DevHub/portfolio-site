/**
 * Контент-сийм сайта: страницы импортируют типизированные данные отсюда,
 * а не хардкодят их у себя. Заглушки на этапе скаффолда — наполнение придёт
 * на этапах контента и дизайна.
 */

export const site = {
  name: "Кирилл",
  role: "Full-stack разработчик",
  // Telegram — основной канал связи и сквозной CTA.
  telegram: "https://t.me/", // TODO: подставить реальный ник на этапе контента
} as const;

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  /** Есть ли у кейса собственная страница-флагман (/case/<slug>), а не шаблон. */
  flagship: boolean;
};

/**
 * Список кейсов. MAISON — флагман с рукотворной страницей /case/maison.
 * Будущие кейсы (дашборд, API, Telegram-бот) поедут через шаблон /case/[slug].
 */
export const cases: CaseStudy[] = [
  {
    slug: "maison",
    title: "MAISON",
    summary: "Лендинг премиального салона красоты — тёмная тема, Lighthouse 95+.",
    flagship: true,
  },
];

/** Слаги для generateStaticParams шаблона /case/[slug] — только не-флагманы. */
export const templateCaseSlugs = cases
  .filter((c) => !c.flagship)
  .map((c) => c.slug);
