
import React from 'react';
import { useSoberData } from '@/context/SoberContext';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between h-16 items-center">
            <span className="text-2xl font-bold">zero</span>
            <Link to="/calendar">
              <button 
                className="flex items-center gap-2 px-5 py-2.5 rounded-full transition-all font-semibold
                  bg-zero-text-primary text-zero-bg-primary shadow-lg hover:opacity-90"
              >
                <Calendar size={20} />
                <span>Track Days</span>
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-10 px-6">
        {/* Streak */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-56 h-56 rounded-full bg-zero-bg-dark flex items-center justify-center">
            <div className="text-center">
              <div className="text-7xl font-bold">{currentStreak}</div>
              <div className="text-lg text-zero-text-secondary">day streak</div>
            </div>
          </div>
          <p className="text-xl mt-8 font-medium">
            {getMessage(currentStreak)}
          </p>
        </div>
        
        {/* Stats Cards - always show in a row, even on mobile */}
        <div className="grid grid-cols-3 gap-2 sm:gap-6 mb-10">
          <div className="zero-card text-center">
            <div className="text-lg font-semibold mb-1">Best Streak</div>
            <div className="text-3xl font-bold">{bestStreak}</div>
            <div className="text-sm text-zero-text-muted">days</div>
          </div>
          
          <div className="zero-card text-center">
            <div className="text-lg font-semibold mb-1">Total Months</div>
            <div className="text-3xl font-bold">{totalMonths}</div>
            <div className="text-sm text-zero-text-muted">months zero</div>
          </div>
          
          <div className="zero-card text-center">
            <div className="text-lg font-semibold mb-1">Total Years</div>
            <div className="text-3xl font-bold">{totalYears}</div>
            <div className="text-sm text-zero-text-muted">years zero</div>
          </div>
        </div>
      </div>
      
      <footer className="py-4 text-center text-sm text-zero-text-muted border-t border-zero-ui-border">
        <p>&copy; {new Date().getFullYear()} Zero Tracker</p>
      </footer>
    </div>
  );
};

export default Index;
