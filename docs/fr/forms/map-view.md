---
title: Explorer les données sur une carte
description: Comment utiliser la vue carte pour visualiser et filtrer géographiquement les soumissions de formulaires.
---

# Explorer les données sur une carte

La Vue Carte affiche toutes les soumissions d'un formulaire sur une carte interactive. Les soumissions sont affichées sous forme de marqueurs, qui sont regroupés en clusters lorsque de nombreux points sont proches les uns des autres. Vous pouvez utiliser les filtres à gauche pour affiner les données affichées.

![Explorer les données sur une carte](../imgs/forms/map-view.png)

## Utiliser la carte

1.  **Naviguer sur la carte** :
    *   **Déplacer** : Cliquez et faites glisser la carte pour la déplacer.
    *   **Zoomer** : Utilisez la molette de votre souris ou les boutons `+` (zoom avant) et `-` (zoom arrière) dans le coin inférieur droit de la carte.
2.  **Voir les détails d'une soumission** :
    *   **Cliquez sur un cluster** pour zoomer et le diviser en marqueurs individuels.
    *   **Cliquez sur un marqueur unique** pour ouvrir une fenêtre contextuelle avec les détails de cette soumission spécifique, tels que l'emplacement et les données clés du formulaire.

!!! tip "Trouver vos données"
    Lorsque vous ouvrez la carte pour la première fois, elle zoomera et se centrera automatiquement pour afficher toutes les soumissions disponibles pour le formulaire actuel.

## Filtrer les soumissions sur la carte

Un panneau de filtres sur le côté gauche vous permet de restreindre les soumissions affichées sur la carte.

1.  **Définir une plage de dates** :
    *   Utilisez le sélecteur **Plage de dates** pour choisir une date de début ("Date de début") et une date de fin ("Date de fin"). Seules les soumissions créées dans cette période seront affichées.

2.  **Filtrer par données du formulaire** :
    *   Des champs de filtre supplémentaires (comme Zone, Cas, Organisation ou Projet) apparaissent en fonction du schéma du formulaire et des données collectées.
    *   Cliquez dans un champ de filtre pour voir une liste de saisie automatique de toutes les valeurs existantes pour ce champ dans vos données.
    *   Commencez à taper pour affiner la liste, ou sélectionnez une valeur spécifique dans la liste déroulante.

3.  **Appliquer vos filtres** :
    *   Après avoir défini votre plage de dates et tout autre filtre, cliquez sur le bouton **Appliquer les filtres**.
    *   La carte se rafraîchira, n'affichant que les marqueurs correspondant à tous vos critères sélectionnés. La carte se recentrera également pour s'adapter aux résultats filtrés.

!!! warning "Effacer les filtres"
    Pour effacer un filtre de texte, cliquez sur l'icône `X` à l'intérieur de son champ. Pour effacer la plage de dates, supprimez le texte dans les champs de date. Vous devez cliquer sur **Appliquer les filtres** après avoir effacé pour que les modifications prennent effet.