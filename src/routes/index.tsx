import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star, Gamepad2, Crown, Key, Gift, Coins, AppWindow, Flame, Zap, Calendar, Percent, Trophy, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { products, categories, type Category } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { TopUpWidget } from "@/components/TopUpWidget";
import bannerGta from "@/assets/banner-gta6.jpg";
import bannerGreen from "@/assets/banner-green.jpg";
import bannerKeys from "@/assets/banner-keys.jpg";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wharp — игры, подписки, ключи и подарочные карты" },
      { name: "description", content: "Покупайте цифровые товары моментально: Steam, PS Plus, Xbox Game Pass, ключи, подарочные карты и внутриигровая валюта. Гарантия и поддержка 24/7." },
    ],
  }),
  component: Home,
});

const catIcons: Record<Category, typeof Gamepad2> = {
  games: Gamepad2,
  subscriptions: Crown,
  keys: Key,
  giftcards: Gift,
  ingame: Coins,
  software: AppWindow,
};

function Home() {
  const hot = products.filter((p) => p.hot).slice(0, 10);
  const fresh = products.filter((p) => p.new).slice(0, 10);
  
  const discounted = products
    .filter((p) => p.oldPrice && p.oldPrice > p.price)
    .sort((a, b) => (b.oldPrice! - b.price) / b.oldPrice! - (a.oldPrice! - a.price) / a.oldPrice!)
    .slice(0, 10);

  return (
    <div>
      {/* Hero banner slider */}
      <HeroBanner />

      {/* Пополнение сервисов */}
      <TopUpWidget />

      {/* GTA 6 preorder — spotlight */}
      <GtaPreorder />

      {/* Categories */}
      <section className="container-page py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold md:text-3xl">Категории</h2>
          <Link to="/catalog" className="text-sm text-primary hover:underline">Весь каталог →</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {(Object.keys(categories) as Category[]).map((slug) => {
            const Icon = catIcons[slug];
            const c = categories[slug];
            const count = products.filter((p) => p.category === slug).length;
            return (
              <Link
                key={slug}
                to="/category/$slug"
                params={{ slug }}
                className="card-hover group flex flex-col items-start gap-3 rounded-xl border bg-card p-4"
              >
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-accent-foreground transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">{c.title}</div>
                  <div className="text-xs text-muted-foreground">{count} товаров</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Hot */}
      <Section title="Хиты продаж" icon={Flame} link="/catalog" items={hot} />

      {/* Deal of the day */}
      <DealOfTheDay />

      {/* Subscriptions banner */}
      <section className="container-page py-12">
        <div className="overflow-hidden rounded-2xl gradient-green p-6 text-primary-foreground md:p-10">
          <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
                <Crown className="h-3 w-3" /> Подписки
              </div>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">PS Plus и Game Pass со скидкой до 70%</h2>
              <p className="mt-2 max-w-lg text-white/85">Активация на турецкий аккаунт за 5 минут. Все тарифы в наличии.</p>
            </div>
            <Button asChild size="lg" variant="secondary" className="bg-white text-foreground hover:bg-white/90">
              <Link to="/category/subscriptions">К подпискам <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* New */}
      <Section title="Новое на сайте" icon={Sparkles} link="/catalog" items={fresh} />

      {/* Platforms strip */}
      <PlatformsStrip />

      {/* Discounts */}
      <Section title="Скидки сейчас" icon={Percent} link="/catalog" items={discounted} />



      {/* Reviews */}
      <section className="bg-surface py-16">
        <div className="container-page">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-bold md:text-3xl">Отзывы покупателей</h2>
            <div className="text-right text-sm">
              <div className="flex items-center gap-1 font-semibold">
                <Star className="h-4 w-4 fill-warning text-warning" /> Высокий рейтинг
              </div>
              <div className="text-muted-foreground">по оценкам покупателей</div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {reviews.map((r) => (
              <div key={r.name} className="rounded-xl border bg-card p-5">
                <div className="mb-2 flex gap-1 text-warning">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-foreground/80">{r.text}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{r.name}</span>
                  <span>{r.product}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="container-page py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Как это работает?</h2>
            <p className="mt-3 text-muted-foreground">Wharp — это магазин цифровых товаров. Заказ → оплата → ключ на e-mail. Всё прозрачно.</p>
          </div>
          <ol className="space-y-4">
            {[
              ["Выберите товар", "Найдите нужную игру, подписку или карту в каталоге."],
              ["Оплатите удобным способом", "Карта, СБП или электронный кошелёк."],
              ["Получите моментально", "Ключ или активация придёт на e-mail сразу после оплаты."],
              ["Играйте и подписывайтесь", "Если что-то пошло не так — поддержка 24/7 в чате."],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-4">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary font-semibold text-primary-foreground">{i + 1}</div>
                <div>
                  <div className="font-semibold">{t}</div>
                  <div className="text-sm text-muted-foreground">{d}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}

function Section({
  title,
  link,
  items,
  icon: Icon,
}: {
  title: string;
  link: string;
  items: typeof products;
  icon?: typeof Flame;
}) {
  return (
    <section className="container-page py-10">
      <div className="mb-5 flex items-end justify-between">
        <h2 className="flex items-center gap-2 text-2xl font-bold md:text-3xl">
          {Icon ? <Icon className="h-6 w-6 text-primary" /> : null}
          {title}
        </h2>
        <Link to={link} className="text-sm text-primary hover:underline">Смотреть все →</Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

function HeroBanner() {
  const slides = [
    {
      text: "GTA 6 — предзаказ откроется с 15 июля",
      sub: "Все платформы: PS5, Xbox Series X|S, PC",
      link: "/catalog",
      cta: "Оформить",
      bg: bannerGta,
      overlay: "from-black/80 via-fuchsia-950/40 to-black/30",
    },
    {
      text: "Скидка 70% на PS Plus и Game Pass",
      sub: "Активация за 5 минут",
      link: "/category/subscriptions",
      cta: "К подпискам",
      bg: bannerGreen,
      overlay: "from-black/85 via-black/60 to-black/20",
    },
    {
      text: "Steam-пополнение от 100 ₽ без комиссии",
      sub: "Курс лучше банковского",
      link: "/category/giftcards",
      cta: "Пополнить",
      bg: bannerKeys,
      overlay: "from-black/80 via-blue-950/40 to-black/20",
    },
    {
      text: "Ключи с моментальной доставкой",
      sub: "Более 500 игр в каталоге",
      link: "/catalog",
      cta: "В каталог",
      bg: heroBg,
      overlay: "from-black/85 via-black/60 to-black/30",
    },
  ];

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section className="container-page pt-4">
      <div className="relative h-[150px] overflow-hidden rounded-xl border bg-dark">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === idx ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${s.bg})` }}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${s.overlay}`} />
            <div className="pointer-events-none absolute -left-16 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-primary/30 blur-3xl" />
            <div className="absolute inset-0 flex items-center justify-between gap-4 px-5 md:px-8">
              <div className="min-w-0">
                <p className="truncate text-base font-bold text-white md:text-xl">{s.text}</p>
                <p className="text-xs text-white/75 md:text-sm">{s.sub}</p>
              </div>
              <Button asChild size="lg" className="shrink-0">
                <Link to={s.link}>
                  {s.cta} <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function GtaPreorder() {
  const target = useMemo(() => new Date("2026-07-15T10:00:00+03:00").getTime(), []);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = Math.max(0, target - (now ?? target));
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  const cell = (v: number, l: string) => (
    <div className="rounded-lg bg-white/10 px-3 py-2 text-center backdrop-blur">
      <div className="text-2xl font-bold text-white md:text-3xl tabular-nums">{String(v).padStart(2, "0")}</div>
      <div className="text-[10px] uppercase tracking-wider text-white/70">{l}</div>
    </div>
  );

  return (
    <section className="container-page py-8">
      <div
        className="relative overflow-hidden rounded-2xl border bg-cover bg-center p-6 md:p-10"
        style={{ backgroundImage: `url(${bannerGta})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-fuchsia-900/40" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-primary/40">
              <Calendar className="h-3 w-3" /> Предзаказ с 15 июля
            </div>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">GTA 6 — предзаказ на все платформы</h2>
            <p className="mt-2 text-white/80">
              PS5, Xbox Series X|S и PC. Standard, Deluxe и Collector's — цены зафиксируем в день старта. Оставьте заявку и получите уведомление первыми.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/catalog">Оставить заявку <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                <Link to="/support">Уточнить у поддержки</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 md:gap-3">
            {cell(days, "дней")}
            {cell(hours, "часов")}
            {cell(mins, "минут")}
            {cell(secs, "сек")}
          </div>
        </div>
      </div>
    </section>
  );
}

function DealOfTheDay() {
  const deal = useMemo(
    () =>
      products
        .filter((p) => p.oldPrice && p.oldPrice > p.price)
        .sort((a, b) => (b.oldPrice! - b.price) - (a.oldPrice! - a.price))[0],
    [],
  );
  const [left, setLeft] = useState<{ h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const tick = () => {
      const d = Math.max(0, end.getTime() - Date.now());
      setLeft({
        h: Math.floor(d / 3600000),
        m: Math.floor((d % 3600000) / 60000),
        s: Math.floor((d % 60000) / 1000),
      });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  if (!deal) return null;
  const discount = Math.round((1 - deal.price / deal.oldPrice!) * 100);

  return (
    <section className="container-page py-10">
      <div className="grid gap-4 rounded-2xl border bg-card p-5 md:grid-cols-[240px_1fr] md:p-6">
        <Link to="/product/$slug" params={{ slug: deal.slug }} className="block overflow-hidden rounded-xl bg-dark">
          <img src={deal.image} alt={deal.title} className="h-full w-full object-cover" loading="lazy" />
        </Link>
        <div className="flex flex-col justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
              <Zap className="h-3 w-3" /> Товар дня · −{discount}%
            </div>
            <h3 className="text-xl font-bold md:text-2xl">{deal.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{deal.description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <div className="text-2xl font-bold text-primary">{deal.price.toLocaleString("ru-RU")} ₽</div>
              <div className="text-sm text-muted-foreground line-through">
                {deal.oldPrice!.toLocaleString("ru-RU")} ₽
              </div>
            </div>
            {left && (
              <div className="flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm font-medium">
                <span className="text-muted-foreground">До конца акции:</span>
                <span className="tabular-nums font-bold">
                  {String(left.h).padStart(2, "0")}:{String(left.m).padStart(2, "0")}:{String(left.s).padStart(2, "0")}
                </span>
              </div>
            )}
            <Button asChild size="lg" className="ml-auto">
              <Link to="/product/$slug" params={{ slug: deal.slug }}>Взять со скидкой</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlatformsStrip() {
  const items: { label: string; to: string; icon: typeof Trophy }[] = [
    { label: "Steam", to: "/catalog", icon: Gamepad2 },
    { label: "PlayStation", to: "/category/subscriptions", icon: Trophy },
    { label: "Xbox", to: "/category/subscriptions", icon: Trophy },
    { label: "Epic Games", to: "/catalog", icon: Gamepad2 },
    { label: "Nintendo", to: "/category/giftcards", icon: Gift },
    { label: "Battle.net", to: "/catalog", icon: Key },
  ];
  return (
    <section className="container-page py-8">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-2xl font-bold md:text-3xl">Магазины и платформы</h2>
        <Link to="/catalog" className="text-sm text-primary hover:underline">Все →</Link>
      </div>
      <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
        {items.map(({ label, to, icon: Ic }) => (
          <Link
            key={label}
            to={to}
            className="card-hover flex items-center gap-3 rounded-xl border bg-card px-4 py-3"
          >
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-foreground">
              <Ic className="h-4 w-4" />
            </div>
            <div className="font-semibold">{label}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}


const reviews = [
  { name: "Артём Соколов", product: "Red Dead Redemption 2", text: "Ключ пришёл за 2 минуты, активировался без проблем. Цена огонь, буду брать ещё." },
  { name: "Мария К.", product: "PS Plus Deluxe 12 мес", text: "Активировали на мой турецкий аккаунт за 10 минут. Поддержка в Telegram реально 24/7." },
  { name: "Дмитрий Овчинников", product: "Xbox Game Pass Ultimate", text: "Брал GPU на год за 5 тыс — нереально. Всё работает, ничего не слетело." },
  { name: "Илья Морозов", product: "Steam Random Top", text: "Из рандома выпал Cyberpunk 2077, кайф. В сумме на 7 ключах выиграл по деньгам." },
  { name: "Полина", product: "Discord Nitro 12 мес", text: "Получила сразу, всё активировалось. Стримы в HD огонь." },
  { name: "Сергей Б.", product: "Windows 11 Pro", text: "Активировал на двух пк, ключ рабочий. За такие деньги вообще шик." },
];

