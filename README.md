# Roulem Baitiche — Portfolio

Portfolio personnel clair, blanc et noir, français / anglais, en HTML, CSS et JavaScript. Aucune installation ni compilation nécessaire.

## Aperçu local

Depuis ce dossier :

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Puis ouvrir http://127.0.0.1:4173.

## Contenu et personnalisation

- `index.html` : contenu français et traductions anglaises (`data-en`).
- `styles.css` : identité visuelle, menus en verre liquide, responsive et réduction des animations.
- `script.js` : langue, menu mobile, progression de lecture et fiches projets bilingues.
- `assets/` : visuels repris du portfolio d’origine, capture publique de SecureDash et favicon.

Les informations proviennent du profil fourni, du précédent portfolio et des descriptions des dépôts publics de Roulem. Les réalisations présentées sont SecureDash, Dashboard Artisan et Cyber Threat Intelligence. Les deux expériences techniques, les emplois précédents, la formation et les engagements bénévoles sont inclus.

La version publique du Dashboard Artisan contient des données fictives et n’accède pas à la base Firebase interne. SecureDash est présenté comme un prototype pédagogique.

Le CV et l’adresse e-mail ne sont pas ajoutés : aucun fichier CV ni adresse de contact à publier n’a été fourni. Le contact passe par le profil LinkedIn fourni. Aucune photo de profil de remplacement ni statistique personnelle n’est inventée.

## Navigation et accessibilité

Menu en verre liquide avec reflet suivant le pointeur ; élément actif au défilement ; barre de progression supérieure ; repère de lecture latéral ; menu mobile ; lien d’évitement ; navigation clavier ; fiches projets en dialogue natif (Échap pour fermer) ; respect de `prefers-reduced-motion`. La préférence de langue est enregistrée localement, sans suivi analytique.

Les polices sont chargées depuis Google Fonts ; une police système prend le relais si le service est indisponible. Le contenu français reste lisible sans JavaScript ; les liens directs vers les dépôts fonctionnent également.

## Hébergement

Le dossier peut être servi tel quel par un hébergeur de sites statiques. Les chemins relatifs fonctionnent aussi dans le sous-dossier `/portofolio_reel/`.

Ce dépôt étant privé à sa création, aucun changement de visibilité ni publication publique n’est effectué automatiquement. Le site ChatGPT d’origine n’est pas modifié.

## Direction visuelle

Structure inspirée du portfolio de Gaël Le Reun, avec une réalisation originale. Menus, reflet interactif, image d’accueil et indicateur de défilement adaptés du portfolio précédent de Roulem. Les contenus, photos et fichiers personnels de Gaël ne sont pas réutilisés.
