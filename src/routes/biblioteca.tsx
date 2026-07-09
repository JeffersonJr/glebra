import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { listDrivePdfs, type DrivePdf } from "@/lib/drive.functions";
import logoAsset from "@/assets/logo-glebra.webp";
import { LayoutGrid, List, FileText, BookOpen, FileArchive, File } from "lucide-react";

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

function ThumbnailOrFallback({ file, size = "card" }: { file: DrivePdf; size?: "card" | "list" }) {
  const fmt = getFormat(file.name);
  const isCard = size === "card";

  const fallback = (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-1"
      style={{ background: `${fmt.color}15` }}
    >
      <FormatIcon name={file.name} size={isCard ? 28 : 20} />
      <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: fmt.color }}>
        {fmt.label}
      </span>
    </div>
  );

  // Google Drive thumbnail — only available for files with thumbnailLink
  if (file.thumbnailLink) {
    const thumb = file.thumbnailLink.replace(/=s\d+/, "=s400");
    return (
      <>
        <img
          src={thumb}
          alt={file.name}
          className={`object-cover w-full h-full`}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
            (e.currentTarget.nextElementSibling as HTMLElement | null)?.style.removeProperty("display");
          }}
        />
        <div style={{ display: "none" }} className="w-full h-full">
          {fallback}
        </div>
      </>
    );
  }

  // Fallback: stylised placeholder
  return fallback;
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {files.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelected(f)}
              className="group card-mystic rounded-xl text-left hover:border-gold/60 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-[3/4] bg-surface overflow-hidden flex items-center justify-center">
                <ThumbnailOrFallback file={f} size="card" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2">
                  <FormatBadge name={f.name} />
                </div>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col gap-1 flex-1">
                <h3 className="font-display text-sm text-foreground leading-snug group-hover:text-gold transition-colors line-clamp-3">
                  {cleanName(f.name)}
                </h3>
                {f.modifiedTime && (
                  <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground mt-auto pt-2">
                    {new Date(f.modifiedTime).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
                  </p>
                )}
                <div className="text-[10px] uppercase tracking-[0.25em] text-gold/70 group-hover:text-gold transition-colors mt-1">
                  Abrir obra →
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="flex flex-col gap-2">
          {files.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelected(f)}
              className="group card-mystic rounded-xl text-left hover:border-gold/60 transition-all duration-200 flex items-center gap-4 p-4"
            >
              {/* Mini thumbnail */}
              <div className="w-12 h-16 rounded-md overflow-hidden shrink-0 border border-border-gold/30 bg-surface flex items-center justify-center">
                <ThumbnailOrFallback file={f} size="list" />
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
                <h3 className="font-display text-base text-foreground group-hover:text-gold transition-colors truncate">
                  {cleanName(f.name)}
                </h3>
              </div>

              <div className="text-[10px] uppercase tracking-[0.25em] text-gold/70 group-hover:text-gold transition-colors shrink-0 hidden sm:block">
                Abrir →
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
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="card-mystic rounded-xl overflow-hidden animate-pulse opacity-60">
          <div className="w-full aspect-[3/4] bg-surface/60" />
          <div className="p-4 space-y-2">
            <div className="h-3 bg-surface/60 rounded w-3/4" />
            <div className="h-3 bg-surface/60 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { label: "Início", href: "/" },
    { label: "Quem Somos", href: "/#quem-somos" },
    { label: "Membros", href: "/membros" },
    { label: "Triagem", href: "/triagem" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border-gold/20 sticky top-0 z-50 bg-background/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logoAsset} alt="GLEBRA" width={40} height={40} className="h-10 w-10" />
            <div className="leading-tight hidden sm:block">
              <div className="font-display text-gradient-gold">GLEBRA</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Grande Loja Egípcia de Memphis e Misraim</div>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((n) => (
                <a key={n.href} href={n.href} className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-gold transition-colors">
                  {n.label}
                </a>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center"
              aria-label="Menu"
            >
              <span className={`block w-5 h-0.5 bg-gold transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-gold transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-gold transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border-gold/20 bg-background/95 backdrop-blur-md px-6 py-4 space-y-3">
            {navLinks.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="block text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-gold transition-colors py-1">
                {n.label}
              </a>
            ))}
          </div>
        )}
      </header>

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
