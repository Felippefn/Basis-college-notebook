# Use a base image with Node.js
FROM node:16-slim

# Install Xvfb and other necessary dependencies
RUN apt-get update && apt-get install -y \
    xvfb \
    libgtk-3-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxi6 \
    libxtst6 \
    libnss3 \
    libxrandr2 \
    libasound2 \
    libpangocairo-1.0-0 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libxkbcommon-x11-0 \
    libxss1 \
    libx11-dev \
    libgconf-2-4 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port that your application will run on (if needed)
# EXPOSE 3000

# Command to run your Electron app
CMD xvfb-run npm start
