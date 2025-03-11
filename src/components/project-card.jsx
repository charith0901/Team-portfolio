import React, { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ title, description, image, tags }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const tagsRef = useRef(null);
  const patternRef = useRef(null)

  useEffect(() => {
    // Background pattern animation
    gsap.to(patternRef.current, {
      backgroundPosition: "200% 200%",
      duration: 20,
      repeat: -1,
      ease: "linear",
    });


    // Card entrance animation
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Image reveal animation
    gsap.fromTo(
      imageRef.current,
      { scale: 1.1, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Content animation with stagger
    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.3,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Tags animation
    gsap.fromTo(
      tagsRef.current.children,
      { opacity: 0, scale: 0.8, y: 10 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        delay: 0.6,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Hover animation setup
    const card = cardRef.current;
    
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -8,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        duration: 0.3,
      });
      
      gsap.to(imageRef.current, {
        scale: 1.05,
        duration: 0.4,
      });
    });
    
    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        duration: 0.3,
      });
      
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.4,
      });
    });

    return () => {
      // Cleanup event listeners
      card.removeEventListener("mouseenter", () => {});
      card.removeEventListener("mouseleave", () => {});
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative">
      {/* Background with gradient and pattern */}
      <div 
        ref={patternRef}
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 z-0 overflow-hidden"
        style={{
          backgroundImage: "url('/images/pattern.jpg')",
          backgroundSize: "cover",
          opacity: 0.1
        }}
        
      >
      </div>

      {/* Main card content */}
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-2xl shadow-2xl backdrop-blur-lg bg-gray-900/70 border border-gray-700 hover:border-blue-500 transition-all duration-300"
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
          <div className="relative z-10 flex flex-col md:flex-row items-center p-8 md:p-12">
            {/* Image on the side for md+ screens */}
            <div ref={imageRef} className="w-full md:w-2/5 mb-8 md:mb-0">
              <img
                src={image || "/api/placeholder/600/600"}
                alt={title}
                className="w-64 h-64 mx-auto object-cover rounded-2xl shadow-lg border-2 border-gray-200/30"
              />
            </div>

            {/* Content section */}
            <div ref={contentRef} className="w-full md:w-3/5 text-center md:text-left md:pl-12 space-y-6">
              <h3 className="text-4xl md:text-5xl font-bold text-white">{title}</h3>
              <p className="text-xl text-gray-300 leading-relaxed">{description}</p>
              
              <div ref={tagsRef} className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                {tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="text-sm font-medium text-white bg-blue-600/80 px-4 py-2 rounded-full backdrop-blur-sm shadow-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="pt-4">
                <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 shadow-lg">
                  View Project <ExternalLink size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      
      {/* Add some CSS for the floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectCard;