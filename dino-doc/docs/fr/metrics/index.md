---
title: Métriques
description: Un aperçu de la zone Métriques de Dino — les types de données de référence utilisés pour classer et lier les soumissions de formulaires et les rapports.
---

# Métriques

Les métriques sont les catégories de données de référence utilisées dans Dino pour classer, organiser et filtrer vos données collectées. Les métriques peuvent être associées à des formulaires collectés, puis utilisées pour définir des vues sur les données de votre installation. Par exemple, les métriques peuvent servir à définir les autorisations des utilisateurs : un utilisateur donné peut se voir accorder l'accès à seulement certaines valeurs spécifiques de métriques. Cela peut être utile, par exemple, dans une organisation multi-pays, si vous souhaitez limiter certains utilisateurs à l'accès aux seules données du pays où ils opèrent. De même, vous pouvez limiter l'accès des utilisateurs de Dino selon d'autres critères à l'aide d'autres métriques, comme la métrique projet, pour limiter l'accès à seulement certains projets, ou la métrique organisation, pour limiter l'accès aux seules données de certains partenaires.

Outre leur utilisation pour limiter l'accès aux données, les métriques peuvent également servir à faciliter les filtres et les agrégations. Par exemple, je peux vouloir compter combien de formulaires ont été collectés pour un pays donné. Dans ce cas, je peux filtrer mes données de formulaire en fonction de la valeur de la métrique emplacement. Les filtres peuvent également bénéficier de la structure hiérarchique des métriques. Par exemple, si j'ai une structure d'emplacements à, disons, trois niveaux, parce que je cartographie des provinces (c'est-à-dire une valeur de métrique pour chaque province), regroupées en régions (c'est-à-dire une valeur de métrique pour chaque région, également utilisée comme parent pour les provinces), regroupées en pays (c'est-à-dire une valeur de métrique pour chaque pays, utilisée comme parent pour les régions). Donc, dans ce cas, je pourrais filtrer tous les formulaires d'une région donnée en filtrant simplement la région, ce qui sélectionne toutes les provinces qui partagent la même région.

Ce mécanisme peut également être utilisé lors de la génération de rapports. Les données de rapport d'un schéma de rapport donné peuvent être générées à l'aide d'une valeur particulière d'une métrique. Cela impliquera que le schéma de rapport est appliqué à tous les formulaires qui ont la même valeur de métrique, en suivant une hiérarchie de valeurs de métrique.

Enfin, les métriques peuvent être utilisées pour lier différentes données de formulaires. Par exemple, je peux avoir un formulaire pour les données personnelles des bénéficiaires — un par personne — puis un autre formulaire pour leurs visites médicales — plusieurs par personne. La métrique cas peut être utilisée pour lier le formulaire de données personnelles aux formulaires de visites et aussi pour copier certaines données du formulaire personnel, comme la date de naissance, vers les formulaires de visites médicales.

Les différentes façons d'utiliser les métriques font de cette entité un outil puissant pour gérer les données.

La section Métriques est l'endroit où vous gérez les listes de valeurs disponibles pour chaque catégorie. Elle constitue le point central de toutes vos données de référence.

![Main view of the Metrics page](../imgs/metrics/index.png)

---

## Types de métriques

La page principale affiche les types de métriques actifs dans votre installation Dino. Chaque type est présenté sous forme de carte avec une icône et un libellé. Cliquez sur une carte pour ouvrir sa page de gestion.

Selon la configuration de votre système, certains ou tous les types de métriques suivants peuvent être disponibles :

| Type de métrique | Description |
|---|---|
| **Zones thématiques** | Domaines de travail ou regroupements thématiques pour vos activités. |
| **Cas** | Cas individuels, personnes ou bénéficiaires suivis à travers les soumissions de formulaires. |
| **Emplacements** | Emplacements géographiques où les données sont collectées ou les activités ont lieu. |
| **Projets** | Projets auxquels les soumissions de formulaires et les rapports sont liés. |
| **Organisations** | Organisations impliquées dans les activités ou responsables de celles-ci. |

!!! tip "Accéder aux métriques"
    Vous pouvez accéder à la zone Métriques en cliquant sur **Métriques** dans le menu principal de l'application.

---

## Ce que vous pouvez faire

Depuis la page principale des métriques, vous pouvez :

1.  **Afficher tous les types de métriques actifs** disponibles pour vos données.
2.  **Accéder à un type de métrique spécifique** en cliquant sur sa carte. Cela vous amène à une page dédiée où vous pouvez gérer la liste des valeurs pour ce type (par exemple, ajouter un nouvel emplacement ou modifier le nom d'un projet).
3.  **Utiliser le fil d'Ariane** en haut de la page pour suivre votre parcours de navigation dans la section Métriques.

Pour des instructions détaillées sur l'ajout, la modification ou la suppression de valeurs dans un type de métrique spécifique, consultez la documentation de chaque type de métrique :

- [Zones](areas.md)
- [Cas](cases.md)
- [Emplacements](locations.md)
- [Organisations](organizations.md)
- [Projets](projects.md).

---

## Naviguer dans la section Métriques

1.  Sur la page principale des métriques, passez en revue les cartes de chaque type de métrique disponible.
2.  Cliquez sur la carte du type de métrique que vous souhaitez gérer (par exemple, **Emplacements**).
3.  Vous serez redirigé vers une page dédiée à ce type de métrique, où vous pouvez consulter, ajouter, modifier ou supprimer des valeurs spécifiques.
4.  Utilisez le fil d'Ariane en haut de la page pour revenir facilement à la page principale des métriques ou accéder à d'autres sections.

!!! warning "Configuration du système"
    Les types de métriques disponibles sont configurés par votre administrateur système. Si vous ne voyez pas un type de métrique spécifique dont vous avez besoin, contactez votre administrateur.

!!! warning "Supprimer une valeur de métrique"
    Cela vaut pour toutes les métriques. La suppression d'une valeur de métrique, par exemple un emplacement donné ou un cas, peut affecter les formulaires qui y font référence. C'est pourquoi, avant de supprimer une valeur de métrique, le système vérifie s'il existe un élément dans Dino associé à cette valeur. S'il existe des données de formulaire, des données de rapport ou toute référence dans les autorisations, la suppression de cette valeur ne sera pas autorisée. Assurez-vous qu'aucun enregistrement actif ne dépend d'une valeur de métrique avant de la supprimer.