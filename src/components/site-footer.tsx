import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/logo-glebra.webp";
import logoSoseb from "@/assets/logo-soseb.png";

export function SiteFooter() {
  return (
    <footer className="bg-surface border-t border-border-gold/20 mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Coluna 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logoAsset} alt="GLEBRA" className="h-12 w-12" />
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-gold">G.L.E.B.R.A.</div>
                <div className="font-display text-foreground font-semibold">Grande Loja Egípcia Brasileira</div>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Instituição iniciática do Antigo e Primitivo Rito Oriental de Memphis & Misraim
            </p>
            <a
              href="https://soseb.org.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 pt-4 border-t border-border-gold/20 hover:opacity-90 transition-opacity"
            >
              <img src={logoSoseb} alt="SOSEB" className="h-10 w-10 object-contain" />
              <div>
                <p className="text-[8px] uppercase tracking-wider text-gold font-bold">jurisdicionado ao</p>
                <p className="text-[10px] text-foreground/80 font-medium leading-tight">SOSEB — Soberano Santuário Egípcio do Brasil</p>
              </div>
            </a>
          </div>

          {/* Coluna 2: Navegação */}
          <div>
            <h2 className="text-gold font-display text-base font-semibold mb-4">Navegação</h2>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link to="/" hash="quem-somos" className="hover:text-gold transition-colors">Quem Somos</Link></li>
              <li><Link to="/" hash="missao" className="hover:text-gold transition-colors">Nossa Missão</Link></li>
              <li><Link to="/" hash="graus" className="hover:text-gold transition-colors">Graus Maçônicos</Link></li>
              <li><Link to="/" hash="linhagens" className="hover:text-gold transition-colors">Nossas Linhagens</Link></li>
              <li><Link to="/" hash="faq" className="hover:text-gold transition-colors">Perguntas Frequentes</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Portais */}
          <div>
            <h2 className="text-gold font-display text-base font-semibold mb-4">Portais</h2>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link to="/biblioteca" className="hover:text-gold transition-colors">Biblioteca Alexandria Virtual</Link></li>
              <li><Link to="/membros" className="hover:text-gold transition-colors">Portal de Membros</Link></li>
              <li><Link to="/membros/carteirinha/validar" className="hover:text-gold transition-colors">Validação de Carteirinha</Link></li>
              <li><Link to="/triagem" className="hover:text-gold transition-colors font-medium text-gold/90">Quero ser um Franco Maçom</Link></li>
            </ul>
          </div>

          {/* Coluna 4: Contato */}
          <div className="space-y-4">
            <div>
              <h2 className="text-gold font-display text-base font-semibold mb-2">Contato</h2>
              <a href="https://wa.me/5513988766605" target="_blank" rel="noopener noreferrer" className="text-xs text-gold hover:underline block">
                +55 13 98876-6605
              </a>
            </div>
            <div className="pt-2 border-t border-border-gold/20">
              <h2 className="text-gold font-display text-xs uppercase tracking-widest mb-1.5">Princípios</h2>
              <p className="text-[10px] uppercase tracking-[0.2em] leading-relaxed text-muted-foreground">
                Liberdade · Igualdade · Fraternidade
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border-gold/20 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} GLEBRA — Grande Loja Egípcia Brasileira</p>
          <p>
            Powered by{" "}
            <a href="https://evolves.site" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold/80 transition-colors font-medium">
              evolves tecnologia
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
