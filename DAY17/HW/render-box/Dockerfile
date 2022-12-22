FROM node:19.3-buster as build-stage

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

COPY . .

CMD ["npm", "run", "start"]

#production stage
FROM nginx:1.23.3-alpine as production-stage

RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app /usr/share/nginx/html

COPY --from=build-stage /app/nginx etc/nginx

# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]

