import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { CardContent } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';



function Overview() {
  return (
    <>
      <div className="p-4 flex flex-col items-center rounded-b-lg shadow-lg bg-white h-full">
        <div className="flex flex-col lg:flex-row items-center mb-8 w-full max-w-3xl mx-auto gap-8">
          {/* Donut Chart Section */}
          <div className="w-full max-w-xs flex justify-center">
            <div className="relative flex items-center justify-center w-full aspect-square" style={{ minWidth: 120, minHeight: 120 }}>
              {/* Responsive CircularProgress */}
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
              <CircularProgress
                variant="determinate"
                value={80}
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
                <span className="text-2xl font-bold text-zinc-900">$5,500</span>
                <span className="text-xs text-gray-500">Money Left</span>
                <span className="text-xs font-semibold text-green-500 mt-1">{'80%'}</span>
              </div>
            </div>
          </div>
          {/* Gross Income Section */}
          <div className="flex flex-col items-center w-full">
            <Typography variant="h5" className="font-bold mb-4">Gross Income</Typography>
            <div className="flex flex-col lg:flex-row gap-6 w-full justify-center items-center">
              {/* Incoming Card */}
              <Card className="shadow-lg bg-gradient-to-br from-green-100 to-white rounded-2xl w-full max-w-xs">
                <CardContent>
                  <div className="flex items-center mb-2">
                    <Typography variant="h6" className="font-semibold text-green-700">Incoming</Typography>
                  </div>
                  <Typography variant="h4" className="font-bold text-green-600">$10,000</Typography>
                  <Typography variant="body2" color="textSecondary" className="mt-2">This month</Typography>
                </CardContent>
              </Card>
              {/* Divider for large screens */}
              <Divider orientation="vertical" flexItem className="hidden lg:block mx-2" />
              {/* Outgoing Card */}
              <Card className="shadow-lg bg-gradient-to-br from-red-100 to-white rounded-2xl w-full max-w-xs">
                <CardContent>
                  <div className="flex items-center mb-2">
                    <Typography variant="h6" className="font-semibold text-red-700">Outgoing</Typography>
                  </div>
                  <Typography variant="h4" className="font-bold text-red-600">-$6,000</Typography>
                  <Typography variant="body2" color="textSecondary" className="mt-2">This month</Typography>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        {/* Recent Income Section */}
        
        </div>

      
    </>
  );
}
export default Overview;