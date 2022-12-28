FROM node:19-alpine3.17 as build

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

CMD ["npm", "run", "start"]

# nginx - production stage
FROM nginx:1.23.3 as production

COPY --from=build app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]