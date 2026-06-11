import { createFileRoute } from "@tanstack/react-router";
import { AnimeCard } from "@/components/anime-card";
import { Grid, PageHeader } from "@/components/page-header";
import { series } from "@/lib/anime-data";

export const Route = createFileRoute("/series")({
  head: () => ({ meta: [{ title: "Series — AniVerse" }] }),
  component: () => (
    <>
      <PageHeader title="Anime Series" subtitle="Binge-worthy story arcs across every genre" />
      <Grid>
        {series().map((a) => (
          <AnimeCard key={a.id} anime={a} className="w-full" />
        ))}
      </Grid>
    </>
  ),
});
