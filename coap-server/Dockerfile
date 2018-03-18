FROM mhart/alpine-node:8

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Get all the code needed to run the app
COPY . /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app

# Install dependecies
RUN npm install

# Expose the port the app runs in
EXPOSE 5683

# Serve the app
CMD ["npm", "run", "docker"]