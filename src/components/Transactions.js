import { FaCar, FaShoppingCart, FaPlane, FaUniversity, FaMusic, FaHamburger, FaCoffee, FaApple, FaBus, FaUtensils, FaTaxi, FaGasPump, FaMobileAlt } from "react-icons/fa";
import React from "react";

const transactions = [
  {
    name: "Train",
    category: "Transportation",
    icon: <FaCar />,
    color: "#f7c5d4",
    amount: -20,
    date: "01.03.2022",
  },
  {
    name: "Trader Joe's",
    category: "Groceries",
    icon: <FaShoppingCart />,
    color: "#d4f7c5",
    amount: -50,
    date: "28.02.2022",
  },
  {
    name: "Taxi",
    category: "Transportation",
    icon: <FaTaxi />,
    color: "#f7c5d4",
    amount: -120,
    date: "28.02.2022",
  },
  {
    name: "EasyJet",
    category: "Travel",
    icon: <FaPlane />,
    color: "#c5e8f7",
    amount: -1500,
    date: "28.02.2022",
  },
  {
    name: "Tuition",
    category: "Education",
    icon: <FaUniversity />,
    color: "#d1c5f7",
    amount: -20000,
    date: "28.02.2022",
  },
  {
    name: "Spotify",
    category: "Entertainment",
    icon: <FaMusic />,
    color: "#c5f7d4",
    amount: -10,
    date: "27.02.2022",
  },
  {
    name: "McDonald's",
    category: "Fast Food",
    icon: <FaHamburger />,
    color: "#f7e1c5",
    amount: -15,
    date: "27.02.2022",
  },
  {
    name: "Starbucks",
    category: "Coffee",
    icon: <FaCoffee />,
    color: "#f7f3c5",
    amount: -7,
    date: "27.02.2022",
  },
  {
    name: "Apple Store",
    category: "Shopping",
    icon: <FaApple />,
    color: "#e1c5f7",
    amount: -999,
    date: "26.02.2022",
  },
  {
    name: "Bus Ticket",
    category: "Transportation",
    icon: <FaBus />,
    color: "#c5e8f7",
    amount: -3,
    date: "26.02.2022",
  },
  {
    name: "Dinner",
    category: "Restaurants",
    icon: <FaUtensils />,
    color: "#f7c5d4",
    amount: -45,
    date: "25.02.2022",
  },
  {
    name: "Gas Station",
    category: "Transportation",
    icon: <FaGasPump />,
    color: "#d4f7c5",
    amount: -60,
    date: "25.02.2022",
  },
  {
    name: "Uber",
    category: "Transportation",
    icon: <FaTaxi />,
    color: "#f7c5d4",
    amount: -22,
    date: "25.02.2022",
  },
  {
    name: "Mobile Bill",
    category: "Utilities",
    icon: <FaMobileAlt />,
    color: "#c5e8f7",
    amount: -40,
    date: "24.02.2022",
  },
  {
    name: "Lunch",
    category: "Fast Food",
    icon: <FaHamburger />,
    color: "#f7e1c5",
    amount: -12,
    date: "24.02.2022",
  },
];

function Transactions() {
  return (
    <div className="p-4 flex flex-col items-center rounded-b-lg shadow-lg bg-white min-h-screen">
      <div className="w-full max-w-2xl mb-6">
        
        <h1 className="text-2xl font-bold mb-4 text-zinc-800">Transactions</h1>
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
                {tx.icon}
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-semibold text-zinc-800">{tx.name}</span>
                <span className="text-xs text-zinc-500">{tx.category}</span>
              </div>
              <div className="flex flex-col items-end min-w-[90px]">
                <span className="font-bold text-red-500">
                  -${tx.amount.toLocaleString()}
                </span>
                <span className="text-xs text-zinc-400">{tx.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Transactions;
