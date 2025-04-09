
import React, { createContext, useContext, useState, useEffect } from 'react';
import { addDays, differenceInDays, differenceInMonths, differenceInYears, isBefore, startOfDay } from 'date-fns';
import { toast } from 'sonner';

// Define types
export type DayStatus = 'sober' | 'not-sober' | null;

export interface DayRecord {
  date: string; // ISO string format
  status: DayStatus;
}

interface SoberContextType {
  dayRecords: DayRecord[];
  currentStreak: number;
  bestStreak: number;
  totalMonths: number;
  totalYears: number;
  setDayStatus: (date: Date, status: DayStatus) => void;
  getDayStatus: (date: Date) => DayStatus;
  resetAllData: () => void;
}

const SoberContext = createContext<SoberContextType | null>(null);

export const useSoberData = () => {
  const context = useContext(SoberContext);
  if (!context) {
    throw new Error('useSoberData must be used within a SoberProvider');
  }
  return context;
};

export const SoberProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dayRecords, setDayRecords] = useState<DayRecord[]>([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [totalMonths, setTotalMonths] = useState(0);
  const [totalYears, setTotalYears] = useState(0);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem('soberData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setDayRecords(parsedData);
      } catch (error) {
        console.error('Failed to parse stored data:', error);
        toast.error('Failed to load your sobriety data');
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (dayRecords.length > 0) {
      localStorage.setItem('soberData', JSON.stringify(dayRecords));
    }
  }, [dayRecords]);

  // Calculate streaks whenever data changes
  useEffect(() => {
    calculateStats();
  }, [dayRecords]);

  const calculateStats = () => {
    if (dayRecords.length === 0) {
      setCurrentStreak(0);
      setBestStreak(0);
      setTotalMonths(0);
      setTotalYears(0);
      return;
    }

    // Sort records by date (newest first)
    const sortedRecords = [...dayRecords].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    // Calculate current streak
    let streak = 0;
    let today = startOfDay(new Date());
    let checkDate = today;
    
    // Check if the most recent day is today or yesterday (to handle not logging today yet)
    const latestDate = new Date(sortedRecords[0].date);
    const dayDiff = differenceInDays(today, latestDate);
    
    if (dayDiff > 1) {
      // There's a gap of more than one day, so start from scratch
      setCurrentStreak(0);
    } else {
      // Start checking from today or the latest entry
      let i = 0;
      let streakBroken = false;
      
      while (!streakBroken && i < sortedRecords.length) {
        const record = sortedRecords[i];
        const recordDate = new Date(record.date);
        
        // Check if this record is for the expected date or one day before
        const expectedDate = addDays(today, -streak);
        const isExpectedDate = differenceInDays(expectedDate, recordDate) === 0;
        
        if (isExpectedDate && record.status === 'sober') {
          streak++;
        } else if (isExpectedDate && record.status !== 'sober') {
          streakBroken = true;
        }
        
        i++;
      }
      
      setCurrentStreak(streak);
    }
    
    // Calculate best streak
    let bestStrk = 0;
    let currentStrk = 0;
    let streakStartDate: Date | null = null;
    let longestStreakStartDate: Date | null = null;
    
    // Sort by date (oldest first for this calculation)
    const chronologicalRecords = [...dayRecords].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    
    for (let i = 0; i < chronologicalRecords.length; i++) {
      const record = chronologicalRecords[i];
      
      if (record.status === 'sober') {
        if (currentStrk === 0) {
          streakStartDate = new Date(record.date);
        }
        currentStrk++;
        
        if (currentStrk > bestStrk) {
          bestStrk = currentStrk;
          longestStreakStartDate = streakStartDate;
        }
      } else {
        currentStrk = 0;
        streakStartDate = null;
      }
    }
    
    setBestStreak(bestStrk);
    
    // Calculate total months and years from the best streak
    if (longestStreakStartDate && bestStrk > 0) {
      const endDate = new Date();
      setTotalMonths(Math.floor(differenceInMonths(endDate, longestStreakStartDate)));
      setTotalYears(Math.floor(differenceInYears(endDate, longestStreakStartDate)));
    } else {
      setTotalMonths(0);
      setTotalYears(0);
    }
  };

  const setDayStatus = (date: Date, status: DayStatus) => {
    // Prevent setting status for future dates
    const today = new Date();
    if (isBefore(today, date)) {
      toast.error("You can't record future dates");
      return;
    }

    const dateString = date.toISOString().split('T')[0];
    
    setDayRecords(prevRecords => {
      // Check if the date already exists
      const existingIndex = prevRecords.findIndex(record => 
        record.date.split('T')[0] === dateString
      );
      
      if (existingIndex >= 0) {
        // Update existing record
        const newRecords = [...prevRecords];
        newRecords[existingIndex] = { ...newRecords[existingIndex], status };
        return newRecords;
      } else {
        // Add new record
        return [...prevRecords, { date: dateString, status }];
      }
    });
    
    toast.success(`Day updated successfully`);
  };

  const getDayStatus = (date: Date): DayStatus => {
    const dateString = date.toISOString().split('T')[0];
    const record = dayRecords.find(record => record.date.split('T')[0] === dateString);
    return record ? record.status : null;
  };

  const resetAllData = () => {
    setDayRecords([]);
    localStorage.removeItem('soberData');
    toast.success('All data has been reset');
  };

  const value: SoberContextType = {
    dayRecords,
    currentStreak,
    bestStreak,
    totalMonths,
    totalYears,
    setDayStatus,
    getDayStatus,
    resetAllData
  };

  return (
    <SoberContext.Provider value={value}>
      {children}
    </SoberContext.Provider>
  );
};
