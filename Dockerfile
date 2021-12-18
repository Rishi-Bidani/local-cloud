FROM node:16

# Create app directory
WORKDIR /usr/src/app
COPY . .

WORKDIR ./client
RUN yarn build

WORKDIR ../server
# COPY package*.json ./usr/src/app
# COPY yarn.lock ./usr/src/app
RUN yarn install

CMD node main.js
EXPOSE 5000