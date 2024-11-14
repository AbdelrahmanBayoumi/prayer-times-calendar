import { CalculationParameters, Coordinates } from 'adhan';

export interface PrayerDetail {
  name: string;
  hadith: string;
}

export type PrayerTimes = {
  [key: string]: Date;
};

export interface PrayerCalendarOptions {
  coordinates: Coordinates;
  calculationMethod: CalculationParameters;
  startDate: string;
  endDate: string;
  outputPath: string;
}
