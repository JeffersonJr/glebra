import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const PARCEIROS = [
  {
    nome: "Soberano Conselho do Rito Elus Kohen Brasil",
    logo: "/parceiros/elus-kohen.png"
  },
  {
    nome: "Ra Heru Khuti Supreme Council",
    logo: "/parceiros/ra-heru-khuti-supreme-council.png"
  },
  {
    nome: "General Grand Council",
    logo: "/parceiros/general-grand-council.png"
  },
  {
    nome: "Supreme Grand Chapter Royal Arch Masons Saint Callistus I",
    logo: "/parceiros/supreme-grand-chapter-royal-arch-masons-saint-callistus-i.png"
  },
  {
    nome: "Allenaza Universale Massonica",
    logo: "/parceiros/allenaza-universale-massonica.png"
  },
  {
    nome: "Soberano Santuario de bolivia",
    logo: "/parceiros/soberano-santuario-de-bolivia.png"
  },
  {
    nome: "Internacional Grand College of Egyptian Masonic Rites",
    logo: "/parceiros/internacional-grand-college-of-egyptian-masonic-rites.png"
  },
  {
    nome: "Hermeticus Equites Antiqus Ordinis Ancient Order of Hermetic Knights",
    logo: "/parceiros/hermeticus-equites-antiqus-ordinis-ancient-order-of-hermetic-knights.png"
  },
  {
    nome: "Internacional Sanctuary of Amun Ancient and Primitive Rites of Memphis and Mizraim",
    logo: "/parceiros/internacional-sanctuary-of-amun-ancient-and-primitive-rites-of-memphis-and-mizraim.png"
  },
  {
    nome: "Supremo Conselho dos Altos Graus Maçônicos para o Brasil",
    logo: "/parceiros/supremo-conselho-dos-altos-graus-maconicos-para-o-brasil.png"
  },
  {
    nome: "Corte Internacional de Justiça do Brasil",
    logo: "/parceiros/corte-internacional-de-justica-do-brasil.png"
  },
  {
    nome: "Supremo Conclave Internacional de Ritos Iniciáticos",
    logo: "/parceiros/supremo-conclave-internacional-de-ritos-iniciaticos.png"
  },
  {
    nome: "Supremo Conselho Egípcio do Brasil",
    logo: "/parceiros/supremo-conselho-egipcio-do-brasil.png"
  },
  {
    nome: "Ordem Hermética do Livre Buscador",
    logo: "/parceiros/ordem-hermetica-do-livre-buscador.png"
  },
  {
    nome: "Grande Oriente Nacional Colombiano",
    logo: "/parceiros/grande-oriente-nacional-colombiano.png"
  },
  {
    nome: "Supremo Gran Capitulo de La Antigua Masoneria de York De Gran Oriente",
    logo: "/parceiros/supremo-gran-capitulo-de-la-antigua-masoneria-de-york-de-gran-oriente.png"
  },
  {
    nome: "Internacional Anglo Masonic Confederation",
    logo: "/parceiros/internacional-anglo-masonic-confederation.png"
  },
  {
    nome: "Supremo Conselho Anglo Maçônico para o Grau 33º",
    logo: "/parceiros/supremo-conselho-anglo-maconico-para-o-grau-33.png"
  },
  {
    nome: "Supremo Conselho do Rito Italiano",
    logo: "/parceiros/supremo-conselho-do-rito-italiano.png"
  },
  {
    nome: "Supremo Conselho do RITAM",
    logo: "/parceiros/supremo-conselho-do-ritam.png"
  },
  {
    nome: "Soberano Gran Conselho de Sublimes Principes Del Real Secreto para Colombiano",
    logo: "/parceiros/soberano-gran-conselho-de-sublimes-principes-del-real-secreto-para-colombiano.png"
  },
  {
    nome: "Soberano Santuário Egipcio de Colombia",
    logo: "/parceiros/soberano-santuario-egipcio-de-colombia.png"
  },
  {
    nome: "Supremo Conselho de la Nueva Granada",
    logo: "/parceiros/supremo-conselho-de-la-nueva-granada.png"
  },
  {
    nome: "Supremo Conselho de la Jurisdicion del Centro",
    logo: "/parceiros/supremo-conselho-de-la-jurisdicion-del-centro.png"
  },
  {
    nome: "O∴I∴E∴N∴B∴",
    logo: "/parceiros/oienb.png"
  },
  {
    nome: "Ordens Masonica de Colombia",
    logo: "/parceiros/ordens-masonica-de-colombia.png"
  },
  {
    nome: "Gran Capitulo General del Gran Oriente Nacional Colombiano",
    logo: "/parceiros/gran-capitulo-general-del-gran-oriente-nacional-colombiano.png"
  },
  {
    nome: "Gran Oriente Nacional Colombiano",
    logo: "/parceiros/gran-oriente-nacional-colombiano.png"
  },
  {
    nome: "Grande Loja Irmandade Estrela Negra do Brasil",
    logo: "/parceiros/grande-loja-irmandade-estrela-negra-do-brasil.png"
  },
  {
    nome: "Soberana Ordem Templária Cavaleiros do coração de Cristo",
    logo: "/parceiros/soberana-ordem-templaria-cavaleiros-do-coracao-de-cristo.png"
  },
  {
    nome: "Casa Real Ferreira",
    logo: "/parceiros/casa-real-ferreira.png"
  },
  {
    nome: "GR. Cons. de Mmaç. para o Brasil",
    logo: "/parceiros/gr-cons-de-mmac-para-o-brasil.png"
  },
  {
    nome: "Grande Capítulo do Arco Real para o Brasil",
    logo: "/parceiros/grande-capitulo-do-arco-real-para-o-brasil.png"
  },
  {
    nome: "Supreme Conseil Universel Phênicen Liban",
    logo: "/parceiros/supreme-conseil-universel-phenicen-liban.png"
  },
  {
    nome: "Grande Loge Universelle Phénicienne",
    logo: "/parceiros/grande-loge-universelle-phenicienne.png"
  },
  {
    nome: "Real Gran Logia Hermética Mixta Valle del Paraguay",
    logo: "/parceiros/real-gran-logia-hermetica-mixta-valle-del-paraguay.png"
  },
  {
    nome: "Ausaru Sovereign Sanctuary of the U.S.A",
    logo: "/parceiros/ausaru-sovereign-sanctuary-of-the-usa.png"
  },
  {
    nome: "Hugues de Paynes Supreme General Grand Encampment",
    logo: "/parceiros/hugues-de-paynes-supreme-general-grand-encampment.png"
  },
  {
    nome: "St Gelasius Sovereign International",
    logo: "/parceiros/st-gelasius-sovereign-international.png"
  }
];

export function ParceirosCarousel() {
  return (
    <section id="parceiros" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl text-center mb-16">
        <p className="divider-gold justify-center mb-6">
          <span className="divider-gold-line" />
          Nossos Parceiros
          <span className="divider-gold-line" />
        </p>
        <h2 className="text-4xl md:text-5xl mb-6">
          Juntos pela <span className="text-gradient-gold italic">evolução</span> do Ser Humano
        </h2>
        <p className="text-muted-foreground font-light leading-relaxed mb-12 max-w-3xl mx-auto">
          O principal objetivo de nossa organização é promover a evolução do Ser Humano. Procuramos apoiar, capacitar e fornecer recursos de Alta Qualidade para a humanidade. Nosso sucesso não é medido por meio de recursos ou lucro, e sim do impacto causado em quem se une a nós.
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-8 md:px-12 relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {PARCEIROS.map((parceiro, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <div className="card-mystic p-4 rounded-xl flex flex-col items-center justify-center text-center h-full hover:border-border-gold transition-colors gap-4">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center rounded-full overflow-hidden border border-border-gold/20 bg-surface/50 p-2">
                    <img
                      src={parceiro.logo}
                      alt={parceiro.nome}
                      className="object-contain w-full h-full drop-shadow-md"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs text-foreground/80 font-medium leading-tight line-clamp-3 px-1">
                    {parceiro.nome}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex border-border-gold/30 hover:bg-gold/10 hover:text-gold" />
          <CarouselNext className="hidden sm:flex border-border-gold/30 hover:bg-gold/10 hover:text-gold" />
        </Carousel>
      </div>
    </section>
  );
}
