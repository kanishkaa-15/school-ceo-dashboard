# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy EVERYTHING from host (including node_modules and .next)
# This assumes Jenkins already ran 'npm install' and 'npm run build'
COPY . .

# Expose frontend port
EXPOSE 3000

# Start the Next.js app
# We use 'start' because it's already built
CMD ["npm", "run", "start"]
