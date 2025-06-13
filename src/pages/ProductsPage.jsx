
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShoppingCart, Tag, Filter, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext.jsx';

const ProductCard = ({ product }) => {
  const { theme } = useTheme();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4 }}
      className={`rounded-xl overflow-hidden shadow-lg card-hover-effect ${theme === 'dark' ? 'bg-gray-800 glass-effect' : 'bg-white'}`}
    >
      <img  className="w-full h-72 object-cover" alt={product.altText} src="https://images.unsplash.com/photo-1671376354106-d8d21e55dddd" />
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-['Playfair_Display'] font-bold text-primary">{product.name}</h3>
          <span className={`text-lg font-semibold ${theme === 'dark' ? 'text-pink-400' : 'text-pink-600'}`}>{product.price}</span>
        </div>
        <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm h-16 overflow-hidden`}>{product.description}</p>
        <Button 
          className="w-full primary-gradient text-white"
          onClick={() => alert('🚧 This feature isn\'t implemented yet—but don\'t worry! You can request it in your next prompt! 🚀')}
        >
          <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
        </Button>
      </div>
    </motion.div>
  );
};

const ProductsPage = () => {
  const { theme } = useTheme();
  const allProducts = [
    { id: 1, name: "Ruby Red Roses", description: "A stunning bouquet of 12 long-stemmed ruby red roses.", price: "$59.99", category: "Bouquets", imageSrc: "Bouquet of 12 red roses", altText: "Ruby Red Roses Bouquet"},
    { id: 2, name: "Pink Passion Roses", description: "Elegant bouquet featuring 24 delicate pink roses.", price: "$79.99", category: "Roses", imageSrc: "Bouquet of 24 pink roses", altText: "Pink Passion Roses Bouquet"},
    { id: 3, name: "Luxury Gift Hamper", description: "Exquisite hamper with mixed flowers, chocolates, and a small teddy.", price: "$120.00", category: "Hampers", imageSrc: "Luxury gift hamper with flowers and chocolates", altText: "Luxury Gift Hamper"},
    { id: 4, name: "Vibrant Tulip Mix", description: "A cheerful mix of colorful tulips to brighten any day.", price: "$45.00", category: "Bouquets", imageSrc: "Colorful mixed tulips in a vase", altText: "Vibrant Tulip Mix Bouquet"},
    { id: 5, name: "White Lily Grace", description: "Symbol of purity, a classic bouquet of white lilies.", price: "$65.00", category: "Bouquets", imageSrc: "Classic white lily bouquet", altText: "White Lily Grace Bouquet"},
    { id: 6, name: "Sunshine Yellow Roses", description: "A dozen bright yellow roses, perfect for friendship.", price: "$55.00", category: "Roses", imageSrc: "Dozen yellow roses in a bouquet", altText: "Sunshine Yellow Roses"},
    { id: 7, "name": "Orchid Serenity Hamper", "description": "A sophisticated hamper featuring a potted orchid, fine tea, and biscuits.", "price": "$95.00", "category": "Hampers", "imageSrc": "Hamper with potted orchid and tea set", altText: "Orchid Serenity Hamper"},
    { id: 8, "name": "Lavender Dreams Roses", "description": "Unique and enchanting lavender colored roses, a dozen.", "price": "$69.99", "category": "Roses", "imageSrc": "Bouquet of lavender roses", altText: "Lavender Dreams Roses Bouquet"},
    { id: 9, "name": "Gourmet Delight Hamper", "description": "A lavish hamper filled with seasonal flowers, artisanal cheeses, crackers, and a bottle of wine.", "price": "$150.00", "category": "Hampers", "imageSrc": "Gourmet hamper with flowers cheese and wine", altText: "Gourmet Delight Hamper"},
  ];

  const categories = ["All", ...new Set(allProducts.map(p => p.category))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? allProducts 
    : allProducts.filter(p => p.category === activeCategory);

  return (
    <div className={`section-padding ${theme === 'dark' ? 'bg-gray-900 floral-pattern' : 'bg-pink-50 floral-pattern'}`}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold font-['Playfair_Display'] text-primary mb-4">Our Floral Collection</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Browse our exquisite selection of flowers and gifts, perfect for any occasion.</p>
        </motion.div>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-6 py-2 text-sm transition-all duration-300 
                ${activeCategory === category 
                  ? 'primary-gradient text-white shadow-lg' 
                  : (theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white' : 'border-pink-300 text-pink-700 hover:bg-pink-100 hover:text-pink-800')}`}
            >
              {category === "All" ? <Filter className="w-4 h-4 mr-2" /> : <Tag className="w-4 h-4 mr-2" />} {category}
            </Button>
          ))}
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>
        {filteredProducts.length === 0 && (
           <motion.p 
            initial={{opacity:0}} animate={{opacity:1}}
            className="text-center text-gray-500 dark:text-gray-400 col-span-full mt-10 text-lg"
          >
            No products found in this category.
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
