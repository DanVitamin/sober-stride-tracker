
export type DayStatus = 'sober' | 'not-sober' | null;

export interface DayRecord {
  date: string; // ISO string format
  status: DayStatus;
}

export interface SoberContextType {
  dayRecords: DayRecord[];
  currentStreak: number;
  bestStreak: number;
  totalMonths: number;
  totalYears: number;
  setDayStatus: (date: Date, status: DayStatus) => void;
  getDayStatus: (date: Date) => DayStatus;
  resetAllData: () => void;
}
