FROM node:alpine as build

WORKDIR /app

COPY package.json .

RUN npm install

# RUN npm install nodemon

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
# CMD ["npm", "run", "dev"]