import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

// Своя metadata — иначе страница молча наследует title/OG/Twitter главной
// (см. layout.tsx) и выглядит дублем главной и в соцсетях, и в поиске.
const title = "Страница не найдена";
const description = "Такой страницы нет — возможно, ссылка устарела.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: true },
  openGraph: { title, description },
  twitter: { card: "summary", title, description },
};

const prompt = `${site.brand.toLowerCase()}@site`;

/**
 * 404 в терминальной стилизации — продолжает мотив SectionPath/hero-caret
 * (мигающая каретка, командная строка) вместо дефолтной страницы Next.
 */
export default function NotFound() {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="flex min-h-dvh flex-col items-center justify-center px-5 py-24 text-center"
    >
      <div className="w-full max-w-[560px] rounded-lg border border-hair bg-surface p-8 text-left font-mono text-sm sm:p-10">
        <p className="text-muted">
          <span className="text-accent">{prompt}</span>
          <span className="text-fg-dim">:~$</span> cd /case/404
        </p>
        {/* Это и есть заголовок страницы: <h1> обязателен, а строка терминала —
            единственное, что тут играет его роль. Preflight сбрасывает кегль и
            насыщенность заголовков в inherit, так что вид не меняется. */}
        <h1 className="mt-3 text-fg">
          bash: cd: /case/404:{" "}
          <span className="text-fg">command not found</span>
          <span className="hero-caret">_</span>
        </h1>
        <p className="mt-6 text-fg-dim">
          Такой страницы нет — возможно, ссылка устарела или адрес набран с
          ошибкой.
        </p>
        <p className="mt-8">
          <span className="text-accent">{prompt}</span>
          <span className="text-fg-dim">:~$</span>{" "}
          <Link
            href="/"
            className="text-fg underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            cd /
          </Link>
        </p>
      </div>
    </main>
  );
}
