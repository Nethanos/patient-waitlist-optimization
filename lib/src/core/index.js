'use strict';

import { getDistance } from 'geolib';

/**
 * Constants.
 */

const WEIGHTS = {
  age: 0.1,
  distance: 0.1,
  acceptedOffers: 0.3,
  canceledOffers: 0.3,
  averageReplyTime: 0.2,
};

export function addRandomness(score, patient) {
  // Count missing behavioral fields
  let missing = 0;
  if (!patient.acceptedOffers) missing++;
  if (!patient.canceledOffers) missing++;
  if (!patient.averageReplyTime) missing++;

  if (missing > 0) {
    // Add noise up to 0.5 * missing / 3 (max 0.5 if all missing, less if only some missing)
    const noise = Math.random() * ((0.5 * missing) / 3);
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
  if (!targetLocation || targetLocation.latitude == null || targetLocation.longitude == null) {
    throw new Error('Invalid target location');
  }

  const ageNorm = normalize(patient.age, 0, 100);
  const patientLocation = {
    latitude: Number(patient.location.latitude),
    longitude: Number(patient.location.longitude),
  };
  const targetLoc = {
    latitude: Number(targetLocation.latitude),
    longitude: Number(targetLocation.longitude),
  };
  const distance = getDistance(patientLocation, targetLoc);
  const distanceNorm = 1 - normalize(distance, 0, 4500000);

  const acceptedNorm = patient.acceptedOffers ? normalize(patient.acceptedOffers, 0, 100) : null;

  const canceledNorm = patient.canceledOffers
    ? 1 - normalize(patient.canceledOffers, 0, 100)
    : null;

  const replyTimeNorm = patient.averageReplyTime
    ? 1 - normalize(patient.averageReplyTime, 0, 3600)
    : null;

  let score =
    ageNorm * WEIGHTS.age +
    distanceNorm * WEIGHTS.distance +
    (acceptedNorm ?? 0.2) * WEIGHTS.acceptedOffers +
    (canceledNorm ?? 0.2) * WEIGHTS.canceledOffers +
    (replyTimeNorm ?? 0.2) * WEIGHTS.averageReplyTime;

  score = addRandomness(score, patient);

  return Math.max(1, Math.min(10, Number((score * 9 + 1).toFixed(2))));
}
