import { createFileRoute, Link } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/Logo";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => pageMeta({ title: 'Вход и регистрация — Wharp', description: 'Войдите или создайте аккаунт Wharp, чтобы покупать игры, подписки, ключи и подарочные карты с моментальной доставкой.', path: '/auth' }),
  component: Auth,
});

function Auth() {
  const [tab, setTab] = useState("signin");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(tab === "signin" ? "Вход выполнен" : "Аккаунт создан");
  };

  return (
    <div className="container-page grid min-h-[70vh] place-items-center py-8">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-card">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-xl gradient-green text-white">
            <Logo className="h-4 w-auto" />
          </span>
          <h1 className="text-xl font-bold">Войти в Wharp</h1>
          <p className="text-sm text-muted-foreground">История заказов, бонусы и быстрая оплата</p>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Вход</TabsTrigger>
            <TabsTrigger value="signup">Регистрация</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <form onSubmit={submit} className="mt-4 space-y-4">
              <div><Label>E-mail</Label><Input type="email" required className="mt-1" /></div>
              <div><Label>Пароль</Label><Input type="password" required className="mt-1" /></div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2"><input type="checkbox" /> Запомнить меня</label>
                <a href="#" className="text-primary hover:underline">Забыли пароль?</a>
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary-hover">Войти</Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={submit} className="mt-4 space-y-4">
              <div><Label>Имя</Label><Input required className="mt-1" /></div>
              <div><Label>E-mail</Label><Input type="email" required className="mt-1" /></div>
              <div><Label>Пароль</Label><Input type="password" required className="mt-1" /></div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary-hover">Создать аккаунт</Button>
              <p className="text-center text-xs text-muted-foreground">
                Создавая аккаунт, вы принимаете <Link to="/terms" className="text-primary underline">соглашение</Link>.
              </p>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <div className="relative my-4 text-center text-xs text-muted-foreground">
            <span className="bg-card px-2 relative z-10">или войти через</span>
            <span className="absolute left-0 top-1/2 h-px w-full bg-border" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["VK", "Google", "Telegram"].map((p) => (
              <Button key={p} variant="outline" type="button">{p}</Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
