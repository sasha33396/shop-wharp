import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Gamepad2,
  Crown,
  Key,
  Gift,
  Coins,
  AppWindow,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { LiveStats } from "@/components/LiveStats";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { categories, searchProducts, formatPrice } from "@/data/products";
import { useCart, useFavorites } from "@/lib/store";

const navCats = [
  { slug: "games", icon: Gamepad2 },
  { slug: "subscriptions", icon: Crown },
  { slug: "keys", icon: Key },
  { slug: "giftcards", icon: Gift },
  { slug: "ingame", icon: Coins },
  { slug: "software", icon: AppWindow },
] as const;

export function Header() {
  const cartCount = useCart((s) => s.items.reduce((a, i) => a + i.qty, 0));
  const favCount = useFavorites((s) => s.ids.length);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const navigate = useNavigate();
  const ref = useRef<HTMLFormElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setMobile(false), [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const suggestions = useMemo(() => (q.trim() ? searchProducts(q).slice(0, 6) : []), [q]);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!q.trim()) return;
    setOpen(false);
    navigate({ to: "/catalog", search: { q } as never });
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      {/* Top bar */}
      <div className="border-b bg-dark text-white/80">
        <div className="container-page flex h-8 items-center justify-between text-xs">
          <LiveStats />


          <div className="flex gap-4">
            <Link to="/support" className="hover:text-primary">Поддержка</Link>
            <Link to="/blog" className="hover:text-primary">Блог</Link>
            <Link to="/about" className="hover:text-primary">О нас</Link>
          </div>
        </div>
      </div>

      {/* Main row */}
      <div className="container-page flex h-16 items-center gap-3 md:gap-6">
        <Link to="/" className="flex shrink-0 items-center" aria-label="Wharp — главная">
          <Logo className="h-7 w-auto md:h-8" />
        </Link>


        <form
          onSubmit={submit}
          className="relative flex-1"
          ref={ref}
          onFocus={() => setOpen(true)}
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(true);
            }}
            placeholder="Поиск игр, подписок, ключей..."
            className="h-10 pl-9 pr-24"
          />
          <Button
            type="submit"
            size="sm"
            className="absolute right-1 top-1 h-8 bg-primary text-primary-foreground hover:bg-primary-hover"
          >
            Найти
          </Button>

          {open && suggestions.length > 0 && (
            <div className="absolute inset-x-0 top-full z-40 mt-2 overflow-hidden rounded-xl border bg-popover shadow-lg">
              {suggestions.map((p) => (
                <Link
                  key={p.id}
                  to="/product/$slug"
                  params={{ slug: p.slug }}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-muted"
                >
                  <img src={p.image} alt="" className="h-12 w-9 rounded object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{p.title}</div>
                    <div className="text-xs text-muted-foreground">{p.platform} · {p.region}</div>
                  </div>
                  <div className="text-sm font-semibold text-primary">{formatPrice(p.price)}</div>
                </Link>
              ))}
              <Link
                to="/catalog"
                search={{ q } as never}
                onClick={() => setOpen(false)}
                className="block border-t bg-muted/40 px-3 py-2 text-center text-sm font-medium text-primary hover:bg-muted"
              >
                Показать все результаты ({searchProducts(q).length})
              </Link>
            </div>
          )}
        </form>

        <div className="hidden items-center gap-1 md:flex">
          <Link to="/favorites" className="relative grid h-10 w-10 place-items-center rounded-lg hover:bg-muted">
            <Heart className="h-5 w-5" />
            {favCount > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center bg-primary px-1 text-[10px] text-primary-foreground">
                {favCount}
              </Badge>
            )}
          </Link>
          <Link to="/auth" className="grid h-10 w-10 place-items-center rounded-lg hover:bg-muted" aria-label="Профиль">
            <User className="h-5 w-5" />
          </Link>
          <Link to="/cart" className="relative ml-1 flex h-10 items-center gap-2 rounded-lg bg-primary px-3 text-primary-foreground transition hover:bg-primary-hover">
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden text-sm font-medium lg:inline">Корзина</span>
            {cartCount > 0 && (
              <Badge className="ml-1 h-5 min-w-5 justify-center bg-white px-1 text-[11px] text-primary">
                {cartCount}
              </Badge>
            )}
          </Link>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg hover:bg-muted md:hidden"
          onClick={() => setMobile((m) => !m)}
          aria-label="Меню"
        >
          {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Category nav */}
      <nav className="hidden border-t bg-surface md:block">
        <div className="container-page flex h-11 items-center gap-1 overflow-x-auto">
          <Link
            to="/catalog"
            className="flex h-8 items-center gap-2 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
          >
            <Menu className="h-4 w-4" />
            Каталог
          </Link>
          {navCats.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.slug}
                to="/category/$slug"
                params={{ slug: c.slug }}
                className="flex h-8 items-center gap-1.5 whitespace-nowrap rounded-md px-3 text-sm text-foreground/80 hover:bg-background hover:text-foreground"
              >
                <Icon className="h-3.5 w-3.5" />
                {categories[c.slug].title}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile nav */}
      {mobile && (
        <div className="border-t bg-background md:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            {navCats.map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.slug}
                  to="/category/$slug"
                  params={{ slug: c.slug }}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  {categories[c.slug].title}
                </Link>
              );
            })}
            <div className="my-2 border-t" />
            <Link to="/cart" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted">
              <ShoppingCart className="h-4 w-4" /> Корзина ({cartCount})
            </Link>
            <Link to="/favorites" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted">
              <Heart className="h-4 w-4" /> Избранное ({favCount})
            </Link>
            <Link to="/auth" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted">
              <User className="h-4 w-4" /> Профиль
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
