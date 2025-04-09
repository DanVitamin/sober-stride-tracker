
import React, { createContext, useContext, useState, useEffect } from 'react';
import { DayRecord, DayStatus, SoberContextType } from '@/types/soberTypes';
import { useDayStatus } from '@/hooks/useDayStatus';
import { calculateStreaks } from '@/utils/streakUtils';
import { loadSoberData } from '@/utils/storageUtils';

const SoberContext = createContext<SoberContextType | null>(null);

export const useSoberData = () => {
  const context = useContext(SoberContext);
  if (!context) {
    throw new Error('useSoberData must be used within a SoberProvider');
  }
  return context;
};

// Change from: export { DayStatus };
// To: export type statements for TypeScript with isolatedModules
export { DayStatus } from '@/types/soberTypes';
export type { DayRecord } from '@/types/soberTypes';

export const SoberProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial data
  const [initialData] = useState<DayRecord[]>(loadSoberData());
  
  // Use our custom hook for day status operations
  const { dayRecords, setDayStatus, getDayStatus, resetAllData } = useDayStatus(initialData);
  
  // Calculate streaks and stats
  const [stats, setStats] = useState(() => calculateStreaks(dayRecords));
  
  // Update stats when dayRecords change
  useEffect(() => {
    setStats(calculateStreaks(dayRecords));
  }, [dayRecords]);
  
  const value: SoberContextType = {
    dayRecords,
    currentStreak: stats.currentStreak,
    bestStreak: stats.bestStreak,
    totalMonths: stats.totalMonths,
    totalYears: stats.totalYears,
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
