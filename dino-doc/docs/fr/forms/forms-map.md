---
title: Carte des formulaires
description: Visualisez les soumissions de formulaires sur une carte interactive avec des options de filtrage.
---

# Carte des formulaires

La page Carte des formulaires affiche vos soumissions de formulaires sur une carte interactive, vous permettant de visualiser les données géographiquement. Vous pouvez filtrer les soumissions par date et par champs de données spécifiques pour vous concentrer sur les informations dont vous avez besoin.

![Main view of the Forms Map page](../imgs/forms/forms-map.png)

La page se compose de deux zones principales :

* **La carte** : une carte interactive montrant des marqueurs regroupés pour chaque soumission. Chaque marqueur est placé en fonction des données de localisation dans la soumission.
* **Le panneau de filtres** : un ensemble de contrôles sur le côté pour filtrer les données affichées sur la carte.

## Affichage des détails de la soumission

Chaque marqueur sur la carte représente une ou plusieurs soumissions à un emplacement spécifique.

1. Cliquez sur un marqueur pour ouvrir sa fenêtre contextuelle.
2. La fenêtre contextuelle affiche le nom du lieu et les valeurs des champs de données clés de cette soumission.

## Filtrer les soumissions sur la carte

Utilisez les filtres pour réduire le nombre de soumissions affichées sur la carte.

### 1. Filtrer par plage de dates

1. Dans le champ **Plage de dates**, cliquez sur l'icône du calendrier.
2. Sélectionnez une date de début et une date de fin dans le sélecteur de dates.

### 2. Filtrer par champs de données

Sous le sélecteur de dates, vous verrez plusieurs champs de saisie de texte. Chaque champ correspond à une colonne de données de votre formulaire (par exemple, « Point de soins », « Nationalité »).

1. Cliquez sur un champ (par exemple, « Nationalité »).
2. Commencez à taper. Une liste déroulante affichera les valeurs correspondantes de vos données existantes.
3. Vous pouvez soit sélectionner une valeur dans la liste, soit saisir votre propre texte pour filtrer les soumissions contenant ce texte.
4. Pour effacer un filtre, cliquez sur l'icône **X** qui apparaît dans le champ.

!!! tip "Utilisation de plusieurs filtres"
    Vous pouvez appliquer des filtres sur plusieurs champs simultanément. La carte n'affichera que les soumissions qui correspondent **à tous** les critères de filtre actifs.

### 3. Appliquer vos filtres

Après avoir défini votre plage de dates et vos filtres de champ, cliquez sur le bouton **Appliquer les filtres**.

La carte se mettra à jour, n'affichant que les marqueurs des soumissions correspondant à tous vos critères sélectionnés. La vue de la carte zoomera également automatiquement pour s'adapter aux marqueurs filtrés.

!!! warning "Données de localisation requises"
    Les soumissions ne peuvent apparaître sur la carte que si elles ont des coordonnées géographiques valides associées à leur emplacement. Les soumissions sans ces données ne seront pas affichées.