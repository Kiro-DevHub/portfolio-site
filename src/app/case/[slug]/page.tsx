import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseContentSlugs, getCaseContent } from "@/content/cases";
import { CaseLayout } from "@/components/case/CaseLayout";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

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
  const title = `Кейс ${study.title}`;
  const url = `/case/${study.slug}`;
  return {
    title,
    description: study.tagline,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description: study.tagline,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: study.tagline,
      images: ["/og-image.png"],
    },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title,
    description: study.tagline,
    url: `${site.url}/case/${study.slug}`,
    image: `${site.url}/og-image.png`,
    author: { "@id": `${site.url}/#person` },
    keywords: study.stack.join(", "),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <CaseLayout content={study} />
    </>
  );
}
