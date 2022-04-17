FROM node:15-alpine as reactbuilder


WORKDIR /app

COPY package.json yarn.lock /app/

RUN apk add yarn
RUN yarn install

COPY ./ /app/

ARG TARGET_BUILD_ENV="prod"

RUN yarn build-$TARGET_BUILD_ENV

FROM nginx:1.20-alpine

WORKDIR /var/www/html

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=reactbuilder /app/build/ .
