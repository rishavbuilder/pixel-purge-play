import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/hero";
import { Row } from "@/components/row";
import { AnimeCard } from "@/components/anime-card";
import {
  trending, popular, topRated, newReleases,
  recommended, continueWatching, latestEpisodes,
} from "@/lib/anime-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AniVerse — Stream premium anime in 4K" },
      { name: "description", content: "Discover trending anime, simulcasts, and timeless classics on AniVerse." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      <Hero />

      <Row title="Continue Watching" subtitle="Pick up right where you left off">
        {continueWatching().map(({ anime, episode, progress }) => (
          <AnimeCard key={anime.id} anime={anime} episode={episode} progress={progress} />
        ))}
      </Row>

      <Row title="Trending Now" subtitle="What everyone's watching this week">
        {trending().map((a) => (
          <AnimeCard key={a.id} anime={a} rank={a.trending} />
        ))}
      </Row>

      <Row title="Popular This Week">
        {popular().map((a) => (<AnimeCard key={a.id} anime={a} />))}
      </Row>

      <Row title="Latest Episodes" subtitle="Fresh from this season's simulcast">
        {latestEpisodes().map(({ anime, episode }) => (
          <AnimeCard key={anime.id + episode} anime={anime} episode={episode} />
        ))}
      </Row>

      <Row title="Top Rated">
        {topRated().map((a) => (<AnimeCard key={a.id} anime={a} />))}
      </Row>

      <Row title="New Releases">
        {newReleases().map((a) => (<AnimeCard key={a.id} anime={a} />))}
      </Row>

      <Row title="Recommended For You" subtitle="Curated based on your taste">
        {recommended().map((a) => (<AnimeCard key={a.id} anime={a} />))}
      </Row>
    </div>
  );
}
