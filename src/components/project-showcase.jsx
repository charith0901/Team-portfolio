import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ProjectCard from "./project-card";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const ProjectShowcase = ({projects}) => {
  const scrollContainerRefForProject = useRef(null);
  const panelRefsForProject = useRef([]);

  useGSAP(() => {
    const containerForProject = scrollContainerRefForProject.current;
    const panelsForProject = panelRefsForProject.current;
    const totalWidthForPro = (panelsForProject.length - 1) * 100;

    gsap.to(panelsForProject, {
      xPercent: -totalWidthForPro,
      ease: "none",
      scrollTrigger: {
        trigger: containerForProject,
        pin: true,
        scrub: 1,
        snap: 1 / (panelsForProject.length - 1),
        end: () => "+=" + containerForProject.offsetWidth,
        invalidateOnRefresh: true,
        refreshPriority: 1,
      }
    });
  }, { scope: scrollContainerRefForProject, dependencies: [] });

  const addPanelRefForProject = (el) => {
    if (el && !panelRefsForProject.current.includes(el)) {
      panelRefsForProject.current.push(el);
    }
  };

  return (
    <>
    <section id="projects" className="h-full w-full relative flex items-center justify-center bg-gray-800 py-8">
                <h1 className="text-4xl font-bold text-white">Our Projects</h1>
            </section>
    <section 
      ref={scrollContainerRefForProject}
      className="relative h-screen overflow-hidden bg-neutral-100"
    >
      <div className="absolute h-full flex">
        {projects.map((project, index) => (
          
          <Link key={index} to={project.title && `/project/${project.title}`}>
          <div
            ref={addPanelRefForProject}
            className="h-full w-screen flex items-center justify-center shrink-0"
          >
            <div className="w-full h-full bg-green-400 shadow-lg">
              {project.title &&
              <ProjectCard key={project.title} {...project} />
              }
            </div>
          </div>
          </Link>
        ))}
      </div>
    </section>
    </>
  );
};

export default ProjectShowcase;
