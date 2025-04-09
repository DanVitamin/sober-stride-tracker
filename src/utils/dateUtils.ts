
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isAfter, isBefore, isToday, addMonths, subMonths } from 'date-fns';

// Get an array of days for the calendar
export const getCalendarDays = (month: Date): Date[] => {
  const start = startOfMonth(month);
  const end = endOfMonth(month);
  
  return eachDayOfInterval({ start, end });
};

// Format date for display in the header
export const formatMonthYear = (date: Date): string => {
  return format(date, 'MMMM yyyy');
};

// Check if a date is in the current month
export const isCurrentMonth = (date: Date, currentMonth: Date): boolean => {
  return isSameMonth(date, currentMonth);
};

// Check if a date is today
export const isDateToday = (date: Date): boolean => {
  return isToday(date);
};

// Check if a date is in the future
export const isDateInFuture = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return isAfter(date, today);
};

// Check if a date is in the past
export const isDateInPast = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return isBefore(date, today);
};

// Format day number for calendar
export const formatDay = (date: Date): string => {
  return format(date, 'd');
};

// Get next month
export const getNextMonth = (date: Date): Date => {
  return addMonths(date, 1);
};

// Get previous month
export const getPrevMonth = (date: Date): Date => {
  return subMonths(date, 1);
};

// Generate day labels for calendar header
export const getDayLabels = (): string[] => {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
};
