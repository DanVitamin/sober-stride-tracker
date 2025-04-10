
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { useIsMobile } from '@/hooks/use-mobile';
import { LineChart } from 'lucide-react';
import DaysList from '@/components/DaysList';

const CalendarPage = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen zero-gradient-bg text-zero-text-primary">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-10 bg-white/10"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-5 bg-white/10"></div>
      
      <nav className="relative border-b border-zero-ui-border z-10">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-2 md:py-4">
          <div className="flex justify-between h-12 md:h-16 items-center">
            <Logo size="md" className="text-zero-text-primary" />
            <Link to="/">
              <button 
                className="flex items-center justify-center transition-all hover:opacity-80"
              >
                <LineChart size={isMobile ? 26 : 32} color="#FFFFFF" />
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-4 md:py-10 px-4 md:px-6 relative z-10">
        <section>
          <DaysList />
        </section>
      </div>
    </div>
  );
};

export default CalendarPage;
