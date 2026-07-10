import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Member, getMembers } from "@/lib/members-db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, CreditCard, ShieldCheck, Mail, Calendar, Hash } from "lucide-react";
import logoUrl from "@/assets/logo-glebra.webp";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/membros/")({
  head: () => ({
    meta: [
      { title: "Portal de Membros — GLEBRA" },
      { name: "description", content: "Portal oficial dos membros da GLEBRA – Grande Loja Egípcia Brasileira de Maçonaria de Memphis e Misraim." },
    ],
  }),
  component: MembersPortal,
});

function MembersPortal() {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setMembers(getMembers());
  }, []);

  const filteredMembers = members.filter((m) => {
    const term = searchTerm.toLowerCase();
    return (
      m.name.toLowerCase().includes(term) ||
      m.cim.includes(term) ||
      m.role.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />

      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <p className="text-gold/70 font-bold uppercase tracking-[0.3em] text-xs mb-2">Portal da Loja</p>
              <h1 className="font-display text-4xl md:text-5xl font-light text-gradient-gold">
                Portal de Membros
              </h1>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" className="border-border-gold/30 hover:bg-gold/5 h-11 px-6">
                <Link to="/membros/carteirinha/validar" search={{ id: undefined }} className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                  Validar Carteirinha
                </Link>
              </Button>
              <Button asChild className="btn-gold btn-gold-hover h-11 px-6 font-medium">
                <Link to="/membros/carteirinha/nova" className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Novo Cadastro
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative max-w-md mb-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar por nome, CIM ou grau..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 h-12 bg-surface border-border-gold/20 hover:border-gold/30 focus-visible:ring-gold"
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="card-mystic rounded-2xl p-6 hover:border-gold/40 transition-all hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-5 pb-5 border-b border-border-gold/20">
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-gold/40 bg-black/20 flex items-center justify-center flex-shrink-0">
                        {member.photo ? (
                          <img src={member.photo} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <span className="font-display text-gold text-2xl">{member.name.charAt(0)}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-display text-lg text-foreground font-semibold truncate">{member.name}</h3>
                          {member.isHonorary && (
                            <Badge variant="secondary" className="text-[8px] uppercase tracking-wider bg-gold/15 text-[#C5A059] border-gold/30 shrink-0 h-4 px-1.5">
                              Honorário
                            </Badge>
                          )}
                        </div>
                        <p className="text-gold uppercase tracking-wider text-[10px] font-medium truncate mt-0.5">{member.role}</p>
                        {member.office && (
                          <span className="inline-block px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-gold/15 text-[#C5A059] border border-gold/30 rounded mt-1">
                            {member.office}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3 text-xs text-muted-foreground mb-6">
                      <div className="flex items-center gap-3">
                        <Hash className="w-3.5 h-3.5 text-gold/80 flex-shrink-0" />
                        <span>CIM: <strong className="text-foreground">{member.cim}</strong></span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-3.5 h-3.5 text-gold/80 flex-shrink-0" />
                        <span>Iniciado em: <strong className="text-foreground">{member.initiationDate}</strong></span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-3.5 h-3.5 text-gold/80 flex-shrink-0" />
                        <span className="truncate">{member.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button asChild variant="outline" className="flex-grow border-gold/30 hover:bg-gold/5 h-10 text-xs font-semibold">
                      <Link to="/membros/carteirinha/$id" params={{ id: member.id }}>
                        <CreditCard className="w-3.5 h-3.5 mr-2 text-gold" />
                        Ver Carteirinha
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-gold" title="Validar Cadastro">
                      <Link to="/membros/carteirinha/validar" search={{ id: member.id }}>
                        <ShieldCheck className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center">
                <p className="text-muted-foreground text-sm">Nenhum membro encontrado.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-border-gold/20 py-6 px-6 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} GLEBRA — Grande Loja Egípcia Brasileira de Maçonaria de Memphis e Misraim
        </p>
      </footer>
    </div>
  );
}
