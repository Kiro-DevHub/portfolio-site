import type { Metadata } from "next";
import Link from "next/link";
import { cases } from "@/lib/site";

const study = cases.find((c) => c.slug === "maison");

export const metadata: Metadata = {
  title: "Кейс: MAISON",
  description: study?.summary,
};

/**
 * Флагманский кейс MAISON — рукотворная страница (не через шаблон [slug]).
 * Каркас-заглушка; развёрнутый разбор придёт на этапе контента кейса.
 */
export default function MaisonCasePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <Link href="/" className="text-sm text-muted hover:text-fg">
        ← На главную
      </Link>
      <h1 className="mt-6 font-display text-5xl text-fg">MAISON</h1>
      <p className="mt-4 max-w-xl text-fg-dim">
        [заглушка кейса] Премиальный салон красоты. Здесь будет разбор задачи,
        процесса и результата.
      </p>
    </main>
  );
}
