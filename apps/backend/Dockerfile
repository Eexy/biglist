FROM node:22-alpine3.19 as base
LABEL authors="isai"

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

FROM base as dev
WORKDIR /app
COPY --from=base ./app ./
CMD ["npm", "run", "start:dev"]

FROM base as build
WORKDIR /app
COPY --from=base ./app ./
RUN npm run build

FROM node:22-alpine3.19 as prod
WORKDIR /app
COPY --from=build ./app/dist/ .
COPY --from=build ./app/node_modules ./node_modules
CMD ["node", "main.js"]
ENV PORT=$PORT