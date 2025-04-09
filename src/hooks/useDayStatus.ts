
import { useState } from 'react';
import { DayRecord, DayStatus } from '@/types/soberTypes';
import { isBefore } from 'date-fns';
import { toast } from 'sonner';
import { saveSoberData } from '@/utils/storageUtils';
import { getDayStatus as getDayStatusUtil } from '@/utils/streakUtils';

export const useDayStatus = (initialDayRecords: DayRecord[]) => {
  const [dayRecords, setDayRecords] = useState<DayRecord[]>(initialDayRecords);

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
      
      let newRecords;
      if (existingIndex >= 0) {
        // Update existing record
        newRecords = [...prevRecords];
        newRecords[existingIndex] = { ...newRecords[existingIndex], status };
      } else {
        // Add new record
        newRecords = [...prevRecords, { date: dateString, status }];
      }
      
      // Save to localStorage after state update
      saveSoberData(newRecords);
      return newRecords;
    });
    
    toast.success(`Day updated successfully`);
  };

  const getDayStatusFn = (date: Date): DayStatus => {
    return getDayStatusUtil(dayRecords, date);
  };

  const resetAllData = () => {
    setDayRecords([]);
    localStorage.removeItem('soberData');
    toast.success('All data has been reset');
  };

  return {
    dayRecords,
    setDayStatus,
    getDayStatus: getDayStatusFn,
    resetAllData
  };
};
