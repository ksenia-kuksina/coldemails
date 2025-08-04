import { EmailHistoryEntry } from '../types/email';

const HISTORY_KEY = 'cold-email-history';
const MAX_HISTORY = 10;

export const saveEmailToHistory = (entry: Omit<EmailHistoryEntry, 'id' | 'timestamp'>) => {
  try {
    const history = getEmailHistory();
    const newEntry: EmailHistoryEntry = {
      ...entry,
      id: Date.now(),
      timestamp: Date.now(),
    };
    
    // Add new entry to the beginning
    const updatedHistory = [newEntry, ...history];
    
    // Keep only the last MAX_HISTORY entries
    const trimmedHistory = updatedHistory.slice(0, MAX_HISTORY);
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmedHistory));
    return true;
  } catch (error) {
    console.error('Failed to save email to history:', error);
    return false;
  }
};

export const getEmailHistory = (): EmailHistoryEntry[] => {
  try {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Failed to get email history:', error);
    return [];
  }
};

export const clearEmailHistory = () => {
  try {
    localStorage.removeItem(HISTORY_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear email history:', error);
    return false;
  }
};

export const deleteEmailFromHistory = (id: number) => {
  try {
    const history = getEmailHistory();
    const updatedHistory = history.filter(entry => entry.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    return true;
  } catch (error) {
    console.error('Failed to delete email from history:', error);
    return false;
  }
}; 