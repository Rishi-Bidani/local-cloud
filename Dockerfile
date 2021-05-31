FROM node:12

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .

WORKDIR ./client
RUN yarn
RUN yarn build 

CMD node ../server/main.js