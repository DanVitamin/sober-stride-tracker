
import React from 'react';
import { useSoberData } from '@/context/SoberContext';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import Logo from '@/components/Logo';

const getMessage = (streak: number) => {
  const messages: Record<number | string, string> = {
    0: "Ready to start your journey?",
    1: "Your first zero day!",
    7: "A week of conscious choices!",
    14: "Two weeks strong on your Zero path!",
    30: "A month of transformation!",
    default: "Keep going strong!"
  };
  return messages[streak] || messages.default;
};

const Index = () => {
  const { currentStreak, bestStreak, totalMonths, totalYears } = useSoberData();
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen relative overflow-hidden zero-gradient-bg text-zero-text-primary">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-10 bg-radial-white"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-5 bg-radial-white"></div>
      
      {/* Header */}
      <nav className="relative z-10 border-b border-zero-ui-border">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-2 md:py-4">
          <div className="flex justify-between h-12 md:h-16 items-center">
            <Logo size="md" className="text-zero-text-primary" />
            <Link to="/calendar">
              <button 
                className="flex items-center justify-center p-2 rounded-full transition-all 
                  bg-zero-text-primary text-zero-bg-primary shadow-lg hover:opacity-90"
              >
                <Calendar size={isMobile ? 32 : 40} />
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-6 md:py-10 px-4 md:px-6">
        {/* Streak - Made circle and text bigger */}
        <div className="flex flex-col items-center mb-8 md:mb-12">
          <div className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-zero-bg-dark flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl md:text-8xl font-bold">{currentStreak}</div>
              <div className="text-lg md:text-xl text-zero-text-secondary">day streak</div>
            </div>
          </div>
          <p className="text-lg md:text-xl mt-6 md:mt-8 font-medium">
            {getMessage(currentStreak)}
          </p>
        </div>
        
        {/* Stats Cards - always show in a row, even on mobile */}
        <div className="grid grid-cols-3 gap-2 sm:gap-6 mb-8 md:mb-10">
          <div className="zero-card text-center py-4 md:py-6 px-2 md:px-4">
            <div className="text-base md:text-lg font-semibold mb-1">Best Streak</div>
            <div className="text-2xl md:text-3xl font-bold">{bestStreak}</div>
            <div className="text-xs md:text-sm text-zero-text-muted">days</div>
          </div>
          
          <div className="zero-card text-center py-4 md:py-6 px-2 md:px-4">
            <div className="text-base md:text-lg font-semibold mb-1">Total Months</div>
            <div className="text-2xl md:text-3xl font-bold">{totalMonths}</div>
            <div className="text-xs md:text-sm text-zero-text-muted">months zero</div>
          </div>
          
          <div className="zero-card text-center py-4 md:py-6 px-2 md:px-4">
            <div className="text-base md:text-lg font-semibold mb-1">Total Years</div>
            <div className="text-2xl md:text-3xl font-bold">{totalYears}</div>
            <div className="text-xs md:text-sm text-zero-text-muted">years zero</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
