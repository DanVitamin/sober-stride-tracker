
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, X, Trash2 } from 'lucide-react';
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
  
  const { getDayStatus, setDayStatus } = useSoberData();
  
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
  
  const handleRemoveEntry = (date: Date) => {
    setDayStatus(date, null);
    closeModal();
  };
  
  const getDayClass = (day: Date): string => {
    const status = getDayStatus(day);
    const isToday = isDateToday(day);
    const inCurrentMonth = isCurrentMonth(day, currentMonth);
    const inFuture = isDateInFuture(day);
    
    if (!inCurrentMonth) {
      return "opacity-30";
    }
    
    let classes = "w-full h-full aspect-square rounded-lg flex items-center justify-center font-medium border transition-all shadow-sm ";
    
    if (inFuture) {
      classes += "border-zero-ui-border bg-opacity-20 text-zero-text-muted cursor-not-allowed ";
    } else {
      if (status === 'zero') {
        classes += "bg-zero-text-primary text-zero-bg-primary border-zero-text-primary hover:bg-zero-text-primary/90 ";
      } else if (status === 'reset') {
        classes += "bg-zero-accent-reset text-zero-text-primary border-zero-accent-reset hover:bg-zero-accent-reset/90 ";
      } else {
        classes += "bg-zero-ui-card border-zero-ui-border text-zero-text-primary hover:bg-zero-ui-hover ";
      }
      
      classes += "cursor-pointer ";
    }
    
    if (isToday) {
      classes += "ring-2 ring-zero-text-primary ring-opacity-70 ";
    }
    
    return classes;
  };

  return (
    <div className="zero-card">
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePreviousMonth}
          aria-label="Previous month"
          className="text-zero-text-primary hover:bg-zero-ui-hover"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <span className="text-xl font-medium min-w-[140px] text-center">
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
          <div className="w-3 h-3 rounded-full bg-zero-text-primary"></div>
          <span className="text-sm text-zero-text-secondary">Zero Day</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-zero-accent-reset"></div>
          <span className="text-sm text-zero-text-secondary">Reset Day</span>
        </div>
      </div>
      
      <CardContent className="p-0">
        <div className="grid grid-cols-7 gap-2">
          {dayLabels.map((label) => (
            <div
              key={label}
              className="text-center font-medium text-sm py-2 text-zero-text-secondary"
            >
              {label}
            </div>
          ))}
          
          {days.map((day, index) => {
            const inCurrentMonth = isCurrentMonth(day, currentMonth);
            
            if (!inCurrentMonth) {
              return <div key={day.toString()} className="aspect-square" />;
            }
            
            return (
              <div key={day.toString()} className="relative aspect-square">
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
      
      {/* Custom Modal instead of using DayModal component */}
      {selectedDate && isModalOpen && (
        <div className="mt-8 p-6 rounded-lg bg-zero-ui-hover border border-zero-ui-border shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">
              {selectedDate.toLocaleDateString('default', { 
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </h3>
            <div className="flex items-center gap-2">
              {getDayStatus(selectedDate) && (
                <button 
                  onClick={() => handleRemoveEntry(selectedDate)}
                  className="p-2 hover:bg-zero-ui-hover rounded-full text-zero-accent-reset 
                    border border-zero-accent-reset"
                  title="Remove entry"
                >
                  <Trash2 size={20} />
                </button>
              )}
              <button 
                onClick={closeModal}
                className="p-2 hover:bg-zero-ui-hover rounded-full"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => {
                setDayStatus(selectedDate, 'zero');
                closeModal();
              }}
              className={`flex-1 py-3.5 rounded-lg font-semibold shadow-md transition-all
                ${getDayStatus(selectedDate) === 'zero' 
                  ? 'border-2 border-zero-text-primary bg-transparent text-zero-text-primary' 
                  : 'bg-zero-text-primary text-zero-bg-primary hover:bg-zero-text-primary/90'
                }`}
            >
              Zero Day
            </button>
            
            <button
              onClick={() => {
                setDayStatus(selectedDate, 'reset');
                closeModal();
              }}
              className={`flex-1 py-3.5 rounded-lg font-semibold shadow-md transition-all
                ${getDayStatus(selectedDate) === 'reset'
                  ? 'border-2 border-zero-accent-reset bg-transparent text-zero-text-primary'
                  : 'bg-zero-accent-reset text-zero-text-primary hover:bg-zero-accent-reset/90'
                }`}
            >
              Reset Day
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
