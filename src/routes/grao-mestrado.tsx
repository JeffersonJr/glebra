import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Shield, Star, Award, ScrollText } from "lucide-react";

export const Route = createFileRoute("/grao-mestrado")({
  head: () => ({
    meta: [
      { title: "Grão Mestrado — GLEBRA" },
      { name: "description", content: "Liderança do Soberano Santuário Egípcio do Brasil" },
      { property: "og:title", content: "Grão Mestrado — GLEBRA" },
    ],
    links: [{ rel: "canonical", href: "/grao-mestrado" }],
  }),
  component: GraoMestradoPage,
});

function GraoMestradoPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-[url('@/assets/hero-cosmos.jpg')] opacity-20 bg-cover bg-center grayscale mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-0" />
        
        <div className="relative z-10 mx-auto max-w-4xl text-center mt-12">
          <p className="divider-gold justify-center mb-6">
            <span className="divider-gold-line" />
            Soberano Santuário Egípcio do Brasil
            <span className="divider-gold-line" />
          </p>
          <h1 className="font-display text-5xl md:text-7xl mb-6">
            <span className="block text-foreground/95">Grão</span>
            <span className="block text-gradient-gold italic font-light">Mestrado</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            A liderança da Ordem dedicada a preservar, transmitir e governar os augustos mistérios do Antigo e Primitivo Rito Oriental de Memphis & Misraim.
          </p>
        </div>
      </section>

      <main className="flex-grow px-6 pb-24 relative z-10 space-y-24">
        
        {/* Grão Mestre Nacional */}
        <section className="mx-auto max-w-5xl">
          <div className="bg-surface/50 border border-border-gold/20 rounded-2xl overflow-hidden relative flex flex-col md:flex-row shadow-2xl">
            <div className="w-full md:w-1/3 aspect-square md:aspect-auto bg-black/40 relative flex items-center justify-center border-b md:border-b-0 md:border-r border-border-gold/20">
              <div className="absolute inset-0 bg-[url('@/assets/hero-cosmos.jpg')] opacity-10 bg-cover bg-center grayscale mix-blend-overlay" />
              <div className="relative z-10 w-32 h-32 rounded-full border border-gold/30 bg-background/80 flex items-center justify-center backdrop-blur-sm shadow-[0_0_30px_rgba(197,160,89,0.15)] group-hover:shadow-[0_0_40px_rgba(197,160,89,0.3)] transition-all">
                <span className="font-display text-5xl text-gradient-gold font-bold">R</span>
              </div>
            </div>
            
            <div className="p-8 md:p-12 flex-grow flex flex-col justify-center">
              <h2 className="font-display text-3xl font-bold text-white mb-2">Rogério Cristiano da Silva Gonçalves</h2>
              <h3 className="text-sm uppercase tracking-widest text-gold mb-8 flex items-center gap-2">
                <Star className="w-4 h-4" /> Grão Mestre Nacional
              </h3>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <h4 className="text-white/80 font-medium flex items-center gap-2 mb-2">
                  <ScrollText className="w-4 h-4 text-gold/60" />
                  Currículo de Ordem
                </h4>
                <div className="p-6 rounded-xl border border-dashed border-border-gold/20 bg-background/40 relative">
                  <div className="absolute -top-3 left-6 px-2 bg-surface text-[10px] uppercase tracking-widest text-gold/60">Resumo</div>
                  <p className="italic mb-3">"A verdadeira iniciação é aquela que ocorre no templo interior do homem, guiada pela luz do conhecimento milenar."</p>
                  <p className="text-sm opacity-80">
                    O currículo completo de Ordem do Grão Mestre Nacional será atualizado nesta seção, detalhando sua trajetória maçônica, títulos, condecorações e contribuições fundamentais para o estabelecimento e crescimento do Rito no Brasil.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grão Mestres Adjunto e Estadual */}
        <section className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl text-white">Alta Administração</h2>
            <div className="w-12 h-px bg-gold/30 mx-auto mt-4" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Jefferson Beira */}
            <div className="bg-surface/30 border border-border-gold/10 rounded-2xl p-8 hover:border-gold/30 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full border border-gold/20 bg-background/50 flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 transition-transform">
                <span className="font-display text-2xl text-gold/80 font-bold">J</span>
              </div>
              <h3 className="font-display text-2xl text-white mb-1">Jefferson Beira</h3>
              <p className="text-xs uppercase tracking-wider text-gold/80 mb-4 flex items-center justify-center gap-1.5">
                <Shield className="w-3 h-3" /> Grão Mestre Adjunto e Grande Secretário
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Atuando como pilar administrativo e braço direito do Grão Mestrado, coordena as relações e registros do Soberano Santuário.
              </p>
            </div>

            {/* Marcello Carneiro */}
            <div className="bg-surface/30 border border-border-gold/10 rounded-2xl p-8 hover:border-gold/30 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full border border-gold/20 bg-background/50 flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 transition-transform">
                <span className="font-display text-2xl text-gold/80 font-bold">M</span>
              </div>
              <h3 className="font-display text-2xl text-white mb-1">Marcello Carneiro</h3>
              <p className="text-xs uppercase tracking-wider text-gold/80 mb-4 flex items-center justify-center gap-1.5">
                <Award className="w-3 h-3" /> Grão Mestre Estadual — RJ
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Responsável pela liderança e expansão do Rito no Estado do Rio de Janeiro, orientando Lojas e Triângulos locais.
              </p>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
