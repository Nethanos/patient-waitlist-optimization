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

const AGE_MAX = 100;
const DISTANCE_MAX_METERS = 4500000;
const ACCEPTED_OFFERS_MAX = 100;
const CANCELED_OFFERS_MAX = 100;
const REPLY_TIME_MAX = 3600;

/**
 * Add randomness to the score.
 * @param {number} score - The score to add randomness to.
 * @param {Object} patient - The patient object.
 * @returns {number} - The score with randomness added.
 */

export function addRandomness(score, patient) {
  // Count missing behavioral fields
  let missing = 0;
  if (patient.acceptedOffers == null) missing++;
  if (patient.canceledOffers == null) missing++;
  if (patient.averageReplyTime == null) missing++;

  if (missing > 0) {
    // Add noise up to 0.5 * missing / 3 (max 0.5 if all missing, less if only some missing)
    const noise = Math.random() * ((0.5 * missing) / 3);
    const result = Math.max(0, Math.min(1, score + noise));
    return result;
  }
  return score;
}

/**
 * Normalize a value between 0 and 1.
 * @param {number} value - The value to normalize.
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} - The normalized value.
 */

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

  const ageNorm = normalize(patient.age, 0, AGE_MAX);
  const patientLocation = {
    latitude: Number(patient.location.latitude),
    longitude: Number(patient.location.longitude),
  };
  const targetLoc = {
    latitude: Number(targetLocation.latitude),
    longitude: Number(targetLocation.longitude),
  };
  const distance = getDistance(patientLocation, targetLoc);
  const distanceNorm = 1 - normalize(distance, 0, DISTANCE_MAX_METERS);

  // Using the non-strict equality operator to check undefined and null values.
  const acceptedNorm =
    patient.acceptedOffers != null
      ? normalize(patient.acceptedOffers, 0, ACCEPTED_OFFERS_MAX)
      : null;

  const canceledNorm =
    patient.canceledOffers != null
      ? 1 - normalize(patient.canceledOffers, 0, CANCELED_OFFERS_MAX)
      : null;

  const replyTimeNorm =
    patient.averageReplyTime != null
      ? 1 - normalize(patient.averageReplyTime, 0, REPLY_TIME_MAX)
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
