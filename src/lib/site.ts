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
  // Только проверяемые факты — без количества клиентов/проектов (их пока не считаем).
  metrics: [
    "Lighthouse 100/100/100/100",
    "вес страницы MAISON: 1 МБ вместо 18 МБ",
    "отвечаю в Telegram в течение часа",
  ],
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
      "Адаптив, доступность, семантика",
    ],
  },
  {
    label: "Backend",
    items: [
      "Node.js — npm, event loop, переменные окружения",
      "Python — aiogram, ООП, async",
      "Django — Models, Views, Auth, DRF",
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
      "Cloudflare Pages, статический экспорт",
    ],
  },
  {
    label: "Инструменты",
    items: [
      "Git / GitHub — ветвление, pull requests, code review",
      "Linux — файловая система, права, systemctl, SSH",
      "Bash — скрипты автоматизации",
      "Selenium — UI-тесты, Page Object",
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
  /** Есть ли у кейса собственная страница-флагман (/case/<slug>), а не шаблон. */
  flagship: boolean;
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
    flagship: true,
    facts: [
      "Astro, тёмная тема",
      "Self-hosted шрифты, ноль фронт-зависимостей",
      "Форма заявки в Telegram",
    ],
    // Реальные метрики проекта (см. CLAUDE.md).
    metric: "Lighthouse 100 · 1 МБ вместо 18 МБ",
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
