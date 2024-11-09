FROM node:18.16.1

WORKDIR /home/node/app

RUN npm install

EXPOSE 6666