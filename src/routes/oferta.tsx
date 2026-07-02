import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
import { Doc } from "@/components/Doc";

export const Route = createFileRoute("/oferta")({
  head: () => pageMeta({ title: 'Публичная оферта — Wharp', description: 'Публичная оферта магазина Wharp: условия продажи цифровых товаров, ключей, подписок и подарочных карт.', path: '/oferta' }),
  component: () => (
    <Doc title="Публичная оферта" subtitle="Договор купли-продажи цифровых товаров">
      <p>Администрация сайта wharp-app.ru (далее — «Продавец») публикует настоящую оферту о продаже цифровых товаров.</p>
      <h2 className="text-xl font-bold">1. Предмет договора</h2>
      <p>Продавец обязуется передать Покупателю цифровой товар (ключ активации, код подписки и т. п.), а Покупатель обязуется оплатить его стоимость.</p>
      <h2 className="text-xl font-bold">2. Цена и оплата</h2>
      <p>Все цены указаны в рублях РФ с учётом всех налогов. Оплата производится одним из способов, представленных на сайте.</p>
      <h2 className="text-xl font-bold">3. Доставка</h2>
      <p>Доставка осуществляется в электронном виде на e-mail Покупателя в течение 1–30 минут после оплаты.</p>
      <h2 className="text-xl font-bold">4. Возврат и гарантии</h2>
      <p>Возврат средств возможен в случае неработоспособного ключа или несоответствия товара описанию. Заявка на возврат подаётся на support@wharp.ru в течение 14 дней.</p>
      <h2 className="text-xl font-bold">5. Контакты</h2>
      <p className="text-sm">support@wharp.ru · legal@wharp.ru</p>
    </Doc>
  ),
});
