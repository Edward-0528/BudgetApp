import React from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';

const budgets = [
  { name: 'Savings', percent: 50, current: 5000, total: 10000, color: 'bg-blue-500' },
  { name: 'Charity', percent: 60, current: 1200, total: 2000, color: 'bg-green-500' },
  { name: 'Hobbies', percent: 30, current: 2000, total: 3000, color: 'bg-pink-500' },
  { name: 'Investment', percent: 30, current: 2000, total: 6000, color: 'bg-yellow-500' },
];

function Budget() {
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
          >
            <IoIosAddCircleOutline className="text-2xl text-zinc-700" />
          </Button>
        </div>
      </div>

      {/* Active budgets grid */}
      <div className="w-full max-w-2xl">
        <Typography variant="subtitle1" className="font-bold mb-4 text-zinc-800">Active budgets</Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {budgets.map((budget, idx) => (
            <div key={budget.name} className="bg-white rounded-2xl shadow-lg p-5 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-2">
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
                    backgroundColor: budget.color.replace('bg-', ''),
                  },
                }}
                className={budget.color}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Budget;