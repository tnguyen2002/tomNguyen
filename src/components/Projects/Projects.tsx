import ExternalLink from "../ExternalLink/ExternalLink";
import { projects } from "../../data/projects";

function Projects() {
  return (
    <div className="flex flex-col w-full items-start text-left">
      {projects.map((project) => (
        <div key={project.slug} className="mb-6 sm:mb-8">
          <div className="font-bold text-xl mb-1 lowercase">{project.name}</div>
          <ul className="text-xl list-disc list-inside mb-1 lowercase">
            {project.description.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 sm:gap-4 mt-2">
            {project.links.map((link) => (
              <ExternalLink
                key={link.label}
                className="font-bold text-rose-500 text-sm sm:text-base"
                href={link.href}
              >
                [{link.label}]
              </ExternalLink>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Projects;
