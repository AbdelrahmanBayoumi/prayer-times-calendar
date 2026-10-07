import { CalculationParameters, Coordinates } from 'adhan';

export type PrayerName =
  | 'fajr'
  | 'sunrise'
  | 'dhuhr'
  | 'asr'
  | 'maghrib'
  | 'isha';

export interface PrayerDetail {
  name: string;
  hadith: string;
}

export type PrayerTimes = Partial<Record<PrayerName, Date>> & {
  [key: string]: Date | undefined;
};

export interface PrayerCalendarOptions {
  coordinates: Coordinates;
  calculationMethod: CalculationParameters;
  startDate: string;
  endDate: string;
  outputPath: string;
  alarmOffsetMinutes?: number | null;
}
