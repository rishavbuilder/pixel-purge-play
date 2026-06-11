import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Play, Plus, Star, Share2, Heart } from "lucide-react";
import { AnimeCard } from "@/components/anime-card";
import { Row } from "@/components/row";
import { byId, episodesFor, ANIME, type Anime } from "@/lib/anime-data";

export const Route = createFileRoute("/anime/$id")({
  loader: ({ params }) => {
    const anime = byId(params.id);
    if (!anime) throw notFound();
    return { anime };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.anime.title} — AniVerse` },
          { name: "description", content: loaderData.anime.description },
          { property: "og:image", content: loaderData.anime.banner },
        ]
      : [],
  }),
  notFoundComponent: () => <div className="p-32 text-center">Anime not found</div>,
  errorComponent: ({ error }) => <div className="p-32 text-center">{error.message}</div>,
  component: Detail,
});

function Detail() {
  const { anime } = Route.useLoaderData() as { anime: Anime };
  const eps = episodesFor(anime);
  const related = ANIME.filter((a) => a.id !== anime.id).slice(0, 12);

  return (
    <div>
      {/* Banner */}
      <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img src={anime.banner} alt="" className="absolute inset-0 h-full w-full object-cover animate-kenburns" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
      </div>

      {/* Info */}
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 -mt-48 relative">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="shrink-0 w-48 sm:w-56 mx-auto md:mx-0">
            <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
              <img src={anime.poster} alt={anime.title} className="w-full" />
            </div>
          </div>
          <div className="flex-1 min-w-0 animate-fade-up">
            <div className="flex flex-wrap gap-2 mb-3">
              {anime.genres.map((g) => (
                <span key={g} className="glass rounded-full px-3 py-1 text-xs">{g}</span>
              ))}
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
              {anime.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5 font-semibold">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {anime.rating}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{anime.year}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{anime.episodes} Episodes</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{anime.duration}</span>
              <span className="rounded-full bg-emerald-500/15 text-emerald-400 px-2.5 py-0.5 text-xs font-semibold">
                {anime.status}
              </span>
            </div>
            <p className="mt-5 max-w-3xl text-muted-foreground leading-relaxed">
              {anime.description}
            </p>
            <dl className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm max-w-2xl">
              <Stat label="Studio" value={anime.studio} />
              <Stat label="Type" value={anime.type} />
              <Stat label="Status" value={anime.status} />
              <Stat label="Released" value={String(anime.year)} />
            </dl>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/watch/$id"
                params={{ id: anime.id }}
                className="flex items-center gap-2 rounded-full bg-[var(--gradient-primary)] px-6 py-3 text-sm font-bold glow-primary hover:scale-105 transition"
              >
                <Play className="h-4 w-4 fill-white" /> Watch Now
              </Link>
              <button className="flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-semibold hover:bg-white/10">
                <Plus className="h-4 w-4" /> Watchlist
              </button>
              <button className="grid h-11 w-11 place-items-center rounded-full glass hover:bg-white/10">
                <Heart className="h-4 w-4" />
              </button>
              <button className="grid h-11 w-11 place-items-center rounded-full glass hover:bg-white/10">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Episodes */}
        <section className="mt-14">
          <div className="flex items-end justify-between gap-4 mb-5">
            <h2 className="font-display text-2xl font-bold">Episodes</h2>
            <select className="glass rounded-full px-4 py-2 text-sm">
              <option>Season 1</option>
              <option>Season 2</option>
            </select>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {eps.map((ep) => (
              <Link
                key={ep.number}
                to="/watch/$id"
                params={{ id: anime.id }}
                className="group flex gap-3 rounded-xl glass p-2 hover:bg-white/10 transition"
              >
                <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg">
                  <img src={ep.thumbnail} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 grid place-items-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
                    <Play className="h-6 w-6 fill-white" />
                  </div>
                  <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1.5 text-[10px] font-medium">
                    {ep.duration}
                  </span>
                </div>
                <div className="min-w-0 py-1 pr-2">
                  <p className="text-[11px] text-muted-foreground">EP {ep.number}</p>
                  <p className="text-sm font-semibold truncate">{ep.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{ep.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <Row title="More Like This">
        {related.map((a) => (<AnimeCard key={a.id} anime={a} />))}
      </Row>
      <Row title="Recommended">
        {related.slice().reverse().map((a) => (<AnimeCard key={a.id} anime={a} />))}
      </Row>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-semibold">{value}</dd>
    </div>
  );
}
