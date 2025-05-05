import { Code, Clock, Globe, Heart, CheckCircle2, Award, Star } from "lucide-react";
import AnimatedTitle from "../../AnimatedTitle";

const ProfessionalSection = ({ member, sectionRefs, elementRefs, containerClass, type }) => {
  const isDark = type === "dark";
  
  // Theme configuration
  const theme = {
    background: isDark ? "bg-gray-800" : "bg-white",
    backgroundAlt: isDark ? "bg-gray-900" : "bg-gray-50",
    text: {
      primary: isDark ? "text-white" : "text-gray-800",
      secondary: isDark ? "text-gray-300" : "text-gray-700",
      muted: isDark ? "text-gray-400" : "text-gray-500",
    },
    border: isDark ? "border-gray-700" : "border-gray-200",
    accent: {
      primary: isDark ? "bg-blue-500" : "bg-blue-600",
      secondary: isDark ? "bg-blue-400" : "bg-blue-500",
      text: isDark ? "text-blue-400" : "text-blue-600",
      light: isDark ? "bg-blue-500/20" : "bg-blue-500/10",
    },
    card: {
      highlight: isDark ? "bg-gray-700" : "bg-blue-50",
      hover: isDark ? "hover:bg-gray-700" : "hover:bg-blue-50",
    }
  };

  // Reusable detail card component
  const DetailCard = ({ icon: Icon, title, value, highlight }) => {
    return (
      <div className={`relative overflow-hidden rounded-xl border ${theme.border} transition-all duration-300 ${
        highlight ? theme.card.highlight : theme.background
      } group hover:shadow-lg`}>
        {/* Accent decoration */}
        <div className="absolute h-full w-1 left-0 top-0 bottom-0 bg-gradient-to-b from-blue-400 to-blue-600 opacity-70"></div>
        
        {/* Card content */}
        <div className="p-5 pl-6">
          <div className="flex items-center mb-3">
            {/* Floating icon */}
            <div className={`absolute -right-3 -top-3 w-16 h-16 rounded-full ${theme.accent.light} flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity duration-300`}>
              <Icon size={30} className={theme.accent.text} />
            </div>
            
            {/* Title with underline effect */}
            <h3 className={`text-lg font-medium ${theme.text.secondary} relative inline-flex items-center`}>
              <Icon size={18} className={`mr-2 ${theme.accent.text}`} />
              <span className="relative">
                {title}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${theme.accent.primary} group-hover:w-full transition-all duration-300`}></span>
              </span>
            </h3>
          </div>
          
          {/* Value with larger font */}
          <div className="mt-2">
            <p className={`text-xl font-medium ${theme.text.primary}`}>
              {value}
            </p>
          </div>
          
          {/* Decorative element */}
          <div className="absolute bottom-2 right-2">
            <span className={`inline-block w-2 h-2 rounded-full ${theme.accent.secondary} opacity-40 group-hover:opacity-70 transition-opacity duration-300`}></span>
          </div>
        </div>
      </div>
    );
  };

  // Array for languages and interests to enable better styling
  const renderLanguagesOrInterests = (items, title, Icon) => {
    return (
      <div className={`rounded-xl border ${theme.border} ${theme.background} overflow-hidden transition-all duration-300 hover:shadow-lg`}>
        {/* Header with decoration */}
        <div className={`p-4 border-b ${theme.border} flex items-center relative`}>
          <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600"></span>
          <Icon size={18} className={`mr-3 ${theme.accent.text}`} />
          <h3 className={`text-lg font-medium ${theme.text.secondary}`}>{title}</h3>
        </div>
        
        {/* Items grid */}
        <div className="p-4">
          <div className="flex flex-wrap gap-2">
            {items.map((item, index) => (
              <span 
                key={index} 
                className={`px-3 py-1 rounded-full text-sm ${theme.accent.light} ${theme.accent.text} flex items-center gap-1 transition-transform duration-300 hover:scale-105 cursor-default`}
              >
                <CheckCircle2 size={12} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={sectionRefs.details}
      className={`${containerClass} py-8 px-4 sm:px-6 md:px-8`}
    >
      {/* Decorative elements */}
      <div className="container mx-auto px-4 relative">
        {/* Floating decorative elements */}
        <div className="absolute -left-4 top-10 opacity-10">
          <Code size={60} className={theme.accent.text} />
        </div>
        <div className="absolute right-10 bottom-0 opacity-10">
          <Star size={40} className={theme.accent.text} />
        </div>
        
        {/* Title with animation */}
        <div className="mb-8 relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/20 blur-xl"></div>
          <AnimatedTitle
            title=" Prof<b>e</b>ssional <br />  Det<b>a</b>ils"
            containerClass={`mt-5 text-center ${isDark ? "!text-white" : "!text-black"}`}
          />
        </div>
        
        {/* Main content with card grid */}
        <div ref={elementRefs.details} className="relative z-10">
          {/* Top row badge */}
          <div className="flex justify-center mb-6">
            <div className={`inline-flex items-center px-4 py-2 rounded-full ${theme.backgroundAlt} ${theme.text.muted} border ${theme.border} gap-2`}>
              <Award size={16} className={theme.accent.text} />
              <span>Professional Information</span>
            </div>
          </div>
          
          {/* Grid layout for details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Experience Level */}
            {member.experienceLevel && (
              <DetailCard 
                icon={Code} 
                title="Experience Level" 
                value={member.experienceLevel}
                highlight={true}
              />
            )}
            
            {/* Years of Experience */}
            {member.yearsOfExperience != null && (
              <DetailCard 
                icon={Clock} 
                title="Years of Experience" 
                value={member.yearsOfExperience > 0 ? `${member.yearsOfExperience} years` : "Studying"} 
              />
            )}
            
            {/* Availability */}
            {member.availability && (
              <DetailCard 
                icon={Clock} 
                title="Availability" 
                value={member.availability} 
              />
            )}
          </div>
          
          {/* Languages and Interests in separate containers */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Languages */}
            {member.languages && member.languages.length > 0 && (
              renderLanguagesOrInterests(member.languages, "Languages", Globe)
            )}
            
            {/* Interests */}
            {member.interests && member.interests.length > 0 && (
              renderLanguagesOrInterests(member.interests, "Interests", Heart)
            )}
          </div>
          
          {/* Bottom decorative badge */}
          <div className="flex justify-center mt-8">
            <div className={`inline-flex items-center px-3 py-1 rounded-full ${theme.accent.light} ${theme.accent.text} text-sm gap-1.5`}>
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${theme.accent.primary}`}></span>
              <span>Last updated: May 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSection;