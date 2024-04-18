FROM node:20.10-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --ignore-scripts

COPY . .

RUN npm run build

RUN npm prune --production

FROM node:20.10-alpine AS starter

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/package.json ./

COPY --from=builder /app/package-lock.json ./

COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production

EXPOSE 8080

CMD ["npx", "typeorm", "migration:run", "-d", "dist/db", "&&", "node", "dist/index.js"]
