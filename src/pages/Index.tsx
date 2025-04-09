
import React from 'react';
import { useSoberData } from '@/context/SoberContext';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';

const getMessage = (streak: number) => {
  const messages: Record<number | string, string> = {
    0: "Ready to start your journey?",
    1: "Your first zero day!",
    7: "A week of conscious choices!",
    14: "Two weeks of dedication!",
    30: "A month of transformation!",
    default: "Keep going strong!"
  };
  return messages[streak] || messages.default;
};

const Index = () => {
  const { currentStreak, bestStreak, totalMonths, totalYears } = useSoberData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-muted">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <span className="text-2xl font-bold">zero</span>
            <Link to="/calendar">
              <button 
                className="flex items-center gap-2 px-6 py-2.5 rounded-full 
                  border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground 
                  transition-all font-semibold"
              >
                Track Days
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-12 text-center">
          <div className="inline-block border border-muted rounded-2xl p-12 mb-6">
            <h2 className="text-xl mb-2">Current Streak</h2>
            <div className="text-8xl font-bold mb-2">{currentStreak}</div>
            <p className="text-lg">days zero</p>
          </div>
          <p className="text-xl px-4">{getMessage(currentStreak)}</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="border border-muted p-6 rounded-lg">
            <h3 className="text-sm uppercase">Best Streak</h3>
            <p className="text-3xl font-bold mt-1">{bestStreak}</p>
            <p className="text-sm">days</p>
          </div>
          
          <div className="border border-muted p-6 rounded-lg">
            <h3 className="text-sm uppercase">Total Months</h3>
            <p className="text-3xl font-bold mt-1">{totalMonths}</p>
            <p className="text-sm">months zero</p>
          </div>
          
          <div className="border border-muted p-6 rounded-lg">
            <h3 className="text-sm uppercase">Total Years</h3>
            <p className="text-3xl font-bold mt-1">{totalYears}</p>
            <p className="text-sm">years zero</p>
          </div>
        </div>
      </div>
      
      <footer className="py-4 text-center text-sm text-muted-foreground border-t border-muted">
        <p>&copy; {new Date().getFullYear()} Zero Tracker</p>
      </footer>
    </div>
  );
};

export default Index;
