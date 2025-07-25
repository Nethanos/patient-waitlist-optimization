# Patient Waitlist Optimization

A monorepo containing a patient waitlist optimization system with a scoring algorithm and REST API.

## Overview

This project implements a smart patient prioritization system for hospital waitlists. It uses demographic and behavioral data to score patients based on their likelihood of accepting appointment offers, helping hospitals reduce no-shows and improve scheduling efficiency.

## Projects

### 📊 [Patient Waitlist Optimizer Library](./lib/README.md)
Core scoring algorithm that computes patient acceptance likelihood scores (1-10) based on:
- **Demographic factors (20%)**: Age and distance to facility
- **Behavioral factors (80%)**: Accepted offers, canceled offers, and average reply time
- **Controlled randomness** for patients with incomplete data

### 🚀 [Patient Waitlist API](./api/README.md)
REST API service that exposes the scoring algorithm through HTTP endpoints:
- `GET /patients` - Returns top 10 patients ranked by acceptance likelihood
- Geographic location-based filtering
- Comprehensive error handling and validation

## Quick Start

1. **Start the API service:**
   ```bash
   cd api
   docker-compose up
   ```

2. **Test the scoring:**
   ```bash
   curl "http://localhost:3000/patients?latitude=40.7128&longitude=-74.0060"
   ```

## Architecture

```
patient-waitlist-optimization/
├── lib/          # Core scoring algorithm library
├── api/          # REST API service
└── README.md     # This file
```

## Requirements

- Node.js 18+
- Docker & Docker Compose
- Yarn package manager
