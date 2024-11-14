# Prayer Times Calendar Generator

A Node.js and TypeScript-based tool that dynamically generates prayer times in the `.ics` calendar format for a specified date range, location, and calculation method. This can be used to import prayer times into various calendar applications.

## Features

- **Dynamic Date Range**: Configure the start and end dates for the calendar generation.
- **Location-Based Calculation**: Input coordinates to get accurate prayer times for specific locations.
- **Custom Calculation Method**: Choose between different Islamic calculation methods for prayer times.
- **ICS File Output**: Generates a `.ics` file that can be imported into calendar applications.
- **Customizable Output Directory**: Specify the file path for the generated calendar file.

## Getting Started

### Prerequisites

- Node.js (v20 or above recommended)
- NPM

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AbdelrahmanBayoumi/prayer-times-calendar.git
   cd prayer-times-calendar
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Build and Run

1. Compile the TypeScript code:

   ```bash
   npm run build
   ```

2. Run the program:
   ```bash
   npm run start
   ```

### Environment Configuration

The project allows configuration through environment variables. You can set these variables in a `.env` file or directly in the terminal.

- **START_DATE**: Start date for the calendar generation (e.g., `2024-11-14`).
- **END_DATE**: End date for the calendar generation (e.g., `2024-12-14`).
- **OUTPUT_PATH**: Output path for the generated `.ics` file (default: `output/generated_prayer_times.ics`).

#### Example `.env` file

```plaintext
START_DATE=2024-11-14
END_DATE=2024-12-14
OUTPUT_PATH=output/generated_prayer_times.ics
```

### Usage

This tool will generate a prayer times calendar `.ics` file for the specified date range and location.

## Usage Example

If you'd like to customize the parameters, you can specify them through the environment or directly within the code.

```typescript
import { CalculationMethod, Coordinates } from 'adhan';
import { generatePrayerCalendar } from './utils/calendar-utils';

const coordinates = new Coordinates(31.1981, 29.9192); // Alexandria, Egypt
const calculationMethod = CalculationMethod.Egyptian();
const startDate = '2024-11-14';
const endDate = '2024-12-14';
const outputPath = 'output/generated_prayer_times.ics';

generatePrayerCalendar({
  coordinates,
  calculationMethod,
  startDate,
  endDate,
  outputPath,
});
```

## Tests

Run tests with:

```bash
npm test
```

## Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

### Commit Message Guidelines

- Use `feat:` for new features.
- Use `fix:` for bug fixes.
- Use `docs:` for documentation updates.

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- [adhan.js](https://github.com/batoulapps/adhan-js) for the prayer time calculation library.
- [ical.js](https://github.com/mozilla-comm/ical.js) for the iCalendar generation library.
