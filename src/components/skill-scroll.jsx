import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

export default function SkillShowcaseParallax() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const heroTextRef = useRef(null);
  const introRef = useRef(null);
  const skillsRef = useRef(null);
  const skillItemsRef = useRef([]);

  const [activeSkill, setActiveSkill] = useState(null);

  // Expanded skills data with descriptions and icons
  const programmingSkills = [
    {
      language: "JavaScript",
      level: 90,
      description: "Building interactive web applications and dynamic user interfaces.",
      color: "from-yellow-400 to-yellow-500",
      textColor: "text-yellow-400"
    },
    {
      language: "Python",
      level: 85,
      description: "Data analysis, backend development, and automation scripts.",
      color: "from-blue-400 to-blue-500",
      textColor: "text-blue-400"
    },
    {
      language: "React",
      level: 88,
      description: "Creating responsive, component-based frontend applications.",
      color: "from-cyan-400 to-cyan-500",
      textColor: "text-cyan-400"
    },
    {
      language: "Node.js",
      level: 82,
      description: "Developing scalable server-side applications and APIs.",
      color: "from-green-400 to-green-500",
      textColor: "text-green-400"
    },
    {
      language: "TypeScript",
      level: 80,
      description: "Type-safe development for large-scale applications.",
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-500"
    }
  ];

  useGSAP(() => {
    // Hero animation with parallax - synchronize with main scroll
    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        pinSpacing: true,
        refreshPriority: 2, // Higher priority for better synchronization
        invalidateOnRefresh: true,
      }
    });

    // Animate hero text
    heroTimeline.to(heroTextRef.current, {
      opacity: 0,
      y: -100,
      scale: 0.8,
      duration: 1
    });

    // Hero background parallax
    heroTimeline.to(".hero-image", {
      y: 200,
      scale: 1.1,
      duration: 1
    }, 0);

    // Intro animation with standard animations instead of split text
    const introTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: introRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true, // Changed to true for better sync with main scroll
        refreshPriority: 2,
      }
    });

    // Simple animation for intro title
    introTimeline.from(".intro-title", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "back.out(1.7)"
    });

    // Simple animation for intro paragraphs
    introTimeline.from(".intro-para", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4");

    // Skills section animations - improved sync
    const skillsTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: skillsRef.current,
        start: "top 70%",
        end: "bottom bottom",
        scrub: 0.5, // Add scrub for smoother sync
        toggleActions: "play none none reverse",
        refreshPriority: 2,
      }
    });

    // Animate skills title
    skillsTimeline.from(".skills-title", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out"
    });


    // Progress bar animations
    skillsTimeline.from(".skill-progress", {
      width: 0,
      stagger: 0.12,
      duration: 1.2,
      ease: "power2.inOut"
    }, "-=0.6");

    // Scroll cue animation in hero section
    gsap.to(".scroll-cue", {
      y: 15,
      opacity: 0.6,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: "power1.inOut"
    });

  }, []);

  // Handle hover interactions for skill cards
  const handleSkillHover = (index) => {
    setActiveSkill(index);

    gsap.to(`.skill-card:nth-child(${index + 1})`, {
      scale: 1.05,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleSkillLeave = (index) => {
    setActiveSkill(null);

    gsap.to(`.skill-card:nth-child(${index + 1})`, {
      scale: 1,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <div ref={containerRef} className="bg-gray-900 text-white overflow-hidden">
      {/* Hero Section with Parallax */}
      <div ref={heroRef} className="h-screen flex items-center justify-center relative overflow-hidden">
        <img
          src="/images/hero.webp"
          alt="Hero"
          className="hero-image absolute inset-0 w-full h-full object-cover opacity-40 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 z-0"></div>

        <div ref={heroTextRef} className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Crafting Digital Experiences
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-2xl mx-auto">
            Bringing innovative ideas to life with cutting-edge technology and creative solutions
          </p>
          <div className="scroll-cue flex flex-col items-center mt-12 opacity-80">
            <p className="mb-2 text-sm uppercase tracking-widest">Scroll to explore</p>
            <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Introduction Section with Depth Effects */}
      <div
        ref={introRef}
        className="min-h-screen flex items-center justify-center p-8 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 z-0"></div>

        {/* Floating particles/orbs background effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div key={i}
              className={`absolute rounded-full opacity-20 bg-blue-${300 + ((i % 3) * 100)}`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                animation: `float ${2.5 + Math.random() * 5}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2.5}s`
              }}
            ></div>
          ))}
        </div>

        <div className="max-w-7xl text-center space-y-8 relative z-10 backdrop-blur-sm bg-gray-800/30 p-10 rounded-xl border border-gray-700">
          <h2 className="intro-title text-4xl md:text-5xl font-bold text-blue-400">
            Who We Are
          </h2>
          <p className="intro-para text-xl leading-relaxed">
            We are a dynamic team of developers and designers passionate about
            creating innovative digital solutions. Our diverse skill set allows us
            to tackle complex challenges and deliver exceptional results.
          </p>
          <p className="intro-para text-xl leading-relaxed">
            With years of experience in the industry, we bring a unique perspective
            to every project, combining technical expertise with creative thinking.
          </p>
        </div>
      </div>

      {/* Skills Section with Interactive Cards */}
      <div
        ref={skillsRef}
        className="min-h-screen flex flex-col items-center justify-center p-8 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 z-0"></div>

        <AnimatedTitle
          title={"Our Exper<b>tis</b>e"}
          containerClass={"skills-title  text-gradient-to-r from-blue-400 to-purple-500 relative z-10"}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full relative z-10">
          {programmingSkills.map((skill, index) => (
            <div
              key={skill.language}
              className={`skill-card bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 border border-gray-700 hover:border-${skill.color.split(' ')[1]}`}
              onMouseEnter={() => handleSkillHover(index)}
              onMouseLeave={() => handleSkillLeave(index)}
              ref={(el) => (skillItemsRef.current[index] = el)}
            >
              <div className={`h-2 bg-gradient-to-r ${skill.color}`}></div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-2xl text-gray-50 font-bold ${skill.textColor}`}>{skill.language}</h3>
                  <span className="text-lg font-semibold bg-gray-700 px-3 py-1 rounded-full">
                    {skill.level}%
                  </span>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-3 mb-6">
                  <div
                    className={`skill-progress h-3 rounded-full bg-gradient-to-r ${skill.color}`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                <p className="text-gray-300 mb-4">
                  {skill.description}
                </p>

                <div className={`flex items-center justify-between mt-4 pt-4 border-t border-gray-700 ${activeSkill === index ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                  <span className="text-sm text-gray-400">Experience level</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < Math.floor(skill.level / 20) ? skill.textColor : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full max-w-6xl mt-16 p-8 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 relative z-10">
          <h3 className="text-2xl font-bold mb-4 text-blue-400">Ready to collaborate?</h3>
          <p className="text-lg text-gray-300 mb-6">Our team is available for projects and collaborations. Let's create something amazing together.</p>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            Get in Touch
          </button>
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
  );
}