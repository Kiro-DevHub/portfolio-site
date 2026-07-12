/**
 * Контент-сийм сайта: страницы и секции импортируют типизированные данные отсюда,
 * а не хардкодят их у себя. Цены и услуги — из CLAUDE.md.
 */

export const site = {
  name: "Кирилл",
  role: "Full-stack разработчик",
  // Telegram — основной канал связи и сквозной CTA.
  // TODO: подставить реальный ник (сейчас плейсхолдер).
  telegramUrl: "https://t.me/username",
  telegramHandle: "@username",
  // Локед-лейбл CTA — один и тот же в шапке, хиро и футере (без дубля интента).
  ctaLabel: "Написать в Telegram",
} as const;

/** Технологии для бегущей строки между кейсами и процессом — реальный стек. */
export const technologies: string[] = [
  "Next.js",
  "React",
  "TypeScript",
  "Astro",
  "Tailwind CSS",
  "PostgreSQL",
  "Node.js",
  "aiogram",
  "Telegram Bot API",
  "Cloudflare Pages",
];

export type Service = {
  title: string;
  price: string;
  description: string;
  featured?: boolean;
};

export const services: Service[] = [
  {
    title: "Лендинг",
    price: "от 12 000 ₽",
    description:
      "Одностраничный сайт под задачу: заявки, продажи, презентация. Вёрстка с нуля, адаптив, скорость.",
  },
  {
    title: "Telegram-бот / Mini App",
    price: "по ТЗ",
    description:
      "Боты для заявок, оплат и автоматизации. Mini App: полноценное приложение внутри Telegram.",
  },
  {
    title: "Проектирование БД",
    price: "от 8 000 ₽",
    description:
      "Схема данных под проект: PostgreSQL, связи, индексы, миграции. Чтобы не переделывать потом.",
  },
  {
    title: "Комплексная разработка",
    price: "от 45 000 ₽",
    description:
      "Сайт, бэкенд и бот вместе, под ключ. Один исполнитель на весь проект.",
    featured: true,
  },
];

/**
 * Секция «Обо мне». Текст и факт-плашки согласованы с CLAUDE.md
 * (позиционирование Full-stack, без заявлений об уровне/сеньорности).
 */
export const about = {
  paragraph:
    'Full-stack разработчик, 2 года практики: реальные задачи на действующих предприятиях плюс собственные проекты, которые довожу до рабочего состояния, а не до "почти готово". Завершил обучение по направлению "Разработка веб и мультимедийных приложений". Беру задачу целиком: интерфейс, серверная логика, база данных, деплой.',
  facts: [
    { label: "Опыт", value: "2 года разработки" },
    { label: "Формат", value: "весь проект один: фронт, бэк, БД, деплой" },
    {
      label: "Образование",
      value: "Разработка веб и мультимедийных приложений",
    },
  ],
} as const;

export type SkillGroup = {
  /** Моно-лейбл колонки. */
  label: string;
  /** Строки навыков; первая — ключевая (рендерится ярче). */
  items: string[];
};

/**
 * Навыки — 4 колонки. Строка React оформлена по правилу CLAUDE.md
 * («React / Next.js — Hooks, Router, Context, SSG», сам сайт — пруф).
 * Только реальный стек проекта, без выпячивания Tailwind как отдельного пункта.
 */
export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    items: [
      "React / Next.js — Hooks, Router, Context, SSG",
      "TypeScript, строгий режим",
      "Tailwind CSS, Astro",
      "Адаптив, доступность, семантика",
    ],
  },
  {
    label: "Backend",
    items: [
      "Node.js",
      "Python, aiogram",
      "REST API, интеграции",
      "Telegram Bot API",
    ],
  },
  {
    label: "БД и инфраструктура",
    items: [
      "PostgreSQL: схема, связи, индексы",
      "Проектирование данных, миграции",
      "Cloudflare Pages",
      "Деплой, статический экспорт",
    ],
  },
  {
    label: "Инструменты",
    items: [
      "Git",
      "Figma → вёрстка",
      "Lighthouse, оптимизация",
      "ESLint, code review",
    ],
  },
];

export type ProcessStep = {
  action: string;
  detail: string;
};

export const processSteps: ProcessStep[] = [
  {
    action: "Обсуждаем задачу",
    detail: "Созвон или переписка в Telegram. Фиксируем цель, объём и бюджет.",
  },
  {
    action: "Согласую смету и сроки",
    detail: "Что делаю, за сколько и к какой дате. Без сюрпризов в процессе.",
  },
  {
    action: "Показываю по ходу",
    detail: "Промежуточные версии, правки минимальными итерациями, а не в конце.",
  },
  {
    action: "Сдаю и передаю",
    detail: "Рабочий проект, доступы, короткая инструкция. Остаюсь на связи после сдачи.",
  },
];

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  /** Есть ли у кейса собственная страница-флагман (/case/<slug>), а не шаблон. */
  flagship: boolean;
  /** Короткие честные факты о проекте (для превью). */
  facts?: string[];
  /** Метрики Lighthouse (реальные, из CLAUDE.md) — отдельным тегом. */
  lighthouse?: { label: string; score: number }[];
  /** Карточка «скоро» — кейс в работе, страницы ещё нет. */
  soon?: boolean;
};

/**
 * Кейсы. MAISON — флагман с рукотворной страницей /case/maison.
 * Карточки «скоро» — направления, кейсы по которым ещё готовятся.
 */
export const cases: CaseStudy[] = [
  {
    slug: "maison",
    title: "MAISON",
    summary: "Лендинг премиального салона красоты.",
    flagship: true,
    facts: [
      "Astro, тёмная тема",
      "Self-hosted шрифты, ноль фронт-зависимостей",
      "Форма заявки в Telegram",
    ],
    // Реальные метрики проекта (см. CLAUDE.md) — выносим отдельным тегом.
    lighthouse: [
      { label: "Perf", score: 100 },
      { label: "A11y", score: 100 },
      { label: "Практики", score: 100 },
      { label: "SEO", score: 100 },
    ],
  },
  {
    slug: "telegram-bot",
    title: "Telegram-бот",
    summary: "Приём заявок и автоматизация. Кейс готовится.",
    flagship: false,
    soon: true,
  },
  {
    slug: "dashboard",
    title: "Веб-приложение",
    summary: "Панель с данными и авторизацией. Кейс готовится.",
    flagship: false,
    soon: true,
  },
];

/** Кейсы для превью на главной. */
export const flagshipCase = cases.find((c) => c.flagship)!;
export const soonCases = cases.filter((c) => c.soon);

/**
 * Слаги, которые пре-рендерит шаблон /case/[slug].
 * Флагман MAISON исключён — у него собственная страница /case/maison.
 * Демо-слаг "example" оставляем, пока нет реальных не-флагманских кейсов с данными:
 * динамический роут в output:'export' не собирается с нулём путей.
 * Заменить на реальные слаги, когда появятся кейсы.
 */
export const templateCaseSlugs: string[] = ["example"];
