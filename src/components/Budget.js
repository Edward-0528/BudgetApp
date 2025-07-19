import React, { useState, useEffect } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

const initialBudgets = [
  { name: 'Savings', percent: 50, current: 5000, total: 10000, color: 'bg-blue-500' },
  { name: 'Charity', percent: 60, current: 1200, total: 2000, color: 'bg-green-500' },
  { name: 'Hobbies', percent: 30, current: 2000, total: 3000, color: 'bg-pink-500' },
  { name: 'Investment', percent: 30, current: 2000, total: 6000, color: 'bg-yellow-500' },
];

const colorOptions = [
  { value: 'bg-blue-500', label: 'Blue', color: '#3b82f6' },
  { value: 'bg-green-500', label: 'Green', color: '#10b981' },
  { value: 'bg-pink-500', label: 'Pink', color: '#ec4899' },
  { value: 'bg-yellow-500', label: 'Yellow', color: '#eab308' },
  { value: 'bg-purple-500', label: 'Purple', color: '#8b5cf6' },
  { value: 'bg-red-500', label: 'Red', color: '#ef4444' },
  { value: 'bg-indigo-500', label: 'Indigo', color: '#6366f1' },
  { value: 'bg-orange-500', label: 'Orange', color: '#f97316' },
];

// LocalStorage key for budgets
const BUDGETS_STORAGE_KEY = 'budgetApp_budgets';

// Helper functions for localStorage
const loadBudgetsFromStorage = () => {
  try {
    const savedBudgets = localStorage.getItem(BUDGETS_STORAGE_KEY);
    if (savedBudgets) {
      return JSON.parse(savedBudgets);
    }
  } catch (error) {
    console.error('Error loading budgets from localStorage:', error);
  }
  return initialBudgets; // Return default budgets if no saved data or error
};

const saveBudgetsToStorage = (budgets) => {
  try {
    localStorage.setItem(BUDGETS_STORAGE_KEY, JSON.stringify(budgets));
  } catch (error) {
    console.error('Error saving budgets to localStorage:', error);
  }
};

function Budget() {
  const [budgets, setBudgets] = useState([]);
  const [open, setOpen] = useState(false);
  const [newBudget, setNewBudget] = useState({
    name: '',
    total: '',
    current: '',
    color: 'bg-blue-500'
  });

  // Load budgets from localStorage on component mount
  useEffect(() => {
    const savedBudgets = loadBudgetsFromStorage();
    setBudgets(savedBudgets);
  }, []);

  // Save budgets to localStorage whenever budgets change
  useEffect(() => {
    if (budgets.length > 0) {
      saveBudgetsToStorage(budgets);
    }
  }, [budgets]);

  const getColorValue = (colorClass) => {
    const colorMap = {
      'bg-blue-500': '#3b82f6',
      'bg-green-500': '#10b981',
      'bg-pink-500': '#ec4899',
      'bg-yellow-500': '#eab308',
      'bg-purple-500': '#8b5cf6',
      'bg-red-500': '#ef4444',
      'bg-indigo-500': '#6366f1',
      'bg-orange-500': '#f97316',
    };
    return colorMap[colorClass] || '#3b82f6';
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewBudget({
      name: '',
      total: '',
      current: '',
      color: 'bg-blue-500'
    });
  };

  const handleInputChange = (field) => (event) => {
    setNewBudget(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = () => {
    if (newBudget.name && newBudget.total && newBudget.current) {
      const total = parseFloat(newBudget.total);
      const current = parseFloat(newBudget.current);
      const percent = Math.round((current / total) * 100);

      const budget = {
        name: newBudget.name,
        total: total,
        current: current,
        percent: percent,
        color: newBudget.color
      };

      setBudgets(prev => [...prev, budget]);
      handleClose();
    }
  };

  const handleDeleteBudget = (budgetName) => {
    setBudgets(prev => prev.filter(budget => budget.name !== budgetName));
  };
  return (
    <div className="p-6 flex flex-col items-center rounded-b-2xl shadow-lg bg-white min-h-screen">
      

      {/* Set a new budget card */}
      <div className="w-full max-w-2xl mb-8">
        <div className="bg-white rounded-2xl shadow-lg flex items-center justify-between px-6 py-5 mb-4">
          <div>
            <Typography variant="h6" className="font-bold">Set a new budget</Typography>
            <Typography variant="body2" color="textSecondary">Reach more goals</Typography>
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
      </div>

      {/* Active budgets grid */}
      <div className="w-full max-w-2xl">
        <Typography variant="subtitle1" className="font-bold mb-4 text-zinc-800">Active budgets</Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {budgets.map((budget) => (
            <div key={budget.name} className="bg-white rounded-2xl shadow-lg p-5 flex flex-col justify-between relative">
              {/* Delete button */}
              <IconButton
                onClick={() => handleDeleteBudget(budget.name)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  padding: '4px',
                  color: '#6b7280',
                  '&:hover': {
                    backgroundColor: '#fee2e2',
                    color: '#dc2626',
                  },
                }}
                size="small"
              >
                <MdDeleteOutline size={18} />
              </IconButton>
              
              <div className="flex justify-between items-center mb-2 pr-8">
                <Typography variant="subtitle1" className="font-semibold">{budget.name}</Typography>
                <span className="text-sm font-bold text-zinc-500">{budget.percent}%</span>
              </div>
              <div className="mb-2 text-sm text-zinc-700 font-medium">
                ${budget.current.toLocaleString()}/{budget.total.toLocaleString()}
              </div>
              <LinearProgress
                variant="determinate"
                value={budget.percent}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: '#f3f4f6',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: getColorValue(budget.color),
                  },
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Add Budget Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Budget</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Budget Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newBudget.name}
            onChange={handleInputChange('name')}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Total Budget Amount"
            type="number"
            fullWidth
            variant="outlined"
            value={newBudget.total}
            onChange={handleInputChange('total')}
            sx={{ mb: 2 }}
            inputProps={{ min: 0, step: 0.01 }}
          />
          <TextField
            margin="dense"
            label="Current Amount"
            type="number"
            fullWidth
            variant="outlined"
            value={newBudget.current}
            onChange={handleInputChange('current')}
            sx={{ mb: 2 }}
            inputProps={{ min: 0, step: 0.01 }}
          />
          <TextField
            select
            margin="dense"
            label="Color Theme"
            fullWidth
            variant="outlined"
            value={newBudget.color}
            onChange={handleInputChange('color')}
          >
            {colorOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-2" 
                    style={{ backgroundColor: option.color }}
                  ></div>
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
            disabled={!newBudget.name || !newBudget.total || !newBudget.current}
          >
            Create Budget
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Budget;