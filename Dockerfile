FROM node:20.10-alpine AS builder

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

RUN npm ci --ignore-scripts

COPY . .

RUN npm run build

FROM node:20.10-alpine AS starter

WORKDIR /app

COPY --from=builder /app/dist ./

COPY --from=builder /app/package.json ./

COPY --from=builder /app/package-lock.json ./

ENV NODE_ENV=production

RUN npm ci --ignore-scripts --omit=dev

EXPOSE 8080

CMD ["node", "-r", "dotenv/config", "src/index.js"]
