
import React from 'react';
import { Link } from 'react-router-dom';
import { Flower2, Phone, Mail, MapPin, MessageCircle } from 'lucide-react'; // Added MessageCircle for WhatsApp
import { useTheme } from '@/contexts/ThemeContext.jsx';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();

  return (
    <footer className={`${theme === 'dark' ? 'bg-gray-800 floral-pattern' : 'bg-pink-100 floral-pattern'} text-gray-600 dark:text-gray-400 body-font`}>
      <div className="container px-5 py-16 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link to="/" className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900 dark:text-white">
            <Flower2 className="w-10 h-10 text-primary p-2 bg-pink-200 dark:bg-gray-700 rounded-full" />
            <span className="ml-3 text-xl font-['Playfair_Display']">Agape Flower</span>
          </Link>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Love in Every Petal.</p>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Fresh flowers for all your special moments.</p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/3 md:w-1/2 w-full px-4">
            <p className="title-font font-semibold text-gray-900 dark:text-white tracking-widest text-sm mb-3">QUICK LINKS</p>
            <nav className="list-none mb-10 space-y-2">
              <li>
                <Link to="/about" className="hover:text-primary dark:hover:text-pink-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-primary dark:hover:text-pink-400 transition-colors">Our Flowers</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary dark:hover:text-pink-400 transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary dark:hover:text-pink-400 transition-colors">Contact</Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/3 md:w-1/2 w-full px-4">
            <p className="title-font font-semibold text-gray-900 dark:text-white tracking-widest text-sm mb-3">CONTACT US</p>
            <ul className="list-none mb-10 space-y-3">
              <li className="flex items-center justify-center md:justify-start">
                <Phone className="w-4 h-4 mr-2 text-primary" />
                <span>+254 700 000 000</span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <MessageCircle className="w-4 h-4 mr-2 text-primary" /> 
                <span>WhatsApp Us</span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Mail className="w-4 h-4 mr-2 text-primary" />
                <span>hello@agapeflower.co</span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                <span>123 Flower St, Nairobi</span>
              </li>
            </ul>
          </div>
          <div className="lg:w-1/3 md:w-1/2 w-full px-4">
            <p className="title-font font-semibold text-gray-900 dark:text-white tracking-widest text-sm mb-3">OPENING HOURS</p>
            <p className="text-sm">Mon - Fri: 9am - 6pm</p>
            <p className="text-sm">Saturday: 10am - 4pm</p>
            <p className="text-sm">Sunday: Closed</p>
          </div>
        </div>
      </div>
      <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-pink-200/50'}`}>
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center sm:text-left">© {currentYear} Agape Flower —
            <a href="https://horizons.hostinger.com" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 ml-1 hover:text-primary" target="_blank">All Rights Reserved</a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a className="text-gray-500 dark:text-gray-400 hover:text-primary">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500 dark:text-gray-400 hover:text-primary">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500 dark:text-gray-400 hover:text-primary">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
