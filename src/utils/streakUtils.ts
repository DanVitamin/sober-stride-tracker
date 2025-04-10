
import { DayRecord, DayStatus } from '@/types/soberTypes';
import { addDays, differenceInDays, differenceInMonths, differenceInYears, startOfDay, isBefore } from 'date-fns';

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

  // Check if the most recent day is a reset day
  const mostRecentRecord = sortedRecords[0];
  const mostRecentDate = new Date(mostRecentRecord.date);
  const today = startOfDay(new Date());
  
  // If the most recent record is from today and is a reset, immediately return zero for current streak and totals
  if (
    differenceInDays(today, mostRecentDate) === 0 && 
    mostRecentRecord.status === 'reset'
  ) {
    return {
      currentStreak: 0,
      bestStreak: calculateBestStreak(dayRecords), // Still calculate best streak from history
      totalMonths: 0,
      totalYears: 0
    };
  }

  // Calculate current streak by starting from today and walking backward
  let streak = 0;
  let currentDate = today;
  let streakBroken = false;

  // Continue walking back days until we find a break in the streak
  while (!streakBroken) {
    // Format the date to match our record format (YYYY-MM-DD)
    const dateString = currentDate.toISOString().split('T')[0];
    
    // Find if we have a record for this date
    const record = dayRecords.find(r => r.date.split('T')[0] === dateString);
    
    // If we find a reset day, the streak is broken
    if (record && record.status === 'reset') {
      streakBroken = true;
    }
    // If it's a zero day, increase the streak
    else if (record && record.status === 'zero') {
      streak++;
    }
    // If no record exists and it's a past date (not today), break the streak
    else if (!record && isBefore(currentDate, today)) {
      streakBroken = true;
    }
    // For today with no record, we continue checking (no penalty for current day)
    else if (!record && differenceInDays(today, currentDate) === 0) {
      // Today without a record doesn't break the streak, but also doesn't add to it
      // We just move to the previous day
    }
    
    // Move to the previous day
    currentDate = addDays(currentDate, -1);
    
    // Safety check: don't go back more than 10000 days
    if (differenceInDays(currentDate, today) > 10000) {
      console.error("Infinite loop protection triggered in streak calculation");
      break;
    }
  }
  
  // If there's a reset day from today, streak should be 0
  if (dayRecords.some(record => {
    const recordDate = new Date(record.date);
    return differenceInDays(today, recordDate) === 0 && record.status === 'reset';
  })) {
    streak = 0;
  }
  
  // Calculate best streak
  const bestStrk = calculateBestStreak(dayRecords);

  // Calculate total months and years 
  // If there's a reset today, set these to 0
  let totalZeroDays = dayRecords.filter(r => r.status === 'zero').length;
  let totalMonths = Math.floor(totalZeroDays / 30);
  let totalYears = Math.floor(totalZeroDays / 365);
  
  // If we have a reset day today, reset totals to 0
  if (dayRecords.some(record => {
    const recordDate = new Date(record.date);
    return differenceInDays(today, recordDate) === 0 && record.status === 'reset';
  })) {
    totalMonths = 0;
    totalYears = 0;
  }
  
  return {
    currentStreak: streak,
    bestStreak: bestStrk,
    totalMonths,
    totalYears
  };
};

// Helper function to calculate best streak
function calculateBestStreak(dayRecords: DayRecord[]): number {
  // Sort by date (oldest first for this calculation)
  const chronologicalRecords = [...dayRecords].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  
  let bestStrk = 0;
  let currentStrk = 0;
  
  for (let i = 0; i < chronologicalRecords.length; i++) {
    const record = chronologicalRecords[i];
    const recordDate = new Date(record.date);
    
    if (record.status === 'zero') {
      // First day of potential streak
      if (currentStrk === 0) {
        currentStrk = 1;
      } else {
        // Check if this day is consecutive with the previous day
        const prevDate = new Date(chronologicalRecords[i - 1].date);
        const dayDiff = differenceInDays(recordDate, prevDate);
        
        // If days aren't consecutive, start a new streak
        if (dayDiff > 1) {
          currentStrk = 1;
        } else {
          // Consecutive day, continue streak
          currentStrk++;
        }
      }
      
      // Update best streak if current one is better
      if (currentStrk > bestStrk) {
        bestStrk = currentStrk;
      }
    } else if (record.status === 'reset') {
      // Reset days break streaks
      currentStrk = 0;
    }
  }
  
  return bestStrk;
}

export const getDayStatus = (dayRecords: DayRecord[], date: Date): DayStatus => {
  const dateString = date.toISOString().split('T')[0];
  const record = dayRecords.find(record => record.date.split('T')[0] === dateString);
  return record ? record.status : null;
};
