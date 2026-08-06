# Course Goals

[![Quality](https://github.com/fatmakahveci/react-typescript-course-goals/actions/workflows/quality.yml/badge.svg)](https://github.com/fatmakahveci/react-typescript-course-goals/actions/workflows/quality.yml)
[![npm version](https://img.shields.io/npm/v/react-typescript-course-goals.svg)](https://www.npmjs.com/package/react-typescript-course-goals)
[![GitHub release](https://img.shields.io/github/v/release/fatmakahveci/react-typescript-course-goals)](https://github.com/fatmakahveci/react-typescript-course-goals/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-4f46e5.svg)](LICENSE.md)

A simple course goal tracker built with Next.js, React, and TypeScript.

Current version: **v1.4.0**

## Features

- Add new course goals
- Mark goals as completed
- Filter all, active, and completed goals
- Search through goals
- Completion count and progress bar
- Clear all completed goals
- Delete individual goals
- Empty and duplicate entry validation
- Character limit with a live character counter
- Goal creation dates
- Edit existing goals
- Organize goals with custom categories
- Break goals into trackable subtasks
- Low, medium, and high priority levels
- Due dates and overdue indicators
- Sort by date, priority, or due date
- Reorder goals with drag-and-drop or accessible move controls
- View completion, weekly, overdue, priority, category, and subtask statistics
- JSON backup and restore
- Persistent browser storage
- Keyboard and screen reader friendly interface
- Responsive design for mobile screens
- Light, dark, and system theme modes
- Installable Progressive Web App with offline support
- Custom color system and favicon

> Goals are stored in the browser's local storage and remain available after the page is refreshed.

The install prompt and service worker are enabled in production builds. After the first online visit, the application shell remains available offline; goal data continues to use local browser storage.

## Tech Stack

- Next.js 16
- React 19
- TypeScript 6
- CSS Modules
- ESLint 9
- Vitest 4
- Playwright

## Requirements

- Node.js 20.9 or later
- npm

## Installation

After cloning the repository, install the dependencies from the project directory:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application is available at [http://localhost:3000](http://localhost:3000) by default.

## Scripts

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run start    # Start the production server
npm run lint     # Run ESLint checks
npm test         # Run the automated test suite
npm run test:watch # Run tests in watch mode
npm run test:coverage # Run tests with coverage thresholds
npm run test:e2e  # Run Playwright end-to-end tests
```

To run the production version locally:

```bash
npm run build
npm run start
```

## Project Structure

```text
src/
├── app/
│   ├── components/
│   │   ├── CourseGoals/
│   │   │   ├── CourseGoalItem/
│   │   │   ├── CourseGoalList/
│   │   │   └── CourseInput/
│   │   ├── GoalStatistics/
│   │   ├── PwaControls/
│   │   └── UI/
│   ├── globals.css
│   ├── icon.svg
│   ├── layout.tsx
│   ├── manifest.ts
│   └── page.tsx
└── shared/
    └── types/
public/
├── icons/
└── sw.js
```

## Quality Checks

Before submitting changes, make sure the following commands complete successfully:

```bash
npm run lint
npx tsc --noEmit
npm run test:coverage
npm run test:e2e
npm run build
```

Every push and pull request to `main` runs these checks automatically in GitHub Actions. Dependabot monitors npm dependencies weekly and GitHub Actions monthly.

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md), follow the [Code of Conduct](CODE_OF_CONDUCT.md), and report vulnerabilities through the process in [SECURITY.md](SECURITY.md).

## License

This project is available under the [MIT License](LICENSE.md).
