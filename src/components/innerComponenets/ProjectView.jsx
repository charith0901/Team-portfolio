import React, { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { teamMembers, projects } from "../../data/Data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Github, ExternalLink, ArrowLeft, Code, Layers, Cpu } from "lucide-react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ProjectView = () => {
  const { title } = useParams();
  const headerRef = useRef(null);
  const detailsRef = useRef(null);
  const techRef = useRef(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Find project in data
  let project = projects.find(project => project.title === title);
  if (!project) {
    const member = teamMembers.find(member => 
      member.projects?.some(proj => proj.title === title)
    );
    project = member?.projects.find(proj => proj.title === title);
  }

  // GSAP animations
  useGSAP(() => {
    if (!project) return;

    // Header animations
    gsap.from(headerRef.current.querySelectorAll("h1, p"), {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out"
    });

    // Details section animations
    gsap.from(detailsRef.current.querySelector("img"), {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: detailsRef.current,
        start: "top center",
        toggleActions: "play none none reverse"
      }
    });

    gsap.from(detailsRef.current.querySelectorAll("h2, li"), {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: detailsRef.current.querySelector("h2"),
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
      }
    });

    // Tech section animations
    gsap.from(techRef.current.querySelectorAll("h2, .tech-badge, .btn-group"), {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      scrollTrigger: {
        trigger: techRef.current,
        start: "top center+=100",
        toggleActions: "play none none reverse"
      }
    });
  }, [project]);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 text-center bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Project Not Found</h2>
          <p className="text-gray-600 mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="group flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <ArrowLeft className="mr-2 h-5 w-5 group-hover:translate-x-[-4px] transition-transform" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Project Header */}
      <div 
        ref={headerRef}
        className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            {project.title}
          </h1>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed text-blue-100">
            {project.description}
          </p>
          
          {/* GitHub & Content Links */}
          <div className="flex gap-6 mt-8 justify-center">
            <a 
              href={project.link.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center justify-center px-8 py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors shadow-lg hover:shadow-xl"
            >
              <Github className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              GitHub Repository
            </a>
            <a 
              href={project.link.content} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <ExternalLink className="mr-2 h-5 w-5 group-hover:translate-x-1 group-hover:translate-y-[-1px] transition-transform" />
              Live Demo
            </a>
          </div>

          <div className="mt-12 animate-bounce">
            <ArrowLeft className="transform rotate-270 mx-auto text-blue-200" />
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div 
        ref={detailsRef}
        className="min-h-screen flex flex-col justify-center items-center p-6 md:p-12 bg-white text-gray-800"
      >
        <div className="max-w-4xl w-full">
          <img 
            src={project.image} 
            alt={project.title} 
            className="rounded-xl shadow-xl w-full max-w-2xl mx-auto object-cover hover:shadow-2xl transition-shadow duration-300" 
          />
          
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mt-6 inline-flex items-center">
              <Layers className="mr-3 text-blue-600" />
              Key Features
            </h2>
            <ul className="mt-8 space-y-4 max-w-2xl mx-auto">
              {project.features?.map((feature, index) => (
                <li 
                  key={index} 
                  className="text-gray-700 bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-start"
                >
                  <Code className="mr-3 text-blue-600 flex-shrink-0 mt-1" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Technologies & Links */}
      <div 
        ref={techRef}
        className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-50 to-gray-100 p-6 md:p-12 text-gray-800"
      >
        <div className="max-w-4xl w-full text-center">
          <h2 className="text-3xl font-bold inline-flex items-center">
            <Cpu className="mr-3 text-blue-600" />
            Technologies Used
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3 mt-8 tech-badge">
            {project.languages?.map((lang, index) => (
              <span 
                key={index} 
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all hover:translate-y-[-2px]"
              >
                {lang}
              </span>
            ))}
          </div>
          
          <div className="mt-16">
            <Link 
              to="/" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
