import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";

type Service = {
  id: string;
  name: string;
  placeholder: string;
  hint: string;
  rate: number; // курс: 1 ед. сервиса = rate ₽
  unit: string;
  regions: { code: string; label: string }[];
  icon: ReactNode;
};

const SERVICES: Service[] = [
  {
    id: "steam",
    name: "Steam",
    placeholder: "Логин Steam",
    hint: "Как узнать логин?",
    rate: 1.1,
    unit: "₽",
    regions: [
      { code: "RU", label: "RU, ₽" },
      { code: "KZ", label: "KZ, ₸" },
    ],
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 0C5.55 0 .26 4.84 0 11l6.45 2.66a3.4 3.4 0 0 1 1.9-.57l2.87-4.13v-.06a4.55 4.55 0 1 1 4.55 4.54h-.1l-4.07 2.9a3.4 3.4 0 0 1-6.78.32L0 14.71C1.5 20.04 6.27 24 12 24c6.62 0 12-5.37 12-12S18.63 0 12 0Z"/></svg>
    ),
  },
  {
    id: "playstation",
    name: "PlayStation",
    placeholder: "ID аккаунта PSN",
    hint: "Как узнать ID?",
    rate: 1.15,
    unit: "TL",
    regions: [
      { code: "TR", label: "TR, ₺" },
      { code: "US", label: "US, $" },
    ],
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M9.4 4v13.6l3.3 1V8.2c0-.7.4-1.1.9-1 .6.2.8.7.8 1.4v4.7c2-.9 3.4-1.6 3.4-3.7 0-2.2-1.6-3-3.7-3.7C11.7 4 9.7 3.6 8.5 4M5.6 17.7v-2.2l2.5-.9V13l-5 1.8c-.7.3-1.2.7-1.2 1.3 0 .6.6 1 1.4 1.3 1.1.3 2 .3 2.3.3M14.8 17.5l5.3-1.9c.7-.3 1.2-.7 1.2-1.3 0-.6-.5-1-1.4-1.3-1-.3-2-.3-2.3-.3l-2.8 1v2.2l2.6-.9c.4-.1.6 0 .6.3 0 .2-.2.4-.6.5l-2.6 1z"/></svg>
    ),
  },
  {
    id: "telegram",
    name: "Telegram",
    placeholder: "@username",
    hint: "Как купить звёзды?",
    rate: 1.6,
    unit: "★",
    regions: [{ code: "RU", label: "Глобал, $" }],
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="m9.78 18.65 .28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.24 3.64 11.93c-.88-.25-.89-.86.2-1.3L19.83 4.4c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>
    ),
  },
  {
    id: "apple",
    name: "Apple",
    placeholder: "Apple ID",
    hint: "Как пополнить App Store?",
    rate: 1.25,
    unit: "₽",
    regions: [
      { code: "RU", label: "RU, ₽" },
      { code: "US", label: "US, $" },
    ],
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M16.5 12.5c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.4 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.5 1.3-.1 1.8-.8 3.3-.8 1.5 0 2 .8 3.3.8 1.4 0 2.3-1.2 3.1-2.4.7-1 1.1-2.1 1.3-2.6-.1 0-2.6-1-2.6-3.9zM14 4.6c.7-.9 1.2-2.1 1-3.3-1.1.1-2.4.7-3.1 1.6-.7.8-1.3 2.1-1.1 3.2 1.2.1 2.5-.6 3.2-1.5z"/></svg>
    ),
  },
];

const QUICK: Record<string, number[]> = {
  steam: [200, 500, 1000],
  playstation: [100, 250, 500],
  telegram: [50, 100, 500],
  apple: [500, 1000, 2500],
};

export function TopUpWidget() {
  const [active, setActive] = useState("steam");
  const [amount, setAmount] = useState(1000);
  const [region, setRegion] = useState(0);
  const [login, setLogin] = useState("");
  const svc = SERVICES.find((s) => s.id === active)!;
  const price = Math.round(amount * svc.rate);

  return (
    <section className="container-page pt-5 pb-10">
      <div className="rounded-2xl border bg-card p-5 shadow-sm md:p-8">
        <div className="text-sm text-muted-foreground">Пополнение сервисов</div>

        {/* tabs */}
        <div className="mt-3 flex flex-wrap items-center gap-6 border-b">
          {SERVICES.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setActive(s.id);
                setRegion(0);
              }}
              className={`-mb-px flex items-center gap-2 border-b-2 pb-3 text-lg font-bold transition ${
                active === s.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.icon}
              {s.name}
            </button>
          ))}
        </div>

        {/* form */}
        <div className="mt-5 grid gap-3 md:grid-cols-[1fr,160px,1fr,auto]">
          <label className="relative block rounded-xl bg-muted/60 px-4 py-3">
            <span className="block text-xs text-muted-foreground">Получите</span>
            <input
              type="number"
              min={1}
              value={amount}
              onChange={(e) => setAmount(Math.max(1, Number(e.target.value) || 0))}
              className="w-full bg-transparent text-lg font-semibold outline-none"
            />
          </label>

          <label className="relative flex items-center justify-between rounded-xl bg-muted/60 px-4 py-3">
            <select
              value={region}
              onChange={(e) => setRegion(Number(e.target.value))}
              className="w-full appearance-none bg-transparent font-medium outline-none"
            >
              {svc.regions.map((r, i) => (
                <option key={r.code} value={i}>
                  {r.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none h-4 w-4 text-muted-foreground" />
          </label>

          <div className="flex flex-col">
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder={svc.placeholder}
              className="w-full rounded-xl bg-muted/60 px-4 py-3 outline-none placeholder:text-muted-foreground"
            />
            <button
              type="button"
              onClick={() =>
                toast("Подсказка", {
                  description:
                    "Логин (никнейм) можно найти в настройках вашего аккаунта.",
                })
              }
              className="mt-1 self-end text-xs text-muted-foreground underline"
            >
              {svc.hint}
            </button>
          </div>

          <Button
            size="lg"
            className="h-[58px] rounded-xl bg-primary px-6 text-base font-bold text-primary-foreground hover:bg-primary-hover"
            onClick={() =>
              toast.error("Оплата временно недоступна", {
                description: "Проводим технические работы. Попробуйте позже.",
              })
            }
          >
            Купить за {price.toLocaleString("ru-RU")} ₽
          </Button>
        </div>

        {/* quick amounts */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {QUICK[active].map((q) => (
            <button
              key={q}
              onClick={() => setAmount(q)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                amount === q
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-transparent bg-muted/60 text-muted-foreground hover:bg-muted"
              }`}
            >
              {q} {svc.unit}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
