oc new-build --name vra-merdocente-web-app --binary --strategy=docker
oc start-build vra-merdocente-web-app --from-dir=. --follow
kubectl apply -f kubernetes.yaml