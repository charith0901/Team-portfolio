import React, { useState, useEffect } from "react";
import ProjectCard from "./project-card";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Project Showcase Component
const ProjectShowcase = ({ projects = [] }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const nextSlide = () => {
    if (!isAnimating && projects.length > 1) {
      setIsAnimating(true);
      setActiveSlide((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 600);
    }
  };
  
  const prevSlide = () => {
    if (!isAnimating && projects.length > 1) {
      setIsAnimating(true);
      setActiveSlide((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
      setTimeout(() => setIsAnimating(false), 600);
    }
  };
  
  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (projects.length > 1) {
        nextSlide();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeSlide, isAnimating]);

  return (
    <main className="w-full relative overflow-hidden min-h-screen bg-gray-800">
      {/* Project Cards */}
      <div className="relative w-full">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title || `Project ${index + 1}`}
            description={project.description || "A cutting-edge project showcasing the latest technologies and innovative design."}
            image={project.image}
            tags={project.tags || ["Web Development", "UI/UX", "React"]}
            isActive={index === activeSlide}
          />
        ))}
      </div>
      
      {/* Navigation buttons - only show if there's more than one project */}
      {projects.length > 1 && (
        <>
          <button 
            onClick={prevSlide} 
            className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 text-white p-3 rounded-full z-50 focus:outline-none transition-all duration-300"
          >
            <ArrowLeft className="h-3 w-3 text-gray-800" />
          </button>
          
          <button 
            onClick={nextSlide} 
            className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 text-white p-3 rounded-full z-50 focus:outline-none transition-all duration-300"
          >
             <ArrowRight className="h-3 w-3 text-gray-800" />
          </button>
        </>
      )}
      
      {/* Indicators - only show if there's more than one project */}
      {projects.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-50">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setActiveSlide(index);
                  setTimeout(() => setIsAnimating(false), 600);
                }
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeSlide ? "bg-white scale-125" : "bg-white bg-opacity-50"
              }`}
              aria-label={`Go to project ${index + 1}`}
            ></button>
          ))}
        </div>
      )}

      {/* CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes patternMove {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 200% 200%;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(1.1);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes tagFade {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-content-fade > * {
          animation: slideIn 0.5s ease-out forwards;
          animation-delay: calc(var(--index, 0) * 0.1s);
        }
        
        .animate-tag-fade {
          animation: tagFade 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </main>
  );
};

export default ProjectShowcase;