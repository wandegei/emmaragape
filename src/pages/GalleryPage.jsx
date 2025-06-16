
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext.jsx';

const galleryItems = [
  { id: 1, type: 'event', srcContent: 'Wedding ceremony arch decorated with white roses and greenery', altText: "Wedding arch with white roses", category: 'Events' },
  { id: 2, type: 'product', srcContent: 'Elegant bouquet of pink tulips in a crystal vase', altText: "Bouquet of pink tulips", category: 'Products' },
  { id: 3, type: 'testimonial', srcContent: 'Customer holding a large colorful bouquet smiling', altText: "Happy customer with bouquet", category: 'Customers', quote: "Agape Flower made my wedding day absolutely magical! The flowers were breathtaking.", author: "Sarah L." },
  { id: 4, type: 'event', srcContent: 'Corporate event centerpiece with orchids and calla lilies', altText: "Corporate event floral centerpiece", category: 'Events' },
  { id: 5, type: 'product', srcContent: 'A beautiful gift hamper with red roses and chocolates', altText: "Gift hamper with roses and chocolates", category: 'Products' },
  { id: 6, type: 'product', srcContent: 'Close up of a vibrant mixed flower bouquet', altText: "Vibrant mixed flower bouquet", category: 'Products' },
  { id: 7, type: 'event', srcContent: 'Birthday party table decorated with bright gerbera daisies', altText: "Birthday party floral decoration", category: 'Events' },
  { id: 8, type: 'testimonial', srcContent: 'Person receiving a surprise flower delivery at their office', altText: "Surprise flower delivery", category: 'Customers', quote: "The most beautiful anniversary flowers I've ever received! Thank you!", author: "Mark T." },
  { id: 9, type: 'product', srcContent: 'A rustic bouquet with wildflowers and lavender', altText: "Rustic wildflower bouquet", category: 'Products' },
];

const GalleryPage = () => {
  const { theme } = useTheme();
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState('All');

  const selectedItem = galleryItems.find(item => item.id === selectedId);

  const categories = ['All', 'Events', 'Products', 'Customers'];
  const filteredItems = filter === 'All' ? galleryItems : galleryItems.filter(item => item.category === filter);

  const handleNext = () => {
    const currentIndex = filteredItems.findIndex(item => item.id === selectedId);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedId(filteredItems[nextIndex].id);
  };

  const handlePrev = () => {
    const currentIndex = filteredItems.findIndex(item => item.id === selectedId);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedId(filteredItems[prevIndex].id);
  };


  return (
    <div className={`section-padding ${theme === 'dark' ? 'bg-gray-900 floral-pattern' : 'bg-pink-50 floral-pattern'}`}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold font-['Playfair_Display'] text-primary mb-4">Gallery</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">A glimpse into our world of beautiful blooms, happy clients, and memorable events.</p>
        </motion.div>

        <div className="flex justify-center mb-10 space-x-2 sm:space-x-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-colors duration-300
                ${filter === category 
                  ? 'primary-gradient text-white shadow-lg' 
                  : (theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-pink-700 hover:bg-pink-100 shadow')}`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className={`rounded-lg overflow-hidden shadow-lg cursor-pointer card-hover-effect aspect-square relative group ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
                onClick={() => setSelectedId(item.id)}
              >
                <img  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" alt={item.altText} src="https://www.gardenia.net/wp-content/uploads/2023/05/rose-lady-of-shalott-ausnyson-300x300.webp" />
                {item.type === 'testimonial' && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-center text-xs sm:text-sm p-2">&ldquo;{item.quote.substring(0,50)}...&rdquo;</p>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selectedId && selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedId(null)}
            >
              <motion.div
                layoutId={selectedId.toString()}
                className={`relative rounded-lg shadow-2xl overflow-hidden max-w-3xl max-h-[90vh] w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
                onClick={(e) => e.stopPropagation()} 
              >
                <img  className="w-full max-h-[70vh] object-contain" alt={selectedItem.altText} src="https://images.unsplash.com/photo-1700396093548-c19114bf2dec" />
                {selectedItem.type === 'testimonial' && (
                  <div className="p-6">
                    <p className={`text-lg italic mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>&ldquo;{selectedItem.quote}&rdquo;</p>
                    <p className={`text-right font-semibold ${theme === 'dark' ? 'text-pink-400' : 'text-pink-600'}`}>- {selectedItem.author}</p>
                  </div>
                )}
                <button onClick={() => setSelectedId(null)} className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors">
                  <X size={24} />
                </button>
                <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors">
                  <ChevronLeft size={28} />
                </button>
                <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors">
                  <ChevronRight size={28} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GalleryPage;
