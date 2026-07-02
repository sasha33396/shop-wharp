// Утилита для генерации SEO-метаданных страниц.
const SITE = "https://wharp-app.ru";
const OG_IMAGE = "/__l5e/assets-v1/b7ca15b4-8d04-4863-9ff4-607a5710eba2/wharp-logo.svg";

export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  const url = `${SITE}${opts.path}`;
  const image = opts.image ?? OG_IMAGE;
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:image", content: image.startsWith("http") ? image : `${SITE}${image}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: opts.title },
      { name: "twitter:description", content: opts.description },
      { name: "twitter:image", content: image.startsWith("http") ? image : `${SITE}${image}` },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
