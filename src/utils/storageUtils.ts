
import { DayRecord } from '@/types/soberTypes';
import { toast } from 'sonner';

export const loadSoberData = (): DayRecord[] => {
  const storedData = localStorage.getItem('soberData');
  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (error) {
      console.error('Failed to parse stored data:', error);
      toast.error('Failed to load your sobriety data');
      return [];
    }
  }
  return [];
};

export const saveSoberData = (dayRecords: DayRecord[]): void => {
  if (dayRecords.length > 0) {
    localStorage.setItem('soberData', JSON.stringify(dayRecords));
  }
};

export const clearSoberData = (): void => {
  localStorage.removeItem('soberData');
};
