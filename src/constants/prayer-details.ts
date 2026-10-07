import { PrayerDetail, PrayerName } from '../types/prayer-types';

export const PRAYER_DURATIONS: Record<PrayerName, number> = {
  fajr: 40,
  sunrise: 0,
  dhuhr: 25,
  asr: 25,
  maghrib: 20,
  isha: 30,
};

export const PRAYER_DETAILS: Record<PrayerName, PrayerDetail> = {
  fajr: {
    name: '🕋 صلاة الفجر',
    hadith: 'قال رسول الله ﷺ: من صلى الصبح فهو في ذمة الله.',
  },
  sunrise: {
    name: '☀️ شروق الشمس',
    hadith: 'قال رسول الله ﷺ: لا صلاة بعد الفجر حتى تطلع الشمس',
  },
  dhuhr: {
    name: '🕋 صلاة الظهر',
    hadith: 'قال رسول الله ﷺ: أفضلُ الأعمالِ الصَّلاةُ لوقتِها',
  },
  asr: {
    name: '🕋 صلاة العصر',
    hadith: 'قال رسول الله ﷺ: من ترك صلاة العصر حبط عمله.',
  },
  maghrib: {
    name: '🕋 صلاة المغرب',
    hadith:
      'قال رسول الله ﷺ: بادِروا بصَلاةِ المَغرِبِ قَبلَ طُلوعِ النَّجْمِ.',
  },
  isha: {
    name: '🕋 صلاة العشاء',
    hadith: 'قال رسول الله ﷺ: من صلى العشاء في جماعة، فكأنما قام نصف الليل.',
  },
};
