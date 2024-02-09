# don't forget values

https://landscape.cncf.io/
https://artifacthub.io/packages/helm/bitnami/nginx
https://artifacthub.io/packages/helm/bitnami/nginx

helm search hub mongodb

helm repo add bitnami https://charts.bitnami.com/bitnami
helm show values bitnami/mongodb

https://artifacthub.io/packages/helm/bitnami/mongodb

## install with values

helm install -f mongo-values.yaml bitnami/mongodb --generate-name

## update release

helm upgrade -f mongo-values.yaml mongodb bitnami/mongodb

## rollback

helm history mongodb-1707316204
helm rollback mongodb-1707316204 1
Rollback was a success! Happy Helming!

see --timeout --wait

## list

helm list --all
helm uninstall --keep-history

## create chart

retrieve chart values.

faire confiance au chart
helm create nginx-chart
helm install nginx-dev --15.10.3 ./nginx-chart -f values-dev.yaml
helm install nginx-prod ./nginx-chart -f values-prod.yaml
helm install mon-installation ./mon-chart-simple
helm upgrade mon-installation ./mon-chart-simple
helm rollback mon-installation 1
helm uninstall mon-installation
