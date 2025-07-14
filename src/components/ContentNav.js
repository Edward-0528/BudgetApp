import { NavLink } from "react-router-dom";

function ContentNav() {
  return (
    <div className="p-4 flex flex-col items-center rounded-t-lg shadow-lg bg-white h-full">
      {/* Navigation bar for Content Main */}
      <nav>
        <ul className="flex space-x-4 font-black h-full">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "rounded-2xl bg-black px-3 py-2 text-sm font-medium text-white"
                  : "hover:underline px-3 py-2 text-sm font-medium"
              }
              aria-current="page"
            >
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/budget"
              className={({ isActive }) =>
                isActive
                  ? "rounded-2xl bg-black px-3 py-2 text-sm font-medium text-white"
                  : "hover:underline px-3 py-2 text-sm font-medium"
              }
            >
              Budget
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/goals"
              className={({ isActive }) =>
                isActive
                  ? "rounded-2xl bg-black px-3 py-2 text-sm font-medium text-white"
                  : "hover:underline px-3 py-2 text-sm font-medium"
              }
            >
              Goals
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                isActive
                  ? "rounded-2xl bg-black px-3 py-2 text-sm font-medium text-white"
                  : "hover:underline px-3 py-2 text-sm font-medium"
              }
            >
              Transactions
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default ContentNav;