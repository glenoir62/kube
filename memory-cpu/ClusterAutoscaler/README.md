kubectl apply -f config.yaml

Install cluster le Metrics Server Kubernetes, CA and HPA will not be ok
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

kubectl run -it --rm load-generator --image=alpine /bin/sh
apk update && apk add --no-cache wrk

kubectl get hpa --watch

get ip php-apache
kubectl get pods -o wide

from load-generator
wrk -t4 -c1000 -d 300s http://10.244.0.60

Executing busybox-1.36.1-r15.trigger
OK: 9 MiB in 18 packages
/ # wrk -t4 -c1000 -d 300s http://10.244.0.60
Running 5m test @ http://10.244.0.60
4 threads and 1000 connections

kubectl get hpa --watch

AME REFERENCE TARGETS MINPODS MAXPODS REPLICAS AGE
php-apache Deployment/php-apache 4%/50% 1 20 1 33m
php-apache Deployment/php-apache 12%/50% 1 20 1 35m

At the end delete all

kubectl delete -f config.yaml
