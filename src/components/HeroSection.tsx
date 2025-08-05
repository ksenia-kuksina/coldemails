import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onScrollToForm: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToForm }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section className="h-screen flex items-center justify-center relative w-screen">
      {/* Content */}
      <motion.div 
        className="max-w-4xl text-center relative z-10 px-4 mx-auto -mt-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Headline */}
        <motion.h1 
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-7"
          variants={itemVariants}
        >
          Write Laser-Targeted
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-purple-600 bg-clip-text text-transparent">
            Cold Emails
          </span>
          <br />
          in Seconds
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8 font-light"
          variants={itemVariants}
        >
          Our AI crafts tailored cold emails based on your background, offer, target, and industry. 
          <span className="text-white font-light"> No fluff. Just conversion-ready copy.</span>
        </motion.p>

        {/* CTA Button */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariants}
        >
          <button
            onClick={onScrollToForm}
            className="group px-8 py-4 rounded-xl bg-gradient-to-r from-neon-blue-dark to-neon-purple-dark hover:from-neon-purple-dark hover:to-neon-blue-dark text-white font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl button-hover glare-hover"
          >
            Generate My Email
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;