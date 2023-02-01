FROM node:16-alpine as build-stage

WORKDIR /usr/src/app

COPY ./package*.json ./
COPY ./yarn.lock ./

RUN yarn

COPY . .

RUN yarn build
