import type { ReactNode } from "react";

export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-[1600px] px-4 sm:px-8 pt-32 pb-6">
      <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight">
        {title}
      </h1>
      {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
      {children}
    </div>
  );
}

export function Grid({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-[1600px] px-4 sm:px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
      {children}
    </div>
  );
}
