import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
import { useState } from "react";
import { useCart } from "@/lib/store";
import { formatPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Smartphone, Wallet, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => pageMeta({ title: 'Оформление заказа — Wharp', description: 'Оформите заказ в Wharp: оплата СБП или банковской картой, моментальная доставка ключей.', path: '/checkout' }),
  component: Checkout,
});

const methods = [
  { id: "sbp", t: "СБП", d: "Быстрые платежи без комиссии", icon: Smartphone },
  { id: "card", t: "Банковская карта", d: "Visa, Mastercard, МИР", icon: CreditCard },
  { id: "wallet", t: "ЮMoney / Qiwi", d: "Электронные кошельки", icon: Wallet },
];

function Checkout() {
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total());
  const clear = useCart((s) => s.clear);
  const navigate = useNavigate();
  const [method, setMethod] = useState("sbp");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(true);

  if (items.length === 0) {
    return (
      <div className="container-page py-16 text-center">
        <h1 className="text-2xl font-bold">Корзина пуста</h1>
        <Button asChild className="mt-4"><Link to="/catalog">В каталог</Link></Button>
      </div>
    );
  }

  const pay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) return toast.error("Примите условия оферты");
    toast.success("Заказ оформлен!", { description: "Ключ отправлен на " + email });
    clear();
    navigate({ to: "/" });
  };

  return (
    <div className="container-page py-8">
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">Оформление заказа</h1>
      <form onSubmit={pay} className="grid gap-6 lg:grid-cols-[1fr,380px]">
        <div className="space-y-6">
          <section className="rounded-xl border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">1. Контактные данные</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>E-mail для получения ключа *</Label>
                <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@mail.ru" className="mt-1" />
              </div>
              <div>
                <Label>Телефон (не обязательно)</Label>
                <Input type="tel" placeholder="+7 (___) ___-__-__" className="mt-1" />
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Ключ моментально придёт на указанный e-mail после оплаты.</p>
          </section>

          <section className="rounded-xl border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">2. Способ оплаты</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {methods.map((m) => {
                const Icon = m.icon;
                const active = method === m.id;
                return (
                  <label
                    key={m.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition ${active ? "border-primary bg-accent" : "border-border hover:border-primary/40"}`}
                  >
                    <input type="radio" name="method" value={m.id} checked={active} onChange={() => setMethod(m.id)} className="sr-only" />
                    <Icon className={`h-6 w-6 ${active ? "text-primary" : "text-muted-foreground"}`} />
                    <div className="flex-1">
                      <div className="font-medium">{m.t}</div>
                      <div className="text-xs text-muted-foreground">{m.d}</div>
                    </div>
                    {active && <Check className="h-5 w-5 text-primary" />}
                  </label>
                );
              })}
            </div>
          </section>

          <section className="rounded-xl border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">3. Промокод</h2>
            <div className="flex gap-2">
              <Input placeholder="Введите промокод" />
              <Button variant="outline" type="button">Применить</Button>
            </div>
          </section>
        </div>

        <aside className="h-fit space-y-4 lg:sticky lg:top-32">
          <div className="rounded-xl border bg-card p-6">
            <h2 className="mb-3 text-lg font-semibold">Ваш заказ</h2>
            <div className="space-y-2 text-sm">
              {items.map(({ product, qty }) => (
                <div key={product.id} className="flex justify-between gap-2">
                  <span className="line-clamp-1 text-muted-foreground">{product.title} × {qty}</span>
                  <span className="shrink-0">{formatPrice(product.price * qty)}</span>
                </div>
              ))}
            </div>
            <div className="my-4 border-t" />
            <div className="flex justify-between text-lg font-bold">
              <span>Итого</span><span>{formatPrice(total)}</span>
            </div>
            <label className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5" />
              <span>Согласен с <Link to="/oferta" className="text-primary underline">офертой</Link> и <Link to="/privacy" className="text-primary underline">политикой конфиденциальности</Link></span>
            </label>
            <Button type="submit" size="lg" className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary-hover">
              Оплатить {formatPrice(total)}
            </Button>
          </div>
        </aside>
      </form>
    </div>
  );
}
