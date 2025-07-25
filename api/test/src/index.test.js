import request from 'supertest';
import { api } from '../../src/index.js';

// Mock the computeScore function to be deterministic
vi.mock('patient-waitlist-optimizer', () => ({
  default: (patient, targetLocation) => {
    // Simple deterministic score for testing
    const lat = Number(patient.location.latitude);
    const lon = Number(patient.location.longitude);
    const age = patient.age || 0;
    return Math.abs(lat + lon + age);
  }
}));

describe('API /patients endpoint', () => {
  beforeAll(async () => {
    await api.initialize();
    console.log('Server initialized for testing');
  });

  afterAll(async () => {
    await api.stop();
  });

  it('returns top 10 patients with valid coordinates', async () => {
    console.log('Using api.listener for request');
    const response = await request(api.listener)
      .get('/patients')
      .query({ latitude: 40.7128, longitude: -74.0060 })
      .expect(200);

    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeLessThanOrEqual(10);
    
    // Check that patients are ranked and sorted by score
    for (let i = 0; i < response.body.data.length; i++) {
      expect(response.body.data[i]).toHaveProperty('rank', i + 1);
      expect(response.body.data[i]).toHaveProperty('score');
    }
    
    expect(response.body.meta).toHaveProperty('responseTime');
  });

  it('returns 400 for missing latitude', async () => {
    await request(api.listener)
      .get('/patients')
      .query({ longitude: -74.0060 })
      .expect(400);
  });

  it('returns 400 for invalid longitude', async () => {
    await request(api.listener)
      .get('/patients')
      .query({ latitude: 40.7128, longitude: -999 })
      .expect(400);
  });

  it('returns 400 for missing longitude', async () => {
    await request(api.listener)
      .get('/patients')
      .query({ latitude: 40.7128 })
      .expect(400);
  });

  it('returns 400 for invalid latitude', async () => {
    await request(api.listener)
      .get('/patients')
      .query({ latitude: 999, longitude: -74.0060 })
      .expect(400);
  });

  it('patients are sorted by score descending', async () => {
    const response = await request(api.listener)
      .get('/patients')
      .query({ latitude: 40.7128, longitude: -74.0060 })
      .expect(200);

    const scores = response.body.data.map(p => p.score);
    for (let i = 1; i < scores.length; i++) {
      expect(scores[i - 1]).toBeGreaterThanOrEqual(scores[i]);
    }
  });

  it('returns correct response structure', async () => {
    const response = await request(api.listener)
      .get('/patients')
      .query({ latitude: 40.7128, longitude: -74.0060 })
      .expect(200);

    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('meta');
    expect(response.body.meta).toHaveProperty('responseTime');
    expect(response.body.meta.responseTime).toMatch(/\d+ms$/);
  });
});
