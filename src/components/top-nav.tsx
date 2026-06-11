import { Link, useLocation } from "@tanstack/react-router";
import { Search, Home, Flame, Film, Tv, Layers, Bookmark, Bell } from "lucide-react";
import { useEffect, useState } from "react";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/trending", label: "Trending", icon: Flame },
  { to: "/movies", label: "Movies", icon: Film },
  { to: "/series", label: "Series", icon: Tv },
  { to: "/genres", label: "Genres", icon: Layers },
  { to: "/watchlist", label: "Watchlist", icon: Bookmark },
] as const;

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong py-3" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center gap-6 px-4 sm:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--gradient-primary)] glow-primary transition-transform group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 20L12 4l8 16M7 14h10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            Ani<span className="text-gradient">Verse</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-white"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-[var(--gradient-primary)]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <SearchBar />
          <button className="hidden sm:grid h-10 w-10 place-items-center rounded-full glass hover:bg-white/10 transition">
            <Bell className="h-4.5 w-4.5" />
          </button>
          <button className="h-10 w-10 rounded-full bg-[var(--gradient-primary)] glow-primary grid place-items-center text-sm font-bold ring-2 ring-white/10 hover:scale-105 transition-transform">
            A
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <nav className="lg:hidden mt-3 px-4 flex gap-1 overflow-x-auto no-scrollbar">
        {NAV.map((item) => {
          const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition ${
                active
                  ? "bg-[var(--gradient-primary)] text-white"
                  : "glass text-muted-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

function SearchBar() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <div
        className={`flex items-center gap-2 rounded-full transition-all duration-300 ${
          open ? "glass pl-3 pr-1 w-64" : "glass h-10 w-10 justify-center"
        }`}
      >
        <Search className="h-4 w-4 text-muted-foreground shrink-0" onClick={() => setOpen(true)} />
        {open && (
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onBlur={() => !q && setOpen(false)}
            placeholder="Search anime, genres..."
            className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
          />
        )}
      </div>
    </div>
  );
}
