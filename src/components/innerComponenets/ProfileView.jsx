import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  Award,
  Book,
  Code,
  Clock,
  Globe,
  Heart,
  User,
  Briefcase,
  GraduationCap,
  ChevronUp,
  Phone,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { teamMembers } from "../../data/Data";
import ProjectShowcase from "../project-showcase";

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
          trigger: sectionRefs[sectionId].current,
          start: "top bottom",
          end: "bottom top",
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

      // Add scroll-triggered animations for section titles
      Object.entries(sectionRefs)
        .slice(0, 3)
        .forEach(([id, ref]) => {
          gsap.fromTo(
            ref.current.querySelector("h2"),
            { opacity: 0, y: 20 },
            {
              scrollTrigger: {
                trigger: ref.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            }
          );
        });

      // Projects section header animation
      gsap.fromTo(
        "#projects-header",
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: sectionRefs.projects.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }
      );
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

  // Extract social links once to avoid repetition
  const { github, linkedin, email } = member.social || {};

  // Main render
  return (
    <>
      {/*meta data*/}
      <title>{member.name}</title>
      <meta name="title" content={member.name} />
      <meta
        name="description"
        content={`Portfolio of ${member.name} of DataDragons team showcasing projects and info`}
      />
      <meta
        name="keywords"
        content={`computer science , software engineering ,data science ,team ,projects ,DataDragons ${
          member.name
        } 
    , ${member.username} ,${
          member.roles && member.roles > 0 && member.roles.join(" , ")
        }
    `}
      />
      <meta name="author" content={member.name} />
      <meta name="robots" content="index, follow" />

      <div className="relative bg-gray-50" ref={elementRefs.mainContainer}>
        {/* Fixed Navigation with Progress Indicator */}
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
          <div className="flex flex-col gap-4 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg">
            {sections.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                title={id}
                className={`p-2 rounded-full transition-colors ${
                  activeSection === id
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                aria-label={label}
              >
                <Icon size={20} />
              </button>
            ))}
            <div className="w-full h-px bg-gray-200 my-1"></div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              title="Scroll to top"
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Scroll to top"
            >
              <ChevronUp size={20} />
            </button>
          </div>
        </div>

        {/* Hero Section - Combined Banner and Cover Image */}
        <div className="relative w-full min-h-[50vh] bg-gradient-to-br from-blue-600 to-purple-700 overflow-hidden">
          {/* Cover Image with Overlay */}
          {member.coverImage ? (
            <div className="absolute inset-0 z-0">
              <img
                src={member.coverImage}
                alt={`${member.name}'s cover`}
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-800/60 to-purple-900/60"></div>
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-purple-900 opacity-60 animate-gradient-x">
              <div className="absolute inset-0 pattern-dots pattern-white pattern-bg-transparent pattern-size-2 pattern-opacity-10"></div>
            </div>
          )}

          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-between py-8">
            <Link
              to="/"
              className="self-start bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-all duration-300 hover:shadow-xl flex items-center gap-2 transform hover:-translate-y-1"
            >
              <span className="inline-block transform translate-y-px">←</span>{" "}
              Back to Team
            </Link>

            <div className="text-white mt-auto mb-8 max-w-xl">
              {member.roles && (
                <h2 className="text-2xl md:text-3xl font-bold drop-shadow-lg mb-2 animate-fade-in-up">
                  {member.roles.join(" • ")}
                </h2>
              )}
              <div className="h-1 w-20 bg-white/40 rounded mb-4 animate-fade-in"></div>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-lg drop-shadow-md hidden md:block animate-fade-in-delayed">
                Explore {member.name}'s profile, skills, and projects.
              </p>
            </div>
          </div>

          {/* Wave Shape Divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="w-full h-[60px] md:h-[80px] text-gray-50"
            >
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                className="fill-current"
              ></path>
            </svg>
          </div>
        </div>

        {/* About Section */}
        <section
          ref={sectionRefs.about}
          className="min-h-screen pt-28 pb-20 container mx-auto px-4 md:px-8 bg-gray-50"
        >
          {/* Profile Header */}
          <div
            ref={elementRefs.header}
            className="flex flex-col lg:flex-row items-center lg:items-end -mt-32 mb-10 px-6 sm:px-8 animate-fade-in-up"
          >
            {/* Profile Image with Animation */}
            <div className="relative mb-6 lg:mb-0 group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 blur opacity-80 transform scale-110 group-hover:scale-115 transition-transform duration-500"></div>
              <div className="absolute inset-0 rounded-full animate-pulse-slow bg-gradient-to-r from-blue-400/30 to-purple-500/30 blur-xl"></div>
              <img
                src={member.image}
                alt={member.name}
                className="w-40 h-40 sm:w-44 sm:h-44 rounded-full object-cover border-4 border-white shadow-xl relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:border-blue-100"
              />
            </div>

            {/* Name and Roles */}
            <div className="lg:ml-10 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
                {member.name}
              </h1>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-4">
                {member.roles.map((role, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm hover:shadow-md hover:bg-blue-200 transition-all duration-300 cursor-default"
                  >
                    {role}
                  </span>
                ))}
              </div>
              {member.location && (
                <div className="flex items-center justify-center lg:justify-start mt-4 text-gray-600">
                  <MapPin size={18} className="mr-2 text-blue-500" />
                  <span className="font-medium">{member.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* About & Contact */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mt-8 border border-gray-100 transition-all duration-300 hover:shadow-xl">
            {/* Bio with subtle animation */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center group">
                <span className="relative">
                  About
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {member.bio}
              </p>
            </div>

            {/* Contact Information with hover effects */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center group">
                <span className="relative">
                  Contact Information
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </span>
              </h2>
              <div ref={elementRefs.social} className="flex flex-col gap-5">
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors group"
                  >
                    <div className="bg-gray-100 p-3 rounded-full mr-4 group-hover:bg-blue-100 transition-all duration-300 transform group-hover:scale-110">
                      <Github
                        size={22}
                        className="group-hover:text-blue-600 transition-colors"
                      />
                    </div>
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">
                      GitHub
                    </span>
                  </a>
                )}

                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors group"
                  >
                    <div className="bg-gray-100 p-3 rounded-full mr-4 group-hover:bg-blue-100 transition-all duration-300 transform group-hover:scale-110">
                      <Linkedin
                        size={22}
                        className="group-hover:text-blue-600 transition-colors"
                      />
                    </div>
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">
                      LinkedIn
                    </span>
                  </a>
                )}

                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors group"
                  >
                    <div className="bg-gray-100 p-3 rounded-full mr-4 group-hover:bg-blue-100 transition-all duration-300 transform group-hover:scale-110">
                      <Mail
                        size={22}
                        className="group-hover:text-blue-600 transition-colors"
                      />
                    </div>
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">
                      {email}
                    </span>
                  </a>
                )}

                {member.phone && (
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors group"
                  >
                    <div className="bg-gray-100 p-3 rounded-full mr-4 group-hover:bg-blue-100 transition-all duration-300 transform group-hover:scale-110">
                      <Phone
                        size={22}
                        className="group-hover:text-blue-600 transition-colors"
                      />
                    </div>
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">
                      {member.phone}
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Professional Details Section */}
        <section
          ref={sectionRefs.details}
          className="min-h-screen py-16 bg-gray-50"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Professional Details
            </h2>

            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <div ref={elementRefs.details} className="space-y-8">
                {/* Details rendered using consistent pattern to avoid duplication */}
                {member.experienceLevel && (
                  <div className="flex items-start">
                    <Code size={24} className="mr-4 text-blue-600 mt-1" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-700">
                        Experience Level
                      </h3>
                      <p className="text-xl text-gray-800 mt-1">
                        {member.experienceLevel}
                      </p>
                    </div>
                  </div>
                )}

                {member.yearsOfExperience != null && (
                  <div className="flex items-start">
                    <Clock size={24} className="mr-4 text-blue-600 mt-1" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-700">
                        Years of Experience
                      </h3>
                      <p className="text-xl text-gray-800 mt-1">
                        {member.yearsOfExperience > 0
                          ? member.yearsOfExperience + " years"
                          : "Studying"}
                      </p>
                    </div>
                  </div>
                )}

                {member.languages && member.languages.length > 0 && (
                  <div className="flex items-start">
                    <Globe size={24} className="mr-4 text-blue-600 mt-1" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-700">
                        Languages
                      </h3>
                      <p className="text-xl text-gray-800 mt-1">
                        {member.languages.join(", ")}
                      </p>
                    </div>
                  </div>
                )}

                {member.availability && (
                  <div className="flex items-start">
                    <Clock size={24} className="mr-4 text-blue-600 mt-1" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-700">
                        Availability
                      </h3>
                      <p className="text-xl text-gray-800 mt-1">
                        {member.availability}
                      </p>
                    </div>
                  </div>
                )}

                {member.interests && member.interests.length > 0 && (
                  <div className="flex items-start">
                    <Heart size={24} className="mr-4 text-blue-600 mt-1" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-700">
                        Interests
                      </h3>
                      <p className="text-xl text-gray-800 mt-1">
                        {member.interests.join(", ")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Skills & Education Section */}
        <section
          ref={sectionRefs.skills}
          className="min-h-screen py-16 bg-gray-50"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Skills & Education
            </h2>

            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              {/* Skills */}
              {member.skills && member.skills.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                    Skills
                  </h3>
                  <div
                    ref={elementRefs.skills}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {member.skills.map((skill) => (
                      <div
                        key={skill.language}
                        className="skill-card bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 border border-gray-700 hover:border-blue-500"
                      >
                        <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-500"></div>
                        <div className="p-6">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold text-blue-400">
                              {skill.language}
                            </h3>
                            {skill.level !== undefined &&
                              skill.level !== null && (
                                <span className="text-lg font-semibold bg-gray-700 px-3 py-1 rounded-full">
                                  {skill.level}%
                                </span>
                              )}
                          </div>
                          {skill.level !== undefined &&
                            skill.level !== null && (
                              <div className="w-full bg-gray-700 rounded-full h-3 mb-6">
                                <div
                                  className="skill-progress h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-500"
                                  style={{ width: `${skill.level}%` }}
                                />
                              </div>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {member.education && member.education.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                    Education
                  </h3>
                  <div ref={elementRefs.education} className="space-y-4">
                    {member.education.map((edu, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-gray-50 p-4 rounded-lg"
                      >
                        <Book size={24} className="mr-4 text-blue-600" />
                        <div>
                          <div className="font-medium text-lg">
                            {edu.college}
                          </div>
                          <div className="text-gray-500">{edu.year}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Awards */}
              {member.awards && member.awards.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                    Awards
                  </h3>
                  <div className="space-y-4">
                    {member.awards.map((award, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-gray-50 p-4 rounded-lg"
                      >
                        <Award size={24} className="mr-4 text-blue-600" />
                        <span className="text-lg text-gray-800">{award}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          ref={sectionRefs.projects}
          className="min-h-screen w-full relative bg-gray-800 py-12"
        >
          <div className="w-full h-full">
            <h1
              id="projects-header"
              className="text-4xl font-bold text-white text-center mb-6"
            >
              My Projects
            </h1>

            {/* Scroll Down Text */}
            <div className="text-center text-gray-300 text-sm mb-8 flex items-center justify-center">
              <span>Scroll down to explore</span>
            </div>

            {/* ProjectShowcase is rendered without wrapping it in animations that might interfere */}
            <ProjectShowcase projects={member.projects} />
          </div>
        </section>
      </div>
    </>
  );
};

export default ProfileOverview;
