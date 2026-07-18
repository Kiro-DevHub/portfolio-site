import type { CaseContent } from "./types";

/**
 * Кейс WebStudio CRM. Собственный (не коммерческий) проект — честно об этом
 * говорим в тексте задачи. Факты и цифры реальные (см. case-studies/webstudio-crm).
 */
export const webstudioCrm: CaseContent = {
  slug: "webstudio-crm",
  title: "WebStudio CRM",
  tagline:
    "CRM-система для веб-студии — клиенты, воронка сделок, задачи, аналитика.",
  path: "~/case/webstudio-crm",
  liveUrl: "https://webstudio-crm-web.vercel.app",
  repoUrl: "https://github.com/Kiro-DevHub/webstudio-crm",
  stack: ["NestJS", "PostgreSQL", "Prisma", "React", "TypeScript", "Docker", "CI/CD"],
  cover: {
    src: "/images/cases/webstudio-crm",
    alt: "Дашборд аналитики WebStudio CRM: выручка, конверсия, воронка по стадиям",
    width: 1400,
    height: 875,
  },
  problem: {
    body: "Собственный проект: полный production-цикл от схемы данных до деплоя, а не коммерческий заказ. Задача — построить CRM уровня коммерческой разработки, а не учебный CRUD: реальная доменная модель, права доступа, аналитика по данным, и довести всё до работающего прода, а не до «localhost готов».",
    constraints: [
      "Реальная доменная модель и права доступа — роли ADMIN/MANAGER и единое правило «владелец или админ» на всех сущностях, а не одна плоская таблица.",
      "Аналитика по данным, а не просто список записей — воронка продаж и динамика к прошлому периоду на SQL-агрегациях.",
      "Довести до прода на бесплатных тарифах — БД, API и фронт задеплоены и работают, а не только localhost.",
    ],
  },
  solution: [
    {
      title: "Архитектура и данные",
      body: "Монорепа на pnpm workspaces: NestJS + TypeScript strict, Prisma-схема с доменными сущностями и реалистичными сидами, Swagger для API.",
      featured: true,
    },
    {
      title: "Авторизация",
      body: "JWT: access и refresh с ротацией токенов, роли ADMIN/MANAGER и единый механизм прав «владелец или админ» на всех сущностях. На фронте — авторефреш токена без разрыва сессии.",
    },
    {
      title: "Канбан сделок",
      body: "Drag-and-drop на dnd-kit с оптимистичными обновлениями интерфейса и откатом карточки при ошибке сервера.",
    },
    {
      title: "Аналитика",
      body: "SQL-агрегации на бэкенде: воронка продаж по стадиям и дельты к прошлому периоду. Дашборд с графиками на Recharts.",
      featured: true,
    },
    {
      title: "Фронтенд",
      body: "React + Vite, TanStack Query, Tailwind и shadcn/ui. URL-состояние таблиц, серверная пагинация, тёмная и светлая тема, code-splitting по роутам, тесты и a11y-аудит.",
    },
    {
      title: "Инфраструктура",
      body: "Docker, GitHub Actions CI, деплой: Neon (PostgreSQL) + Render (API в контейнере) + Vercel (фронт). Весь стек — на бесплатных тарифах.",
    },
  ],
  results: {
    lighthouse: [],
    stats: [
      { value: "11", label: "этапов разработки" },
      { value: "48", label: "коммитов" },
      { value: "3", label: "сервиса в проде", note: "БД, API, фронт" },
      { value: "0 ₽", label: "стоимость инфраструктуры" },
    ],
  },
  gallery: [
    {
      src: "/images/cases/webstudio-crm/kanban",
      alt: "Канбан-доска сделок WebStudio CRM: стадии воронки от лида до сдачи с карточками клиентов",
      caption: "Канбан сделок",
      width: 1400,
      height: 693,
    },
    {
      src: "/images/cases/webstudio-crm/analytics",
      alt: "Дашборд аналитики: выручка по месяцам, воронка по стадиям, топ менеджеров",
      caption: "Аналитика",
      width: 1400,
      height: 696,
    },
    {
      src: "/images/cases/webstudio-crm/clients",
      alt: "Таблица клиентов с поиском, фильтрами по источнику и владельцу",
      caption: "Клиенты",
      width: 1400,
      height: 697,
    },
    {
      src: "/images/cases/webstudio-crm/deal-detail",
      alt: "Карточка сделки: стадии воронки, задачи, заметки и лента активности",
      caption: "Карточка сделки",
      width: 1400,
      height: 695,
    },
    {
      src: "/images/cases/webstudio-crm/tasks",
      alt: "Список задач по срокам: просроченные и предстоящие, со ссылками на сделки",
      caption: "Задачи",
      width: 1400,
      height: 696,
    },
  ],
  notes: [
    {
      title: "Просроченные задачи после выполнения",
      body: "Задачи со статусом «выполнена» попадали в «просроченные». Починил корень, а не симптом: вынес правило isOverdue в единую точку вместо разрозненных проверок по компонентам, и покрыл его тестами.",
    },
    {
      title: "Сессия рвалась при обновлении страницы",
      body: "В проде фронт и бэк на разных доменах, и cookie с SameSite=Strict блокировалась браузером при кросс-сайтовом запросе. Диагностировал через DevTools и сделал конфигурацию cookie, зависящую от окружения: разные настройки для dev и prod.",
    },
    {
      title: "Деплой на Render",
      body: "Неверная pooled/direct connection string до БД, отсутствующий префикс /api в путях, ошибки CORS — чинил по одной, пока сервис не поднялся стабильно.",
    },
    {
      title: "CI падал на генерации Prisma Client",
      body: "В изолированном pnpm-окружении GitHub Actions Prisma Client не генерировался автоматически перед сборкой. Нашёл шаг, которого не хватало в workflow, и исправил.",
    },
  ],
  cta: {
    heading: "Хочу так же",
    body: "Расскажите про задачу в Telegram — отвечу, задам пару вопросов и назову смету со сроками. Обсудить идею ни к чему не обязывает.",
  },
};
