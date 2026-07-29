import { experience } from "../../data/experience";

function Experience() {
  return (
    <div className="flex flex-col w-full items-start text-left">
      {experience.map((exp) => (
        <div key={exp.id} className="mb-6 sm:mb-8">
          <div className="flex flex-row flex-wrap items-center justify-between w-full mb-1">
            <div className="flex flex-row flex-wrap items-center gap-x-4">
              <span className="font-bold text-xl lowercase">
                {exp.organization}
              </span>
              <span className="text-xl text-rose-500 lowercase">
                {exp.title}
              </span>
            </div>
            <span className="text-xs sm:text-sm lg:text-base text-gray-500 whitespace-nowrap lowercase">
              {exp.date}
            </span>
          </div>
          <ul className="text-xl list-disc list-inside lowercase">
            {exp.description.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Experience;
