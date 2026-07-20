import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { Shield, BookOpen, Star, Sparkles } from "lucide-react";

import imgCagliostro from "@/assets/imortais/cagliostro.png";
import imgMarconis from "@/assets/imortais/marconis.png";
import imgGaribaldi from "@/assets/imortais/garibaldi.png";
import imgPapus from "@/assets/imortais/papus.png";
import imgYarker from "@/assets/imortais/yarker.png";
import imgPike from "@/assets/imortais/pike.png";

export const Route = createFileRoute("/imortais")({
  head: () => ({
    meta: [
      { title: "Galeria dos Imortais de Memphis & Misraim — GLEBRA" },
      { name: "description", content: "Figuras lendárias e históricas da Maçonaria Egípcia de Memphis-Misraim." },
      { property: "og:title", content: "Galeria dos Imortais de Memphis & Misraim — GLEBRA" },
    ],
    links: [{ rel: "canonical", href: "/imortais" }],
  }),
  component: ImortaisPage,
});

const IMMORTALS = [
  {
    name: "Alessandro Cagliostro",
    title: "O Grande Copta",
    period: "1743 — 1795",
    description: "Criador do Rito Egípcio e uma das figuras mais enigmáticas do século XVIII. Fundou a Maçonaria Egípcia com a intenção de restaurar o homem à sua pureza original, estabelecendo lojas sob uma teurgia divina.",
    quote: "A magia é a ciência que ensina como se comunicar com as potências superiores.",
    image: imgCagliostro,
  },
  {
    name: "Jacques Étienne Marconis de Nègre",
    title: "Fundador do Rito de Memphis",
    period: "1795 — 1868",
    description: "Herdou de seu pai os arcanos do Rito e estabeleceu as bases esotéricas e filosóficas do Rito de Memphis em 1838. Trabalhou incansavelmente para compilar a tradição esotérica em seus célebres 95 Graus.",
    quote: "A luz vem do Oriente, e a iniciação é o despertar do deus interior.",
    image: imgMarconis,
  },
  {
    name: "Giuseppe Garibaldi",
    title: "O Primeiro Grande Hierofante",
    period: "1807 — 1882",
    description: "Herói de dois mundos e unificador da Itália, Garibaldi foi um ferrenho defensor da Liberdade e serviu como o primeiro Grande Hierofante unindo os Ritos de Memphis e Misraim.",
    quote: "Aqui nós lutamos, não para conquistar, mas para sermos livres.",
    image: imgGaribaldi,
  },
  {
    name: "Gérard Encausse (Papus)",
    title: "Reformador Hermético",
    period: "1865 — 1916",
    description: "Renomado médico e ocultista francês, Papus foi peça central no Ocultismo do século XIX e início do século XX. Como Grão-Mestre, ajudou a expandir o Rito e unificar diversas ordens esotéricas em prol da tradição.",
    quote: "Ocultismo não é a fuga da realidade, mas a exploração profunda das leis ocultas da natureza.",
    image: imgPapus,
  },
  {
    name: "John Yarker",
    title: "Guardião da Tradição",
    period: "1833 — 1913",
    description: "Eminente maçom e escritor inglês, Yarker traduziu e preservou o Rito Antigo e Primitivo, garantindo que os altos graus do conhecimento esotérico e teúrgico não se perdessem para a posteridade.",
    quote: "Nós preservamos os ritos porque eles são o elo com as antigas escolas de mistérios.",
    image: imgYarker,
  },
  {
    name: "Albert Pike",
    title: "Soberano Grande Comendador",
    period: "1809 — 1891",
    description: "Autor de 'Moral e Dogma', Pike foi a figura central na reestruturação da maçonaria filosófica. Seus profundos estudos herméticos e esotéricos influenciaram enormemente os ritos de altos graus, estruturando o que se tornaria o padrão de excelência maçônica.",
    quote: "O que fazemos por nós mesmos morre conosco. O que fazemos pelos outros e pelo mundo continua a viver e é imortal.",
    image: imgPike,
  },
];

function ImortaisPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <SiteHeader transparentTop={false} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-background to-background" />
        </div>

        <div className="mx-auto max-w-5xl px-6 relative z-10 text-center">
          <p className="divider-gold justify-center mb-6">
            <span className="divider-gold-line" />
            <Sparkles className="w-3 h-3 text-gold mx-2 opacity-50" />
            <span className="divider-gold-line" />
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-gradient-gold font-bold mb-6 drop-shadow-sm">
            Galeria dos Imortais de Memphis & Misraim
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed font-light">
            Aqueles cujos nomes ecoam na eternidade. Grandes Mestres, Hierofantes e Guardiões
            que devotaram suas vidas para estruturar, preservar e transmitir a Luz do
            Antigo e Primitivo Rito de Memphis & Misraim.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <main className="flex-grow px-6 pb-24 relative z-10">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {IMMORTALS.map((immortal, index) => (
            <div
              key={index}
              className="bg-surface/50 border border-border-gold/20 rounded-2xl overflow-hidden hover:border-gold/40 transition-all duration-500 group relative flex flex-col"
            >
              {/* Image / Avatar Placeholder */}
              <div className="w-full aspect-square p-4 bg-black/40 relative overflow-hidden flex items-center justify-center border-b border-border-gold/20">
                <img src={immortal.image} alt={immortal.name} className="relative z-10 w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 opacity-80 mix-blend-luminosity hover:mix-blend-normal drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent z-0 opacity-80" />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="mb-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-1 block">
                    {immortal.period}
                  </span>
                  <h2 className="font-display text-2xl font-bold text-white mb-1">
                    {immortal.name}
                  </h2>
                  <h3 className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Shield className="w-3 h-3 text-gold/60" /> {immortal.title}
                  </h3>
                </div>

                <p className="text-sm text-white/70 leading-relaxed font-light mb-6 flex-grow">
                  {immortal.description}
                </p>

                <div className="bg-background/50 border border-gold/10 p-4 rounded-xl relative">
                  <Star className="w-3 h-3 text-gold/40 absolute -top-1.5 -left-1.5 fill-gold/20" />
                  <p className="font-serif italic text-gold/90 text-sm leading-relaxed">
                    "{immortal.quote}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
