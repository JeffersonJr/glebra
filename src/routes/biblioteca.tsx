import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Suspense, useState, useCallback } from "react";
import {
  listDrivePdfs,
  type DrivePdf,
  type DriveItem,
} from "@/lib/drive.functions";
import { LayoutGrid, List, FileText, BookOpen, FileArchive, File, Folder, FolderOpen, ChevronRight, Home, Info } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// ─── Types ────────────────────────────────────────────────────────────────────

type BreadcrumbEntry = { id: string | null; name: string };

// ─── Route ────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/biblioteca")({
  head: () => ({
    meta: [
      { title: "Biblioteca Alexandria Virtual — GLEBRA" },
      { name: "description", content: "Acervo digital da Grande Loja Egípcia Brasileira. Estudos, tratados e documentos herméticos." },
      { property: "og:title", content: "Biblioteca Alexandria Virtual — GLEBRA" },
      { property: "og:description", content: "Acervo digital hermético da GLEBRA." },
    ],
    links: [{ rel: "canonical", href: "/biblioteca" }],
  }),
  component: BibliotecaPage,
  errorComponent: ({ error }) => (
    <Shell>
      <p className="text-center text-muted-foreground">Não foi possível carregar a biblioteca. {error.message}</p>
    </Shell>
  ),
});

// ─── Page ─────────────────────────────────────────────────────────────────────

function BibliotecaPage() {
  return (
    <Shell>
      <Suspense fallback={<LoadingGrid />}>
        <PdfLibrary />
      </Suspense>
    </Shell>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

function Breadcrumb({
  trail,
  onNavigate,
}: {
  trail: BreadcrumbEntry[];
  onNavigate: (index: number) => void;
}) {
  if (trail.length <= 1) return null;
  return (
    <nav className="flex items-center gap-1 mb-8 flex-wrap" aria-label="Localização">
      {trail.map((entry, i) => {
        const isLast = i === trail.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight size={14} className="text-muted-foreground/50 shrink-0" />}
            {isLast ? (
              <span className="text-xs text-gold font-medium flex items-center gap-1">
                {i === 0 ? <Home size={13} /> : <FolderOpen size={13} />}
                {entry.name}
              </span>
            ) : (
              <button
                onClick={() => onNavigate(i)}
                className="text-xs text-muted-foreground hover:text-gold transition-colors flex items-center gap-1"
              >
                {i === 0 ? <Home size={13} /> : <Folder size={13} />}
                {entry.name}
              </button>
            )}
          </span>
        );
      })}
    </nav>
  );
}

// ─── Library ──────────────────────────────────────────────────────────────────

function PdfLibrary() {
  const [trail, setTrail] = useState<BreadcrumbEntry[]>([
    { id: null, name: "Início" },
  ]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<DrivePdf | null>(null);
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  const currentFolderId = trail[trail.length - 1].id;

  const { data, isLoading, error } = useQuery({
    queryKey: ["drive-items", currentFolderId],
    queryFn: () => listDrivePdfs({ data: { folderId: currentFolderId ?? undefined } }),
    staleTime: 60_000,
  });

  const navigateToFolder = useCallback(
    (folder: { id: string; name: string }) => {
      setTrail((prev) => [...prev, { id: folder.id, name: folder.name }]);
      setQuery("");
    },
    [],
  );

  const navigateTo = useCallback((index: number) => {
    setTrail((prev) => prev.slice(0, index + 1));
    setQuery("");
  }, []);

  if (isLoading) return <LoadingGrid />;

  if (error || data?.error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center max-w-2xl mx-auto">
        {/* Decorative scroll icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full bg-surface border border-border-gold/30 flex items-center justify-center shadow-[0_0_40px_rgba(197,160,89,0.15)]">
            <BookOpen className="w-10 h-10 text-gold/60" strokeWidth={1.2} />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
            <span className="text-gold text-xs">⟳</span>
          </div>
        </div>

        {/* Title */}
        <p className="divider-gold justify-center mb-4">
          <span className="divider-gold-line" />
          Em Manutenção
          <span className="divider-gold-line" />
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-gradient-gold mb-4">
          Acervo Temporariamente Indisponível
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-lg">
          Nosso acervo digital está passando por uma atualização para melhor servir à nossa fraternidade.
          Em breve os documentos, tratados e obras herméticas estarão novamente acessíveis.
        </p>

        {/* Separator */}
        <div className="w-full max-w-xs border-t border-border-gold/20 mb-6" />

        <p className="text-xs text-muted-foreground/60 uppercase tracking-widest mt-8">
          Obrigado pela paciência, Irmão
        </p>
      </div>
    );
  }


  const items = (data?.items ?? []).filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

  const folders = items.filter((i): i is Extract<DriveItem, { kind: "folder" }> => i.kind === "folder");
  const files = items.filter((i): i is Extract<DriveItem, { kind: "file" }> => i.kind === "file");

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb trail={trail} onNavigate={navigateTo} />

      {/* Search + View Toggle */}
      <div className="mb-10 flex flex-col sm:flex-row gap-4 items-center">
        <label className="block relative flex-1 max-w-xl w-full">
          <span className="sr-only">Buscar</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar obras ou pastas…"
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

      {items.length === 0 ? (
        <p className="text-center text-muted-foreground italic">Nenhuma obra ou pasta encontrada.</p>
      ) : viewMode === "card" ? (
        <CardView
          folders={folders}
          files={files}
          onFolderClick={navigateToFolder}
          onFileClick={(f) => setSelected(f)}
        />
      ) : (
        <ListView
          folders={folders}
          files={files}
          onFolderClick={navigateToFolder}
          onFileClick={(f) => setSelected(f)}
        />
      )}

      {selected && <PdfViewer file={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

// ─── Card View ────────────────────────────────────────────────────────────────

function CardView({
  folders,
  files,
  onFolderClick,
  onFileClick,
}: {
  folders: Extract<DriveItem, { kind: "folder" }>[];
  files: Extract<DriveItem, { kind: "file" }>[];
  onFolderClick: (folder: { id: string; name: string }) => void;
  onFileClick: (file: DrivePdf) => void;
}) {
  return (
    <div className="space-y-8">
      {/* Folders section */}
      {folders.length > 0 && (
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Pastas · {folders.length}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => onFolderClick(folder)}
                className="group card-mystic rounded-2xl p-5 text-left hover:border-gold/60 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-[0.04] group-hover:opacity-[0.1] transition-opacity duration-500 bg-gold" />
                <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-gold/20 bg-gold/10 text-gold shrink-0 group-hover:bg-gold/20 transition-colors">
                  <FolderOpen size={20} className="hidden group-hover:block" />
                  <Folder size={20} className="block group-hover:hidden" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-[14px] text-foreground group-hover:text-gold transition-colors truncate">
                    {folder.name}
                  </h3>
                  {folder.modifiedTime && (
                    <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
                      {new Date(folder.modifiedTime).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
                    </p>
                  )}
                </div>
                <ChevronRight size={16} className="text-gold/40 group-hover:text-gold group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Files section */}
      {files.length > 0 && (
        <div>
          {folders.length > 0 && (
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Arquivos · {files.length}
            </p>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {files.map((f) => {
              const fmt = getFormat(f.name);
              return (
                <button
                  key={f.id}
                  onClick={() => onFileClick(f)}
                  className="group card-mystic rounded-2xl p-6 text-left hover:border-gold/60 hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden"
                >
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
                        color: fmt.color,
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
        </div>
      )}
    </div>
  );
}

// ─── List View ────────────────────────────────────────────────────────────────

function ListView({
  folders,
  files,
  onFolderClick,
  onFileClick,
}: {
  folders: Extract<DriveItem, { kind: "folder" }>[];
  files: Extract<DriveItem, { kind: "file" }>[];
  onFolderClick: (folder: { id: string; name: string }) => void;
  onFileClick: (file: DrivePdf) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {/* Folders */}
      {folders.map((folder) => (
        <button
          key={folder.id}
          onClick={() => onFolderClick(folder)}
          className="group card-mystic rounded-xl text-left hover:border-gold/60 transition-all duration-200 flex items-center gap-4 p-4"
        >
          <div className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center border border-gold/20 bg-gold/10 text-gold group-hover:bg-gold/20 transition-colors">
            <FolderOpen size={24} className="hidden group-hover:block" />
            <Folder size={24} className="block group-hover:hidden" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border text-gold border-gold/30 bg-gold/10">
                <Folder size={10} />
                Pasta
              </span>
              {folder.modifiedTime && (
                <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                  {new Date(folder.modifiedTime).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
                </span>
              )}
            </div>
            <h3 className="font-display text-[15px] text-foreground group-hover:text-gold transition-colors truncate">
              {folder.name}
            </h3>
          </div>

          <div className="text-[10px] uppercase tracking-[0.25em] text-gold/70 group-hover:text-gold transition-colors shrink-0 hidden sm:flex items-center gap-1">
            Abrir <ChevronRight size={12} />
          </div>
        </button>
      ))}

      {/* Files */}
      {files.map((f) => {
        const fmt = getFormat(f.name);
        return (
          <button
            key={f.id}
            onClick={() => onFileClick(f)}
            className="group card-mystic rounded-xl text-left hover:border-gold/60 transition-all duration-200 flex items-center gap-4 p-4"
          >
            <div
              className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center border transition-colors"
              style={{
                backgroundColor: `${fmt.color}10`,
                borderColor: `${fmt.color}30`,
                color: fmt.color,
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
  );
}

// ─── PDF Viewer ───────────────────────────────────────────────────────────────

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

// ─── Loading ──────────────────────────────────────────────────────────────────

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

// ─── Shell ────────────────────────────────────────────────────────────────────

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative pt-44 pb-20 px-6 text-center border-b border-border-gold/20">
        <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ background: "var(--gradient-radial-gold)" }} />
        <div className="relative">
          <p className="divider-gold justify-center mb-6">
            <span className="divider-gold-line" />
            Acervo Digital
            <span className="divider-gold-line" />
          </p>
          <h1 className="text-5xl md:text-6xl mb-6">
            <span className="text-gradient-gold italic">Biblioteca</span> Alexandria Virtual
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground font-light leading-relaxed mb-8">
            Estudos, tratados e documentos preservados pela Grande Loja Egípcia Brasileira. Ao clicar em uma obra, ela abrirá instantaneamente para leitura.
          </p>

          <div className="max-w-3xl mx-auto bg-surface/50 border border-gold/20 rounded-xl p-6 text-sm text-muted-foreground/90 font-light flex gap-4 text-left shadow-lg">
            <Info className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
            <p className="italic">
              "A Antiga Biblioteca de Alexandria fundada no século III a. C. foi o maior Centro de Saber do Mundo Antigo. Parte do Complexo Mouseion, possuía 700 mil rolos de papiro de diversas culturas. É em memória a essa imponente biblioteca que criamos a Biblioteca Alexandria Virtual."
            </p>
          </div>
        </div>
      </section>

      <main className="py-20 px-6 flex-grow">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>

      <SiteFooter />
    </div>
  );
}
