import React, { useEffect, useRef } from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const ProfileCard = ({ member, className = "" }) => {
  const { name, roles, image, bio, username } = member;
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const cardElement = cardRef.current;
    const imageElement = imageRef.current;
    const contentChildren = contentRef.current?.children;

    if (!cardElement || !imageElement || !contentChildren) return;

    const animations = [
      gsap.fromTo(
        cardElement,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: cardElement,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      ),
      gsap.fromTo(
        imageElement,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.3,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: cardElement,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      ),
      gsap.fromTo(
        contentChildren,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.5,
          scrollTrigger: {
            trigger: cardElement,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    ];

    // Cleanup function
    return () => {
      animations.forEach(animation => {
        if (animation.scrollTrigger) {
          animation.scrollTrigger.kill();
        }
        animation.kill();
      });
    };
  }, []);

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 z-0">
        {/* Floating particles/orbs background effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                backgroundColor: `rgb(${147 + ((i % 3) * 20)}, ${197 + ((i % 3) * 20)}, ${253 + ((i % 3) * -20)})`,
                animation: `float ${2.5 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2.5}s`
              }}
            ></div>
          ))}
        </div>
        <div
          ref={cardRef}
          className="w-full max-w-6xl mx-auto h-full flex flex-col items-center text-center justify-center gap-4 sm:gap-5 md:gap-6 relative z-10  p-3 sm:p-5 md:p-6 lg:p-8 rounded-xl border border-gray-700 lg:flex-row lg:text-left lg:gap-8"
        >
          <div ref={imageRef} className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 flex justify-center">
            <img
              src={image || "/api/placeholder/300/300"}
              alt={`${name}'s profile`}
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 xl:w-56 xl:h-56 object-cover rounded-full shadow-lg border-4 border-white"
            />
          </div>

          <div ref={contentRef} className="w-full lg:w-2/3 text-center lg:text-left p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-3 md:space-y-4">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-200">{name}</h3>
            <div className="flex flex-wrap justify-center lg:justify-start gap-1 sm:gap-2">
              {roles && roles.map((role, index) => (
                <span key={index} className="text-xs sm:text-sm md:text-base font-medium text-white bg-blue-500 px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 rounded-full">
                  {role}
                </span>
              ))}
            </div>
            <div className="mt-2 sm:mt-3 md:mt-4 pt-1 sm:pt-2">
              <Link to={`/member/${username || name.toLowerCase().replace(/\s+/g, '-')}`}>
                <button
                  className="relative flex items-center justify-center py-2 px-3 sm:py-2 sm:px-4 md:py-3 md:px-6 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md hover:bg-indigo-600 text-sm sm:text-base group w-full sm:w-auto"
                >
                  <span
                    className="absolute top-0 right-0 inline-block w-3 h-3 sm:w-4 sm:h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4"
                  >
                    <span
                      className="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                    ></span>
                  </span>
                  <span
                    className="absolute bottom-0 rotate-180 left-0 inline-block w-3 h-3 sm:w-4 sm:h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4"
                  >
                    <span
                      className="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                    ></span>
                  </span>
                  <span
                    className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"
                  ></span>
                  <span
                    className="relative w-full text-center text-white transition-colors duration-200 ease-in-out group-hover:text-white"
                  >View Portfolio</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes float {
            0% {
              transform: translateY(0px) translateX(0px);
            }
            50% {
              transform: translateY(-20px) translateX(10px);
            }
            100% {
              transform: translateY(0px) translateX(0px);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ProfileCard;