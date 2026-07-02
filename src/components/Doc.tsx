import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export function Doc({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="container-page py-12">
      <nav className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">Главная</Link> / {title}
      </nav>
      <h1 className="mt-2 text-3xl font-bold md:text-4xl">{title}</h1>
      {subtitle && <p className="mt-2 max-w-2xl text-muted-foreground">{subtitle}</p>}
      <div className="mt-8 max-w-3xl space-y-4 text-foreground/85 leading-relaxed">{children}</div>
    </div>
  );
}
