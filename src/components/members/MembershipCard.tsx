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
      setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=0a0d14&bgcolor=ffffff&data=${encoded}`);
    }
  }, [member.id]);

  /* ───────────────────────────────────────────
     PRINT MODE — horizontal side-by-side cards
     (same layout as União Fraternal)
  ─────────────────────────────────────────── */
  if (viewMode === "print") {
    return (
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-full max-w-5xl select-none print:flex-row print:gap-4 print:justify-center">

        {/* FRONT CARD (Horizontal) */}
        <div className="relative w-[460px] h-[280px] rounded-2xl p-5 bg-gradient-to-b from-[#0A0D14] to-[#0F1520] border-2 border-[#C5A059] shadow-[0_0_30px_rgba(197,160,89,0.15)] flex flex-col justify-between overflow-hidden print:shadow-none">
          {/* Watermark */}
          <div className="absolute inset-0 opacity-[0.04] flex items-center justify-center pointer-events-none">
            <img src={logoUrl} alt="" className="w-[85%] h-[85%] object-contain" />
          </div>

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#C5A059]/40 pb-2">
            <div className="flex items-center gap-2.5">
              <img src={logoUrl} alt="GLEBRA" className="h-9 w-9 drop-shadow-[0_0_6px_rgba(197,160,89,0.5)]" />
              <div>
                <h3 className="text-[9px] uppercase tracking-[0.2em] text-[#C5A059] leading-none font-bold">G.L.E.B.R.A.</h3>
                <h2 className="font-display text-sm font-bold text-white leading-tight">Grande Loja Egípcia Brasileira</h2>
                <p className="text-[7px] uppercase tracking-[0.05em] text-white/50">Maçonaria Egípcia de Memphis & Misraim</p>
              </div>
            </div>
            <div className="text-right">
              <span className="px-2 py-0.5 rounded text-[7px] font-bold bg-blue-900/30 text-blue-400 border border-blue-700/30 tracking-wider uppercase block mb-1">
                BRASIL
              </span>
              <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30 tracking-wider uppercase">
                FREEMASON ID CARD
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="relative z-10 grid grid-cols-[100px_1fr] gap-4 items-center my-auto">
            {/* Photo + CIM */}
            <div className="flex flex-col items-center">
              <div className="w-[90px] h-[90px] rounded-xl overflow-hidden border border-[#C5A059] bg-black/20 flex items-center justify-center">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <span className="font-display text-[#C5A059] text-3xl">{member.name.charAt(0)}</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <span className="text-[7px] text-white/50 uppercase tracking-widest block">CIM</span>
                <span className="text-xs font-bold text-white">{member.cim}</span>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2">
              <div className="flex justify-between items-start gap-2">
                <div className="overflow-hidden">
                  <span className="text-[7px] text-white/50 uppercase tracking-wider block">NAME / NOMBRE / NOME</span>
                  <h3 className="font-display text-lg font-bold text-white leading-tight truncate">{member.name}</h3>
                </div>
                {member.isHonorary && (
                  <Badge variant="secondary" className="text-[8px] uppercase tracking-wider bg-[#C5A059]/10 text-[#C5A059] border-[#C5A059]/30 mt-1 shrink-0">
                    Honorário
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 border-t border-[#C5A059]/20 pt-2">
                <div>
                  <span className="text-[7px] text-white/50 uppercase tracking-wider block">GRADE / GRADO / GRAU</span>
                  <span className="text-xs font-semibold text-[#C5A059]">{member.role}</span>
                </div>
                <div>
                  <span className="text-[7px] text-white/50 uppercase tracking-wider block">VALIDITY / VALIDAD / VALIDADE</span>
                  <span className="text-xs font-medium text-white">DECEMBER, {new Date().getFullYear() + 2}</span>
                </div>
                {member.office && (
                  <div className="col-span-2 border-t border-[#C5A059]/15 pt-1">
                    <span className="text-[7px] text-white/50 uppercase tracking-wider block">OFFICE / CARGO</span>
                    <span className="text-xs font-bold text-[#C5A059]">{member.office}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 flex justify-between items-end border-t border-[#C5A059]/20 pt-2 text-[7px] text-white/40">
            <div>
              <p className="uppercase tracking-[0.15em] text-[#C5A059] font-bold leading-none mb-0.5">G.·. A.·. D.·. U.·.</p>
              <p className="text-[6px] font-semibold text-white/50 leading-none">Filiada ao SOSEB</p>
            </div>
            <div className="flex items-center gap-1.5">
              <img src={logoSosebUrl} alt="SOSEB" className="h-8 w-8 object-contain opacity-80" />
            </div>
          </div>
        </div>

        {/* BACK CARD (Horizontal) */}
        <div className="relative w-[460px] h-[280px] rounded-2xl p-5 bg-gradient-to-b from-[#0A0D14] to-[#0F1520] border-2 border-[#C5A059] shadow-[0_0_30px_rgba(197,160,89,0.15)] flex flex-col justify-between overflow-hidden print:shadow-none">
          {/* Watermark */}
          <div className="absolute inset-0 opacity-[0.04] flex items-center justify-center pointer-events-none">
            <img src={logoUrl} alt="" className="w-[85%] h-[85%] object-contain" />
          </div>

          {/* Header */}
          <div className="relative z-10 flex items-center gap-2 border-b border-[#C5A059]/40 pb-2">
            <img src={logoUrl} alt="GLEBRA" className="h-7 w-7 drop-shadow-[0_0_4px_rgba(197,160,89,0.5)]" />
            <div>
              <p className="text-[6px] uppercase tracking-[0.05em] text-[#C5A059] font-bold">VÁLIDO EM TODO TERRITÓRIO NACIONAL</p>
              <p className="text-[5px] uppercase tracking-[0.05em] text-white/50">LEI Nº 7.116 DE 29/08/1983.</p>
            </div>
          </div>

          {/* Body */}
          <div className="relative z-10 grid grid-cols-[80px_1fr] gap-4 items-center my-auto">
            {/* QR Code */}
            <div className="flex flex-col items-center">
              <div className="p-1.5 bg-white border border-[#C5A059]/40 rounded-xl shadow-sm w-[75px] h-[75px]">
                {qrUrl ? (
                  <img src={qrUrl} alt="QR Code" className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg" />
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-1.5 pt-1">
              <div>
                <p className="text-blue-400 font-bold text-[8px] leading-tight uppercase">Terms & Conditions</p>
                <p className="text-blue-400 font-bold text-[8px] leading-tight uppercase">Términos & Condiciones</p>
                <p className="text-blue-400 font-bold text-[8px] leading-tight uppercase">Termos & Condições</p>
              </div>

              <ul className="text-[5px] text-white/70 space-y-0.5 list-disc pl-3">
                <li>This card is non-transferable and will be valid when presented with an identification document.</li>
                <li>Esta tarjeta es intransferible y será válido cuando se presenta con un documento de identificación.</li>
                <li>Este cartão é intransferível e será válido quando apresentado com um documento de identificação.</li>
              </ul>
              
              <div className="grid grid-cols-2 gap-3 pt-1.5 text-center">
                <div className="flex flex-col items-center">
                  <span className="font-serif italic text-[#C5A059] text-[9px] font-semibold leading-none mb-1">Soberano</span>
                  <span className="w-20 h-[0.5px] bg-[#C5A059]/40 mb-0.5" />
                  <span className="text-[5px] uppercase text-white/40">Soberano</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-serif italic text-[#C5A059] text-[9px] font-semibold leading-none mb-1">Secretário</span>
                  <span className="w-20 h-[0.5px] bg-[#C5A059]/40 mb-0.5" />
                  <span className="text-[5px] uppercase text-white/40">Secretário</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-center border-t border-[#C5A059]/20 pt-2 mb-1">
            <span className="text-blue-400 font-bold text-[8px] tracking-[0.15em] uppercase">LIBERDADE • IGUALDADE • FRATERNIDADE</span>
          </div>

          {/* Footer */}
          <div className="relative z-10 flex justify-between items-end border-t border-[#C5A059]/20 pt-2 text-[7px] text-white/40">
            <div>
              <p className="uppercase tracking-[0.1em] text-[#C5A059] font-bold leading-none mb-0.5">G.·. A.·. D.·. U.·.</p>
              <p className="text-[6px] font-semibold text-white/50 leading-none">Filiada ao SOSEB</p>
            </div>
            <div className="flex items-center gap-1.5">
              <img src={logoSosebUrl} alt="SOSEB" className="h-6 w-6 object-contain opacity-70" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ───────────────────────────────────────────
     DIGITAL-PDF MODE — vertical single card
  ─────────────────────────────────────────── */
  if (viewMode === "digital-pdf") {
    return (
      <div className="flex flex-col items-center justify-center w-full print:w-full print:h-full">
        <div className="w-[340px] min-h-[540px] bg-gradient-to-b from-[#0A0D14] to-[#0F1520] border-2 border-[#C5A059] rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3 border-b border-[#C5A059]/40 pb-4 justify-between">
            <div className="flex items-center gap-3">
              <img src={logoUrl} alt="GLEBRA" className="h-12 w-12" />
              <div>
                <h2 className="font-display text-sm font-bold text-white">GLEBRA</h2>
                <p className="text-[8px] uppercase tracking-[0.05em] text-[#C5A059]/90">Maçonaria Egípcia</p>
              </div>
            </div>
            <div className="text-right">
              <span className="px-2 py-0.5 rounded text-[7px] font-bold bg-blue-900/30 text-blue-400 border border-blue-700/30 tracking-wider uppercase block mb-1">
                BRASIL
              </span>
              <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30 tracking-wider uppercase">
                FREEMASON ID CARD
              </span>
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
            <p className="text-[7px] uppercase tracking-[0.1em] text-[#C5A059]/60 mb-0.5">NAME / NOMBRE / NOME</p>
            <h2 className="font-display text-xl font-bold text-white text-center leading-none">{member.name}</h2>
            <p className="text-[7px] uppercase tracking-[0.1em] text-[#C5A059]/60 mt-3 mb-0.5">GRADE / GRADO / GRAU</p>
            <p className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold">{member.role}</p>

            <div className="w-full grid grid-cols-2 gap-3 border-t border-b border-[#C5A059]/30 py-3.5 px-2.5 mt-4 rounded-xl">
              <div>
                <p className="text-[7px] uppercase tracking-[0.1em] text-[#C5A059]/60 mb-0.5">VALIDITY / VALIDAD / VALIDADE</p>
                <p className="text-xs text-white font-bold">DECEMBER, {new Date().getFullYear() + 2}</p>
              </div>
              <div>
                <p className="text-[7px] uppercase tracking-[0.1em] text-[#C5A059]/60 mb-0.5">CIM / ID</p>
                <p className="text-xs text-white font-bold">{member.cim}</p>
              </div>
              {member.office && (
                <div className="col-span-2 border-t border-[#C5A059]/15 pt-2">
                  <p className="text-[7px] uppercase tracking-[0.1em] text-[#C5A059]/60 mb-0.5">OFFICE / CARGO</p>
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
      </div>
    );
  }

  /* ───────────────────────────────────────────
     DIGITAL MODE — vertical flip card
  ─────────────────────────────────────────── */
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
          style={{ transformStyle: "preserve-3d", transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 rounded-2xl p-5 bg-gradient-to-b from-[#0A0D14] via-[#0F1520] to-[#0A0D14] border-2 border-[#C5A059] shadow-[0_0_30px_rgba(197,160,89,0.2)] flex flex-col justify-between overflow-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="absolute inset-0 opacity-[0.04] flex items-center justify-center pointer-events-none">
              <img src={logoUrl} alt="" className="w-[110%] h-[110%] object-contain" />
            </div>

            <div className="relative z-10 flex items-center justify-between border-b border-[#C5A059]/40 pb-2.5">
              <div className="flex items-center gap-2.5">
                <img src={logoUrl} alt="GLEBRA" className="h-9 w-9 drop-shadow-[0_0_6px_rgba(197,160,89,0.5)]" />
                <div>
                  <h2 className="font-display text-xs font-bold text-white leading-tight">GLEBRA</h2>
                  <p className="text-[7px] uppercase tracking-[0.05em] text-[#C5A059]/90">Maçonaria Egípcia</p>
                </div>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 rounded text-[6px] font-bold bg-blue-900/30 text-blue-400 border border-blue-700/30 tracking-wider uppercase block mb-1">
                  BRASIL
                </span>
                <span className="px-2 py-0.5 rounded text-[7px] font-bold bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30 tracking-wider uppercase">
                  FREEMASON ID CARD
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

              <p className="text-[7px] uppercase tracking-[0.1em] text-[#C5A059]/60 mb-0.5">NAME / NOMBRE / NOME</p>
              <h2 className="font-display text-xl text-center text-white leading-snug font-bold mb-1 flex items-center justify-center gap-2">
                {member.name}
                {member.isHonorary && (
                  <Badge variant="secondary" className="text-[8px] uppercase tracking-wider bg-[#C5A059]/10 text-[#C5A059] border-[#C5A059]/30">
                    Honorário
                  </Badge>
                )}
              </h2>
              <p className="text-[7px] uppercase tracking-[0.1em] text-[#C5A059]/60 mt-2 mb-0.5">GRADE / GRADO / GRAU</p>
              <p className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold mb-4">{member.role}</p>

              <div className="w-full grid grid-cols-2 gap-3 border-t border-b border-[#C5A059]/30 py-3.5 px-2.5 bg-white/[0.02] rounded-xl text-left">
                <div>
                  <p className="text-[7px] uppercase tracking-[0.1em] text-[#C5A059]/60 mb-0.5">VALIDITY/VALIDAD/VALIDADE</p>
                  <p className="text-xs text-white font-bold">DECEMBER, {new Date().getFullYear() + 2}</p>
                </div>
                <div>
                  <p className="text-[7px] uppercase tracking-[0.1em] text-[#C5A059]/60 mb-0.5">CIM / ID</p>
                  <p className="text-xs text-white font-bold">{member.cim}</p>
                </div>
                {member.office && (
                  <div className="col-span-2 border-t border-[#C5A059]/15 pt-2">
                    <p className="text-[7px] uppercase tracking-[0.1em] text-[#C5A059]/60 mb-0.5">OFFICE / CARGO</p>
                    <p className="text-xs text-[#C5A059] font-bold">{member.office}</p>
                  </div>
                )}
                <div className="col-span-2 border-t border-[#C5A059]/15 pt-2">
                  <p className="text-[7px] uppercase tracking-[0.1em] text-[#C5A059]/60 mb-0.5">EMAIL / CORREO / E-MAIL</p>
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
            className="absolute inset-0 rounded-2xl p-5 bg-gradient-to-b from-[#0A0D14] via-[#0F1520] to-[#0A0D14] border-2 border-[#C5A059] shadow-[0_0_30px_rgba(197,160,89,0.2)] flex flex-col justify-between overflow-hidden"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="absolute inset-0 opacity-[0.04] flex items-center justify-center pointer-events-none">
              <img src={logoUrl} alt="" className="w-[110%] h-[110%] object-contain" />
            </div>

            <div className="relative z-10 flex items-center gap-2.5 border-b border-[#C5A059]/40 pb-2.5">
              <img src={logoUrl} alt="GLEBRA" className="h-9 w-9 drop-shadow-[0_0_6px_rgba(197,160,89,0.5)]" />
              <div>
                <p className="text-[7px] uppercase tracking-[0.05em] text-[#C5A059] font-bold">VÁLIDO EM TODO TERRITÓRIO NACIONAL</p>
                <p className="text-[6px] uppercase tracking-[0.05em] text-white/50">LEI Nº 7.116 DE 29/08/1983.</p>
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-center my-auto w-full pt-1">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-[#C5A059]/30 mb-2 max-w-[90px]">
                {qrUrl ? (
                  <img src={qrUrl} alt="QR Code" className="w-full h-auto" />
                ) : (
                  <div className="w-20 h-20 bg-gray-100 animate-pulse rounded-lg" />
                )}
              </div>

              <div className="text-center mb-0.5">
                <p className="text-blue-400 font-bold text-[7px] leading-tight uppercase">Terms & Conditions</p>
                <p className="text-blue-400 font-bold text-[7px] leading-tight uppercase">Términos & Condiciones</p>
                <p className="text-blue-400 font-bold text-[7px] leading-tight uppercase">Termos & Condições</p>
              </div>
              <ul className="text-[5px] text-white/70 space-y-0.5 list-disc text-left px-6">
                <li>This card is non-transferable and will be valid when presented with an identification document.</li>
                <li>Esta tarjeta es intransferible y será válido cuando se presenta con un documento de identificación.</li>
                <li>Este cartão é intransferível e será válido cuando apresentado com um documento de identificação.</li>
              </ul>
              <div className="grid grid-cols-2 gap-3 pt-2 text-center w-full">
                <div className="flex flex-col items-center">
                  <span className="font-serif italic text-[#C5A059] text-[10px] font-semibold leading-none mb-1">Soberano</span>
                  <span className="w-16 h-[0.5px] bg-[#C5A059]/40 mb-0.5" />
                  <span className="text-[5px] uppercase tracking-[0.1em] text-white/40">Soberano</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-serif italic text-[#C5A059] text-[10px] font-semibold leading-none mb-1">Secretário</span>
                  <span className="w-16 h-[0.5px] bg-[#C5A059]/40 mb-0.5" />
                  <span className="text-[5px] uppercase tracking-[0.1em] text-white/40">Secretário</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 text-center border-t border-[#C5A059]/30 pt-2 pb-1">
              <span className="text-blue-400 font-bold text-[8px] tracking-[0.15em] uppercase">LIBERDADE • IGUALDADE • FRATERNIDADE</span>
            </div>

            <div className="relative z-10 flex justify-between items-end border-t border-[#C5A059]/15 pt-1.5">
              <div>
                <p className="text-[7px] text-white/50">Memphis & Misraim</p>
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
