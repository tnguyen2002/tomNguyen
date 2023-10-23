import SocialIcons from "../SocialIcon/SocialIcon";
import { NavLink } from "react-router-dom";
import "./Home.css";
function Home() {
  return (
    <div className="flex flex-col w-full sm:w-1/4">
      <SocialIcons />
      <div>
        <div className="font-bold text-lg">Tom Nguyen</div>
      </div>
      <div className="Section">
        <div>
          <div>
            I am interested in creating AI/ML products. I am currently in my 4th
            year @{" "}
            <a
              className="font-bold text-rose-500"
              href="https://www.stanford.edu/"
            >
              Stanford
            </a>{" "}
            and will soon be pursuing a masters. In my free time I enjoy playing
            volleyball and making videos on{" "}
            <a
              className="font-bold text-rose-500"
              href="https://www.youtube.com/@tomnguyen4548"
            >
              Youtube
            </a>
            . My academic{" "}
            <a
              className="font-bold text-rose-500"
              href="https://airtable.com/appNGte73TR0vBXG2/shrPevp160CKqhAKv"
            >
              background
            </a>{" "}
            is primarily computer science with specks of economics and math.
          </div>
          <div>Contact: anhn@stanford.edu</div>
        </div>
      </div>
      <div className="font-bold text-rose-500">
        <NavLink className="text-rose-500" to="/projects">
          Projects →
        </NavLink>
      </div>
    </div>
  );
}
export default Home;
