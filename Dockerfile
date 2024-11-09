FROM node:18.16.1

WORKDIR /home/node/app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 6666

CMD ["node", "index.js"]