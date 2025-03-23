import React from "react";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

// ProjectCard Component
const ProjectCard = ({ title, description, image, tags, isActive }) => {
  return (
    <div 
      className={`absolute inset-0 min-h-screen flex items-center justify-center p-8 transition-all duration-700 ease-in-out ${
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      }`}
    >
      {/* Background with gradient and pattern */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 z-0 overflow-hidden"
        style={{
          backgroundImage: "url('/images/pattern.jpg')",
          backgroundSize: "cover",
          opacity: 0.1,
          animation: "patternMove 20s linear infinite"
        }}
      >
      </div>

      {/* Main card content */}
      <div
        className={`relative overflow-hidden rounded-3xl sm:rounded-4xl shadow-2xl  bg-gray-900/70 border border-gray-700 hover:border-blue-500 transition-all duration-500 max-w-7xl ${
          isActive ? "scale-100" : "scale-95"
        }`}
      >
        {/* Full width background image with overlay */}
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src={image || "/api/placeholder/1200/600"}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-gray-900/80" />
        </div>

        {/* Content container */}
        <div className="relative z-10 flex flex-col md:flex-row items-center p-4 sm:p-6 md:p-8 lg:p-12">
          {/* Image on the side for md+ screens */}
          <div className="w-full md:w-2/5 mb-6 md:mb-0 animate-fade-in">
            <img
              src={image || "/api/placeholder/600/600"}
              alt={title}
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 lg:w-64 lg:h-64 mx-auto object-cover rounded-xl sm:rounded-2xl shadow-lg border-2 border-gray-200/30 transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Content section */}
          <div className="w-full md:w-3/5 text-center md:text-left md:pl-6 lg:pl-12 space-y-3 sm:space-y-4 lg:space-y-6 animate-content-fade">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">{title}</h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">{description}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-1.5 sm:gap-2 pt-2">
              {tags && tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="text-xs sm:text-sm font-medium text-white bg-blue-600/80 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full  shadow-md "
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="pt-3 sm:pt-4">
              <Link
                to={`/project/${title}`}
                className="inline-flex items-center gap-1.5 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-full transition-all duration-300 shadow-lg">
                View Project <ExternalLink size={16} className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
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
    </div>
  );
};

export default ProjectCard;