import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/logo-glebra.webp";
import heroCosmos from "@/assets/hero-cosmos.jpg";
import templeImg from "@/assets/temple.jpg";
import { MasonsJoin } from "@/components/masons-join";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const NAV = [
  { label: "Quem Somos", href: "#quem-somos" },
  { label: "Missão", href: "#missao" },
  { label: "Graus", href: "#graus" },
  { label: "Biblioteca", href: "/biblioteca" },
  { label: "Contato", href: "#contato" },
];

const PRINCIPIOS = [
  { t: "O Grande Arquiteto", d: "A crença em um Ser Supremo e Princípio Criador do Universo." },
  { t: "Sigilo e Discrição", d: "Nossos trabalhos são perpetuados de forma duradoura e perene." },
  { t: "Simbolismo Universal", d: "A tradição simbólica da Francomaçonaria em sua plenitude." },
  { t: "Três Graus Simbólicos", d: "Aprendiz, Companheiro e Mestre — com a lenda de Hiram Abif." },
  { t: "Homens e Mulheres", d: "Iniciação em igualdade absoluta, sem distinção de gênero." },
  { t: "Neutralidade Sagrada", d: "Nenhuma discussão política, religiosa ou racial nos Templos." },
  { t: "Três Grandes Luzes", d: "Livro Sagrado, Esquadro e Compasso, sempre à vista." },
  { t: "O Avental Ritual", d: "Símbolo do trabalho — indispensável em toda Sessão." },
  { t: "Landmarks de Albert Pike", d: "Os fundamentos imutáveis da Ordem." },
  { t: "Liberdade, Igualdade, Fraternidade", d: "O lema que atravessa os séculos." },
];

const GRAUS = [
  {
    icon: "△",
    label: "I",
    nome: "Aprendiz Francomaçom",
    desc: "O Aprendiz deve, acima de tudo, saber aprender. Aborda o simbolismo, o desenvolvimento das virtudes e a eliminação dos vícios. O mais importante dos graus simbólicos.",
  },
  {
    icon: "◇",
    label: "II",
    nome: "Companheiro Francomaçom",
    desc: "Propicia excepcional conhecimento dos símbolos, avanços ritualísticos e o refinamento do caráter.",
  },
  {
    icon: "⏛",
    label: "III",
    nome: "Mestre Francomaçom",
    desc: "O grau da plenitude maçônica. Conhecimentos elevados da história e artefatos da Ordem — habilita a exercer todos os cargos.",
  },
];

const LINHAGENS = [
  "Giuseppe Garibaldi", "John Yarker", "Theodore Reuss", "Gerard Encausse",
  "Jean Bricaud", "Constant Chevillon", "Charles-Henry Dupont", "Robert Ambelain",
  "Michael Bertiaux", "Tau Allen Greenfield", "Asuar Khepera", "Shem Kepher Sedjem",
];

function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
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
                Grande Loja Egípcia Brasileira
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-gold transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <Link
            to="/triagem"
            className="hidden sm:inline-flex btn-gold btn-gold-hover rounded-full px-5 py-2 text-xs font-medium uppercase tracking-[0.2em]"
          >
            Quero ser um Maçom
          </Link>
        </div>
      </header>

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
            Fundada na Tradição Hermética
            <span className="divider-gold-line" />
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[1.02] mb-8">
            <span className="block text-foreground/95">Grande Loja</span>
            <span className="block text-gradient-gold italic font-light">Egípcia Brasileira</span>
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
              Quero ser um Maçom
            </Link>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/60 text-xs uppercase tracking-[0.3em] animate-shimmer">
          ↓ Descer
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
                <p className="font-display text-xl text-gold italic">
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
            Cinco pilares, uma <span className="text-gradient-gold italic">jornada</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              ["I", "Investigar a verdade e praticar a justiça."],
              ["II", "Combater a ignorância e a intolerância em todas as formas."],
              ["III", "Obedecer às leis justas e humanitárias do País."],
              ["IV", "Promover a fraternidade, o amor ao próximo e o patriotismo."],
              ["V", "Trabalhar pela felicidade e emancipação pacífica da humanidade."],
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
              A jornada em <span className="text-gradient-gold italic">três estações</span>
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
                    <span className="relative font-display text-5xl text-gradient-gold">
                      {g.icon}
                    </span>
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

          <p className="mt-16 text-center text-sm text-muted-foreground italic font-light max-w-2xl mx-auto">
            Aceitamos e equiparamos todos os Graus Simbólicos de quaisquer Rito Maçônico ou
            Francomaçônico.
          </p>
        </div>
      </section>

      {/* CITAÇÃO VOLTAIRE */}
      <section className="relative py-32 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="font-display text-6xl text-gold/40 mb-4">"</div>
          <blockquote className="font-display text-2xl md:text-3xl italic leading-relaxed text-foreground/90 mb-10">
            Faço-me maçom porque encontrei nesta Ordem sagrada os ideais da dignidade humana.
            Aqui aprendi a amar e respeitar a criatura humana, e também a amar a Deus — não
            aquele que os homens fizeram, mas Aquele que fez os Homens.
          </blockquote>
          <div className="divider-gold justify-center">
            <span className="divider-gold-line" />
            Voltaire · 1694—1778
            <span className="divider-gold-line" />
          </div>
        </div>
      </section>

      {/* LINHAGENS */}
      <section id="linhagens" className="relative py-32 px-6 border-t border-border-gold/20">
        <div className="mx-auto max-w-6xl">
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

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
            <div className="grid gap-3">
              {LINHAGENS.map((n, i) => (
                <div
                  key={n}
                  className={`flex ${i % 2 === 0 ? "justify-start pr-1/2" : "justify-end pl-1/2"}`}
                >
                  <div className="relative w-full md:w-1/2 md:px-8">
                    <div className="card-mystic rounded-lg px-6 py-4 hover:border-gold/60 transition-colors">
                      <div className="text-xs text-gold tracking-[0.3em] uppercase mb-1">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="font-display text-lg">{n}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
            Quero ser um Maçom
          </Link>
        </div>
      </section>

      {/* MAÇOM REGULAR */}
      <MasonsJoin />

      {/* FOOTER */}
      <footer className="border-t border-border-gold/20 py-12 px-6">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logoAsset} alt="GLEBRA" width={40} height={40} className="h-10 w-10" />
            <div className="leading-tight">
              <div className="font-display text-gradient-gold">GLEBRA</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Memphis & Misraim
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground tracking-[0.2em] uppercase">
            Liberdade · Igualdade · Fraternidade
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Grande Loja Egípcia Brasileira
          </p>
        </div>
      </footer>
    </div>
  );
}
