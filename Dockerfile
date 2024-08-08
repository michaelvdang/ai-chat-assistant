# Use the official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Check node version and working directory
RUN node --version
RUN pwd

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]