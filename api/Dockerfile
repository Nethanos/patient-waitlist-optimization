FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"] 