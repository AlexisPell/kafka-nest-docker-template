FROM --platform=linux/amd64 node:14.17-alpine as development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

EXPOSE 5000

CMD [ "npm", "run", "start:dev auth" ]