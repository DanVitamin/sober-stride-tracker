
import React from 'react';
import Calendar from '@/components/Calendar';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { useIsMobile } from '@/hooks/use-mobile';
import { LineChart } from 'lucide-react';

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
                className="flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-5 md:py-2.5 rounded-full transition-all font-semibold
                  bg-zero-text-primary text-zero-bg-primary shadow-lg hover:opacity-90 text-sm md:text-base"
              >
                <LineChart size={isMobile ? 16 : 20} />
                <span>View Progress</span>
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-4 md:py-10 px-4 md:px-6 relative z-10">
        <section>
          <Calendar />
        </section>
      </div>
    </div>
  );
};

export default CalendarPage;
