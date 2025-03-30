import { Code, Clock, Globe, Heart } from "lucide-react";
import AnimatedTitle from "../../AnimatedTitle";
import clsx from "clsx";

const ProfessionalSection = ({ member, sectionRefs, elementRefs, containerClass, type }) => {
  const isDark = type === "dark";
  return (
    <div
      ref={sectionRefs.details}
      className={clsx(
        containerClass,
       "py-6 px-4 sm:px-6 md:px-8",
        "flex flex-col items-center justify-center"
      )}
    >
      <div className="container mx-auto px-4">
        <AnimatedTitle
          title=" Prof<b>e</b>ssional <br />  Det<b>a</b>ils"
          containerClass={clsx(
            "mt-5 text-center",
            isDark ? "!text-white" : "!text-black"
          )}
        />

        <div className={clsx(
          "rounded-2xl shadow-lg p-6 md:p-8 border transition-all duration-300 hover:shadow-xl",
          isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-100 text-gray-800"
        )}>
          <div ref={elementRefs.details} className="space-y-8">
            {/* Details rendered using consistent pattern to avoid duplication */}
            {member.experienceLevel && (
              <div className="flex items-start group">
                <div className={clsx(
                  "p-2 rounded-full mr-4 transition-all duration-300 transform group-hover:scale-110 mt-1",
                  isDark ? "bg-gray-700 group-hover:bg-gray-600" : "bg-gray-100 group-hover:bg-blue-100"
                )}>
                  <Code size={20} className={clsx(
                    "transition-colors",
                    isDark ? "text-blue-400 group-hover:text-blue-300" : "text-blue-600 group-hover:text-blue-700"
                  )} />
                </div>
                <div>
                  <h3 className={clsx(
                    "text-lg font-medium flex items-center group",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    <span className="relative">
                      Experience Level
                      <span className={clsx(
                        "absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300",
                        isDark ? "bg-blue-400" : "bg-blue-500"
                      )}></span>
                    </span>
                  </h3>
                  <p className={clsx(
                    "text-xl mt-1",
                    isDark ? "text-white" : "text-gray-800"
                  )}>
                    {member.experienceLevel}
                  </p>
                </div>
              </div>
            )}

            {member.yearsOfExperience != null && (
              <div className="flex items-start group">
                <div className={clsx(
                  "p-2 rounded-full mr-4 transition-all duration-300 transform group-hover:scale-110 mt-1",
                  isDark ? "bg-gray-700 group-hover:bg-gray-600" : "bg-gray-100 group-hover:bg-blue-100"
                )}>
                  <Clock size={20} className={clsx(
                    "transition-colors",
                    isDark ? "text-blue-400 group-hover:text-blue-300" : "text-blue-600 group-hover:text-blue-700"
                  )} />
                </div>
                <div>
                  <h3 className={clsx(
                    "text-lg font-medium flex items-center group",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    <span className="relative">
                      Years of Experience
                      <span className={clsx(
                        "absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300",
                        isDark ? "bg-blue-400" : "bg-blue-500"
                      )}></span>
                    </span>
                  </h3>
                  <p className={clsx(
                    "text-xl mt-1",
                    isDark ? "text-white" : "text-gray-800"
                  )}>
                    {member.yearsOfExperience > 0
                      ? member.yearsOfExperience + " years"
                      : "Studying"}
                  </p>
                </div>
              </div>
            )}

            {member.languages && member.languages.length > 0 && (
              <div className="flex items-start group">
                <div className={clsx(
                  "p-2 rounded-full mr-4 transition-all duration-300 transform group-hover:scale-110 mt-1",
                  isDark ? "bg-gray-700 group-hover:bg-gray-600" : "bg-gray-100 group-hover:bg-blue-100"
                )}>
                  <Globe size={20} className={clsx(
                    "transition-colors",
                    isDark ? "text-blue-400 group-hover:text-blue-300" : "text-blue-600 group-hover:text-blue-700"
                  )} />
                </div>
                <div>
                  <h3 className={clsx(
                    "text-lg font-medium flex items-center group",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    <span className="relative">
                      Languages
                      <span className={clsx(
                        "absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300",
                        isDark ? "bg-blue-400" : "bg-blue-500"
                      )}></span>
                    </span>
                  </h3>
                  <p className={clsx(
                    "text-xl mt-1",
                    isDark ? "text-white" : "text-gray-800"
                  )}>
                    {member.languages.join(", ")}
                  </p>
                </div>
              </div>
            )}

            {member.availability && (
              <div className="flex items-start group">
                <div className={clsx(
                  "p-2 rounded-full mr-4 transition-all duration-300 transform group-hover:scale-110 mt-1",
                  isDark ? "bg-gray-700 group-hover:bg-gray-600" : "bg-gray-100 group-hover:bg-blue-100"
                )}>
                  <Clock size={20} className={clsx(
                    "transition-colors",
                    isDark ? "text-blue-400 group-hover:text-blue-300" : "text-blue-600 group-hover:text-blue-700"
                  )} />
                </div>
                <div>
                  <h3 className={clsx(
                    "text-lg font-medium flex items-center group",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    <span className="relative">
                      Availability
                      <span className={clsx(
                        "absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300",
                        isDark ? "bg-blue-400" : "bg-blue-500"
                      )}></span>
                    </span>
                  </h3>
                  <p className={clsx(
                    "text-xl mt-1",
                    isDark ? "text-white" : "text-gray-800"
                  )}>
                    {member.availability}
                  </p>
                </div>
              </div>
            )}

            {member.interests && member.interests.length > 0 && (
              <div className="flex items-start group">
                <div className={clsx(
                  "p-2 rounded-full mr-4 transition-all duration-300 transform group-hover:scale-110 mt-1",
                  isDark ? "bg-gray-700 group-hover:bg-gray-600" : "bg-gray-100 group-hover:bg-blue-100"
                )}>
                  <Heart size={20} className={clsx(
                    "transition-colors",
                    isDark ? "text-blue-400 group-hover:text-blue-300" : "text-blue-600 group-hover:text-blue-700"
                  )} />
                </div>
                <div>
                  <h3 className={clsx(
                    "text-lg font-medium flex items-center group",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    <span className="relative">
                      Interests
                      <span className={clsx(
                        "absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300",
                        isDark ? "bg-blue-400" : "bg-blue-500"
                      )}></span>
                    </span>
                  </h3>
                  <p className={clsx(
                    "text-xl mt-1",
                    isDark ? "text-white" : "text-gray-800"
                  )}>
                    {member.interests.join(", ")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfessionalSection;