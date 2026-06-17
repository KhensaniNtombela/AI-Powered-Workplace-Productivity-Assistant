import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { PlayerProvider } from "@/components/player-provider";
import { I18nProvider } from "@/hooks/use-i18n";
import { ScrollToTop } from "@/components/scroll-to-top";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Lost your flow?</h2>
        <p className="mt-2 text-sm text-muted-foreground">This page drifted out of focus. Let's get you back.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-xl gradient-brand px-4 py-2 text-sm font-medium text-primary-foreground">Back to FlowState</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something interrupted your flow. Try again.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-xl gradient-brand px-4 py-2 text-sm font-medium text-primary-foreground">Try again</button>
          <a href="/" className="rounded-xl border border-input bg-background px-4 py-2 text-sm font-medium">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FlowState AI — Work Smarter. Focus Deeper. Achieve Faster." },
      { name: "description", content: "FlowState AI is the workplace productivity assistant that helps professionals plan, focus, and stay in flow with adaptive AI tools." },
      { name: "author", content: "FlowState AI" },
      { property: "og:title", content: "FlowState AI — Work Smarter. Focus Deeper. Achieve Faster." },
      { property: "og:description", content: "FlowState AI is the workplace productivity assistant that helps professionals plan, focus, and stay in flow with adaptive AI tools." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "FlowState AI — Work Smarter. Focus Deeper. Achieve Faster." },
      { name: "twitter:description", content: "FlowState AI is the workplace productivity assistant that helps professionals plan, focus, and stay in flow with adaptive AI tools." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e619d655-4131-4073-bab2-9e72a081993b/id-preview-eb08ee59--0c374f9f-0514-4eeb-adf0-9ee1f9cb131d.lovable.app-1779436141874.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e619d655-4131-4073-bab2-9e72a081993b/id-preview-eb08ee59--0c374f9f-0514-4eeb-adf0-9ee1f9cb131d.lovable.app-1779436141874.png" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
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
      <I18nProvider>
        <ThemeProvider>
          <PlayerProvider>
            <Outlet />
            <ScrollToTop />
            <Toaster position="top-right" />
          </PlayerProvider>
        </ThemeProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}
