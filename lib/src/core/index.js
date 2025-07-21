'use strict';

import { getDistance } from 'geolib';

/**
 * Constants.
 */

const WEIGHTS = {
  age: 0.02,
  distance: 0.02,
  acceptedOffers: 0.24,
  cancelledOffers: 0.24,
  replyTime: 0.16,
};

export function addRandomness(score, patient) {
  const hasBehavioralData = patient.acceptedOffers != null && patient.replyTime != null;
  if (!hasBehavioralData) {
    const noise = Math.random() * 0.5; // 0 to 1

    const result = Math.max(0, Math.min(1, score + noise));

    return result;
  }
  return score;
}

export function normalize(value, min, max) {
  if (value == null) return 0.5;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}
/**
 * Compute a score (1–10) indicating a patient's likelihood of accepting a waitlist offer
 * @param {Object} patient - Patient object from dataset
 * @param {Object} targetLocation - { latitude, longitude }
 * @returns {number} - Score between 1 and 10
 */

export function computeScore(patient, targetLocation) {
  // Validate inputs.
  if (!targetLocation || !targetLocation.latitude || !targetLocation.longitude) {
    throw new Error('Invalid target location');
  }

  const ageNorm = normalize(patient.age, 0, 100);
  const distance = getDistance(patient.location, targetLocation);
  const distanceNorm = normalize(distance, 0, 50);

  // Check if patient has behavioral data.
  const acceptedNorm = patient.acceptedOffers ? normalize(patient.acceptedOffers, 0, 10) : null;

  const cancelledNorm = patient.cancelledOffers
    ? 1 - normalize(patient.cancelledOffers, 0, 10)
    : null;

  const replyTimeNorm = patient.replyTime ? 1 - normalize(patient.replyTime, 0, 3600) : null;

  let score =
    ageNorm * WEIGHTS.age +
    distanceNorm * WEIGHTS.distance +
    (acceptedNorm ?? 0.2) * WEIGHTS.acceptedOffers +
    (cancelledNorm ?? 0.2) * WEIGHTS.cancelledOffers +
    (replyTimeNorm ?? 0.2) * WEIGHTS.replyTime;

  score = addRandomness(score, patient);

  return Math.max(1, Math.min(10, Number((score * 9 + 1).toFixed(2))));
}
