# Stage 1: Compilar e Construir a aplicação React
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@latest
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "server.js"]

# Stage 2: Preparar o ambiente de produção
# FROM node:18-slim
# WORKDIR /app
# COPY --from=build /app/build ./build
# # COPY package*.json ./
# # RUN npm install --only=production
# COPY server.js .
# EXPOSE 3000
# CMD ["node", "server.js"]
