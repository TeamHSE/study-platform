ARG NODE_VERSION=20.14.0

FROM node:${NODE_VERSION}-alpine

## Use production node environment by default.
#ENV NODE_ENV production

# Install pnpm and openssl.
RUN apk add --no-cache openssl \
    && npm install -g npm@latest

WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml
COPY backend/package.json ./package.json
COPY backend/pnpm-lock.yaml ./pnpm-lock.yaml

# Install dependencies
RUN npm i --frozen-lockfile --force

# Generate RSA keys in src/config
RUN mkdir -p src/config \
    && openssl genpkey -algorithm RSA -out src/config/private.pem -pkeyopt rsa_keygen_bits:2048 \
    && openssl rsa -pubout -in src/config/private.pem -out src/config/public.pem \
    && chmod 644 src/config/private.pem src/config/public.pem

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY backend /usr/src/app

# Expose the port that the application listens on.
EXPOSE 8080

# Run the application.
CMD npm start
