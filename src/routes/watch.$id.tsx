import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  Play, Pause, Volume2, Maximize, SkipForward, SkipBack,
  Settings, Subtitles, PictureInPicture2, MonitorPlay,
  FastForward, ChevronRight, MessageSquare,
} from "lucide-react";
import { byId, episodesFor, ANIME, type Anime } from "@/lib/anime-data";
import { AnimeCard } from "@/components/anime-card";
import { Row } from "@/components/row";

export const Route = createFileRoute("/watch/$id")({
  loader: ({ params }) => {
    const anime = byId(params.id);
    if (!anime) throw notFound();
    return { anime };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `Watch ${loaderData.anime.title} — AniVerse` }] : [],
  }),
  notFoundComponent: () => <div className="p-32 text-center">Episode not found</div>,
  errorComponent: ({ error }) => <div className="p-32 text-center">{error.message}</div>,
  component: Watch,
});

function Watch() {
  const { anime } = Route.useLoaderData() as { anime: Anime };
  const eps = episodesFor(anime);
  const [current, setCurrent] = useState(1);
  const related = ANIME.filter((a) => a.id !== anime.id).slice(0, 10);

  return (
    <div className="pt-24">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            <Player anime={anime} current={current} />
            <PlayerActions />
            <AnimeBlock anime={anime} current={current} />
            <Comments />
          </div>
          <EpisodeSidebar anime={anime} eps={eps} current={current} onSelect={setCurrent} />
        </div>
      </div>

      <Row title="Related Anime">
        {related.map((a) => (<AnimeCard key={a.id} anime={a} />))}
      </Row>
      <Row title="Recommended">
        {related.slice().reverse().map((a) => (<AnimeCard key={a.id} anime={a} />))}
      </Row>
    </div>
  );
}

function Player({ anime, current }: { anime: Anime; current: number }) {
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(28);
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-black ring-1 ring-white/10 shadow-2xl">
      <img
        src={anime.banner}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

      {/* Center play */}
      <button
        onClick={() => setPlaying((p) => !p)}
        className="absolute inset-0 grid place-items-center group"
      >
        <span className="grid h-20 w-20 place-items-center rounded-full bg-[var(--gradient-primary)] glow-primary opacity-90 group-hover:scale-110 transition">
          {playing ? <Pause className="h-8 w-8 fill-white" /> : <Play className="h-8 w-8 fill-white translate-x-1" />}
        </span>
      </button>

      {/* Skip intro / next ep overlay */}
      <div className="absolute bottom-24 right-4 flex gap-2">
        <button className="rounded-full glass px-4 py-2 text-xs font-semibold hover:bg-white/15 transition">
          <span className="flex items-center gap-1.5"><FastForward className="h-3.5 w-3.5" /> Skip Intro</span>
        </button>
        <button className="rounded-full bg-[var(--gradient-primary)] px-4 py-2 text-xs font-semibold hover:scale-105 transition">
          <span className="flex items-center gap-1.5">Next Episode <ChevronRight className="h-3.5 w-3.5" /></span>
        </button>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 p-4 space-y-3">
        <div className="group/track relative h-1.5 w-full rounded-full bg-white/15 cursor-pointer"
             onClick={(e) => {
               const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
               setProgress(((e.clientX - r.left) / r.width) * 100);
             }}
        >
          <div className="absolute inset-y-0 left-0 rounded-full bg-[var(--gradient-primary)]" style={{ width: `${progress}%` }} />
          <div className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-white shadow-lg opacity-0 group-hover/track:opacity-100 transition" style={{ left: `calc(${progress}% - 7px)` }} />
        </div>
        <div className="flex items-center gap-3 text-white">
          <button onClick={() => setPlaying((p) => !p)} className="hover:text-accent">
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
          <button className="hover:text-accent"><SkipBack className="h-5 w-5" /></button>
          <button className="hover:text-accent"><SkipForward className="h-5 w-5" /></button>
          <Volume2 className="h-5 w-5" />
          <span className="text-xs text-muted-foreground">06:42 / 24:00</span>
          <span className="ml-2 rounded-md glass px-2 py-0.5 text-[10px] font-bold tracking-wider">EP {current}</span>
          <div className="ml-auto flex items-center gap-3">
            <button className="hover:text-accent"><Subtitles className="h-5 w-5" /></button>
            <select className="bg-transparent text-xs hover:text-accent outline-none">
              <option className="bg-black">Auto</option>
              <option className="bg-black">1080p</option>
              <option className="bg-black">720p</option>
              <option className="bg-black">480p</option>
            </select>
            <select className="bg-transparent text-xs hover:text-accent outline-none">
              <option className="bg-black">1x</option>
              <option className="bg-black">1.25x</option>
              <option className="bg-black">1.5x</option>
              <option className="bg-black">2x</option>
            </select>
            <button className="hover:text-accent"><Settings className="h-5 w-5" /></button>
            <button className="hover:text-accent"><PictureInPicture2 className="h-5 w-5" /></button>
            <button className="hover:text-accent"><MonitorPlay className="h-5 w-5" /></button>
            <button className="hover:text-accent"><Maximize className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlayerActions() {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
      <Toggle label="Auto Play" defaultOn />
      <Toggle label="Auto Next" defaultOn />
      <Toggle label="Auto Skip Intro" />
    </div>
  );
}

function Toggle({ label, defaultOn = false }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button onClick={() => setOn(!on)} className="flex items-center gap-2 glass rounded-full px-3 py-1.5">
      <span className={`relative h-4 w-7 rounded-full transition ${on ? "bg-[var(--gradient-primary)]" : "bg-white/15"}`}>
        <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all ${on ? "left-3.5" : "left-0.5"}`} />
      </span>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

function AnimeBlock({ anime, current }: { anime: Anime; current: number }) {
  return (
    <div className="mt-6 rounded-2xl glass p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Episode {current}</p>
          <h2 className="font-display text-2xl font-bold mt-0.5">{anime.title}</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {anime.genres.map((g) => (
              <span key={g} className="glass rounded-full px-2.5 py-0.5 text-[11px]">{g}</span>
            ))}
          </div>
        </div>
        <Link
          to="/anime/$id"
          params={{ id: anime.id }}
          className="rounded-full glass px-4 py-2 text-xs font-semibold hover:bg-white/10"
        >
          View Details
        </Link>
      </div>
      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{anime.description}</p>
    </div>
  );
}

function Comments() {
  return (
    <div className="mt-6 rounded-2xl glass p-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="h-5 w-5" />
        <h3 className="font-display text-lg font-bold">Comments <span className="text-muted-foreground font-medium">· 248</span></h3>
      </div>
      <textarea
        placeholder="Share your thoughts about this episode..."
        className="w-full rounded-xl bg-surface-elevated border border-white/5 p-3 text-sm outline-none focus:border-accent transition resize-none"
        rows={3}
      />
      <div className="mt-3 flex justify-end">
        <button className="rounded-full bg-[var(--gradient-primary)] px-5 py-2 text-sm font-semibold hover:scale-105 transition">
          Post Comment
        </button>
      </div>
      <div className="mt-6 space-y-5">
        {COMMENTS.map((c, i) => (
          <div key={i} className="flex gap-3">
            <div className="h-10 w-10 shrink-0 rounded-full bg-[var(--gradient-primary)] grid place-items-center text-sm font-bold">
              {c.user[0]}
            </div>
            <div className="min-w-0">
              <div className="flex items-baseline gap-2">
                <p className="font-semibold text-sm">{c.user}</p>
                <span className="text-xs text-muted-foreground">{c.when}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{c.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const COMMENTS = [
  { user: "Kazuki", when: "12m ago", body: "That last fight scene was animated to perfection. MAPPA delivering once again!" },
  { user: "Hinata", when: "47m ago", body: "The OST in this episode is on another level. Already added to my playlist." },
  { user: "Renji", when: "2h ago", body: "Plot twist nobody saw coming. Need next episode NOW." },
];

function EpisodeSidebar({
  anime, eps, current, onSelect,
}: {
  anime: Anime;
  eps: ReturnType<typeof episodesFor>;
  current: number;
  onSelect: (n: number) => void;
}) {
  return (
    <aside className="rounded-2xl glass p-4 h-fit lg:sticky lg:top-24 max-h-[calc(100vh-7rem)] overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-3 px-2">
        <h3 className="font-display font-bold">Episodes</h3>
        <span className="text-xs text-muted-foreground">{eps.length} total</span>
      </div>
      <div className="overflow-y-auto pr-1 space-y-2">
        {eps.map((ep) => {
          const active = ep.number === current;
          return (
            <button
              key={ep.number}
              onClick={() => onSelect(ep.number)}
              className={`w-full flex gap-3 rounded-xl p-2 text-left transition ${
                active ? "bg-[var(--gradient-primary)] glow-primary" : "hover:bg-white/5"
              }`}
            >
              <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg">
                <img src={ep.thumbnail} alt="" className="h-full w-full object-cover" />
                {active && (
                  <div className="absolute inset-0 grid place-items-center bg-black/30">
                    <Play className="h-5 w-5 fill-white" />
                  </div>
                )}
              </div>
              <div className="min-w-0 py-0.5">
                <p className={`text-[11px] ${active ? "text-white/80" : "text-muted-foreground"}`}>EP {ep.number}</p>
                <p className="text-sm font-semibold truncate">{anime.title}</p>
                <p className={`text-[11px] ${active ? "text-white/70" : "text-muted-foreground"}`}>{ep.duration}</p>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
