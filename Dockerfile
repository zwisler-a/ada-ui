FROM node:latest as build

WORKDIR /usr/local/app
COPY . /usr/local/app

RUN npm install
RUN npm run build

FROM nginx:latest

COPY default.conf /etc/nginx/conf.d/default.conf

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
COPY --from=build /usr/local/app/dist/ada-ui /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
