FROM urielch/opencv-nodejs as cache

# Install dependencies
RUN apt-get update && apt-get install -y \
    dos2unix \
    && rm -rf /var/lib/apt/lists/*

# Install node modules
WORKDIR /app
COPY . /app
RUN yarn install

# Build the app
RUN yarn build

# Run the CLI app
ENTRYPOINT ["yarn", "dev"]