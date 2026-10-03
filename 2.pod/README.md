
- Run a pod
```
kubectl run --image=nginx nginx-pod-name
```
- Get all the pods
```
kubectl get pods
kubectl get pods --show-labels
kubectl get pods -o wide
```

- List Pod with Watch Mode
```
kubectl get pods -w
```

- show the logs
```
kubectl logs nginx-pod-name
kubectl logs -f nginx-pod-name
```
- Get Metadata
```
kubectl describe pod nginx-pod-name
kubectl describe pod/nginx-pod-name
```
- Generate a yaml file from a running pod
```
kubectl get pod nginx-pod-name -o yaml
``` 


### Declarative way to create a pod
- Create a pod form yaml file
```
kubectl create -f pod.yml
kubectl apply -f pod.yml
```
- you can edit the pod yaml from the command line
```
kubectl edit pod nginx-pod-2
```

### Exec command in a pod
```
kubectl exec -it nginx-pod-name -- bash
```

