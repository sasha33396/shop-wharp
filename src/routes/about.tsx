import { createFileRoute } from "@tanstack/react-router";
import { Doc } from "@/components/Doc";
import { Award, Globe, Users, Zap } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "О нас — Wharp" },
      { name: "description", content: "Wharp — магазин цифровых товаров: игры, подписки, ключи и подарочные карты с моментальной доставкой." },
    ],
  }),
  component: () => (
    <Doc title="О компании Wharp" subtitle="Магазин цифровых товаров с моментальной доставкой и гарантией.">
      <p>Wharp — это онлайн-магазин, где можно купить игры Steam, PlayStation и Xbox, подписки PS Plus и Game Pass, ключи активации, подарочные карты, внутриигровую валюту и программное обеспечение. Мы доставляем заказы на e-mail в течение минуты после оплаты.</p>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {[
          { i: Users, n: "100+", t: "товаров в каталоге" },
          { i: Globe, n: "10+", t: "регионов активации" },
          { i: Zap, n: "до 1 мин", t: "доставка ключа" },
          { i: Award, n: "24/7", t: "поддержка" },
        ].map(({ i: Icon, n, t }) => (
          <div key={t} className="rounded-xl border bg-card p-5">
            <Icon className="h-6 w-6 text-primary" />
            <div className="mt-2 text-2xl font-bold">{n}</div>
            <div className="text-sm text-muted-foreground">{t}</div>
          </div>
        ))}
      </div>

      <h2 className="!mt-10 text-xl font-bold">Наша миссия</h2>
      <p>Сделать покупку цифровых товаров простой, прозрачной и выгодной. Мы контролируем качество ключей и гарантируем возврат средств, если что-то пошло не так.</p>

      <h2 className="!mt-8 text-xl font-bold">Контакты</h2>
      <p className="text-sm text-muted-foreground">Поддержка: support@wharp.ru · Сотрудничество: partners@wharp.ru · Юридические вопросы: legal@wharp.ru</p>
    </Doc>
  ),
});
