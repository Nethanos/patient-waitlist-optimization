'use strict';

import { computeScore, addRandomness, normalize } from '../../src/core/index';

/**
 * Test `computeScore`.
 */

describe('computeScore', () => {
  const targetLocation = { latitude: 37.7749, longitude: -122.4194 };

  const mockPatients = [
    {
      id: '541d25c9-9500-4265-8967-240f44ecf723',
      name: 'Samir Pacocha',
      location: {
        latitude: 46.711,
        longitude: -63.115,
      },
      age: 46,
    },
    {
      id: '41fd45bc-b166-444a-a69e-9d527b4aee48',
      name: 'Bernard Mosciski',
      location: {
        latitude: -81.0341,
        longitude: 144.9963,
      },
      age: 21,
      acceptedOffers: 95,
      canceledOffers: 96,
      averageReplyTime: 1908,
    },
    {
      id: '90592106-a0d9-4329-8159-af7ce4ba45ad',
      name: 'Theo Effertz',
      location: {
        latitude: -35.5336,
        longitude: -25.2795,
      },
      age: 67,
      acceptedOffers: 69,
      canceledOffers: 24,
      averageReplyTime: 3452,
    },
    {
      id: 'b483afb8-2ed7-4fd2-9cd6-c1fd7071f19f',
      name: 'Mathew Halvorson',
      location: {
        latitude: -75.6334,
        longitude: -165.891,
      },
      age: 26,
      acceptedOffers: 80,
      canceledOffers: 22,
      averageReplyTime: 2315,
    },
  ];

  it('should throw error if `targetLocation` is invalid', () => {
    expect(() => computeScore({}, {})).toThrow(Error('Invalid target location'));
    expect(() => computeScore({}, { latitude: 0 })).toThrow(Error('Invalid target location'));
    expect(() => computeScore({}, { longitude: 0 })).toThrow(Error('Invalid target location'));
    expect(() => computeScore({}, null)).toThrow(Error('Invalid target location'));
  });

  it('should calculate for valid patients', () => {
    mockPatients.forEach((patient) => {
      const score = computeScore(patient, targetLocation);
      expect(score).toBeGreaterThanOrEqual(1);
      expect(score).toBeLessThanOrEqual(10);
    });
  });

  it('should handle missing patient fields gracefully', () => {
    const patient = { location: { latitude: 40, longitude: -75 } };
    const score = computeScore(patient, targetLocation);
    expect(score).toBeGreaterThanOrEqual(1);
    expect(score).toBeLessThanOrEqual(10);
  });

  it('should return a number between 1 and 10 for edge values', () => {
    const patient = {
      age: 0,
      location: { latitude: 37.7749, longitude: -122.4194 },
    };
    const score = computeScore(patient, targetLocation);
    expect(score).toBeGreaterThanOrEqual(1);
    expect(score).toBeLessThanOrEqual(10);
  });

  it('should vary score with distance when other fields are constant', () => {
    const closeLocation = { latitude: -84.877, longitude: 81.9583 };

    const patient = {
      id: 'test-patient',
      name: 'Distance Test',
      location: closeLocation,
      age: 45,
      acceptedOffers: 50,
      canceledOffers: 50,
      averageReplyTime: 1800,
    };
    const farLocation = { latitude: 84.8355, longitude: -98.4035 };
    const scoreClose = computeScore(patient, closeLocation);
    const scoreFar = computeScore(patient, farLocation);
    expect(scoreClose).not.toBe(scoreFar);
    expect(scoreClose).toBeGreaterThan(scoreFar);
  });

  it('should allow a patient without behavioral data to get a high score due to randomness', () => {
    const patient = {
      id: 'no-behavioral',
      name: 'No Behavioral',
      location: { latitude: 0, longitude: 0 },
      age: 45,
      // No acceptedOffers, canceledOffers, or averageReplyTime
    };
    const targetLocation = { latitude: 0, longitude: 0 };
    // Run multiple times to check if randomness can boost the score
    let gotHighScore = false;
    for (let i = 0; i < 50; i++) {
      const score = computeScore(patient, targetLocation);
      if (score > 8) {
        console.log('score', score);
        gotHighScore = true;
        break;
      }
    }
    expect(gotHighScore).toBe(true);
  });
});

describe('addRandomness', () => {
  it('should add noise if patient has no behavioral data', () => {
    const patient = { acceptedOffers: null, replyTime: null };
    const baseScore = 0.5;
    // Run multiple times to check randomness is applied
    const results = Array.from({ length: 10 }, () => addRandomness(baseScore, patient));
    results.forEach((result) => {
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(1);
      // At least one result should be different from baseScore
    });
    expect(results.some((r) => r !== baseScore)).toBe(true);
  });

  it('should not add noise if patient has behavioral data', () => {
    const patient = { acceptedOffers: 5, canceledOffers: 2, averageReplyTime: 1000 };
    const baseScore = 0.7;
    expect(addRandomness(baseScore, patient)).toBe(baseScore);
  });

  it('should clamp result between 0 and 1', () => {
    const patient = { acceptedOffers: null, replyTime: null };
    const baseScore = 0.9;
    const result = addRandomness(baseScore, patient);
    expect(result).toBeLessThanOrEqual(1);
    expect(result).toBeGreaterThanOrEqual(0);
  });
});

describe('normalize', () => {
  it('should normalize value within range', () => {
    expect(normalize(5, 0, 10)).toBeCloseTo(0.5);
    expect(normalize(0, 0, 10)).toBeCloseTo(0);
    expect(normalize(10, 0, 10)).toBeCloseTo(1);
  });

  it('should clamp below min to 0', () => {
    expect(normalize(-5, 0, 10)).toBeCloseTo(0);
  });

  it('should clamp above max to 1', () => {
    expect(normalize(15, 0, 10)).toBeCloseTo(1);
  });

  it('should return 0.5 if value is null or undefined', () => {
    expect(normalize(null, 0, 10)).toBe(0.5);
    expect(normalize(undefined, 0, 10)).toBe(0.5);
  });
});
