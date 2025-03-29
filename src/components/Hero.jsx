import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import Button from "./Button";
import Typewriter from "./typewriter-component";

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ member }) => {

  const firstName = member.name.split(' ')[0];
  const lastName = member.name.split(' ')[1];
  const randomlnIndex = Math.floor(Math.random() * lastName.length);
  const randomfnIndex = Math.floor(Math.random() * firstName.length);

  useGSAP(() => {
    gsap.set("#img-frame", {
      clipPath: "polygon(10% 0, 80% 0, 90% 80%, 0 95%)",
      borderRadius: "0% 0% 53% 10%",
    });
    gsap.from("#img-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#img-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="img-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <img
            src={member.coverImage}
            className="absolute left-0 top-0 size-full object-cover object-center"

          />
        </div>
        {/* Profile image - repositioned for mobile */}
        <div className="flex py-4 sm:py-10 justify-center md:justify-end mx-auto sm:mx-4 md:mx-6 lg:mx-10 animate-fade-in-up order-1 sm:order-2 mb-4 sm:mb-0 absolute top-4 sm:top-auto sm:bottom-70 right-4 sm:right-6">
          <div className="relative group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 blur opacity-80 transform scale-110 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="absolute inset-0 rounded-full animate-pulse-slow bg-gradient-to-r from-blue-400/30 to-purple-500/30 blur-xl"></div>
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-48 xl:h-48 rounded-full object-cover border-4 border-white shadow-xl relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:border-blue-100"
            />
          </div>
        </div>
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font text-blue-100 flex flex-col ">
              <span className="text-2xl">Hi, I'm</span>
              <span className="hero-heading">
                {firstName.split('').map((char, index) =>
                  index === randomfnIndex ? <b key={index}>{char.toUpperCase()}</b> : char.toUpperCase()
                )}
              </span>
            </h1>

            {member.roles && (
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white/90 drop-shadow-lg mb-3 sm:mb-4 animate-fade-in-up delay-100">
                <Typewriter names={member.roles} typingSpeed={100} deletingSpeed={50} pauseTime={2000} />
              </h2>
            )}

            <Button
              id="download-resume"
              title="Download My Resume"
              containerClass="bg-yellow-300 flex-center gap-1"
              onClick={() => {
                const link = document.createElement("a");
                link.href = member.resume;
                link.download = `${member.name.split(" ").join("_")}_Resume.pdf`;
                link.click();
              }}
            />
          </div>
        </div>
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          {lastName.split('').map((char, index) =>
            index === randomlnIndex ? <b key={index}>{char.toUpperCase()}</b> : char.toUpperCase()
          )}
        </h1>
      </div>
      <div className=" absolute top-0 left-0 mt-24 px-5 sm:px-10">
        <h1 className="special-font text-black flex flex-col ">
          <span className="text-2xl">Hi, I'm</span>
          <span className="hero-heading">
            {firstName.split('').map((char, index) =>
              index === randomfnIndex ? <b key={index}>{char.toUpperCase()}</b> : char.toUpperCase()
            )}
          </span>
        </h1>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        {lastName.split('').map((char, index) =>
          index === randomlnIndex ? <b key={index}>{char.toUpperCase()}</b> : char.toUpperCase()
        )}
      </h1>
    </div>
  );
};

export default Hero;
