// ─── Team Data ────────────────────────────────────────────────────────────────
// Photos should be placed in /public/teams/<team-name>/<filename>.jpg
// Use null for photo to show placeholder initials

export type MemberType = "executive" | "core" | "faculty";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string | null; // path relative to /public e.g. "/teams/events/john.jpg"
  linkedin?: string;
  github?: string;
  instagram?: string;
  type: MemberType;
}

export interface Team {
  id: string;
  label: string;
  members: TeamMember[];
}

// ─── Teams ────────────────────────────────────────────────────────────────────

export const teamsData: Team[] = [
  // ── Convenors (Executive) ──────────────────────────────────────────────────
  {
    id: "convenors",
    label: "Convenors",
    members: [
      {
        id: "c1",
        name: "Convenor Name",
        role: "Convenor",
        photo: null,
        linkedin: "",
        github: "",
        type: "executive",
      },
    ],
  },

  // ── Directors (Executive) ──────────────────────────────────────────────────
  {
    id: "directors",
    label: "Directors",
    members: [
      {
        id: "c2",
        name: "Director Name",
        role: "Director",
        photo: null,
        linkedin: "",
        github: "",
        type: "executive",
      },
    ],
  },

  // ── Web Development Team (formerly Technical) ──────────────────────────────
  {
    id: "technical",
    label: "Web Development Team",
    members: [
      {
        id: "tc1",
        name: "Member Name",
        role: "Technical Lead",
        photo: null,
        linkedin: "",
        github: "",
        type: "core",
      },
      {
        id: "tc2",
        name: "Member Name",
        role: "Technical Core",
        photo: null,
        github: "",
        type: "core",
      },
    ],
  },

  // ── Graphic Design Team ───────────────────────────────────────────────────
  {
    id: "graphic-design",
    label: "Graphic Design Team",
    members: [
      {
        id: "gd1",
        name: "Member Name",
        role: "Design Lead",
        photo: null,
        linkedin: "",
        type: "core",
      },
      {
        id: "gd2",
        name: "Member Name",
        role: "Design Core",
        photo: null,
        type: "core",
      },
    ],
  },

  // ── Curations Team ─────────────────────────────────────────────────────────
  {
    id: "curations",
    label: "Curations Team",
    members: [
      {
        id: "cu1",
        name: "Member Name",
        role: "Curations Lead",
        photo: null,
        linkedin: "",
        type: "core",
      },
      {
        id: "cu2",
        name: "Member Name",
        role: "Curations Core",
        photo: null,
        type: "core",
      },
    ],
  },

  // ── Social Media Team ──────────────────────────────────────────────────────
  {
    id: "social-media",
    label: "Social Media Team",
    members: [
      {
        id: "sm1",
        name: "Member Name",
        role: "Social Media Lead",
        photo: null,
        linkedin: "",
        type: "core",
      },
      {
        id: "sm2",
        name: "Member Name",
        role: "Social Media Core",
        photo: null,
        type: "core",
      },
    ],
  },

  // ── Media & Coverage Team ──────────────────────────────────────────────────
  {
    id: "media",
    label: "Media & Coverage Team",
    members: [
      {
        id: "mc1",
        name: "Member Name",
        role: "Media Lead",
        photo: null,
        linkedin: "",
        type: "core",
      },
      {
        id: "mc2",
        name: "Member Name",
        role: "Media Core",
        photo: null,
        type: "core",
      },
    ],
  },

  // ── Logistics Team ─────────────────────────────────────────────────────────
  {
    id: "logistics",
    label: "Logistics Team",
    members: [
      {
        id: "lo1",
        name: "Member Name",
        role: "Logistics Lead",
        photo: null,
        linkedin: "",
        type: "core",
      },
      {
        id: "lo2",
        name: "Member Name",
        role: "Logistics Core",
        photo: null,
        type: "core",
      },
    ],
  },

  // ── Events Team ───────────────────────────────────────────────────────────
  {
    id: "events",
    label: "Events Team",
    members: [
      {
        id: "ev1",
        name: "Member Name",
        role: "Events Lead",
        photo: null,
        linkedin: "",
        github: "",
        type: "core",
      },
      {
        id: "ev2",
        name: "Member Name",
        role: "Events Core",
        photo: null,
        linkedin: "",
        type: "core",
      },
    ],
  },

  // ── Marketing Team ────────────────────────────────────────────────────────
  {
    id: "marketing",
    label: "Marketing Team",
    members: [
      {
        id: "mk1",
        name: "Member Name",
        role: "Marketing Lead",
        photo: null,
        linkedin: "",
        type: "core",
      },
      {
        id: "mk2",
        name: "Member Name",
        role: "Marketing Core",
        photo: null,
        linkedin: "",
        type: "core",
      },
    ],
  },

  // ── Corporate Team ────────────────────────────────────────────────────────
  {
    id: "corporate",
    label: "Corporate Team",
    members: [
      {
        id: "cp1",
        name: "Member Name",
        role: "Corporate Lead",
        photo: null,
        linkedin: "",
        type: "core",
      },
      {
        id: "cp2",
        name: "Member Name",
        role: "Corporate Core",
        photo: null,
        type: "core",
      },
    ],
  },

  // ── Hospitality Team ───────────────────────────────────────────────────────
  {
    id: "hospitality",
    label: "Hospitality Team",
    members: [
      {
        id: "ho1",
        name: "Member Name",
        role: "Hospitality Lead",
        photo: null,
        linkedin: "",
        type: "core",
      },
      {
        id: "ho2",
        name: "Member Name",
        role: "Hospitality Core",
        photo: null,
        type: "core",
      },
    ],
  },

  // ── Crafts Team ───────────────────────────────────────────────────────────
  {
    id: "crafts",
    label: "Crafts Team",
    members: [
      {
        id: "cr1",
        name: "Member Name",
        role: "Crafts Lead",
        photo: null,
        linkedin: "",
        type: "core",
      },
      {
        id: "cr2",
        name: "Member Name",
        role: "Crafts Core",
        photo: null,
        type: "core",
      },
    ],
  },

  // ── Flying Squad ──────────────────────────────────────────────────────────
  {
    id: "flying-squad",
    label: "Flying Squad",
    members: [
      {
        id: "fs1",
        name: "Member Name",
        role: "Flying Squad Lead",
        photo: null,
        linkedin: "",
        type: "core",
      },
      {
        id: "fs2",
        name: "Member Name",
        role: "Flying Squad Core",
        photo: null,
        type: "core",
      },
    ],
  },

  // ── Content Team ──────────────────────────────────────────────────────────
  {
    id: "content",
    label: "Content Team",
    members: [
      {
        id: "co1",
        name: "Member Name",
        role: "Content Lead",
        photo: null,
        linkedin: "",
        type: "core",
      },
      {
        id: "co2",
        name: "Member Name",
        role: "Content Core",
        photo: null,
        type: "core",
      },
    ],
  },

  // ── Finance Team ──────────────────────────────────────────────────────────
  {
    id: "finance",
    label: "Finance Team",
    members: [
      {
        id: "fi1",
        name: "Member Name",
        role: "Finance Lead",
        photo: null,
        linkedin: "",
        type: "core",
      },
      {
        id: "fi2",
        name: "Member Name",
        role: "Finance Core",
        photo: null,
        type: "core",
      },
    ],
  },

  // ── Faculty ───────────────────────────────────────────────────────────────
  {
    id: "faculty",
    label: "Faculty",
    members: [
      {
        id: "fa1",
        name: "Faculty Name",
        role: "Faculty Advisor",
        photo: null,
        linkedin: "",
        type: "faculty",
      },
    ],
  },
];
