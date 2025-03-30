import { Book, Award } from "lucide-react";
import AnimatedTitle from "../../AnimatedTitle";
const SkillSection = ({ member, sectionRefs, elementRefs }) => {
  return (
    <section
      ref={sectionRefs.skills}
      className="min-h-screen relative w-full bg-gray-50"
    >
      <div className="container mx-auto px-4">
        <AnimatedTitle
          title=" Ski<b>l</b>ls <br /> <b>A</b>nd Edu<b>c</b>ati<b>o</b>n"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          {/* Skills */}
          {member.skills && member.skills.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Skills
              </h3>
              <div
                ref={elementRefs.skills}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {member.skills.map((skill) => (
                  <div
                    key={skill.language}
                    className="skill-card bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 border border-gray-700 hover:border-blue-500"
                  >
                    <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-500"></div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold text-blue-400">
                          {skill.language}
                        </h3>
                        {skill.level !== undefined &&
                          skill.level !== null && (
                            <span className="text-lg font-semibold bg-gray-700 px-3 py-1 rounded-full">
                              {skill.level}%
                            </span>
                          )}
                      </div>
                      {skill.level !== undefined &&
                        skill.level !== null && (
                          <div className="w-full bg-gray-700 rounded-full h-3 mb-6">
                            <div
                              className="skill-progress h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-500"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {member.education && member.education.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Education
              </h3>
              <div ref={elementRefs.education} className="space-y-4">
                {member.education.map((edu, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-50 p-4 rounded-lg"
                  >
                    <Book size={24} className="mr-4 text-blue-600" />
                    <div>
                      <div className="font-medium text-lg">
                        {edu.college}
                      </div>
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
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Awards
              </h3>
              <div className="space-y-4">
                {member.awards.map((award, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-50 p-4 rounded-lg"
                  >
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
  );
};
export default SkillSection;