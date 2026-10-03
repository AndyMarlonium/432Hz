# Diapason Solfeggio

Lecteur de musique dans le navigateur pour comparer l'accordage standard (La = 440 Hz), le 432 Hz et les neuf fréquences Solfeggio (174, 285, 396, 417, 528, 639, 741, 852, 963 Hz).

## Fonctions

- Import de plusieurs MP3 et playlist (ajout, retrait, vidage)
- Boucle : aucune, morceau ou album
- Bascule instantanée entre les fréquences pendant la lecture
- Bouton « Original ⇄ choix » pour comparer à l'oreille
- Ton pur (sinusoïde) à la fréquence choisie, avec ou sans morceau
- Spectre en direct, thème clair et sombre
- Installable comme application, utilisable sans connexion

## Comment l'accordage est appliqué

Chaque fréquence est appliquée à la note la plus proche de la gamme à 440 Hz. Le morceau est transposé de quelques cents au plus (jamais plus de 50), et le tempo varie dans la même proportion, comme sur un disque vinyle.

Les vertus associées aux fréquences Solfeggio sont des attributions traditionnelles, sans preuve scientifique.

## Installation en local

L'application est une PWA : après une première visite en ligne, elle se met en cache et fonctionne sans connexion.

- **Chrome, Edge, Android** : bouton « Installer l'application » en haut de la page, ou icône d'installation dans la barre d'adresse.
- **iPhone et iPad (Safari)** : Partager, puis « Sur l'écran d'accueil ».
- **Firefox** : pas d'installation, mais la page reste disponible hors connexion après la première visite.

Les MP3 restent dans le navigateur, rien n'est envoyé.

## Fichiers

| Fichier | Rôle |
| --- | --- |
| `index.html` | L'application complète |
| `manifest.webmanifest` | Nom, couleurs et icônes pour l'installation |
| `sw.js` | Cache hors connexion (service worker) |
| `icon.svg`, `icon-192.png`, `icon-512.png` | Icônes |

## Publication

GitHub Pages : Settings, Pages, « Deploy from a branch », branche `main`, dossier `/ (root)`. La page doit être servie en HTTPS (c'est le cas sur `github.io`) pour que l'installation soit proposée.

Pour publier une mise à jour du fichier `index.html` aux utilisateurs déjà installés, change `VERSION` dans `sw.js` (par exemple `diapason-v2`).
