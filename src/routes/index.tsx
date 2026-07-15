import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/logo-glebra.webp";
import logoSoseb from "@/assets/logo-soseb.png";
import heroCosmos from "@/assets/hero-cosmos.jpg";
import templeImg from "@/assets/temple.jpg";
import voltaireImg from "@/assets/voltaire.png";
import { MasonsJoin } from "@/components/masons-join";
import { ParceirosCarousel } from "@/components/parceiros-carousel";
import { FAQ } from "@/components/faq";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/")({
  component: HomePage,
});

import { SiteHeader } from "@/components/site-header";

const PRINCIPIOS = [
  { t: "O Grande Arquiteto", d: "A crença em um Ser Supremo e Princípio Criador do Universo." },
  { t: "Sigilo e Discrição", d: "Nossos trabalhos são perpetuados de forma duradoura e perene." },
  { t: "Simbolismo Universal", d: "A tradição simbólica da Francomaçonaria em sua plenitude." },
  { t: "Três Graus Simbólicos", d: "Aprendiz, Companheiro e Mestre com a utilização da Lenda de Hiram Abif." },
  { t: "Homens e Mulheres", d: "Iniciação em igualdade absoluta, sem distinção de gênero." },
  { t: "Neutralidade Sagrada", d: "Nenhuma argumentação política, religiosa ou racial nos Templos." },
  { t: "Três Grandes Luzes", d: "Livro Sagrado, Esquadro e Compasso, sempre à vista." },
  { t: "O Avental Franco maçônico", d: "Símbolo do trabalho — indispensável em toda Sessão." },
  { t: "Landmarks de Albert Pike", d: "Os fundamentos imutáveis da Ordem." },
  { t: "Liberdade, Igualdade, Fraternidade", d: "O Lema Franco maçônico que atravessa os séculos" },
];

const GRAUS = [
  {
    degree: 1,
    label: "I",
    nome: "Aprendiz Francomaçom",
    desc: "O Aprendiz deve, acima de tudo, saber aprender. Aborda o simbolismo, o desenvolvimento das virtudes e a eliminação dos vícios. O mais importante dos graus simbólicos.",
  },
  {
    degree: 2,
    label: "II",
    nome: "Companheiro Francomaçom",
    desc: "Propicia excepcional conhecimento dos símbolos, avanços ritualísticos e o refinamento do caráter.",
  },
  {
    degree: 3,
    label: "III",
    nome: "Mestre Francomaçom",
    desc: "O grau da plenitude maçônica. Conhecimentos elevados da história e artefatos da Ordem. Habilita a exercer todos os cargos.",
  },
];

const LINHAGEM_1 = [
  "Giuseppe Garibaldi", "John Yarker", "Theodore Reuss", "Bricaud", "Chevillon", "Dupont",
  "Ambelain", "Brunelli", "Ripel", "López de Rojas", "Labbé",
  "Arteaga", "Rugerio", "Parra (México)", "Shem Kepher Sedjem"
];

const LINHAGEM_2 = [
  "Giuseppe Garibaldi", "John Yarker", "Theodore Reuss", "Gerard Encauss",
  "Hector", "Francois Jean", "Maine", "Michael Bertiaux",
  "Tau Allen Greenfield", "Asuar Khepera (Naküm Bey)", "Amzi Muhammad",
  "Shem Kepher Sedjem"
];

function MasonicDegreeIcon({ degree }: { degree: 1 | 2 | 3 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <defs>
        <mask id="mask-square">
          <rect width="24" height="24" fill="white" />
          <path d="M 4 13 L 12 21 L 20 13" stroke="black" strokeWidth="4" fill="none" strokeLinecap="square" strokeLinejoin="miter" />
        </mask>
        <mask id="mask-compass-right">
          <rect width="24" height="24" fill="white" />
          <path d="M 12 3 L 19 21" stroke="black" strokeWidth="4" fill="none" />
        </mask>
        <mask id="mask-compass-both">
          <rect width="24" height="24" fill="white" />
          <path d="M 5 21 L 12 3 L 19 21" stroke="black" strokeWidth="4" fill="none" strokeLinejoin="miter" />
        </mask>
      </defs>

      {degree === 1 && (
        <>
          <g mask="url(#mask-square)">
            <path d="M 5 21 L 12 3 L 19 21" />
            <circle cx="12" cy="4" r="1.5" fill="currentColor" />
          </g>
          <path d="M 4 13 L 12 21 L 20 13" />
        </>
      )}

      {degree === 2 && (
        <>
          <path d="M 12 3 L 5 21" mask="url(#mask-square)" />
          <path d="M 4 13 L 12 21 L 20 13" mask="url(#mask-compass-right)" />
          <path d="M 12 3 L 19 21" />
          <circle cx="12" cy="4" r="1.5" fill="currentColor" />
        </>
      )}

      {degree === 3 && (
        <>
          <path d="M 4 13 L 12 21 L 20 13" mask="url(#mask-compass-both)" />
          <path d="M 5 21 L 12 3 L 19 21" />
          <circle cx="12" cy="4" r="1.5" fill="currentColor" />
        </>
      )}
    </svg>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader transparentTop={true} />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroCosmos})` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, transparent 0%, oklch(0.14 0.04 265 / 0.7) 55%, oklch(0.1 0.03 265) 100%)",
          }}
        />
        {/* subtle stars overlay */}
        <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(1px 1px at 20% 30%, oklch(0.9 0.05 85) 100%, transparent), radial-gradient(1px 1px at 70% 60%, oklch(0.9 0.05 85) 100%, transparent), radial-gradient(1px 1px at 45% 80%, oklch(0.9 0.05 85) 100%, transparent), radial-gradient(1.5px 1.5px at 85% 20%, oklch(0.88 0.1 82) 100%, transparent)",
              backgroundSize: "600px 600px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center pt-20">
          <div className="mb-10 flex justify-center animate-float-slow">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-3xl animate-shimmer"
                style={{ background: "var(--gradient-radial-gold)", transform: "scale(1.8)" }}
              />
              <img
                src={logoAsset}
                alt="Selo da Grande Loja Egípcia Brasileira"
                width={180}
                height={180}
                className="relative h-40 w-40 md:h-48 md:w-48 drop-shadow-2xl"
              />
            </div>
          </div>

          <p className="divider-gold justify-center mb-6">
            <span className="divider-gold-line" />
            Preservando o antigo conhecimento da Franco maçonaria
            <span className="divider-gold-line" />
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-7xl leading-[1.02] mb-8">
            <span className="block text-foreground/95">Antigo e Primitivo Rito</span>
            <span className="block text-gradient-gold italic font-light">Oriental de Memphis & Misraim</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed mb-12 font-light">
            Uma instituição iniciática, hermética, filosófica e progressista.
            Aqui, homens e mulheres caminham lado a lado em busca da luz do
            conhecimento, da virtude e da verdade.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#quem-somos"
              className="btn-gold btn-gold-hover rounded-full px-8 py-3.5 text-sm font-medium uppercase tracking-[0.2em]"
            >
              Conhecer a Ordem
            </a>
            <Link
              to="/triagem"
              className="rounded-full border border-border-gold px-8 py-3.5 text-sm font-medium uppercase tracking-[0.2em] text-foreground hover:bg-surface transition-colors"
            >
              Quero ser um Franco Maçom
            </Link>
          </div>
        </div>

      </section>

      {/* QUEM SOMOS */}
      <section id="quem-somos" className="relative py-32 px-6">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="divider-gold mb-6">
              <span className="divider-gold-line" />
              Quem Somos
            </p>
            <h2 className="text-4xl md:text-5xl mb-8 leading-tight">
              A luz que ilumina o <span className="text-gradient-gold italic">Ser Humano</span>
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed font-light">
              <p>
                A Grande Loja Egípcia Brasileira é uma Instituição Iniciática, essencialmente
                Hermética, Filosófica, Progressista e Evolucionista. Inicia e admite em suas
                Colunas Pessoas dos gêneros masculino e feminino, na mais perfeita igualdade.
              </p>
              <p>
                Prezamos e trabalhamos pelo aperfeiçoamento moral, intelectual e social da
                humanidade. Incentivamos a prática das elevadas virtudes e o cumprimento das
                leis justas e humanitárias.
              </p>
              <p>
                Combatemos privilégios indevidos, fanatismo, ignorância, intolerância religiosa
                e todas as formas de preconceito. Proclamamos a liberdade de todos os Seres
                Humanos e de todos os povos.
              </p>
            </div>

            <div className="flex items-center gap-4 p-4 bg-surface/50 border border-border-gold/30 rounded-xl hover:border-border-gold hover:bg-surface/80 transition-all group mt-8">
              <img src={logoSoseb} alt="Logo SOSEB" className="h-16 w-16 object-contain transition-transform group-hover:scale-105" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold/70 font-bold mb-1">jurisdicionado ao</p>
                <h3 className="font-display text-base text-foreground font-semibold leading-tight group-hover:text-gold transition-colors">Soberano Santuário Egípcio do Brasil - SOSEB</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Potência Maçônica Regular e Legítima</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute -inset-4 rounded-2xl opacity-40 blur-2xl"
              style={{ background: "var(--gradient-radial-gold)" }}
            />
            <div className="relative overflow-hidden rounded-2xl border border-border-gold">
              <img
                src={templeImg}
                alt="Templo egípcio"
                width={800}
                height={500}
                loading="lazy"
                className="w-full h-[560px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-display text-3xl text-gold italic">
                  "A esperança está onde o seu coração está."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSÃO */}
      <section id="missao" className="relative py-32 px-6 border-y border-border-gold/20">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ background: "var(--gradient-radial-gold)" }}
        />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="divider-gold justify-center mb-6">
            <span className="divider-gold-line" />
            Nossa Missão
            <span className="divider-gold-line" />
          </p>
          <h2 className="text-4xl md:text-5xl mb-16">
            Seis pilares, uma <span className="text-gradient-gold italic">jornada</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              ["I", "Investigar a verdade e praticar a justiça."],
              ["II", "Combater a ignorância e a intolerância em todas as formas."],
              ["III", "Obedecer às leis justas e humanitárias do País."],
              ["IV", "Promover a fraternidade, o amor ao próximo e o patriotismo."],
              ["V", "Trabalhar pela felicidade e emancipação pacífica da humanidade."],
              ["VI", "Viver em Fraternidade."],
            ].map(([n, t]) => (
              <div
                key={n}
                className="card-mystic rounded-xl p-8 flex gap-6 items-start hover:border-gold/60 transition-colors"
              >
                <div className="font-display text-3xl text-gradient-gold italic shrink-0 w-10">
                  {n}
                </div>
                <p className="text-foreground/90 font-light leading-relaxed">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPIOS */}
      <section id="principios" className="relative py-32 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="divider-gold justify-center mb-6">
              <span className="divider-gold-line" />
              O que seguimos
              <span className="divider-gold-line" />
            </p>
            <h2 className="text-4xl md:text-5xl">
              Postulados <span className="text-gradient-gold italic">Universais</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRINCIPIOS.map((p, i) => (
              <div
                key={p.t}
                className="group relative card-mystic rounded-xl p-7 hover:-translate-y-1 transition-all duration-500 hover:border-gold/60"
              >
                <div className="font-display text-gold/40 text-4xl mb-3 group-hover:text-gold transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl mb-2 text-foreground">{p.t}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GRAUS */}
      <section id="graus" className="relative py-32 px-6 bg-surface/40 border-y border-border-gold/20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <p className="divider-gold justify-center mb-6">
              <span className="divider-gold-line" />
              Nossos Graus
              <span className="divider-gold-line" />
            </p>
            <h2 className="text-4xl md:text-5xl mb-6">
              A jornada em <span className="text-gradient-gold italic">três fases</span>
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground font-light leading-relaxed">
              Trabalhamos os Graus Simbólicos da Francomaçonaria. Cada um traz seu conjunto de
              símbolos, ensinamentos e responsabilidades — moldando o iniciado moral e socialmente.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {GRAUS.map((g) => (
              <div
                key={g.label}
                className="relative card-mystic rounded-2xl p-10 text-center hover:border-gold transition-all duration-500 hover:-translate-y-2"
              >
                <div className="mb-6 flex justify-center">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <div
                      className="absolute inset-0 rounded-full blur-xl opacity-60"
                      style={{ background: "var(--gradient-radial-gold)" }}
                    />
                    <div className="relative text-gold w-16 h-16">
                      <MasonicDegreeIcon degree={g.degree as 1 | 2 | 3} />
                    </div>
                  </div>
                </div>
                <div className="font-display text-xs tracking-[0.4em] text-gold mb-2">
                  GRAU {g.label}
                </div>
                <h3 className="text-2xl mb-4">{g.nome}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {g.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-24 text-center text-xl md:text-2xl text-foreground/80 italic font-light max-w-4xl mx-auto">
            Aceitamos e equiparamos todos os Graus Simbólicos de quaisquer Rito Maçônico ou
            Francomaçônico.
          </p>
        </div>
      </section>

      {/* CITAÇÃO VOLTAIRE */}
      <section className="relative py-32 px-6">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center">
          <div className="w-28 h-28 mb-6 rounded-full overflow-hidden border-2 border-border-gold/30 shadow-2xl relative">
            <img src={voltaireImg} alt="Voltaire" className="w-full h-full object-cover" />
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] pointer-events-none" />
          </div>
          <div className="font-display text-6xl text-gold/40 mb-4 leading-none">"</div>
          <blockquote className="font-display text-2xl md:text-3xl italic leading-relaxed text-foreground/90 mb-10">
            Faço-me franco maçom porque encontrei nesta Ordem sagrada os ideais da dignidade humana.
            Aqui aprendi a amar e respeitar a criatura humana, e também a amar a Deus. Não
            aquele que os homens fizeram, mas Aquele que fez os Homens.
          </blockquote>
          <div className="divider-gold justify-center">
            <span className="divider-gold-line" />
            Voltaire · 1694—1778
            <span className="divider-gold-line" />
          </div>
        </div>
      </section>

      {/* PARCEIROS */}
      <ParceirosCarousel />

      {/* LINHAGENS */}
      <section id="linhagens" className="relative py-32 px-6 border-t border-border-gold/20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <p className="divider-gold justify-center mb-6">
              <span className="divider-gold-line" />
              Nossas Linhagens
              <span className="divider-gold-line" />
            </p>
            <h2 className="text-4xl md:text-5xl">
              Uma corrente <span className="text-gradient-gold italic">ininterrupta</span>
            </h2>
          </div>

          <Tabs defaultValue="linhagem1" className="w-full">
            <div className="flex justify-center mb-10">
              <TabsList className="bg-surface/50 border border-border-gold/20 p-1">
                <TabsTrigger value="linhagem1" className="text-xs uppercase tracking-wider data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
                  Filiação 1
                </TabsTrigger>
                <TabsTrigger value="linhagem2" className="text-xs uppercase tracking-wider data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
                  Filiação 2
                </TabsTrigger>
                <TabsTrigger value="linhagem3" className="text-xs uppercase tracking-wider data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
                  Filiação 3
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="linhagem1" className="mt-0">
              <div className="max-w-2xl mx-auto">
                <div className="relative pl-6">
                  <div className="absolute left-[11px] top-4 bottom-4 w-px bg-gradient-to-b from-gold/10 via-gold/40 to-gold/10" />
                  <div className="space-y-4">
                    {LINHAGEM_1.map((n, i) => (
                      <div key={i} className="relative group">
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-gold bg-background group-hover:bg-gold transition-colors z-10" />
                        <div className="card-mystic rounded-lg px-6 py-4 hover:border-gold/60 transition-all duration-300 group-hover:translate-x-1">
                          <div className="text-[9px] text-gold/60 tracking-[0.2em] uppercase mb-1">
                            Sucessão {String(i + 1).padStart(2, "0")}
                          </div>
                          <div className="font-display text-base text-foreground/90">{n}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="linhagem2" className="mt-0">
              <div className="max-w-2xl mx-auto">
                <div className="relative pl-6">
                  <div className="absolute left-[11px] top-4 bottom-4 w-px bg-gradient-to-b from-gold/10 via-gold/40 to-gold/10" />
                  <div className="space-y-4">
                    {LINHAGEM_2.map((n, i) => (
                      <div key={i} className="relative group">
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-gold bg-background group-hover:bg-gold transition-colors z-10" />
                        <div className="card-mystic rounded-lg px-6 py-4 hover:border-gold/60 transition-all duration-300 group-hover:translate-x-1">
                          <div className="text-[9px] text-gold/60 tracking-[0.2em] uppercase mb-1">
                            Sucessão {String(i + 1).padStart(2, "0")}
                          </div>
                          <div className="font-display text-base text-foreground/90">{n}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="linhagem3" className="mt-0">
              <div className="max-w-2xl mx-auto">
                <div className="text-center text-muted-foreground p-12 border border-dashed border-border-gold/20 rounded-xl bg-surface/30">
                  <p className="mb-2 font-medium">Terceira linhagem em breve.</p>
                  <p className="text-xs uppercase tracking-wider">As sucessões serão atualizadas futuramente.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA INICIAÇÃO */}
      <section className="relative py-32 px-6 border-t border-border-gold/20">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{ background: "var(--gradient-radial-gold)" }}
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="divider-gold justify-center mb-6">
            <span className="divider-gold-line" />
            Processo de Triagem
            <span className="divider-gold-line" />
          </p>
          <h2 className="text-4xl md:text-5xl mb-6">
            Pronto para iniciar sua <span className="text-gradient-gold italic">jornada</span>?
          </h2>
          <p className="text-muted-foreground font-light leading-relaxed mb-12 max-w-2xl mx-auto">
            Descubra se você tem o perfil para a vida maçônica. Preencha nossa triagem rápida para sabermos mais sobre as suas expectativas e motivações.
          </p>
          <Link
            to="/triagem"
            className="inline-flex btn-gold btn-gold-hover rounded-full px-10 py-4 text-sm font-medium uppercase tracking-[0.25em]"
          >
            Quero ser um Franco Maçom
          </Link>
        </div>
      </section>

      {/* MAÇOM REGULAR */}
      <MasonsJoin />

      {/* FAQ */}
      <FAQ />

      {/* FOOTER */}
      <footer className="bg-surface border-t border-border-gold/20">
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
                <li><a href="/#quem-somos" className="hover:text-gold transition-colors">Quem Somos</a></li>
                <li><a href="/#missao" className="hover:text-gold transition-colors">Nossa Missão</a></li>
                <li><a href="/#graus" className="hover:text-gold transition-colors">Graus Maçônicos</a></li>
                <li><a href="/#linhagens" className="hover:text-gold transition-colors">Nossas Linhagens</a></li>
                <li><a href="/#faq" className="hover:text-gold transition-colors">Perguntas Frequentes</a></li>
              </ul>
            </div>

            {/* Coluna 3: Portais */}
            <div>
              <h2 className="text-gold font-display text-base font-semibold mb-4">Portais</h2>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><Link to="/biblioteca" className="hover:text-gold transition-colors">Biblioteca de Alexandria</Link></li>
                <li><Link to="/membros" className="hover:text-gold transition-colors">Portal de Membros</Link></li>
                <li><Link to="/membros/carteirinha/validar" search={{ id: undefined }} className="hover:text-gold transition-colors">Validação de Carteirinha</Link></li>
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

      {/* EXIT INTENT MODAL */}
      <ExitIntentModal />
    </div>
  );
}
