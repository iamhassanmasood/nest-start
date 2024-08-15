FROM node:16.20.2

WORKDIR /usr/src/nest-project

COPY package*.json ./

COPY .env ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
