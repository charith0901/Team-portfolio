import {ChevronUp, Github, Linkedin, Mail} from "lucide-react";
const Navigator = ({member,activeSection, scrollToSection, sections}) =>{
    return(
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
          <div className="flex flex-col gap-4 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg">
            {sections.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                title={id}
                className={`p-2 rounded-full transition-colors ${activeSection === id
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                  }`}
                aria-label={label}
              >
                <Icon size={20} />
              </button>
            ))}
            <div className="w-full h-px bg-gray-200 my-1"></div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              title="Scroll to top"
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Scroll to top"
            >
              <ChevronUp size={20} />
            </button>
          {member.social.github && (
            <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors" >
              <Github size={20}/>
            </a>
          )}
          {member.social.linkedin && (
            <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <Linkedin size={20}/>
            </a>
          )}
          {member.social.email && (
            <a href={member.social.email} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <Mail size={20}/>
            </a>
          )}
          </div>
        </div>
    );
    
};

export default Navigator;
