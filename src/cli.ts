import { CalculationMethod, Coordinates } from 'adhan';
import { generatePrayerCalendar } from './utils/calendar-utils';

async function main(): Promise<void> {
  const coordinates = new Coordinates(31.1981, 29.9192); // Alexandria, Egypt
  const calculationMethod = CalculationMethod.Egyptian();
  const startDate = process.env.START_DATE || '2026-10-07';
  const endDate = process.env.END_DATE || '2026-10-07';
  const outputPath =
    process.env.OUTPUT_PATH || 'output/generated_prayer_times.ics';
  const alarmOffsetMinutes = process.env.ALARM_OFFSET_MINUTES
    ? parseInt(process.env.ALARM_OFFSET_MINUTES, 10)
    : 10;

  try {
    await generatePrayerCalendar({
      coordinates,
      calculationMethod,
      startDate,
      endDate,
      outputPath,
      alarmOffsetMinutes,
    });
  } catch (error) {
    console.error('Failed to generate prayer calendar:', error);
    process.exit(1);
  }
}

main();
