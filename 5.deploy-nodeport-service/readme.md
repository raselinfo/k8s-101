- NodePort Service
```
http://192.168.156.2:32000
```
192.168.156.2 because the cluster runs on kind inside OrbStack, so the Kubernetes node is a lightweight VM — not the Mac itself. A NodePort service binds to the node's IP, and `kubectl get nodes -o wide` shows the node's INTERNAL-IP is 192.168.156.2. Since localhost on the Mac is not the node, `http://localhost:32000` fails; you must target the node IP directly.