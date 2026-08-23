# ==========================================
# 1. Build Stage
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package descriptors
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy source code and assets
COPY . .

# Build production bundle
RUN npm run build

# ==========================================
# 2. Production Full-Stack Server Stage (Node.js Express)
# ==========================================
FROM node:20-alpine

WORKDIR /app

# Copy package descriptors and install production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy built frontend static assets
COPY --from=builder /app/dist ./dist

# Copy backend server code and environment files
COPY server ./server
COPY .env* ./

ENV NODE_ENV=production
ENV PORT=3000

# Expose standard Coolify HTTP port
EXPOSE 3000

# Start unified Node.js Express server
CMD ["node", "server/index.js"]
