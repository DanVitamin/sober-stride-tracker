
import React from 'react';
import Header from '@/components/Header';
import Calendar from '@/components/Calendar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CalendarPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container py-6 px-4 md:px-6 max-w-4xl mx-auto">
        <div className="mb-6 flex items-center">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
          </Link>
          <h2 className="text-2xl font-bold ml-4">Your Calendar</h2>
        </div>
        
        <section className="mb-8">
          <Calendar />
        </section>
      </main>
      
      <footer className="py-4 text-center text-sm text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} Sober Stride Tracker</p>
      </footer>
    </div>
  );
};

export default CalendarPage;
