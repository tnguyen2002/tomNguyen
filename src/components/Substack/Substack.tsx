import { substack } from "../../data/substack";
import ExternalLink from "../ExternalLink/ExternalLink";

function Substack() {
  return (
    <div className="w-full">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
        <p className="text-base leading-relaxed text-neutral-600 sm:text-lg">
          {substack.intro}
        </p>
        <ExternalLink
          href={substack.url}
          className="text-sm font-semibold text-rose-500 underline-offset-4 transition-colors hover:text-rose-600 hover:underline motion-reduce:transition-none"
        >
          [subscribe]
        </ExternalLink>
      </div>

      {substack.posts.length > 0 && (
        <ul className="mt-8 flex flex-col">
          {substack.posts.map((post) => (
            <li
              key={post.href + post.title}
              className="border-t border-neutral-200/70 py-5 first:border-t-0 first:pt-0"
            >
              <ExternalLink href={post.href} className="group block">
                <div className="text-xs tabular-nums tracking-[0.2em] text-neutral-400">
                  {post.date}
                </div>
                <h3 className="mt-1.5 text-lg font-semibold lowercase tracking-tight text-neutral-900 underline-offset-4 group-hover:underline sm:text-xl">
                  {post.title}
                </h3>
                {post.blurb && (
                  <p className="mt-1.5 max-w-measure text-sm leading-relaxed text-neutral-600">
                    {post.blurb}
                  </p>
                )}
              </ExternalLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Substack;
