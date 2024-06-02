FROM node:22-alpine3.18 as build-stage

WORKDIR /app
RUN apk add --no-cache libc6-compat

# Copy the package.json and package-lock.json
COPY --chown=node:node package*.json ./

# Install the dependencies
RUN npm install

# Set to production environment
ENV NODE_ENV production
# Set the Timezone
ENV TZ=Europe/Paris


# Copy source code
COPY --chown=node:node . .

# Run the prisma generate
RUN npx prisma generate

# Generate the production build. The build script runs "nest build" to compile the application.
RUN ["npm","run", "build"]

# Install only the production dependencies and clean cache to optimize image size.
RUN npm i --only=production && npm cache clean --force

# Set Docker as a non-root user
USER node

FROM node:22-alpine3.18 as production-stage

WORKDIR /app
RUN apk add --no-cache libc6-compat

# Set to production environment
ENV NODE_ENV production
# Set the Timezone
ENV TZ=Europe/Paris


# Copy only the necessary files
COPY --chown=node:node --from=build-stage /app/dist dist
COPY --chown=node:node --from=build-stage /app/node_modules node_modules
COPY --chown=node:node --from=build-stage /app/package.json /app
# Copy the prisma folder (schema + migrations)
COPY --chown=node:node --from=build-stage /app/prisma prisma

RUN mkdir -p /app/logs && chmod 777 /app/logs

# Expose the port
EXPOSE 3000

# Set Docker as non-root user
USER node


CMD ["npm", "run", "start:prod"]
 