FROM node:16-alpine as builder
USER node
COPY --chown=node:node . /app/
WORKDIR /app
RUN yarn install && yarn build && yarn build:swagger

FROM node:16-alpine
RUN apk add --no-cache tzdata
ENV TZ=Brazil/East
USER node
ENV NODE_ENV=prod
COPY --from=builder --chown=node:node /app/package.json /app/
WORKDIR /app
RUN yarn install --production=true
COPY --from=builder --chown=node:node /app/dist dist
CMD [ "yarn", "start:prod" ]