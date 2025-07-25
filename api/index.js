import { api } from './src/index.js';

api.start().then(() => {
  console.log(`Server running on ${api.info.uri}`);
}).catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});