# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.19.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY backend/package*.json ./backend/
COPY frontend/package*.json ./backend/

RUN npm --prefix backend ci --only=production

COPY . .

RUN npm run build

EXPOSE 5001

CMD ["npm", "run", "dev"]