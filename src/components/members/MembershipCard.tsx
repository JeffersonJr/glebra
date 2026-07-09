import { useState, useEffect } from "react";
import { Member } from "@/lib/members-db";
import { Badge } from "@/components/ui/badge";
import logoUrl from "@/assets/logo-glebra.webp";
import logoSosebUrl from "@/assets/logo-soseb.png";

interface MembershipCardProps {
  member: Member;
  viewMode?: "digital" | "print" | "digital-pdf";
}

export function MembershipCard({ member, viewMode = "digital" }: MembershipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [qrUrl, setQrUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const validationUrl = `${window.location.origin}/membros/carteirinha/validar?id=${member.id}`;
      const encoded = encodeURIComponent(validationUrl);
      setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encoded}`);
    }
  }, [member.id]);

  if (viewMode === "print") {
    return (
      <div className="w-[340px] bg-gradient-to-br from-[#0A0D14] via-[#0F1520] to-[#0A0D14] border-2 border-[#C5A059] rounded-2xl p-5 shadow-[0_0_30px_rgba(197,160,89,0.3)] flex flex-col justify-between min-h-[200px]">
        <div className="flex items-center justify-between border-b border-[#C5A059]/40 pb-3">
          <div className="flex items-center gap-2.5">
            <img src={logoUrl} alt="GLEBRA" className="h-9 w-9 drop-shadow-[0_0_4px_rgba(197,160,89,0.5)]" />
            <div>
              <h2 className="font-display text-xs font-bold text-white leading-tight">GLEBRA</h2>
              <p className="text-[7px] uppercase tracking-[0.05em] text-[#C5A059]/90 font-bold">Maçonaria Egípcia de Memphis e Misraim</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-emerald-900/30 text-emerald-400 border border-emerald-700/30 tracking-wider uppercase">
              Membro Regular
            </span>
          </div>
        </div>

        <div className="flex gap-4 items-center py-3">
          <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#C5A059] flex-shrink-0 bg-black/20">
            {member.photo ? (
              <img src={member.photo} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <span className="flex items-center justify-center w-full h-full font-display text-[#C5A059] text-xl">{member.name.charAt(0)}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-sm font-bold text-white leading-snug">{member.name}</h2>
            <p className="text-[#C5A059] uppercase tracking-[0.2em] text-[9px] font-bold mt-0.5">{member.role}</p>
            {member.office && <p className="text-[#C5A059]/70 text-[9px] mt-0.5">{member.office}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-[#C5A059]/20 pt-2.5 text-[9px]">
          <div>
            <p className="text-[7px] uppercase tracking-widest text-[#C5A059]/60 mb-0.5">Iniciação</p>
            <p className="text-white font-bold">{member.initiationDate}</p>
          </div>
          <div>
            <p className="text-[7px] uppercase tracking-widest text-[#C5A059]/60 mb-0.5">CIM</p>
            <p className="text-white font-bold">{member.cim}</p>
          </div>
        </div>

        <div className="flex justify-between items-end border-t border-[#C5A059]/20 pt-2.5 text-[8px] text-[#C5A059]/50">
          <div>
            <p className="uppercase tracking-[0.15em] text-[#C5A059] font-bold">G.·. A.·. D.·. U.·.</p>
            <p className="mt-0.5 text-[7px] font-semibold text-white/60">Filiada ao SOSEB</p>
          </div>
          <img src={logoSosebUrl} alt="SOSEB" className="h-8 w-8 object-contain opacity-80" />
        </div>
      </div>
    );
  }

  if (viewMode === "digital-pdf") {
    return (
      <div className="w-[340px] min-h-[540px] bg-gradient-to-b from-[#0A0D14] to-[#0F1520] border-2 border-[#C5A059] rounded-2xl p-6 flex flex-col justify-between">
        <div className="flex items-center gap-3 border-b border-[#C5A059]/40 pb-4">
          <img src={logoUrl} alt="GLEBRA" className="h-12 w-12" />
          <div>
            <h2 className="font-display text-sm font-bold text-white">GLEBRA</h2>
            <p className="text-[8px] uppercase tracking-[0.05em] text-[#C5A059]/90">Maçonaria Egípcia de Memphis e Misraim</p>
          </div>
        </div>

        <div className="flex flex-col items-center my-auto py-4">
          <div className="w-28 h-28 rounded-xl overflow-hidden border border-[#C5A059] mb-4 bg-black/20">
            {member.photo ? (
              <img src={member.photo} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <span className="flex items-center justify-center w-full h-full font-display text-[#C5A059] text-3xl">{member.name.charAt(0)}</span>
            )}
          </div>
          <h2 className="font-display text-xl font-bold text-white text-center">{member.name}</h2>
          <p className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold mt-1">{member.role}</p>

          <div className="w-full grid grid-cols-2 gap-3 border-t border-b border-[#C5A059]/30 py-3.5 px-2.5 mt-4 rounded-xl">
            <div>
              <p className="text-[7px] uppercase tracking-[0.1em] text-[#C5A059]/60 mb-0.5">Iniciação</p>
              <p className="text-xs text-white font-bold">{member.initiationDate}</p>
            </div>
            <div>
              <p className="text-[7px] uppercase tracking-[0.1em] text-[#C5A059]/60 mb-0.5">CIM Número</p>
              <p className="text-xs text-white font-bold">{member.cim}</p>
            </div>
            {member.office && (
              <div className="col-span-2 border-t border-[#C5A059]/15 pt-2">
                <p className="text-[7px] uppercase tracking-[0.1em] text-[#C5A059]/60 mb-0.5">Cargo na Loja</p>
                <p className="text-xs text-[#C5A059] font-bold">{member.office}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-end border-t border-[#C5A059]/20 pt-3">
          <div>
            <p className="uppercase tracking-[0.15em] text-[#C5A059] font-bold text-[8px]">G.·. A.·. D.·. U.·.</p>
            <p className="mt-0.5 text-[7px] text-white/60">Filiada ao SOSEB</p>
          </div>
          <img src={logoSosebUrl} alt="SOSEB" className="h-8 w-8 object-contain opacity-80" />
        </div>
      </div>
    );
  }

  // "digital" mode — flip card
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-[340px] h-[540px] cursor-pointer"
        style={{ perspective: "1000px" }}
        onClick={() => setIsFlipped(!isFlipped)}
        title="Clique para girar a carteirinha"
      >
        <div
          className="relative w-full h-full transition-all duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 w-full h-full rounded-2xl p-5 bg-gradient-to-b from-[#0A0D14] via-[#0F1520] to-[#0A0D14] border-2 border-[#C5A059] shadow-[0_0_30px_rgba(197,160,89,0.2)] flex flex-col justify-between overflow-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="absolute inset-0 opacity-[0.04] flex items-center justify-center pointer-events-none">
              <img src={logoUrl} alt="" className="w-[110%] h-[110%] object-contain" />
            </div>

            <div className="relative z-10 flex items-center justify-between border-b border-[#C5A059]/40 pb-2.5">
              <div className="flex items-center gap-2.5">
                <img src={logoUrl} alt="GLEBRA" className="h-9 w-9 drop-shadow-[0_0_4px_rgba(197,160,89,0.5)]" />
                <div>
                  <h2 className="font-display text-xs font-bold text-white leading-tight">GLEBRA</h2>
                  <p className="text-[7px] uppercase tracking-[0.05em] text-[#C5A059]/90">Maçonaria Egípcia</p>
                </div>
              </div>
              <div>
                <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-emerald-900/30 text-emerald-400 border border-emerald-700/30 tracking-wider uppercase">
                  Membro Regular
                </span>
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-center my-auto">
              <div className="relative mb-4">
                <div className="absolute inset-0 rounded-xl border border-[#C5A059]/50 rotate-3 scale-105 pointer-events-none" />
                <div className="absolute inset-0 rounded-xl border border-[#C5A059]/50 -rotate-3 scale-105 pointer-events-none" />
                <div className="w-28 h-28 rounded-xl overflow-hidden border border-[#C5A059] relative z-10 bg-black/20 flex items-center justify-center">
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <span className="font-display text-[#C5A059] text-3xl">{member.name.charAt(0)}</span>
                  )}
                </div>
              </div>

              <h2 className="font-display text-xl text-center text-white leading-snug font-bold mb-1 flex items-center justify-center gap-2">
                {member.name}
                {member.isHonorary && (
                  <Badge variant="secondary" className="text-[8px] uppercase tracking-wider bg-[#C5A059]/10 text-[#C5A059] border-[#C5A059]/30">
                    Honorário
                  </Badge>
                )}
              </h2>
              <p className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold mb-4">{member.role}</p>

              <div className="w-full grid grid-cols-2 gap-3 border-t border-b border-[#C5A059]/30 py-3.5 px-2.5 bg-white/[0.02] rounded-xl text-left">
                <div>
                  <p className="text-[7px] uppercase tracking-[0.1em] text-[#C5A059]/60 mb-0.5">Iniciação</p>
                  <p className="text-xs text-white font-bold">{member.initiationDate}</p>
                </div>
                <div>
                  <p className="text-[7px] uppercase tracking-[0.1em] text-[#C5A059]/60 mb-0.5">CIM Número</p>
                  <p className="text-xs text-white font-bold">{member.cim}</p>
                </div>
                {member.office && (
                  <div className="col-span-2 border-t border-[#C5A059]/15 pt-2">
                    <p className="text-[7px] uppercase tracking-[0.1em] text-[#C5A059]/60 mb-0.5">Cargo na Loja</p>
                    <p className="text-xs text-[#C5A059] font-bold">{member.office}</p>
                  </div>
                )}
                <div className="col-span-2 border-t border-[#C5A059]/15 pt-2">
                  <p className="text-[7px] uppercase tracking-[0.1em] text-[#C5A059]/60 mb-0.5">E-mail</p>
                  <p className="text-xs text-white/80 font-medium truncate">{member.email}</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex justify-between items-end border-t border-[#C5A059]/40 pt-2.5">
              <div>
                <p className="uppercase tracking-[0.15em] text-[#C5A059] font-bold text-[8px]">G.·. A.·. D.·. U.·.</p>
                <p className="mt-0.5 text-[7px] font-semibold text-white/60">Filiada ao SOSEB</p>
              </div>
              <img src={logoSosebUrl} alt="SOSEB" className="h-8 w-8 object-contain opacity-80" />
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 w-full h-full rounded-2xl p-5 bg-gradient-to-b from-[#0A0D14] via-[#0F1520] to-[#0A0D14] border-2 border-[#C5A059] shadow-[0_0_30px_rgba(197,160,89,0.2)] flex flex-col justify-between overflow-hidden"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="absolute inset-0 opacity-[0.04] flex items-center justify-center pointer-events-none">
              <img src={logoUrl} alt="" className="w-[110%] h-[110%] object-contain" />
            </div>

            <div className="relative z-10 flex items-center gap-2.5 border-b border-[#C5A059]/40 pb-2.5">
              <img src={logoUrl} alt="GLEBRA" className="h-9 w-9 drop-shadow-[0_0_4px_rgba(197,160,89,0.5)]" />
              <div>
                <h2 className="font-display text-xs font-bold text-white leading-tight">GLEBRA</h2>
                <p className="text-[7px] uppercase tracking-[0.05em] text-[#C5A059]/90 font-bold">Validação Cadastral</p>
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-center my-auto">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-[#C5A059]/30 mb-3 max-w-[150px]">
                {qrUrl ? (
                  <img src={qrUrl} alt="QR Code" className="w-full h-auto" />
                ) : (
                  <div className="w-32 h-32 bg-gray-100 animate-pulse rounded-lg" />
                )}
              </div>
              <p className="text-[#C5A059] uppercase tracking-[0.15em] text-[8px] font-bold mb-0.5">VALIDAÇÃO ELETRÔNICA</p>
              <p className="text-white/50 text-[8px] text-center max-w-[230px] leading-normal">
                Use a câmera do celular para escanear o QR Code acima e consultar a autenticidade desta credencial.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-3 border-t border-[#C5A059]/30 pt-3 text-center">
              <div className="flex flex-col items-center">
                <span className="font-serif italic text-[#C5A059] text-[10px] font-semibold leading-none mb-1">Venerável Mestre</span>
                <span className="w-20 h-[0.5px] bg-[#C5A059]/30 mb-0.5" />
                <span className="text-[6px] uppercase tracking-[0.1em] text-white/40">Venerável Mestre</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-serif italic text-[#C5A059] text-[10px] font-semibold leading-none mb-1">Secretário</span>
                <span className="w-20 h-[0.5px] bg-[#C5A059]/30 mb-0.5" />
                <span className="text-[6px] uppercase tracking-[0.1em] text-white/40">Secretário</span>
              </div>
            </div>

            <div className="relative z-10 flex justify-between items-end border-t border-[#C5A059]/15 pt-1.5">
              <div>
                <p className="text-[7px] text-white/50">Memphis e Misraim</p>
                <p className="text-[6px] font-semibold text-[#C5A059]/60 mt-0.5">Filiada ao SOSEB</p>
              </div>
              <img src={logoSosebUrl} alt="SOSEB" className="h-6 w-6 object-contain opacity-70" />
            </div>
          </div>
        </div>
      </div>
      <p className="text-white/30 text-[10px] mt-4 italic text-center">Toque na carteirinha para girar e ver o verso</p>
    </div>
  );
}
