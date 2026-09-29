- LoadBalancer Service

Access URL (kind/OrbStack — no MetalLB):
```
http://192.168.156.2:30080
```

192.168.156.2 is the kind node INTERNAL-IP from `kubectl get nodes -o wide`. The cluster runs inside an OrbStack VM (not the Mac), so `localhost:30080` fails — target the node IP directly.

Service status to expect:
```
NAME                 TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)
nginx-loadbalancer   LoadBalancer   10.96.x.x      <pending>     80:30080/TCP
```

EXTERNAL-IP is `<pending>` by default because kind does NOT ship a LoadBalancer controller. In this state a LoadBalancer service behaves exactly like a NodePort service — it auto-picks (or you pin) a `nodePort` and you hit nodeIP:nodePort.

Three port fields in [service.yml](file:///Users/rasel/project/kubernets/6.deploy-loadbalancer-service/service.yml):
- `port: 80`       — cluster-internal port (for pod-to-pod via ClusterIP)
- `targetPort: 80` — container port on the nginx pod
- `nodePort: 30080`— static port on the node (30000–32767); omit to let k8s assign randomly

To get a REAL LoadBalancer with an EXTERNAL-IP (optional): install MetalLB then apply an IP pool in the same subnet as the node.

```bash
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.14.9/config/manifests/metallb-native.yaml
kubectl wait --namespace metallb-system --for=condition=ready pod --label=app=metallb --timeout=90s
```

Then create a pool (example for 192.168.156.x):

```yaml
apiVersion: metallb.io/v1beta1
kind: IPAddressPool
metadata:
  name: kind-pool
  namespace: metallb-system
spec:
  addresses:
  - 192.168.156.100-192.168.156.150
---
apiVersion: metallb.io/v1beta1
kind: L2Advertisement
metadata:
  name: kind-l2
  namespace: metallb-system
```

After MetalLB, EXTERNAL-IP will be set (e.g. 192.168.156.100) and nginx is reachable on port 80 directly — no nodePort in the URL.
