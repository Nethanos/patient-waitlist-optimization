/**
 * Type definitions for patient-waitlist-optimizer
 */

export interface Patient {
  age?: number;
  location: {
    latitude: number;
    longitude: number;
  };
  acceptedOffers?: number;
  canceledOffers?: number;
  averageReplyTime?: number;
}

export interface Location {
  latitude: number;
  longitude: number;
}

/**
 * Computes a score (1–10) indicating a patient's likelihood of accepting a waitlist offer.
 * @param patient Patient object
 * @param targetLocation Target location
 * @returns Score between 1 and 10
 */
declare function computeScore(patient: Patient, targetLocation: Location): number;

/**
 * Adds randomness to the score if behavioral data is missing.
 * @param score Base score
 * @param patient Patient object
 * @returns Score with randomness (0–1)
 */
export function addRandomness(score: number, patient: Patient): number;

/**
 * Normalizes a value between 0 and 1.
 * @param value Value to normalize
 * @param min Minimum value
 * @param max Maximum value
 * @returns Normalized value (0–1)
 */
export function normalize(value: number | null | undefined, min: number, max: number): number;

export default computeScore; 