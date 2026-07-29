import type { SocialLink } from "./types";

export const profile = {
  name: "Tom Nguyen",
  tagline: "swe — ml + systems",
  email: "tomthuckynguyen@gmail.com",
  bio: [
    "currently: @ accordance",
    "just finished b.s & m.s in cs @stanford",
    "things that make me happy: volleyball, journaling",
  ],
};

// NOTE: YouTube is intentionally omitted. There were two conflicting handles in
// the old code — @tom_nguyennnn (Home.tsx) and @tomnguyen4548 (SocialIcon.tsx).
// To bring it back, pick the real one and re-add:
//   { id: "youtube", label: "YouTube", href: "https://www.youtube.com/@..." }
// (that also needs a "youtube" case in BrandIcon and the SocialId union.)
export const socials: SocialLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anhtomnguyen/",
  },
  { id: "github", label: "GitHub", href: "https://github.com/tnguyen2002" },
  { id: "x", label: "X", href: "https://x.com/t0m_win" },
];
