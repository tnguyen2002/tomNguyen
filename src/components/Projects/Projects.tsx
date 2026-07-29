import { projects } from "../../data/projects";
import ProjectRow from "./ProjectRow";

function Projects() {
  return (
    <div className="flex w-full flex-col items-start text-left">
      {projects.map((project, index) => (
        <ProjectRow key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}

export default Projects;
