import React, { useState, useEffect } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { initialTransactions, categoryOptions, getIconComponent } from '../data/transactions';

// LocalStorage key for transactions
const TRANSACTIONS_STORAGE_KEY = 'budgetApp_transactions';

// Helper functions for localStorage
const loadTransactionsFromStorage = () => {
  try {
    const savedTransactions = localStorage.getItem(TRANSACTIONS_STORAGE_KEY);
    if (savedTransactions) {
      return JSON.parse(savedTransactions);
    }
  } catch (error) {
    console.error('Error loading transactions from localStorage:', error);
  }
  return initialTransactions; // Return default transactions if no saved data or error
};

const saveTransactionsToStorage = (transactions) => {
  try {
    localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error('Error saving transactions to localStorage:', error);
  }
};

// Helper function to format today's date
const getTodayDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}.${month}.${year}`;
};

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [open, setOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    name: '',
    amount: '',
    category: 'Food Delivery'
  });

  // Load transactions from localStorage on component mount
  useEffect(() => {
    const savedTransactions = loadTransactionsFromStorage();
    setTransactions(savedTransactions);
  }, []);

  // Save transactions to localStorage whenever transactions change
  useEffect(() => {
    if (transactions.length > 0) {
      saveTransactionsToStorage(transactions);
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('transactionsUpdated'));
    }
  }, [transactions]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewTransaction({
      name: '',
      amount: '',
      category: 'Food Delivery'
    });
  };

  const handleInputChange = (field) => (event) => {
    setNewTransaction(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = () => {
    if (newTransaction.name && newTransaction.amount && newTransaction.category) {
      const amount = parseFloat(newTransaction.amount);
      const selectedCategory = categoryOptions.find(option => option.value === newTransaction.category);

      const transaction = {
        name: newTransaction.name,
        category: newTransaction.category,
        icon: selectedCategory?.icon || "FaHamburger",
        color: selectedCategory?.color || "#f7e1c5",
        amount: amount,
        date: getTodayDate(),
      };

      // Add new transaction to the beginning of the array (most recent first)
      setTransactions(prev => [transaction, ...prev]);
      handleClose();
    }
  };

  const handleDeleteTransaction = (index) => {
    setTransactions(prev => prev.filter((_, i) => i !== index));
  };
  return (
    <div className="p-4 flex flex-col items-center rounded-b-lg shadow-lg bg-white min-h-screen">
      <div className="w-full max-w-2xl mb-6">
        
        <h1 className="text-2xl font-bold mb-4 text-zinc-800">Transactions</h1>
        
        {/* Add Transaction Button */}
        <div className="bg-white rounded-2xl shadow-lg flex items-center justify-between px-6 py-5 mb-4">
          <div>
            <h2 className="text-lg font-bold">Add a transaction</h2>
            <p className="text-sm text-zinc-500">Track your spending and income</p>
          </div>
          <Button
            variant="contained"
            color="inherit"
            className="rounded-full shadow"
            sx={{ minWidth: 0, padding: 1, background: '#f3f4f6' }}
            onClick={handleClickOpen}
          >
            <IoIosAddCircleOutline className="text-2xl text-zinc-700" />
          </Button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4">
          {transactions.map((tx, idx) => (
            <div
              key={idx}
              className="flex items-center py-3 border-b last:border-b-0"
            >
              <div
                className="flex items-center justify-center rounded-full mr-4"
                style={{
                  backgroundColor: tx.color,
                  width: 40,
                  height: 40,
                  fontSize: 20,
                }}
              >
                {getIconComponent(tx.icon)}
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-semibold text-zinc-800">{tx.name}</span>
                <span className="text-xs text-zinc-500">{tx.category}</span>
              </div>
              <div className="flex flex-col items-end min-w-[90px] mr-3">
                <span className={`font-bold ${tx.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount).toLocaleString()}
                </span>
                <span className="text-xs text-zinc-400">{tx.date}</span>
              </div>
              {/* Delete button */}
              <IconButton
                onClick={() => handleDeleteTransaction(idx)}
                sx={{
                  padding: '4px',
                  color: '#6b7280',
                  '&:hover': {
                    backgroundColor: '#fee2e2',
                    color: '#dc2626',
                  },
                }}
                size="small"
              >
                <MdDeleteOutline size={16} />
              </IconButton>
            </div>
          ))}
        </div>

        {/* Add Transaction Dialog */}
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Transaction</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Transaction Name"
              type="text"
              fullWidth
              variant="outlined"
              value={newTransaction.name}
              onChange={handleInputChange('name')}
              sx={{ mb: 2 }}
              placeholder="e.g., Starbucks, Gas Station, Part-time Job"
            />
            <TextField
              margin="dense"
              label="Amount"
              type="number"
              fullWidth
              variant="outlined"
              value={newTransaction.amount}
              onChange={handleInputChange('amount')}
              sx={{ mb: 2 }}
              inputProps={{ step: 0.01 }}
              placeholder="Enter positive for income, negative for expense"
              helperText="Use positive numbers for income, negative for expenses"
            />
            <TextField
              select
              margin="dense"
              label="Category"
              fullWidth
              variant="outlined"
              value={newTransaction.category}
              onChange={handleInputChange('category')}
            >
              {categoryOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <div className="flex items-center">
                    <div 
                      className="w-8 h-8 rounded-full mr-3 flex items-center justify-center text-lg" 
                      style={{ backgroundColor: option.color }}
                    >
                      {getIconComponent(option.icon)}
                    </div>
                    {option.label}
                  </div>
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button 
              onClick={handleSubmit} 
              variant="contained"
              disabled={!newTransaction.name || !newTransaction.amount}
            >
              Add Transaction
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Transactions;
