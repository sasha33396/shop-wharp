import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Zap, Shield, Clock, Heart, ShoppingCart, Check, Minus, Plus } from "lucide-react";
import { products, formatPrice, categories } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart, useFavorites } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => {
    const p = products.find((x) => x.slug === params.slug);
    return {
      meta: p
        ? [
            { title: `${p.title} — купить в Wharp за ${formatPrice(p.price)}` },
            { name: "description", content: p.description },
            { property: "og:title", content: p.title },
            { property: "og:description", content: p.description },
            { property: "og:image", content: p.image },
          ]
        : [{ title: "Товар не найден" }],
    };
  },
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: import("@/data/products").Product };
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const fav = useFavorites();
  const isFav = fav.has(product.id);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 5);

  return (
    <div className="container-page py-8">
      <nav className="mb-4 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">Главная</Link> /{" "}
        <Link to="/catalog" className="hover:text-primary">Каталог</Link> /{" "}
        <Link to="/category/$slug" params={{ slug: product.category }} className="hover:text-primary">
          {categories[product.category].title}
        </Link>{" "}
        / <span className="text-foreground">{product.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[360px,1fr]">
        <div className="space-y-8">
          <div className={`overflow-hidden rounded-2xl border ${product.logoTile ? "gradient-hero" : "bg-card"}`} style={{ maxWidth: 360 }}>
            <img
              src={product.image}
              alt={product.title}
              className={`aspect-square w-full ${product.logoTile ? "object-contain p-10" : "object-cover"}`}
            />
          </div>
        </div>

        <aside>
          <div className="lg:sticky lg:top-32 space-y-4">
            <div className="rounded-2xl border bg-card p-6">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{product.platform}</Badge>
                <Badge variant="secondary">{product.region}</Badge>
                {product.hot && <Badge className="bg-orange-500 text-white">🔥 Хит</Badge>}
                {product.new && <Badge className="bg-primary text-primary-foreground">NEW</Badge>}
              </div>
              <h1 className="text-2xl font-bold leading-tight">{product.title}</h1>
              <div className="mt-2 flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <strong>{product.rating.toFixed(1)}</strong>
                  <span className="text-muted-foreground">({product.reviews})</span>
                </span>
              </div>

              <div className="my-5 flex items-end gap-3">
                <div className="text-4xl font-bold">{formatPrice(product.price)}</div>
                {product.oldPrice && (
                  <>
                    <div className="pb-1 text-lg text-muted-foreground line-through">{formatPrice(product.oldPrice)}</div>
                    <Badge className="mb-1 bg-destructive text-destructive-foreground">−{discount}%</Badge>
                  </>
                )}
              </div>

              <div className="mb-4 flex items-center gap-2">
                <div className="flex items-center rounded-md border">
                  <button className="grid h-9 w-9 place-items-center hover:bg-muted" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <div className="w-10 text-center text-sm font-medium">{qty}</div>
                  <button className="grid h-9 w-9 place-items-center hover:bg-muted" onClick={() => setQty((q) => q + 1)}>
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <Button
                  size="lg"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary-hover"
                  onClick={() => {
                    add(product, qty);
                    toast.success("Добавлено в корзину");
                  }}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> В корзину
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => fav.toggle(product.id)}
                  aria-label="Избранное"
                >
                  <Heart className={`h-4 w-4 ${isFav ? "fill-destructive text-destructive" : ""}`} />
                </Button>
              </div>

              <div className="space-y-2 border-t pt-4 text-sm">
                <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-primary" /> Моментальная доставка на e-mail</div>
                <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> Гарантия и возврат средств</div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Поддержка 24/7 в чате и Telegram</div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <Tabs defaultValue="description" className="mt-8">
        <TabsList>
          <TabsTrigger value="description">Описание</TabsTrigger>
          <TabsTrigger value="howto">Как активировать</TabsTrigger>
          <TabsTrigger value="reviews">Отзывы ({product.reviews})</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="prose prose-sm max-w-none pt-4 text-foreground/85">
          <p className="text-base">{product.description}</p>
          {product.features && (
            <ul className="mt-4 space-y-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" /> {f}
                </li>
              ))}
            </ul>
          )}
          {product.genres && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.genres.map((g) => (
                <Badge key={g} variant="secondary">{g}</Badge>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="howto" className="space-y-3 pt-4 text-sm text-foreground/85">
          <ol className="list-decimal space-y-2 pl-5">
            <li>Оплатите заказ удобным способом.</li>
            <li>Получите ключ или код активации на e-mail в течение 1 минуты.</li>
            <li>Введите ключ в клиенте {product.platform} в разделе «Активировать продукт».</li>
            <li>Готово! Игра / подписка добавлена в вашу библиотеку.</li>
          </ol>
          <p className="text-muted-foreground">Если возникли сложности — напишите в чат поддержки 24/7, поможем активировать.</p>
        </TabsContent>
        <TabsContent value="reviews" className="space-y-4 pt-4">
          {[
            { n: "Александр", t: "Всё пришло моментально, активировалось без вопросов. Спасибо!" },
            { n: "Екатерина", t: "Брала уже третий раз, всё отлично. Цена ниже Steam." },
            { n: "Игорь", t: "Поддержка ответила за 1 минуту, помогли с регионом." },
          ].map((r) => (
            <div key={r.n} className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <div className="font-medium">{r.n}</div>
                <div className="flex text-warning">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="mt-1 text-sm text-foreground/80">{r.t}</p>
            </div>
          ))}
        </TabsContent>
      </Tabs>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-5 text-2xl font-bold">Похожие товары</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
