#!/bin/bash

# Nom du secret Kubernetes
SECRET_NAME="jwt-secret"

# Génération de la paire de clés RSA
openssl genpkey -algorithm RSA -out private_key.pem
openssl rsa -pubout -in private_key.pem -out public_key.pem

# Création du secret Kubernetes avec les clés générées
kubectl create secret generic $SECRET_NAME \
  --from-file=private_key.pem \
  --from-file=public_key.pem 

# Suppression des clés du disque local pour des raisons de sécurité
rm -f private_key.pem public_key.pem

echo "Secret Kubernetes $SECRET_NAME créé avec succès !"