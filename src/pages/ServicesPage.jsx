
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Gift, ShoppingBag, CalendarDays, Truck, Building, Star } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext.jsx';

const ServiceCard = ({ icon: Icon, title, description, delay }) => {
  const { theme } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`p-8 rounded-xl shadow-xl card-hover-effect text-center ${theme === 'dark' ? 'bg-gray-800 glass-effect' : 'bg-white'}`}
    >
      <Icon className="w-16 h-16 text-primary mx-auto mb-6" />
      <h3 className="text-2xl font-['Playfair_Display'] font-semibold mb-3 text-gray-800 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
    </motion.div>
  );
};

const ServicesPage = () => {
  const { theme } = useTheme();
  const services = [
    { icon: ShoppingBag, title: "Custom Bouquets", description: "Artistically crafted bouquets tailored to your specific preferences and occasions. Choose your flowers, colors, and style.", delay: 0.1 },
    { icon: Gift, title: "Gift Hampers", description: "Thoughtfully curated gift hampers combining fresh flowers with gourmet treats, wines, or spa items for a complete gifting experience.", delay: 0.2 },
    { icon: Building, title: "Corporate Delivery", description: "Regular floral arrangements for offices, receptions, and corporate events. Enhance your workspace with natural beauty.", delay: 0.3 },
    { icon: Truck, title: "Same-Day Delivery", description: "Need flowers urgently? We offer reliable same-day delivery within Nairobi for orders placed before our cut-off time.", delay: 0.4 },
    { icon: CalendarDays, title: "Event Floral Décor", description: "From intimate gatherings to large celebrations, we provide stunning floral decorations to make your event unforgettable.", delay: 0.5 },
    { icon: Star, title: "Subscription Services", description: "Enjoy fresh flowers regularly with our convenient subscription plans. Perfect for homes or businesses.", delay: 0.6 },
  ];

  return (
    <div className={`section-padding ${theme === 'dark' ? 'bg-gray-900 floral-pattern' : 'bg-pink-50 floral-pattern'}`}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold font-['Playfair_Display'] text-primary mb-4">Our Floral Services</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Bringing beauty and joy to every moment with our range of expert floral services.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className={`p-10 rounded-xl shadow-2xl text-center ${theme === 'dark' ? 'bg-gray-800/70 glass-effect' : 'bg-white/70 glass-effect'}`}
        >
          <h2 className="text-3xl font-['Playfair_Display'] font-semibold mb-6 text-gray-800 dark:text-white">Have a Special Request?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto leading-relaxed">
            If you have a unique floral need or a specific vision for an event, don't hesitate to reach out. 
            Our talented florists love a creative challenge and are here to bring your ideas to life.
          </p>
          <Button asChild size="lg" className="primary-gradient text-white px-10 py-6 text-lg rounded-full shadow-xl hover:scale-105 transition-transform">
            <Link to="/contact">Discuss Your Needs</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesPage;
