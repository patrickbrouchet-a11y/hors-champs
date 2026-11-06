# Déployer HORS CHAMP sur le VPS Hostinger

Cible : **https://horschamps.patrick-brouchet.cloud** (DNS : enregistrement A `horschamps` → `2.24.140.160`).

Le VPS utilise le modèle Hostinger **Ubuntu 24.04 avec Docker et Traefik** :

- **Traefik** occupe les ports 80/443, route chaque sous-domaine vers le bon conteneur et obtient les certificats HTTPS (Let's Encrypt) tout seul.
- Le site tourne dans le projet Docker **`horschamps`** (hPanel → VPS → Docker Manager). Son `docker-compose.yml` est celui de ce dépôt : l'image est construite directement depuis la branche `main` sur GitHub grâce au `Dockerfile` (build Vite, puis Nginx).

Rien à installer à la main sur le serveur (ni Nginx système, ni utilisateur `deploy`, ni clé SSH).

## Déploiement automatique

À chaque push sur `main`, le workflow `.github/workflows/deploy.yml` :

1. vérifie que le site se construit (`npm ci && npm run build`) ;
2. appelle l'API Hostinger pour **mettre à jour** le projet Docker `horschamps`, ce qui reconstruit l'image depuis `main` et relance le conteneur.

### Secret à créer (une seule fois)

1. hPanel → avatar en haut à droite → **Profil → API** → **Générer un jeton**.
2. GitHub → dépôt `hors-champs` → **Settings → Secrets and variables → Actions → New repository secret** :
   - Name : `HOSTINGER_API_TOKEN`
   - Secret : le jeton copié.

Les anciens secrets `SSH_*` ne servent plus et peuvent être supprimés.

## Déploiement manuel

hPanel → VPS → **Docker Manager** → projet `horschamps` → **Mettre à jour** (ou onglet Actions de GitHub → Deploy → Run workflow).

## Recréer le projet de zéro (après une réinstallation du VPS)

Docker Manager → **Composer** → nom `horschamps` → coller le contenu de `docker-compose.yml`, déployer, puis cliquer **Mettre à jour** pour lancer la construction de l'image.

## En cas de problème

| Symptôme                         | Piste                                                                      |
| -------------------------------- | -------------------------------------------------------------------------- |
| 404 de Traefik                   | le conteneur `horschamps` n'est pas démarré, ou le domaine des labels est différent |
| Erreur de certificat             | attendre 1–2 minutes après le premier démarrage (Let's Encrypt)            |
| Le workflow échoue sur l'API     | jeton absent, expiré ou révoqué : en recréer un dans hPanel                |
| Le site ne change pas            | vérifier que le commit est bien sur `main` sur GitHub, puis relancer la mise à jour |
