import { Mail, Phone, Linkedin, Github } from "lucide-react";
import clsx from "clsx";

const AboutSection = ({member, sectionRefs, elementRefs, containerClass, type}) => {
  const { github, linkedin, email } = member.social || {};
  
  const isDark  = type === "dark";
  
  return(
    <div
      ref={sectionRefs.about}
      className={clsx(
        containerClass,
        "py-6 px-4 sm:px-6 md:px-8",
        "flex flex-col items-center justify-center"
      )}
    >
      {/* About & Contact */}
      <div className={clsx(
        "rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border transition-all duration-300 hover:shadow-xl w-full",
        isDark 
          ? "bg-gray-800 border-gray-700 text-white" 
          : "bg-white border-gray-100 text-gray-800"
      )}>
        {/* Bio with subtle animation */}
        <div className="mb-8">
          <h2 className={clsx(
            "text-xl sm:text-2xl font-bold mb-4 flex items-center group",
            isDark ? "text-white" : "text-gray-800"
          )}>
            <span className="relative">
              About
              <span className={clsx(
                "absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300",
                isDark ? "bg-blue-400" : "bg-blue-500"
              )}></span>
            </span>
          </h2>
          <p className={clsx(
            "text-base sm:text-lg leading-relaxed",
            isDark ? "text-gray-300" : "text-gray-600"
          )}>
            {member.bio}
          </p>
        </div>

        {/* Contact Information with hover effects */}
        <div className={clsx(
          "border-t pt-6",
          isDark ? "border-gray-700" : "border-gray-200"
        )}>
          <h2 className={clsx(
            "text-xl sm:text-2xl font-bold mb-6 flex items-center group",
            isDark ? "text-white" : "text-gray-800"
          )}>
            <span className="relative">
              Contact Information
              <span className={clsx(
                "absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300",
                isDark ? "bg-blue-400" : "bg-blue-500"
              )}></span>
            </span>
          </h2>
          <div ref={elementRefs.social} className="flex flex-col gap-4">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  "flex items-center transition-colors group",
                  isDark ? "text-gray-300 hover:text-blue-400" : "text-gray-700 hover:text-blue-600"
                )}
              >
                <div className={clsx(
                  "p-2 sm:p-3 rounded-full mr-3 sm:mr-4 transition-all duration-300 transform group-hover:scale-110",
                  isDark ? "bg-gray-700 group-hover:bg-gray-600" : "bg-gray-100 group-hover:bg-blue-100"
                )}>
                  <Github
                    size={20}
                    className={isDark ? "group-hover:text-blue-400" : "group-hover:text-blue-600"}
                  />
                </div>
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-300 text-sm sm:text-base truncate">
                  GitHub
                </span>
              </a>
            )}

            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  "flex items-center transition-colors group",
                  isDark ? "text-gray-300 hover:text-blue-400" : "text-gray-700 hover:text-blue-600"
                )}
              >
                <div className={clsx(
                  "p-2 sm:p-3 rounded-full mr-3 sm:mr-4 transition-all duration-300 transform group-hover:scale-110",
                  isDark ? "bg-gray-700 group-hover:bg-gray-600" : "bg-gray-100 group-hover:bg-blue-100"
                )}>
                  <Linkedin
                    size={20}
                    className={isDark ? "group-hover:text-blue-400" : "group-hover:text-blue-600"}
                  />
                </div>
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-300 text-sm sm:text-base truncate">
                  LinkedIn
                </span>
              </a>
            )}

            {email && (
              <a
                href={`mailto:${email}`}
                className={clsx(
                  "flex items-center transition-colors group",
                  isDark ? "text-gray-300 hover:text-blue-400" : "text-gray-700 hover:text-blue-600"
                )}
              >
                <div className={clsx(
                  "p-2 sm:p-3 rounded-full mr-3 sm:mr-4 transition-all duration-300 transform group-hover:scale-110",
                  isDark ? "bg-gray-700 group-hover:bg-gray-600" : "bg-gray-100 group-hover:bg-blue-100"
                )}>
                  <Mail
                    size={20}
                    className={isDark ? "group-hover:text-blue-400" : "group-hover:text-blue-600"}
                  />
                </div>
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-300 text-sm sm:text-base truncate">
                  {email}
                </span>
              </a>
            )}

            {member.phone && (
              <a
                href={`tel:${member.phone}`}
                className={clsx(
                  "flex items-center transition-colors group",
                  isDark ? "text-gray-300 hover:text-blue-400" : "text-gray-700 hover:text-blue-600"
                )}
              >
                <div className={clsx(
                  "p-2 sm:p-3 rounded-full mr-3 sm:mr-4 transition-all duration-300 transform group-hover:scale-110",
                  isDark ? "bg-gray-700 group-hover:bg-gray-600" : "bg-gray-100 group-hover:bg-blue-100"
                )}>
                  <Phone
                    size={20}
                    className={isDark ? "group-hover:text-blue-400" : "group-hover:text-blue-600"}
                  />
                </div>
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-300 text-sm sm:text-base truncate">
                  {member.phone}
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
