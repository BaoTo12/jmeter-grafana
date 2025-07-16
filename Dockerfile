
# ==========================================
# TODO: STAGE 1: Base Configuration
# ==========================================
# This stage sets up the foundation that other stages will build upon
# We're using the Alpine image you mentioned earlier for its efficiency
FROM node:current-alpine3.22 AS base

# Install essential system dependencies that most Node.js apps need
# curl: for health checks and debugging
# ca-certificates: for HTTPS requests
# tzdata: for proper timezone handling
RUN apk add --no-cache \
    curl \
    ca-certificates \
    tzdata

# Set up environment variables that will be inherited by all subsequent stages
ENV NODE_ENV=development
ENV TZ=UTC

# Create the application directory where our code will live

WORKDIR /app


# ==========================================
# TODO: STAGE 2: Dependency Installation
# ==========================================
# This stage focuses solely on installing Node.js dependencies
# By separating this, we can leverage Docker's layer caching more effectively
FROM base as dependencies

COPY package*.json .

# Install all dependencies (including devDependencies)
# We use npm ci instead of npm install for faster, more reliable builds
# The --include=dev flag ensures we get development dependencies needed for building

RUN npm ci --include=dev

# Clean npm cache to reduce layer size
RUN npm cache clean --force

# ==========================================
#TODO: STAGE 3: Development Environment
# ==========================================
# This stage creates a container optimized for development work
# Perfect for local development with hot-reload capabilities
FROM dependencies as development

# Copy the entire source code into the container
COPY . .

# Install global development tools that make development easier
# nodemon: automatically restarts the server when files change
# typescript: if you're using TypeScript (remove if not needed)
RUN npm install -g nodemon

# Expose the development port
EXPOSE 3000

# Create a volume mount point for live code editing
VOLUME ["/app/src"]

# Start the application with hot-reload for development
# This assumes you have a "dev" script in your package.json
CMD ["npm", "run", "start"]

# ==========================================
# TODO: STAGE 4: Testing Environment
# ==========================================
# This stage runs all your tests and quality checks
# Essential for CI/CD pipelines and ensuring code quality
# FROM dependencies AS testing

# Copy source code for testing
# COPY . .

# Run ESLint to check code quality
# This will fail the build if there are linting errors
# RUN npm run lint

# Run all unit tests
# If any test fails, the entire Docker build will fail
# RUN npm test

# Run security audit to check for vulnerabilities
# This helps catch security issues early in the development process
# RUN npm audit --audit-level=moderate

# ==========================================
# TODO: STAGE 5: Build Stage
# ==========================================
# This stage compiles/builds your application for production
# It transforms your source code into optimized, production-ready assets
FROM dependencies AS builder

# Copy source code
COPY . .

# Build the application
# This might include TypeScript compilation, bundling, minification, etc.
RUN npm run build

# Prune development dependencies to prepare for production copying
# This removes devDependencies while keeping the built application
RUN npm prune --production

# ==========================================
#TODO: STAGE 6: Production Environment
# ==========================================
# This is your final, minimal production image
# It contains only what's needed to run your application
FROM base AS production

# Switch to production environment
ENV NODE_ENV=production

# Create a non-root user for security
# Running as root is a security risk and should be avoided
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci --only=production && \
    npm cache clean --force

# Copy the built application from the builder stage
# We're only copying the compiled output, not the source code
COPY --from=builder /app/dist ./dist

# Copy any static assets if your application serves them
COPY --from=builder /app/public ./public

# Copy the production node_modules from the builder stage
# This ensures we have exactly the dependencies we need
COPY --from=builder /app/node_modules ./node_modules

# Change ownership of all application files to the non-root user
RUN chown -R nodeuser:nodejs /app

# Switch to the non-root user
USER nodeuser

# Expose the production port
EXPOSE 3000

# Add a health check to monitor container health
# This endpoint should be implemented in your Node.js application
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# Start the application
# This assumes your built application has a main entry point
CMD ["node", "dist/server.js"]