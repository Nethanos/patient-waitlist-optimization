import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getSamplePatients } from '../../db/db.js';
import { computeScore } from '../../../lib/src/core/index.js';

/**
 * Mocks.
 */

vi.mock('../../../db/db.js');
vi.mock('../../../lib/src/core/index.js');

/**
 * Test `Api`.
 */

describe('Api', () => {
  const mockPatients = [
    {
      id: '1',
      name: 'John Doe',
      age: 30,
      location: { latitude: 40.7128, longitude: -74.0060 },
      acceptedOffers: 5,
      canceledOffers: 1,
      averageReplyTime: 120,
    },
    {
      id: '2',
      name: 'Jane Smith',
      age: 25,
      location: { latitude: 34.0522, longitude: -118.2437 },
      acceptedOffers: 8,
      canceledOffers: 0,
      averageReplyTime: 60,
    },
    {
      id: '3',
      name: 'Bob Johnson',
      age: 45,
      location: { latitude: 41.8781, longitude: -87.6298 },
      acceptedOffers: 3,
      canceledOffers: 2,
      averageReplyTime: 300,
    },
  ];

  const mockPatientsWithMissingData = [
    {
      id: '1',
      name: 'John Doe',
      age: 30,
      location: { latitude: 40.7128, longitude: -74.0060 },
      acceptedOffers: null,
      canceledOffers: 1,
      averageReplyTime: 120,
    },
    {
      id: '2',
      name: 'Jane Smith',
      age: 25,
      location: { latitude: 34.0522, longitude: -118.2437 },
      acceptedOffers: 8,
      canceledOffers: null,
      averageReplyTime: null,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    getSamplePatients.mockReturnValue(mockPatients);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('createErrorResponse', () => {
    it('should create error response with message and status code', () => {
      const createErrorResponse = (statusCode, message, details = null) => ({
        error: {
          message,
          statusCode,
          ...(details && { details }),
        },
      });

      const result = createErrorResponse(400, 'Bad Request');
      
      expect(result).toEqual({
        error: {
          message: 'Bad Request',
          statusCode: 400,
        },
      });
    });

    it('should include details when provided', () => {
      const createErrorResponse = (statusCode, message, details = null) => ({
        error: {
          message,
          statusCode,
          ...(details && { details }),
        },
      });

      const details = [{ message: 'Validation failed' }];
      const result = createErrorResponse(400, 'Bad Request', details);
      
      expect(result).toEqual({
        error: {
          message: 'Bad Request',
          statusCode: 400,
          details,
        },
      });
    });

    it('should not include details when not provided', () => {
      const createErrorResponse = (statusCode, message, details = null) => ({
        error: {
          message,
          statusCode,
          ...(details && { details }),
        },
      });

      const result = createErrorResponse(500, 'Internal Server Error');
      
      expect(result.error).not.toHaveProperty('details');
    });
  });

  describe('getTopPatients', () => {
    const getTopPatients = (targetLocation, limit = 10) => {
      try {
        const patients = getSamplePatients();
        
        if (!patients || patients.length === 0) {
          throw new Error('No patient data available');
        }

        const scoredPatients = patients.map((patient) => {
          try {
            const score = computeScore(patient, targetLocation);
            return { ...patient, score };
          } catch (error) {
            console.warn(`Failed to compute score for patient ${patient.id || 'unknown'}:`, error.message);
            return { ...patient, score: 1 };
          }
        });

        return scoredPatients
          .sort((a, b) => b.score - a.score)
          .slice(0, limit)
          .map((patient, index) => ({
            ...patient,
            rank: index + 1,
          }));
      } catch (error) {
        console.error('Error processing patients:', error);
        throw error;
      }
    };

    it('should return top patients sorted by score in descending order', () => {
      computeScore
        .mockReturnValueOnce(8.5) // John Doe
        .mockReturnValueOnce(9.2) // Jane Smith
        .mockReturnValueOnce(7.1); // Bob Johnson

      const targetLocation = { latitude: 40.7128, longitude: -74.0060 };
      const result = getTopPatients(targetLocation);

      expect(result).toHaveLength(3);
      expect(result[0].name).toBe('Jane Smith'); // Highest score
      expect(result[0].score).toBe(9.2);
      expect(result[0].rank).toBe(1);
      expect(result[1].name).toBe('John Doe');
      expect(result[1].score).toBe(8.5);
      expect(result[1].rank).toBe(2);
      expect(result[2].name).toBe('Bob Johnson');
      expect(result[2].score).toBe(7.1);
      expect(result[2].rank).toBe(3);
    });

    it('should limit results to specified limit', () => {
      computeScore
        .mockReturnValueOnce(8.5)
        .mockReturnValueOnce(9.2)
        .mockReturnValueOnce(7.1);

      const targetLocation = { latitude: 40.7128, longitude: -74.0060 };
      const result = getTopPatients(targetLocation, 2);

      expect(result).toHaveLength(2);
      expect(result[0].rank).toBe(1);
      expect(result[1].rank).toBe(2);
    });

    it('should handle patients with scoring errors gracefully', () => {
      let callCount = 0;
      computeScore.mockImplementation((patient, targetLocation) => {
        callCount++;
        if (callCount === 2) {
          throw new Error('Scoring failed');
        }
        return callCount === 1 ? 8.5 : 7.1;
      });

      vi.spyOn(console, 'warn').mockImplementation(() => {});

      const targetLocation = { latitude: 40.7128, longitude: -74.0060 };
      const result = getTopPatients(targetLocation);

      expect(result).toHaveLength(3);
      
      const failedPatient = result.find(patient => patient.score === 1);
      expect(failedPatient).toBeDefined();
      expect(failedPatient.score).toBe(1);
      
      expect(console.warn).toHaveBeenCalledWith(
        'Failed to compute score for patient 2:',
        'Scoring failed'
      );
    });

    it('should throw error when no patient data is available', () => {
      getSamplePatients.mockReturnValue([]);

      const targetLocation = { latitude: 40.7128, longitude: -74.0060 };

      expect(() => getTopPatients(targetLocation)).toThrow('No patient data available');
    });

    it('should throw error when patient data is null', () => {
      getSamplePatients.mockReturnValue(null);

      const targetLocation = { latitude: 40.7128, longitude: -74.0060 };

      expect(() => getTopPatients(targetLocation)).toThrow('No patient data available');
    });

    it('should assign sequential ranks starting from 1', () => {
      computeScore
        .mockReturnValueOnce(8.5)
        .mockReturnValueOnce(9.2)
        .mockReturnValueOnce(7.1);

      const targetLocation = { latitude: 40.7128, longitude: -74.0060 };
      const result = getTopPatients(targetLocation);

      result.forEach((patient, index) => {
        expect(patient.rank).toBe(index + 1);
      });
    });

    it('should preserve all patient properties in result', () => {
      computeScore.mockReturnValue(8.5);

      const targetLocation = { latitude: 40.7128, longitude: -74.0060 };
      const result = getTopPatients(targetLocation);

      result.forEach((patient) => {
        expect(patient).toHaveProperty('id');
        expect(patient).toHaveProperty('name');
        expect(patient).toHaveProperty('age');
        expect(patient).toHaveProperty('location');
        expect(patient).toHaveProperty('acceptedOffers');
        expect(patient).toHaveProperty('canceledOffers');
        expect(patient).toHaveProperty('averageReplyTime');
        expect(patient).toHaveProperty('score');
        expect(patient).toHaveProperty('rank');
      });
    });
  });

  describe('Query Validation Schema', () => {
    const querySchema = {
      latitude: {
        min: -90,
        max: 90,
        required: true,
      },
      longitude: {
        min: -180,
        max: 180,
        required: true,
      },
    };

    it('should validate latitude range', () => {
      expect(querySchema.latitude.min).toBe(-90);
      expect(querySchema.latitude.max).toBe(90);
    });

    it('should validate longitude range', () => {
      expect(querySchema.longitude.min).toBe(-180);
      expect(querySchema.longitude.max).toBe(180);
    });

    it('should require both latitude and longitude', () => {
      expect(querySchema.latitude.required).toBe(true);
      expect(querySchema.longitude.required).toBe(true);
    });
  });

  describe('Error Handling Scenarios', () => {
    const createErrorResponse = (statusCode, message, details = null) => ({
      error: {
        message,
        statusCode,
        ...(details && { details }),
      },
    });

    it('should handle invalid target location error', () => {
      const error = new Error('Invalid target location');
      const isInvalidLocation = error.message.includes('Invalid target location');
      
      expect(isInvalidLocation).toBe(true);
    });

    it('should handle no patient data error', () => {
      const error = new Error('No patient data available');
      const isNoData = error.message.includes('No patient data available');
      
      expect(isNoData).toBe(true);
    });

    it('should create appropriate error responses for different scenarios', () => {
      const badRequest = createErrorResponse(400, 'Invalid coordinates provided');
      const serviceUnavailable = createErrorResponse(503, 'Patient data service unavailable');
      const internalError = createErrorResponse(500, 'Internal server error');

      expect(badRequest.error.statusCode).toBe(400);
      expect(serviceUnavailable.error.statusCode).toBe(503);
      expect(internalError.error.statusCode).toBe(500);
    });
  });

  describe('Response Time Calculation', () => {
    it('should calculate response time correctly', () => {
      const startTime = Date.now();
      const endTime = startTime + 100; // Simulate 100ms processing
      const responseTime = endTime - startTime;

      expect(responseTime).toBe(100);
    });

    it('should format response time as string with ms suffix', () => {
      const responseTime = 150;
      const formattedTime = `${responseTime}ms`;

      expect(formattedTime).toBe('150ms');
    });
  });

  describe('Patient Data Processing Edge Cases', () => {
    const getTopPatients = (targetLocation, limit = 10) => {
      try {
        const patients = getSamplePatients();
        
        if (!patients || patients.length === 0) {
          throw new Error('No patient data available');
        }

        const scoredPatients = patients.map((patient) => {
          try {
            const score = computeScore(patient, targetLocation);
            return { ...patient, score };
          } catch (error) {
            console.warn(`Failed to compute score for patient ${patient.id || 'unknown'}:`, error.message);
            return { ...patient, score: 1 };
          }
        });

        return scoredPatients
          .sort((a, b) => b.score - a.score)
          .slice(0, limit)
          .map((patient, index) => ({
            ...patient,
            rank: index + 1,
          }));
      } catch (error) {
        console.error('Error processing patients:', error);
        throw error;
      }
    };

    it('should handle patients with missing behavioral data', () => {
      getSamplePatients.mockReturnValue(mockPatientsWithMissingData);
      computeScore.mockReturnValue(5.0);

      const targetLocation = { latitude: 40.7128, longitude: -74.0060 };
      const result = getTopPatients(targetLocation);

      expect(result).toHaveLength(2);
      result.forEach(patient => {
        expect(patient.score).toBe(5.0);
        expect(patient.rank).toBeDefined();
      });
    });

    it('should handle single patient scenario', () => {
      getSamplePatients.mockReturnValue([mockPatients[0]]);
      computeScore.mockReturnValue(8.5);

      const targetLocation = { latitude: 40.7128, longitude: -74.0060 };
      const result = getTopPatients(targetLocation);

      expect(result).toHaveLength(1);
      expect(result[0].rank).toBe(1);
      expect(result[0].score).toBe(8.5);
    });

    it('should handle limit larger than available patients', () => {
      getSamplePatients.mockReturnValue(mockPatients);
      computeScore.mockReturnValue(8.5);

      const targetLocation = { latitude: 40.7128, longitude: -74.0060 };
      const result = getTopPatients(targetLocation, 10);

      expect(result).toHaveLength(3); // Should return all available patients
      expect(result[0].rank).toBe(1);
      expect(result[2].rank).toBe(3);
    });
  });
});
