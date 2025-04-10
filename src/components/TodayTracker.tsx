
import React from 'react';
import { useSoberData } from '@/context/SoberContext';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

const TodayTracker: React.FC = () => {
  const { getDayStatus, setDayStatus } = useSoberData();
  const today = new Date();
  const currentStatus = getDayStatus(today);
  
  const handleSetStatus = (status: 'zero' | 'reset') => {
    setDayStatus(today, status);
  };
  
  return (
    <div className="zero-card">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-center">
          {format(today, 'EEEE, MMMM d')} - Today
        </h3>
        {currentStatus && (
          <p className="text-center text-sm mt-1 text-zero-text-secondary">
            Current status: <span className={currentStatus === 'zero' ? 'text-[#18C5ED]' : 'text-[#FF0000]'}>
              {currentStatus === 'zero' ? 'Zero Day' : 'Reset Day'}
            </span>
          </p>
        )}
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() => handleSetStatus('zero')}
          className={`flex-1 py-5 transition-all font-medium rounded-lg ${
            currentStatus === 'zero'
              ? 'bg-[#16b3d7] text-black hover:bg-[#14a1c5]'
              : 'bg-[#18C5ED] text-black hover:bg-[#16b3d7]'
          }`}
        >
          Zero Day
        </Button>
        
        <Button
          onClick={() => handleSetStatus('reset')}
          className={`flex-1 py-5 transition-all font-medium rounded-lg ${
            currentStatus === 'reset'
              ? 'bg-[#e60000] text-white hover:bg-[#cc0000]'
              : 'bg-[#FF0000] text-white hover:bg-[#e60000]'
          }`}
        >
          Reset Day
        </Button>
      </div>
    </div>
  );
};

export default TodayTracker;
