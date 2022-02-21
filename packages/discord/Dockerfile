FROM node:lts-alpine as build

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
COPY lerna.json .
COPY tsconfig.build.json .

COPY packages/shared ./packages/shared
COPY packages/discord ./packages/discord

RUN yarn cache clean --all
RUN yarn install --pure-lockfile --non-interactive
RUN yarn build

FROM node:lts-alpine

ARG _DISCORD_TOKEN
ENV DISCORD_TOKEN=$_DISCORD_TOKEN

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

COPY --from=build /usr/src/app/packages/shared/package.json /usr/src/app/packages/shared/package.json
COPY --from=build /usr/src/app/packages/shared/lib /usr/src/app/packages/shared/lib

COPY --from=build /usr/src/app/packages/discord/package.json /usr/src/app/packages/discord/package.json
COPY --from=build /usr/src/app/packages/discord/lib /usr/src/app/packages/discord/lib

ENV NODE_ENV production

RUN yarn cache clean --all
RUN yarn install --pure-lockfile --non-interactive --production

WORKDIR /usr/src/app/packages/discord

CMD ["yarn", "run", "start"]