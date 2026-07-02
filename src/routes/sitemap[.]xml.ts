import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { products, categories } from "@/data/products";

const BASE_URL = "https://wharp-app.ru";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = [
          "/", "/catalog", "/cart", "/checkout", "/favorites", "/auth",
          "/about", "/contacts", "/payment", "/delivery", "/faq", "/support",
          "/terms", "/privacy", "/oferta", "/blog",
        ];
        const cats = Object.keys(categories).map((s) => `/category/${s}`);
        const prods = products.map((p) => `/product/${p.slug}`);
        const all = [...staticPaths, ...cats, ...prods];
        const xml =
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          all.map((p) => `  <url><loc>${BASE_URL}${p}</loc></url>`).join("\n") +
          `\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
