import { createFileRoute, Link } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
import { Doc } from "@/components/Doc";

const posts = [
  { slug: "ps-plus-vs-game-pass", title: "PS Plus vs Game Pass: что выгоднее в 2026?", date: "12 июня 2026", excerpt: "Сравниваем подписки по цене, играм и регионам. Спойлер: оба хороши, но...", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/PlayStation_Plus_logo.svg/800px-PlayStation_Plus_logo.svg.png" },
  { slug: "kak-aktivirovat-turetskii-akkaunt", title: "Как создать турецкий аккаунт PSN в 2026", date: "5 июня 2026", excerpt: "Пошаговая инструкция: VPN, регион, оплата и активация подписок.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_logo.svg/800px-PlayStation_logo.svg.png" },
  { slug: "luchshie-igry-2026", title: "Топ-15 ожидаемых игр 2026 года", date: "1 июня 2026", excerpt: "GTA VI, Death Stranding 2, Ghost of Yotei и другие громкие релизы.", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg" },
  { slug: "random-keys-guide", title: "Random-ключи Steam: гайд и реальные шансы", date: "20 мая 2026", excerpt: "Что выпадает чаще всего и стоит ли вообще брать. Разбираем статистику.", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg" },
  { slug: "kak-poluchit-skidku", title: "Как получить максимальную скидку на Wharp", date: "15 мая 2026", excerpt: "Промокоды, кэшбек, программа лояльности и распродажи.", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg" },
  { slug: "stalker-2-obzor", title: "Stalker 2: впечатления через 100 часов", date: "10 мая 2026", excerpt: "Возвращение в Зону получилось масштабным, но не без проблем.", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1643320/header.jpg" },
];


export const Route = createFileRoute("/blog")({
  head: () => pageMeta({ title: 'Блог Wharp — гайды, обзоры и новости игр', description: 'Гайды по активации ключей, обзоры игр и сервисов, новости индустрии и подборки лучших цифровых товаров.', path: '/blog' }),
  component: () => (
    <Doc title="Блог" subtitle="Гайды, новости и обзоры цифровых товаров и игр.">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link key={p.slug} to="/blog" className="card-hover overflow-hidden rounded-xl border bg-card">
            <img src={p.img} alt="" className="aspect-[16/9] w-full object-cover" />
            <div className="p-4">
              <div className="text-xs text-muted-foreground">{p.date}</div>
              <h3 className="mt-1 font-semibold leading-snug">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </Doc>
  ),
});
