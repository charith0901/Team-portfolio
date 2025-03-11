import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { Mail, Github, Linkedin, MapPin, Award, Book, Code, Clock, Globe, Heart, User, Briefcase, GraduationCap, ChevronUp } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { teamMembers } from "../../data/Data";
import ProjectShowcase from '../project-showcase';

gsap.registerPlugin(ScrollTrigger);

const ProfileOverview = () => {
  const { username } = useParams();
  const member = teamMembers.find(member => member.username === username);
  const [activeSection, setActiveSection] = useState('about');
  
  // Refs for animations and sections
  const aboutSectionRef = useRef(null);
  const detailsSectionRef = useRef(null);
  const skillsSectionRef = useRef(null);
  const projectsSectionRef = useRef(null);
  
  const headerRef = useRef(null);
  const detailsRef = useRef(null);
  const skillsRef = useRef(null);
  const educationRef = useRef(null);
  const socialRef = useRef(null);
  
  // Main container ref for master ScrollTrigger timeline
  const mainContainerRef = useRef(null);

  // Handle scroll and set active section
  useEffect(() => {
    if (!member) return;
    
    const sections = [
      { id: 'about', ref: aboutSectionRef },
      { id: 'details', ref: detailsSectionRef },
      { id: 'skills', ref: skillsSectionRef },
      { id: 'projects', ref: projectsSectionRef }
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for better UX
      
      for (const section of sections) {
        if (!section.ref.current) continue;
        
        const sectionTop = section.ref.current.offsetTop;
        const sectionBottom = sectionTop + section.ref.current.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [member]);

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const sectionRefs = {
      about: aboutSectionRef,
      details: detailsSectionRef,
      skills: skillsSectionRef,
      projects: projectsSectionRef
    };
    
    if (sectionRefs[sectionId]?.current) {
      window.scrollTo({
        top: sectionRefs[sectionId].current.offsetTop,
        behavior: 'smooth'
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
      // Initial animations that don't depend on scroll
      
      // Header section animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out"
        }
      );

      // Details section with staggered children
      gsap.fromTo(
        detailsRef.current.children,
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.4,
          ease: "power1.out"
        }
      );

      // Skills cards animation with ScrollTrigger
      gsap.fromTo(
        skillsRef.current.children,
        { opacity: 0, scale: 0.8, y: 30 },
        {
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.5)"
        }
      );

      // Education items with ScrollTrigger
      if (educationRef.current) {
        gsap.fromTo(
          educationRef.current.children,
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: educationRef.current,
              start: "top 85%",
              end: "bottom 70%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
          }
        );
      }

      // Social links animation
      gsap.fromTo(
        socialRef.current.children,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.6,
          ease: "power2.out"
        }
      );

      // Parallax effect for about section
      ScrollTrigger.create({
        trigger: aboutSectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: self => {
          const progress = self.progress;
          gsap.to(aboutSectionRef.current.querySelector('.bg-white'), {
            y: progress * -30,
            duration: 0.1,
            ease: "none"
          });
        }
      });

      // Parallax effect for details section
      ScrollTrigger.create({
        trigger: detailsSectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: self => {
          const progress = self.progress;
          gsap.to(detailsSectionRef.current.querySelector('.bg-white'), {
            y: progress * -40,
            duration: 0.1,
            ease: "none"
          });
        }
      });

      // Add scroll-triggered animations for section titles
      const sections = [
        { ref: aboutSectionRef, selector: 'h2', delay: 0 },
        { ref: detailsSectionRef, selector: 'h2', delay: 0 },
        { ref: skillsSectionRef, selector: 'h2', delay: 0 }
      ];

      sections.forEach(section => {
        gsap.fromTo(
          section.ref.current.querySelector(section.selector),
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: section.ref.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: section.delay,
            ease: "power2.out"
          }
        );
      });

      // Projects section header animation
      gsap.fromTo(
        "#projects-header",
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: projectsSectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
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
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Team Member Not Found</h2>
        <p className="text-gray-600 mb-6">The team member you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Back to Team
        </Link>
      </div>
    );
  }

  // Main render
  return (
    <div className="relative bg-gray-50" ref={mainContainerRef}>
      {/* Fixed Navigation with Progress Indicator */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col gap-4 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg">  
          <button 
            onClick={() => scrollToSection('about')}
            title='about'
            className={`p-2 rounded-full transition-colors ${activeSection === 'about' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            aria-label="About section"
          >
            <User size={20} />
          </button>
          <button 
            onClick={() => scrollToSection('details')}
            title='details'
            className={`p-2 rounded-full transition-colors ${activeSection === 'details' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            aria-label="Details section"
          >
            <Briefcase size={20} />
          </button>
          <button 
            onClick={() => scrollToSection('skills')}
            title='skills'
            className={`p-2 rounded-full transition-colors ${activeSection === 'skills' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            aria-label="Skills section"
          >
            <Code size={20} />
          </button>
          <button 
            onClick={() => scrollToSection('projects')}
            title='projects'
            className={`p-2 rounded-full transition-colors ${activeSection === 'projects' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            aria-label="Projects section"
          >
            <GraduationCap size={20} />
          </button>
          <div className="w-full h-px bg-gray-200 my-1"></div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="Scroll to top"
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Scroll to top"
          >
            <ChevronUp size={20} />
          </button>
        </div>
      </div>
      
      {/* Header Section with Background Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-48 w-full relative">
        <div className="container mx-auto px-4 ">
          <Link 
            to="/" 
            className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm hover:bg-white/30 transition-colors"
          >
            ← Back to Team
          </Link>
        </div>
      </div>

      {/* About Section */}
      <section 
        ref={aboutSectionRef} 
        className="min-h-screen pt-24 pb-16 container mx-auto px-4"
      >
        {/* Profile Header */}
        <div 
          ref={headerRef}
          className="flex flex-col lg:flex-row items-center lg:items-end -mt-24 mb-8 px-4"
        >
          {/* Profile Image */}
          <div className="relative mb-4 lg:mb-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 blur-sm opacity-70 transform scale-105"></div>
            <img
              src={member.image}
              alt={member.name}
              className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-md relative"
            />
          </div>
          
          {/* Name and Roles */}
          <div className="lg:ml-8 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-gray-800">{member.name}</h1>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-3">
              {member.roles.map((role, index) => (
                <span 
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                >
                  {role}
                </span>
              ))}
            </div>
            {member.location && (
              <div className="flex items-center justify-center lg:justify-start mt-3 text-gray-600">
                <MapPin size={16} className="mr-1" />
                <span>{member.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* About & Contact */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-8">
          {/* Bio */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">About</h2>
            <p className="text-gray-600">{member.bio}</p>
          </div>
          
          {/* Contact Information */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
            <div ref={socialRef} className="flex flex-col gap-4">
              {member.social.github && (
                <a
                  href={member.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Github size={20} className="mr-2" />
                  <span>GitHub</span>
                </a>
              )}
              
              {member.social.linkedin && (
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Linkedin size={20} className="mr-2" />
                  <span>LinkedIn</span>
                </a>
              )}
              
              {member.social.email && (
                <a
                  href={`mailto:${member.social.email}`}
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Mail size={20} className="mr-2" />
                  <span>{member.social.email}</span>
                </a>
              )}
              
              {member.phone && (
                <div className="flex items-center text-gray-700">
                  <span className="mr-2">📱</span>
                  <span>{member.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Details Section */}
      <section 
        ref={detailsSectionRef} 
        className="min-h-screen py-16 bg-gray-100"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Professional Details</h2>
          
          <div className="bg-white rounded-xl shadow-md p-8">
            <div ref={detailsRef} className="space-y-8">
              {member.experienceLevel && (
                <div className="flex items-start">
                  <Code size={24} className="mr-4 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Experience Level</h3>
                    <p className="text-xl text-gray-800 mt-1">{member.experienceLevel}</p>
                  </div>
                </div>
              )}
              
              {member.yearsOfExperience != null && (
                <div className="flex items-start">
                  <Clock size={24} className="mr-4 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Years of Experience</h3>
                    <p className="text-xl text-gray-800 mt-1">{member.yearsOfExperience > 0 ? member.yearsOfExperience + ' years' : 'Studying'}</p>
                  </div>
                </div>
              )}
              
              {member.languages && member.languages.length > 0 && (
                <div className="flex items-start">
                  <Globe size={24} className="mr-4 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Languages</h3>
                    <p className="text-xl text-gray-800 mt-1">{member.languages.join(", ")}</p>
                  </div>
                </div>
              )}
              
              {member.availability && (
                <div className="flex items-start">
                  <Clock size={24} className="mr-4 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Availability</h3>
                    <p className="text-xl text-gray-800 mt-1">{member.availability}</p>
                  </div>
                </div>
              )}
              
              {member.interests && member.interests.length > 0 && (
                <div className="flex items-start">
                  <Heart size={24} className="mr-4 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Interests</h3>
                    <p className="text-xl text-gray-800 mt-1">{member.interests.join(", ")}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Education Section */}
      <section 
        ref={skillsSectionRef} 
        className="min-h-screen py-16"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Skills & Education</h2>
          
          <div className="bg-white rounded-xl shadow-md p-8">
            {/* Skills */}
            {member.skills && member.skills.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Skills</h3>
                <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {member.skills.map((skill) => (
                    <div
                      key={skill.language}
                      className="skill-card bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 border border-gray-700 hover:border-blue-500"
                    >
                      <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-500"></div>
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-2xl font-bold text-blue-400">{skill.language}</h3>
                          <span className="text-lg font-semibold bg-gray-700 px-3 py-1 rounded-full">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3 mb-6">
                          <div
                            className="skill-progress h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-500"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Education */}
            {member.education && member.education.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Education</h3>
                <div ref={educationRef} className="space-y-4">
                  {member.education.map((edu, index) => (
                    <div key={index} className="flex items-center bg-gray-50 p-4 rounded-lg">
                      <Book size={24} className="mr-4 text-blue-600" />
                      <div>
                        <div className="font-medium text-lg">{edu.college}</div>
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
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Awards</h3>
                <div className="space-y-4">
                  {member.awards.map((award, index) => (
                    <div key={index} className="flex items-center bg-gray-50 p-4 rounded-lg">
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
        ref={projectsSectionRef}
        className="h-lvw w-full relative bg-gray-800 py-8"
      >
        <div className="w-full h-full">
          <h1 id="projects-header" className="text-4xl font-bold text-white text-center mb-6">My Projects</h1>
          
          {/* Scroll Down Text */}
          <div className="text-center text-gray-300 text-sm mb-8 flex items-center justify-center">
            <span>Scroll down to explore</span>
          </div>
          
          {/* ProjectShowcase is rendered without wrapping it in animations that might interfere */}
          <ProjectShowcase projects={member.projects} />
        </div>
      </section>
    </div>
  );
};

export default ProfileOverview;