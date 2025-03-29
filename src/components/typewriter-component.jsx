import { useState, useEffect, useRef } from 'react';

const Typewriter = ({ names = [], typingSpeed = 150, deletingSpeed = 80, pauseTime = 1500 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const currentName = names[currentNameIndex];
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Clean up the timeout when component unmounts
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!names.length) return;

    const speed = isDeleting ? deletingSpeed : typingSpeed;

    if (isDeleting) {
      if (displayText === '') {
        setIsDeleting(false);
        setCurrentNameIndex((prevIndex) => (prevIndex + 1) % names.length);
        timeoutRef.current = setTimeout(() => { }, typingSpeed);
      } else {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, speed);
      }
    } else {
      if (displayText === currentName) {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      } else {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentName.substring(0, displayText.length + 1));
        }, speed);
      }
    }
  }, [displayText, isDeleting, currentNameIndex, currentName, names, deletingSpeed, typingSpeed, pauseTime]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-segment font-bold text-center">
        <span>{displayText}</span>
        <span className="animate-pulse font-bold">|</span>
      </div>
    </div>
  );
};

export default Typewriter;
