# Deploy App on Imperative Way

- 1. Load the image into the cluster
```
kind load docker-image k8s-101-deploy-app:latest --name multi-node # load image into all nodes
```

- 2. To know if the image load or not on the culster
```
docker exec -it multi-node-worker bash   # or sh

crictl images | grep k8s-101-deploy-app

```
- 3. Create a deployment
```
kubectl create deploy express-deploy --image=k8s-101-deploy-app:latest
```

- 4. Scale the deployment
```
kubectl scale deploy express-deploy --replicas=3
```


- 6. Expose the deployment to the cluster on port 4010
```
kubectl expose deployment express-deploy --type=NodePort --port=4010
```

- 5. Port Forwarding
```
kubectl port-forward svc/express-deploy 4010:4010 &
```



## Deploy the app in declarative way

- 1. Apply the deployment and service yaml files
```
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

- 2. : Find the Node IP , Get the port 
```
kubectl get nodes -o wide

and

curl http://192.168.156.3:30410/
```

- 3. Port Forwarding
```
kubectl port-forward svc/express-svc 4010:4010 &
```
