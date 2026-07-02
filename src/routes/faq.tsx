import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
import { Doc } from "@/components/Doc";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faq = [
  ["Как купить товар?", "Добавьте товар в корзину, перейдите к оформлению, укажите e-mail, выберите способ оплаты и оплатите. Ключ придёт на e-mail в течение минуты."],
  ["Безопасно ли покупать на Wharp?", "Да. Все товары проходят проверку, платежи защищены 3-D Secure, а в случае проблем с ключом мы вернём деньги или заменим его."],
  ["Что если ключ не активировался?", "Напишите в чат поддержки 24/7 — мы заменим ключ или вернём деньги в течение часа."],
  ["Можно ли вернуть товар?", "Цифровые товары возврату по ст. 26.1 ЗоЗПП не подлежат, но Wharp возвращает средства, если ключ не работает или не соответствует описанию."],
  ["Какие регионы PS Plus / Game Pass вы продаёте?", "Основные: Турция, Аргентина, США, Индия. Активация производится на ваш существующий аккаунт или мы создаём новый под вас."],
  ["Что такое Random-ключ?", "Это случайный ключ Steam — вы платите небольшую сумму и получаете случайную игру из премиум-пула. Часто выпадают AAA-тайтлы."],
  ["Можно ли оплатить с юр. лица?", "Да. Выставим счёт и закрывающие документы. Напишите на legal@wharp.ru."],
  ["Есть ли скидки для постоянных клиентов?", "Да, после 3-го заказа вы получаете персональный кэшбек 3–7% и доступ к закрытым распродажам."],
];

export const Route = createFileRoute("/faq")({
  head: () => pageMeta({ title: 'Частые вопросы — Wharp', description: 'Ответы на частые вопросы об оплате, доставке, активации ключей и возврате цифровых товаров в Wharp.', path: '/faq' }),
  component: () => (
    <Doc title="Частые вопросы" subtitle="Если не нашли ответ — напишите нам, поможем 24/7.">
      <Accordion type="single" collapsible className="!mt-2">
        {faq.map(([q, a]) => (
          <AccordionItem key={q} value={q}>
            <AccordionTrigger className="text-left">{q}</AccordionTrigger>
            <AccordionContent className="text-foreground/80">{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Doc>
  ),
});
