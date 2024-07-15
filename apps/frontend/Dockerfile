FROM node:18-alpine AS base

# The web Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update this Dockerfile, the Dockerfile in the web workspace and copy that over to Dockerfile in the docs.

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune frontend --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm
RUN npm install -g turbo

# Define build arguments for environment variables
ARG VITE_FRONTEND_URI
ARG VITE_BACKEND_URI
ARG VITE_BACKEND_URI_GRAPHQL

# Set environment variables during the build process
ENV VITE_FRONTEND_URI=$VITE_FRONTEND_URI
ENV VITE_BACKEND_URI=$VITE_BACKEND_URI
ENV VITE_BACKEND_URI_GRAPHQL=$VITE_BACKEND_URI_GRAPHQL
ENV VITE_BACKEND_URI_GRAPHQL_CODEGEN=$VITE_BACKEND_URI_GRAPHQL_CODEGEN

WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY tsconfig.json tsconfig.json
COPY turbo.json turbo.json

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

RUN pnpm turbo build --filter=frontend...

FROM base AS runner
WORKDIR /app

RUN npm install -g pnpm

COPY --from=installer /app .

CMD ["pnpm", "--filter=frontend", "run", "start:prod"]