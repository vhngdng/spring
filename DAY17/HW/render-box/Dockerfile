FROM node:19.3-buster as build-stage

WORKDIR /app

COPY . .
RUN npm ci
RUN npm run build


CMD ["npm", "run", "start"]

#production stage
FROM nginx:1.23.3-alpine as production-stage

RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/build /usr/share/nginx/html

COPY --from=build-stage /app/nginx etc/nginx

# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]

