import { useState } from "react";
import { toast } from "sonner";
import { Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function MasonsJoin() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    loja: "",
    grau: "",
    mensagem: "",
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.email || !form.loja) {
      toast.error("Preencha nome, e-mail e loja de origem.");
      return;
    }
    setLoading(true);

    const msg = `Olá! Gostaria de me filiar à Grande Loja Egípcia Brasileira (GLEBRA).

Seguem meus dados:
*Nome:* ${form.nome}
*E-mail:* ${form.email}
*Telefone:* ${form.telefone || "Não informado"}
*Grau:* ${form.grau || "Não informado"}
*Loja de Origem/Potência:* ${form.loja}
*Mensagem:* ${form.mensagem || "Não informada"}`;

    const url = `https://wa.me/5513988766605?text=${encodeURIComponent(msg)}`;

    setTimeout(() => {
      setLoading(false);
      window.open(url, "_blank");
      toast.success("Redirecionando para o WhatsApp da Secretaria...");
      setForm({ nome: "", email: "", telefone: "", loja: "", grau: "", mensagem: "" });
    }, 500);
  };

  return (
    <section id="macons" className="relative py-32 px-6 border-t border-border-gold/20">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ background: "var(--gradient-radial-gold)" }}
      />
      <div className="mx-auto max-w-5xl relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-border-gold shadow-gold mb-6 bg-surface/50">
            <Handshake className="w-8 h-8 text-gold" />
          </div>
          <p className="divider-gold justify-center mb-6">
            <span className="divider-gold-line" />
            Aos Irmãos
            <span className="divider-gold-line" />
          </p>
          <h2 className="text-4xl md:text-5xl mb-4">
            Franco Maçom regular? <span className="text-gradient-gold italic">Junte-se a nós</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Se você já é Franco Maçom regular e deseja fazer parte da Grande Loja Egípcia Brasileira (GLEBRA),
            preencha o formulário abaixo. Nosso secretário entrará em contato para os trâmites
            fraternais de filiação ou regularização.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="card-mystic border border-border-gold/30 rounded-2xl p-8 md:p-10 shadow-elegant grid sm:grid-cols-2 gap-5"
        >
          <div className="space-y-2">
            <Label htmlFor="m-nome" className="text-[11px] uppercase tracking-[0.25em] text-gold/80">Nome completo *</Label>
            <Input
              id="m-nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              placeholder="Seu nome civil"
              className="h-11 bg-surface/60 border-border focus:border-gold/70"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="m-email" className="text-[11px] uppercase tracking-[0.25em] text-gold/80">E-mail *</Label>
            <Input
              id="m-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="voce@email.com"
              className="h-11 bg-surface/60 border-border focus:border-gold/70"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="m-tel" className="text-[11px] uppercase tracking-[0.25em] text-gold/80">Telefone</Label>
            <Input
              id="m-tel"
              value={form.telefone}
              onChange={(e) => setForm({ ...form, telefone: e.target.value })}
              placeholder="(13) 99999-9999"
              className="h-11 bg-surface/60 border-border focus:border-gold/70"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="m-grau" className="text-[11px] uppercase tracking-[0.25em] text-gold/80">Grau atual</Label>
            <Input
              id="m-grau"
              value={form.grau}
              onChange={(e) => setForm({ ...form, grau: e.target.value })}
              placeholder="Aprendiz, Companheiro, Mestre…"
              className="h-11 bg-surface/60 border-border focus:border-gold/70"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="m-loja" className="text-[11px] uppercase tracking-[0.25em] text-gold/80">Loja de origem e Potência *</Label>
            <Input
              id="m-loja"
              value={form.loja}
              onChange={(e) => setForm({ ...form, loja: e.target.value })}
              placeholder="Ex.: A.R.L.S. Acácia nº 123"
              className="h-11 bg-surface/60 border-border focus:border-gold/70"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="m-msg" className="text-[11px] uppercase tracking-[0.25em] text-gold/80">Mensagem fraternal</Label>
            <Textarea
              id="m-msg"
              rows={4}
              value={form.mensagem}
              onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
              placeholder="Conte-nos sobre sua jornada e seu interesse em nossa Loja."
              className="bg-surface/60 border-border focus:border-gold/70"
            />
          </div>
          <div className="sm:col-span-2 flex justify-center pt-2">
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="btn-gold btn-gold-hover h-12 px-10 rounded-full font-medium uppercase tracking-[0.2em] text-xs mt-4"
            >
              {loading ? "Enviando…" : "Enviar solicitação fraternal"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
