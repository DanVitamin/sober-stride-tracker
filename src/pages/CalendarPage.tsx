
import React from 'react';
import Calendar from '@/components/Calendar';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';

const CalendarPage = () => {
  return (
    <div className="min-h-screen zero-gradient-bg text-zero-text-primary">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-10 bg-white/10"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-5 bg-white/10"></div>
      
      <nav className="relative border-b border-zero-ui-border z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2">
              <Logo size="md" className="text-zero-text-primary" />
            </Link>
            <Link to="/">
              <button 
                className="px-5 py-2.5 rounded-full transition-all font-semibold
                  bg-zero-text-primary text-zero-bg-primary shadow-lg hover:opacity-90"
              >
                View Progress
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-10 px-6 relative z-10">
        <section>
          <Calendar />
        </section>
      </div>
      
      <footer className="py-4 text-center text-sm text-zero-text-muted border-t border-zero-ui-border">
        <p>&copy; {new Date().getFullYear()} Zero Tracker</p>
      </footer>
    </div>
  );
};

export default CalendarPage;
