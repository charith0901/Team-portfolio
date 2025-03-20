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
    <Link to={`/member/${username || name.toLowerCase().replace(/\s+/g, '-')}`} 
      className={`min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 relative ${className}`}>
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
          className="w-full max-w-6xl mx-auto h-full flex flex-col items-center text-center justify-center gap-6 relative z-10 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl border border-gray-700 lg:flex-row lg:text-left lg:gap-8"
        >
          <div ref={imageRef} className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 flex justify-center">
            <img
              src={image || "/api/placeholder/300/300"}
              alt={`${name}'s profile`}
              className="w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 lg:w-56 lg:h-56 xl:w-60 xl:h-60 object-cover rounded-full shadow-lg border-4 border-white"
            />
          </div>

          <div ref={contentRef} className="w-full lg:w-2/3 text-center lg:text-left p-2 sm:p-4 md:p-6 space-y-2 sm:space-y-3 md:space-y-4">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-200">{name}</h3>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {roles && roles.map((role, index) => (
                <span key={index} className="text-sm sm:text-base md:text-lg font-medium text-white bg-blue-500 px-3 py-1 sm:px-4 sm:py-2 rounded-full">
                  {role}
                </span>
              ))}
            </div>
            <div className="flex justify-center lg:justify-start space-x-4 mt-4">
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
    </Link>
  );
};

export default ProfileCard;