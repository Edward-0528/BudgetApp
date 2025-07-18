import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { CardContent } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { FaArrowDown, FaArrowUp, FaWallet } from "react-icons/fa";

function Overview() {
  // Example data
  const totalBalance = 5500;
  const income = 10000;
  const expenses = 6000;
  const percentLeft = Math.round((totalBalance / income) * 100);

  const recentTransactions = [
    { name: "Salary", type: "income", amount: 3200, date: "01.07.2025" },
    { name: "Freelance", type: "income", amount: 1800, date: "28.06.2025" },
    { name: "Rent", type: "expense", amount: 2000, date: "27.06.2025" },
    { name: "Groceries", type: "expense", amount: 350, date: "26.06.2025" },
    { name: "Spotify", type: "expense", amount: 10, date: "25.06.2025" },
    { name: "Dinner", type: "expense", amount: 60, date: "24.06.2025" },
  ];

  return (
    <div className="p-4 flex flex-col items-center rounded-b-lg shadow-lg bg-white min-h-screen">
      {/* Top Overview: Balance & Progress */}
      <div className="flex flex-col lg:flex-row items-center mb-8 w-full max-w-3xl mx-auto gap-8">
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
              value={percentLeft}
              thickness={5}
              size={'100%'}
              sx={{
                color: '#22c55e',
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
              <FaWallet className="text-3xl text-green-500 mb-1" />
              <span className="text-2xl font-bold text-zinc-900">${totalBalance.toLocaleString()}</span>
              <span className="text-xs text-gray-500">Balance Left</span>
              <span className="text-xs font-semibold text-green-500 mt-1">{percentLeft}%</span>
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
                <Typography variant="h4" className="font-bold text-green-600">${income.toLocaleString()}</Typography>
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
                <Typography variant="h4" className="font-bold text-red-600">-${expenses.toLocaleString()}</Typography>
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
              <div className="flex flex-col flex-1">
                <span className="font-semibold text-zinc-800">{tx.name}</span>
                <span className="text-xs text-zinc-500">{tx.date}</span>
              </div>
              <div className="flex flex-col items-end min-w-[90px]">
                <span className={`font-bold ${tx.type === "income" ? "text-green-500" : "text-red-500"}`}>
                  {tx.type === "income" ? "+" : "-"}${tx.amount.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

export default Overview;