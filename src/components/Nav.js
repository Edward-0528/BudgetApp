import React from 'react';
import profile from '../assets/imgs/profile.ed.jpg';
import { Link } from 'react-router-dom';
import { MdAddCard } from "react-icons/md";

function Nav() {
  return (
    <div>
        {/* Navigation bar */}
        <div className="max-w-7xl bg-zinc-900 text-white mx-auto py-6 px-4 sm:px-6 lg:px-8 justify-between flex">
          
          <div className="flex items-center space-x-4">
            <MdAddCard className="w-8 h-8" />
            <p className="text-lg font-semibold justify-start">Add Account</p>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-lg font-semibold">Welcome, Edward</p>
          <img src={profile} alt="Profile" className="w-14 h-14 rounded-full" />
          </div>
        </div>
    </div>
    
  ); 
}

export default Nav;