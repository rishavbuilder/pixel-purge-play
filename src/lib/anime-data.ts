export type Anime = {
  id: string;
  title: string;
  english?: string;
  description: string;
  poster: string;
  banner: string;
  rating: number;
  year: number;
  episodes: number;
  duration: string;
  status: "Ongoing" | "Completed" | "Upcoming";
  type: "TV" | "Movie" | "OVA";
  studio: string;
  genres: string[];
  trending?: number;
};

const img = (seed: string, w = 600, h = 900) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

const make = (
  id: string,
  title: string,
  opts: Partial<Anime> & { seed?: string } = {},
): Anime => ({
  id,
  title,
  english: opts.english ?? title,
  description:
    opts.description ??
    "A breathtaking journey through a world where ancient mysteries collide with modern destiny. Heroes rise, alliances are forged, and the fate of countless realms hangs in a single decisive moment.",
  poster: img(opts.seed ?? id, 600, 900),
  banner: img((opts.seed ?? id) + "-banner", 1920, 1080),
  rating: opts.rating ?? 8.4,
  year: opts.year ?? 2024,
  episodes: opts.episodes ?? 24,
  duration: opts.duration ?? "24m",
  status: opts.status ?? "Ongoing",
  type: opts.type ?? "TV",
  studio: opts.studio ?? "MAPPA",
  genres: opts.genres ?? ["Action", "Adventure", "Fantasy"],
  trending: opts.trending,
});

export const ANIME: Anime[] = [
  make("shadow-monarch", "Shadow Monarch's Ascent", {
    seed: "monarch1",
    rating: 9.2,
    episodes: 25,
    studio: "A-1 Pictures",
    genres: ["Action", "Fantasy", "Supernatural"],
    description:
      "The world's weakest hunter awakens to a mysterious system that allows him to grow infinitely stronger. As shadows bend to his will, he becomes the line between humanity and oblivion.",
    trending: 1,
  }),
  make("celestial-blade", "Celestial Blade Chronicles", {
    seed: "blade2",
    rating: 8.9,
    episodes: 12,
    studio: "ufotable",
    genres: ["Action", "Historical", "Supernatural"],
    trending: 2,
  }),
  make("neon-tokyo-2099", "Neon Tokyo 2099", {
    seed: "neon3",
    rating: 8.7,
    episodes: 13,
    studio: "Trigger",
    type: "TV",
    genres: ["Sci-Fi", "Cyberpunk", "Action"],
    trending: 3,
  }),
  make("sakura-requiem", "Sakura Requiem", {
    seed: "sakura4",
    rating: 9.0,
    episodes: 24,
    studio: "Kyoto Animation",
    genres: ["Drama", "Romance", "Supernatural"],
    trending: 4,
  }),
  make("dragon-heir", "Dragon Heir Saga", {
    seed: "dragon5",
    rating: 8.6,
    episodes: 26,
    studio: "MAPPA",
    genres: ["Adventure", "Fantasy", "Action"],
    trending: 5,
  }),
  make("crimson-vow", "Crimson Vow", {
    seed: "crimson6",
    rating: 8.5,
    episodes: 12,
    studio: "Wit Studio",
    genres: ["Romance", "Drama"],
  }),
  make("astral-academy", "Astral Academy", {
    seed: "astral7",
    rating: 8.3,
    episodes: 24,
    studio: "Bones",
    genres: ["School", "Fantasy", "Comedy"],
  }),
  make("phantom-protocol", "Phantom Protocol", {
    seed: "phantom8",
    rating: 8.8,
    episodes: 13,
    studio: "Production I.G",
    genres: ["Thriller", "Sci-Fi", "Mystery"],
  }),
  make("oceanic-drift", "Oceanic Drift", {
    seed: "ocean9",
    rating: 8.2,
    episodes: 12,
    studio: "P.A. Works",
    genres: ["Slice of Life", "Drama"],
  }),
  make("steel-revolution", "Steel Revolution", {
    seed: "steel10",
    rating: 9.1,
    episodes: 24,
    studio: "Sunrise",
    genres: ["Mecha", "Action", "Sci-Fi"],
  }),
  make("yokai-detective", "Yōkai Detective Agency", {
    seed: "yokai11",
    rating: 8.4,
    episodes: 13,
    studio: "CloverWorks",
    genres: ["Supernatural", "Mystery", "Comedy"],
  }),
  make("eternal-bloom", "Eternal Bloom", {
    seed: "bloom12",
    rating: 8.7,
    episodes: 12,
    studio: "Madhouse",
    genres: ["Romance", "Fantasy"],
  }),
  make("midnight-circus", "Midnight Circus", {
    seed: "circus13",
    rating: 8.9,
    episodes: 1,
    type: "Movie",
    duration: "118m",
    studio: "Studio Ghibli",
    genres: ["Fantasy", "Adventure"],
  }),
  make("voltage-pulse", "Voltage Pulse", {
    seed: "voltage14",
    rating: 8.0,
    episodes: 12,
    studio: "MAPPA",
    genres: ["Music", "Drama"],
  }),
  make("ghostline", "Ghostline", {
    seed: "ghost15",
    rating: 8.6,
    episodes: 13,
    studio: "Wit Studio",
    genres: ["Horror", "Supernatural", "Thriller"],
  }),
  make("solar-knights", "Solar Knights", {
    seed: "solar16",
    rating: 8.5,
    episodes: 24,
    studio: "Bones",
    genres: ["Action", "Sci-Fi", "Adventure"],
  }),
  make("paper-empire", "Paper Empire", {
    seed: "paper17",
    rating: 8.3,
    episodes: 12,
    studio: "Shaft",
    genres: ["Drama", "Historical"],
  }),
  make("whisper-of-ash", "Whisper of Ash", {
    seed: "ash18",
    rating: 9.0,
    episodes: 1,
    type: "Movie",
    duration: "131m",
    studio: "ufotable",
    genres: ["Action", "Drama"],
  }),
];

export const GENRES = [
  "Action", "Adventure", "Fantasy", "Sci-Fi", "Romance",
  "Drama", "Comedy", "Slice of Life", "Mecha", "Horror",
  "Thriller", "Mystery", "Supernatural", "Music", "School",
  "Historical", "Cyberpunk",
];

export const byId = (id: string) => ANIME.find((a) => a.id === id);

export const trending = () =>
  [...ANIME].filter((a) => a.trending).sort((a, b) => (a.trending! - b.trending!));
export const popular = () => [...ANIME].sort((a, b) => b.rating - a.rating).slice(0, 12);
export const topRated = () => [...ANIME].sort((a, b) => b.rating - a.rating).slice(0, 10);
export const newReleases = () => [...ANIME].slice(0, 10);
export const recommended = () => [...ANIME].slice().reverse().slice(0, 10);
export const continueWatching = () => ANIME.slice(2, 7).map((a, i) => ({
  anime: a,
  episode: 4 + i,
  progress: [0.35, 0.78, 0.12, 0.92, 0.55][i] ?? 0.4,
}));
export const latestEpisodes = () => ANIME.slice(0, 8).map((a, i) => ({
  anime: a,
  episode: 12 - i,
  releasedAgo: ["2h ago", "5h ago", "9h ago", "12h ago", "1d ago", "1d ago", "2d ago", "3d ago"][i],
}));

export const movies = () => ANIME.filter((a) => a.type === "Movie");
export const series = () => ANIME.filter((a) => a.type === "TV");

export const episodesFor = (anime: Anime) =>
  Array.from({ length: Math.min(anime.episodes, 24) }, (_, i) => ({
    number: i + 1,
    title: `Episode ${i + 1}`,
    thumbnail: img(`${anime.id}-ep${i + 1}`, 480, 270),
    duration: anime.duration,
    description: "The story deepens as fates collide and a new chapter unfolds.",
  }));
