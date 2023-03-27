FROM node:13-alpine

WORKDIR /usr/src/event-engine

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run clean && npm run build

RUN npm prune --production

LABEL service=event-engine

CMD ["npm", "start"]
