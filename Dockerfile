FROM node:20.10-alpine AS builder

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

RUN npm ci --ignore-scripts

COPY . .

RUN npm run build

FROM node:20.10-alpine AS starter

WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/package.json ./

COPY --from=builder /app/package-lock.json ./

ENV NODE_ENV=production
ENV PORT=8080
ENV HOST=0.0.0.0

RUN npm ci --only=production --ignore-scripts

EXPOSE 8080

CMD ["npm", "start"]
