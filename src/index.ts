import { CalculationMethod, Coordinates, PrayerTimes } from 'adhan';
import fs from 'fs';
import ICAL from 'ical.js';
import { DateTime } from 'luxon';
import moment from 'moment-timezone';
import { PRAYER_DETAILS, PRAYER_DURATIONS } from './constants/prayer-details';
import { createCalendarEvent } from './utils/calendar-utils';

// Set the coordinates and calculation method
const coordinates = new Coordinates(31.1981, 29.9192);
const params = CalculationMethod.Egyptian();

// Define the date range
const startDate = DateTime.fromISO('2024-11-14');
const endDate = DateTime.fromISO('2024-12-14');

// Create a new calendar component
const calendar = new ICAL.Component(['vcalendar', [], []]);
calendar.updatePropertyWithValue('VERSION', '2.0');
calendar.updatePropertyWithValue('CALSCALE', 'GREGORIAN');
calendar.updatePropertyWithValue('PRODID', 'adhan-prayer-calendar');
calendar.updatePropertyWithValue('X-WR-CALNAME', 'Prayer Times');

// Loop through each day in the date range
for (let date = startDate; date <= endDate; date = date.plus({ days: 1 })) {
  const jsDate = date.toJSDate();
  const prayerTimes = new PrayerTimes(coordinates, jsDate, params);

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

// Write the generated calendar to an .ics file
fs.writeFile('generated_prayer_times.ics', calendar.toString(), (err) => {
  if (err) throw err;
  console.log(
    'Prayer times calendar generated successfully for the specified date range!',
  );
});
