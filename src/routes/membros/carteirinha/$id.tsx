import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Member, getMemberById } from "@/lib/members-db";
import { MembershipCard } from "@/components/members/MembershipCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShieldCheck, Printer, Share2 } from "lucide-react";
import logoUrl from "@/assets/logo-glebra.webp";

export const Route = createFileRoute("/membros/carteirinha/$id")({
  head: () => ({
    meta: [
      { title: "Carteirinha Virtual — GLEBRA" },
      { name: "description", content: "Visualização da carteirinha de membro virtual da GLEBRA." },
    ],
  }),
  component: ViewMembershipCard,
});

function ViewMembershipCard() {
  const { id } = useParams({ from: "/membros/carteirinha/$id" });
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"digital" | "print">("digital");

  useEffect(() => {
    const found = getMemberById(id);
    setMember(found || null);
    setLoading(false);
  }, [id]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      if (viewMode !== "print") {
        setViewMode("print");
        setTimeout(() => window.print(), 200);
      } else {
        window.print();
      }
    }
  };

  const handlePrintDigitalPdf = () => {
    if (typeof window !== "undefined") {
      document.body.classList.add("print-mode-digital-pdf");
      const cleanUp = () => {
        document.body.classList.remove("print-mode-digital-pdf");
        window.removeEventListener("afterprint", cleanUp);
      };
      window.addEventListener("afterprint", cleanUp);
      setTimeout(() => window.print(), 100);
    }
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share && member) {
      navigator.share({ title: `Carteirinha — ${member.name}`, url: window.location.href }).catch(console.error);
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copiado para a área de transferência!");
    }
  };

  const HeaderBar = () => (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border-gold/20 bg-background/90 backdrop-blur-md print:hidden">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoUrl} alt="GLEBRA" className="h-9 w-9" />
          <div className="leading-tight">
            <div className="font-display text-gradient-gold text-sm">GLEBRA</div>
          </div>
        </Link>
      </div>
    </header>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <HeaderBar />
        <main className="flex-grow flex items-center justify-center pt-24">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border-4 border-gold border-t-transparent animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">Carregando carteirinha...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <HeaderBar />
        <main className="flex-grow flex items-center justify-center pt-24 px-6">
          <div className="text-center max-w-md">
            <h1 className="font-display text-4xl text-gradient-gold font-bold mb-4">404</h1>
            <h2 className="text-xl font-semibold mb-2">Carteirinha Não Encontrada</h2>
            <p className="text-muted-foreground text-sm mb-6">O registro não existe ou não foi localizado.</p>
            <Button asChild className="btn-gold btn-gold-hover h-11 px-6">
              <Link to="/membros">Voltar ao Portal de Membros</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background flex flex-col print:bg-white print:min-h-0">
        <HeaderBar />

        <main className="flex-grow pt-24 pb-16 px-6 print:p-0 print:pt-4">
          <div className="mx-auto max-w-4xl flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-8 print:hidden max-w-3xl">
              <Link to="/membros" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-gold transition-colors">
                <ArrowLeft className="w-4 h-4" /> Todos os Membros
              </Link>
              <Link to="/membros/carteirinha/validar" search={{ id: member.id }} className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gold hover:text-gold/80 transition-colors">
                <ShieldCheck className="w-4 h-4" /> Validar Carteirinha
              </Link>
            </div>

            <div className="flex bg-surface border border-border-gold/20 p-1 rounded-xl mb-8 w-full max-w-[380px] print:hidden">
              <button
                onClick={() => setViewMode("digital")}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${viewMode === "digital" ? "bg-card text-foreground shadow-sm border border-border-gold/20" : "text-muted-foreground hover:text-foreground"}`}
              >
                Versão Digital
              </button>
              <button
                onClick={() => setViewMode("print")}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${viewMode === "print" ? "bg-card text-foreground shadow-sm border border-border-gold/20" : "text-muted-foreground hover:text-foreground"}`}
              >
                Versão Impressa
              </button>
            </div>

            <div className="flex justify-center w-full mb-8 print:m-0">
              <MembershipCard member={member} viewMode={viewMode} />
            </div>

            <div className="flex flex-col gap-2 items-center w-full max-w-[380px] print:hidden">
              <div className="flex gap-3 justify-center w-full">
                <Button
                  onClick={viewMode === "digital" ? handlePrintDigitalPdf : handlePrint}
                  className="btn-gold btn-gold-hover h-11 px-5 text-xs font-semibold flex-1 cursor-pointer"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Baixar PDF
                </Button>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="border-border-gold/30 hover:bg-gold/5 h-11 px-5 text-xs font-semibold flex-1 cursor-pointer"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-2 italic">
                * Na janela de impressão, escolha <strong>Salvar como PDF</strong>.
              </p>
            </div>
          </div>
        </main>
      </div>

      <div className="digital-pdf-print-container">
        <MembershipCard member={member} viewMode="digital-pdf" />
      </div>
    </>
  );
}
