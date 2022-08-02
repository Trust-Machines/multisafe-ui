FROM node:18-alpine

WORKDIR /app

# Install node dependencies
COPY package.json ./
RUN yarn

# Copy app files
COPY . .

# Build
RUN yarn build

# Install server
RUN yarn global add serve

EXPOSE 3000

# Serve
CMD ["serve", "-s", "build"]
