FROM node:latest as build

WORKDIR /usr/local/app
COPY ./ /usr/local/app/

RUN npm install
RUN npm run build

FROM nginx:latest

COPY --from=build ./dist/ada-ui /usr/share/nginx/html

EXPOSE 80
