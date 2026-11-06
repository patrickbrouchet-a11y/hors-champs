# Déployer HORS CHAMP sur le VPS Hostinger

Cible : **https://horschamps.patrick-brouchet.cloud**, servi par Nginx sur un VPS Ubuntu 26.04, mis à jour automatiquement par GitHub Actions (SSH + rsync) à chaque merge sur `main`.

Remplace `IP_DU_VPS` par l'adresse IP affichée dans hPanel → **VPS → Vue d'ensemble**.

---

## 1. Créer le sous-domaine (DNS, dans hPanel)

1. hPanel → **Domaines** → `patrick-brouchet.cloud` → **DNS / Serveurs de noms**.
2. **Ajouter un enregistrement** :
   - Type : `A`
   - Nom : `horschamps`
   - Pointe vers : `IP_DU_VPS`
   - TTL : par défaut
3. Vérifie depuis ton ordinateur (après quelques minutes) :
   ```bash
   nslookup horschamps.patrick-brouchet.cloud
   ```
   La réponse doit afficher l'IP du VPS.

## 2. Préparer le serveur (une seule fois)

Connecte-toi en root (mot de passe ou clé définis dans hPanel → VPS → **Paramètres SSH**) :

```bash
ssh root@IP_DU_VPS
```

Installe Nginx, rsync et Certbot, puis ouvre le pare-feu :

```bash
apt update && apt upgrade -y
apt install -y nginx rsync certbot python3-certbot-nginx
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
```

Crée un utilisateur dédié au déploiement et le dossier du site :

```bash
adduser --disabled-password --gecos "" deploy
mkdir -p /var/www/horschamps
chown -R deploy:deploy /var/www/horschamps
chmod 755 /var/www/horschamps
```

## 3. Déclarer le site dans Nginx

```bash
cat > /etc/nginx/sites-available/horschamps <<'NGINX'
server {
    listen 80;
    listen [::]:80;
    server_name horschamps.patrick-brouchet.cloud;

    root /var/www/horschamps;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Les fichiers de dist/assets ont un hash dans leur nom : cache long
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
NGINX

ln -s /etc/nginx/sites-available/horschamps /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

## 4. Activer le HTTPS (Let's Encrypt)

Une fois le DNS propagé (étape 1) :

```bash
certbot --nginx -d horschamps.patrick-brouchet.cloud
```

Accepte la redirection HTTP → HTTPS. Le renouvellement est automatique.

## 5. Créer la clé SSH de déploiement

**Sur ton ordinateur** (pas sur le VPS) :

```bash
ssh-keygen -t ed25519 -f ~/.ssh/horschamps_deploy -N "" -C "github-actions-horschamps"
cat ~/.ssh/horschamps_deploy.pub
```

Copie la ligne affichée, puis **sur le VPS** (en root) :

```bash
mkdir -p /home/deploy/.ssh
echo "COLLE_ICI_LA_CLE_PUBLIQUE" >> /home/deploy/.ssh/authorized_keys
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys
```

Test depuis ton ordinateur :

```bash
ssh -i ~/.ssh/horschamps_deploy deploy@IP_DU_VPS "ls /var/www/horschamps"
```

Récupère aussi l'empreinte du serveur (pour le secret `SSH_KNOWN_HOSTS`) :

```bash
ssh-keyscan -t ed25519 IP_DU_VPS
```

## 6. Ajouter les secrets dans GitHub

Dépôt `PBuilder_Jehda` → **Settings → Secrets and variables → Actions → New repository secret** :

| Nom               | Valeur                                                             |
| ----------------- | ------------------------------------------------------------------ |
| `SSH_HOST`        | `IP_DU_VPS`                                                        |
| `SSH_USER`        | `deploy`                                                           |
| `SSH_PRIVATE_KEY` | tout le contenu de `~/.ssh/horschamps_deploy` (la clé **privée**)  |
| `SSH_KNOWN_HOSTS` | la ligne renvoyée par `ssh-keyscan` à l'étape 5                    |

Ne partage jamais la clé privée ailleurs que dans ce secret.

## 7. Déployer

Merge la PR sur `main` (ou onglet **Actions → Deploy hors-champs-jedha → Run workflow**). Le workflow construit le site, puis synchronise `dist/` vers `/var/www/horschamps/`.

Ouvre https://horschamps.patrick-brouchet.cloud pour vérifier.

## En cas de problème

| Symptôme                             | Piste                                                                 |
| ------------------------------------ | --------------------------------------------------------------------- |
| `Permission denied (publickey)`      | clé publique mal collée dans `authorized_keys`, ou droits incorrects  |
| `Host key verification failed`       | secret `SSH_KNOWN_HOSTS` vide ou IP différente                        |
| Page Nginx « Welcome »               | le site par défaut répond : vérifier `server_name` et `nginx -t`      |
| Certbot échoue                       | DNS pas encore propagé, ou port 80 fermé dans le pare-feu             |
