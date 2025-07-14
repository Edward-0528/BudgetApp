
import React from 'react';
import Overview from './Overview';
import Budget from './Budget';
import { Link } from 'react-router-dom';
import ContentNav from './ContentNav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function ContentMain() {
  return (
    <div>
      
      <BrowserRouter>
      <ContentNav />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/budget" element={<Budget />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}
export default ContentMain;