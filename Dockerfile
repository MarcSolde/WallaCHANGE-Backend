FROM node:7-alpine

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
VOLUME /root/uploads/profile:/app/uploads/profile
VOLUME /root/uploads/elements:/app/uploads/elements
CMD ["node", "server.js", "server"]
