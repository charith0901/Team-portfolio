import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const HeroSection = ({ member, elementRefs }) => {
  return (
    <div className="relative w-full min-h-[40vh] sm:min-h-[45vh] lg:min-h-[50vh] bg-gradient-to-br from-blue-600 to-purple-700 overflow-hidden">
      {/* Cover Image with Overlay */}
      {member.coverImage ? (
        <div className="absolute inset-0 z-0">
          <img
            src={member.coverImage}
            alt={`${member.name}'s cover`}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-800/60 to-purple-900/60"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-purple-900 opacity-60 animate-gradient-x">
          <div className="absolute inset-0 pattern-dots pattern-white pattern-bg-transparent pattern-size-2 pattern-opacity-10"></div>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 h-full flex flex-col justify-between py-8 sm:py-12">
        {/* Back Button */}
        <Link
          to="/"
          className="self-start bg-white/20 backdrop-blur-md text-white px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-white/30 transition-all duration-300 hover:shadow-lg flex items-center gap-2 transform hover:-translate-y-1"
        >
          <span className="inline-block transform translate-y-px">←</span>{" "}
          Back to Team
        </Link>

        {/* Main Content Wrapper - Using grid for layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-center mt-auto mb-8 sm:mb-12">
          {/* Member Info Section */}
          <div className="text-white sm:col-span-1 md:col-span-2 order-2 sm:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg mb-2 sm:mb-3 animate-fade-in-up">
              {member.name}
            </h1>
            
            {member.roles && (
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white/90 drop-shadow-lg mb-3 sm:mb-4 animate-fade-in-up delay-100">
                {member.roles.join(" • ")}
              </h2>
            )}
            
            <div className="h-1 w-16 sm:w-24 bg-white/50 rounded-full mb-4 sm:mb-6 animate-fade-in"></div>
            
            {member.location && (
              <div className="flex items-center mb-4 sm:mb-6 text-white/90">
                <MapPin size={18} className="mr-2 text-blue-300" />
                <span className="font-medium text-sm sm:text-base">{member.location}</span>
              </div>
            )}
            
            <p className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed max-w-lg drop-shadow-md mb-6 sm:mb-8 animate-fade-in-delayed">
              Explore {member.name}'s profile, skills, and projects.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 flex items-center gap-2 sm:w-auto"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = member.resume;
                  link.download = `${member.name.split(" ").join("_")}_Resume.pdf`;
                  link.click();
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download Resume
              </button>
            </div>
          </div>
          
          <div 
            ref={elementRefs.header}
            className="flex justify-center md:justify-end mx-auto sm:mx-4 md:mx-6 lg:mx-10 animate-fade-in-up order-1 sm:order-2 mb-6 sm:mb-0"
          >
            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 blur opacity-80 transform scale-110 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="absolute inset-0 rounded-full animate-pulse-slow bg-gradient-to-r from-blue-400/30 to-purple-500/30 blur-xl"></div>
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full object-cover border-4 border-white shadow-xl relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:border-blue-100"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Wave Shape Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-12 sm:h-16 md:h-20 lg:h-24 text-gray-50"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-current"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;