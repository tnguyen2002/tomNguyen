import { accentFor } from "../../lib/accent";
import { profile } from "../../data/profile";

/**
 * Contents of the Home app.
 *
 * No heading of its own — the app sheet supplies the h1, and the Home app's
 * `title` is the name, so the page heading reads "Tom Nguyen" rather than
 * "Home". That keeps the site's one h1 meaningful.
 */
function DesktopHome() {
  const contactAccent = accentFor(profile.facts.length);

  return (
    <div>
      {/* Each fact is its own row with a hairline between, so the labels read
          as a record rather than floating in a wide empty grid. */}
      <dl className="border-t border-line">
        {profile.facts.map((fact) => (
          <div
            key={fact.label}
            className="flex flex-row items-baseline gap-6 border-b border-line py-3"
          >
            <dt className="w-24 shrink-0 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-fg">
              {fact.label}
            </dt>
            <dd className="text-[0.9375rem] leading-relaxed text-fg-muted">
              {fact.value}
            </dd>
          </div>
        ))}

        <div className="flex flex-row items-baseline gap-6 border-b border-line py-3">
          <dt className="w-24 shrink-0 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-fg">
            contact
          </dt>
          <dd className="text-[0.9375rem] leading-relaxed">
            <a
              href={`mailto:${profile.email}`}
              style={{ color: contactAccent.fg }}
              className="underline decoration-current/30 decoration-1 underline-offset-[3px] transition-opacity hover:opacity-70 motion-reduce:transition-none"
            >
              {profile.email}
            </a>
          </dd>
        </div>
      </dl>

    </div>
  );
}

export default DesktopHome;
