import React, { useState, useEffect } from 'react';

const ParallaxCarousel = ({demostrationImages}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        goToNextSlide();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide, isTransitioning]);

  const goToSlide = (index) => {
    if (index === currentSlide || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  const goToNextSlide = () => {
    goToSlide((currentSlide + 1) % demostrationImages.length);
  };

  const goToPrevSlide = () => {
    goToSlide((currentSlide - 1 + demostrationImages.length) % demostrationImages.length);
  };

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-xl bg-gray-900">
      {/* Main carousel */}
      <div className="relative w-full h-full">
        {demostrationImages?.map((image,index) => (
          <div 
            key={index}
            className={`absolute w-full h-full transition-all duration-500 ease-in-out ${
              index === currentSlide 
                ? "opacity-100 z-10" 
                : "opacity-0 z-0"
            }`}
          >
            {/* Parallax background image with animation */}
            <div 
              className="absolute w-full h-full bg-cover bg-center transform scale-110 transition-transform duration-700"
              style={{ 
                backgroundImage: `url(${image})`,
                backgroundPosition: 'center',
                transform: index === currentSlide ? "scale(1.05)" : "scale(1.15)"
              }}
            />
          </div>
        ))}
      </div>
      
      {/* Navigation arrows */}
      <button 
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-3 rounded-full transition-all"
        disabled={isTransitioning}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-3 rounded-full transition-all"
        disabled={isTransitioning}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {demostrationImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white scale-110" 
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ParallaxCarousel;