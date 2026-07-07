import { useEffect, useState } from "react";
import { DollarSign, Euro, Clock, Users } from "lucide-react";

export function LiveStats() {
  const [usd, setUsd] = useState<number | null>(null);
  const [eur, setEur] = useState<number | null>(null);
  const [time, setTime] = useState("");
  const [online, setOnline] = useState<number | null>(null);

  useEffect(() => {
    setOnline(80 + Math.floor(Math.random() * 71));

    const loadRates = async () => {
      try {
        const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js", {
          cache: "no-store",
        });
        if (!response.ok) throw new Error("rates unavailable");

        const data = await response.json();
        const usdValue = Number(data?.Valute?.USD?.Value);
        const eurValue = Number(data?.Valute?.EUR?.Value);

        setUsd(Number.isFinite(usdValue) ? usdValue : null);
        setEur(Number.isFinite(eurValue) ? eurValue : null);
      } catch {
        setUsd(null);
        setEur(null);
      }
    };

    loadRates();

    const updateTime = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Moscow",
        }) + " МСК"
      );
    };
    updateTime();
    const t = setInterval(updateTime, 30_000);

    const o = setInterval(() => {
      setOnline((v) => {
        if (v === null) return 80 + Math.floor(Math.random() * 71);
        const next = v + Math.floor((Math.random() - 0.5) * 6);
        if (next < 80) return 80 + Math.floor(Math.random() * 5);
        if (next > 150) return 150 - Math.floor(Math.random() * 5);
        return next;
      });
    }, 4000);

    return () => {
      clearInterval(t);
      clearInterval(o);
    };
  }, []);

  return (
    <div className="hidden items-center gap-4 md:flex">
      <span className="inline-flex items-center gap-1">
        <DollarSign className="h-3 w-3 text-primary" />
        <span className="text-white/60">USD</span>
        <span className="font-medium text-white">{usd ? `${usd.toFixed(2)} ₽` : "—"}</span>
      </span>
      <span className="inline-flex items-center gap-1">
        <Euro className="h-3 w-3 text-primary" />
        <span className="text-white/60">EUR</span>
        <span className="font-medium text-white">{eur ? `${eur.toFixed(2)} ₽` : "—"}</span>
      </span>
      <span className="inline-flex items-center gap-1">
        <Clock className="h-3 w-3 text-primary" />
        <span className="font-medium text-white">{time || "—"}</span>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        <Users className="h-3 w-3 text-primary" />
        <span className="text-white/60">онлайн на сайте</span>
        <span className="font-medium text-white">{online ?? "—"}</span>
      </span>
    </div>
  );
}
