
FROM node:8-alpine

LABEL author="Dan Wahlin" 

WORKDIR /var/www/server

RUN npm install nodemon -g 

EXPOSE 3000

ENTRYPOINT ["nodemon", "app.js"]


