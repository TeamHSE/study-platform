ARG NODE_VERSION=21.6.1
ARG PNPM_VERSION=9.0.2

FROM node:${NODE_VERSION}-alpine

## Use production node environment by default.
#ENV NODE_ENV production

# Install pnpm.
RUN npm install -g npm@latest

RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

WORKDIR /usr/src/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    npm i --frozen-lockfile --force

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD npm start
