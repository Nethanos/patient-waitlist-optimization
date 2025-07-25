# patient-waitlist-optimizer

## Overview

This library provides a scoring algorithm to sort a patient waitlist. It calculates a score for each patient based on age, distance, and behavioral data.

## Installation

```bash
yarn add patient-waitlist-optimizer
```

## Usage

Import the main function from the package root:

```js
import { computeScore } from 'patient-waitlist-optimizer';

const patient = {
  age: 45,
  location: { latitude: 40.7128, longitude: -74.0060 },
  acceptedOffers: 10,
  canceledOffers: 2,
  averageReplyTime: 1200
};
const targetLocation = { latitude: 37.7749, longitude: -122.4194 };

const score = computeScore(patient, targetLocation);
// score is a number between 1 and 10
```

## API

### computeScore(patient, targetLocation)
- `patient`: Object with fields:
  - `age`: number
  - `location`: { latitude: number, longitude: number }
  - `acceptedOffers`: number (optional)
  - `canceledOffers`: number (optional)
  - `averageReplyTime`: number (optional, seconds)
- `targetLocation`: { latitude: number, longitude: number }
- Returns: number (1–10)

## Build

To build the library (bundles to `dist/`):

```bash
yarn build
```

- Uses [esbuild](https://esbuild.github.io/) for bundling.

## Testing

Run tests with:

```bash
yarn test
```

## Linting

Run linting with:

```bash
yarn lint
```

## Coverage

Run coverage with:

```bash
yarn coverage
```

## Configuration

- ESLint and Prettier are used for code style.
- Tests use Vitest.
