
FROM node:8-alpine

LABEL author="Dan Wahlin" 


WORKDIR /usr/src/app
#COPY . .
RUN npm install nodemon -g 
RUN npm install -g pm2 node-gyp

EXPOSE 3000

#ENTRYPOINT ["nodemon", "--inspect=0.0.0.0:9229" "app.js"]
#ENTRYPOINT ["npm", "start"]
ENTRYPOINT ["pm2", "start", "app.js"]


