import { createFileRoute } from "@tanstack/react-router";
import { AnimeCard } from "@/components/anime-card";
import { Grid, PageHeader } from "@/components/page-header";
import { movies } from "@/lib/anime-data";

export const Route = createFileRoute("/movies")({
  head: () => ({ meta: [{ title: "Movies — AniVerse" }] }),
  component: () => (
    <>
      <PageHeader title="Anime Movies" subtitle="Cinematic masterpieces, hand-picked" />
      <Grid>
        {movies().concat(movies()).map((a, i) => (
          <AnimeCard key={a.id + i} anime={a} className="w-full" />
        ))}
      </Grid>
    </>
  ),
});
