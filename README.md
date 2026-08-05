# Course Goals

[![Quality](https://github.com/fatmakahveci/react-typescript-course-goals/actions/workflows/quality.yml/badge.svg)](https://github.com/fatmakahveci/react-typescript-course-goals/actions/workflows/quality.yml)
[![npm version](https://img.shields.io/npm/v/react-typescript-course-goals.svg)](https://www.npmjs.com/package/react-typescript-course-goals)
[![GitHub release](https://img.shields.io/github/v/release/fatmakahveci/react-typescript-course-goals)](https://github.com/fatmakahveci/react-typescript-course-goals/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-4f46e5.svg)](LICENSE.md)

A simple course goal tracker built with Next.js, React, and TypeScript.

Current version: **v1.1.1**

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
- Low, medium, and high priority levels
- Due dates and overdue indicators
- Sort by date, priority, or due date
- JSON backup and restore
- Persistent browser storage
- Keyboard and screen reader friendly interface
- Responsive design for mobile screens
- Custom color system and favicon

> Goals are stored in the browser's local storage and remain available after the page is refreshed.

## Tech Stack

- Next.js 16
- React 19
- TypeScript 6
- CSS Modules
- ESLint 9

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
│   │   └── UI/
│   ├── globals.css
│   ├── icon.svg
│   ├── layout.tsx
│   └── page.tsx
└── shared/
    └── types/
```

## Quality Checks

Before submitting changes, make sure the following commands complete successfully:

```bash
npm run lint
npm run build
```

## License

This project is available under the [MIT License](LICENSE.md).
