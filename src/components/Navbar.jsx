import React, { useState } from 'react';
import { Menu, X, Users, FolderKanban, Contact } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Desktop Navigation */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-indigo-600">Team Portfolio</h1>
              </div>
              
              {/* Desktop menu */}
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <a 
                  href="#team" 
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:border-indigo-500 transition-colors duration-200"
                >
                  <Users className="w-4 h-4 mr-1" />
                  Team
                </a>
                <a 
                  href="#projects" 
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:border-indigo-500 transition-colors duration-200"
                >
                  <FolderKanban className="w-4 h-4 mr-1" />
                  Projects
                </a>
                <a 
                  href="#contact" 
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:border-indigo-500 transition-colors duration-200"
                >
                  <Contact className="w-4 h-4 mr-1" />
                  Contact
                </a>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition-colors duration-200"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-b-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#team"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition-colors duration-200"
              >
                <Users className="w-5 h-5 mr-2" />
                Team
              </a>
              <a
                href="#projects"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition-colors duration-200"
              >
                <FolderKanban className="w-5 h-5 mr-2" />
                Projects
              </a>
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition-colors duration-200"
              >
                <Contact className="w-5 h-5 mr-2" />
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;