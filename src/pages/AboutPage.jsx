
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Heart } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext.jsx';

const AboutPage = () => {
  const { theme } = useTheme();
  return (
    <div className={`section-padding ${theme === 'dark' ? 'bg-gray-900 floral-pattern' : 'bg-pink-50 floral-pattern'}`}>
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold font-['Playfair_Display'] text-primary mb-4">About Agape Flower</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Discover the heart and passion behind every petal we arrange.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <img  
              className="rounded-xl shadow-2xl object-cover w-full h-[400px] md:h-[500px]" 
              alt="Florist arranging a beautiful bouquet"
             src="https://images.unsplash.com/photo-1691258822319-6e0093fb8b46" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h2 className="text-3xl font-['Playfair_Display'] font-semibold mb-6 text-gray-800 dark:text-white">Our Story</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Agape Flower was born from a deep-seated love for nature's artistry and the joy flowers bring to people's lives. 
              Founded in [Year, e.g., 2015], we started as a small local shop with a big dream: to deliver not just flowers, but emotions, 
              beautifully packaged and thoughtfully arranged.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Over the years, our passion has only grown. We believe that every occasion, big or small, deserves the touch of
              floral elegance. "Agape" means unconditional love, and that's the principle guiding every bouquet we craft and every customer we serve.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className={`${theme === 'dark' ? 'bg-gray-800/70 glass-effect' : 'bg-white/70 glass-effect'} p-10 rounded-xl shadow-xl mb-16`}
        >
          <h2 className="text-3xl font-['Playfair_Display'] font-semibold text-center mb-10 text-gray-800 dark:text-white">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Heart className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold font-['Poppins'] mb-2 text-gray-700 dark:text-gray-200">Passion for Flowers</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">We are genuinely passionate about floristry and handpick the freshest blooms.</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold font-['Poppins'] mb-2 text-gray-700 dark:text-gray-200">Customer Delight</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Your happiness is our priority. We strive to exceed your expectations.</p>
            </div>
            <div className="flex flex-col items-center">
              <Target className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold font-['Poppins'] mb-2 text-gray-700 dark:text-gray-200">Quality & Freshness</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">We guarantee the quality and freshness of every stem we use.</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-['Playfair_Display'] font-semibold mb-8 text-gray-800 dark:text-white">Meet Our Team</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Placeholder for team members */}
            <div className={`p-6 rounded-lg shadow-lg text-center w-64 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <img  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" alt="Team member Jane Doe" src="https://images.unsplash.com/photo-1603098437768-4b9ba6b4d179" />
              <h4 className="text-lg font-semibold font-['Poppins'] text-gray-700 dark:text-gray-200">Jane Doe</h4>
              <p className="text-sm text-primary">Lead Florist</p>
            </div>
            <div className={`p-6 rounded-lg shadow-lg text-center w-64 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <img  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" alt="Team member John Smith" src="https://images.unsplash.com/photo-1702501987500-a8af39795497" />
              <h4 className="text-lg font-semibold font-['Poppins'] text-gray-700 dark:text-gray-200">John Smith</h4>
              <p className="text-sm text-primary">Customer Relations</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
