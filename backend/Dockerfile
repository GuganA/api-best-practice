# ---------- Stage 1: Build ----------
FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- Stage 2: Production ----------
FROM node:20-slim

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/build ./

EXPOSE 5000

CMD ["node", "server.js"]