FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @nestjs/cli

RUN npm install -g prisma

COPY . .

RUN npm run build

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start:prod"]