# Define a imagem base
FROM node:latest

# Define o diretório de trabalho da aplicação
WORKDIR /app

COPY . .

COPY ./.envproduction ./.env
RUN yarn

EXPOSE 3000

CMD ["yarn", "start:prod"]