import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
import { Doc } from "@/components/Doc";

export const Route = createFileRoute("/payment")({
  head: () => pageMeta({ title: 'Способы оплаты — Wharp', description: 'Способы оплаты в Wharp: банковские карты Visa, MasterCard, МИР, Система быстрых платежей (СБП) и электронные кошельки.', path: '/payment' }),
  component: () => (
    <Doc title="Способы оплаты" subtitle="Принимаем удобные способы оплаты — выберите любой подходящий.">
      <div className="grid gap-3 md:grid-cols-2">
        {[
          ["СБП (Система быстрых платежей)", "Без комиссии, по QR-коду или номеру телефона"],
          ["Банковские карты", "Visa, Mastercard, МИР, UnionPay"],
          ["ЮMoney", "Электронный кошелёк"],
          ["Qiwi", "Электронный кошелёк"],
          ["Apple Pay / Google Pay", "По карте, в одно касание"],
          ["Альфа-Банк / Сбер / Тинькофф", "Прямые ссылки на оплату"],
          ["Юр.лица — счёт", "Безналичный расчёт по счёту"],
        ].map(([t, d]) => (
          <div key={t} className="rounded-xl border bg-card p-4">
            <div className="font-semibold">{t}</div>
            <div className="text-sm text-muted-foreground">{d}</div>
          </div>
        ))}
      </div>
      <p className="!mt-6 text-sm text-muted-foreground">Все платежи проходят через защищённый шлюз с поддержкой 3-D Secure. Wharp не хранит данные банковских карт.</p>
    </Doc>
  ),
});
