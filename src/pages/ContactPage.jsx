
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext.jsx';

const ContactPage = () => {
  const { theme } = useTheme();
  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message Sent! 🌸",
      description: "Thank you for reaching out. We'll get back to you soon!",
    });
    e.target.reset();
  };

  const contactInfo = [
    { icon: Phone, text: "+256780252324", href: "tel:+256780252324" },
    { icon: MessageCircle, text: "Chat on WhatsApp", href: "https://wa.me/256780252324" }, // Placeholder link
    { icon: Mail, text: "agapeflowers@29gmail.com", href: "mailto:agapeflowers@29gmail.com" },
    { icon: MapPin, text: "1Plot 122 Mbale City", href: "#map" }, // Link to map section
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
          <h1 className="text-5xl font-bold font-['Playfair_Display'] text-primary mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">We'd love to hear from you! Whether it's for an order, a query, or just to say hello.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`p-8 rounded-xl shadow-xl ${theme === 'dark' ? 'bg-gray-800/70 glass-effect' : 'bg-white/70 glass-effect'}`}
          >
            <h2 className="text-3xl font-['Playfair_Display'] font-semibold mb-6 text-gray-800 dark:text-white">Contact Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <Input type="text" name="name" id="name" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <Input type="email" name="email" id="email" required />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number (Optional)</label>
                <Input type="tel" name="phone" id="phone" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <Textarea name="message" id="message" rows="4" required />
              </div>
              <div>
                <Button type="submit" className="w-full primary-gradient text-white py-3 text-base">
                  Send Message
                </Button>
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-8"
          >
            <div className={`p-8 rounded-xl shadow-xl ${theme === 'dark' ? 'bg-gray-800/70 glass-effect' : 'bg-white/70 glass-effect'}`}>
              <h3 className="text-2xl font-['Playfair_Display'] font-semibold mb-4 text-gray-800 dark:text-white">Our Details</h3>
              <ul className="space-y-3">
                {contactInfo.map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                    <item.icon className="w-6 h-6 text-primary mr-3 flex-shrink-0" />
                    <a href={item.href} target={item.href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="hover:text-primary transition-colors">{item.text}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-8 rounded-xl shadow-xl ${theme === 'dark' ? 'bg-gray-800/70 glass-effect' : 'bg-white/70 glass-effect'}`}>
              <h3 className="text-2xl font-['Playfair_Display'] font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
                <Clock className="w-6 h-6 text-primary mr-3" /> Business Hours
              </h3>
              <p className="text-gray-700 dark:text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-700 dark:text-gray-300">Saturday: 10:00 AM - 4:00 PM</p>
              <p className="text-gray-700 dark:text-gray-300">Sunday & Public Holidays: Closed</p>
            </div>
             <div
  id="map"
  className={`rounded-xl shadow-xl overflow-hidden h-64 ${
    theme === 'dark'
      ? 'bg-gray-800/70 glass-effect'
      : 'bg-white/70 glass-effect'
  }`}
>
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127241.17559984164!2d34.09701375!3d1.0824159499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177fc1f59f93e4a9%3A0x2501a9b0d361cabc!2sMbale!5e0!3m2!1sen!2sug!4v1718526671771!5m2!1sen!2sug"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Mbale City Map"
  ></iframe>
</div>


          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
