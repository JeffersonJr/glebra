import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import logoAsset from "@/assets/logo-glebra.webp";

export const NAV = [
  { label: "Quem Somos", href: "/#quem-somos" },
  { label: "Grão Mestrado", href: "/grao-mestrado" },
  { label: "Imortais de Memphis & Misraim", href: "/imortais" },
  { label: "Tratados", href: "/tratados" },
  { label: "Biblioteca Alexandria Virtual", href: "/biblioteca" },
  { label: "Membros", href: "/membros" },
  { label: "FAQ", href: "/#faq" },
];

interface SiteHeaderProps {
  transparentTop?: boolean;
}

export function SiteHeader({ transparentTop = false }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isSolid = !transparentTop || scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 print:hidden ${
        isSolid
          ? "bg-background/90 backdrop-blur-xl shadow-[0_2px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      {/* ── Layer 1: Logo + CTA ───────────────────────────────────────── */}
      <div
        className={`border-b border-border-gold/20 transition-all duration-500 ${
          isSolid ? "border-border-gold/20" : "border-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <img
              src={logoAsset}
              alt="GLEBRA"
              width={40}
              height={40}
              className="h-10 w-10 transition-transform duration-300 group-hover:rotate-6"
            />
            <div className="hidden sm:block leading-tight">
              <div className="font-display text-base text-gradient-gold tracking-widest">GLEBRA</div>
              <div className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                Memphis &amp; Misraim
              </div>
            </div>
          </Link>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              to="/triagem"
              className="hidden sm:inline-flex items-center gap-2 btn-gold btn-gold-hover rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:scale-105"
            >
              <span className="hidden md:inline">⚜</span>
              Quero ser um Franco Maçom
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-[5px] w-9 h-9 items-center justify-center rounded-full border border-border-gold/30 hover:border-gold/60 transition-colors"
              aria-label="Menu"
            >
              <span
                className={`block h-0.5 bg-gold transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
                style={{ width: "18px" }}
              />
              <span
                className={`block h-0.5 bg-gold transition-all duration-300 ${menuOpen ? "opacity-0 w-0" : ""}`}
                style={{ width: "18px" }}
              />
              <span
                className={`block h-0.5 bg-gold transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
                style={{ width: "18px" }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ── Layer 2: Nav links (desktop) ──────────────────────────────── */}
      <div
        className={`hidden lg:block transition-all duration-500 ${
          isSolid
            ? "bg-background/70 backdrop-blur-lg border-b border-border-gold/15"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <nav className="flex items-center justify-center gap-8 h-10">
            {NAV.map((n) => {
              const isActive =
                n.href === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(n.href.split("#")[0]) &&
                    n.href.split("#")[0] !== "/";
              return (
                <Link
                  key={n.href}
                  to={n.href}
                  className={`relative text-[10px] uppercase tracking-[0.2em] transition-all duration-200 py-1 group ${
                    isActive
                      ? "text-gold"
                      : "text-muted-foreground hover:text-gold/90"
                  }`}
                >
                  {n.label}
                  <span
                    className={`absolute -bottom-0 left-0 h-[1px] bg-gold transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ── Mobile dropdown ───────────────────────────────────────────── */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-1 bg-background/97 backdrop-blur-xl border-t border-border-gold/20">
          {NAV.map((n) => (
            <Link
              key={n.href}
              to={n.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-gold transition-colors py-3 border-b border-border-gold/10 last:border-0"
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/triagem"
            onClick={() => setMenuOpen(false)}
            className="mt-3 btn-gold btn-gold-hover rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-center"
          >
            ⚜ Quero ser um Franco Maçom
          </Link>
        </div>
      </div>
    </header>
  );
}
