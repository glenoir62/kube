# Utilisez l'image officielle nginx alpine stable
FROM nginx:alpine

# Copiez le fichier de configuration nginx à l'emplacement approprié
COPY nginx.conf /etc/nginx/nginx.conf

# Copiez vos fichiers html et css dans le dossier de contenu
COPY html /usr/share/nginx/html

EXPOSE 80
