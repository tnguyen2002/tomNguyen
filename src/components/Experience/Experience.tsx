import { experience } from "../../data/experience";

function Experience() {
    return (
        <ol className="flex w-full flex-col">
            {experience.map((exp) => (
                <li
                    key={exp.id}
                    className="border-t border-line py-7 first:border-t-0 first:pt-0"
                >
                    <div className="flex flex-row items-baseline justify-between gap-6">
                        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                            <h3 className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-fg">
                                {exp.organization}
                            </h3>
                            <span className="text-[0.875rem] text-fg-muted">
                                {exp.title}
                            </span>
                        </div>
                        <span className="meta shrink-0">{exp.date}</span>
                    </div>

                    <ul className="mt-4 space-y-2.5">
                        {exp.description.map((desc, i) => (
                            <li key={i} className="flex gap-3">
                                <span
                                    aria-hidden="true"
                                    className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-line-strong"
                                />
                                <span className="text-[0.875rem] leading-relaxed text-fg-muted">
                                    {desc}
                                </span>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ol>
    );
}

export default Experience;
