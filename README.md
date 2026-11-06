# HORS CHAMP — Drop 01 · Outside System

Landing page de l'atelier Jedha « Product Building End to End — D4 ». Vite + HTML/CSS/JS, sans backend.

## Arborescence

```
hors-champs-jedha/
├── index.html        # Coquille HTML + Google Fonts
├── content.yaml      # Source de vérité éditoriale (textes, produits, CTA)
├── DESIGN.md         # Source de vérité visuelle (palette, typo, grille, règles)
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
cd hors-champs-jedha
npm install
npm run dev      # http://localhost:5173
npm run build    # génère dist/
```

Pour changer un texte, modifie `content.yaml` : la page se met à jour toute seule.

## Déploiement (VPS Hostinger)

Le workflow `.github/workflows/deploy-hors-champs.yml` construit le site et envoie `dist/` par FTP à chaque push sur `main` qui touche ce dossier.

1. Créer le sous-domaine et son dossier racine sur le VPS (et un utilisateur FTP qui y a accès).
2. Dans GitHub > Settings > Secrets and variables > Actions, ajouter `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_REMOTE_DIR` (chemin terminé par `/`).
3. Merger sur `main` (ou lancer le workflow à la main depuis l'onglet Actions).
