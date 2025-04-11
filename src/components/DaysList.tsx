
import React, { useState } from 'react';
import { useSoberData } from '@/context/SoberContext';
import { format, eachDayOfInterval, subDays, startOfDay } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DaysList: React.FC = () => {
  const { getDayStatus, setDayStatus } = useSoberData();
  const [pageSize] = useState(14); // Number of days to show per page
  const [offset, setOffset] = useState(0);
  
  const today = startOfDay(new Date());
  const startDate = subDays(today, offset + pageSize - 1);
  
  // Generate days for current page
  const days = eachDayOfInterval({
    start: startDate,
    end: subDays(today, offset)
  }).reverse();
  
  const handlePrevious = () => {
    setOffset(offset + pageSize);
  };
  
  const handleNext = () => {
    setOffset(Math.max(0, offset - pageSize));
  };
  
  const handleSetStatus = (date: Date, status: 'zero' | 'reset') => {
    setDayStatus(date, status);
  };
  
  return (
    <div className="zero-card py-4 md:py-6 px-3 md:px-6">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevious}
          className="text-zero-text-primary hover:bg-zero-ui-hover rounded-[5px]"
        >
          <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
        <h2 className="text-lg md:text-xl font-medium">Recent Days</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          disabled={offset === 0}
          className={`text-zero-text-primary rounded-[5px] ${offset === 0 ? 'opacity-50' : 'hover:bg-zero-ui-hover'}`}
        >
          <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>
      
      <div className="space-y-1 md:space-y-2">
        {days.map((day) => {
          const status = getDayStatus(day);
          const isToday = format(today, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
          
          return (
            <div 
              key={day.toString()} 
              className={`flex items-center rounded-[5px] p-2 md:p-3 border border-zero-ui-border ${
                isToday ? 'bg-zero-bg-dark' : ''
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="text-sm md:text-base font-medium">
                    {format(day, 'E, MMM d')}
                  </span>
                  {isToday && (
                    <span className="ml-2 text-xs bg-zero-ui-border px-2 py-0.5 rounded-[5px]">
                      Today
                    </span>
                  )}
                </div>
                {status && (
                  <span className={`text-xs ${status === 'zero' ? 'text-[#18C5ED]' : 'text-[#FF0000]'}`}>
                    {status === 'zero' ? 'Zero Day' : 'Reset Day'}
                  </span>
                )}
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleSetStatus(day, 'zero')}
                  className={`w-12 md:w-16 h-8 md:h-10 rounded-[5px] transition-colors ${
                    status === 'zero'
                      ? 'bg-[#16b3d7]'
                      : 'bg-[#18C5ED] hover:bg-[#16b3d7]'
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center text-black font-medium">
                    Zero
                  </div>
                </button>
                
                <button
                  onClick={() => handleSetStatus(day, 'reset')}
                  className={`w-12 md:w-16 h-8 md:h-10 rounded-[5px] transition-colors ${
                    status === 'reset'
                      ? 'bg-[#e60000]'
                      : 'bg-[#FF0000] hover:bg-[#e60000]'
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center text-white font-medium">
                    Reset
                  </div>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DaysList;
