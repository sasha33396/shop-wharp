import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="mt-16 bg-dark text-white/80">

      <div className="container-page grid gap-8 py-8 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <div className="mb-2 text-sm font-semibold text-white">Каталог</div>
            <ul className="space-y-2">
              {[
                ["Игры", "/category/games"],
                ["Подписки", "/category/subscriptions"],
                ["Ключи и DLC", "/category/keys"],
                ["Подарочные карты", "/category/giftcards"],
                ["Валюта", "/category/ingame"],
                ["Программы", "/category/software"],
              ].map(([t, h]) => (
                <li key={h}>
                  <Link to={h} className="text-white/70 transition hover:text-primary">{t}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-2 text-sm font-semibold text-white">Покупателям</div>
            <ul className="space-y-2">
              {[
                ["Как купить", "/faq"],
                ["Оплата", "/payment"],
                ["Доставка", "/delivery"],
                ["Поддержка", "/support"],
                ["О нас", "/about"],
                ["Контакты", "/contacts"],
              ].map(([t, h]) => (
                <li key={h}>
                  <Link to={h} className="text-white/70 transition hover:text-primary">{t}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div className="mb-2 text-sm font-semibold text-white">Реквизиты</div>
          <div className="space-y-1 text-sm leading-relaxed text-white/50">
            <div>ИП Ситякова Олеся Олеговна</div>
            <div>ИНН: 644912390974 · ОГРНИП: 326645700070897</div>
            <div>Дата регистрации: 30.06.2026</div>
            <div>ОКВЭД: 62.09 — Деятельность, связанная с использованием вычислительной техники и информационных технологий, прочая</div>
            <div>Адрес: Саратовская обл., Энгельсский м.р-н, г.п. город Энгельс, г. Энгельс</div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-start justify-between gap-3 py-4 text-xs text-white/50 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <Logo className="h-5 w-auto text-white" />
            <span>© Wharp · shop.wharp.pro</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <a href="mailto:support@wharp.ru" className="hover:text-primary">support@wharp.ru</a>
            <a href="https://t.me/wharp_app" className="hover:text-primary">Telegram</a>
            <Link to="/terms" className="hover:text-primary">Пользовательское соглашение</Link>
            <Link to="/privacy" className="hover:text-primary">Политика конфиденциальности</Link>
            <Link to="/oferta" className="hover:text-primary">Публичная оферта</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
