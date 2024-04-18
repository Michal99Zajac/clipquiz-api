FROM node:20.10-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --ignore-scripts

COPY . .

RUN npm run build

RUN npm prune --omit=dev

FROM node:20.10-alpine AS starter

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/package.json ./

COPY --from=builder /app/package-lock.json ./

COPY --from=builder /app/dist ./dist

RUN npm config set update-notifier false

ENV NODE_ENV=production

EXPOSE 8080

CMD ["node", "dist/index.js"]
