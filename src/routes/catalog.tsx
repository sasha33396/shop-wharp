import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { ProductCard } from "@/components/ProductCard";
import { products, platforms, regions, categories, searchProducts, type Category, type Platform, type Region } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, X } from "lucide-react";

const schema = z.object({
  q: fallback(z.string(), "").default(""),
  cat: fallback(z.string(), "").default(""),
  sort: fallback(z.enum(["popular", "price-asc", "price-desc", "new", "discount"]), "popular").default("popular"),
});

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Каталог цифровых товаров — Wharp" },
      { name: "description", content: "Полный каталог: игры, подписки, ключи, подарочные карты, внутриигровая валюта и ПО." },
    ],
  }),
  validateSearch: zodValidator(schema),
  component: Catalog,
});

function Catalog() {
  const { q, cat, sort } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState(q);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<Region[]>([]);
  const [price, setPrice] = useState<[number, number]>([0, 10000]);
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = searchProducts(query, products);
    if (cat) list = list.filter((p) => p.category === (cat as Category));
    if (selectedPlatforms.length) list = list.filter((p) => selectedPlatforms.includes(p.platform));
    if (selectedRegions.length) list = list.filter((p) => selectedRegions.includes(p.region));
    list = list.filter((p) => p.price >= price[0] && p.price <= price[1]);
    if (onlyDiscount) list = list.filter((p) => p.oldPrice && p.oldPrice > p.price);
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "new": list = [...list].sort((a, b) => Number(!!b.new) - Number(!!a.new)); break;
      case "discount": list = [...list].sort((a, b) => ((b.oldPrice ?? b.price) - b.price) - ((a.oldPrice ?? a.price) - a.price)); break;
      default: list = [...list].sort((a, b) => b.sold - a.sold);
    }
    return list;
  }, [query, cat, sort, selectedPlatforms, selectedRegions, price, onlyDiscount]);

  const reset = () => {
    setQuery("");
    setSelectedPlatforms([]);
    setSelectedRegions([]);
    setPrice([0, 10000]);
    setOnlyDiscount(false);
    navigate({ search: { q: "", cat: "", sort: "popular" } });
  };

  return (
    <div className="container-page py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <nav className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">Главная</Link> / Каталог
          </nav>
          <h1 className="mt-1 text-2xl font-bold md:text-3xl">Каталог</h1>
          <p className="text-sm text-muted-foreground">Найдено {filtered.length} товаров</p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={sort}
            onChange={(e) => navigate({ search: (prev: { q: string; cat: string; sort: string }) => ({ ...prev, sort: e.target.value as never }) })}
            className="h-9 rounded-md border bg-background px-3 text-sm"
          >
            <option value="popular">Популярные</option>
            <option value="new">Новинки</option>
            <option value="price-asc">Сначала дешевле</option>
            <option value="price-desc">Сначала дороже</option>
            <option value="discount">Большая скидка</option>
          </select>
          <Button variant="outline" size="sm" className="md:hidden" onClick={() => setShowFilters((s) => !s)}>
            <SlidersHorizontal className="mr-1 h-4 w-4" /> Фильтры
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[260px,1fr]">
        <aside className={`${showFilters ? "block" : "hidden"} md:block`}>
          <div className="sticky top-32 space-y-6 rounded-xl border bg-card p-4">
            <div>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Поиск..."
                  className="pl-9"
                />
              </div>
            </div>

            <FilterGroup title="Категория">
              <div className="space-y-1">
                <button
                  onClick={() => navigate({ search: (prev: { q: string; cat: string; sort: string }) => ({ ...prev, cat: "" }) })}
                  className={`block w-full rounded px-2 py-1 text-left text-sm ${!cat ? "bg-accent text-accent-foreground" : "hover:bg-muted"}`}
                >
                  Все категории
                </button>
                {(Object.keys(categories) as Category[]).map((slug) => (
                  <button
                    key={slug}
                    onClick={() => navigate({ search: (prev: { q: string; cat: string; sort: string }) => ({ ...prev, cat: slug }) })}
                    className={`block w-full rounded px-2 py-1 text-left text-sm ${cat === slug ? "bg-accent text-accent-foreground" : "hover:bg-muted"}`}
                  >
                    {categories[slug].title}
                  </button>
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="Платформа">
              <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
                {platforms.map((pl) => (
                  <label key={pl} className="flex cursor-pointer items-center gap-2 text-sm">
                    <Checkbox
                      checked={selectedPlatforms.includes(pl)}
                      onCheckedChange={(c) =>
                        setSelectedPlatforms((arr) => (c ? [...arr, pl] : arr.filter((x) => x !== pl)))
                      }
                    />
                    {pl}
                  </label>
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="Регион активации">
              <div className="space-y-2">
                {regions.map((r) => (
                  <label key={r} className="flex cursor-pointer items-center gap-2 text-sm">
                    <Checkbox
                      checked={selectedRegions.includes(r)}
                      onCheckedChange={(c) =>
                        setSelectedRegions((arr) => (c ? [...arr, r] : arr.filter((x) => x !== r)))
                      }
                    />
                    {r}
                  </label>
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title={`Цена: ${price[0]} – ${price[1]} ₽`}>
              <Slider
                min={0}
                max={10000}
                step={100}
                value={price}
                onValueChange={(v) => setPrice([v[0], v[1]] as [number, number])}
              />
            </FilterGroup>

            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <Checkbox checked={onlyDiscount} onCheckedChange={(c) => setOnlyDiscount(!!c)} />
              Только со скидкой
            </label>

            <Button variant="outline" size="sm" onClick={reset} className="w-full">
              <X className="mr-1 h-4 w-4" /> Сбросить фильтры
            </Button>
          </div>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="rounded-xl border bg-card p-12 text-center">
              <div className="text-4xl">🔎</div>
              <h3 className="mt-3 font-semibold">Ничего не найдено</h3>
              <p className="mt-1 text-sm text-muted-foreground">Попробуйте изменить параметры поиска.</p>
              <Button onClick={reset} className="mt-4 bg-primary text-primary-foreground hover:bg-primary-hover">Сбросить</Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</div>
      {children}
    </div>
  );
}
