- apply the deployment yaml file to create a deployment with 3 nginx replica pods
```
kubectl apply -f deploy.yml
```

- Expose the deployment to the cluster on port 80
```
kubectl expose deployment nginx-deployment --type=ClusterIP --port=80
```

- Get all the services
```
kubectl get svc
```
- Describe the service
```
kubectl describe svc nginx-deployment
```

- Port Forwarding
```
kubectl port-forward svc/nginx-deployment 8080:80

or - in the background
kubectl port-forward svc/nginx-deployment 8080:80 &
```
- Kill port
```
pnpx kill-port 8080
or
lsof -ti:8080 | xargs kill
```