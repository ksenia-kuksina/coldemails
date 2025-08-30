import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Check, Mail, Sparkles } from 'lucide-react';
import Toast from './Toast';

interface ResultPageProps {
  email: { subject: string; body: string };
  onBack: () => void;
  onRegenerate?: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ email, onBack, onRegenerate }) => {
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const emailParts = email;

  const handleCopy = async () => {
    try {
      const fullEmail = `Subject: ${email.subject}\n\n${email.body}`;
      await navigator.clipboard.writeText(fullEmail);
      setCopied(true);
      setToastMessage('Email copied to clipboard!');
      setIsToastVisible(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setToastMessage('Failed to copy email');
      setIsToastVisible(true);
    }
  };

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

  const handleToastClose = () => {
    setIsToastVisible(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Toast Notification */}
      <Toast 
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={handleToastClose}
      />
      
      <motion.div
        className="w-full max-w-4xl mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex items-center justify-between mb-6"
          variants={itemVariants}
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 glass-panel rounded-xl hover:bg-glass-medium transition-colors neon-glow button-hover glare-hover"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Generate Another</span>
          </button>

          <div className="flex items-center gap-2 px-4 py-2 glass-panel rounded-full">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium">Email Generated</span>
          </div>
        </motion.div>

        <motion.h1 
          className="text-4xl md:text-5xl font-space font-bold text-center mb-4 text-white"
          variants={itemVariants}
        >
          Your Cold Email is Ready
        </motion.h1>

        <motion.p 
          className="text-xl text-gray-300 text-center max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Copy and customize this email for your outreach campaigns
        </motion.p>
      </motion.div>

      {/* Email Display */}
      <motion.div
        className="w-full max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="glass-panel p-8 neon-glow"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-semibold">Generated Email</h2>
            </div>
            
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-glass-dark border border-glass-medium rounded-xl hover:border-neon-blue transition-colors button-hover glare-hover"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-neon-green" />
                  <span className="text-neon-green">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

                     <div className="space-y-4">
            
             <div className="bg-glass-dark border border-glass-medium rounded-xl p-4">
               <div className="flex items-center gap-2 mb-2">
                 <span className="text-white font-semibold text-lg">Subject:</span>
               </div>
               <p className="text-white font-inter text-sm leading-relaxed">
                 {emailParts.subject}
               </p>
             </div>
             
             {/* Body */}
             <div className="bg-glass-dark border border-glass-medium rounded-xl p-4 max-h-80 overflow-y-auto">
               <div className="flex items-center gap-2 mb-2">
                 <span className="text-white font-semibold text-lg">Body:</span>
               </div>
               <pre className="text-white font-inter text-sm leading-relaxed whitespace-pre-wrap">
                 {emailParts.body}
               </pre>
             </div>
           </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-8"
          variants={itemVariants}
        >
          <button
            onClick={handleCopy}
            className="flex-1 bg-gradient-to-r from-neon-blue-dark to-neon-purple-dark hover:from-neon-purple-dark hover:to-neon-blue-dark text-white font-bold py-4 px-8 rounded-2xl text-lg neon-glow transition-all duration-300 flex items-center justify-center gap-3 button-hover glare-hover"
          >
            <Copy className="w-6 h-6" />
            Copy Email
          </button>

          <button
            onClick={onBack}
            className="flex-1 bg-glass-light border border-glass-medium hover:bg-glass-medium text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 flex items-center justify-center gap-3 button-hover glare-hover"
          >
            <Sparkles className="w-6 h-6 text-white" />
            Generate Another
          </button>
        </motion.div>
      </motion.div>

      {/* Tips Section */}
      <motion.div
        className="w-full max-w-4xl mt-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="glass-panel p-6"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold mb-4 text-white">Pro Tips for Better Results:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Personalize the email with specific details about the recipient's company</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Keep it under 150 words for better open rates</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Follow up within 3-5 days if you don't get a response</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Test different subject lines to improve open rates</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResultPage; 