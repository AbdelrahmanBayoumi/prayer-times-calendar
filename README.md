# Prayer Times Calendar

A TypeScript-based tool to generate Islamic prayer times as an `.ics` calendar file. This tool uses the Adhan library to calculate prayer times based on location and generates events in `.ics` format that can be imported into popular calendar applications.

## Features

- Calculates prayer times based on location coordinates.
- Generates an `.ics` file with events for Fajr, Dhuhr, Asr, Maghrib, Isha, and sunrise.
- Adds custom reminders and hadiths to each prayer event.

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/prayer-times-calendar.git
cd prayer-times-calendar
npm install
```

## Usage

To generate the `.ics` file, build the TypeScript project and run the main script:

```bash
npm run build
npm start
```

## Development

For development, you can use:

- **`npm run dev`**: Start the project with live reload using `ts-node-dev`.
- **`npm run lint`**: Lint the code using ESLint.
- **`npm run format`**: Format the code using Prettier.
- **`npm test`**: Run tests using Jest.

## Contributing

Contributions are welcome! Please check out the [issues](https://github.com/your-username/prayer-times-calendar/issues) for things to work on.

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for more details.
