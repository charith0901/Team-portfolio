import { Mail, Phone, Linkedin, Github, MapPin } from "lucide-react";
const AboutSection = ({member, sectionRefs, elementRefs}) => {
  const { github, linkedin, email } = member.social || {};
    return(
        <section
          ref={sectionRefs.about}
          className="min-h-screen pt-28 pb-20 container mx-auto px-4 md:px-8 bg-gray-50"
        >

          {/* About & Contact */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mt-8 border border-gray-100 transition-all duration-300 hover:shadow-xl">
            {/* Bio with subtle animation */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center group">
                <span className="relative">
                  About
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {member.bio}
              </p>
            </div>

            {/* Contact Information with hover effects */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center group">
                <span className="relative">
                  Contact Information
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </span>
              </h2>
              <div ref={elementRefs.social} className="flex flex-col gap-5">
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors group"
                  >
                    <div className="bg-gray-100 p-3 rounded-full mr-4 group-hover:bg-blue-100 transition-all duration-300 transform group-hover:scale-110">
                      <Github
                        size={22}
                        className="group-hover:text-blue-600 transition-colors"
                      />
                    </div>
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">
                      GitHub
                    </span>
                  </a>
                )}

                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors group"
                  >
                    <div className="bg-gray-100 p-3 rounded-full mr-4 group-hover:bg-blue-100 transition-all duration-300 transform group-hover:scale-110">
                      <Linkedin
                        size={22}
                        className="group-hover:text-blue-600 transition-colors"
                      />
                    </div>
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">
                      LinkedIn
                    </span>
                  </a>
                )}

                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors group"
                  >
                    <div className="bg-gray-100 p-3 rounded-full mr-4 group-hover:bg-blue-100 transition-all duration-300 transform group-hover:scale-110">
                      <Mail
                        size={22}
                        className="group-hover:text-blue-600 transition-colors"
                      />
                    </div>
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">
                      {email}
                    </span>
                  </a>
                )}

                {member.phone && (
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors group"
                  >
                    <div className="bg-gray-100 p-3 rounded-full mr-4 group-hover:bg-blue-100 transition-all duration-300 transform group-hover:scale-110">
                      <Phone
                        size={22}
                        className="group-hover:text-blue-600 transition-colors"
                      />
                    </div>
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">
                      {member.phone}
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
    );
};

export default AboutSection;
