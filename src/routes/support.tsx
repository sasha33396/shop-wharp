import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
import { Doc } from "@/components/Doc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Send, Mail } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/support")({
  head: () => pageMeta({ title: 'Поддержка 24/7 — Wharp', description: 'Служба поддержки Wharp работает круглосуточно: помощь с активацией ключей, оплатой и доставкой цифровых товаров.', path: '/support' }),
  component: () => (
    <Doc title="Поддержка 24/7" subtitle="Среднее время ответа — менее 2 минут. Мы на связи в чате, Telegram и по e-mail.">
      <div className="grid gap-3 md:grid-cols-3">
        <a href="https://t.me/wharp_app" className="flex items-center gap-3 rounded-xl border bg-card p-4 hover:border-primary">
          <Send className="h-5 w-5 text-primary" />
          <div><div className="font-semibold">Telegram</div><div className="text-sm text-muted-foreground">@wharp_app</div></div>
        </a>
        <a href="#" className="flex items-center gap-3 rounded-xl border bg-card p-4 hover:border-primary">
          <MessageCircle className="h-5 w-5 text-primary" />
          <div><div className="font-semibold">Чат на сайте</div><div className="text-sm text-muted-foreground">Внизу справа</div></div>
        </a>
        <a href="mailto:support@wharp.ru" className="flex items-center gap-3 rounded-xl border bg-card p-4 hover:border-primary">
          <Mail className="h-5 w-5 text-primary" />
          <div><div className="font-semibold">E-mail</div><div className="text-sm text-muted-foreground">support@wharp.ru</div></div>
        </a>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); toast.success("Сообщение отправлено"); }}
        className="!mt-8 rounded-xl border bg-card p-6"
      >
        <h2 className="mb-4 text-lg font-semibold">Форма обращения</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div><Label>Ваше имя</Label><Input required className="mt-1" /></div>
          <div><Label>E-mail</Label><Input type="email" required className="mt-1" /></div>
          <div className="md:col-span-2"><Label>Номер заказа (если есть)</Label><Input className="mt-1" /></div>
          <div className="md:col-span-2"><Label>Сообщение</Label><Textarea required rows={5} className="mt-1" /></div>
        </div>
        <Button type="submit" className="mt-4 bg-primary text-primary-foreground hover:bg-primary-hover">Отправить</Button>
      </form>
    </Doc>
  ),
});
