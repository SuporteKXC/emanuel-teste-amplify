FROM node:22

WORKDIR /app

COPY ../package*.json ./
COPY . .

RUN rm -rf node_modules
RUN npm install
RUN npm rebuild bcrypt --build-from-source
RUN npm run build

COPY ../iff/.env.iff build/.env

EXPOSE 3333

CMD ["node", "build/server.js"]
