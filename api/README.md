# Patient Waitlist API

A REST API for optimizing patient waitlist management using intelligent scoring algorithms.

## 🚀 Quick Start

### Using Docker
```bash
# Build and run with Docker Compose
docker compose up

# Or build and run manually
npm run docker:build
npm run docker:run
```

### Local Development
```bash
# Install dependencies
yarn 

# Start the server
yarn start
```

## 📋 API Endpoints

### GET /patients

Returns the top 10 patients ranked by their likelihood to accept an appointment offer.

**Query Parameters:**
- `latitude` (required): Facility latitude (-90 to 90)
- `longitude` (required): Facility longitude (-180 to 180)

**Example Request:**
```bash
curl "http://localhost:3000/patients?latitude=40.7128&longitude=-74.0060"
```

**Example Response:**
```json
{
  "data": [
    {
      "id": "patient-1",
      "name": "John Doe",
      "age": 35,
      "location": {
        "latitude": 40.7128,
        "longitude": -74.0060
      },
      "score": 8.5,
      "rank": 1,
      "acceptedOffers": 5,
      "canceledOffers": 1,
      "averageReplyTime": 120
    }
  ],
  "meta": {
    "responseTime": "45ms"
  }
}
```

## 🐳 Docker Commands

```bash
# Build the Docker image
npm run docker:build

# Run the container
npm run docker:run

# Start with Docker Compose
npm run docker:compose

# Stop Docker Compose
npm run docker:compose:down
```

## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (default: 3000)
- `HOST`: Server host (default: localhost)

## 🧪 Testing

```bash
# Run all tests
yarn test

```

## 📚 Architecture

The API is built with:
- **Hapi.js**: Web framework
- **Joi**: Input validation
- **geolib**: Geospatial calculations
- **Vitest**: Testing framework

### Project Structure
```
api/
├── src/
│   └── index.js          # Main application
├── test/
│   ├── setup.js          # Test configuration
│   └── src/
│       └── index.test.js # Unit tests
├── Dockerfile            # Container definition
├── docker-compose.yml    # Multi-container setup
└── package.json          # Dependencies and scripts
```
