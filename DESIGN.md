# DESIGN.md — HORS CHAMP · Drop 01

Source de vérité visuelle de la landing. Les textes vivent dans `content.yaml`.

## Direction

**Quiet utility × worn precision**

Parisian restraint × elevated essentials × worn-in imperfection × technical protection × old-school futurism.

La page exprime une attitude avant de décorer : calme, précise, éditoriale, urbaine. Elle ne doit ressembler ni à un site SaaS, ni à une boutique e-commerce générique, ni à une marque de luxe classique, ni copier A.P.C., Fear of God, Golden Goose, New Balance ou Yeezy.

## Palette

| Token      | Hex       | Usage                                              |
| ---------- | --------- | -------------------------------------------------- |
| `--chalk`    | `#E8E7E2` | Fond principal, texte sur fond sombre              |
| `--carbon`   | `#151515` | Texte principal, sections sombres                  |
| `--concrete` | `#898985` | Texte secondaire, labels, bordures                 |
| `--steel`    | `#B8BBB7` | Placeholders d'image, séparateurs                  |
| `--signal`   | `#D6FF3F` | Accent rare : CTA principal, indicateur de statut  |
| `--rust`     | `#8D4936` | Accent de patine, très ponctuel                    |

Règle : le Signal reste rare (un seul usage fort par écran). Le Rust n'apparaît qu'en détail.

## Typographie (Google Fonts)

| Rôle    | Police            | Style                                   |
| ------- | ----------------- | --------------------------------------- |
| Titres  | Barlow Condensed  | 600–700, uppercase, interlignage serré  |
| Textes  | Inter             | 400–500, neutre                         |
| Labels  | IBM Plex Mono     | 400–500, uppercase, lettrage espacé     |

## Grille et espacements

- Mobile-first, une colonne ; 2 colonnes dès 720px ; 4 colonnes produits dès 1024px.
- Largeur max du contenu : 1440px, marges latérales 16px (mobile) à 40px (desktop).
- Espacements sur une échelle de 8px.
- Bordures fines 1px, angles droits (pas de radius).

## Images

Aucune image réelle fournie pour l'instant : on utilise des **placeholders** clairement identifiés (bloc Steel/Concrete avec grain et légende en mono). Ne jamais présenter une image générée comme une photo réelle de la marque.

Direction pour les futures photos : silhouettes en mouvement, cadrages partiels, détails de matière, flash direct ou lumière froide, béton, métal, bitume, vestiaires, imperfections visibles. Éviter les shootings trop propres ou trop luxueux.

## Interdits

Pas de backend, pas de paiement, pas de compte, pas de faux stock, pas de faux prix, pas de faux avis, pas de fausse rareté ni de fausse urgence (aucun compte à rebours). Le formulaire est visuel uniquement.
