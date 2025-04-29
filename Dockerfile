# syntax=docker.io/docker/dockerfile:1

# 1. Base image with Bun pre-installed
FROM oven/bun:latest AS base
WORKDIR /app

# 2. Install dependencies
FROM base AS deps
COPY package.json bun.lockb ./
# reproducible install of all deps
RUN bun install --frozen-lockfile

# 3. Build the app
FROM base AS builder
WORKDIR /app
# bring in installed modules
COPY --from=deps /app/node_modules ./node_modules
# copy source
COPY . .
# disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1
# run Next.js build via Bun
RUN bun run build

# 4. Final production image
FROM oven/bun:alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# create unprivileged user to run the server
RUN adduser --system --uid 1001 nextjs

# copy over only what’s needed at runtime
COPY --from=builder /app/public ./public
# Next.js standalone output
COPY --from=builder --chown=nextjs:bun /app/.next/standalone ./
COPY --from=builder --chown=nextjs:bun /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
# Bun’s drop-in server entrypoint for Next.js standalone
CMD ["bun", "server.js"]
