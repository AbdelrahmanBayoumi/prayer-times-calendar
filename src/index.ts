import { CalculationMethod, Coordinates } from 'adhan';
import { generatePrayerCalendar } from './utils/calendar-utils';

// Example dynamic inputs (these can be taken from user input or environment variables)
const coordinates = new Coordinates(31.1981, 29.9192); // Alexandria, Egypt
const calculationMethod = CalculationMethod.Egyptian();
const startDate = process.env.START_DATE || '2024-11-14';
const endDate = process.env.END_DATE || '2024-12-14';
const outputPath =
  process.env.OUTPUT_PATH || 'output/generated_prayer_times.ics';

// Generate the prayer calendar with the specified options
generatePrayerCalendar({
  coordinates,
  calculationMethod,
  startDate,
  endDate,
  outputPath,
});
