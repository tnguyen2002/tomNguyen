import type { ReactNode } from "react";
import Page from "./components/Layout/Page";
import Home from "./components/Home/Home";
import CollapsibleSection from "./components/CollapsibleSection/CollapsibleSection";
import Projects from "./components/Projects/Projects";
import Experience from "./components/Experience/Experience";
import Before30Checklist from "./components/Before30Checklist/Before30Checklist";

interface Section {
  id: string;
  label: string;
  defaultOpen?: boolean;
  content: ReactNode;
}

const SECTIONS: Section[] = [
  {
    id: "projects",
    label: "projects",
    defaultOpen: true,
    content: <Projects />,
  },
  { id: "experience", label: "experience", content: <Experience /> },
  {
    id: "before-30",
    label: "30 before 30 not forbes",
    content: <Before30Checklist />,
  },
];

function App() {
  return (
    <main className="min-h-screen bg-white">
      <Page>
        <Home />
        <div className="mt-12 w-full sm:mt-16">
          {SECTIONS.map((section) => (
            <CollapsibleSection
              key={section.id}
              id={section.id}
              label={section.label}
              defaultOpen={section.defaultOpen}
            >
              {section.content}
            </CollapsibleSection>
          ))}
        </div>
      </Page>
    </main>
  );
}

export default App;
