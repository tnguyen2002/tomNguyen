import { accentFor } from "../../lib/accent";
import AppIcon, { BrandTile } from "./AppIcon";
import AppTile from "./AppTile";
import ExternalLink from "../ExternalLink/ExternalLink";
import { APPS, MAIL_ACCENT_INDEX } from "../../data/apps";
import { profile, socials } from "../../data/profile";

/**
 * The phone version of the desktop: a home screen of the same app icons.
 *
 * A dock with hover magnification means nothing on a touch screen, so rather
 * than shrink the desktop until it breaks, small screens get the matching
 * gesture — tap an icon, the section opens full-screen.
 */
function HomeScreen({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div className="animate-rise px-6 pb-16 pt-10">
      <header className="mb-10 text-center">
        <h1 className="text-[1.75rem] font-semibold leading-none tracking-[-0.03em] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]">
          {profile.name}
        </h1>
      </header>

      <ul className="mx-auto grid max-w-xs grid-cols-3 gap-x-5 gap-y-7">
        {APPS.map((app) => (
          <li key={app.id}>
            <button
              type="button"
              onClick={() => onOpen(app.id)}
              className="flex w-full flex-col items-center gap-1.5"
            >
              <AppTile app={app} className="block h-14 w-14 overflow-hidden" />
              <span className="text-[0.6875rem] leading-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
                {app.label}
              </span>
            </button>
          </li>
        ))}

        <li>
          <a
            href={`mailto:${profile.email}`}
            aria-label={`Email ${profile.name}`}
            className="flex w-full flex-col items-center gap-1.5"
          >
            <AppIcon
              glyph="mail"
              accent={accentFor(MAIL_ACCENT_INDEX)}
              className="h-14 w-14"
            />
            <span className="text-[0.6875rem] leading-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
              Email
            </span>
          </a>
        </li>
      </ul>

      <nav
        aria-label="social links"
        className="mx-auto mt-10 flex max-w-xs items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/15 px-4 py-3 backdrop-blur-2xl"
      >
        {socials.map((social) => (
          <ExternalLink
            key={social.id}
            href={social.href}
            aria-label={social.label}
          >
            <BrandTile id={social.id} className="h-11 w-11" />
          </ExternalLink>
        ))}
      </nav>
    </div>
  );
}

export default HomeScreen;
