import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart, Zap, Shield, Star } from "lucide-react";
import { formatPrice, brandTile, type Product } from "@/data/products";
import { useCart, useFavorites } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const fav = useFavorites();
  const isFav = fav.has(product.id);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <article className="group card-hover relative flex flex-col overflow-hidden rounded-xl border bg-card">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className={`relative block aspect-[3/4] overflow-hidden ${product.logoTile ? "gradient-hero" : "bg-muted"}`}
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          onError={(e) => {
            const t = e.currentTarget;
            t.onerror = null;
            t.src = brandTile(product.title);
            t.className = "h-full w-full object-cover";
          }}
          className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${product.logoTile ? "object-contain p-8" : "object-cover"}`}
        />
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {discount > 0 && (
            <Badge className="bg-destructive text-destructive-foreground">−{discount}%</Badge>
          )}
          {product.hot && <Badge className="bg-orange-500 text-white">🔥 Хит</Badge>}
          {product.new && <Badge className="bg-primary text-primary-foreground">NEW</Badge>}
        </div>
        <button
          type="button"
          aria-label="В избранное"
          onClick={(e) => {
            e.preventDefault();
            fav.toggle(product.id);
          }}
          className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-background/80 backdrop-blur transition hover:bg-background"
        >
          <Heart
            className={`h-4 w-4 ${isFav ? "fill-destructive text-destructive" : "text-foreground"}`}
          />
        </button>
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/70 to-transparent px-3 pt-8 pb-2 text-[11px] text-white">
          <span className="rounded bg-white/15 px-1.5 py-0.5 backdrop-blur">{product.platform}</span>
          <span className="rounded bg-white/15 px-1.5 py-0.5 backdrop-blur">{product.region}</span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className="line-clamp-2 text-sm font-medium leading-snug hover:text-primary"
        >
          {product.title}
        </Link>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-warning text-warning" />
            {product.rating.toFixed(1)}
          </span>
        </div>


        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div>
            <div className="text-lg font-semibold leading-none">{formatPrice(product.price)}</div>
            {product.oldPrice && (
              <div className="text-xs text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </div>
            )}
          </div>
          <Button
            size="sm"
            className="h-8 gap-1 bg-primary text-primary-foreground hover:bg-primary-hover"
            onClick={() => {
              add(product);
              toast.success("Добавлено в корзину", { description: product.title });
            }}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            В корзину
          </Button>
        </div>

        <div className="flex items-center gap-3 border-t pt-2 text-[11px] text-muted-foreground">
          {product.instant && (
            <span className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-primary" />
              Моментально
            </span>
          )}
          <span className="flex items-center gap-1">
            <Shield className="h-3 w-3 text-primary" />
            Гарантия
          </span>
        </div>
      </div>
    </article>
  );
}
