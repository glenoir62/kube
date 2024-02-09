FROM node:lts
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=80
EXPOSE 80
CMD [ "node", "index.js" ]

## docker buildx create --use --platform=linux/arm64,linux/amd64 --name multi-platform-builder
## docker buildx inspect --bootstrap
## docker build -t gleo50/projet5-node . --platform=linux/amd64,linux/arm64
## docker push gleo50/projet5-node