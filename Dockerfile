# frontend/Dockerfile
FROM node:20-alpine as builder

WORKDIR /app
# Copy package.json and yarn.lock first for efficient caching
COPY package*.json ./
# Install dependencies
RUN yarn install
# Copy the rest of the project files
COPY . .
# Expose the necessary port (default 3000 for Vite)
EXPOSE 5173
