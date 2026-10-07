import { CalculationMethod, Coordinates } from 'adhan';
import fs from 'fs';
import { DateTime } from 'luxon';
import path from 'path';
import { PRAYER_DETAILS, PRAYER_DURATIONS } from '../constants/prayer-details';
import { PrayerName } from '../types/prayer-types';
import {
  createCalendarEvent,
  generatePrayerCalendar,
} from '../utils/calendar-utils';

describe('createCalendarEvent', () => {
  it('should create a valid ICAL event for Fajr prayer', () => {
    const startTime = DateTime.fromISO('2024-11-14T05:00:00Z');
    const duration = PRAYER_DURATIONS['fajr'];
    const details = PRAYER_DETAILS['fajr'];

    const event = createCalendarEvent('fajr', startTime, duration, details);

    expect(event.getFirstPropertyValue('SUMMARY')).toBe(details.name);
    expect(event.getFirstPropertyValue('DESCRIPTION')).toContain(
      details.hadith,
    );
    expect(event.getFirstPropertyValue('CLASS')).toBe('PUBLIC');
    expect(event.getFirstPropertyValue('TRANSP')).toBe('OPAQUE');
    expect(event.getFirstPropertyValue('DTSTART')).toBe('20241114T050000Z');
    expect(event.getFirstPropertyValue('DTEND')).toBe('20241114T054000Z');
  });

  it('should create a valid event with zero duration for sunrise', () => {
    const startTime = DateTime.fromISO('2024-11-14T06:30:00Z');
    const duration = PRAYER_DURATIONS['sunrise'];
    const details = PRAYER_DETAILS['sunrise'];

    const event = createCalendarEvent('sunrise', startTime, duration, details);

    expect(event.getFirstPropertyValue('SUMMARY')).toBe(details.name);
    expect(event.getFirstPropertyValue('DTSTART')).toBe('20241114T063000Z');
    expect(event.getFirstPropertyValue('DTEND')).toBe('20241114T063000Z');
  });

  it('should calculate correct end times for all prayers', () => {
    const prayerNames: PrayerName[] = [
      'fajr',
      'sunrise',
      'dhuhr',
      'asr',
      'maghrib',
      'isha',
    ];

    prayerNames.forEach((prayer) => {
      const startTime = DateTime.fromISO('2024-11-14T12:00:00Z');
      const duration = PRAYER_DURATIONS[prayer];
      const details = PRAYER_DETAILS[prayer];

      const event = createCalendarEvent(prayer, startTime, duration, details);

      expect(event.getFirstPropertyValue('SUMMARY')).toBe(details.name);
      const expectedEnd = startTime.plus({ minutes: duration });
      expect(event.getFirstPropertyValue('DTEND')).toBe(
        expectedEnd.toUTC().toFormat("yyyyMMdd'T'HHmmss'Z'"),
      );
    });
  });
});

describe('generatePrayerCalendar', () => {
  const testOutputDir = path.join(__dirname, '../../test-output');
  const testOutputPath = path.join(testOutputDir, 'test_calendar.ics');

  afterAll(async () => {
    if (fs.existsSync(testOutputDir)) {
      await fs.promises.rm(testOutputDir, { recursive: true, force: true });
    }
  });

  it('should generate an .ics file with valid calendar components', async () => {
    const coordinates = new Coordinates(31.1981, 29.9192); // Alexandria
    const calculationMethod = CalculationMethod.Egyptian();
    const startDate = '2024-11-14';
    const endDate = '2024-11-15'; // 2 days

    const resultPath = await generatePrayerCalendar({
      coordinates,
      calculationMethod,
      startDate,
      endDate,
      outputPath: testOutputPath,
    });

    expect(resultPath).toBe(testOutputPath);
    expect(fs.existsSync(testOutputPath)).toBe(true);

    const content = await fs.promises.readFile(testOutputPath, 'utf-8');
    expect(content).toContain('BEGIN:VCALENDAR');
    expect(content).toContain('VERSION:2.0');
    expect(content).toContain('PRODID:adhan-prayer-calendar');
    expect(content).toContain('BEGIN:VEVENT');
    expect(content).toContain('END:VCALENDAR');

    // 2 days * 6 prayers = 12 events
    const eventCount = (content.match(/BEGIN:VEVENT/g) || []).length;
    expect(eventCount).toBe(12);
  });
});
