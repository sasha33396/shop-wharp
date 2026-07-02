import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { products, categories, type Category } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/category/$slug")({
  head: ({ params }) => {
    const c = categories[params.slug as Category];
    return {
      meta: c
        ? [
            { title: `${c.title} — купить в Wharp` },
            { name: "description", content: `${c.title}: ${c.description}. Моментальная доставка и гарантия.` },
          ]
        : [{ title: "Категория — Wharp" }],
    };
  },
  loader: ({ params }) => {
    if (!categories[params.slug as Category]) throw notFound();
    return { slug: params.slug as Category };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useLoaderData() as { slug: Category };
  const c = categories[slug];
  const items = products.filter((p) => p.category === slug);

  return (
    <div className="container-page py-8">
      <nav className="mb-2 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">Главная</Link> /{" "}
        <Link to="/catalog" className="hover:text-primary">Каталог</Link> / {c.title}
      </nav>
      <div className="mb-8 rounded-2xl gradient-green p-8 text-primary-foreground">
        <h1 className="text-3xl font-bold md:text-4xl">{c.title}</h1>
        <p className="mt-2 text-white/90">{c.description}</p>
        <div className="mt-3 text-sm text-white/80">{items.length} товаров в наличии</div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
