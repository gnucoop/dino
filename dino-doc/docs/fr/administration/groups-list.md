---
title: Liste des groupes
description: Gérez les groupes d'utilisateurs dans Dino — consultez, créez, modifiez et supprimez des groupes de permissions avec rôles, formulaires, rapports et métriques associés.
---

# Liste des groupes

La page **Liste des groupes** affiche tous les groupes d'utilisateurs de Dino. Depuis cette page, vous pouvez consulter, modifier, supprimer et créer des groupes. Chaque groupe définit un ensemble de permissions et de règles d'accès en associant un rôle utilisateur à des schémas de formulaire, des schémas de rapport, des statuts de formulaire et des types de métriques spécifiques (tels que les zones, les cas, les projets, les lieux ou les organisations).

![Main view of the Groups List page](../imgs/administration/groups-list.png)

## Aperçu de la liste

Le tableau affiche les colonnes suivantes :

- **Nom du groupe** – le nom du groupe d'utilisateurs (visible par défaut).
- **ID** – identifiant interne (masqué par défaut).
- **Date de création** – la date de création du groupe (masquée par défaut).

Vous pouvez personnaliser les colonnes affichées en cliquant sur l'icône **Afficher les colonnes** (également appelée icône **hotdog** par les programmeurs !) à droite de l'en-tête du tableau.

## Recherche et filtrage

Utilisez la **barre de recherche** en haut de la page pour filtrer les groupes par mot-clé. Le panneau **Filtres** (dépliable) permet d'affiner la liste selon :

- La plage de dates (de/à)
- Tout type de métrique défini dans votre déploiement, c'est-à-dire un ou plusieurs des éléments suivants : Projet, Lieu, Zone, Cas, Organisation

Vous pouvez également enregistrer et charger des préréglages de filtre à l'aide du gestionnaire de préréglages.

## Actions sur les groupes

Chaque ligne comporte trois icônes d'action sur la droite :

- **Afficher** – Afficher les détails du groupe (ouvre l'éditeur en mode lecture seule)
- **Modifier** – Modifier les propriétés du groupe
- **Supprimer** – Supprimer le groupe (confirmation requise)

## Créer un nouveau groupe

1. Cliquez sur le bouton flottant **+** en bas à droite de l'écran.
2. Dans la boîte de dialogue d'édition qui s'ouvre, saisissez un **nom de groupe** (obligatoire).
3. Parcourez les onglets pour sélectionner :
    - **Rôle utilisateur** (obligatoire – vous devez choisir exactement un rôle)
    - **Schémas de formulaire**
    - **Statuts de formulaire**
    - **Schémas de rapport**
    - **Types de métriques** (tous les types actifs de votre déploiement : Zone, Cas, Projet, Lieu, Organisation) – si activé
4. Dans la boîte de dialogue **éléments disponibles** sur le côté droit, sélectionnez un ou plusieurs éléments en cliquant sur l'icône **ajouter** à côté de chaque élément pour le déplacer vers le panneau **Éléments du groupe**.
5. Cliquez sur **Enregistrer**.

!!! tip "Option « Tout »"
    Pour les types de métriques et d'autres catégories, vous pouvez voir une option « Tout… ». La sélectionner applique la restriction à tous les éléments de ce type.

## Modifier ou consulter un groupe

1. Dans le tableau, cliquez sur l'icône **Modifier** ou **Afficher** du groupe que vous souhaitez modifier.
2. Dans la boîte de dialogue d'édition, vous pouvez :
    - Modifier le **nom du groupe**.
    - Ajouter ou supprimer des éléments de n'importe quel onglet (uniquement en mode édition).
    - Supprimer des éléments en cliquant sur l'icône **supprimer** à côté d'eux.
3. Cliquez sur **Enregistrer** pour appliquer les modifications (le mode affichage ne propose qu'un bouton **Fermer**).

## Supprimer un groupe

1. Cliquez sur l'icône **supprimer** du groupe.
2. Confirmez la suppression dans la boîte de dialogue qui apparaît.

!!! warning "Action irréversible"
    La suppression d'un groupe est irréversible. Assurez-vous qu'aucun utilisateur ne dépend de ce groupe avant de le supprimer.

## Pages connexes

- [Liste des utilisateurs](users-list.md) – gérez les comptes utilisateurs individuels et leurs affectations aux groupes.
- [Métriques](../metrics/index.md) – configurez les types de métriques pouvant être affectés aux groupes (zones, cas, projets, etc.).
- [Schémas de formulaire](../forms/edit-form-schema.md) – créez et modifiez les schémas de formulaire pouvant être liés aux groupes.
- [Schémas de rapport](../reports/edit-report-schema.md) – gérez les schémas de rapport disponibles pour les groupes.
- [Aperçu de l'interface](../interface/index.md) – découvrez la navigation et la disposition générale.