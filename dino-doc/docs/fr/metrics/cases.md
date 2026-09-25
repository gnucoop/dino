---
title: Cas
description: Gérez les cas dans Dino — créez, modifiez, visualisez, filtrez, exportez et organisez les fiches de cas à l'aide d'un tableau de données structuré.
---

# Cas

La page Cas vous offre un espace de travail centralisé pour suivre et gérer les cas individuels. Chaque cas est un enregistrement structuré pouvant contenir un nom, un code, une image, une relation parent, des notes et des attributs supplémentaires. Vous pouvez créer de nouveaux cas, modifier ceux qui existent déjà, consulter leurs détails, supprimer des enregistrements et exporter votre liste de cas — le tout depuis un seul tableau interactif.

![Main view of the Cases page](../imgs/metrics/cases.png)

## Aperçu du tableau

Le tableau principal affiche les colonnes suivantes par défaut :

- **Nom du cas** – Le nom que vous attribuez au cas (triable).
- **Code** – Un code généré par le système ou attribué manuellement (en lecture seule après la création).
- **Image du cas** – Un fichier image téléversé représentant le cas.
- **Cas parent** – Le nom du cas parent auquel ce cas appartient, le cas échéant.

Des colonnes supplémentaires (telles que **ID**, **Notes**, **Date de création** et **Attributs supplémentaires**) sont masquées par défaut. Vous pouvez personnaliser les colonnes affichées en cliquant sur le bouton **Personnalisez les colonnes** dans l'en-tête du tableau.

## Actions sur un cas individuel

À droite de chaque ligne, vous trouverez des icônes correspondant aux actions suivantes :

- **Modifier** – Ouvre une boîte de dialogue permettant de modifier les détails du cas.
- **Imprimer** – Génère une fiche PDF imprimable pour le cas.
- **Visualiser** – Ouvre une boîte de dialogue en lecture seule permettant de consulter les informations du cas.
- **Supprimer** – Ouvre une boîte de dialogue de confirmation pour supprimer définitivement le cas.

Cliquez sur l'icône **Plus** (trois points verticaux) pour afficher toutes les actions disponibles si certaines sont masquées.

## Actions groupées

Sélectionnez plusieurs cas à l'aide des cases à cocher de la première colonne. Dès qu'au moins un cas est sélectionné, un bouton **Supprimer** apparaît en haut du tableau. Vous pouvez supprimer tous les cas sélectionnés en une seule fois.

!!! warning "La suppression groupée est définitive"
    Les cas supprimés ne peuvent pas être récupérés. Utilisez l'action de suppression groupée avec prudence.

## Créer un nouveau cas

1. Cliquez sur le bouton d'action flottant **Ajouter** (icône plus) en bas à droite de la page.
2. Une boîte de dialogue s'ouvre. Remplissez les champs obligatoires :
   - **Nom du cas** – Saisissez un nom descriptif.
   - **Code** – (Facultatif) Indiquez un code unique. Ce champ est en lecture seule après la création.
   - **Image du cas** – Téléversez un fichier image.
   - **Cas parent** – Associez éventuellement ce cas à un cas parent existant.
   - **Notes** – Ajoutez toute note pertinente.
3. Cliquez sur **Enregistrer** pour créer le cas.

## Importer des cas

Utilisez le bouton d'action flottant **Importer** (icône de téléversement vers le cloud) pour importer des cas en masse depuis un fichier. Les formats pris en charge sont définis par votre administrateur système.

## Filtrage et recherche

La barre de recherche située en haut vous permet de filtrer les cas par :

- **Mot-clé** – Effectue une recherche dans tous les champs affichés.
- **Plage de dates** – Filtre par date de création (Du / Au).
- **Filtres supplémentaires** – Sélectionnez parmi des filtres prédéfinis tels que la métrique, le statut, l'utilisateur ou le groupe d'utilisateurs.

Après avoir appliqué des filtres, vous pouvez enregistrer la combinaison sous forme de **préréglage** pour la réutiliser rapidement. Pour enregistrer un préréglage :

1. Ouvrez le panneau de filtres.
2. Saisissez un nom dans le champ de préréglage.
3. Cliquez sur **Enregistrer**.  
Pour appliquer un préréglage enregistré, sélectionnez-le dans la liste et cliquez sur **Appliquer**.

## Exporter des cas

Cliquez sur le bouton **Exporter** (icône de téléchargement depuis le cloud) dans la barre de filtres. Choisissez le format d'export (par exemple CSV ou Excel) et sélectionnez les colonnes à inclure. Le fichier exporté contiendra tous les cas actuellement visibles, en tenant compte des filtres actifs.

## Personnaliser le tableau

- **Trier** – Cliquez sur l'en-tête d'une colonne triable (par exemple **Nom du cas**, **Date de création**) pour ordonner le tableau.
- **Sélecteur de colonnes** – Ouvrez la boîte de dialogue du sélecteur de colonnes pour afficher ou masquer des colonnes.
- **Développer les lignes** – Certains cas peuvent comporter des sous-éléments (d'autres cas liés en tant que détails). Cliquez sur une ligne pour la développer et voir les enregistrements associés.

La page affiche également un **fil d'Ariane** en haut, qui vous permet de revenir à la section Métriques principale.

## Pages associées

- [Vue d'ensemble des métriques](index.md) – Revenez au tableau de bord principal des métriques.
- [Zones thématiques](areas.md) – Organisez les cas par zone thématique.
- [Emplacements](locations.md) – Associez les cas à des emplacements géographiques.
- [Organisations](organizations.md) – Liez les cas à des organisations.
- [Projets](projects.md) – Regroupez les cas dans des projets.