import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import logoAsset from "@/assets/logo-glebra.webp";

export const NAV = [
  { label: "Quem Somos", href: "/#quem-somos" },
  { label: "Imortais", href: "/imortais" },
  { label: "Biblioteca", href: "/biblioteca" },
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
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isSolid = !transparentTop || scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 print:hidden ${
        isSolid
          ? "bg-background/85 backdrop-blur-xl border-b border-border-gold/30 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logoAsset}
            alt="GLEBRA"
            width={44}
            height={44}
            className="h-11 w-11 transition-transform group-hover:rotate-6"
          />
          <div className="hidden sm:block leading-tight">
            <div className="font-display text-lg text-gradient-gold">GLEBRA</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Memphis &amp; Misraim
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((n) => (
            <Link
              key={n.href}
              to={n.href}
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-gold transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/triagem"
            className="hidden sm:inline-flex btn-gold btn-gold-hover rounded-full px-5 py-2 text-xs font-medium uppercase tracking-[0.2em]"
          >
            Quero ser um Franco Maçom
          </Link>

          {/* Hamburger - mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 w-9 h-9 items-center justify-center rounded-full border border-border-gold/30 hover:border-gold/60 transition-colors"
            aria-label="Menu"
          >
            <span
              className={`block w-4.5 h-0.5 bg-gold transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
              style={{ width: "18px" }}
            />
            <span
              className={`block h-0.5 bg-gold transition-all duration-300 ${
                menuOpen ? "opacity-0 w-0" : "w-[18px]"
              }`}
            />
            <span
              className={`block h-0.5 bg-gold transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2 w-[18px]" : "w-[18px]"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 border-t border-border-gold/20 ${
          menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-1 bg-background/95 backdrop-blur-xl">
          {NAV.map((n) => (
            <Link
              key={n.href}
              to={n.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-gold transition-colors py-2.5 border-b border-border-gold/10 last:border-0"
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/triagem"
            onClick={() => setMenuOpen(false)}
            className="mt-3 btn-gold btn-gold-hover rounded-full px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-center"
          >
            Quero ser um Franco Maçom
          </Link>
        </div>
      </div>
    </header>
  );
}
