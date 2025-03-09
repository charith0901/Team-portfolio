import React, { useEffect, useRef } from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const ProfileCard = ({ member }) => {
  const { name, roles, image, bio } = member;
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 0.3,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.5,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <Link to={`member/${member.username}`} 
    className="min-h-screen flex items-center justify-center p-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 z-0">
      {/* Floating particles/orbs background effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-20 bg-blue-${300 + ((i % 3) * 100)}`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              animation: `float ${2.5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2.5}s`
            }}
          ></div>
        ))}
      </div>
      <div
        ref={cardRef}
        className="w-full h-full flex flex-col items-center text-center justify-center space-y-8 relative z-10 backdrop-blur-sm bg-gray-100/0.5 p-10 rounded-xl border border-gray-700"
        >
        <div ref={imageRef} className="w-1/3 flex justify-center">
          <img
            src={image || "/api/placeholder/300/300"}
            alt={`${name}'s profile`}
            className="w-60 h-60 object-cover rounded-full shadow-lg border-4 border-white"
          />
        </div>

        <div ref={contentRef} className="w-2/3 text-center md:text-left p-6 space-y-4">
          <h3 className="text-5xl font-bold text-gray-200">{name}</h3>
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {roles.map((role) => (
              <span key={role} className="text-lg font-medium text-white bg-blue-400 px-4 py-2 rounded-full">
                {role}
              </span>
            ))}
          </div>
          <p className="text-lg text-gray-300 leading-relaxed">{bio}</p>
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
           
          </div>
        </div>
      </div>
      {/* Add custom CSS for the floating animation */}
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
