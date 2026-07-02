import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
import { Doc } from "@/components/Doc";
import { Mail, Phone, MessageCircle, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/contacts")({
  head: () => pageMeta({ title: 'Контакты Wharp — поддержка и связь', description: 'Контакты Wharp: email поддержки, отдела по работе с партнёрами и юридического отдела. Чат поддержки 24/7.', path: '/contacts' }),
  component: () => (
    <Doc title="Контакты" subtitle="Свяжитесь с нами любым удобным способом. Поддержка работает 24/7.">
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { i: Mail, t: "Общая поддержка", v: "support@wharp.ru", h: "mailto:support@wharp.ru" },
          { i: Mail, t: "Партнёрство и реклама", v: "partners@wharp.ru", h: "mailto:partners@wharp.ru" },
          { i: Mail, t: "Пресса", v: "press@wharp.ru", h: "mailto:press@wharp.ru" },
          { i: Mail, t: "Юридические вопросы", v: "legal@wharp.ru", h: "mailto:legal@wharp.ru" },
          { i: Mail, t: "Жалобы и претензии", v: "abuse@wharp.ru", h: "mailto:abuse@wharp.ru" },
          { i: MessageCircle, t: "Telegram-чат", v: "@wharp_app", h: "https://t.me/wharp_app" },
          { i: Phone, t: "Телефон (Москва)", v: "+7 (495) 123-45-67", h: "tel:+74951234567" },
          { i: Phone, t: "Бесплатный 8-800", v: "8 (800) 555-12-34", h: "tel:88005551234" },
        ].map(({ i: Icon, t, v, h }) => (
          <a key={v} href={h} className="flex items-start gap-3 rounded-xl border bg-card p-4 transition hover:border-primary">
            <Icon className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">{t}</div>
              <div className="font-medium">{v}</div>
            </div>
          </a>
        ))}
      </div>

      <div className="!mt-8 grid gap-3 rounded-xl bg-surface p-5">
        <div className="flex gap-3"><MapPin className="h-5 w-5 text-primary" /> <span>123022, г. Москва, Пресненская наб., д. 12, оф. 24</span></div>
        <div className="flex gap-3"><Clock className="h-5 w-5 text-primary" /> <span>Работаем 24/7, без выходных</span></div>
      </div>
    </Doc>
  ),
});
