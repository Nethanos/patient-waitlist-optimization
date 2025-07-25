/**
 * Type definitions for patient-waitlist-optimizer
 */

export interface Patient {
  id: string;
  name: string;
  age: number;
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

export function computeScore(patient: Patient, targetLocation: Location): number;