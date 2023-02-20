FROM node:19

#Working directory
WORKDIR /app

COPY package.json ./

RUN npm i

COPY . .

EXPOSE 3001

CMD [ "npm", "start" ]



