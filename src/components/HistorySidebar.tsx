import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, 
  Copy, 
  Check, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  User,
  Target,
  Gift,
  Zap
} from 'lucide-react';
import { EmailHistoryEntry } from '../types/email';
import { getEmailHistory, deleteEmailFromHistory, clearEmailHistory } from '../utils/emailHistory';
import Toast from './Toast';

interface HistorySidebarProps {
  onReuseEmail: (inputs: EmailHistoryEntry['inputs']) => void;
  history: EmailHistoryEntry[];
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ onReuseEmail, history }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleCopy = async (entry: EmailHistoryEntry, id: number) => {
    try {
      const fullEmail = `Subject: ${entry.subject}\n\n${entry.body}`;
      await navigator.clipboard.writeText(fullEmail);
      setCopiedId(id);
      setToastMessage('Email copied to clipboard!');
      setIsToastVisible(true);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setToastMessage('Failed to copy email');
      setIsToastVisible(true);
    }
  };

  const handleDelete = (id: number) => {
    deleteEmailFromHistory(id);
  };

  const handleClearAll = () => {
    clearEmailHistory();
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const truncateText = (text: string, maxLength: number = 50) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const handleToastClose = () => {
    setIsToastVisible(false);
  };

  return (
    <>
      {/* Toast Notification */}
      <Toast 
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={handleToastClose}
      />

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 glass-panel p-3 rounded-full neon-glow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <ChevronLeft className="w-6 h-6 text-neon-blue" />
        ) : (
          <ChevronRight className="w-6 h-6 text-neon-blue" />
        )}
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            exit={{ x: -400 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-96 z-40 glass-panel border-r border-glass-medium"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-glass-medium">
                <div className="flex items-center gap-3">
                  <History className="w-6 h-6 text-neon-blue" />
                  <h2 className="text-xl font-semibold">Email History</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-glass-medium rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {history.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No emails generated yet</p>
                    <p className="text-sm">Your history will appear here</p>
                  </div>
                ) : (
                  <>
                    {/* Clear All Button */}
                    <div className="flex justify-end">
                      <button
                        onClick={handleClearAll}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Clear All
                      </button>
                    </div>

                    {/* History Items */}
                    {history.map((entry) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-panel p-4 rounded-xl border border-glass-medium"
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Clock className="w-4 h-4" />
                            {formatDate(entry.timestamp)}
                          </div>
                          <button
                            onClick={() => handleDelete(entry.id)}
                            className="p-1 hover:bg-glass-medium rounded transition-colors text-gray-400 hover:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Inputs Summary */}
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2 text-xs">
                            <User className="w-3 h-3 text-neon-blue" />
                            <span className="text-gray-300">{truncateText(entry.inputs.bio)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <Gift className="w-3 h-3 text-neon-purple" />
                            <span className="text-gray-300">{truncateText(entry.inputs.offer)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <Target className="w-3 h-3 text-neon-pink" />
                            <span className="text-gray-300">{truncateText(entry.inputs.target)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <Zap className="w-3 h-3 text-neon-green" />
                            <span className="text-gray-300">{entry.inputs.useCase}</span>
                          </div>
                        </div>

                                                 {/* Actions */}
                         <div className="flex gap-2">
                           <button
                             onClick={() => handleCopy(entry, entry.id)}
                             className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-glass-dark border border-glass-medium rounded-lg hover:border-neon-blue transition-colors text-sm"
                           >
                            {copiedId === entry.id ? (
                              <>
                                <Check className="w-4 h-4 text-neon-green" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                Copy Email
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => onReuseEmail(entry.inputs)}
                            className="flex-1 py-2 px-3 bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink rounded-lg text-sm font-medium transition-all duration-300"
                          >
                            Reuse
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HistorySidebar; 