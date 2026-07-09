import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { saveMember } from "@/lib/members-db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, UserPlus } from "lucide-react";
import { toast } from "sonner";
import logoUrl from "@/assets/logo-glebra.webp";

export const Route = createFileRoute("/membros/carteirinha/nova")({
  head: () => ({
    meta: [
      { title: "Novo Cadastro de Membro — GLEBRA" },
    ],
  }),
  component: NovoCadastro,
});

function NovoCadastro() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "Aprendiz Maçom",
    cim: "",
    initiationDate: "",
    email: "",
    office: "",
    photo: "",
  });

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Preencha Nome e E-mail obrigatoriamente.");
      return;
    }
    setLoading(true);
    try {
      const newMember = saveMember(form);
      toast.success("Membro cadastrado com sucesso!");
      navigate({ to: "/membros/carteirinha/$id", params: { id: newMember.id } });
    } catch {
      toast.error("Erro ao salvar o membro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border-gold/20 bg-background/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoUrl} alt="GLEBRA" className="h-9 w-9" />
            <div className="font-display text-gradient-gold text-sm">GLEBRA</div>
          </Link>
        </div>
      </header>

      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="mx-auto max-w-2xl">
          <Link to="/membros" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-gold transition-colors mb-10">
            <ArrowLeft className="w-4 h-4" /> Portal de Membros
          </Link>

          <div className="text-center mb-12">
            <p className="divider-gold justify-center mb-6">
              <span className="divider-gold-line" />
              Cadastro
              <span className="divider-gold-line" />
            </p>
            <h1 className="font-display text-4xl text-gradient-gold mb-2">Novo Membro</h1>
            <p className="text-muted-foreground text-sm">Cadastre um novo irmão na GLEBRA</p>
          </div>

          <div className="card-mystic rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="name" className="text-xs uppercase tracking-wider text-muted-foreground">Nome completo *</Label>
                  <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} required placeholder="Nome do membro" className="h-12 bg-surface border-border-gold/20 focus-visible:ring-gold" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-xs uppercase tracking-wider text-muted-foreground">Grau / Título</Label>
                  <Input id="role" value={form.role} onChange={(e) => update("role", e.target.value)} placeholder="Ex: Mestre Maçom" className="h-12 bg-surface border-border-gold/20 focus-visible:ring-gold" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="office" className="text-xs uppercase tracking-wider text-muted-foreground">Cargo na Loja</Label>
                  <Input id="office" value={form.office} onChange={(e) => update("office", e.target.value)} placeholder="Ex: Secretário" className="h-12 bg-surface border-border-gold/20 focus-visible:ring-gold" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cim" className="text-xs uppercase tracking-wider text-muted-foreground">CIM (Cadastro Interestadual Maçônico)</Label>
                  <Input id="cim" value={form.cim} onChange={(e) => update("cim", e.target.value)} placeholder="Número CIM" className="h-12 bg-surface border-border-gold/20 focus-visible:ring-gold" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="initiationDate" className="text-xs uppercase tracking-wider text-muted-foreground">Data de Iniciação</Label>
                  <Input id="initiationDate" value={form.initiationDate} onChange={(e) => update("initiationDate", e.target.value)} placeholder="Ex: 09 de Agosto de 2020" className="h-12 bg-surface border-border-gold/20 focus-visible:ring-gold" />
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">E-mail *</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required placeholder="email@glebra.com.br" className="h-12 bg-surface border-border-gold/20 focus-visible:ring-gold" />
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="photo" className="text-xs uppercase tracking-wider text-muted-foreground">URL da Foto (opcional)</Label>
                  <Input id="photo" value={form.photo} onChange={(e) => update("photo", e.target.value)} placeholder="https://..." className="h-12 bg-surface border-border-gold/20 focus-visible:ring-gold" />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" disabled={loading} className="btn-gold btn-gold-hover h-11 px-8 font-medium gap-2">
                  <UserPlus className="w-4 h-4" />
                  {loading ? "Salvando..." : "Cadastrar Membro"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="border-t border-border-gold/20 py-6 px-6 text-center">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} GLEBRA</p>
      </footer>
    </div>
  );
}
