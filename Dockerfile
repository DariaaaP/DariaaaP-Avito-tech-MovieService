FROM node:18

WORKDIR /.

COPY package*.json ./

RUN npm install

COPY . .

ENV TOKEN=${TOKEN}

RUN npm run build

CMD ["npm", "start"]