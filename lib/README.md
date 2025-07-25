# patient-waitlist-optimizer

## Overview

This library provides a scoring algorithm to sort a patient waitlist. It calculates a score for each patient based on age, distance, and behavioral data.

## Installation

```
yarn
```

## Usage

Import the main function and use it to compute a score for a patient:

```js
import computeScore from './src';

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

### addRandomness(score, patient)
- Adds noise to the score if behavioral data is missing.
- Returns: number (0–1)

### normalize(value, min, max)
- Normalizes a value between 0 and 1.
- Returns: number (0–1)

## Testing

Run tests with:

```
yarn test
```

## Linting

Run linting with:

```
yarn lint
```

## Coverage

Run coverage with:

```
yarn coverage
```

Coverage for core logic is 100%.

## Configuration

- ESLint and Prettier are used for code style.
- Tests use Vitest.
