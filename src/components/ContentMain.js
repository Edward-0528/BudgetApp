import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

function ContentMain() {
  return (
    <div className="p-4 flex flex-col items-center rounded-lg shadow-lg bg-white h-full">
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
          {/* Income Section */}
          <div className="w-full mt-6 flex  flex-col gap-6 lg:flex-row justify-evenly">
            <div className="flex flex-col items-center lg:items-center">
            <p className="text-lg font-semibold">Gross Income</p>
            <BarChart
                xAxis={[
                    {
                    id: 'barCategories',
                    data: ['January', 'February', 'March', 'April', 'May', 'June'],
                    },
                ]}
                series={[
                    {
                    data: [6900, 5200, 3800, 4500, 7200, 6000],
                    },
                ]}
                height={300}
                />
            </div>
            {/* Expenses Section */}
            <div className="flex flex-col items-center lg:items-start">
            <p className="text-lg font-semibold mt-6">Expenses</p>
            <PieChart
                series={[
                    {
                    data: [
                        { id: 0, value: 1700, label: 'Rent' },
                        { id: 1, value: 250, label: 'Utilities' },
                        { id: 2, value: 200, label: 'Groceries' },
                        { id: 3, value: 300, label: 'Gas' },
                        { id: 4, value: 150, label: 'Entertainment' },
                        { id: 5, value: 100, label: 'Dining Out' },
                        { id: 6, value: 400, label: 'Other' },
                    ],
                    },
                ]}
                
                height={300}
                />
                </div>
          </div>
    </div>
  );
}
export default ContentMain;