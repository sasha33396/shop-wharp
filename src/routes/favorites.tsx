import { createFileRoute, Link } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
import { useFavorites } from "@/lib/store";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/favorites")({
  head: () => pageMeta({ title: 'Избранные товары — Wharp', description: 'Список избранных цифровых товаров в Wharp: игры, подписки, ключи и подарочные карты, сохранённые для покупки.', path: '/favorites' }),
  component: Favorites,
});

function Favorites() {
  const ids = useFavorites((s) => s.ids);
  const items = products.filter((p) => ids.includes(p.id));

  return (
    <div className="container-page py-8">
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">Избранное</h1>
      {items.length === 0 ? (
        <div className="rounded-xl border bg-card p-12 text-center">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-3 text-muted-foreground">Здесь будут товары, которые вы добавите в избранное.</p>
          <Button asChild className="mt-4 bg-primary text-primary-foreground hover:bg-primary-hover">
            <Link to="/catalog">К каталогу</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
