FROM node:18

RUN mkdir -p /usr/src/app

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
