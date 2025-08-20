import "./App.css";
import Home from "./components/Home/Home";
import Projects from "./components/Projects/Projects";
import Experience from "./components/Experience/Experience";
import DreamJobCriteria from "./components/DreamJobCriteria/DreamJobCriteria";
import Before30Checklist from "./components/Before30Checklist/Before30Checklist";
import { useState } from "react";

function App() {
  const [showProjects, setShowProjects] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [showDreamJob, setShowDreamJob] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  return (
    <div className="min-h-screen flex flex-col items-start justify-center bg-white">
      <div
        className="w-full max-w-full xl:max-w-screen-2xl px-2 sm:px-8 xl:px-32 py-6 sm:py-12 xl:py-20 flex flex-col items-start mx-auto"
        style={{}}
      >
        <Home />
        <div
          className="mt-4 flex items-center cursor-pointer select-none"
          onClick={() => setShowDreamJob((prev) => !prev)}
        >
          <span className="font-bold text-rose-500 text-xl mr-2">
            my must haves
          </span>
          <span
            className={`transform transition-transform duration-300 text-xl ${
              showDreamJob ? "rotate-90" : ""
            }`}
          >
            &#8594;
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out w-full flex justify-start ${
            showDreamJob ? "max-h-none opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="w-full">
            <DreamJobCriteria />
          </div>
        </div>
        <div
          className="mt-4 flex items-center cursor-pointer select-none"
          onClick={() => setShowProjects((prev) => !prev)}
        >
          <span className="font-bold text-rose-500 text-xl mr-2">projects</span>
          <span
            className={`transform transition-transform duration-300 text-xl ${
              showProjects ? "rotate-90" : ""
            }`}
          >
            &#8594;
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out w-full flex justify-start ${
            showProjects ? "max-h-none opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="w-full">
            <Projects />
          </div>
        </div>
        <div
          className="mt-4 flex items-center cursor-pointer select-none"
          onClick={() => setShowExperience((prev) => !prev)}
        >
          <span className="font-bold text-rose-500 text-xl mr-2">
            experience
          </span>
          <span
            className={`transform transition-transform duration-300 text-xl ${
              showExperience ? "rotate-90" : ""
            }`}
          >
            &#8594;
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out w-full flex justify-start ${
            showExperience ? "max-h-none opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="w-full">
            <Experience />
          </div>
        </div>
        <div
          className="mt-4 flex items-center cursor-pointer select-none"
          onClick={() => setShowChecklist((prev) => !prev)}
        >
          <span className="font-bold text-rose-500 text-xl mr-2">
            30 before 30 not forbes
          </span>
          <span
            className={`transform transition-transform duration-300 text-xl ${
              showChecklist ? "rotate-90" : ""
            }`}
          >
            &#8594;
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out w-full flex justify-start ${
            showChecklist ? "max-h-none opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="w-full">
            <Before30Checklist />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
