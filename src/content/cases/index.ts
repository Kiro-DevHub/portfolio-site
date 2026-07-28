import type { CaseContent } from "./types";
import { maison } from "./maison";
import { webstudioCrm } from "./webstudio-crm";
import { slotlyk } from "./slotlyk";

/**
 * Реестр контента кейсов. Роут /case/[slug] пре-рендерит ровно эти слаги и берёт
 * отсюда данные. Добавить кейс = добавить объект и одну строку в этот массив —
 * вёрстку (CaseLayout) трогать не нужно.
 */
const caseList: CaseContent[] = [maison, webstudioCrm, slotlyk];

const bySlug = new Map(caseList.map((c) => [c.slug, c]));

/** Слаги для generateStaticParams. */
export const caseContentSlugs = caseList.map((c) => c.slug);

/** Контент кейса по слагу (undefined — если такого кейса нет). */
export function getCaseContent(slug: string): CaseContent | undefined {
  return bySlug.get(slug);
}

export type { CaseContent } from "./types";
