import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Code,
  User,
  Briefcase,
  Mail,
  Linkedin,
  Github,
  GraduationCap,
} from "lucide-react";
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

  // Section configuration for reusability
  const sections = [
    { id: "about", icon: User, label: "About section" },
    { id: "details", icon: Briefcase, label: "Details section" },
    { id: "skills", icon: Code, label: "Skills section" },
    { id: "projects", icon: GraduationCap, label: "Projects section" },
  ];

  // Handle scroll and set active section
  useEffect(() => {
    if (!member) return;

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
  const scrollToSection = (sectionId) => {
    if (sectionRefs[sectionId]?.current) {
      window.scrollTo({
        top: sectionRefs[sectionId].current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  // Enhanced animation setup with ScrollTrigger
  useEffect(() => {
    if (!member) return;

    // Reset scroll position when profile loads
    window.scrollTo(0, 0);

    // Create a context to contain all our ScrollTrigger animations
    const ctx = gsap.context(() => {
      // Header section animation
      gsap.fromTo(
        elementRefs.header.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out",
        }
      );

      // Details section with staggered children
      gsap.fromTo(
        elementRefs.details.current.children,
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.4,
          ease: "power1.out",
        }
      );

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

      // Education items with ScrollTrigger
      if (elementRefs.education.current) {
        gsap.fromTo(
          elementRefs.education.current.children,
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: elementRefs.education.current,
              start: "top 85%",
              end: "bottom 70%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      }

      // Social links animation
      gsap.fromTo(
        elementRefs.social.current.children,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.6,
          ease: "power2.out",
        }
      );

      // Parallax effects for sections
      const parallaxSections = ["about", "details"];

      parallaxSections.forEach((sectionId) => {
        ScrollTrigger.create({
          trigger: sectionRefs[sectionId].current.querySelector(".bg-white"),
          start: "top center",
          end: "top center",
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.to(sectionRefs[sectionId].current.querySelector(".bg-white"), {
              y: progress * -40,
              duration: 0.1,
              ease: "none",
            });
          },
        });
      });
    });

    // Cleanup function
    return () => ctx.revert();
  }, [member]);

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

  // Main render
  return (
    <>
      <MetaData member={member} />

      <div className="relative bg-gray-50" ref={elementRefs.mainContainer}>
        <Navigator
          member={member}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          sections={sections}
        />

        {/* Hero Section - Combined Banner and Cover Image */}
        <HeroSection
          member={member}
          elementRefs={elementRefs}
        />

        {/* About Section */}
        <AboutSection
          member={member}
          elementRefs={elementRefs}
          sectionRefs={sectionRefs}
        />

        {/* Professional Details Section */}
        <ProfessionalSection
          member={member}
          elementRefs={elementRefs}
          sectionRefs={sectionRefs}
        />

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
