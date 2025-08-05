import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Mail, Sparkles } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-neon-blue-dark to-neon-purple-dark rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <span className="text-xl lg:text-2xl font-bold text-white">
              ColdEmail AI
            </span>
          </motion.div>



          {/* CTA Button */}
          <motion.button
            className="hidden lg:flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-neon-blue-dark to-neon-purple-dark hover:from-neon-purple-dark hover:to-neon-blue-dark text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 button-hover glare-hover"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Get Started</span>
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 text-white hover:text-blue-400 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-4 border-t border-white/10">
            <motion.button
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-neon-blue-dark to-neon-purple-dark hover:from-neon-purple-dark hover:to-neon-blue-dark text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 button-hover glare-hover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isMobileMenuOpen ? 1 : 0, 
                y: isMobileMenuOpen ? 0 : 20 
              }}
              transition={{ duration: 0.3, delay: 0.4 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Get Started</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 