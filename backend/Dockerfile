# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.19.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 5001

CMD ["npm", "run", "dev"]
