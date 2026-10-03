## Necessary Commands for the deployment

- Create Deployment
```
kubectl create deployment nginx-deployment --image=nginx
or
kubectl create deploy nginx-deployment --image=nginx
```

- Create Deployment with replicas
```
kubectl create deploy nginx-deployment --image=nginx --replicas=3
```

- Get all the deployments 
```
kubectl get deploy
```
- Delete Deployment
```
kubectl delete deploy nginx-deployment
```


- Scale Deployment
```
kubectl scale deploy nginx-deployment --replicas=5
```

- Describe Deployment
```
kubectl describe deploy nginx-deployment
```

- Rollout  Deployment
```
kubectl rollout restart deploy nginx-deployment
```

- Rollback Deployment
```
kubectl rollout undo deploy nginx-deployment
```

- Rollout History
```
kubectl rollout history deploy nginx-deployment
```

- Reload the deployment after changing someting on deployment yaml file
```
kubectl rollout restart deployment nginx-deployment
```