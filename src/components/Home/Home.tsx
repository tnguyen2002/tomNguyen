import SocialLinks from "../SocialLinks/SocialLinks";
import { profile } from "../../data/profile";

function Home() {
  return (
    <header className="flex w-full flex-col items-start text-left">
      <div className="mb-5 flex flex-row items-center gap-3">
        <h1 className="text-3xl font-semibold lowercase tracking-tight sm:text-4xl lg:text-5xl">
          {profile.name}
        </h1>
        <SocialLinks />
      </div>

      <div className="max-w-measure text-base leading-relaxed text-neutral-600 sm:text-lg lg:text-xl">
        {profile.bio.map((line) => (
          <p key={line} className="mb-1.5 sm:mb-2">
            {line}
          </p>
        ))}
        <p className="mb-1.5 sm:mb-2">
          contact:{" "}
          <a
            className="font-medium text-rose-500 underline-offset-4 transition-colors hover:text-rose-600 hover:underline motion-reduce:transition-none"
            href={`mailto:${profile.email}`}
          >
            {profile.email}
          </a>
        </p>
      </div>
    </header>
  );
}

export default Home;
