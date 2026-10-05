---
title: Carte des formulaires
description: Visualisez les données de formulaires sur une carte interactive avec des options de filtrage.
---

# Carte des formulaires

La page Carte des formulaires affiche vos données de formulaires sur une carte interactive, ce qui vous permet de visualiser les informations géographiquement. Vous pouvez filtrer les données par date et par champs de données spécifiques afin de vous concentrer sur les informations dont vous avez besoin.

Cette page n'est disponible que si la métrique de localisation est active sur le form schema. De plus, chaque position doit avoir ses coordonnées renseignées.

![Vue principale de la page Carte des formulaires](../imgs/forms/forms-map.png)

La page se compose de deux zones principales :

*   **La Carte** : une carte interactive affichant des marqueurs regroupés pour chaque donnée. Chaque marqueur est placé en fonction des données de localisation de la donnée.
*   **La barre de Filtres** : un ensemble de contrôles en haut de la page pour filtrer les données affichées sur la carte.

En haut de la page, un compteur indique combien d'épingles sont actuellement tracées et combien d'éléments ont été trouvés par les filtres actifs.

!!! tip "Changer de visualisation"
    Utilisez les boutons **Données**, **Carte** et **IA** dans la barre d'outils pour passer du tableau à la carte ou à Datachat pour le même form schema. Le bouton **Carte** n'est activé que lorsque la métrique de localisation est active.

## Consulter les détails d'une donnée

Chaque marqueur sur la carte représente une ou plusieurs données à une position spécifique.

1.  Cliquez sur un marqueur pour ouvrir sa fenêtre contextuelle.
2.  La fenêtre contextuelle affiche le nom de la position suivi des valeurs des colonnes de données que vous avez affichées pour ce form.
3.  Lorsque plusieurs données partagent la même position, les marqueurs sont regroupés en un cluster. Cliquez sur le cluster pour zoomer jusqu'à ce que les marqueurs individuels apparaissent.

## Filtrer les données sur la carte

Utilisez les filtres pour réduire les données qui apparaissent sur la carte. La plupart se trouvent dans la boîte de dialogue **Filtres** : cliquez sur **Filtres** dans la barre d'outils pour l'ouvrir, définissez les filtres dans l'onglet **Simple**, puis cliquez sur **Chercher** pour les appliquer.

### 1. Filtrer par plage de dates

1.  Dans la boîte de dialogue **Filtres**, cliquez sur l'icône de calendrier du champ **De date**.
2.  Sélectionnez une date de début.
3.  Répétez l'opération pour le champ **À ce jour** afin de définir la fin de la plage.

### 2. Filtrer par champs de données

Sous les champs de date, l'onglet **Simple** affiche plusieurs champs de saisie. Chaque champ correspond à une colonne de données de votre form (par exemple, « Point of care » ou « Nationality »), et peut également inclure les champs statut, utilisateur, position, zone, cas, organisation ou projet.

1.  Cliquez dans un champ (par exemple, « Nationality »).
2.  Commencez à taper. Une liste déroulante affiche les valeurs correspondantes issues de vos données existantes.
3.  Sélectionnez une valeur dans la liste, ou saisissez votre propre texte pour filtrer les données contenant ce texte.
4.  Pour effacer un filtre, cliquez sur l'icône **X** qui apparaît à l'intérieur du champ.

Pour les champs qui acceptent plusieurs valeurs, vous pouvez cocher plusieurs options dans la liste déroulante avant de la fermer.

!!! tip "Utiliser plusieurs filtres"
    Vous pouvez appliquer des filtres sur plusieurs champs en même temps. La carte n'affiche que les données qui correspondent à **tous** les critères de filtrage actifs.

### 3. Utiliser les filtres avancés

1.  Cliquez sur **Filtres** dans la barre d'outils pour ouvrir la boîte de dialogue des filtres.
2.  Passez à l'onglet **Avancé** pour construire des conditions précises, en choisissant le champ, l'opérateur et la valeur, puis cliquez sur **Créer le Filtre**.
3.  Utilisez **Tous** ou **Un ou plus** pour décider si les données doivent correspondre à toutes les conditions ou à au moins une.
4.  Cliquez sur **Chercher** pour appliquer vos conditions, ou sur **Réinitialiser les filtres** pour recommencer.

Les filtres appliqués apparaissent sous forme de pastilles sous la barre d'outils. Cliquez sur l'icône **annuler** d'une pastille pour supprimer ce filtre individuel.

### 4. Enregistrer et réutiliser les filtres

Si vous filtrez souvent ce form, vous pouvez enregistrer vos paramètres sous forme de préréglage depuis la boîte de dialogue **Filtres**. Les contrôles de préréglage ne sont pas affichés sur les petits écrans.

1.  Saisissez un nom dans le champ **Choisir un nom prédéfini**.
2.  Cliquez sur **Enregistrer** pour stocker la sélection actuelle de filtres.
3.  Plus tard, choisissez le préréglage dans la liste et cliquez sur **Appliquer** pour le restaurer.

### 5. Exporter les résultats

1.  Cliquez sur **Exportation** dans la barre d'outils.
2.  Choisissez le format d'exportation et les colonnes à inclure.
3.  Confirmez pour télécharger un fichier contenant les données actuellement filtrées.

!!! warning "Données de localisation requises"
    Les données ne peuvent apparaître sur la carte que si elles ont des coordonnées géographiques valides associées à leur position. Les données sans ces informations ne sont pas affichées et ne sont pas comptées parmi les épingles tracées.

## Pages associées

*   [Forms](index.md)
*   [Modifier le form schema](edit-form-schema.md)
*   [Positions](../metrics/locations.md)
*   [Importer des données](import.md)