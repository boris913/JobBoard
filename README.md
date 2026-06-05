# JobBoard — Produit Complet

## Structure du produit

```
src/
  app/
    page.tsx              → Landing page (marketing)
    offres/
      page.tsx            → Dashboard des offres (existant déplacé)
    features/
      page.tsx            → Page fonctionnalités
    about/
      page.tsx            → Page à propos
    contact/
      page.tsx            → Page contact
    layout.tsx            → Root layout (metadata mises à jour)
  components/
    layout/
      Header.tsx          → Navigation complète (desktop + mobile)
      Footer.tsx          → Footer enrichi avec liens
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page avec Hero, Features, How it works, Stats, Testimonials, Pricing, FAQ, CTA |
| `/offres` | Dashboard d'offres avec filtres, tri, pagination, grille/liste + upload JSON |
| `/features` | Détail des fonctionnalités et specs techniques |
| `/about` | Mission, valeurs, équipe |
| `/contact` | Formulaire de contact + infos |

## Installation

1. Remplacez les fichiers existants par ceux fournis
2. Assurez-vous que `lucide-react` et `framer-motion` sont installés (déjà dans votre package.json)
3. Lancez `npm run dev`

## Notes

- Le Header remplace l'ancien composant statique par une navigation responsive complète
- La landing page utilise Framer Motion pour les animations au scroll
- Le formulaire de contact est en mode simulation (frontend only)
- Les liens "bientôt disponible" sont désactivés visuellement
