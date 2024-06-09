ARG NODE_VERSION=21.6.1
#ARG PNPM_VERSION=9.0.2
#
#FROM node:${NODE_VERSION}-alpine
#
### Use production node environment by default.
##ENV NODE_ENV production
#
## Install pnpm.
#RUN npm install -g npm@latest
#
#RUN --mount=type=cache,target=/root/.npm \
#    npm install -g pnpm@${PNPM_VERSION}
#
#WORKDIR /usr/src/app
#
#RUN --mount=type=bind,source=package.json,target=package.json \
#    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
#    --mount=type=cache,target=/root/.local/share/pnpm/store \
#    npm i --frozen-lockfile --force
#
## Run the application as a non-root user.
#USER node
#
## Copy the rest of the source files into the image.
#COPY . .
#
## Expose the port that the application listens on.
#EXPOSE 3000
#
## Run the application.
#CMD npm start
#
#
#////////

FROM node:${NODE_VERSION}-alpine AS build

COPY package.json  src/ app/
WORKDIR /app

RUN npm i --force
RUN npm build

FROM node:${NODE_VERSION}-alpine
COPY --from=build /dist ./
WORKDIR /app
EXPOSE 3000
USER node
CMD ["npm", "start"]
#CMD ls

#///

#FROM node:20-slim AS base
#ENV PNPM_HOME="/pnpm"
#ENV PATH="$PNPM_HOME:$PATH"
#RUN corepack enable
#COPY . /app
#WORKDIR /app
#
#FROM base AS prod-deps
#RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile
#
#FROM base AS build
#RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
#RUN pnpm run build
#
#FROM gcr.io/distroless/nodejs20-debian11
#COPY --from=prod-deps /app/node_modules /app/node_modules
#COPY --from=build /app/package.json /app/package.json
#USER node
#WORKDIR /app
#EXPOSE 3000
#
#CMD [ "dist/index.js"]


///
FROM node:19.0.0-alpine3.16 as builder

ADD . /app
WORKDIR /app/react
RUN npm install
RUN npm run build

ENV NODE_ENV=production
WORKDIR /app/express
RUN npm install

RUN wget https://gobinaries.com/tj/node-prune --output-document - | /bin/sh && node-prune


FROM gcr.io/distroless/nodejs18-debian11

COPY --from=builder /app/react/build /app/react/build
COPY --from=builder /app/express/node_modules /app/express/node_modules
COPY --from=builder /app/express/index.js /app/express/index.js

WORKDIR /app/express
EXPOSE 3000
USER node
CMD ["node", "index.js"]
