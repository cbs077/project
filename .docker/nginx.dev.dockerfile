

FROM node:8-alpine as builder



#RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

#RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app

RUN mkdir /ng-app
WORKDIR /ng-app

#COPY package.json ./
COPY config ./config
COPY webpack.config.js .
#COPY demo ./demo
#COPY package.json .

EXPOSE 80
EXPOSE 443
EXPOSE 8080

#CMD [ "npm", "start" ]