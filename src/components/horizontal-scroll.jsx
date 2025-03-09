import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { teamMembers } from '../data/Data';
import ProfileCard from "./profile-card";
import SkillShowcaseParallax from "./skill-scroll";
import ProjectShowcase from "./project-showcase";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
  const scrollContainerRef = useRef(null);
  const panelRefs = useRef([]);

  useGSAP(() => {
    const container = scrollContainerRef.current;
    const panels = panelRefs.current;
    const totalWidth = (panels.length - 1) * 100;

    gsap.to(panels, {
      xPercent: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => "+=" + container.offsetWidth,
        invalidateOnRefresh: true,
        refreshPriority: 1,
      }
    });
  }, { scope: scrollContainerRef });

  const addPanelRef = (el) => {
    if (el && !panelRefs.current.includes(el)) {
      panelRefs.current.push(el);
    }
  };

  return (
    <main className="w-full">
      <section id="team" className="h-full w-full relative flex items-center justify-center bg-gray-800 py-8">
        <h1 className="text-4xl font-bold text-white">Team Members</h1>
      </section>
      <section
        ref={scrollContainerRef}
        className="relative h-screen overflow-hidden bg-neutral-100"
      >
        <div className="absolute h-full flex">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              ref={addPanelRef}
              className="h-full w-screen flex items-center justify-center shrink-0"
            >
              <div className="w-full h-full bg-blue-400 shadow-lg p-4">
                {member.name &&
                <ProfileCard key={member.name} member={member} />
}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HorizontalScroll;