# Etapa de build
FROM node:alpine as build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

# Etapa de produção
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Porta exposta
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]