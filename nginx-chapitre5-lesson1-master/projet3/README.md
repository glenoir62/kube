kubectl apply -f mon-deploiement.yaml
kubectl apply -f mon-service.yaml
minikube service projet1-html-service

kubectl rollout restart deployment/projet1-html-deployment