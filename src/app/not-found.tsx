import Link from "next/link";
import { site } from "@/lib/site";

/**
 * 404 в терминальной стилизации — продолжает мотив SectionPath/hero-caret
 * (мигающая каретка, командная строка) вместо дефолтной страницы Next.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-5 py-24 text-center">
      <div className="w-full max-w-[560px] rounded-lg border border-line bg-surface/60 p-8 text-left font-mono text-sm sm:p-10">
        <p className="text-muted">
          <span className="text-accent">{site.name.toLowerCase()}@site</span>
          <span className="text-fg-dim">:~$</span> cd /case/404
        </p>
        <p className="mt-3 text-fg">
          bash: cd: /case/404:{" "}
          <span className="text-fg">command not found</span>
          <span className="hero-caret">_</span>
        </p>
        <p className="mt-6 text-fg-dim">
          Такой страницы нет — возможно, ссылка устарела или адрес набран с
          ошибкой.
        </p>
        <p className="mt-8">
          <span className="text-accent">{site.name.toLowerCase()}@site</span>
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
