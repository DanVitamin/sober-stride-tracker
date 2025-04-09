
import React from 'react';
import { useSoberData } from '@/context/SoberContext';
import Header from '@/components/Header';
import StatsCard from '@/components/StatsCard';
import { 
  Trophy, 
  Clock, 
  Calendar as CalendarIcon, 
  CalendarCheck,
  CalendarPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const { currentStreak, bestStreak, totalMonths, totalYears, resetAllData } = useSoberData();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container py-6 px-4 md:px-6 max-w-4xl mx-auto">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
          
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatsCard 
              title="Current Streak" 
              value={currentStreak} 
              unit="days" 
              icon={<Clock className="h-4 w-4" />} 
              description="Consecutive sober days"
              size="large"
            />
            
            <StatsCard 
              title="Best Streak" 
              value={bestStreak} 
              unit="days" 
              icon={<Trophy className="h-4 w-4" />}
              description="Your record"
            />
            
            <StatsCard 
              title="Total Months" 
              value={totalMonths} 
              unit="months" 
              icon={<CalendarIcon className="h-4 w-4" />}
              description="Complete sober months"
            />
            
            <StatsCard 
              title="Total Years" 
              value={totalYears} 
              unit="years" 
              icon={<CalendarCheck className="h-4 w-4" />}
              description="Complete sober years"
            />
          </div>
        </section>
        
        <section className="mb-8">
          <Link to="/calendar">
            <Card className="hover:bg-accent transition-colors cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center justify-center gap-3">
                <CalendarPlus className="h-8 w-8 text-primary" />
                <h3 className="font-medium">View & Update Calendar</h3>
                <p className="text-sm text-muted-foreground">Track your sobriety journey</p>
              </CardContent>
            </Card>
          </Link>
        </section>

        <section className="text-center mt-12 mb-8">
          <Button onClick={resetAllData} variant="outline" className="text-xs text-muted-foreground">
            Reset All Data
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            This will remove all your tracking history
          </p>
        </section>
      </main>
      
      <footer className="py-4 text-center text-sm text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} Sober Stride Tracker</p>
      </footer>
    </div>
  );
};

export default Index;
