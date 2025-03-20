import React, { useRef } from "react";
import ProjectCard from "./project-card";
import { Link } from "react-router-dom";


const ProjectShowcase = ({projects}) => {

  return (
    <>
    <main className="w-full">
      <section className="min-h-screen bg-neutral-100 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-6">
          {projects.map((project, index) => (      
            <Link key={index} to={project.title && `/project/${project.title}`}>
              <div className="w-full h-full bg-green-400 shadow-lg">
                {project.title &&
                <ProjectCard key={project.title} {...project} />
                }
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
    </>
  );
};

export default ProjectShowcase;

