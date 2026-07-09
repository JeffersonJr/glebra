import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { X, MessageCircle } from "lucide-react";
import logoUrl from "@/assets/logo-glebra.webp";

export function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasSeen = sessionStorage.getItem("glebra-exit-intent");
    if (hasSeen) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsOpen(true);
        sessionStorage.setItem("glebra-exit-intent", "true");
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg card-mystic rounded-3xl p-8 overflow-hidden animate-in zoom-in-95 duration-300 shadow-[0_0_50px_rgba(197,160,89,0.2)]">
        
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors z-10"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Decorative glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative text-center space-y-6">
          <img src={logoUrl} alt="GLEBRA" className="w-20 h-20 mx-auto drop-shadow-[0_0_12px_rgba(197,160,89,0.5)]" />
          
          <div className="space-y-3">
            <h2 className="font-display text-3xl font-semibold text-gradient-gold leading-tight">
              Sua jornada está apenas começando...
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm px-2">
              Antes de partir, reflita: a verdadeira busca pela Luz exige um primeiro passo.
              Não deixe essa oportunidade de aperfeiçoamento hermético passar. Inicie sua
              jornada na Maçonaria Egípcia ou tire suas dúvidas diretamente conosco.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button
              asChild
              size="lg"
              className="btn-gold btn-gold-hover h-12 px-6 rounded-full font-medium"
            >
              <Link to="/triagem" onClick={() => setIsOpen(false)}>Quero ser um Maçom</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 px-6 gap-2 border-border-gold/30 text-foreground hover:bg-gold/5 rounded-full"
            >
              <a
                href="https://wa.me/5513988766605?text=Ol%C3%A1%21%20Gostaria%20de%20tirar%20algumas%20d%C3%BAvidas%20sobre%20a%20GLEBRA."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4" />
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
