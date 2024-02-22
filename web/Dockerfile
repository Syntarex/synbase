# TODO: Aktuell nutze ich nicht das offizielle Image aufgrund dieses Bugs mit Prisma:
# https://github.com/prisma/prisma/issues/21241

# Nutze das offizielle Bun-Image
FROM oven/bun:latest as base
ENV TURBO_TELEMETRY_DISABLED=1
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
WORKDIR /usr/src/app

# Builde Projekt
FROM base AS build
COPY . ./
RUN bun install --frozen-lockfile
RUN bun run build

# Kopiere fertiges Projekt
FROM base AS release
COPY --from=build /usr/src/app /usr/src/app

# Starte NextJS
EXPOSE 3000/tcp
ENTRYPOINT ["bun", "run", "start"]
