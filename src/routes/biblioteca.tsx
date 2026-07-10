import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { listDrivePdfs, type DrivePdf } from "@/lib/drive.functions";
import logoAsset from "@/assets/logo-glebra.webp";
import { LayoutGrid, List, FileText, BookOpen, FileArchive, File } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

const pdfsQuery = queryOptions({
  queryKey: ["drive-pdfs"],
  queryFn: () => listDrivePdfs(),
  staleTime: 60_000,
});

export const Route = createFileRoute("/biblioteca")({
  head: () => ({
    meta: [
      { title: "Biblioteca de Alexandria — GLEBRA" },
      { name: "description", content: "Acervo digital da Grande Loja Egípcia Brasileira. Estudos, tratados e documentos herméticos." },
      { property: "og:title", content: "Biblioteca de Alexandria — GLEBRA" },
      { property: "og:description", content: "Acervo digital hermético da GLEBRA." },
    ],
    links: [{ rel: "canonical", href: "/biblioteca" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(pdfsQuery),
  component: BibliotecaPage,
  errorComponent: ({ error }) => (
    <Shell>
      <p className="text-center text-muted-foreground">Não foi possível carregar a biblioteca. {error.message}</p>
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

// Helper: detect file format from name
function getFormat(name: string): { label: string; color: string } {
  const lower = name.toLowerCase();
  if (lower.endsWith(".epub")) return { label: "EPUB", color: "#4CAF50" };
  if (lower.endsWith(".mobi")) return { label: "MOBI", color: "#FF9800" };
  if (lower.endsWith(".docx") || lower.endsWith(".doc")) return { label: "DOCX", color: "#2196F3" };
  if (lower.endsWith(".txt")) return { label: "TXT", color: "#9E9E9E" };
  return { label: "PDF", color: "#C5A059" };
}

function FormatIcon({ name, size = 18 }: { name: string; size?: number }) {
  const lower = name.toLowerCase();
  if (lower.endsWith(".epub")) return <BookOpen size={size} />;
  if (lower.endsWith(".mobi")) return <FileArchive size={size} />;
  if (lower.endsWith(".docx") || lower.endsWith(".doc")) return <FileText size={size} />;
  if (lower.endsWith(".txt")) return <File size={size} />;
  return <FileText size={size} />;
}

function cleanName(name: string) {
  return name.replace(/\.(pdf|epub|mobi|docx|doc|txt)$/i, "");
}



function FormatBadge({ name }: { name: string }) {
  const fmt = getFormat(name);
  return (
    <span
      className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border"
      style={{
        color: fmt.color,
        borderColor: `${fmt.color}40`,
        background: `${fmt.color}12`,
      }}
    >
      <FormatIcon name={name} size={10} />
      {fmt.label}
    </span>
  );
}

function PdfLibrary() {
  const { data } = useSuspenseQuery(pdfsQuery);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<DrivePdf | null>(null);
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  const files = data.files.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()));

  if (data.error) {
    return (
      <div className="card-mystic rounded-xl p-10 text-center max-w-2xl mx-auto">
        <div className="font-display text-3xl text-gradient-gold mb-3">Biblioteca em preparo</div>
        <p className="text-sm text-muted-foreground leading-relaxed">{data.error}</p>
      </div>
    );
  }

  return (
    <>
      {/* Search + View Toggle */}
      <div className="mb-10 flex flex-col sm:flex-row gap-4 items-center">
        <label className="block relative flex-1 max-w-xl w-full">
          <span className="sr-only">Buscar</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar obras…"
            className="w-full bg-surface/60 border border-border rounded-full pl-12 pr-5 py-3.5 text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-gold/70 focus:ring-1 focus:ring-gold/40 transition-colors"
          />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/70">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" strokeLinecap="round" />
          </svg>
        </label>

        {/* Card / List toggle */}
        <div className="flex items-center gap-1 bg-surface/60 border border-border-gold/20 rounded-full p-1 shrink-0">
          <button
            onClick={() => setViewMode("card")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${viewMode === "card" ? "bg-gold/20 text-gold" : "text-muted-foreground hover:text-gold"}`}
            title="Visualização em cards"
          >
            <LayoutGrid size={14} />
            Cards
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${viewMode === "list" ? "bg-gold/20 text-gold" : "text-muted-foreground hover:text-gold"}`}
            title="Visualização em lista"
          >
            <List size={14} />
            Lista
          </button>
        </div>
      </div>

      {files.length === 0 ? (
        <p className="text-center text-muted-foreground italic">Nenhuma obra encontrada.</p>
      ) : viewMode === "card" ? (
        /* CARD GRID */
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {files.map((f) => {
            const fmt = getFormat(f.name);
            return (
              <button
                key={f.id}
                onClick={() => setSelected(f)}
                className="group card-mystic rounded-2xl p-6 text-left hover:border-gold/60 hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden"
              >
                {/* Subtle gradient background based on format color */}
                <div 
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500"
                  style={{ backgroundColor: fmt.color }}
                />

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center border transition-colors duration-300"
                    style={{ 
                      backgroundColor: `${fmt.color}10`,
                      borderColor: `${fmt.color}30`,
                      color: fmt.color 
                    }}
                  >
                    <FormatIcon name={f.name} size={20} />
                  </div>
                  <FormatBadge name={f.name} />
                </div>

                <div className="flex flex-col flex-1 relative z-10">
                  <h3 className="font-display text-[15px] text-foreground leading-snug group-hover:text-gold transition-colors line-clamp-3 mb-4">
                    {cleanName(f.name)}
                  </h3>
                  
                  <div className="mt-auto flex items-end justify-between">
                    {f.modifiedTime ? (
                      <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                        {new Date(f.modifiedTime).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
                      </p>
                    ) : <div />}
                    
                    <div className="w-8 h-8 rounded-full border border-border-gold/30 flex items-center justify-center text-gold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="flex flex-col gap-2">
          {files.map((f) => {
            const fmt = getFormat(f.name);
            return (
              <button
                key={f.id}
                onClick={() => setSelected(f)}
                className="group card-mystic rounded-xl text-left hover:border-gold/60 transition-all duration-200 flex items-center gap-4 p-4"
              >
                {/* Format Icon instead of thumbnail */}
                <div 
                  className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center border transition-colors"
                  style={{ 
                    backgroundColor: `${fmt.color}10`,
                    borderColor: `${fmt.color}30`,
                    color: fmt.color 
                  }}
                >
                  <FormatIcon name={f.name} size={24} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <FormatBadge name={f.name} />
                    {f.modifiedTime && (
                      <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                        {new Date(f.modifiedTime).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-[15px] text-foreground group-hover:text-gold transition-colors truncate">
                    {cleanName(f.name)}
                  </h3>
                </div>

                <div className="text-[10px] uppercase tracking-[0.25em] text-gold/70 group-hover:text-gold transition-colors shrink-0 hidden sm:block">
                  Abrir →
                </div>
              </button>
            );
          })}
        </div>
      )}

      {selected && <PdfViewer file={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

function PdfViewer({ file, onClose }: { file: DrivePdf; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[80] bg-background/95 backdrop-blur-md flex flex-col" role="dialog" aria-modal="true">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border-gold/30">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold/70">Biblioteca · GLEBRA</div>
          <h3 className="font-display text-lg text-foreground truncate">{cleanName(file.name)}</h3>
        </div>
        <div className="flex items-center gap-3">
          {file.webViewLink && (
            <a href={file.webViewLink} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex text-xs uppercase tracking-[0.25em] text-gold hover:text-gold-soft transition-colors">
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
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="card-mystic rounded-2xl p-6 flex flex-col gap-4 animate-pulse opacity-60">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-surface/80" />
            <div className="w-16 h-4 rounded bg-surface/80" />
          </div>
          <div className="space-y-2 mt-2">
            <div className="h-4 bg-surface/80 rounded w-full" />
            <div className="h-4 bg-surface/80 rounded w-2/3" />
          </div>
          <div className="mt-6 h-3 bg-surface/80 rounded w-1/3" />
        </div>
      ))}
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative py-20 px-6 text-center border-b border-border-gold/20">
        <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ background: "var(--gradient-radial-gold)" }} />
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
            Estudos, tratados e documentos preservados pela Grande Loja Egípcia Brasileira. Ao clicar em uma obra, ela abrirá para leitura direta.
          </p>
        </div>
      </section>

      <main className="py-20 px-6">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
