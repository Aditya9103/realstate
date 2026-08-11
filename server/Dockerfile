# server/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the backend source code
COPY . .

# Expose the backend port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
