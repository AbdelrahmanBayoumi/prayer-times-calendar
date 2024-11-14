export interface PrayerDetail {
  name: string;
  hadith: string;
}

export type PrayerTimes = {
  [key: string]: Date;
};
