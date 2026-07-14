import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseContentSlugs, getCaseContent } from "@/content/cases";
import { CaseLayout } from "@/components/case/CaseLayout";
import { JsonLd } from "@/components/JsonLd";
import { casePath, site } from "@/lib/site";

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
  const url = casePath(study.slug);
  return {
    title,
    description: study.tagline,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description: study.tagline,
      siteName: site.ogSiteName,
      locale: site.ogLocale,
      images: [{ ...site.ogImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: study.tagline,
      images: [site.ogImage.url],
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

  // Каждая страница отдаёт свой независимый script[ld+json] — краулер, зашедший
  // на /case/[slug] отдельно от главной, не подтянет Person оттуда, поэтому
  // автора описываем инлайном, а не ссылкой на @id с другой страницы.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title,
    description: study.tagline,
    url: `${site.url}${casePath(study.slug)}`,
    image: `${site.url}${site.ogImage.url}`,
    author: { "@type": "Person", name: site.name, url: site.url },
    keywords: study.stack.join(", "),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <CaseLayout content={study} />
    </>
  );
}
