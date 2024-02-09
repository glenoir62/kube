FROM node:lts
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=80
EXPOSE 80
CMD [ "node", "index.js" ]

## docker build -t gleo50/projet5-node .
## docker push gleo50/projet5-node