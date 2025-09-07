FROM node:20-alpine

WORKDIR /app

RUN mkdir -p ./public
COPY public ./public
COPY package*.json ./
RUN npm install

COPY server.js .

EXPOSE 3000

CMD ["npm", "start"]
