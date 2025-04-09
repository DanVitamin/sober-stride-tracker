
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    
    let classes = "calendar-day rounded-md p-1 relative transition-all ";
    
    if (!inCurrentMonth) {
      classes += "opacity-30 ";
    }
    
    if (isToday) {
      classes += "border-2 border-primary font-bold ";
    }
    
    if (inFuture) {
      classes += "cursor-not-allowed text-muted-foreground ";
    } else {
      classes += "cursor-pointer hover:bg-accent hover:text-accent-foreground ";
    }
    
    return classes;
  };
  
  const getDayIndicator = (status: DayStatus): string => {
    if (status === 'sober') {
      return "bg-green-500";
    } else if (status === 'not-sober') {
      return "bg-red-500";
    }
    return "";
  };
  
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl">Sobriety Calendar</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
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
              variant="outline"
              size="icon"
              onClick={handleNextMonth}
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1">
            {dayLabels.map((label) => (
              <div
                key={label}
                className="text-center font-medium text-xs p-2"
              >
                {label}
              </div>
            ))}
            
            {days.map((day) => {
              const dayStatus = getDayStatus(day);
              
              return (
                <div 
                  key={day.toString()} 
                  onClick={() => handleDayClick(day)}
                  className={getDayClass(day)}
                  aria-disabled={isDateInFuture(day)}
                >
                  <span>{formatDay(day)}</span>
                  {dayStatus && (
                    <div className={`day-indicator ${getDayIndicator(dayStatus)}`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      <DayModal 
        date={selectedDate} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </>
  );
};

export default Calendar;
