
import React from 'react';
import Calendar from '@/components/Calendar';
import { Link } from 'react-router-dom';

const CalendarPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-muted">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-2xl font-bold">
              zero
            </Link>
            <Link to="/">
              <button 
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full 
                  hover:bg-transparent hover:text-primary border-2 border-primary 
                  transition-all font-semibold"
              >
                View Progress
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-8 px-4">
        <section>
          <Calendar />
        </section>
      </div>
      
      <footer className="py-4 text-center text-sm text-muted-foreground border-t border-muted">
        <p>&copy; {new Date().getFullYear()} Zero Tracker</p>
      </footer>
    </div>
  );
};

export default CalendarPage;
