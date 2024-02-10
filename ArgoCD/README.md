On gke
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl get all -n argocd

Install CLI
brew install argocd
https://argo-cd.readthedocs.io/en/stable/cli_installation/
kubectl port-forward svc/argocd-server -n argocd 8080:443