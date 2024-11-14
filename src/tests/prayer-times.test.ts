import { DateTime } from 'luxon';
import { PRAYER_DETAILS, PRAYER_DURATIONS } from '../constants/prayer-details';
import { createCalendarEvent } from '../utils/calendar-utils';

describe('createCalendarEvent', () => {
  it('should create a valid ICAL event for Fajr prayer', () => {
    const startTime = DateTime.now();
    const duration = PRAYER_DURATIONS['fajr'];
    const details = PRAYER_DETAILS['fajr'];

    const event = createCalendarEvent('fajr', startTime, duration, details);
    expect(event.getFirstPropertyValue('SUMMARY')).toBe(details.name);
    expect(event.getFirstPropertyValue('DESCRIPTION')).toContain(
      details.hadith,
    );
  });
});
