import type { NextConfig } from "next";

// Cloudflare Pages — полностью статический билд.
// output: 'export' → `next build` кладёт готовую статику в out/ (без SSR/функций).
// images.unoptimized → отключает серверный оптимизатор картинок (на статике его нет).
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Ссылки без хвостового слэша ведут к файлам вида /case/maison.html — совместимо
  // с раздачей статики на Cloudflare Pages.
  trailingSlash: false,
};

export default nextConfig;
