import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import logoAsset from "@/assets/logo-glebra.webp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/triagem")({
  head: () => ({
    meta: [
      { title: "Triagem Maçônica — Grande Loja Egípcia Brasileira (GLEBRA)" },
      { name: "description", content: "Descubra se você tem o perfil para iniciar a jornada maçônica. Responda nossa triagem em poucos minutos." },
    ],
  }),
  component: TriagemPage,
});

type Choice = { value: string; label: string; weight: number };
type Question =
  | { id: string; type: "choice"; title: string; subtitle?: string; options: Choice[] }
  | { id: string; type: "text"; title: string; subtitle?: string; placeholder?: string; long?: boolean };

const questions: Question[] = [
  {
    id: "age",
    type: "choice",
    title: "Qual sua faixa etária?",
    subtitle: "A Maçonaria exige maioridade civil para ingresso.",
    options: [
      { value: "u18", label: "Menos de 18 anos", weight: 0 },
      { value: "18-25", label: "18 a 25 anos", weight: 2 },
      { value: "26-40", label: "26 a 40 anos", weight: 3 },
      { value: "41-60", label: "41 a 60 anos", weight: 3 },
      { value: "60+", label: "Mais de 60 anos", weight: 2 },
    ],
  },
  {
    id: "belief",
    type: "choice",
    title: "Você crê em um Princípio Criador (Ser Supremo)?",
    subtitle: "A crença em um Grande Arquiteto do Universo é requisito fundamental, independente da religião.",
    options: [
      { value: "yes", label: "Sim, plenamente", weight: 3 },
      { value: "search", label: "Estou em busca espiritual", weight: 2 },
      { value: "no", label: "Não, sou ateu", weight: 0 },
    ],
  },
  {
    id: "conduct",
    type: "choice",
    title: "Como você descreveria sua conduta moral e social?",
    subtitle: "Buscamos pessoas de bons costumes, livres e de reputação ilibada.",
    options: [
      { value: "exemplary", label: "Procuro agir com retidão e honra sempre", weight: 3 },
      { value: "good", label: "Tenho boa conduta, com falhas naturais", weight: 2 },
      { value: "improving", label: "Estou em processo de melhoria pessoal", weight: 1 },
    ],
  },
  {
    id: "motivation",
    type: "choice",
    title: "O que mais o atrai na Maçonaria?",
    options: [
      { value: "growth", label: "Aprimoramento moral e filosófico", weight: 3 },
      { value: "fraternity", label: "A fraternidade e o convívio", weight: 3 },
      { value: "charity", label: "Atuação filantrópica e social", weight: 3 },
      { value: "tradition", label: "Tradição, simbolismo e rituais", weight: 3 },
      { value: "network", label: "Networking e benefícios pessoais", weight: 0 },
    ],
  },
  {
    id: "time",
    type: "choice",
    title: "Você tem disponibilidade para reuniões regulares à noite?",
    subtitle: "A vida maçônica requer dedicação contínua aos trabalhos da Loja.",
    options: [
      { value: "yes", label: "Sim, posso me dedicar regularmente", weight: 3 },
      { value: "maybe", label: "Provavelmente, com organização", weight: 2 },
      { value: "no", label: "Tenho dificuldade significativa", weight: 0 },
    ],
  },
  {
    id: "study",
    type: "choice",
    title: "Como se sente sobre estudar filosofia, hermetismo, simbologia e ética?",
    options: [
      { value: "love", label: "Tenho grande interesse e prazer", weight: 3 },
      { value: "open", label: "Estou aberto a aprender", weight: 2 },
      { value: "low", label: "Pouco interesse em estudos teóricos", weight: 0 },
    ],
  },
  {
    id: "secrecy",
    type: "choice",
    title: "Você compreende e respeita o caráter discreto dos trabalhos maçônicos?",
    options: [
      { value: "yes", label: "Sim, valorizo a discrição", weight: 3 },
      { value: "ok", label: "Sim, mas tenho algumas dúvidas", weight: 2 },
      { value: "no", label: "Prefiro total transparência pública", weight: 0 },
    ],
  },
  {
    id: "contribution",
    type: "choice",
    title: "Você está ciente de que há contribuições financeiras mensais?",
    subtitle: "Mensalidades sustentam a Loja e suas atividades.",
    options: [
      { value: "yes", label: "Sim, posso assumir esse compromisso", weight: 3 },
      { value: "depends", label: "Depende dos valores envolvidos", weight: 2 },
      { value: "no", label: "Não posso assumir contribuições", weight: 0 },
    ],
  },
  {
    id: "name",
    type: "text",
    title: "Qual seu nome completo?",
    placeholder: "Nome e sobrenome",
  },
  {
    id: "email",
    type: "text",
    title: "Qual o melhor e-mail para contato?",
    placeholder: "voce@email.com",
  },
  {
    id: "about",
    type: "text",
    title: "Conte-nos brevemente sobre você",
    subtitle: "Profissão, motivações e o que o levou a buscar a Maçonaria.",
    placeholder: "Escreva algumas linhas sobre você...",
    long: true,
  },
  {
    id: "expectations",
    type: "text",
    title: "O que você acredita que acontecerá com sua vida ao ser aceito na Ordem?",
    subtitle: "Importante: Informamos também que você terá que escrever e nos enviar uma carta de próprio punho onde fale com riqueza de detalhes sobre si mesmo.",
    placeholder: "Descreva suas expectativas...",
    long: true,
  },
];

function calcResult(answers: Record<string, string>) {
  let score = 0;
  let max = 0;
  let blocker = false;
  for (const q of questions) {
    if (q.type !== "choice") continue;
    const maxW = Math.max(...q.options.map((o) => o.weight));
    max += maxW;
    const sel = q.options.find((o) => o.value === answers[q.id]);
    if (sel) score += sel.weight;
    if ((q.id === "age" && answers.age === "u18") || (q.id === "belief" && answers.belief === "no")) {
      blocker = true;
    }
  }
  const pct = Math.round((score / max) * 100);
  return { score, max, pct, blocker };
}

function TriagemPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const total = questions.length;
  const q = questions[step];
  const progress = ((step + (submitted ? 1 : 0)) / total) * 100;
  const current = answers[q?.id];
  const canNext = useMemo(() => {
    if (!q) return false;
    if (q.type === "text") return (current ?? "").trim().length >= 2;
    return !!current;
  }, [q, current]);

  const getAnswerLabel = (qId: string, val: string) => {
    const question = questions.find(qi => qi.id === qId);
    if (!question) return val;
    if (question.type === "choice") {
      const opt = question.options.find(o => o.value === val);
      return opt ? opt.label : val;
    }
    return val;
  };

  const whatsAppUrl = useMemo(() => {
    if (!submitted) return "";
    const r = calcResult(answers);
    const msg = `Olá! Concluí a Triagem Maçônica para a Grande Loja Egípcia Brasileira (GLEBRA).

Seguem meus dados e respostas da triagem:
*Nome:* ${answers.name || ""}
*E-mail:* ${answers.email || ""}
*Sobre mim:* ${answers.about || ""}
*Expectativas:* ${answers.expectations || ""}

*Respostas da Triagem:*
- Faixa etária: ${getAnswerLabel("age", answers.age)}
- Crença no Ser Supremo: ${getAnswerLabel("belief", answers.belief)}
- Conduta moral/social: ${getAnswerLabel("conduct", answers.conduct)}
- O que mais atrai: ${getAnswerLabel("motivation", answers.motivation)}
- Disponibilidade: ${getAnswerLabel("time", answers.time)}
- Sentimento sobre estudos: ${getAnswerLabel("study", answers.study)}
- Caráter discreto: ${getAnswerLabel("secrecy", answers.secrecy)}
- Contribuições financeiras: ${getAnswerLabel("contribution", answers.contribution)}

*Afinidade da Triagem:* ${r.pct}% (${r.blocker ? "Perfil em formação" : "Perfil Compatível"})`;

    return `https://wa.me/5513988766605?text=${encodeURIComponent(msg)}`;
  }, [answers, submitted]);

  const handleFinish = () => {
    setSubmitted(true);
    toast.success("Triagem finalizada com sucesso!");
  };

  if (submitted) {
    const r = calcResult(answers);
    const status = r.blocker
      ? { title: "Perfil em formação", color: "text-muted-foreground", msg: "Identificamos requisitos fundamentais ainda não atendidos. Reflita sobre os pontos apresentados e, no momento certo, retorne à nossa Loja." }
      : r.pct >= 75
      ? { title: "Perfil compatível", color: "text-gold", msg: "Suas respostas demonstram forte alinhamento com os valores maçônicos. Entre em contato conosco via WhatsApp para os próximos passos." }
      : r.pct >= 50
      ? { title: "Perfil promissor", color: "text-gold", msg: "Há boa compatibilidade com os princípios da Maçonaria. Vamos conversar para esclarecer suas dúvidas e avaliar juntos os próximos passos." }
      : { title: "Convite à reflexão", color: "text-muted-foreground", msg: "Recomendamos um período de reflexão e estudo antes de prosseguir. Sinta-se à vontade para nos contatar para uma conversa franca." };

    return (
      <Shell>
        <div className="text-center max-w-xl mx-auto">
          <div className="w-20 h-20 rounded-full border border-border-gold flex items-center justify-center mx-auto mb-6 bg-surface/50">
            <Check className="w-10 h-10 text-gold" />
          </div>
          <p className="text-gold/70 font-bold uppercase tracking-[0.3em] text-xs mb-3">Triagem concluída</p>
          <h1 className={`font-display text-4xl md:text-5xl mb-4 ${status.color}`}>{status.title}</h1>
          <div className="divider-gold justify-center mb-6">
            <span className="divider-gold-line" />
            <span className="divider-gold-line" />
          </div>
          <p className="text-muted-foreground leading-relaxed mb-8">{status.msg}</p>

          <div className="bg-surface/30 border border-border-gold/30 rounded-2xl p-6 mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Pontuação de afinidade</p>
            <div className="text-5xl font-display text-gold mb-3">{r.pct}<span className="text-2xl text-muted-foreground">%</span></div>
            <div className="h-2 bg-surface rounded-full overflow-hidden">
              <div className="h-full bg-gold transition-all" style={{ width: `${r.pct}%` }} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-surface text-foreground hover:bg-surface/80 border border-border h-11 px-8 rounded-full font-medium uppercase tracking-[0.1em] text-xs">
              <Link to="/">Voltar ao início</Link>
            </Button>
            <Button asChild className="btn-gold btn-gold-hover h-11 px-8 rounded-full font-medium uppercase tracking-[0.1em] text-xs">
              <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer">Falar via WhatsApp</a>
            </Button>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3 text-xs uppercase tracking-[0.25em]">
          <span className="text-gold">Passo {step + 1} de {total}</span>
          <span className="text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-surface rounded-full overflow-hidden">
          <div className="h-full bg-gold transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
        <div className="hidden sm:flex gap-1.5 mt-3">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1 rounded-full transition-colors ${
                i < step ? "bg-gold" : i === step ? "bg-gold/60" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question card */}
      <div key={q.id} className="animate-fade-up card-mystic border border-border-gold/30 rounded-2xl p-8 md:p-10">
        <h2 className="font-display text-2xl md:text-3xl mb-2 text-foreground">{q.title}</h2>
        {q.subtitle && <p className="text-muted-foreground text-sm mb-8 leading-relaxed">{q.subtitle}</p>}
        {!q.subtitle && <div className="mb-8" />}

        {q.type === "choice" ? (
          <div className="space-y-3">
            {q.options.map((opt) => {
              const selected = current === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt.value }))}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 ${
                    selected
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-border hover:border-gold/40 hover:bg-surface/50 text-foreground"
                  }`}
                >
                  <span
                    className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selected ? "border-gold bg-gold/20" : "border-muted-foreground/40"
                    }`}
                  >
                    {selected && <Check className="w-3 h-3 text-gold" strokeWidth={3} />}
                  </span>
                  <span className="text-sm md:text-base">{opt.label}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor={q.id} className="sr-only">{q.title}</Label>
            {q.long ? (
              <Textarea
                id={q.id}
                rows={5}
                placeholder={q.placeholder}
                value={current ?? ""}
                onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                className="text-base bg-surface/50 border-border focus:border-gold"
              />
            ) : (
              <Input
                id={q.id}
                placeholder={q.placeholder}
                value={current ?? ""}
                onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                className="h-12 text-base bg-surface/50 border-border focus:border-gold"
              />
            )}
          </div>
        )}
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between mt-8">
        <Button
          variant="ghost"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="text-muted-foreground hover:text-gold uppercase tracking-[0.1em] text-xs"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
        </Button>
        {step < total - 1 ? (
          <Button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canNext}
            className="btn-gold btn-gold-hover h-11 px-8 rounded-full font-medium uppercase tracking-[0.1em] text-xs"
          >
            Próximo <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleFinish}
            disabled={!canNext}
            className="btn-gold btn-gold-hover h-11 px-8 rounded-full font-medium uppercase tracking-[0.1em] text-xs"
          >
            Concluir triagem <Check className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border-gold/20">
        <div className="mx-auto max-w-3xl px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoAsset} alt="Logo" className="h-10 w-10" />
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-gold">GLEBRA</div>
              <div className="font-display text-sm">Grande Loja Egípcia Brasileira</div>
            </div>
          </Link>
          <Link to="/" className="text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-gold transition-colors">
            ← Sair
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        <div className="text-center mb-10">
          <p className="text-gold font-bold uppercase tracking-[0.3em] text-xs mb-3">Triagem Maçônica</p>
          <h1 className="sr-only">Triagem Maçônica</h1>
        </div>
        {children}
      </main>
    </div>
  );
}
