import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { products } from "@/data/products";

const names = [
  "Александр", "Дмитрий", "Максим", "Иван", "Артём", "Никита", "Егор",
  "Мария", "Анна", "Полина", "Ольга", "Юлия", "Сергей", "Роман", "Виктор",
  "Даниил", "Кирилл", "Илья", "Тимур", "Алина", "Ксения",
];
const cities = ["Москва", "СПб", "Казань", "Новосибирск", "Екатеринбург", "Краснодар", "Самара", "Уфа", "Ростов-на-Дону", "Воронеж", "Нижний Новгород", "Челябинск"];

type Item = { id: number; name: string; city: string; product: string; ago: string };

function make(id: number): Item {
  const p = products[Math.floor(Math.random() * products.length)];
  const n = names[Math.floor(Math.random() * names.length)];
  const c = cities[Math.floor(Math.random() * cities.length)];
  const min = Math.floor(Math.random() * 9) + 1;
  return { id, name: n, city: c, product: p.title, ago: `${min} мин назад` };
}

export function LiveActivity() {
  const [items, setItems] = useState<Item[]>(() =>
    Array.from({ length: 5 }, (_, i) => make(i))
  );

  useEffect(() => {
    let n = items.length;
    const t = setInterval(() => {
      setItems((prev) => [make(++n), ...prev].slice(0, 5));
    }, 4500);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="container-page pt-8">
      <div className="rounded-xl border bg-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Последние покупки
          </div>
          <span className="text-xs text-muted-foreground">в реальном времени</span>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((it) => (
            <li
              key={it.id}
              className="flex items-start gap-2 rounded-lg bg-muted/50 p-2 text-xs animate-in fade-in slide-in-from-top-1"
            >
              <ShoppingBag className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              <div className="min-w-0">
                <div className="truncate font-medium">{it.name}, {it.city}</div>
                <div className="truncate text-muted-foreground">{it.product}</div>
                <div className="text-[10px] text-muted-foreground/70">{it.ago}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
