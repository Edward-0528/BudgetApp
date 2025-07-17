import Overview from './Overview';
import Budget from './Budget';
import ContentNav from './ContentNav';
import Goals from './Goals';
import Transactions from './Transactions';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddAccount from './AddAccount';
import Profile from './Profile';

function ContentMain() {
  return (
    <div>
      
      <BrowserRouter>
      <ContentNav />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/add-account" element={<AddAccount />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}
export default ContentMain;