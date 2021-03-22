FROM node:15-alpine

WORKDIR /app

COPY package.json yarn.lock /app/

RUN apk add yarn
RUN yarn install

COPY ./ /app/

# RUN yarn run start
