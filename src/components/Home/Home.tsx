import SocialIcons from "../SocialIcon/SocialIcon";
import { profile } from "../../data/profile";

function Home() {
  return (
    <div className="flex flex-col w-full items-start text-left">
      <div className="w-full flex flex-col">
        <div className="flex flex-row items-center gap-2 mb-0">
          <div className="font-bold text-lg sm:text-xl lg:text-3xl mb-0 lowercase">
            {profile.name}
          </div>
          <SocialIcons />
        </div>
        <div className="text-base sm:text-xl lg:text-2xl leading-relaxed mb-0">
          {profile.bio.map((line) => (
            <div key={line} className="mb-2 sm:mb-3">
              {line}
            </div>
          ))}
          <div className="mb-2 sm:mb-3">
            contact:{" "}
            <a className="font-bold text-rose-500" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
