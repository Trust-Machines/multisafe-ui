FROM node:18-alpine

# Install OS dependencies
RUN apk add --no-cache \
        sudo \
        curl \
        build-base \
        g++ \
        libpng \
        libpng-dev \
        jpeg-dev \
        pango-dev \
        cairo-dev \
        giflib-dev \
        py3-pip \
        ;

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