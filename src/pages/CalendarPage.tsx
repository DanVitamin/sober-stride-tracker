
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { useIsMobile } from '@/hooks/use-mobile';
import { LineChart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format, addMonths, subMonths } from 'date-fns';
import Calendar from '@/components/Calendar';

const CalendarPage = () => {
  const isMobile = useIsMobile();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const handleNextMonth = () => {
    const nextMonth = addMonths(currentMonth, 1);
    // Prevent navigating to future months beyond current month
    if (nextMonth.getMonth() <= new Date().getMonth() || 
        nextMonth.getFullYear() < new Date().getFullYear()) {
      setCurrentMonth(nextMonth);
    }
  };
  
  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  return (
    <div className="min-h-screen zero-gradient-bg text-zero-text-primary">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-10 bg-white/10"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-5 bg-white/10"></div>
      
      <nav className="relative border-b border-zero-ui-border z-10">
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-2 md:py-4">
          <div className="flex justify-between h-12 md:h-16 items-center">
            <Logo size="md" className="text-zero-text-primary" />
            <Link to="/">
              <button 
                className="flex items-center justify-center transition-all hover:opacity-80"
                aria-label="Go to home page"
              >
                <LineChart size={isMobile ? 26 : 32} color="#FFFFFF" />
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-4 md:py-10 px-6 md:px-8 relative z-10">
        <section className="w-full">
          {/* Month Navigation */}
          <div className="flex justify-between items-center mb-4 md:mb-6 px-0 md:px-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePreviousMonth}
              aria-label="Previous month"
              className="text-zero-text-primary hover:bg-zero-ui-hover rounded-[5px]"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </Button>
            <span className="text-xl md:text-2xl font-medium">
              {format(currentMonth, 'MMMM yyyy')}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextMonth}
              disabled={
                (currentMonth.getMonth() === new Date().getMonth() && 
                 currentMonth.getFullYear() === new Date().getFullYear())
              }
              aria-label="Next month"
              className="text-zero-text-primary hover:bg-zero-ui-hover disabled:opacity-30 rounded-[5px]"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </Button>
          </div>
          
          {/* Calendar Component */}
          <Calendar selectedMonth={currentMonth} />
        </section>
      </div>
    </div>
  );
};

export default CalendarPage;
