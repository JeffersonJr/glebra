import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { listDrivePdfs, type DrivePdf } from "@/lib/drive.functions";
import logoAsset from "@/assets/logo-glebra.webp";

const pdfsQuery = queryOptions({
  queryKey: ["drive-pdfs"],
  queryFn: () => listDrivePdfs(),
  staleTime: 60_000,
});

export const Route = createFileRoute("/biblioteca")({
  head: () => ({
    meta: [
      { title: "Biblioteca — GLEBRA" },
      {
        name: "description",
        content:
          "Acervo digital da Grande Loja Egípcia Brasileira. Estudos, tratados e documentos herméticos.",
      },
      { property: "og:title", content: "Biblioteca — GLEBRA" },
      {
        property: "og:description",
        content: "Acervo digital hermético da GLEBRA.",
      },
    ],
    links: [{ rel: "canonical", href: "/biblioteca" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(pdfsQuery),
  component: BibliotecaPage,
  errorComponent: ({ error }) => (
    <Shell>
      <p className="text-center text-muted-foreground">
        Não foi possível carregar a biblioteca. {error.message}
      </p>
    </Shell>
  ),
});

function BibliotecaPage() {
  return (
    <Shell>
      <Suspense fallback={<LoadingGrid />}>
        <PdfLibrary />
      </Suspense>
    </Shell>
  );
}

function PdfLibrary() {
  const { data } = useSuspenseQuery(pdfsQuery);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<DrivePdf | null>(null);

  const files = data.files.filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase()),
  );

  if (data.error) {
    return (
      <div className="card-mystic rounded-xl p-10 text-center max-w-2xl mx-auto">
        <div className="font-display text-3xl text-gradient-gold mb-3">
          Biblioteca em preparo
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {data.error}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-12 max-w-xl mx-auto">
        <label className="block relative">
          <span className="sr-only">Buscar</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar obras…"
            className="w-full bg-surface/60 border border-border rounded-full pl-12 pr-5 py-3.5 text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-gold/70 focus:ring-1 focus:ring-gold/40 transition-colors"
          />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/70"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" strokeLinecap="round" />
          </svg>
        </label>
      </div>

      {files.length === 0 ? (
        <p className="text-center text-muted-foreground italic">
          Nenhuma obra encontrada.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelected(f)}
              className="group card-mystic rounded-xl p-6 text-left hover:border-gold/60 hover:-translate-y-1 transition-all duration-500"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-14 rounded-md border border-border-gold flex items-center justify-center bg-background/60">
                  <span className="font-display text-gold text-sm tracking-widest">
                    PDF
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-lg text-foreground leading-snug group-hover:text-gold transition-colors line-clamp-3">
                    {f.name.replace(/\.pdf$/i, "")}
                  </h3>
                  {f.modifiedTime && (
                    <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {new Date(f.modifiedTime).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-5 text-[11px] uppercase tracking-[0.25em] text-gold/70 group-hover:text-gold transition-colors">
                Abrir obra →
              </div>
            </button>
          ))}
        </div>
      )}

      {selected && <PdfViewer file={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

function PdfViewer({ file, onClose }: { file: DrivePdf; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[80] bg-background/95 backdrop-blur-md flex flex-col"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-border-gold/30">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold/70">
            Biblioteca · GLEBRA
          </div>
          <h3 className="font-display text-lg text-foreground truncate">
            {file.name.replace(/\.pdf$/i, "")}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          {file.webViewLink && (
            <a
              href={file.webViewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex text-xs uppercase tracking-[0.25em] text-gold hover:text-gold-soft transition-colors"
            >
              Abrir no Drive ↗
            </a>
          )}
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-border-gold flex items-center justify-center text-gold hover:bg-surface transition-colors"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>
      </div>
      <iframe
        src={`https://drive.google.com/file/d/${file.id}/preview`}
        title={file.name}
        className="flex-1 w-full bg-black"
        allow="autoplay"
      />
    </div>
  );
}

function LoadingGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="card-mystic rounded-xl p-6 h-40 animate-pulse opacity-60"
        />
      ))}
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border-gold/20">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logoAsset}
              alt="GLEBRA"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <div className="leading-tight hidden sm:block">
              <div className="font-display text-gradient-gold">GLEBRA</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Grande Loja Egípcia Brasileira
              </div>
            </div>
          </Link>
          <Link
            to="/"
            className="text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-gold transition-colors"
          >
            ← Voltar ao início
          </Link>
        </div>
      </header>

      <section className="relative py-20 px-6 text-center border-b border-border-gold/20">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{ background: "var(--gradient-radial-gold)" }}
        />
        <div className="relative">
          <p className="divider-gold justify-center mb-6">
            <span className="divider-gold-line" />
            Acervo Digital
            <span className="divider-gold-line" />
          </p>
          <h1 className="text-5xl md:text-6xl mb-6">
            <span className="text-gradient-gold italic">Biblioteca</span> de Alexandria
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground font-light leading-relaxed">
            Estudos, tratados e documentos preservados pela Grande Loja Egípcia
            Brasileira. Ao clicar em uma obra, ela abrirá para leitura direta.
          </p>
        </div>
      </section>

      <main className="py-20 px-6">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
