
import React from 'react';
import Overview from './Overview';
import Budget from './Budget';
import { Link } from 'react-router-dom';

function ContentMain() {
  return (
    <div className="p-4 flex flex-col items-center rounded-lg shadow-lg bg-white h-full">
      {/* Navigation bar for Content Main */}
      <nav>
            <ul className="flex space-x-4 font-black h-full">
              <li>
                <a href="#" className="rounded-2xl bg-black px-3 py-2 text-sm font-medium text-white" aria-current="page">Overview</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Budget</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Goals</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Transactions</a>
              </li>
              
                
              
              
            </ul>
          </nav>
          <Overview />
          <Budget />
    </div>
  );
}
export default ContentMain;