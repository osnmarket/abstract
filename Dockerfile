FROM node:16.17.0

USER root

RUN apt-get upgrade && apt-get update && apt-get install nasm

RUN mkdir -p /usr/src/app

ARG APP_ENV

WORKDIR /usr/src/app

COPY .env.$APP_ENV.example  ./.env.production.local

COPY package.json ./

RUN yarn cache clean
RUN yarn

COPY . .

RUN yarn build

USER $USER

EXPOSE 3000

CMD ["yarn", "start"]
