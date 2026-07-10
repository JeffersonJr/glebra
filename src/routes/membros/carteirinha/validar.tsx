import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getMemberById, getMembers, Member } from "@/lib/members-db";
import { MembershipCard } from "@/components/members/MembershipCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, ShieldAlert, Search, ArrowLeft } from "lucide-react";
import logoUrl from "@/assets/logo-glebra.webp";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/membros/carteirinha/validar")({
  validateSearch: (search: Record<string, unknown>) => ({
    id: typeof search.id === "string" ? search.id : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Validar Carteirinha — GLEBRA" },
      { name: "description", content: "Valide autenticamente a carteirinha de membro da GLEBRA." },
    ],
  }),
  component: ValidarCarteirinha,
});

function ValidarCarteirinha() {
  const { id: prefilledId } = useSearch({ from: "/membros/carteirinha/validar" });
  const [searchId, setSearchId] = useState(prefilledId ?? "");
  const [searched, setSearched] = useState(false);
  const [foundMember, setFoundMember] = useState<Member | null>(null);

  useEffect(() => {
    if (prefilledId) {
      const m = getMemberById(prefilledId) ??
        getMembers().find((x) => x.cim === prefilledId) ?? null;
      setFoundMember(m);
      setSearched(true);
    }
  }, [prefilledId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchId.trim();
    const m = getMemberById(trimmed) ??
      getMembers().find((x) => x.cim === trimmed) ?? null;
    setFoundMember(m);
    setSearched(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />

      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="mx-auto max-w-2xl">
          <Link to="/membros" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-gold transition-colors mb-10">
            <ArrowLeft className="w-4 h-4" /> Portal de Membros
          </Link>

          <div className="text-center mb-12">
            <p className="divider-gold justify-center mb-6">
              <span className="divider-gold-line" />
              Validação Oficial
              <span className="divider-gold-line" />
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-gradient-gold mb-3">
              Validar Carteirinha
            </h1>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Consulte a autenticidade e o status cadastral de um membro da GLEBRA.
            </p>
          </div>

          {searched ? (
            <div>
              {foundMember && foundMember.status === "regular" ? (
                <div className="text-center space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-900/20 text-emerald-400 border border-emerald-700/30 rounded-full text-sm font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    Credencial Válida e Autêntica
                  </div>
                  <div className="flex justify-center">
                    <MembershipCard member={foundMember} viewMode="digital" />
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button asChild className="btn-gold btn-gold-hover h-10 px-6 text-xs font-semibold">
                      <Link to="/membros/carteirinha/$id" params={{ id: foundMember.id }}>
                        Ver Carteirinha Completa
                      </Link>
                    </Button>
                    <Button variant="outline" className="border-border-gold/30 hover:bg-white/10 hover:border-border-gold/60 transition-all h-10 px-5 text-xs" onClick={() => { setSearched(false); setSearchId(""); }}>
                      Nova Consulta
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="card-mystic rounded-2xl p-8 text-center space-y-4">
                  <ShieldAlert className="w-14 h-14 text-destructive mx-auto" />
                  <h2 className="font-display text-2xl text-foreground font-bold">Registro não Encontrado</h2>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    A credencial <strong className="text-destructive">"{searchId}"</strong> não foi localizada nos cadastros ou está inativa.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <Button variant="outline" className="border-border-gold/30 hover:bg-white/10 hover:border-border-gold/60 transition-all h-10 px-5 text-xs" onClick={() => { setSearched(false); setSearchId(""); }}>
                      Digitar novo ID
                    </Button>
                    <Button asChild variant="outline" className="border-border-gold/30 hover:bg-white/10 hover:border-border-gold/60 transition-all h-10 px-5 text-xs">
                      <Link to="/membros">Ver Lista de Membros</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="card-mystic rounded-2xl p-8">
              <form onSubmit={handleSearch} className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  Insira o ID de validação ou o número CIM do membro para consultar a autenticidade da credencial.
                </p>

                <div className="space-y-2">
                  <Label htmlFor="searchId" className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-gold" /> Identificador / CIM do Membro
                  </Label>
                  <Input
                    type="text"
                    id="searchId"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Ex: jefferson-campos-beira-junior ou 32071"
                    required
                    className="h-12 bg-surface border-border-gold/20 hover:border-gold/30 focus-visible:ring-gold"
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="btn-gold btn-gold-hover h-11 px-8 font-medium">
                    Consultar Credencial
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-border-gold/20 py-6 px-6 text-center">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} GLEBRA</p>
      </footer>
    </div>
  );
}
