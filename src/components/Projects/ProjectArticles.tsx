import { memo } from "react";
import { accentFor } from "../../lib/accent";
import { projects } from "../../data/projects";
import ExternalLink from "../ExternalLink/ExternalLink";
import ProjectMedia from "./ProjectMedia";

/**
 * The scrolling list of projects.
 *
 * Split out and memoised because the scroll-spy updates `activeIndex` many
 * times during a jump, and while this lived in the same component every one of
 * those updates re-rendered all eight projects — media, video element and all —
 * mid-animation. Only the index needs to re-render when the active item
 * changes; the articles never do.
 *
 * `register` must be referentially stable for the memo to hold.
 *
 * Every project renders here, bite-sized ones included — the index's "Bite
 * Sized" group is a nav affordance only. That is what lets the group expand
 * itself when you scroll into one: there has to be something to scroll to.
 */
function ProjectArticlesImpl({
  register,
}: {
  register: (el: HTMLElement | null, index: number) => void;
}) {
  return (
    <div className="col-span-9">
      {projects.map((project, index) => {
        const accent = accentFor(index);
        const visual = project.visual ?? { kind: "none" as const };
        const summary = project.summary ?? project.description[0];
        const stack = project.stack ?? [];

        return (
          <article
            key={project.slug}
            id={`project-${project.slug}`}
            ref={(el) => register(el, index)}
            // min-h keeps the next project below the fold when you jump to this
            // one. The fallback matters before the effect has measured.
            className="flex min-h-[var(--pane-h,32rem)] flex-col border-t border-line py-10 first:border-t-0 first:pt-0"
          >
            {/* No visible caption. The demo now shows the whole process with
                its own title and one-line subtitle burnt in, so a "Fig. N"
                line underneath repeated what the frame already said. The alt
                text still rides on the media itself for screen readers — it is
                only the printed copy that is gone. */}
            <div>
              <ProjectMedia
                visual={visual}
                name={project.name}
                stack={stack}
                year={project.year}
                accent={accent}
              />
            </div>

            <div className="mt-8">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-[1.5rem] font-semibold leading-tight tracking-[-0.02em] text-[1.75rem]">
                  {project.name}
                </h3>
                {project.year && <span className="meta">{project.year}</span>}
              </div>

              {summary && (
                <p className="mt-3 max-w-measure text-pretty text-[0.9375rem] leading-relaxed text-fg-muted">
                  {summary}
                </p>
              )}

              <ul className="mt-6 max-w-measure space-y-3">
                {project.description.map((line, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      style={{ backgroundColor: accent.fg, opacity: 0.5 }}
                      className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full"
                    />
                    <span className="text-[0.875rem] leading-relaxed text-fg-muted">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>

              {project.links.length > 0 && (
                <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
                  {project.links.map((link) => (
                    <ExternalLink
                      key={link.label}
                      href={link.href}
                      style={{ color: accent.fg }}
                      className="group inline-flex items-center gap-1.5 text-[0.875rem] font-medium transition-opacity hover:opacity-70 motion-reduce:transition-none"
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5 motion-reduce:transition-none"
                      >
                        &#8594;
                      </span>
                    </ExternalLink>
                  ))}
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default memo(ProjectArticlesImpl);
