# Étape de construction
FROM node:lts as build

# Répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier les autres fichiers de l'application
COPY . .

# Construire l'application React
RUN npm run build

# Étape de production
FROM nginx:stable-alpine

# Copier le résultat du build dans le bon répertoire de NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Copier la configuration de NGINX
COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port 80
EXPOSE 80
