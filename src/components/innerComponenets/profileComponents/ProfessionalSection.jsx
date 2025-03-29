import { Code, Clock, Globe, Heart } from "lucide-react";
import AnimatedTitle from "../../AnimatedTitle";


const ProfessionalSection = ({ member, sectionRefs, elementRefs }) => {
  return (
    <section
      ref={sectionRefs.details}
      className="min-h-screen py-16 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        <AnimatedTitle
          title=" Prof<b>e</b>ssional <br />  Det<b>a</b>ils"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <div ref={elementRefs.details} className="space-y-8">
            {/* Details rendered using consistent pattern to avoid duplication */}
            {member.experienceLevel && (
              <div className="flex items-start">
                <Code size={24} className="mr-4 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-700">
                    Experience Level
                  </h3>
                  <p className="text-xl text-gray-800 mt-1">
                    {member.experienceLevel}
                  </p>
                </div>
              </div>
            )}

            {member.yearsOfExperience != null && (
              <div className="flex items-start">
                <Clock size={24} className="mr-4 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-700">
                    Years of Experience
                  </h3>
                  <p className="text-xl text-gray-800 mt-1">
                    {member.yearsOfExperience > 0
                      ? member.yearsOfExperience + " years"
                      : "Studying"}
                  </p>
                </div>
              </div>
            )}

            {member.languages && member.languages.length > 0 && (
              <div className="flex items-start">
                <Globe size={24} className="mr-4 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-700">
                    Languages
                  </h3>
                  <p className="text-xl text-gray-800 mt-1">
                    {member.languages.join(", ")}
                  </p>
                </div>
              </div>
            )}

            {member.availability && (
              <div className="flex items-start">
                <Clock size={24} className="mr-4 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-700">
                    Availability
                  </h3>
                  <p className="text-xl text-gray-800 mt-1">
                    {member.availability}
                  </p>
                </div>
              </div>
            )}

            {member.interests && member.interests.length > 0 && (
              <div className="flex items-start">
                <Heart size={24} className="mr-4 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-700">
                    Interests
                  </h3>
                  <p className="text-xl text-gray-800 mt-1">
                    {member.interests.join(", ")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProfessionalSection;