import type { ReactNode } from "react";
import DesktopHome from "../components/Desktop/DesktopHome";
import SocialLinks from "../components/SocialLinks/SocialLinks";
import Projects from "../components/Projects/Projects";
import Experience from "../components/Experience/Experience";
import Bookshelf from "../components/Bookshelf/Bookshelf";
import Ears from "../components/Ears/Ears";
import Watch from "../components/Watch/Watch";
import Before30Checklist from "../components/Before30Checklist/Before30Checklist";
import type { GlyphId } from "../components/Desktop/AppIcon";
import { profile } from "./profile";

export interface DockApp {
  /** Also the DOM id stem for the button/panel pair. */
  id: string;
  /** Shown in the dock tooltip, the menu bar, and the mobile home screen.
   *  Kept short enough to sit under a home-screen icon. */
  label: string;
  /** Page heading, when it differs from the short dock label. */
  title?: string;
  /** Secondary line under the page heading. */
  subtitle?: string;
  glyph: GlyphId;
  /** Index into ACCENTS — hand-picked for spread rather than sequential, so
   *  neighbouring dock icons never share a hue. */
  accentIndex: number;
  /** Exact tile colour when the icon is a brand mark rather than one of ours. */
  brandColor?: string;
  /** Mark colour, when the brand's glyph is not white. */
  glyphColor?: string;
  /** Rendered beside the window title. Home uses it for the social links, so
   *  they sit next to the name rather than adrift in the card. */
  headerAccessory?: ReactNode;
  /** Window width when the app is a card rather than a document. Literal
   *  Tailwind class so the JIT can see it. */
  maxWidth?: string;
  /** A finished icon image (the real app icon, extracted from its .icns).
   *  When set it is drawn as-is: the artwork already carries its own squircle,
   *  gradients and shadow, so it must NOT go through AppIcon's tile. */
  iconSrc?: string;
  content: ReactNode;
}

export const APPS: DockApp[] = [
  {
    id: "home",
    label: "Phone",
    // Page heading is the name, not "Home" — the site's single h1 should say
    // who this is.
    title: profile.name,
    maxWidth: "max-w-2xl",
    headerAccessory: <SocialLinks />,
    // Real iOS Phone artwork (Wikimedia Commons, public domain). The `glyph`
    // is only the fallback if iconSrc is ever removed.
    glyph: "phone",
    accentIndex: 1,
    iconSrc: "/icons/phone.png",
    content: <DesktopHome />,
  },
  {
    id: "projects",
    label: "Visual Studio Code",
    subtitle: "Projects",
    glyph: "vscode",
    accentIndex: 0,
    iconSrc: "/icons/vscode.png",

    content: <Projects />,
  },
  {
    id: "experience",
    label: "Notes",
    subtitle: "Experience",
    glyph: "experience",
    accentIndex: 3,
    iconSrc: "/icons/notes.png",
    content: <Experience />,
  },
  {
    id: "bookshelf",
    label: "Books",
    glyph: "bookshelf",
    accentIndex: 2,
    iconSrc: "/icons/books.png",
    content: <Bookshelf />,
  },
  {
    id: "ears",
    label: "Spotify",
    glyph: "spotify",
    accentIndex: 5,
    iconSrc: "/icons/spotify.png",
    content: <Ears />,
  },
  {
    id: "watch",
    label: "Netflix",
    title: "movies & shows",
    glyph: "netflix",
    accentIndex: 0,
    // Real app icon is the red mark on flat black; the near-black tile also
    // trips AppIcon's dark-tile rule, so it gets no gradient lift or gloss.
    brandColor: "#0B0B0B",
    glyphColor: "#E50914",
    content: <Watch />,
  },
  {
    id: "before-30",
    label: "Reminders",
    subtitle: "30 under 30",
    glyph: "checklist",
    accentIndex: 6,
    iconSrc: "/icons/reminders.png",
    content: <Before30Checklist />,
  },
];

/** The mail tile sits with the socials, past the dock separator — it leaves the
 *  site rather than opening a page, so it should not look like the apps do. */
export const MAIL_ACCENT_INDEX = 4;
