import type { ExperienceItem } from "./types";

export const experience: ExperienceItem[] = [
  {
    id: "amazon-2024",
    organization: "Amazon",
    title: "Software Development Engineering Intern",
    date: "June 2024 – September 2024",
    description: [
      "Spearheaded development of a full-stack application that supports Amazon inspections of dangerous goods for over 10,000 packages daily, increasing operational efficiency, utilizing Kotlin, Java, TypeScript, and DynamoDB.",
      "Authored 30+ unit and integration tests covering API endpoints and front-end components using Jest, Jqwik, and React-testing, contributing to error-free deployments in multiple environments.",
      "Achieved 1st place at internal Amazon team hackathon, fine-tuned Flan-Base LLM using PyTorch and Hugging Face for a downstream classification task, competing against 30+ full-time engineers; given but declined full-time return offer.",
    ],
  },
  {
    id: "stanford-ml-2024",
    organization: "Stanford Machine Learning Group (Andrew Ng's Group)",
    title: "Research Intern",
    date: "Jan 2024 – June 2024",
    description: [
      "Advised by Andrew Ng to leverage Dinov2 and MAE self-supervised pre-training objectives for 3D medical imaging modalities",
      "Conducted downstream benchmarks for an organ classification task and 3D organ segmentation via a UNETR",
    ],
  },
  {
    id: "stanford-ta-2023",
    organization: "Stanford University",
    title: "CS 106a/b Teaching Assistant",
    date: "September 2023 – June 2024",
    description: [
      "Taught weekly lecture-style workshops on programming methodology to 10+ students in Python and C++.",
      "Hosted interactive grading sessions and office hours for topics such as recursive backtracking and data structures.",
      "Supported Stanford's two largest CS courses with roughly 1200 student enrollment.",
    ],
  },
  {
    id: "inspiritai-2023",
    organization: "InspiritAI",
    title: "AI/ML Instructor & Program Manager",
    date: "June 2023 - June 2024",
    description: [
      "Spearheaded remote instruction in Python programming for a diverse cohort of over 15 high school students daily, resulting in the mentorship of 200+ students in total.",
      "Delivered lessons on linear regression & data structures, revised 5+ teaching modules, invited to teach in-person.",
    ],
  },
  {
    id: "nasa-2023",
    organization: "NASA Ames Center",
    title: "Software Engineering Intern",
    date: "June 2023 – August 2023",
    description: [
      "Built a retrieval-augmented generative Q&A pipeline with Haystack to help engineers in preliminary design review and risk assessment of different NASA missions (foundation for potential usage from 100+ engineers).",
      "Integrated pipeline to internal full-stack app using ReactJS front-end with an ExpressJS & Gunicorn back-end.",
    ],
  },
  {
    id: "nasa-2021",
    organization: "NASA Ames Center",
    title: "Software Engineering Intern (Full-Stack)",
    date: "June 2021 – August 2021",
    description: [
      "Constructed an internal timeline web application, to visualize mission progress for various NASA teams.",
      "Implemented expandable event nodes with various different views, pulling events from internal RESTful APIs with an ExpressJS and MongoDB backend.",
    ],
  },
];
