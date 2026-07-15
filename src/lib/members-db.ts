import jeffersonPhoto from "./members/jefferson.png";

export interface Member {
  id: string;
  name: string;
  role: string;
  cim: string;
  initiationDate: string;
  email: string;
  photo: string;
  status: "regular" | "irregular" | "inactive";
  joinedAt: string;
  office?: string;
  isHonorary?: boolean;
}

export const DEFAULT_MEMBERS: Member[] = [
  {
    id: "jefferson-campos-beira-junior",
    name: "Jefferson Campos Beira Junior",
    role: "Mestre Franco Maçom",
    cim: "32071",
    initiationDate: "09 de Agosto de 2020",
    email: "jefferson@glebra.com.br",
    photo: jeffersonPhoto,
    status: "regular",
    joinedAt: "2020-08-09T00:00:00.000Z",
    office: "Grande Secretario",
  },
];

export function getMembers(): Member[] {
  if (typeof window === "undefined") {
    return DEFAULT_MEMBERS.sort((a, b) => a.name.localeCompare(b.name));
  }
  const stored = localStorage.getItem("glebra_members");
  if (!stored) {
    return DEFAULT_MEMBERS.sort((a, b) => a.name.localeCompare(b.name));
  }
  try {
    const parsed = JSON.parse(stored) as Member[];
    const merged = [...DEFAULT_MEMBERS];
    for (const m of parsed) {
      if (!merged.some((x) => x.id === m.id)) {
        merged.push(m);
      }
    }
    return merged.sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    return DEFAULT_MEMBERS.sort((a, b) => a.name.localeCompare(b.name));
  }
}

export function getMemberById(id: string): Member | undefined {
  return getMembers().find((m) => m.id === id);
}

export function saveMember(member: Omit<Member, "id" | "status" | "joinedAt">): Member {
  const cleanName = member.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const newMember: Member = {
    ...member,
    id: `${cleanName}-${Date.now()}`,
    status: "regular",
    joinedAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("glebra_members");
    let members: Member[] = [];
    if (stored) {
      try {
        members = JSON.parse(stored) as Member[];
      } catch {
        members = [];
      }
    }
    members.push(newMember);
    localStorage.setItem("glebra_members", JSON.stringify(members));
  }
  return newMember;
}
