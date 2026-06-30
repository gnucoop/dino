---
title: Liste des groupes
description: Gérez les groupes d'utilisateurs dans Dino — visualisez, créez, modifiez et supprimez des groupes d'autorisations avec des rôles, formulaires, rapports et métriques attribués.
---

# Liste des groupes

La page **Liste des groupes** affiche tous les groupes d'utilisateurs dans Dino. Depuis cette page, vous pouvez visualiser, modifier, supprimer et créer des groupes. Chaque groupe définit un ensemble d'autorisations et de règles d'accès en associant un rôle utilisateur à des schémas de formulaire, schémas de rapport, statuts de formulaire et types de métriques spécifiques (tels que les zones, cas, projets, lieux ou organisations).

![Main view of the Groups List page](../imgs/administration/groups-list.png)

## Aperçu de la liste

Le tableau affiche les colonnes suivantes :

- **Nom du groupe** – le nom du groupe d'utilisateurs (visible par défaut).
- **ID** – identifiant interne (masqué par défaut).
- **Date de création** – date de création du groupe (masquée par défaut).

Vous pouvez personnaliser les colonnes affichées en cliquant sur l'icône **view_week** dans l'en-tête du tableau.

## Recherche et filtrage

Utilisez la **barre de recherche** en haut de la page pour filtrer les groupes par mot-clé. Le panneau **Filtres** (extensible) permet d'affiner la liste par :

- Plage de dates (de/à)
- Projet, lieu, zone, cas, organisation et autres filtres disponibles

Vous pouvez également enregistrer et charger des préréglages de filtre à l'aide du gestionnaire de préréglages.

## Actions sur les groupes

Chaque ligne comporte trois icônes d'action sur la droite :

- **visibility** – Afficher les détails du groupe (ouvre l'éditeur en mode lecture seule)
- **create** – Modifier les propriétés du groupe
- **delete** – Supprimer le groupe (confirmation requise)

En cliquant sur une ligne, une section de détails se déploie affichant des informations supplémentaires ou des éléments imbriqués (le cas échéant).

## Création d'un nouveau groupe

1. Cliquez sur le bouton flottant **+** en bas à droite de l'écran.
2. Dans la boîte de dialogue de l'éditeur qui s'ouvre, saisissez un **Nom de groupe**.
3. Dans le panneau **Éléments disponibles**, parcourez les onglets pour sélectionner :
    - **Rôle utilisateur** (obligatoire – vous devez choisir exactement un rôle)
    - **Schémas de formulaire**
    - **Schémas de rapport**
    - **Statuts de formulaire**
    - Types de métriques (Zone, Cas, Projet, Lieu, Organisation) – si actifs
4. Cliquez sur l'icône **add** à côté de chaque élément pour le déplacer vers le panneau **Éléments du groupe**.
5. Cliquez sur **Enregistrer**.

!!! tip "Option Tout"
    Pour les types de métriques et autres catégories, vous pouvez voir une option « Tout … ». La sélectionner applique la restriction à tous les éléments de ce type.

## Modification ou consultation d'un groupe

1. Dans le tableau, cliquez sur l'icône **create** (modifier) ou **visibility** (afficher) pour le groupe que vous souhaitez modifier.
2. Dans la boîte de dialogue de l'éditeur, vous pouvez :
    - Modifier le **Nom du groupe**.
    - Ajouter ou supprimer des éléments de n'importe quel onglet (uniquement en mode édition).
    - Supprimer des éléments en cliquant sur l'icône **delete** à côté d'eux.
3. Cliquez sur **Enregistrer** pour appliquer les modifications (le mode visualisation affiche seulement un bouton **Fermer**).

## Suppression d'un groupe

1. Cliquez sur l'icône **delete** pour le groupe.
2. Confirmez la suppression dans la boîte de dialogue qui apparaît.

!!! warning "Action irréversible"
    La suppression d'un groupe est définitive. Assurez-vous qu'aucun utilisateur ne dépend de ce groupe avant de le supprimer.

## Pages connexes

- [Liste des utilisateurs](users-list.md) – gérez les comptes utilisateurs individuels et leurs affectations de groupe.
- [Métriques](../metrics/index.md) – configurez les types de métriques pouvant être attribués aux groupes (zones, cas, projets, etc.).
- [Schémas de formulaire](../forms/edit-form-schema.md) – créez et modifiez des schémas de formulaire pouvant être liés à des groupes.
- [Schémas de rapport](../reports/edit-report-schema.md) – gérez les schémas de rapport disponibles pour les groupes.
- [Aperçu de l'interface](../interface/index.md) – apprenez-en davantage sur la navigation et la disposition générale.
