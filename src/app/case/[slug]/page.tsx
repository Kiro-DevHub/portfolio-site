import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseContentSlugs, getCaseContent } from "@/content/cases";
import { CaseLayout } from "@/components/case/CaseLayout";

// Статический экспорт: пре-рендерим ровно те слаги, для которых есть контент.
export function generateStaticParams() {
  return caseContentSlugs.map((slug) => ({ slug }));
}

// Неизвестные слаги → 404 (обязательно для output: 'export').
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseContent(slug);
  if (!study) return { title: "Кейс" };
  return {
    title: `Кейс: ${study.title}`,
    description: study.tagline,
  };
}

/**
 * Страница кейса. Роут резолвит контент по слагу, а рисует его универсальный
 * шаблон CaseLayout. Новый кейс появляется добавлением объекта в
 * src/content/cases — без правки вёрстки.
 */
export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseContent(slug);
  if (!study) notFound();
  return <CaseLayout content={study} />;
}
