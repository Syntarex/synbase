# Nutze das offizielle Bun-Image
FROM oven/bun:1 as base
WORKDIR /usr/src/app

# Builde Projekt
FROM base AS build
COPY . ./
RUN bun install --frozen-lockfile
ENV NODE_ENV=production
RUN bun run build

# Kopiere fertiges Projekt
FROM base AS release
COPY --from=build /usr/src/app /usr/src/app

# Starte Produktivbetrieb
USER bun
EXPOSE 3000/tcp
ENTRYPOINT ["ls", "-la", "/usr/src/app"]
