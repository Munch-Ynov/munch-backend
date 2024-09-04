# Use the official Node.js image as the base image
FROM node:22

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json pnpm-lock.yaml ./

ENV NODE_ENV=development
# Install dependencies 'and dev dependencies' with pnpm
RUN npm install -g pnpm && pnpm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application with Prisma initialization
CMD ["sh", "-c", "npm run prisma:init && npm run start:dev"]
