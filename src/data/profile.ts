import type { SocialLink } from "./types";

/** One row of the specimen card under the masthead. Label is set in mono small
 *  caps, value in body text — so the card reads as a catalogued record. */
export interface Fact {
  label: string;
  value: string;
}

export const profile = {
  name: "Tom Nguyen",
  email: "tomtkkn@gmail.com",
  facts: [
    { label: "currently", value: "member of technical staff @ accordance" },
    { label: "education", value: "just finished b.s & m.s in cs @ stanford" },
    { label: "hobbies", value: "volleyball, journaling" },
  ] as Fact[],
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
