import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
import { Doc } from "@/components/Doc";

export const Route = createFileRoute("/privacy")({
  head: () => pageMeta({ title: 'Политика конфиденциальности — Wharp', description: 'Как Wharp собирает, хранит и защищает персональные данные покупателей цифровых товаров.', path: '/privacy' }),
  component: () => (
    <Doc title="Политика конфиденциальности" subtitle="Как мы обрабатываем ваши персональные данные">
      <p>Настоящая Политика составлена в соответствии с ФЗ-152 «О персональных данных».</p>
      <h2 className="text-xl font-bold">1. Какие данные собираются</h2>
      <p>E-mail, имя, телефон (по желанию), IP-адрес, cookie, данные о заказах. Данные банковских карт Wharp не хранит.</p>
      <h2 className="text-xl font-bold">2. Цели обработки</h2>
      <ul className="list-disc pl-5">
        <li>Оформление и доставка заказов</li>
        <li>Поддержка пользователей</li>
        <li>Маркетинговые рассылки (только с согласия)</li>
        <li>Аналитика и улучшение сервиса</li>
      </ul>
      <h2 className="text-xl font-bold">3. Третьи лица</h2>
      <p>Мы передаём данные платёжным шлюзам и сервисам аналитики. Все они работают в соответствии с GDPR/152-ФЗ.</p>
      <h2 className="text-xl font-bold">4. Ваши права</h2>
      <p>Вы можете запросить, удалить или изменить свои персональные данные, отправив письмо на privacy@wharp.ru.</p>
    </Doc>
  ),
});
