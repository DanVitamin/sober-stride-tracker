
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
    const dateStr = formatDay(day);
    
    let classes = "aspect-square rounded-lg flex items-center justify-center font-medium border transition-all ";
    
    if (!inCurrentMonth) {
      return "opacity-30";
    }
    
    if (inFuture) {
      classes += "border-muted text-muted-foreground cursor-not-allowed ";
    } else {
      if (status === 'zero') {
        classes += "bg-primary text-primary-foreground border-primary hover:bg-transparent hover:text-primary ";
      } else if (status === 'reset') {
        classes += "bg-destructive text-destructive-foreground border-destructive hover:bg-transparent ";
      } else {
        classes += "border-muted text-foreground hover:border-primary ";
      }
      
      classes += "cursor-pointer ";
    }
    
    if (isToday) {
      classes += "border-primary border-2 ";
    }
    
    return classes;
  };
  
  return (
    <Card className="border border-muted rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePreviousMonth}
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium min-w-[120px] text-center">
          {formatMonthYear(currentMonth)}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNextMonth}
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <CardContent className="p-0">
        <div className="grid grid-cols-7 gap-2">
          {dayLabels.map((label) => (
            <div
              key={label}
              className="text-center font-medium text-sm py-2"
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
              <button 
                key={day.toString()} 
                onClick={() => handleDayClick(day)}
                className={getDayClass(day)}
                disabled={isDateInFuture(day)}
                aria-disabled={isDateInFuture(day)}
              >
                {formatDay(day)}
              </button>
            );
          })}
        </div>
      </CardContent>
      
      <DayModal 
        date={selectedDate} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </Card>
  );
};

export default Calendar;
