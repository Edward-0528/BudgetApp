import React, { useState, useEffect } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaPlane, FaCar, FaGlassMartiniAlt, FaShoppingCart, FaHome, FaGamepad, FaBook, FaHeart } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

const initialGoals = [
  {
    name: "Groceries",
    icon: "FaShoppingCart",
    color: "#d4f7c5",
    percent: 50,
    current: 1380,
    total: 6000,
  },
  {
    name: "Travel",
    icon: "FaPlane",
    color: "#c5e8f7",
    percent: 80,
    current: 6400,
    total: 8000,
  },
  {
    name: "Transportation",
    icon: "FaCar",
    color: "#f7c5d4",
    percent: 23,
    current: 690,
    total: 3000,
  },
  {
    name: "Restaurants and bars",
    icon: "FaGlassMartiniAlt",
    color: "#f7e1c5",
    percent: 90,
    current: 6300,
    total: 7000,
  },
];

const iconOptions = [
  { value: "FaShoppingCart", label: "Shopping", icon: <FaShoppingCart />, color: "#d4f7c5" },
  { value: "FaPlane", label: "Travel", icon: <FaPlane />, color: "#c5e8f7" },
  { value: "FaCar", label: "Transportation", icon: <FaCar />, color: "#f7c5d4" },
  { value: "FaGlassMartiniAlt", label: "Entertainment", icon: <FaGlassMartiniAlt />, color: "#f7e1c5" },
  { value: "FaHome", label: "Housing", icon: <FaHome />, color: "#e1c5f7" },
  { value: "FaGamepad", label: "Gaming", icon: <FaGamepad />, color: "#c5f7e1" },
  { value: "FaBook", label: "Education", icon: <FaBook />, color: "#f7c5c5" },
  { value: "FaHeart", label: "Health", icon: <FaHeart />, color: "#f7d4c5" },
];

// LocalStorage key for goals
const GOALS_STORAGE_KEY = 'budgetApp_goals';

// Helper functions for localStorage
const loadGoalsFromStorage = () => {
  try {
    const savedGoals = localStorage.getItem(GOALS_STORAGE_KEY);
    if (savedGoals) {
      return JSON.parse(savedGoals);
    }
  } catch (error) {
    console.error('Error loading goals from localStorage:', error);
  }
  return initialGoals; // Return default goals if no saved data or error
};

const saveGoalsToStorage = (goals) => {
  try {
    localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(goals));
  } catch (error) {
    console.error('Error saving goals to localStorage:', error);
  }
};

// Helper function to get icon component
const getIconComponent = (iconName) => {
  const iconMap = {
    "FaShoppingCart": <FaShoppingCart />,
    "FaPlane": <FaPlane />,
    "FaCar": <FaCar />,
    "FaGlassMartiniAlt": <FaGlassMartiniAlt />,
    "FaHome": <FaHome />,
    "FaGamepad": <FaGamepad />,
    "FaBook": <FaBook />,
    "FaHeart": <FaHeart />,
  };
  return iconMap[iconName] || <FaShoppingCart />;
};

function Goals() {
  const [goals, setGoals] = useState([]);
  const [open, setOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    total: '',
    current: '',
    icon: 'FaShoppingCart'
  });

  // Load goals from localStorage on component mount
  useEffect(() => {
    const savedGoals = loadGoalsFromStorage();
    setGoals(savedGoals);
  }, []);

  // Save goals to localStorage whenever goals change
  useEffect(() => {
    if (goals.length > 0) {
      saveGoalsToStorage(goals);
    }
  }, [goals]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewGoal({
      name: '',
      total: '',
      current: '',
      icon: 'FaShoppingCart'
    });
  };

  const handleInputChange = (field) => (event) => {
    setNewGoal(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = () => {
    if (newGoal.name && newGoal.total && newGoal.current) {
      const total = parseFloat(newGoal.total);
      const current = parseFloat(newGoal.current);
      const percent = Math.round((current / total) * 100);
      const selectedIcon = iconOptions.find(option => option.value === newGoal.icon);

      const goal = {
        name: newGoal.name,
        total: total,
        current: current,
        percent: percent,
        icon: newGoal.icon,
        color: selectedIcon?.color || "#d4f7c5"
      };

      setGoals(prev => [...prev, goal]);
      handleClose();
    }
  };

  const handleDeleteGoal = (goalName) => {
    setGoals(prev => prev.filter(goal => goal.name !== goalName));
  };
  return (
    <div className="p-4 flex flex-col items-center rounded-b-lg shadow-lg bg-white min-h-screen">
      {/* Create a goal card */}
      <div className="w-full max-w-2xl mb-6">
        <div className="bg-white rounded-2xl shadow-lg flex items-center justify-between px-6 py-5 mb-4">
          <div>
            <Typography variant="h6" className="font-bold">Create a goal</Typography>
            <Typography variant="body2" color="textSecondary">Save more by setting a goal</Typography>
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

      {/* My goals section */}
      <div className="w-full max-w-2xl">
        <Typography variant="subtitle1" className="font-bold mb-4 text-zinc-800">My goals</Typography>
        <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'transparent' }}>
          {goals.map((goal, idx) => (
            <div key={goal.name} className="bg-white rounded-xl shadow-lg p-4 mb-6 flex items-center relative">
              {/* Delete button */}
              <IconButton
                onClick={() => handleDeleteGoal(goal.name)}
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

              <ListItem disableGutters className="w-full">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: goal.color, color: '#222', width: 48, height: 48, fontSize: 24 }}>
                    {getIconComponent(goal.icon)}
                  </Avatar>
                </ListItemAvatar>
                <div className="flex flex-col w-full ml-4 pr-8">
                  <div className="flex justify-between items-center mb-1">
                    <Typography variant="subtitle1" className="font-semibold">{goal.name}</Typography>
                    <span className="text-sm font-bold text-zinc-500">{goal.percent}%</span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <Typography variant="body2" color="textSecondary">
                      ${goal.current.toLocaleString()}/{goal.total.toLocaleString()}
                    </Typography>
                  </div>
                  <LinearProgress
                    variant="determinate"
                    value={goal.percent}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: '#f3f4f6',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#3b82f6', // Tailwind blue-500
                      },
                    }}
                  />
                </div>
              </ListItem>
            </div>
          ))}
        </List>
      </div>

      {/* Add Goal Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Goal</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Goal Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newGoal.name}
            onChange={handleInputChange('name')}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Target Amount"
            type="number"
            fullWidth
            variant="outlined"
            value={newGoal.total}
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
            value={newGoal.current}
            onChange={handleInputChange('current')}
            sx={{ mb: 2 }}
            inputProps={{ min: 0, step: 0.01 }}
          />
          <TextField
            select
            margin="dense"
            label="Category Icon"
            fullWidth
            variant="outlined"
            value={newGoal.icon}
            onChange={handleInputChange('icon')}
          >
            {iconOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <div className="flex items-center">
                  <div 
                    className="w-8 h-8 rounded-full mr-3 flex items-center justify-center text-lg" 
                    style={{ backgroundColor: option.color }}
                  >
                    {option.icon}
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
            disabled={!newGoal.name || !newGoal.total || !newGoal.current}
          >
            Create Goal
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Goals;