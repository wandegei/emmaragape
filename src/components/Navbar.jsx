
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Flower2, Menu, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext.jsx';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`sticky top-0 z-40 shadow-md ${theme === 'dark' ? 'bg-gray-900/80 glass-effect' : 'bg-pink-100/80 glass-effect'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <Flower2 className="h-10 w-10 text-primary group-hover:animate-spin" />
              <span className="ml-3 text-2xl font-bold font-['Playfair_Display'] text-primary">Agape Flower</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:text-primary hover:bg-pink-200/50 dark:hover:bg-gray-700/50 ${
                      isActive ? 'text-primary font-semibold' : (theme === 'dark' ? 'text-gray-300' : 'text-gray-700')
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="ghost"
              size="icon"
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-pink-700 dark:hover:text-pink-300 hover:bg-pink-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-20 inset-x-0 p-2 transition transform origin-top-right z-30">
          <div className={`rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ${theme === 'dark' ? 'bg-gray-800' : 'bg-pink-50'} divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-100'}`}>
            <div className="px-5 pt-5 pb-6 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 hover:text-primary hover:bg-pink-100 dark:hover:bg-gray-700 ${
                      isActive ? 'text-primary bg-pink-100 dark:bg-gray-700' : (theme === 'dark' ? 'text-gray-300' : 'text-gray-700')
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
