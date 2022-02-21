FROM node:lts-alpine as build

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
COPY lerna.json .
COPY tsconfig.build.json .

COPY packages/shared ./packages/shared
COPY packages/api ./packages/api

RUN yarn cache clean --all
RUN yarn install --pure-lockfile --non-interactive
RUN yarn build

FROM node:lts-alpine

ARG _API_URL
ARG _API_KEYCLOAK_CLIENT_ID
ARG _API_KEYCLOAK_CLIENT_SECRET
ARG _WEB_URL
ARG _KEYCLOAK_URL
ARG _KEYCLOAK_REALM
ARG _MARIADB_HOST
ARG _MARIADB_PORT
ARG _MARIADB_USERNAME
ARG _MARIADB_DATABASE
ARG _MARIADB_PASSWORD

ENV API_URL=$_API_URL
ENV API_KEYCLOAK_CLIENT_ID=$_API_KEYCLOAK_CLIENT_ID
ENV API_KEYCLOAK_CLIENT_SECRET=$_API_KEYCLOAK_CLIENT_SECRET
ENV WEB_URL=$_WEB_URL
ENV KEYCLOAK_URL=$_KEYCLOAK_URL
ENV KEYCLOAK_REALM=$_KEYCLOAK_REALM
ENV MARIADB_HOST=$_MARIADB_HOST
ENV MARIADB_PORT=$_MARIADB_PORT
ENV MARIADB_USERNAME=$_MARIADB_USERNAME
ENV MARIADB_DATABASE=$_MARIADB_DATABASE
ENV MARIADB_PASSWORD=$_MARIADB_PASSWORD

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

COPY --from=build /usr/src/app/packages/shared/package.json /usr/src/app/packages/shared/package.json
COPY --from=build /usr/src/app/packages/shared/lib /usr/src/app/packages/shared/lib

COPY --from=build /usr/src/app/packages/api/package.json /usr/src/app/packages/api/package.json
COPY --from=build /usr/src/app/packages/api/lib /usr/src/app/packages/api/lib

ENV NODE_ENV production

RUN yarn cache clean --all
RUN yarn install --pure-lockfile --non-interactive --production

WORKDIR /usr/src/app/packages/api

CMD ["yarn", "run", "start"]