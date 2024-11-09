FROM node:18.16.1

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 6666

CMD ["node", "src/index.js"]