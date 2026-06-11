import { Link } from "@tanstack/react-router";
import { Play, Plus, Star } from "lucide-react";
import type { Anime } from "@/lib/anime-data";

export function AnimeCard({
  anime,
  rank,
  episode,
  progress,
}: {
  anime: Anime;
  rank?: number;
  episode?: number;
  progress?: number;
}) {
  return (
    <Link
      to="/anime/$id"
      params={{ id: anime.id }}
      className="group relative block w-[180px] sm:w-[200px] overflow-hidden rounded-2xl bg-surface transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_-15px_oklch(0.58_0.24_295/0.6)]"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl">
        <img
          src={anime.poster}
          alt={anime.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-[var(--gradient-card)] opacity-80" />

        {/* Top badges */}
        <div className="absolute top-2 left-2 right-2 flex items-start justify-between gap-2">
          <span className="glass rounded-md px-2 py-0.5 text-[11px] font-semibold flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {anime.rating}
          </span>
          {episode ? (
            <span className="rounded-md bg-[var(--gradient-primary)] px-2 py-0.5 text-[11px] font-bold">
              EP {episode}
            </span>
          ) : (
            <span className="glass rounded-md px-2 py-0.5 text-[11px] font-medium">
              {anime.type === "Movie" ? "Movie" : `${anime.episodes} EP`}
            </span>
          )}
        </div>

        {rank && (
          <div className="absolute -bottom-2 -left-2 font-display text-7xl font-black leading-none text-white/95 [text-shadow:_-2px_0_0_oklch(0.58_0.24_295),_2px_0_0_oklch(0.58_0.24_295),_0_-2px_0_oklch(0.58_0.24_295),_0_2px_0_oklch(0.58_0.24_295)]">
            {rank}
          </div>
        )}

        {/* Hover play */}
        <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="h-14 w-14 grid place-items-center rounded-full bg-[var(--gradient-primary)] glow-primary scale-90 transition-transform duration-300 group-hover:scale-100">
            <Play className="h-6 w-6 fill-white text-white translate-x-0.5" />
          </div>
        </div>

        {/* Info bottom */}
        <div className={`absolute inset-x-0 bottom-0 p-3 ${rank ? "pl-20" : ""}`}>
          <h3 className="line-clamp-2 text-sm font-semibold leading-tight drop-shadow-md">
            {anime.title}
          </h3>
          <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-1">
            {anime.genres.slice(0, 2).join(" • ")}
          </p>
          {progress != null && (
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full bg-[var(--gradient-primary)]"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
