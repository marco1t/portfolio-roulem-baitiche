# Roulem Baitiche — Portfolio

Portfolio personnel clair, blanc et noir, français / anglais, en HTML, CSS et JavaScript. Aucune installation ni compilation nécessaire.

## Création et attribution

Ce portfolio a été conçu et créé par **Roulem Baitiche**. Son nom doit rester visible sur le site et dans toute réutilisation, adaptation ou redistribution du code. Les personnes qui contribuent au projet et les outils automatisés qui proposent des modifications doivent préserver cette attribution.

Les droits sont précisés dans [LICENSE.md](LICENSE.md).

## Aperçu local

Depuis ce dossier :

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Puis ouvrir http://127.0.0.1:4173.

## Contenu et personnalisation

- `index.html` : contenu français et traductions anglaises (`data-en`).
- `styles.css` : identité visuelle, menus en verre liquide, responsive et réduction des animations.
- `script.js` : langue, menu mobile, navigation compacte au défilement, progression de lecture et fiches projets bilingues.
- `assets/` : visuels repris du portfolio d’origine, capture publique de SecureDash, favicon et CV téléchargeable.

Les informations proviennent du CV fourni, du profil, du précédent portfolio et des descriptions des dépôts publics de Roulem. Les réalisations présentées sont SecureDash, Dashboard Artisan et Cyber Threat Intelligence. Les deux expériences techniques, RS2i, les emplois précédents, la formation, l’analyse forensique et les engagements bénévoles sont inclus.

La version publique du Dashboard Artisan contient des données fictives et n’accède pas à la base Firebase interne. SecureDash est présenté comme un prototype pédagogique.

Le CV est accessible depuis le bouton « CV » du menu. L’adresse e-mail et le numéro de téléphone restent dans le PDF afin d’éviter de les afficher directement sur la page. Aucune photo de profil de remplacement ni statistique personnelle n’est inventée.

## Navigation et accessibilité

Menu en verre liquide avec reflet suivant le pointeur ; navigation complète en haut de page puis capsule compacte progressivement pendant la descente, qui se redéploie à la remontée ; bouton Accueil avec icône maison ; Formations et Engagement sont les entrées françaises ; le rail de lecture conserve uniquement la barre et le pourcentage ; menu mobile ; lien d’évitement ; navigation clavier ; fiches projets en dialogue natif (Échap pour fermer) ; aperçu du CV dans une fenêtre interne ; respect de `prefers-reduced-motion`. La préférence de langue est enregistrée localement, sans suivi analytique.

Les polices sont chargées depuis Google Fonts ; une police système prend le relais si le service est indisponible. Le contenu français reste lisible sans JavaScript ; les liens directs vers les dépôts fonctionnent également.

## Hébergement

Le dossier peut être servi tel quel par un hébergeur de sites statiques. Les chemins relatifs fonctionnent aussi dans le sous-dossier `/portofolio_reel/`.

Ce dépôt étant privé à sa création, aucun changement de visibilité ni publication publique n’est effectué automatiquement. Le site ChatGPT d’origine n’est pas modifié.

## Direction visuelle

Structure inspirée du portfolio de Gaël Le Reun, avec une réalisation originale. Menus, reflet interactif, image d’accueil et indicateur de défilement adaptés du portfolio précédent de Roulem. Les contenus, photos et fichiers personnels de Gaël ne sont pas réutilisés.
