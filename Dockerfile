FROM node:4.4
EXPOSE 3000
COPY . /app
WORKDIR /app
VOLUME /root/images/users:/images/users
VOLUME /root/images/prods:/images/prods
CMD ["node", "server.js", "server"]
