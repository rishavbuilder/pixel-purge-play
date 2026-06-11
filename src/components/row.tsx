import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export function Row({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) =>
    ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section className="mx-auto max-w-[1600px] px-4 sm:px-8 mt-12">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight">{title}</h2>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scroll(-1)}
            className="grid h-9 w-9 place-items-center rounded-full glass hover:bg-white/10 transition"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="grid h-9 w-9 place-items-center rounded-full glass hover:bg-white/10 transition"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:-mx-8 sm:px-8"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {children}
      </div>
    </section>
  );
}
