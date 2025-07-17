import { IoIosAddCircleOutline } from "react-icons/io";
import { FaPlane, FaCar, FaGlassMartiniAlt, FaShoppingCart, FaHeart } from "react-icons/fa";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText'; 
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';

const goals = [
  {
    name: "Groceries",
    icon: <FaShoppingCart />,
    color: "#d4f7c5",
    percent: 50,
    current: 1380,
    total: 6000,
  },
  {
    name: "Travel",
    icon: <FaPlane />,
    color: "#c5e8f7",
    percent: 50,
    current: 3760,
    total: 8000,
  },
  {
    name: "Transportation",
    icon: <FaCar />,
    color: "#f7c5d4",
    percent: 50,
    current: 2400,
    total: 3000,
  },
  {
    name: "Restaurants and bars",
    icon: <FaGlassMartiniAlt />,
    color: "#f7e1c5",
    percent: 50,
    current: 4550,
    total: 7000,
  },
];

function Goals() {
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
            <div key={goal.name} className="bg-white rounded-xl shadow-lg p-4 mb-6 flex items-center">
              <ListItem disableGutters className="w-full">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: goal.color, color: '#222', width: 48, height: 48, fontSize: 24 }}>
                    {goal.icon}
                  </Avatar>
                </ListItemAvatar>
                <div className="flex flex-col w-full ml-4">
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
    </div>
  );
}

export default Goals;