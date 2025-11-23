# Stage 1: Build React app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy React package files
COPY front/package*.json ./front/
RUN cd front && npm install

# Copy React source
COPY front ./front

# Build React app
RUN cd front && npm run build

# Stage 2: Run Express server
FROM node:18-alpine AS server

WORKDIR /app

# Copy server package files and install only production deps
COPY package*.json ./
RUN npm install --only=production

# Copy server source (this includes index.js, dal.js, routes, models, etc.)
COPY . .

# Copy React build output from builder stage
COPY --from=builder /app/front/build ./build

# Expose port
EXPOSE 5000

# Start Express server
CMD ["node", "index.js"]
