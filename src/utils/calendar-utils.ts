import { PrayerTimes } from 'adhan';
import fs from 'fs';
import ICAL from 'ical.js';
import { DateTime } from 'luxon';
import path from 'path';
import { PRAYER_DETAILS, PRAYER_DURATIONS } from '../constants/prayer-details';
import {
  PrayerCalendarOptions,
  PrayerDetail,
  PrayerName,
} from '../types/prayer-types';

export function createCalendarEvent(
  prayer: PrayerName | string,
  startTime: DateTime,
  duration: number,
  prayerDetail: PrayerDetail,
): ICAL.Component {
  const endTime = startTime.plus({ minutes: duration });
  const event = new ICAL.Component('vevent');

  event.addPropertyWithValue('UID', `${prayer}_${startTime.toISODate()}`);
  event.addPropertyWithValue('SUMMARY', prayerDetail.name);
  event.addPropertyWithValue(
    'DTSTAMP',
    new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
  );
  event.addPropertyWithValue(
    'DTSTART',
    startTime.toUTC().toFormat("yyyyMMdd'T'HHmmss'Z'"),
  );
  event.addPropertyWithValue(
    'DTEND',
    endTime.toUTC().toFormat("yyyyMMdd'T'HHmmss'Z'"),
  );

  const description = `${prayerDetail.name}\\n${prayerDetail.hadith}`;
  event.addPropertyWithValue('DESCRIPTION', description);
  event.addPropertyWithValue('X-ALT-DESC', description);

  event.addPropertyWithValue('X-MICROSOFT-CDO-BUSYSTATUS', 'BUSY');
  event.addPropertyWithValue('CLASS', 'PUBLIC');
  event.addPropertyWithValue('TRANSP', 'OPAQUE');

  return event;
}

export async function generatePrayerCalendar({
  coordinates,
  calculationMethod,
  startDate,
  endDate,
  outputPath,
}: PrayerCalendarOptions): Promise<string> {
  const start = DateTime.fromISO(startDate);
  const end = DateTime.fromISO(endDate);

  const calendar = new ICAL.Component(['vcalendar', [], []]);
  calendar.updatePropertyWithValue('VERSION', '2.0');
  calendar.updatePropertyWithValue('CALSCALE', 'GREGORIAN');
  calendar.updatePropertyWithValue('PRODID', 'adhan-prayer-calendar');
  calendar.updatePropertyWithValue('X-WR-CALNAME', 'Prayer Times');

  // Loop through each day in the date range
  for (let date = start; date <= end; date = date.plus({ days: 1 })) {
    const jsDate = date.toJSDate();
    const prayerTimes = new PrayerTimes(coordinates, jsDate, calculationMethod);

    console.log(`Prayer times for ${date.toFormat('MMMM dd, yyyy')}`);

    Object.entries(prayerTimes).forEach(([prayer, time]) => {
      const prayerName = prayer as PrayerName;
      const duration = PRAYER_DURATIONS[prayerName];
      const details = PRAYER_DETAILS[prayerName];

      if (duration != null && details && time instanceof Date) {
        const startTime = DateTime.fromJSDate(time);
        const event = createCalendarEvent(
          prayerName,
          startTime,
          duration,
          details,
        );

        calendar.addSubcomponent(event);
      }
    });
  }

  // Ensure the output directory exists and write calendar
  await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.promises.writeFile(outputPath, calendar.toString(), 'utf-8');
  console.log(`Prayer times calendar generated successfully in ${outputPath}`);

  return outputPath;
}
