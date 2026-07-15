import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="divider-gold justify-center"><span className="divider-gold-line" />404<span className="divider-gold-line" /></p>
        <h1 className="mt-6 text-4xl text-gradient-gold">Página não encontrada</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          O caminho que buscas não existe neste plano.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md btn-gold btn-gold-hover px-6 py-3 text-sm font-medium tracking-wide"
          >
            Retornar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    // Error reporting removed
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl text-gradient-gold">Esta página não carregou</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Algo saiu do prumo. Tente novamente ou retorne ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md btn-gold btn-gold-hover px-5 py-2.5 text-sm font-medium"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-border-gold bg-transparent px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface"
          >
            Início
          </a>
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
      { title: "GLEBRA — Grande Loja Egípcia Brasileira" },
      {
        name: "description",
        content:
          "Instituição iniciática, hermética e filosófica. A Grande Loja Egípcia Brasileira trabalha pelo aperfeiçoamento moral, intelectual e social do Ser Humano.",
      },
      { name: "author", content: "GLEBRA" },
      { property: "og:title", content: "GLEBRA — Grande Loja Egípcia Brasileira" },
      {
        property: "og:description",
        content:
          "Ordem iniciática hermética e progressista. Liberdade, Igualdade e Fraternidade.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
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
      <Outlet />
    </QueryClientProvider>
  );
}
