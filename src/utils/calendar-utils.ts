import { PrayerTimes } from 'adhan';
import fs from 'fs';
import ICAL from 'ical.js';
import { DateTime } from 'luxon';
import moment from 'moment-timezone';
import path from 'path';
import { PRAYER_DETAILS, PRAYER_DURATIONS } from '../constants/prayer-details';
import { PrayerCalendarOptions, PrayerDetail } from '../types/prayer-types';

export function createCalendarEvent(
  prayer: string,
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

export function generatePrayerCalendar({
  coordinates,
  calculationMethod,
  startDate,
  endDate,
  outputPath,
}: PrayerCalendarOptions): void {
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

    console.log(`Prayer times for ${moment(jsDate).format('MMMM DD, YYYY')}`);

    Object.entries(prayerTimes).forEach(([prayer, time]) => {
      if (PRAYER_DURATIONS[prayer] != null && PRAYER_DETAILS[prayer]) {
        const startTime = DateTime.fromJSDate(time);
        const event = createCalendarEvent(
          prayer,
          startTime,
          PRAYER_DURATIONS[prayer],
          PRAYER_DETAILS[prayer],
        );

        calendar.addSubcomponent(event);
      }
    });
  }

  // Ensure the output directory exists
  fs.mkdir(path.dirname(outputPath), { recursive: true }, (err) => {
    if (err) throw err;

    // Write the generated calendar to the .ics file in the output directory
    fs.writeFile(outputPath, calendar.toString(), (writeErr) => {
      if (writeErr) throw writeErr;
      console.log(
        `Prayer times calendar generated successfully in ${outputPath}`,
      );
    });
  });
}
