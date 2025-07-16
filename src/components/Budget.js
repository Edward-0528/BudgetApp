import { BarChart } from '@mui/x-charts/BarChart';
import { IoIosAddCircleOutline } from "react-icons/io";
import { PieChart } from '@mui/x-charts/PieChart';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText'; 
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';

function Budget() {
  return (
    <div className="p-4 flex sm:flex-col lg:flex-row items-center rounded-b-lg shadow-lg bg-white h-full">
      <div className="bg-white w-full flex flex-col gap-6 lg:flex-row justify-evenly">
        {/* Budget List Section */}
        <div className="flex flex-col w-full items-center mt-6">
          <Button
            variant="contained"
            color="success"
            startIcon={<IoIosAddCircleOutline />}
            className="mb-4"
            style={{ marginBottom: '16px' }}
          >
            Add Budget
          </Button>
          <Typography variant="h6" className="mb-2 font-bold justify-start items-start">My Budgets</Typography>
          <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'transparent' }}>
            <div className="bg-white rounded-xl shadow-lg p-4 mb-6 flex items-center">
              <ListItem disableGutters>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#1976d2' }}>I</Avatar>
                </ListItemAvatar>
                
                <div className='w-full' style={{ marginLeft: 16 }}>
                <ListItemText primary="Italy Trip" />
                  <LinearProgress variant="determinate" value={60} />
                  <Typography variant="caption" color="textSecondary">$250/month</Typography>
                </div>
              </ListItem>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4 mb-6 flex items-center">
              <ListItem disableGutters>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#388e3c' }}>H</Avatar>
                </ListItemAvatar>
                
                <div className='w-full' style={{ marginLeft: 16 }}>
                  <ListItemText primary="House"/>
                  <LinearProgress variant="determinate" value={80} />
                  <Typography variant="caption" color="textSecondary">$1,700/month</Typography>
                </div>
              </ListItem>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4 mb-6 flex items-center">
              <ListItem disableGutters>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#fbc02d' }}>W</Avatar>
                </ListItemAvatar>
                
                <div className='w-full' style={{ marginLeft: 16 }}>
                  <ListItemText primary="Wedding" />
                  <LinearProgress variant="determinate" value={40} />
                  <Typography variant="caption" color="textSecondary">$500/month</Typography>
                </div>
              </ListItem>
            </div>
          </List>
        </div>
      </div>
    </div>
  );
}
export default Budget;