
import React, { useState } from 'react';
import { useSoberData } from '@/context/SoberContext';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

const TodayTracker: React.FC = () => {
  const { getDayStatus, setDayStatus, currentStreak, totalMonths, totalYears } = useSoberData();
  const [loading, setLoading] = useState(false);
  const today = new Date();
  const currentStatus = getDayStatus(today);
  
  const handleSetStatus = (status: 'zero' | 'reset') => {
    setLoading(true);
    
    // Set the day status
    setDayStatus(today, status);
    
    // Adding a small delay to show loading state for better feedback
    setTimeout(() => setLoading(false), 300);
  };
  
  return (
    <div className="zero-card">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-center">
          {format(today, 'EEEE, MMMM d')} - Today
        </h3>
        <p className="text-center text-sm mt-1 text-zero-text-secondary">
          Current status: {currentStatus ? (
            <span className={currentStatus === 'zero' ? 'text-[#18C5ED]' : 'text-[#FF0000]'}>
              {currentStatus === 'zero' ? 'Zero Day' : 'Reset Day'}
            </span>
          ) : (
            <span className="text-yellow-400">Unknown</span>
          )}
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() => handleSetStatus('zero')}
          disabled={loading}
          className={`flex-1 py-5 transition-all font-medium rounded-[5px] ${
            currentStatus === 'zero'
              ? 'bg-[#16b3d7] text-black hover:bg-[#14a1c5]'
              : 'bg-[#18C5ED] text-black hover:bg-[#16b3d7]'
          }`}
        >
          {loading ? 'Updating...' : 'Zero Day'}
        </Button>
        
        <Button
          onClick={() => handleSetStatus('reset')}
          disabled={loading}
          className={`flex-1 py-5 transition-all font-medium rounded-[5px] ${
            currentStatus === 'reset'
              ? 'bg-[#e60000] text-white hover:bg-[#cc0000]'
              : 'bg-[#FF0000] text-white hover:bg-[#e60000]'
          }`}
        >
          {loading ? 'Updating...' : 'Reset Day'}
        </Button>
      </div>
    </div>
  );
};

export default TodayTracker;
