# Private Image Notes

App image: `raselstacklearner/privet-k8s-image` (private Docker Hub repo)

---

## Two ways to get a private image into kind

| Way | When to use |
|---|---|
| `imagePullSecrets` (regcred) | Production-style — kubelet pulls from Docker Hub |
| `kind load docker-image` | Local dev shortcut — skip the registry entirely |

---

## Way 1: Pull from registry (imagePullSecrets)

### 1. Create a Docker Hub PAT

Docker Hub → Account Settings → Security → Access Tokens → **Read-only** token

### 2. Create the registry secret (once)

```bash
kubectl create secret docker-registry regcred \
  --docker-server=https://index.docker.io/v1/ \
  --docker-username=raselstacklearner \
  --docker-password=<PAT> \
  --docker-email=<email>
```
Verify the secret connection:

```bash
kubectl get secret regcred
```

### 3. Attach it to the ServiceAccount

`k8s/serviceaccount.yaml` (already done):

```yaml
imagePullSecrets:
  - name: regcred
```

### 4. Point the deployment at the private image

`k8s/deployment.yaml` (already done):

```yaml
image: raselstacklearner/privet-k8s-image:latest
imagePullPolicy: Always
```

### 5. Apply + verify

```bash
kubectl apply -k k8s/
kubectl rollout restart deploy express-deploy

kubectl get pods                          # no ImagePullBackOff = works
kubectl describe pod <pod> | grep -A5 Events   # "Successfully pulled image"
```

Flow: kubelet → pod's SA (`express-sa`) → `regcred` → Docker Hub login → pull.

---

## Way 2: kind load (local dev, no registry involved)

```bash
docker build -t k8s-101-deploy-app:latest .
kind load docker-image k8s-101-deploy-app:latest --name multi-node
```

Then in deployment.yaml:

```yaml
image: k8s-101-deploy-app:latest
imagePullPolicy: IfNotPresent   # use the local image, don't pull
```

No secret needed — the image is already on the node.

---

## Switching between the two

| Switching to | Change |
|---|---|
| Registry image | `image: raselstacklearner/privet-k8s-image:latest` + `imagePullPolicy: Always` |
| Local kind image | `image: k8s-101-deploy-app:latest` + `imagePullPolicy: IfNotPresent` |

---

## Gotchas

- `regcred` is cluster-side only — never commit the PAT anywhere
- Docker Hub rate-limits anonymous pulls; regcred also fixes that for public images
- If you see `ErrImagePull` / `ImagePullBackOff`: `kubectl describe pod <pod>` → Events tells you if it's auth (bad PAT) or not-found (wrong image name/tag)
- Private repo must have the tag you reference — `:latest` means you must push `latest` explicitly
