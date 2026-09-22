---
title: Carte des formulaires
description: Visualisez les soumissions de formulaire sur une carte interactive avec des options de filtrage.
---

# Carte des formulaires

La page Carte des formulaires affiche vos soumissions de formulaire sur une carte interactive, ce qui vous permet de visualiser les données géographiquement. Vous pouvez filtrer les soumissions par date et par champs de données spécifiques afin de vous concentrer sur les informations dont vous avez besoin.

Cette fonctionnalité n'est disponible que si la métrique de localisation est active sur ce form schema. De plus, pour chaque localisation, l'attribut coordinates doit être renseigné.

![Main view of the Forms Map page](../imgs/forms/forms-map.png)

La page se compose de deux zones principales :

*   **La carte** : une carte interactive affichant des marqueurs regroupés pour chaque soumission. Chaque marqueur est positionné en fonction des données de localisation de la soumission.
*   **Le panneau de filtres** : un ensemble de contrôles placés sur le côté pour filtrer les données affichées sur la carte.

## Afficher les détails d'une soumission

Chaque marqueur sur la carte représente une ou plusieurs soumissions à une localisation donnée.

1.  Cliquez sur un marqueur pour ouvrir sa fenêtre contextuelle.
2.  La fenêtre contextuelle affiche le nom de la localisation ainsi que les valeurs des principaux champs de données de cette soumission.

## Filtrer les soumissions sur la carte

Utilisez les filtres pour restreindre les soumissions qui apparaissent sur la carte.

### 1. Filtrer par plage de dates

1.  Dans le champ **Plage de dates**, cliquez sur l'icône du calendrier.
2.  Sélectionnez une date de début et une date de fin dans le sélecteur de dates.

### 2. Filtrer par champs de données

Sous le sélecteur de dates, vous verrez plusieurs champs de saisie de texte. Chaque champ correspond à une colonne de données de votre formulaire (par exemple « Lieu de prise en charge », « Nationalité »).

1.  Cliquez dans l'un des champs (par exemple « Nationalité »).
2.  Commencez à saisir du texte. Une liste déroulante affichera les valeurs correspondantes issues de vos données existantes.
3.  Vous pouvez soit sélectionner une valeur dans la liste, soit saisir votre propre texte pour filtrer les soumissions contenant ce texte.
4.  Pour effacer un filtre, cliquez sur l'icône **X** qui apparaît dans le champ.

!!! tip "Utiliser plusieurs filtres"
    Vous pouvez appliquer des filtres sur plusieurs champs simultanément. La carte n'affichera que les soumissions correspondant à **tous** les critères de filtre actifs.

### 3. Appliquer vos filtres

Après avoir défini votre plage de dates et vos filtres de champs, cliquez sur le bouton **Appliquer les filtres**.

La carte s'actualisera et n'affichera que les marqueurs des soumissions correspondant à tous les critères que vous avez sélectionnés. La vue de la carte zoomera également automatiquement pour cadrer les marqueurs filtrés.

!!! warning "Données de localisation requises"
    Les soumissions ne peuvent apparaître sur la carte que si des coordonnées géographiques valides sont associées à leur localisation. Les soumissions dépourvues de ces données ne seront pas affichées.