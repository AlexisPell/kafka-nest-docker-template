FROM node:14.17-alpine as development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

EXPOSE 8080

CMD [ "npm", "run", "start:dev gateway" ]