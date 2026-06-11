import { createFileRoute } from "@tanstack/react-router";
import { AnimeCard } from "@/components/anime-card";
import { Grid, PageHeader } from "@/components/page-header";
import { trending } from "@/lib/anime-data";

export const Route = createFileRoute("/trending")({
  head: () => ({ meta: [{ title: "Trending — AniVerse" }] }),
  component: () => (
    <>
      <PageHeader title="Trending Now" subtitle="The hottest anime everyone is talking about" />
      <Grid>
        {[...trending(), ...trending()].map((a, i) => (
          <AnimeCard key={a.id + i} anime={a} rank={(i % 5) + 1} className="w-full" />
        ))}
      </Grid>
    </>
  ),
});
