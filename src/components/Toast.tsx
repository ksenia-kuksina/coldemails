import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
                 <motion.div
           initial={{ opacity: 0, y: 50, scale: 0.8 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           exit={{ opacity: 0, y: 50, scale: 0.8 }}
           transition={{ type: "spring", damping: 25, stiffness: 200 }}
           className="fixed bottom-8 right-8 z-50 bg-slate-800/95 backdrop-blur-md p-4 rounded-xl border-2 border-neon-green shadow-2xl shadow-neon-green/50"
         >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <Check className="w-5 h-5 text-neon-green" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">{message}</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1 hover:bg-glass-medium rounded transition-colors"
            >
              <span className="text-gray-400 hover:text-white">×</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast; 