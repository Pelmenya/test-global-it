FROM node:18.14.1

WORKDIR /app

COPY . .

RUN npm i

EXPOSE 3000

CMD npm run start