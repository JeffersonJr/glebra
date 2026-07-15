import { useState } from "react";

export function FAQ() {
  const items = [
    {
      q: "O que é a Maçonaria?",
      a: "A Maçonaria é uma instituição fraternal, filosófica e filantrópica que busca o aprimoramento moral, intelectual e espiritual de seus membros. Fundada em princípios de Liberdade, Igualdade e Fraternidade, promove valores éticos, a busca pela verdade e o compromisso com a justiça social.",
    },
    {
      q: "Como entrar para a Maçonaria?",
      a: "É necessário ser maior de idade, ter conduta ilibada e demonstrar interesse genuíno nos princípios maçônicos. O processo começa com uma indicação por um membro ativo da Loja, seguida por entrevistas e análise de antecedentes. Entre em contato conosco para mais informações.",
    },
    {
      q: "A Maçonaria é uma religião?",
      a: "Não. A Maçonaria não é uma religião, embora exija a crença em um Princípio Criador (G∴A∴D∴U∴). Aceita homens de qualquer credo e respeita todas as confissões religiosas.",
    },
    {
      q: "Quanto custa para ser franco maçom?",
      a: "Existem contribuições mensais (mensalidades) que mantêm a Loja, além de joias e paramentos próprios. Os valores são discutidos abertamente durante o processo de admissão.",
    },
    {
      q: "Qual o tempo de dedicação esperado?",
      a: "Espera-se dedicação aos estudos, ao desenvolvimento pessoal e à participação frequente em eventos e sessões da Loja para garantir a verdadeira assimilação dos ensinamentos herméticos.",
    },
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-16">
          <p className="divider-gold justify-center mb-6">
            <span className="divider-gold-line" />
            Perguntas Frequentes
            <span className="divider-gold-line" />
          </p>
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            Dúvidas <span className="text-gradient-gold italic">comuns</span>
          </h2>
        </div>
        <div className="space-y-4">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`card-mystic rounded-xl overflow-hidden transition-all ${
                  isOpen ? "border-gold/60 shadow-[0_0_15px_rgba(197,160,89,0.1)]" : "border-border-gold/20 hover:border-gold/40"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left p-6 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg pr-4">{it.q}</span>
                  <span className={`text-gold text-2xl font-light transition-transform ${isOpen ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-muted-foreground leading-relaxed text-sm">{it.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
