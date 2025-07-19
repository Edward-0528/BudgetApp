import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CardContent } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { FaArrowDown, FaArrowUp, FaWallet } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useTransactions } from '../hooks/useTransactions';
import { useProfile } from '../hooks/useProfile';

function Overview() {
  const navigate = useNavigate();
  const transactions = useTransactions();
  const { profile } = useProfile();
  
  // Calculate realistic financial data from transactions
  const totalIncome = transactions
    .filter(tx => tx.amount > 0)
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  const totalExpenses = Math.abs(transactions
    .filter(tx => tx.amount < 0)
    .reduce((sum, tx) => sum + tx.amount, 0));
  
  const totalBalance = totalIncome - totalExpenses;
  const percentLeft = totalIncome > 0 ? Math.round((totalBalance / totalIncome) * 100) : 0;
  
  // Determine chart colors based on balance
  const isPositive = totalBalance >= 0;
  const chartColor = isPositive ? '#22c55e' : '#ef4444'; // green-500 : red-500
  const iconColor = isPositive ? 'text-green-500' : 'text-red-500';
  const percentColor = isPositive ? 'text-green-500' : 'text-red-500';

  // Get the 7 most recent transactions
  const recentTransactions = transactions.slice(0, 7);

  const handleViewMoreTransactions = () => {
    navigate('/transactions');
  };

  return (
    <div className="p-4 flex flex-col items-center rounded-b-lg shadow-lg bg-white min-h-screen">
      {/* Welcome Message */}
      <div className="w-full max-w-3xl mb-6">
        <Typography variant="h4" className="font-bold text-zinc-800 mb-2">
          Welcome back, {profile.name}!
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Here's your financial overview for today
        </Typography>
      </div>

      {/* Top Overview: Balance & Progress */}
      <div className="flex flex-col items-center mb-8 w-full max-w-3xl mx-auto gap-8">
        {/* Donut Chart Section */}
        <div className="w-full max-w-xs flex justify-center">
          <div className="relative flex items-center justify-center w-full aspect-square" style={{ minWidth: 120, minHeight: 120 }}>
            {/* Background */}
            <CircularProgress
              variant="determinate"
              value={100}
              thickness={5}
              size={'100%'}
              sx={{
                color: '#e5e7eb',
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
              }}
            />
            {/* Progress */}
            <CircularProgress
              variant="determinate"
              value={Math.abs(percentLeft)}
              thickness={5}
              size={'100%'}
              sx={{
                color: chartColor,
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                zIndex: 2,
              }}
            />
            {/* Center Value */}
            <div className="absolute flex flex-col items-center justify-center w-full h-full z-10">
              <FaWallet className={`text-3xl ${iconColor} mb-1`} />
              <span className="text-2xl font-bold text-zinc-900">${Math.abs(totalBalance).toLocaleString()}</span>
              <span className="text-xs text-gray-500">{isPositive ? 'Balance Left' : 'Over Budget'}</span>
              <span className={`text-xs font-semibold ${percentColor} mt-1`}>{Math.abs(percentLeft)}%</span>
            </div>
          </div>
        </div>
        {/* Income & Expenses Summary */}
        <div className="flex flex-col items-center w-full">
          <Typography variant="h5" className="font-bold mb-4">This Month</Typography>
          <div className="flex flex-col lg:flex-row gap-6 w-full justify-center items-center">
            {/* Income Card */}
            <Card className="shadow-lg bg-gradient-to-br from-green-100 to-white rounded-2xl w-full max-w-xs">
              <CardContent>
                <div className="flex items-center mb-2">
                  <FaArrowUp className="text-green-600 mr-2" />
                  <Typography variant="h6" className="font-semibold text-green-700">Income</Typography>
                </div>
                <Typography variant="h4" className="font-bold text-green-600">${totalIncome.toLocaleString()}</Typography>
                <Typography variant="body2" color="textSecondary" className="mt-2">Total received</Typography>
              </CardContent>
            </Card>
            {/* Divider for large screens */}
            <Divider orientation="vertical" flexItem className="hidden lg:block mx-2" />
            {/* Expenses Card */}
            <Card className="shadow-lg bg-gradient-to-br from-red-100 to-white rounded-2xl w-full max-w-xs">
              <CardContent>
                <div className="flex items-center mb-2">
                  <FaArrowDown className="text-red-600 mr-2" />
                  <Typography variant="h6" className="font-semibold text-red-700">Expenses</Typography>
                </div>
                <Typography variant="h4" className="font-bold text-red-600">-${totalExpenses.toLocaleString()}</Typography>
                <Typography variant="body2" color="textSecondary" className="mt-2">Total spent</Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* Recent Transactions */}
      <div className="w-full max-w-3xl">
        <Typography variant="h6" className="font-bold mb-4 text-zinc-800">Recent Transactions</Typography>
        <Card className="bg-white rounded-2xl shadow-lg p-4">
          {recentTransactions.map((tx, idx) => (
            <div key={idx} className="flex items-center py-3 border-b last:border-b-0">
              <div
                className="flex items-center justify-center rounded-full mr-4"
                style={{
                  backgroundColor: tx.color,
                  width: 40,
                  height: 40,
                  fontSize: 20,
                }}
              >
                {tx.icon}
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-semibold text-zinc-800">{tx.name}</span>
                <span className="text-xs text-zinc-500">{tx.category}</span>
              </div>
              <div className="flex flex-col items-end min-w-[90px]">
                <span className={`font-bold ${tx.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount).toLocaleString()}
                </span>
                <span className="text-xs text-zinc-400">{tx.date}</span>
              </div>
            </div>
          ))}
          
          {/* View More Transactions Button */}
          <div className="mt-4 pt-4 border-t">
            <Button
              fullWidth
              variant="outlined"
              onClick={handleViewMoreTransactions}
              sx={{
                borderColor: '#d1d5db',
                color: '#374151',
                '&:hover': {
                  borderColor: '#9ca3af',
                  backgroundColor: '#f9fafb',
                },
                borderRadius: '12px',
                padding: '12px 24px',
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              View More Transactions
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Overview;