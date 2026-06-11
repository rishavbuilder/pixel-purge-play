import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimeCard } from "@/components/anime-card";
import { Grid, PageHeader } from "@/components/page-header";
import { ANIME, GENRES } from "@/lib/anime-data";

export const Route = createFileRoute("/genres")({
  head: () => ({ meta: [{ title: "Genres — AniVerse" }] }),
  component: GenresPage,
});

function GenresPage() {
  const [active, setActive] = useState<string>("All");
  const list = active === "All" ? ANIME : ANIME.filter((a) => a.genres.includes(active));
  return (
    <>
      <PageHeader title="Browse by Genre" subtitle="Find your next obsession">
        <div className="mt-6 flex flex-wrap gap-2">
          {["All", ...GENRES].map((g) => (
            <button
              key={g}
              onClick={() => setActive(g)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                active === g
                  ? "bg-[var(--gradient-primary)] text-white glow-primary"
                  : "glass text-muted-foreground hover:text-white"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </PageHeader>
      <Grid>
        {list.map((a) => (
          <AnimeCard key={a.id} anime={a} className="w-full" />
        ))}
      </Grid>
    </>
  );
}
