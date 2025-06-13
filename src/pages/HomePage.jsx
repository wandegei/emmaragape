
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Gift, CalendarDays } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext.jsx';

const FeaturedFlowerCard = ({ name, description, price, imageSrc, altText }) => {
  const { theme } = useTheme();
  return (
    <motion.div
      className={`rounded-xl overflow-hidden shadow-lg card-hover-effect ${theme === 'dark' ? 'bg-gray-800 glass-effect' : 'bg-white'}`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img  className="w-full h-64 object-cover" alt={altText} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
      <div className="p-6">
        <h3 className="text-2xl font-['Playfair_Display'] font-bold mb-2 text-primary">{name}</h3>
        <p className={`mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{description}</p>
        <div className="flex justify-between items-center">
          <span className={`text-xl font-semibold ${theme === 'dark' ? 'text-pink-400' : 'text-pink-600'}`}>{price}</span>
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-pink-50 dark:hover:bg-pink-700/30">
            <Link to="/products">View <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};


const HomePage = () => {
  const { theme } = useTheme();
  const featuredFlowers = [
    { name: "Enchanting Roses", description: "A dozen classic red roses, symbolizing deep love and affection.", price: "$49.99", imageSrc: "A dozen classic red roses in a vase", altText: "Classic red roses" },
    { name: "Sunshine Bouquet", description: "Bright yellow sunflowers and white daisies, perfect for a cheerful gift.", price: "$39.99", imageSrc: "Bouquet of sunflowers and daisies", altText: "Sunflowers and daisies bouquet" },
    { name: "Elegant Lilies", description: "Graceful white lilies, representing purity and refined beauty.", price: "$55.00", imageSrc: "Bouquet of white lilies", altText: "Elegant white lilies" },
  ];

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 floral-pattern' : 'bg-pink-50 floral-pattern'}`}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-[70vh] flex items-center justify-center text-center overflow-hidden"
      >
        <img 
          className="absolute inset-0 w-full h-full object-cover filter brightness-50"
          alt="Beautiful assortment of colorful flowers as a hero background"
         src="https://images.unsplash.com/photo-1556868713-d7f308ffd867" />
        <div className="relative z-10 p-8 max-w-3xl mx-auto">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 100 }}
            className="text-5xl md:text-7xl font-bold font-['Playfair_Display'] text-white mb-6 shadow-text"
          >
            Agape Flower
          </motion.h1>
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, type: 'spring', stiffness: 100 }}
            className="text-xl md:text-2xl text-pink-100 mb-10 font-['Poppins']"
          >
            Love in Every Petal – Fresh, Beautiful, Well-Packaged Flowers for All Occasions.
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button asChild size="lg" className="primary-gradient text-white px-10 py-6 text-lg rounded-full shadow-xl hover:scale-105 transition-transform">
              <Link to="/products">Shop Our Flowers <ArrowRight className="w-5 h-5 ml-2" /></Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      <section className="section-padding">
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y:20 }}
            animate={{ opacity: 1, y:0 }}
            transition={{ duration:0.6, delay:0.2 }}
            className="text-4xl font-['Playfair_Display'] font-bold text-center mb-12"
          >
            Featured Flowers
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredFlowers.map((flower, index) => (
              <FeaturedFlowerCard key={index} {...flower} />
            ))}
          </div>
        </div>
      </section>

      <section className={`section-padding ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-pink-100/70'}`}>
        <div className="container mx-auto text-center">
           <motion.h2 
            initial={{ opacity: 0, y:20 }}
            animate={{ opacity: 1, y:0 }}
            transition={{ duration:0.6, delay:0.2 }}
            className="text-4xl font-['Playfair_Display'] font-bold mb-12"
          >
            Our Services
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: ShoppingBag, title: 'Custom Bouquets', desc: 'Tailor-made arrangements for your unique taste.' },
              { icon: Gift, title: 'Gift Hampers', desc: 'Beautifully curated hampers for any celebration.' },
              { icon: CalendarDays, title: 'Event Floral Décor', desc: 'Stunning floral designs for your special events.' },
            ].map((service, index) => (
              <motion.div 
                key={index} 
                className={`p-8 rounded-xl shadow-lg card-hover-effect ${theme === 'dark' ? 'bg-gray-700 glass-effect' : 'bg-white'}`}
                initial={{ opacity: 0, scale:0.9 }}
                animate={{ opacity: 1, scale:1 }}
                transition={{ duration:0.5, delay:0.2 + index*0.1 }}
              >
                <service.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-['Playfair_Display'] font-semibold mb-2">{service.title}</h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{service.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div 
             initial={{ opacity: 0, y:20 }}
             animate={{ opacity: 1, y:0 }}
             transition={{ duration:0.6, delay:0.5 }}
             className="mt-12"
          >
            <Button asChild size="lg" className="secondary-button px-10 py-6 text-lg rounded-full">
              <Link to="/services">Explore All Services</Link>
            </Button>
          </motion.div>
        </div>
      </section>
      
      <section className="section-padding">
        <div className="container mx-auto">
          <div className={`rounded-xl p-8 md:p-16 text-center ${theme === 'dark' ? 'bg-gray-800 floral-pattern' : 'bg-pink-600 floral-pattern text-white'}`}>
            <motion.h2 
              initial={{ opacity: 0, y:20 }}
              animate={{ opacity: 1, y:0 }}
              transition={{ duration:0.6 }}
              className={`text-3xl md:text-4xl font-bold font-['Playfair_Display'] mb-6 ${theme === 'dark' ? 'text-pink-300' : 'text-white'}`}
            >
              Ready to Send Some Love?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y:20 }}
              animate={{ opacity: 1, y:0 }}
              transition={{ duration:0.6, delay:0.2 }}
              className={`text-lg md:text-xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-pink-100'}`}
            >
              Browse our exquisite collection or get in touch for a custom creation.
            </motion.p>
            <motion.div
              initial={{ opacity:0, scale:0.8 }}
              animate={{ opacity:1, scale:1 }}
              transition={{ duration:0.5, delay:0.4 }}
            >
              <Button asChild size="lg" className={`px-10 py-6 text-lg rounded-full shadow-xl hover:scale-105 transition-transform ${theme === 'dark' ? 'primary-gradient text-white' : 'bg-white text-pink-600 hover:bg-pink-50'}`}>
                <Link to="/contact">Contact Us Today</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
