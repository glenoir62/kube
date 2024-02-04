kubectl config use-context minikube
kubectl apply -f mon-deploiement.yaml
kubectl get pods
nginx-deployment-5c646db7b-fx85n 0/1 CrashLoopBackOff 4 (10s ago) 86s
