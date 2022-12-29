FROM node:19-alpine3.17 as build
RUN mkdir app
WORKDIR /app

COPY . .


RUN npm i bootstrap @fortawesome/fontawesome-free
RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]

# nginx - production stage
FROM nginx:1.23.3 as production

# RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

COPY --from=build /app/nginx /etc/nginx/sites-enabled

CMD ["nginx", "-g", "daemon off;"]