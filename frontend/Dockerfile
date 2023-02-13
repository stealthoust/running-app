FROM node:18.10.0 as build

WORKDIR /app

COPY . .


RUN npm install

RUN npm run build

FROM nginx:latest

COPY --from=build /app/dist/frontend /usr/share/nginx/html
