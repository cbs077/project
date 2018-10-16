
FROM node:8-alpine

LABEL author="Dan Wahlin" 

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./Server ./

RUN npm install nodemon -g 

EXPOSE 3000

ENTRYPOINT ["nodemon", "app.js"]


