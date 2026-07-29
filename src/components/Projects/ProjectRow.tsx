import { cn } from "../../lib/cn";
import { useInView } from "../../hooks/useInView";
import type { Project } from "../../data/types";
import ExternalLink from "../ExternalLink/ExternalLink";
import ProjectMedia from "./ProjectMedia";
import Tag from "./Tag";

interface ProjectRowProps {
  project: Project;
  index: number;
}

function ProjectRow({ project, index }: ProjectRowProps) {
  const [ref, inView] = useInView<HTMLElement>({ once: true, threshold: 0.12 });

  // The first row is above the fold on load, so it is never gated behind the
  // reveal — content a visitor can already see should not have to fade in, and
  // it means nothing above the fold depends on IntersectionObserver firing.
  const revealed = index === 0 || inView;

  const reverse = index % 2 === 1;
  const visual = project.visual ?? { kind: "none" as const };
  const summary = project.summary ?? project.description[0];
  const stack = project.stack ?? [];

  // A project with no visual AND no stack tags has nothing to put in the media
  // column, so the text spans the full width instead of sitting beside a hole.
  // Alternating the margin keeps the zig-zag rhythm going down the page.
  const hasMedia = visual.kind !== "none" || stack.length > 0;

  // When there is no visual, the media column becomes a typographic tile built
  // from the stack tags — so repeating them as chips below the bullets would
  // print the same four words twice in one row.
  const showStackChips = stack.length > 0 && visual.kind !== "none";

  return (
    <article
      ref={ref}
      className={cn(
        "grid items-center gap-6 border-t border-neutral-200/70 py-12 transition-all duration-700 ease-out-expo motion-reduce:transition-none",
        hasMedia && "md:grid-cols-2 md:gap-12 md:py-20 lg:gap-16",
        revealed
          ? "translate-y-0 opacity-100"
          : "translate-y-3 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
      )}
    >
      {hasMedia && (
        // order-* is applied only at md: and above, so the mobile stack always
        // follows DOM order (media, then text) with no order classes active.
        <div className={reverse ? "md:order-2" : "md:order-1"}>
          <ProjectMedia
            visual={visual}
            name={project.name}
            stack={stack}
            year={project.year}
          />
        </div>
      )}

      <div
        className={cn(
          hasMedia
            ? reverse
              ? "md:order-1"
              : "md:order-2"
            : cn("max-w-2xl", reverse ? "md:ml-auto" : "md:mr-auto")
        )}
      >
        <div className="mb-3 text-xs font-medium tabular-nums tracking-[0.2em] text-neutral-400">
          {String(index + 1).padStart(2, "0")}
          {project.year && ` / ${project.year}`}
        </div>

        <h3 className="text-balance text-2xl font-semibold lowercase tracking-tight sm:text-3xl lg:text-4xl">
          {project.name}
        </h3>

        {summary && (
          <p className="mt-3 text-pretty text-lg leading-relaxed text-neutral-600">
            {summary}
          </p>
        )}

        <ul className="mt-5 list-outside list-disc space-y-2 pl-5 lowercase leading-relaxed text-neutral-700 marker:text-rose-300">
          {project.description.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>

        {showStackChips && (
          <div className="mt-6 flex flex-wrap gap-2">
            {stack.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
        )}

        {project.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-4">
            {project.links.map((link) => (
              <ExternalLink
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-rose-500 underline-offset-4 transition-colors hover:text-rose-600 hover:underline motion-reduce:transition-none"
              >
                [{link.label}]
              </ExternalLink>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default ProjectRow;
