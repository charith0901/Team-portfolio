import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import TeamMemberCarousel from '../components/TeamMemberCarousel';
import SkillShowcaseParallax from '../components/skill-scroll';
import ProjectShowcase from '../components/project-showcase';
import AnimatedTitle from '../components/AnimatedTitle';
import { projects } from '../data/Data';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const progressRef = useRef(null);
    const progressCircleRef = useRef(null);
    const sectionRefs = useRef([]);

    useEffect(() => {
        // Scroll to top on initial load
        window.scrollTo(0, 0);

        // Advanced Scroll Progress Indicator
        const progressBar = progressRef.current;
        const progressCircle = progressCircleRef.current;

        if (progressBar && progressCircle) {
            // Create scroll progress animation with more sophisticated effects
            const scrollProgress = gsap.timeline({
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.3, // Smoother scrubbing
                    onUpdate: (self) => {
                        // Update circle indicator
                        const progress = self.progress;
                        gsap.to(progressCircle, {
                            scale: progress > 0 ? 1 : 0,
                            opacity: progress > 0 ? 1 : 0,
                            duration: 0.3
                        });
                    }
                }
            });

            // Animated progress bar with color transition
            scrollProgress.to(progressBar, {
                width: '100%',
                backgroundColor: '#3b82f6', // Starting blue
                ease: 'power1.inOut',
                onUpdate: () => {
                    // Dynamic color change based on scroll progress
                    const progress = scrollProgress.progress();
                    if (progressBar) {
                        progressBar.style.backgroundColor = progress > 0.5
                            ? `hsl(${120 * progress}, 70%, 50%)` // Transition to green
                            : `hsl(${240 * (1 - progress)}, 70%, 50%)`; // Blue to green
                    }
                }
            });
        }

        // Section reveal animations with staggered and more dynamic effects
        sectionRefs.current.forEach((section, index) => {
            if (section) {
                gsap.fromTo(section,
                    {
                        opacity: 0,
                        y: 100,
                        scale: 0.9,
                        rotationX: -15
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotationX: 0,
                        duration: 1,
                        delay: index * 0.2, // Staggered entrance
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            }
        });

        // Clean up ScrollTrigger instances
        return () => {
            ScrollTrigger.getAll().forEach(instance => instance.kill());
        };
    }, []);

    // Method to add section refs
    const addToRefs = (el) => {
        if (el && !sectionRefs.current.includes(el)) {
            sectionRefs.current.push(el);
        }
    };

    return (
        <div className="relative">
            {/* Enhanced Scroll Progress Indicator */}
            <div className="fixed top-0 left-0 h-1 bg-blue-500 z-50 w-0" ref={progressRef}>
                {/* Progress Circle Indicator */}
                <div
                    ref={progressCircleRef}
                    className="absolute top-[-5px] right-0 w-3 h-3 bg-blue-600 rounded-full transform -translate-y-1/2 scale-0 opacity-0"
                />
            </div>

            <Navbar />

            <section ref={addToRefs} className="opacity-0">

                <SkillShowcaseParallax />
            </section>

            <section ref={addToRefs} className="opacity-0">
                <TeamMemberCarousel />
            </section>

            <section
                ref={addToRefs}
                id="projects"
                className="h-full w-full relative flex items-center justify-center bg-gray-800 py-8 opacity-0"
            >
                <AnimatedTitle
                    title={"our pr<b>o</b>je<b>c</b>ts"}
                    containerClass={"text-white "}
                />
            </section>

            <section ref={addToRefs} className="opacity-0">
                <ProjectShowcase projects={projects} />
            </section>

            <footer
                ref={addToRefs}
                id='contact'
                className="h-20 flex items-center justify-center bg-gray-800 opacity-0"
            >
                <p className="text-white">© 2025 DataDragons. All rights reserved.</p>
            </footer>
        </div>
    );
}