interface ExperienceItem {
  title: string;
  organization: string;
  date: string;
  description: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: "Software Development Engineering Intern",
    organization: "Amazon, Nashville, TN",
    date: "June 2024 – September 2024",
    description: [
      "Spearheaded development of a full-stack application that supports Amazon inspections of dangerous goods for over 10,000 packages daily, increasing operational efficiency, utilizing Kotlin, Java, TypeScript, and DynamoDB.",
      "Authored 30+ unit and integration tests covering API endpoints and front-end components using Jest, Jqwik, and React-testing, contributing to error-free deployments in multiple environments.",
      "Achieved 1st place at internal Amazon team hackathon, fine-tuned Flan-Base LLM using PyTorch and Hugging Face for a downstream classification task, competing against 30+ full-time engineers; given but declined full-time return offer.",
    ],
  },
  {
    title: "Research Intern",
    organization:
      "Stanford Machine Learning Group (Andrew Ng’s Group), Stanford, CA",
    date: "Jan 2024 – June 2024",
    description: [
      "Advised by Andrew Ng to research pre-training objectives for foundation models using medical imaging modalities.",
      "Modified Dinov2 for 3D modalities and pre-trained multiple different models with medical CT scans.",
      "Conducted experiments with a MAE pre-training objective for a downstream UNETR organ segmentation task.",
      "Achieved performance that surpassed baseline experiments and demonstrated that useful features transfer between organs & modalities, leveraging knowledge of Python, PyTorch, and Monai.",
    ],
  },
  {
    title: "CS 106a/b Teaching Assistant",
    organization: "Stanford University, Stanford, CA",
    date: "September 2023 – June 2024",
    description: [
      "Taught weekly lecture-style workshops on programming methodology to 10+ students in Python and C++.",
      "Hosted interactive grading sessions and office hours for topics such as recursive backtracking and data structures.",
      "Supported Stanford's two largest CS courses with roughly 1200 student enrollment.",
    ],
  },
  {
    title: "AI/ML Instructor & Program Manager",
    organization: "InspiritAI, Remote",
    date: "June 2023 - June 2024",
    description: [
      "Spearheaded remote instruction in Python programming for a diverse cohort of over 15 high school students daily, resulting in the mentorship of 200+ students in total.",
      "Delivered lessons on linear regression & data structures, revised 5+ teaching modules, invited to teach in-person.",
    ],
  },
  {
    title: "Software Engineering Intern",
    organization: "NASA Ames Center, Mountain View, CA",
    date: "June 2023 – August 2023",
    description: [
      "Built a retrieval-augmented generative Q&A pipeline with Haystack to help engineers in preliminary design review and risk assessment of different NASA missions (foundation for potential usage from 100+ engineers).",
      "Integrated pipeline to internal full-stack app using ReactJS front-end with an ExpressJS & Gunicorn back-end.",
    ],
  },
  {
    title: "Software Engineering Intern (Full-Stack)",
    organization: "NASA Ames Center, Mountain View, CA",
    date: "June 2021 – August 2021",
    description: [
      "Constructed an internal timeline web application, to visualize mission progress for various NASA teams.",
      "Implemented expandable event nodes with various different views, pulling events from internal RESTful APIs with an ExpressJS and MongoDB backend.",
    ],
  },
];

function Experience() {
  return (
    <div className="flex flex-col w-full items-start text-left">
      {experiences.map((exp, idx) => (
        <div key={idx} className="mb-8">
          <div className="font-bold text-2xl mb-1">
            {exp.title.toLowerCase()}
          </div>
          <div className="text-xl mb-1 text-rose-500">
            {exp.organization.toLowerCase()}
          </div>
          <div className="text-md mb-1">{exp.date.toLowerCase()}</div>
          <ul className="text-lg list-disc list-inside">
            {exp.description.map((desc, i) => (
              <li key={i}>{desc.toLowerCase()}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Experience;
