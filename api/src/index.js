import Hapi from '@hapi/hapi';
import Joi from 'joi';
import { getSamplePatients } from '../../db/db.js';
import { computeScore } from '../../lib/src/core/index.js';


/**
 * Constants.
 */

const PATIENTS = getSamplePatients();

const CONFIG = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || 'localhost',
  TOP_PATIENTS_LIMIT: 10,
  VALIDATION: {
    LATITUDE: { min: -90, max: 90 },
    LONGITUDE: { min: -180, max: 180 },
  },
};

/**
 * Input validation schema.
 */

const querySchema = Joi.object({
  latitude: Joi.number()
    .min(CONFIG.VALIDATION.LATITUDE.min)
    .max(CONFIG.VALIDATION.LATITUDE.max)
    .required()
    .messages({
      'number.base': 'Latitude must be a valid number',
      'number.min': `Latitude must be at least ${CONFIG.VALIDATION.LATITUDE.min}`,
      'number.max': `Latitude must be at most ${CONFIG.VALIDATION.LATITUDE.max}`,
      'any.required': 'Latitude is required',
    }),
  longitude: Joi.number()
    .min(CONFIG.VALIDATION.LONGITUDE.min)
    .max(CONFIG.VALIDATION.LONGITUDE.max)
    .required()
    .messages({
      'number.base': 'Longitude must be a valid number',
      'number.min': `Longitude must be at least ${CONFIG.VALIDATION.LONGITUDE.min}`,
      'number.max': `Longitude must be at most ${CONFIG.VALIDATION.LONGITUDE.max}`,
      'any.required': 'Longitude is required',
    }),
});

const createErrorResponse = (statusCode, message, details = null) => ({
  error: {
    message,
    statusCode,
    ...(details && { details }),
  },
});


const getTopPatients = (targetLocation, limit = CONFIG.TOP_PATIENTS_LIMIT) => {
  try {
    
    const scoredPatients = PATIENTS.map((patient) => {
      try {
        const score = computeScore(patient, targetLocation);
        return { ...patient, score };
      } catch (error) {
        console.warn(`Failed to compute score for patient ${patient.id || 'unknown'}:`, error.message);
        // Return patient with minimum score if computation fails
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

// Route handler with proper error handling and logging
const patientsHandler = async (request, h) => {
  const startTime = Date.now();
  
  try {
    const { latitude, longitude } = request.query;
    const targetLocation = { latitude, longitude };

    const topPatients = getTopPatients(targetLocation);
    
    const responseTime = Date.now() - startTime;

    return h.response({
      data: topPatients,
      meta: {
        responseTime: `${responseTime}ms`,
      },
    }).code(200);
  } catch (error) {
    const responseTime = Date.now() - startTime;    
    console.error('Handler error:', error);
    
    if (error.message.includes('Invalid target location')) {
      return h.response(createErrorResponse(400, 'Invalid coordinates provided'))
        .code(400);
    }
    
    if (error.message.includes('No patient data available')) {
      return h.response(createErrorResponse(503, 'Patient data service unavailable'))
        .code(503);
    }
    
    return h.response(createErrorResponse(500, 'Internal server error'))
      .code(500);
  }
};


const init = async () => {
  const server = Hapi.server({
    port: CONFIG.PORT,
    host: CONFIG.HOST,
    routes: {
      cors: {
        origin: ['*'],
        headers: ['Accept', 'Content-Type'],
      },
      validate: {
        failAction: (request, h, err) => {
          console.warn('Validation error:', err.details);
          return h.response(createErrorResponse(400, 'Validation error', err.details))
            .code(400)
        },
      },
    },
  });

  // Register routes
  server.route({
    method: 'GET',
    path: '/patients',
    options: {
      validate: {
        query: querySchema,
      },
      description: 'Get top patients based on location and scoring algorithm',
      notes: 'Returns the top 10 patients ranked by computed score',
      tags: ['api', 'patients'],
    },
    handler: patientsHandler,
  });

  // Graceful shutdown handling
  const gracefulShutdown = async (signal) => {
    await server.stop({ timeout: 10000 });
    console.log('Server stopped gracefully');
    process.exit(0);
  };

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exit(1);
});

init().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
