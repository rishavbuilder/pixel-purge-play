import { Link } from "@tanstack/react-router";
import { Play, Plus, Info, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { trending, type Anime } from "@/lib/anime-data";

export function Hero() {
  const items = trending().slice(0, 5);
  const [idx, setIdx] = useState(0);
  const current = items[idx];

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 7000);
    return () => clearInterval(t);
  }, [items.length]);

  return (
    <section className="relative h-[88vh] min-h-[620px] w-full overflow-hidden">
      {items.map((a, i) => (
        <HeroSlide key={a.id} anime={a} active={i === idx} />
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-end pb-24 sm:pb-32">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-8">
          <div key={current.id} className="max-w-2xl animate-fade-up">
            <div className="mb-4 flex items-center gap-2">
              <span className="rounded-full bg-[var(--gradient-primary)] px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                #{current.trending} Trending
              </span>
              <span className="glass rounded-full px-3 py-1 text-[11px] font-medium">
                {current.year} • {current.type}
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
              {current.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              <span className="flex items-center gap-1.5 font-semibold">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {current.rating}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{current.episodes} Episodes</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{current.studio}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {current.genres.map((g) => (
                <span key={g} className="glass rounded-full px-3 py-1 text-xs">
                  {g}
                </span>
              ))}
            </div>
            <p className="mt-5 max-w-xl text-sm sm:text-base text-muted-foreground line-clamp-3">
              {current.description}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/watch/$id"
                params={{ id: current.id }}
                className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black hover:bg-white/90 transition shadow-lg"
              >
                <Play className="h-4 w-4 fill-black" />
                Watch Now
              </Link>
              <button className="flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold hover:bg-white/10 transition">
                <Plus className="h-4 w-4" />
                Watchlist
              </button>
              <Link
                to="/anime/$id"
                params={{ id: current.id }}
                className="flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-muted-foreground hover:text-white transition"
              >
                <Info className="h-4 w-4" />
                Details
              </Link>
            </div>
          </div>

          {/* Slide indicators */}
          <div className="mt-8 flex items-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === idx ? "w-10 bg-white" : "w-5 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSlide({ anime, active }: { anime: Anime; active: boolean }) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-[1200ms] ${
        active ? "opacity-100" : "opacity-0"
      }`}
    >
      <img
        src={anime.banner}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover ${active ? "animate-kenburns" : ""}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
    </div>
  );
}
