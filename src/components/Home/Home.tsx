import SocialIcons from "../SocialIcon/SocialIcon";
function Home() {
  return (
    <div className="flex flex-col w-full items-start text-left">
      <div className="w-full flex flex-col">
        <div className="flex flex-row items-center gap-2 mb-0">
          <div className="font-bold text-lg sm:text-xl lg:text-3xl mb-0">
            tom nguyen
          </div>
          <SocialIcons />
        </div>
        <div className="Section mb-0">
          <div>
            <div className="text-base sm:text-xl lg:text-2xl leading-relaxed mb-0">
              <div className="mb-2 sm:mb-3">
                currently: only doing 3 things everyday,
              </div>
              <div className="mb-2 sm:mb-3">
                just finished b.s & m.s in cs @stanford
              </div>
              <div className="mb-2 sm:mb-3">
                things that make me happy: volleyball, journaling, and making
                occasional videos on{" "}
                <a
                  className="font-bold text-rose-500 text-base sm:text-xl lg:text-2xl"
                  href="https://www.youtube.com/@tomnguyen4548"
                >
                  youtube
                </a>
              </div>
              <div className="mb-2 sm:mb-3">
                contact: tomthuckynguyen@gmail.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
