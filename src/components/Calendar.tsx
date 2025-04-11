
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DayStatus, useSoberData } from '@/context/SoberContext';
import DayModal from './DayModal';
import {
  getCalendarDays,
  formatMonthYear,
  isCurrentMonth,
  isDateToday,
  isDateInFuture,
  formatDay,
  getDayLabels
} from '@/utils/dateUtils';
import { useIsMobile } from '@/hooks/use-mobile';

interface CalendarProps {
  selectedMonth: Date;
}

const Calendar: React.FC<CalendarProps> = ({ selectedMonth }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { getDayStatus } = useSoberData();
  const isMobile = useIsMobile();
  
  const days = getCalendarDays(selectedMonth);
  const dayLabels = getDayLabels();
  
  const handleDayClick = (day: Date) => {
    if (isDateInFuture(day)) return;
    
    setSelectedDate(day);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const getDayClass = (day: Date): string => {
    const status = getDayStatus(day);
    const isToday = isDateToday(day);
    const inCurrentMonth = isCurrentMonth(day, selectedMonth);
    const inFuture = isDateInFuture(day);
    
    if (!inCurrentMonth) {
      return "opacity-30";
    }
    
    let classes = "w-full h-full rounded-lg flex items-center justify-center transition-colors ";
    
    if (inFuture) {
      classes += "text-zero-text-muted cursor-not-allowed opacity-50 ";
    } else {
      if (status === 'zero') {
        classes += "bg-[#18C5ED] text-black hover:bg-[#16b3d7] ";
      } else if (status === 'reset') {
        classes += "bg-[#FF0000] text-white hover:bg-[#e60000] ";
      } else {
        classes += "bg-zero-ui-card text-white hover:bg-zero-ui-hover ";
      }
      
      classes += "cursor-pointer ";
    }
    
    if (isToday) {
      classes += "ring-2 ring-white ";
    }
    
    return classes;
  };

  return (
    <div className="zero-card py-4 md:py-6 px-3 md:px-6 w-full">
      {/* Calendar Legend */}
      <div className="flex gap-4 md:gap-6 justify-center mb-4 md:mb-6">
        <div className="flex items-center gap-1 md:gap-2">
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#18C5ED]"></div>
          <span className="text-xs md:text-sm text-zero-text-secondary">Zero Day</span>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#FF0000]"></div>
          <span className="text-xs md:text-sm text-zero-text-secondary">Reset Day</span>
        </div>
      </div>
      
      <CardContent className="p-0">
        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {dayLabels.map((label) => (
            <div
              key={label}
              className="text-center font-medium text-xs md:text-sm py-1 md:py-2 text-zero-text-secondary"
            >
              {isMobile ? label.charAt(0) : label}
            </div>
          ))}
          
          {days.map((day) => {
            const inCurrentMonth = isCurrentMonth(day, selectedMonth);
            const inFuture = isDateInFuture(day);
            
            if (!inCurrentMonth) {
              return <div key={day.toString()} className="aspect-square" />;
            }
            
            return (
              <div key={day.toString()} className="aspect-square p-0.5 md:p-1">
                <button 
                  onClick={() => handleDayClick(day)}
                  className={getDayClass(day)}
                  disabled={inFuture}
                  aria-disabled={inFuture}
                >
                  {formatDay(day)}
                </button>
              </div>
            );
          })}
        </div>
      </CardContent>
      
      {selectedDate && (
        <DayModal
          date={selectedDate}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Calendar;
