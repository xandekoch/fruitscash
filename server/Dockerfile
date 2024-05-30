# Etapa de build
FROM node:alpine as build

WORKDIR /app

# Copia os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package.json .

# Instala as dependências
RUN npm install

# Copia todo o código fonte para o diretório de trabalho
COPY . .

# Expondo a porta 3001 (pode ser desnecessário, dependendo do seu ambiente)
EXPOSE 3001

# Comando para iniciar o servidor
CMD ["npm", "start"]