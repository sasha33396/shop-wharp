import { createFileRoute, Link } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
import { useCart } from "@/lib/store";
import { formatPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => pageMeta({ title: 'Корзина — Wharp', description: 'Ваша корзина в магазине Wharp: цифровые товары, игры, подписки и ключи с моментальной доставкой на email.', path: '/cart' }),
  component: CartPage,
});


function CartPage() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const total = useCart((s) => s.total());

  if (items.length === 0) {
    return (
      <div className="container-page py-16 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">Корзина пуста</h1>
        <p className="mt-2 text-muted-foreground">Добавьте товары из каталога.</p>
        <Button asChild className="mt-6 bg-primary text-primary-foreground hover:bg-primary-hover">
          <Link to="/catalog">В каталог</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">Корзина ({items.length})</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr,380px]">
        <div className="space-y-3">
          {items.map(({ product, qty }) => (
            <div key={product.id} className="flex gap-4 rounded-xl border bg-card p-3">
              <Link to="/product/$slug" params={{ slug: product.slug }} className={`shrink-0 grid h-24 w-20 place-items-center overflow-hidden rounded-lg ${product.logoTile ? "gradient-hero" : "bg-muted"}`}>
                <img src={product.image} alt="" className={`h-full w-full ${product.logoTile ? "object-contain p-2" : "object-cover"}`} />
              </Link>
              <div className="flex flex-1 flex-col">
                <Link to="/product/$slug" params={{ slug: product.slug }} className="font-medium hover:text-primary">
                  {product.title}
                </Link>
                <div className="text-xs text-muted-foreground">{product.platform} · {product.region}</div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-md border">
                    <button className="grid h-8 w-8 place-items-center hover:bg-muted" onClick={() => setQty(product.id, qty - 1)}>
                      <Minus className="h-3 w-3" />
                    </button>
                    <div className="w-8 text-center text-sm">{qty}</div>
                    <button className="grid h-8 w-8 place-items-center hover:bg-muted" onClick={() => setQty(product.id, qty + 1)}>
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="font-semibold">{formatPrice(product.price * qty)}</div>
                </div>
              </div>
              <button
                onClick={() => remove(product.id)}
                className="self-start text-muted-foreground hover:text-destructive"
                aria-label="Удалить"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button onClick={clear} className="text-sm text-muted-foreground hover:text-destructive">Очистить корзину</button>
        </div>

        <aside className="h-fit rounded-xl border bg-card p-6 lg:sticky lg:top-32">
          <h2 className="text-lg font-semibold">Итог</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Товары</span><span>{formatPrice(total)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Доставка</span><span className="text-primary">Бесплатно</span></div>
            <div className="my-3 border-t" />
            <div className="flex justify-between text-lg font-bold"><span>К оплате</span><span>{formatPrice(total)}</span></div>
          </div>
          <Button
            size="lg"
            className="mt-5 w-full bg-primary text-primary-foreground hover:bg-primary-hover"
            onClick={() =>
              toast.error("Оплата временно недоступна", {
                description: "Проводим технические работы. Попробуйте позже.",
              })
            }
          >
            Оформить заказ <ArrowRight className="ml-1 h-4 w-4" />
          </Button>

          <div className="mt-3 text-center text-xs text-muted-foreground">
            Нажимая «Оформить», вы соглашаетесь с <Link to="/oferta" className="underline">офертой</Link>.
          </div>
        </aside>
      </div>
    </div>
  );
}
