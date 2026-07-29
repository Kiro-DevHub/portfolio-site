/**
 * Контент-сийм сайта: страницы и секции импортируют типизированные данные отсюда,
 * а не хардкодят их у себя. Цены и услуги — из CLAUDE.md.
 */

export const site = {
  // Имя человека и словознак бренда — разные сущности и расходятся намеренно:
  // `name` уходит в JSON-LD Person и в SEO-заголовки (по имени ищут человека),
  // `brand`/`brandName` — в логотип шапки, футер, og:site_name и в название
  // услуги. Логотип собирается как {brand}.{brandTld}, чтобы точка-акцент
  // рисовалась отдельным span'ом и не дублировалась строкой в двух местах.
  name: "Кирилл",
  brand: "Kiro",
  brandTld: "dev",
  brandName: "Kiro.dev",
  role: "Full-stack разработчик",
  // Канонический домен — для metadataBase, og:url, sitemap.xml, JSON-LD.
  // При подключении кастомного домена достаточно задать NEXT_PUBLIC_SITE_URL
  // на билде (Cloudflare Pages → Environment variables), без правки кода.
  // `||` (не `??`) — пустая строка в переменной тоже должна откатываться на
  // дефолт; хвостовой слэш срезаем, иначе конкатенация `${url}/path` даёт
  // двойной слэш в sitemap/robots/JSON-LD.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://kirill-dev.pages.dev").replace(
    /\/+$/,
    ""
  ),
  // Telegram — основной канал связи и сквозной CTA.
  telegramUrl: "https://t.me/K1ro0",
  telegramHandle: "@K1ro0",
  // GitHub — второй канал доверия после Telegram: заказчик идёт смотреть код.
  // Ссылка живёт в футере, ник — строкой в терминале «Обо мне» и в sameAs JSON-LD.
  githubUrl: "https://github.com/Kiro-DevHub",
  githubHandle: "Kiro-DevHub",
  // Локед-лейбл CTA — один и тот же в шапке, хиро и футере (без дубля интента).
  ctaLabel: "Написать в Telegram",
  // OG/Twitter-картинка — один источник правды на путь и размеры, чтобы не
  // расходились между layout.tsx и страницей кейса.
  ogImage: { url: "/og-image.png", width: 1200, height: 630 },
  // openGraph.siteName/locale — Next не подмешивает их из layout.tsx, если
  // страница объявляет свой openGraph (объект заменяется целиком), поэтому
  // страница кейса берёт их отсюда явно.
  ogSiteName: "Kiro.dev",
  ogLocale: "ru_RU",
} as const;

/** Путь страницы кейса — общий с sitemap.ts, JSON-LD и карточками кейсов. */
export function casePath(slug: string): string {
  return `/case/${slug}`;
}

/**
 * Технологии для ленты в «Навыках» — по строке на дорожку.
 *
 * Каждый пункт обязан встречаться в skillGroups ниже: лента — это индекс
 * сетки навыков, а не отдельное заявление. Ничего нового здесь не заявляем.
 *
 * Длина строк — не декоративная величина. Одна копия дорожки должна быть шире
 * вьюпорта, иначе чип успевает попасть в кадр дважды и лента читается как
 * короткий зациклённый огрызок. Порог сейчас ~2600px на строку (см. расчёт в
 * TechMarquee.tsx); убирать пункты — только вместе с пересчётом.
 */
export const techRows = {
  /** Интерфейс и приложение. */
  top: [
    "React",
    "Next.js",
    "TypeScript",
    "Astro",
    "Tailwind CSS",
    "Vite",
    "TanStack Query",
    "shadcn/ui",
    "dnd-kit",
    "Recharts",
    "Node.js",
    "NestJS",
    "Prisma",
    "JWT",
    "Python",
    "Django",
    "DRF",
    "aiogram",
    "Celery",
    "ASP.NET Core",
    "Telegram Bot API",
  ],
  /** Данные, инфраструктура, инструменты. */
  bottom: [
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Docker Compose",
    "GitHub Actions",
    "Nginx",
    "Cloudflare Pages",
    "Vercel",
    "Render",
    "Neon",
    "Sentry",
    "pnpm workspaces",
    "Git",
    "Linux",
    "Bash",
    "SSH",
    "pg_dump",
    "Selenium",
    "Lighthouse",
    "ESLint",
    "uv",
    "ruff",
  ],
} as const;

export type Service = {
  title: string;
  price: string;
  description: string;
  /** Что входит — компактный чек-лист под описанием. */
  includes: string[];
  featured?: boolean;
};

export const services: Service[] = [
  {
    title: "Сайт под задачу",
    price: "от 15 000 ₽",
    description:
      "Лендинг или многостраничник: заявки, продажи, презентация.",
    includes: [
      "дизайн",
      "вёрстка с нуля",
      "адаптив",
      "SEO-база",
      "форма заявок в Telegram",
      "деплой",
    ],
  },
  {
    title: "Telegram-бот или Mini App",
    price: "от 20 000 ₽",
    description: "Приём заявок, автоответы, запись, оплаты.",
    includes: [
      "сценарии",
      "база данных",
      "уведомления администратору",
      "хостинг",
      "поддержка после запуска",
    ],
  },
  {
    title: "Комплексная разработка",
    price: "от 45 000 ₽",
    description: "Сайт, бот и база данных вместе, всё связано между собой.",
    includes: [
      "всё из пунктов выше",
      "проектирование схемы данных",
      "интеграции",
      "деплой",
    ],
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
  // Строки метрик здесь нет: те же цифры уже стоят на карточке кейса и на его
  // странице — под «Обо мне» они были третьим повтором подряд.
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
      "TypeScript — строгий режим, типы, интерфейсы, generics",
      "Tailwind CSS, Astro",
      "Vite, TanStack Query",
      "shadcn/ui, dnd-kit, Recharts",
      "Адаптив, доступность, семантика",
    ],
  },
  {
    label: "Backend",
    items: [
      "Node.js — npm, event loop, переменные окружения",
      "NestJS — модули, DI, guards, Swagger",
      "Prisma ORM — схема, миграции, сиды",
      "JWT — access/refresh, ротация, роли",
      "Python — aiogram, ООП, async",
      "Django — Models, Views, Auth",
      "DRF — REST API, сериализаторы",
      "Celery + Celery Beat — фоновые задачи, напоминания",
      "Redis — очереди, кеш",
      "C# / ASP.NET Core — Web API, MVC, Auth, DI",
      "Telegram Bot API",
    ],
  },
  {
    label: "БД и инфраструктура",
    items: [
      "PostgreSQL — продакшн-опыт: схема, триггеры, роли, pg_dump",
      "MySQL — JOIN, индексы, транзакции",
      "Docker — Dockerfile, Compose, volumes",
      "CI/CD — GitHub Actions",
      "Neon, Render, Vercel — деплой",
      "pnpm workspaces — монорепа",
      "Cloudflare Pages, статический экспорт",
      "Sentry — мониторинг",
      "Nginx, webhook-режим",
    ],
  },
  {
    label: "Инструменты",
    items: [
      "Git / GitHub — ветвление, pull requests, code review",
      "Linux — файловая система, права, systemctl, SSH",
      "Bash — скрипты автоматизации",
      "Selenium — UI-тесты, Page Object",
      "Тесты, a11y-аудит",
      "TDD — тесты бизнес-логики",
      "uv, ruff",
      "Lighthouse, ESLint",
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
  /** Короткие честные факты о проекте (для превью). */
  facts?: string[];
  /**
   * Итог проекта одной строкой. Развёрнутые бейджи Lighthouse живут только на
   * странице кейса (секция «Результат») — на главной они дублировались.
   */
  metric?: string;
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
    facts: [
      "Astro, тёмная тема",
      "Self-hosted шрифты, ноль фронт-зависимостей",
      "Форма заявки в Telegram",
    ],
    // Реальные метрики проекта (см. CLAUDE.md).
    metric: "Lighthouse 100 · 1 МБ вместо 18 МБ",
  },
  {
    slug: "webstudio-crm",
    title: "WebStudio CRM",
    summary: "Собственный проект: клиенты, воронка сделок, задачи, аналитика.",
    facts: ["NestJS, Prisma, PostgreSQL", "JWT-роли, канбан на dnd-kit", "Деплой: Neon + Render + Vercel"],
    metric: "11 этапов · 3 сервиса в проде · 0 ₽ инфраструктура",
  },
  {
    slug: "slotlyk",
    title: "Slotlyk",
    summary: "Telegram Mini App для записи к частным мастерам.",
    facts: ["Django + aiogram + React", "HMAC-валидация initData, JWT", "Слоты и антигонка на PostgreSQL"],
    metric: "7 сервисов в Docker Compose · Telegram Stars",
  },
];

/** Готовые кейсы для сетки превью на главной (у каждого своя страница). */
export const gridCases = cases.filter((c) => !c.soon);
export const soonCases = cases.filter((c) => c.soon);
