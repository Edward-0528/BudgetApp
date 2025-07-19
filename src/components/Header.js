import Nav from "./Nav";
import { RiVisaLine } from "react-icons/ri";
import { useProfile } from '../hooks/useProfile';

function Header() {
  const { profile } = useProfile();

  return (
    <div className="bg-zinc-900 text-white">
      <Nav />
      {/* Realistic Debit Card */}
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="w-[370px] h-[220px] bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900 rounded-3xl shadow-2xl p-6 relative overflow-hidden">
          {/* Card Chip */}
          <div className="absolute top-8 left-6 w-10 h-7 bg-yellow-300 rounded-sm opacity-80"></div>
          {/* Card Logo */}
          <RiVisaLine className="absolute top-8 right-6 w-16 h-16 text-white opacity-90" />
          {/* Card Number */}
          <div className="absolute top-20 left-6 text-xl tracking-widest font-mono text-white">
            **** **** **** 6816
          </div>
          {/* Card Balance */}
          <div className="absolute bottom-16 left-6">
            <span className="text-sm text-gray-300">Balance</span>
            <div className="text-3xl font-bold text-white">$5,272.14</div>
          </div>
          {/* Cardholder & Expiry */}
          <div className="absolute bottom-6 left-6 flex flex-row items-end justify-between w-[85%]">
            <div>
              <span className="text-xs text-gray-400">CARDHOLDER</span>
              <div className="text-base font-semibold text-white">{profile.fullName}</div>
            </div>
            <div>
              <span className="text-xs text-gray-400">EXPIRES</span>
              <div className="text-base font-semibold text-white">08/28</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
