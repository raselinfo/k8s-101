# Kustomize Notes

One command manages everything: `kubectl apply -k k8s/`

---

## Setup

`k8s/kustomization.yml` is the entry point:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - configmap.yaml
  - deployment.yaml
  - service.yaml
secretGenerator:
  - name: express-env
    envs:
      - .env # gitignored, lives inside k8s/
```

---

## Commands

```bash
kubectl apply -k k8s/        # apply everything
kubectl kustomize k8s/       # preview generated YAML
kubectl diff -k k8s/         # diff vs live cluster
kubectl delete -k k8s/       # delete everything
```

---

## Changing env vars

1. Edit `k8s/.env`
2. Run `kubectl apply -k k8s/`
3. Done — pods restart automatically (new content hash → new Secret → rollout)

No `kubectl rollout restart` needed. But nothing happens until you run
the apply command — kubectl does not watch files.

---

## Changing config (ConfigMap)

Edit `k8s/configmap.yaml`, then:

```bash
kubectl apply -k k8s/
kubectl rollout restart deploy express-deploy   # configmaps don't auto-restart
```

---

## Rules

- `.env` must be inside `k8s/` — kustomize cannot read `../` paths
- Never commit `k8s/.env` (add to `.gitignore`)
- Generated Secrets get hash names: `express-env-<hash>`
