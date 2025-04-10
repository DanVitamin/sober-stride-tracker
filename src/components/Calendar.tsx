
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayStatus, useSoberData } from '@/context/SoberContext';
import DayModal from './DayModal';
import {
  getCalendarDays,
  formatMonthYear,
  isCurrentMonth,
  isDateToday,
  isDateInFuture,
  formatDay,
  getNextMonth,
  getPrevMonth,
  getDayLabels
} from '@/utils/dateUtils';

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { getDayStatus } = useSoberData();
  
  const days = getCalendarDays(currentMonth);
  const dayLabels = getDayLabels();
  
  const handlePreviousMonth = () => {
    setCurrentMonth(getPrevMonth(currentMonth));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(getNextMonth(currentMonth));
  };
  
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
    const inCurrentMonth = isCurrentMonth(day, currentMonth);
    const inFuture = isDateInFuture(day);
    
    if (!inCurrentMonth) {
      return "opacity-30";
    }
    
    let classes = "w-full h-full rounded-lg flex items-center justify-center transition-colors ";
    
    if (inFuture) {
      classes += "text-zero-text-muted cursor-not-allowed ";
    } else {
      if (status === 'zero') {
        classes += "bg-white text-zero-bg-primary ";
      } else if (status === 'reset') {
        classes += "bg-zero-accent-reset text-white ";
      } else {
        classes += "bg-zero-ui-card text-white hover:bg-zero-ui-hover ";
      }
      
      classes += "cursor-pointer ";
    }
    
    if (isToday) {
      classes += "ring-1 ring-white ";
    }
    
    return classes;
  };

  return (
    <div className="zero-card">
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePreviousMonth}
          aria-label="Previous month"
          className="text-zero-text-primary hover:bg-zero-ui-hover"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <span className="text-xl font-medium">
          {formatMonthYear(currentMonth)}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNextMonth}
          aria-label="Next month"
          className="text-zero-text-primary hover:bg-zero-ui-hover"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Calendar Legend */}
      <div className="flex gap-6 justify-center mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-white"></div>
          <span className="text-sm text-zero-text-secondary">Zero Day</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-zero-accent-reset"></div>
          <span className="text-sm text-zero-text-secondary">Reset Day</span>
        </div>
      </div>
      
      <CardContent className="p-0">
        <div className="grid grid-cols-7 gap-1">
          {dayLabels.map((label) => (
            <div
              key={label}
              className="text-center font-medium text-sm py-2 text-zero-text-secondary"
            >
              {label}
            </div>
          ))}
          
          {days.map((day) => {
            const inCurrentMonth = isCurrentMonth(day, currentMonth);
            
            if (!inCurrentMonth) {
              return <div key={day.toString()} className="aspect-square" />;
            }
            
            return (
              <div key={day.toString()} className="aspect-square p-0.5">
                <button 
                  onClick={() => handleDayClick(day)}
                  className={getDayClass(day)}
                  disabled={isDateInFuture(day)}
                  aria-disabled={isDateInFuture(day)}
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
