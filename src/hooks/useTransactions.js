import React, { useState, useEffect } from 'react';
import { initialTransactions, getIconComponent } from '../data/transactions';

// LocalStorage key for transactions
const TRANSACTIONS_STORAGE_KEY = 'budgetApp_transactions';

// Helper to get current transactions (either from localStorage or default)
export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadTransactions = () => {
      try {
        const savedTransactions = localStorage.getItem(TRANSACTIONS_STORAGE_KEY);
        if (savedTransactions) {
          const parsedTransactions = JSON.parse(savedTransactions);
          // Convert icon strings back to components
          const transactionsWithIcons = parsedTransactions.map(tx => ({
            ...tx,
            icon: getIconComponent(tx.icon)
          }));
          return transactionsWithIcons;
        }
      } catch (error) {
        console.error('Error loading transactions from localStorage:', error);
      }
      
      // Return default transactions with icons
      return initialTransactions.map(tx => ({
        ...tx,
        icon: getIconComponent(tx.icon)
      }));
    };

    setTransactions(loadTransactions());
    
    // Listen for storage changes to update when transactions are added/removed
    const handleStorageChange = () => {
      setTransactions(loadTransactions());
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab updates
    window.addEventListener('transactionsUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('transactionsUpdated', handleStorageChange);
    };
  }, []);

  return transactions;
};
