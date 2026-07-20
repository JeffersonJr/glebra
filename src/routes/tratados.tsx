import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FileText, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/tratados")({
  head: () => ({
    meta: [
      { title: "Tratados — GLEBRA" },
      { name: "description", content: "Tratados de amizade e mútuo reconhecimento da Grande Loja Egípcia Brasileira." },
    ],
  }),
  component: TratadosPage,
});

// Tratados Placeholder Data
const TRATADOS = [
  { nome: "Tratado de Amizade e Mútuo Reconhecimento", ordem: "Potência Maçônica", data: "2024", imagem: "/tratados/tratado-01.jpeg" },
  { nome: "Tratado de Amizade e Mútuo Reconhecimento", ordem: "Potência Maçônica", data: "2024", imagem: "/tratados/tratado-02.jpeg" },
  { nome: "Tratado de Amizade e Mútuo Reconhecimento", ordem: "Potência Maçônica", data: "2024", imagem: "/tratados/tratado-03.jpeg" },
  { nome: "Tratado de Amizade e Mútuo Reconhecimento", ordem: "Potência Maçônica", data: "2024", imagem: "/tratados/tratado-04.jpeg" },
  { nome: "Tratado de Amizade e Mútuo Reconhecimento", ordem: "Potência Maçônica", data: "2024", imagem: "/tratados/tratado-05.jpeg" },
  { nome: "Tratado de Amizade e Mútuo Reconhecimento", ordem: "Potência Maçônica", data: "2024", imagem: "/tratados/tratado-06.jpeg" },
  { nome: "Tratado de Amizade e Mútuo Reconhecimento", ordem: "Potência Maçônica", data: "2024", imagem: "/tratados/tratado-07.jpeg" },
  { nome: "Tratado de Amizade e Mútuo Reconhecimento", ordem: "Potência Maçônica", data: "2024", imagem: "/tratados/tratado-08.jpeg" },
  { nome: "Tratado de Amizade e Mútuo Reconhecimento", ordem: "Potência Maçônica", data: "2024", imagem: "/tratados/tratado-09.jpeg" },
  { nome: "Tratado de Amizade e Mútuo Reconhecimento", ordem: "Potência Maçônica", data: "2024", imagem: "/tratados/tratado-10.jpeg" },
  { nome: "Tratado de Amizade e Mútuo Reconhecimento", ordem: "Potência Maçônica", data: "2024", imagem: "/tratados/tratado-11.jpeg" },
  { nome: "Tratado de Amizade e Mútuo Reconhecimento", ordem: "Potência Maçônica", data: "2024", imagem: "/tratados/tratado-12.jpeg" },
  { nome: "Tratado de Amizade e Mútuo Reconhecimento", ordem: "Potência Maçônica", data: "2024", imagem: "/tratados/tratado-13.jpeg" },
  { nome: "Tratado de Amizade e Mútuo Reconhecimento", ordem: "Potência Maçônica", data: "2024", imagem: "/tratados/tratado-14.jpeg" },
  { nome: "Tratado de Amizade e Mútuo Reconhecimento", ordem: "Potência Maçônica", data: "2024", imagem: "/tratados/tratado-15.jpeg" },
  { nome: "Tratado de Amizade e Mútuo Reconhecimento", ordem: "Potência Maçônica", data: "2024", imagem: "/tratados/tratado-16.jpeg" }
];

function TratadosPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative pt-44 pb-16 px-6 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-[url('@/assets/hero-cosmos.jpg')] opacity-20 bg-cover bg-center grayscale mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-0" />
        
        <div className="relative z-10 mx-auto max-w-4xl text-center mt-12">
          <p className="divider-gold justify-center mb-6">
            <span className="divider-gold-line" />
            Laços Fraternais
            <span className="divider-gold-line" />
          </p>
          <h1 className="font-display text-5xl md:text-7xl mb-6">
            <span className="block text-foreground/95">Nossos</span>
            <span className="block text-gradient-gold italic font-light">Tratados</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Reconhecimento mútuo, amizade e aliança com Potências e Ordens Maçônicas Regulares ao redor do mundo.
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="flex-grow px-6 pb-24 relative z-10">
        <div className="mx-auto max-w-7xl">
          {TRATADOS.length > 0 && TRATADOS[0].imagem !== "" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {TRATADOS.map((tratado, index) => (
                <div key={index} className="bg-surface/50 border border-border-gold/20 rounded-2xl overflow-hidden hover:border-gold/40 transition-all duration-500 group flex flex-col">
                  {/* Image Placeholder */}
                  <div className="w-full aspect-[3/4] bg-black/40 relative overflow-hidden flex items-center justify-center p-4">
                    {tratado.imagem ? (
                      <img src={tratado.imagem} alt={tratado.nome} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]" />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gold/30">
                        <FileText className="w-16 h-16 mb-4 opacity-50" />
                        <span className="text-xs uppercase tracking-widest">Documento</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent z-0 opacity-80" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow relative z-10">
                    <h3 className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-2">
                      <ShieldCheck className="w-3 h-3 text-gold/60" /> {tratado.ordem}
                    </h3>
                    <h2 className="font-display text-xl font-bold text-white mb-1">
                      {tratado.nome}
                    </h2>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mt-auto pt-4 block">
                      {tratado.data}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-border-gold/20 rounded-2xl bg-surface/30">
              <ShieldCheck className="w-12 h-12 text-gold/40 mx-auto mb-4" />
              <h3 className="text-lg font-display text-white mb-2">Galeria em Preparação</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Em breve, disponibilizaremos aqui os documentos oficiais dos nossos tratados de amizade e reconhecimento mútuo.
              </p>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
