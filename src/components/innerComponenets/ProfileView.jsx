import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { teamMembers, projects } from "../../data/Data";
import ProjectShowcase from "../project-showcase";
import MetaData from "./profileComponents/MetaData";
import Navigator from "./profileComponents/Navigator";
import HeroSection from "./profileComponents/HeroSection";
import AboutSection from "./profileComponents/AboutSection";
import ProfessionalSection from "./profileComponents/ProfessionalSection";
import SkillSection from "./profileComponents/SkillSection";
import AnimatedTitle from "../AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const ProfileOverview = () => {
  const { username } = useParams();
  const member = teamMembers.find((member) => member.username === username);
  const [activeSection, setActiveSection] = useState("about");

  // Create a structure for section management
  const sectionRefs = {
    about: useRef(null),
    details: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
  };

  // Refs for animations
  const elementRefs = {
    header: useRef(null),
    details: useRef(null),
    skills: useRef(null),
    education: useRef(null),
    social: useRef(null),
    mainContainer: useRef(null),
  };

  // Handle scroll and set active section
  useEffect(() => {
    if (!member) return;
    window.scrollTo(0, 0);
    const sectionEntries = Object.entries(sectionRefs).map(([id, ref]) => ({
      id,
      ref,
    }));

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for better UX

      for (const section of sectionEntries) {
        if (!section.ref.current) continue;

        const sectionTop = section.ref.current.offsetTop;
        const sectionBottom = sectionTop + section.ref.current.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [member]);

  // Scroll to section - simplified with sectionRefs object


  useEffect(() => {
    if (!member) return;
    // Create a context to contain all our ScrollTrigger animations
    const ctx = gsap.context(() => {

      // Skills cards animation with ScrollTrigger
      gsap.fromTo(
        elementRefs.skills.current.children,
        { opacity: 0, scale: 0.8, y: 30 },
        {
          scrollTrigger: {
            trigger: elementRefs.skills.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.5)",
        }
      );
    });

    // Cleanup function
    return () => ctx.revert();
  }, [member]);
      useEffect(() => {
          gsap.set(".frame-left", {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          });
          gsap.from(".frame-left", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: ".reveal-section-left",
              start: "top top",
              end: "bottom top",
              scrub: true,
              pin:true,
            },
          },
        );
        gsap.set(".frame-right", {
          clipPath: "polygon(100% 100%, 100% 0%, 100% 0%, 100% 100%)",
        });
        gsap.from(".frame-right", {
          clipPath: "polygon(0% 100%, 0% 0%, 100% 0%, 100% 100%)",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".reveal-section-right",
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
          },
        });
        },[]);

  // Error state - Member not found
  if (!member) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Team Member Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The team member you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Team
        </Link>
      </div>
    );
  }

  return (
    <>
      <MetaData member={member} />

      <div className="relative bg-gray-50" ref={elementRefs.mainContainer}>
        <Navigator
          member={member}
          activeSection={activeSection}
          sectionRefs={sectionRefs}
        />

        {/* Hero Section - Combined Banner and Cover Image */}
        <HeroSection
          member={member}
          elementRefs={elementRefs}
        />

        {/* About Section */}
        <section className="relative w-full h-screen flex items-center justify-center reveal-section-left">
          <AboutSection
            member={member}
            elementRefs={elementRefs}
            sectionRefs={sectionRefs}
            containerClass="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 frame-left"
            type="light"
          />
          <AboutSection
            member={member}
            elementRefs={elementRefs}
            sectionRefs={sectionRefs}
            containerClass="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
            type="dark"
          />
        </section>

        {/* Professional Details Section */}
        <section className="relative w-full min-h-screen flex items-center justify-center reveal-section-right bg-gray-300">
        <ProfessionalSection
          member={member}
          elementRefs={elementRefs}
          sectionRefs={sectionRefs}
          containerClass="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 frame-right"
          type="dark"
        />
        <ProfessionalSection
          member={member}
          elementRefs={elementRefs}
          sectionRefs={sectionRefs}
          containerClass="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
          type="light"
        />
        </section>

        {/* Skills & Education Section */}
        <SkillSection
          member={member}
          elementRefs={elementRefs}
          sectionRefs={sectionRefs}
        />

        {/* Projects Section */}
        <section
          ref={sectionRefs.projects}
          className="min-h-screen w-full relative py-12"
        >
          <div className="w-full h-full">
            <AnimatedTitle
              title=" Pro<b>j</b>ets"
              containerClass="mt-5 !text-black text-center"
            />

            {/* Scroll Down Text */}
            <div className="text-center font-zentry font-bold text-gray-500 text-sm mb-8 flex items-center justify-center">
              <span>Scroll down to explore</span>
            </div>

            {/* ProjectShowcase is rendered without wrapping it in animations that might interfere */}
            <ProjectShowcase projects={member.projects.concat(projects)} />
          </div>
        </section>
      </div>
    </>
  );
};

export default ProfileOverview;
