# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:22-alpine AS builder

ARG NEXT_PUBLIC_URL_API

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

FROM node:22-alpine AS deploy

WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/package.json/ ./package.json

EXPOSE 4008
ENV PORT=4008

CMD ["node", "server.js"]
