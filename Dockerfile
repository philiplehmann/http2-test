FROM node:14.3.0-alpine3.11

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --prod

# Bundle app source
COPY . .

EXPOSE 443
CMD [ "node", "index.js" ]