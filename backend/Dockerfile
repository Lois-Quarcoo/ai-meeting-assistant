# ─────────────────────────────────────────────────────────────
# Stage 1: Builder
# Installs ALL dependencies (including devDependencies for build)
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first (for better Docker layer caching)
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy the rest of the source code
COPY . .

# ─────────────────────────────────────────────────────────────
# Stage 2: Production
# Lean final image — only production deps, no devDependencies
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS production

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --omit=dev && npm cache clean --force

# Copy application source from builder stage
COPY --from=builder /app/config ./config
COPY --from=builder /app/controllers ./controllers
COPY --from=builder /app/middleware ./middleware
COPY --from=builder /app/models ./models
COPY --from=builder /app/routes ./routes
COPY --from=builder /app/services ./services
COPY --from=builder /app/server.js ./server.js

# Switch to non-root user
USER appuser

# Expose the backend port
EXPOSE 5000

# Health check — Docker will monitor this endpoint
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:5000/api/health || exit 1

# Start the server
CMD ["node", "server.js"]
