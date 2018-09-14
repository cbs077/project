

FROM node:8-alpine as builder

COPY package.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

COPY config ./config
COPY webpack.config.js .
COPY demo ./demo
COPY package.json .
#RUN npm start

EXPOSE 80
EXPOSE 443
