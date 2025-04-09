import { DayRecord, DayStatus } from '@/types/soberTypes';
import { addDays, differenceInDays, differenceInMonths, differenceInYears, startOfDay } from 'date-fns';

interface StreakStats {
  currentStreak: number;
  bestStreak: number;
  totalMonths: number;
  totalYears: number;
}

export const calculateStreaks = (dayRecords: DayRecord[]): StreakStats => {
  if (dayRecords.length === 0) {
    return {
      currentStreak: 0,
      bestStreak: 0,
      totalMonths: 0,
      totalYears: 0
    };
  }

  // Sort records by date (newest first)
  const sortedRecords = [...dayRecords].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Calculate current streak by starting from today and walking backward
  let streak = 0;
  const today = startOfDay(new Date());
  let currentDate = today;
  let streakBroken = false;

  // Continue walking back days until we find a break in the streak
  while (!streakBroken) {
    // Format the date to match our record format (YYYY-MM-DD)
    const dateString = currentDate.toISOString().split('T')[0];
    
    // Find if we have a record for this date
    const record = dayRecords.find(r => r.date.split('T')[0] === dateString);
    
    // If no record exists for today, we can assume streak continues (we're not checking future dates)
    // For past days, no record means streak is broken
    if (differenceInDays(today, currentDate) > 0 && !record) {
      streakBroken = true;
    } 
    // If the record exists but user reset, streak is broken
    else if (record && record.status === 'reset') {
      streakBroken = true;
    }
    // Otherwise, either there's no record for today (which is fine) or they marked it as zero
    else if (!record || record.status === 'zero') {
      // Only count past days or today with 'zero' status in streak
      if (record?.status === 'zero' || differenceInDays(today, currentDate) === 0) {
        streak++;
      }
    }
    
    // Move to the previous day
    currentDate = addDays(currentDate, -1);
    
    // Safety check: don't go back more than 10000 days
    if (streak > 10000) {
      console.error("Infinite loop protection triggered in streak calculation");
      break;
    }
  }
  
  // Calculate best streak
  let bestStrk = 0;
  let currentStrk = 0;
  
  // Sort by date (oldest first for this calculation)
  const chronologicalRecords = [...dayRecords].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  
  // Track streak start dates
  let streakStartDate: Date | null = null;
  let longestStreakStartDate: Date | null = null;
  let longestStreakEndDate: Date | null = null;

  // We need to handle consecutive days properly
  for (let i = 0; i < chronologicalRecords.length; i++) {
    const record = chronologicalRecords[i];
    const recordDate = new Date(record.date);
    
    if (record.status === 'zero') {
      // First day of potential streak
      if (currentStrk === 0) {
        streakStartDate = recordDate;
      } else if (currentStrk > 0) {
        // Check if this day is consecutive with the previous day
        const prevDate = new Date(chronologicalRecords[i - 1].date);
        const dayDiff = differenceInDays(recordDate, prevDate);
        
        // If days aren't consecutive, start a new streak
        if (dayDiff > 1) {
          currentStrk = 1;
          streakStartDate = recordDate;
        } else {
          // Consecutive day, continue streak
          currentStrk++;
        }
      } else {
        // First day of streak
        currentStrk = 1;
        streakStartDate = recordDate;
      }
      
      // Update best streak if current one is better
      if (currentStrk > bestStrk) {
        bestStrk = currentStrk;
        longestStreakStartDate = streakStartDate;
        longestStreakEndDate = recordDate;
      }
    } else if (record.status === 'reset') {
      // Reset days break streaks
      currentStrk = 0;
      streakStartDate = null;
    }
  }
  
  // If current streak is better than recorded best streak, update best streak
  if (streak > bestStrk) {
    bestStrk = streak;
    // Calculate the start date of current streak
    const currentStreakStartDate = addDays(today, -streak + 1);
    longestStreakStartDate = currentStreakStartDate;
    longestStreakEndDate = today;
  }
  
  // Calculate total months and years from the best streak
  let totalMonths = 0;
  let totalYears = 0;
  if (longestStreakStartDate && longestStreakEndDate && bestStrk > 0) {
    totalMonths = Math.floor(differenceInMonths(longestStreakEndDate, longestStreakStartDate));
    totalYears = Math.floor(differenceInYears(longestStreakEndDate, longestStreakStartDate));
  }
  
  return {
    currentStreak: streak,
    bestStreak: bestStrk,
    totalMonths,
    totalYears
  };
};

export const getDayStatus = (dayRecords: DayRecord[], date: Date): DayStatus => {
  const dateString = date.toISOString().split('T')[0];
  const record = dayRecords.find(record => record.date.split('T')[0] === dateString);
  return record ? record.status : null;
};
