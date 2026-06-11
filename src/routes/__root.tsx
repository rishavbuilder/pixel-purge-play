import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { TopNav } from "@/components/top-nav";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl font-black text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Lost in the multiverse</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This page drifted into another dimension.
        </p>
        <a href="/" className="mt-6 inline-flex rounded-full bg-[var(--gradient-primary)] px-5 py-2.5 text-sm font-semibold">
          Return home
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Something interrupted the stream</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try reloading the page.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 inline-flex rounded-full bg-[var(--gradient-primary)] px-5 py-2.5 text-sm font-semibold"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AniVerse — Premium Anime Streaming" },
      { name: "description", content: "Stream your favorite anime in 4K. AniVerse is the premium destination for anime — trending series, movies, and exclusive simulcasts." },
      { name: "author", content: "AniVerse" },
      { property: "og:title", content: "AniVerse — Premium Anime Streaming" },
      { property: "og:description", content: "Premium anime streaming with cinematic quality." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background text-foreground">
        <TopNav />
        <main>
          <Outlet />
        </main>
        <footer className="mt-24 border-t border-white/5 py-12 text-center text-xs text-muted-foreground">
          <p>© 2026 AniVerse. All anime are property of their respective creators.</p>
        </footer>
      </div>
    </QueryClientProvider>
  );
}
