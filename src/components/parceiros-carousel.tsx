import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const PARCEIROS = [
  {
    nome: "Ra Heru Khuti Supreme Council",
    logo: "/parceiros/Mask-group-4-300x300.png"
  },
  {
    nome: "General Grand Council",
    logo: "/parceiros/Group-94-300x226.png"
  },
  {
    nome: "Supreme Grand Chapter Royal Arch Masons Saint Callistus I",
    logo: "/parceiros/Mask-group-5-300x300.png"
  },
  {
    nome: "Allenaza Universale Massonica",
    logo: "/parceiros/Mask-group-6-300x300.png"
  },
  {
    nome: "Soberano Santuario de bolivia",
    logo: "/parceiros/image-185-300x293.png"
  },
  {
    nome: "Internacional Grand College of Egyptian Masonic Rites",
    logo: "/parceiros/Mask-group-300x300.png"
  },
  {
    nome: "Hermeticus Equites Antiqus Ordinis Ancient Order of Hermetic Knights",
    logo: "/parceiros/image-177-300x300.png"
  },
  {
    nome: "Internacional Sanctuary of Amun Ancient and Primitive Rites of Memphis and Mizraim",
    logo: "/parceiros/Mask-group-1-300x218.png"
  },
  {
    nome: "Supremo Conselho dos Altos Graus Maçônicos para o Brasil",
    logo: "/parceiros/Mask-group-1-292x300.png"
  },
  {
    nome: "Corte Internacional de Justiça do Brasil",
    logo: "/parceiros/4-7230868-300x300.png"
  },
  {
    nome: "Supremo Conclave Internacional de Ritos Iniciáticos",
    logo: "/parceiros/1-300x298.png"
  },
  {
    nome: "Supremo Conselho Egípcio do Brasil",
    logo: "/parceiros/2-300x300.png"
  },
  {
    nome: "Ordem Hermética do Livre Buscador",
    logo: "/parceiros/3-2-300x300.png"
  },
  {
    nome: "Grande Oriente Nacional Colombiano",
    logo: "/parceiros/image-153-300x300.png"
  },
  {
    nome: "Supremo Gran Capitulo de La Antigua Masoneria de York De Gran Oriente",
    logo: "/parceiros/image-155-300x300.png"
  },
  {
    nome: "Internacional Anglo Masonic Confederation",
    logo: "/parceiros/image-160-300x300.png"
  },
  {
    nome: "Supremo Conselho Anglo Maçônico para o Grau 33º",
    logo: "/parceiros/image-165-300x295.png"
  },
  {
    nome: "Supremo Conselho do Rito Italiano",
    logo: "/parceiros/image-164-300x300.png"
  },
  {
    nome: "Supremo Conselho do RITAM",
    logo: "/parceiros/Mask-group-300x300.png"
  },
  {
    nome: "Soberano Gran Conselho de Sublimes Principes Del Real Secreto para Colombiano",
    logo: "/parceiros/image-156-300x300.png"
  },
  {
    nome: "Soberano Santuário Egipcio de Colombia",
    logo: "/parceiros/image-158-297x300.png"
  },
  {
    nome: "Supremo Conselho de la Nueva Granada",
    logo: "/parceiros/Group-90-300x300.png"
  },
  {
    nome: "Supremo Conselho de la Jurisdicion del Centro",
    logo: "/parceiros/Group-91-263x300.png"
  },
  {
    nome: "O∴I∴E∴N∴B∴",
    logo: "/parceiros/Group-92-300x300.png"
  },
  {
    nome: "Ordens Masonica de Colombia",
    logo: "/parceiros/image-157-298x300.png"
  },
  {
    nome: "Gran Capitulo General del Gran Oriente Nacional Colombiano",
    logo: "/parceiros/Group-93-300x300.png"
  },
  {
    nome: "Gran Oriente Nacional Colombiano",
    logo: "/parceiros/image-154-300x300.png"
  },
  {
    nome: "Grande Loja Irmandade Estrela Negra do Brasil",
    logo: "/parceiros/image-161-300x300.png"
  },
  {
    nome: "Soberana Ordem Templária Cavaleiros do coração de Cristo",
    logo: "/parceiros/image-162-253x300.png"
  },
  {
    nome: "Casa Real Ferreira",
    logo: "/parceiros/image-163-300x300.png"
  },
  {
    nome: "GR. Cons. de Mmaç. para o Brasil",
    logo: "/parceiros/image-173-300x300.png"
  },
  {
    nome: "Grande Capítulo do Arco Real para o Brasil",
    logo: "/parceiros/image-174-300x300.png"
  },
  {
    nome: "Supreme Conseil Universel Phênicen Liban",
    logo: "/parceiros/Mask-group-2-300x300.png"
  },
  {
    nome: "Grande Loge Universelle Phénicienne",
    logo: "/parceiros/Mask-group-1-1-300x300.png"
  },
  {
    nome: "Real Gran Logia Hermética Mixta Valle del Paraguay",
    logo: "/parceiros/image-178-300x300.png"
  },
  {
    nome: "Ausaru Sovereign Sanctuary of the U.S.A",
    logo: "/parceiros/image-179-300x300.png"
  },
  {
    nome: "Hugues de Paynes Supreme General Grand Encampment",
    logo: "/parceiros/Mask-group-2-1-300x300.png"
  },
  {
    nome: "St Gelasius Sovereign International",
    logo: "/parceiros/Mask-group-3-300x300.png"
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
