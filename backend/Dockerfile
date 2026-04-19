# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy EVERYTHING from host (including node_modules)
# This assumes Jenkins already ran 'npm install'
COPY . .

# Expose backend port
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]
