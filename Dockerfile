FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app
COPY . .

# WORKDIR /usr/src/app/client
# RUN yarn build

WORKDIR /usr/src/app/server
# COPY package*.json ./usr/src/app
# COPY yarn.lock ./usr/src/app
RUN yarn install
# RUN yarn add fs

CMD ["node" "./main.js"]
EXPOSE 5000