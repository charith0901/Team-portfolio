import { Mail, Phone, Linkedin, Github } from "lucide-react";
import AnimatedTitle from "../../AnimatedTitle";

const AboutSection = ({ member, sectionRefs, elementRefs, containerClass, type }) => {
  const { github, linkedin, email } = member.social || {};
  const isDark = type === "dark";

  const theme = {
    background: isDark ? "bg-gray-800" : "bg-white",
    text: {
      primary: isDark ? "text-white" : "text-gray-800",
      secondary: isDark ? "text-gray-300" : "text-gray-600",
      tertiary: isDark ? "text-gray-400" : "text-gray-500",
    },
    border: isDark ? "border-gray-700" : "border-gray-200",
    accent: isDark ? "bg-blue-400" : "bg-blue-500",
    accentText: isDark ? "text-blue-400" : "text-blue-600",
    accentBorder: isDark ? "border-blue-400" : "border-blue-500",
    card: {
      background: isDark ? "bg-gray-700" : "bg-gray-100",
      hover: isDark ? "bg-gray-600" : "bg-blue-100",
    },
    highlight: isDark ? "bg-gray-700/50" : "bg-gray-50",
  };

  return (
    <div ref={sectionRefs.about} className={`${containerClass} py-10 px-4 sm:px-6 md:px-8`}>
      <AnimatedTitle
            title=" Abo<b>u</b>t <b>M</b>e"
            containerClass={`mt-5 text-center ${isDark ? "!text-white" : "!text-black"}`}
          />
      <div className="w-full flex justify-center mb-8">
        <div className="relative w-24 h-1">
          <div
            className={`absolute inset-0 ${theme.accent} rounded-full transform transition-all duration-500 hover:scale-x-110 hover:scale-y-150`}
          ></div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div
          className={`rounded-2xl shadow-lg flex-1 border transition-all duration-300 hover:shadow-xl ${theme.background} border-${theme.border.replace(
            "border-",
            ""
          )} overflow-hidden`}
        >
          <div className={`py-4 px-6 border-b ${theme.border} relative`}>
            <span className={`absolute left-0 top-0 bottom-0 w-1 ${theme.accent}`}></span>
            <h2
              className={`text-xl sm:text-2xl font-bold flex items-center ${theme.text.primary} animate-pulse`}
            >
              <span className="relative group">
                Biography
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 bg-gradient-to-r from-blue-400 to-blue-500"></span>
              </span>
            </h2>
          </div>
          <div className="p-6">
            <div className="relative">
              <span className={`absolute -left-2 top-0 h-full w-1 rounded-full ${theme.accent} opacity-30`}></span>
              <p className={`text-base sm:text-lg leading-relaxed ${theme.text.secondary} pl-2`}>
                {member.bio}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-dashed border-opacity-30 flex justify-end">
              <span className={`inline-block px-3 py-1 rounded-full text-xs ${theme.highlight} ${theme.text.tertiary}`}>
                Personal Profile
              </span>
            </div>
          </div>
        </div>
        <div
          ref={elementRefs.social}
          className={`rounded-2xl shadow-lg lg:w-1/3 border transition-all duration-300 hover:shadow-xl ${theme.background} border-${theme.border.replace(
            "border-",
            ""
          )} overflow-hidden`}
        >
          <div className={`py-4 px-6 border-b ${theme.border} relative`}>
            <span className={`absolute left-0 top-0 bottom-0 w-1 ${theme.accent}`}></span>
            <h2
              className={`text-xl sm:text-2xl font-bold flex items-center ${theme.text.primary} animate-bounce`}
            >
              <span className="relative group">
                Connect
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 bg-gradient-to-r from-blue-400 to-blue-500"></span>
              </span>
            </h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
              {github && (
                <div
                  className={`rounded-xl border ${theme.border} overflow-hidden transition-all duration-300 hover:shadow-md group`}
                >
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3"
                  >
                    <div
                      className={`p-2 rounded-full mr-3 ${theme.card.background} transition-transform duration-300 group-hover:scale-110 group-hover:${theme.card.hover.replace(
                        "bg-",
                        ""
                      )}`}
                    >
                      <Github
                        size={20}
                        className={`transition-colors duration-300 group-hover:${theme.accentText.replace(
                          "text-",
                          ""
                        )}`}
                      />
                    </div>
                    <div className="flex-1">
                      <span
                        className={`block font-medium text-sm ${theme.text.primary} group-hover:${theme.accentText.replace(
                          "text-",
                          ""
                        )}`}
                      >
                        GitHub
                      </span>
                      <span className={`block text-xs truncate ${theme.text.tertiary}`}>
                        View Code Repository
                      </span>
                    </div>
                    <span
                      className={`transform transition-transform duration-300 group-hover:translate-x-1 ${theme.text.tertiary}`}
                    >
                      →
                    </span>
                  </a>
                </div>
              )}
              {linkedin && (
                <div
                  className={`rounded-xl border ${theme.border} overflow-hidden transition-all duration-300 hover:shadow-md group`}
                >
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3"
                  >
                    <div
                      className={`p-2 rounded-full mr-3 ${theme.card.background} transition-transform duration-300 group-hover:scale-110 group-hover:${theme.card.hover.replace(
                        "bg-",
                        ""
                      )}`}
                    >
                      <Linkedin
                        size={20}
                        className={`transition-colors duration-300 group-hover:${theme.accentText.replace(
                          "text-",
                          ""
                        )}`}
                      />
                    </div>
                    <div className="flex-1">
                      <span
                        className={`block font-medium text-sm ${theme.text.primary} group-hover:${theme.accentText.replace(
                          "text-",
                          ""
                        )}`}
                      >
                        LinkedIn
                      </span>
                      <span className={`block text-xs truncate ${theme.text.tertiary}`}>
                        Professional Profile
                      </span>
                    </div>
                    <span
                      className={`transform transition-transform duration-300 group-hover:translate-x-1 ${theme.text.tertiary}`}
                    >
                      →
                    </span>
                  </a>
                </div>
              )}
              {email && (
                <div
                  className={`rounded-xl border ${theme.border} overflow-hidden transition-all duration-300 hover:shadow-md group`}
                >
                  <a href={`mailto:${email}`} className="flex items-center p-3">
                    <div
                      className={`p-2 rounded-full mr-3 ${theme.card.background} transition-transform duration-300 group-hover:scale-110 group-hover:${theme.card.hover.replace(
                        "bg-",
                        ""
                      )}`}
                    >
                      <Mail
                        size={20}
                        className={`transition-colors duration-300 group-hover:${theme.accentText.replace(
                          "text-",
                          ""
                        )}`}
                      />
                    </div>
                    <div className="flex-1">
                      <span
                        className={`block font-medium text-sm ${theme.text.primary} group-hover:${theme.accentText.replace(
                          "text-",
                          ""
                        )}`}
                      >
                        Email
                      </span>
                      <span className={`block text-xs truncate ${theme.text.tertiary}`}>
                        {email}
                      </span>
                    </div>
                    <span
                      className={`transform transition-transform duration-300 group-hover:translate-x-1 ${theme.text.tertiary}`}
                    >
                      →
                    </span>
                  </a>
                </div>
              )}
              {member.phone && (
                <div
                  className={`rounded-xl border ${theme.border} overflow-hidden transition-all duration-300 hover:shadow-md group`}
                >
                  <a href={`tel:${member.phone}`} className="flex items-center p-3">
                    <div
                      className={`p-2 rounded-full mr-3 ${theme.card.background} transition-transform duration-300 group-hover:scale-110 group-hover:${theme.card.hover.replace(
                        "bg-",
                        ""
                      )}`}
                    >
                      <Phone
                        size={20}
                        className={`transition-colors duration-300 group-hover:${theme.accentText.replace(
                          "text-",
                          ""
                        )}`}
                      />
                    </div>
                    <div className="flex-1">
                      <span
                        className={`block font-medium text-sm ${theme.text.primary} group-hover:${theme.accentText.replace(
                          "text-",
                          ""
                        )}`}
                      >
                        Phone
                      </span>
                      <span className={`block text-xs truncate ${theme.text.tertiary}`}>
                        {member.phone}
                      </span>
                    </div>
                    <span
                      className={`transform transition-transform duration-300 group-hover:translate-x-1 ${theme.text.tertiary}`}
                    >
                      →
                    </span>
                  </a>
                </div>
              )}
            </div>
            <div className="mt-4 pt-3 border-t border-dashed border-opacity-30 flex justify-center">
              <div
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${theme.highlight} ${theme.text.tertiary}`}
              >
                <span className={`inline-block w-1.5 h-1.5 rounded-full ${theme.accent}`}></span>
                <span>Available for contact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;