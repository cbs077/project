
FROM node:8-alpine

LABEL author="Dan Wahlin" 


WORKDIR /usr/src/app
#COPY . .
RUN npm install nodemon -g 

EXPOSE 3000

ENTRYPOINT ["nodemon", "app.js"]


