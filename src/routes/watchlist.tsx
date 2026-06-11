import { createFileRoute } from "@tanstack/react-router";
import { AnimeCard } from "@/components/anime-card";
import { Grid, PageHeader } from "@/components/page-header";
import { ANIME } from "@/lib/anime-data";

export const Route = createFileRoute("/watchlist")({
  head: () => ({ meta: [{ title: "Watchlist — AniVerse" }] }),
  component: () => (
    <>
      <PageHeader title="My Watchlist" subtitle="Series and movies you've saved for later" />
      <Grid>
        {ANIME.slice(0, 8).map((a) => (
          <AnimeCard key={a.id} anime={a} className="w-full" />
        ))}
      </Grid>
    </>
  ),
});
