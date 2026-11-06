# HORS CHAMP — Drop 01 · Outside System

Landing page de l'atelier Jedha « Product Building End to End — D4 ». Vite + HTML/CSS/JS, sans backend.

## Arborescence

```
hors-champs/
├── index.html        # Coquille HTML + Google Fonts
├── content.yaml      # Source de vérité éditoriale (textes, produits, CTA)
├── DESIGN.md         # Source de vérité visuelle (palette, typo, grille, règles)
├── DEPLOY.md         # Guide de déploiement sur le VPS
├── vite.config.js    # Config Vite + petit plugin pour importer le YAML
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.js       # Génère les 9 sections à partir de content.yaml
    └── style.css     # Styles mobile-first (tokens de DESIGN.md)
```

## En local

```bash
cd hors-champs
npm install
npm run dev      # http://localhost:5173
npm run build    # génère dist/
```

Pour changer un texte, modifie `content.yaml` : la page se met à jour toute seule.

## Déploiement (VPS Hostinger, Docker + Traefik)

Site : https://horschamps.patrick-brouchet.cloud

À chaque push sur `main`, le workflow `.github/workflows/deploy.yml` vérifie le build puis demande au VPS de reconstruire le conteneur Docker `horschamps` depuis ce dépôt (`Dockerfile` + `docker-compose.yml`). Traefik gère le routage et le HTTPS.

Détails, secret à créer et dépannage : voir [DEPLOY.md](DEPLOY.md).
