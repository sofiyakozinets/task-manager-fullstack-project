# Stage 0: Dependencies
FROM node:20-alpine AS base

RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Install dependencies
COPY .yarnrc.yml package.json yarn.lock ./
RUN corepack enable
RUN yarn config set npmRegistryServer https://registry.yarnpkg.com
RUN rm -rf node_modules .next
RUN yarn install --immutable


# Stage 1: Lint
FROM base AS linter

# Copy files
COPY . .

# Run ESLint
RUN yarn lint


# Stage 2: Build client
FROM base AS client-builder

# Set build-time environment variables
ARG NEXT_PUBLIC_NODE_ENV
ENV NEXT_PUBLIC_NODE_ENV=${NEXT_PUBLIC_NODE_ENV}
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Create a .env.production file with the environment variables
RUN echo "NEXT_PUBLIC_NODE_ENV=${NEXT_PUBLIC_NODE_ENV}" > .env.production && \
    echo "NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}" >> .env.production

# Copy files
COPY next.config.ts next-env.d.ts tsconfig.json ./
COPY ./public ./public
COPY ./src ./src

# Build Next.js
RUN yarn build


# Stage 3: Run client
FROM base AS client-runner

# Set runtime environment variables
ARG NEXT_PUBLIC_NODE_ENV
ENV NEXT_PUBLIC_NODE_ENV=${NEXT_PUBLIC_NODE_ENV}
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Copy files from client builder
COPY --from=client-builder /app/.next ./.next
COPY --from=client-builder /app/node_modules ./node_modules
COPY --from=client-builder /app/public ./public

EXPOSE 3000

# Start client
CMD yarn start


# Stage 4: Build server
FROM base AS server-builder

# Copy files
COPY tsconfig.json tsconfig.server.json ./
COPY ./prisma ./prisma
COPY ./src/backend ./src/backend
COPY ./src/lib/constants ./src/lib/constants
COPY ./src/lib/types ./src/lib/types

# Compile server code
RUN yarn build:server


# Stage 2: Run server
FROM base AS server-runner

# Copy files from server builder
COPY --from=server-builder /app/tsconfig.json ./tsconfig.json
COPY --from=server-builder /app/dist ./dist
COPY --from=server-builder /app/node_modules ./node_modules
COPY --from=server-builder /app/prisma ./prisma

# Set prisma directory permissions
RUN chmod 777 /app/prisma

EXPOSE 5001

# Prepare Prisma Client, and start server
CMD yarn prisma:migrate && yarn start:server
