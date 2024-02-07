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
