---
title: Utilisateurs
description: Gérez les comptes utilisateurs Dino et les groupes de permissions depuis une zone d'administration centrale.
---

# Utilisateurs

La zone **Utilisateurs** est le hub central pour gérer qui peut accéder à Dino et ce qu'il peut faire. Elle vous donne accès à deux sections d'administration : **Utilisateurs** pour les comptes individuels et **Groupes** pour les ensembles de permissions qui contrôlent l'accès aux form, aux report et aux données.

![Vue principale de la page Utilisateurs](../imgs/administration/users.png)

La page affiche un menu avec une tuile pour chaque section. Cliquez sur une tuile pour ouvrir cette section.

## Sections disponibles

### Utilisateurs

La tuile **Utilisateurs** ouvre la page [Gérer les utilisateurs](users-list.md). Utilisez-la pour créer de nouveaux comptes, consulter les comptes existants, mettre à jour les détails des utilisateurs et désactiver les comptes qui ne sont plus nécessaires.

![Vue principale de la page Liste des utilisateurs](../imgs/administration/users-list.png)

### Groupes

La tuile **Groupes** ouvre la page [Groupes](groups-list.md). Les groupes rassemblent des permissions afin que vous puissiez attribuer les mêmes droits d'accès à plusieurs utilisateurs en une seule fois. Utilisez cette section pour créer des groupes et ajuster leurs permissions. Les utilisateurs sont affectés aux groupes depuis l'éditeur de chaque utilisateur, dans le champ **Groupes de permissions utilisateur**.

## Ouvrir une section

1. Ouvrez la page **Utilisateurs** depuis la navigation principale.
2. Cliquez sur la tuile de la section dans laquelle vous souhaitez travailler — **Utilisateurs** ou **Groupes**.
3. Dino vous amène à la liste de cette section, où vous pouvez travailler avec des comptes individuels ou des définitions de groupes.

!!! tip "Commencez par les groupes"
    Si plusieurs personnes ont besoin du même niveau d'accès, créez d'abord un groupe, puis affectez-le à chacune d'elles dans le champ **Groupes de permissions utilisateur** de l'éditeur d'utilisateur. Cela permet de garder des permissions cohérentes et vous évite de modifier chaque compte séparément.

!!! warning "Accès administrateur requis"
    La zone Utilisateurs n'est visible que pour les utilisateurs ayant le rôle Administrateur. Si vous ne voyez pas cette page, contactez votre administrateur système.

## Pages associées

*   [Gérer les utilisateurs](users-list.md) : Créez, modifiez et gérez des comptes utilisateurs individuels.
*   [Groupes](groups-list.md) : Créez et gérez des groupes de permissions qui contrôlent l'accès aux form, aux report et aux données.