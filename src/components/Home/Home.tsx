import SocialLinks from "../SocialLinks/SocialLinks";
import { profile } from "../../data/profile";

function Home() {
  return (
    <div className="flex w-full flex-col items-start text-left">
      <div className="mb-1 flex flex-row items-center gap-2">
        <h1 className="text-lg font-bold lowercase tracking-tight sm:text-xl lg:text-3xl">
          {profile.name}
        </h1>
        <SocialLinks />
      </div>
      <div className="text-base leading-relaxed sm:text-xl lg:text-2xl">
        {profile.bio.map((line) => (
          <p key={line} className="mb-2 sm:mb-3">
            {line}
          </p>
        ))}
        <p className="mb-2 sm:mb-3">
          contact:{" "}
          <a
            className="font-bold text-rose-500 underline-offset-4 hover:underline"
            href={`mailto:${profile.email}`}
          >
            {profile.email}
          </a>
        </p>
      </div>
    </div>
  );
}

export default Home;
