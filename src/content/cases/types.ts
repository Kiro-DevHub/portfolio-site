/**
 * Контент-модель кейса. Один типизированный объект на кейс (src/content/cases/*),
 * а вёрстку рисует универсальный шаблон CaseLayout. Новый кейс = новый объект,
 * без правки вёрстки. Интерфейс намеренно узкий: шаблон знает ровно эти поля.
 */

/** Скриншот: src — базовый путь БЕЗ расширения (шаблон сам добавит .avif/.webp). */
export type CaseImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Короткая моно-подпись под скриншотом в галерее. */
  caption?: string;
};

/** Блок раздела «Решение»: что сделал и зачем. */
export type CaseSolutionBlock = {
  title: string;
  body: string;
  /** Ключевое решение кейса — рендерится крупным блоком на всю ширину. */
  featured?: boolean;
};

/** Крупная цифра результата. note — вторичная подпись (например, «было 18 МБ»). */
export type CaseStat = {
  value: string;
  label: string;
  note?: string;
};

/** Честная заметка «что бы сделал иначе» — из реального опыта. */
export type CaseNote = {
  title: string;
  body: string;
};

export type CaseContent = {
  slug: string;
  /** Название кейса (H1). */
  title: string;
  /** Одна строка сути под заголовком. */
  tagline: string;
  /** Моно-путь над хиро (~/case/<slug>) — сквозная деталь стиля главной. */
  path: string;
  /** Ссылка на живой сайт. Пусто → блок «Открыть сайт» не рендерится. */
  liveUrl?: string;
  /** Ссылка на репозиторий. Пусто → блок «Открыть код» не рендерится. */
  repoUrl?: string;
  /** Метки стека в хиро. */
  stack: string[];
  /** Крупный скриншот-обложка. */
  cover: CaseImage;
  /** Задача: что хотел клиент и в каких рамках. */
  problem: {
    body: string;
    constraints: string[];
  };
  /** Решение — по блокам. */
  solution: CaseSolutionBlock[];
  /** Результат — крупные цифры. */
  results: {
    lighthouse: { label: string; score: number }[];
    stats: CaseStat[];
  };
  /** Галерея скриншотов живого сайта. */
  gallery: CaseImage[];
  /** «Что бы сделал иначе» — 2–3 честных пункта. */
  notes: CaseNote[];
  /** Финальный призыв. */
  cta: {
    heading: string;
    body: string;
  };
};
