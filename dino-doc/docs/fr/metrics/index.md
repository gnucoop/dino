---
title: Métriques
description: Un aperçu de la section Métriques dans Dino — les types de données de référence utilisés pour classer et lier les données des formulaires et les rapports.
---

# Métriques

Les métriques sont les catégories de données de référence utilisées dans Dino pour classer, organiser et filtrer les données que vous collectez. Les métriques peuvent être associées aux formulaires collectés, puis utilisées pour définir des vues sur les données de votre installation. Par exemple, les métriques peuvent servir à définir les permissions des utilisateurs : un utilisateur donné peut se voir accorder l'accès à seulement certaines valeurs spécifiques de métriques. Cela peut être utile, par exemple, dans une organisation présente dans plusieurs pays, si vous souhaitez limiter l'accès de certains utilisateurs aux seules données du pays où ils opèrent. De la même manière, vous pouvez limiter l'accès des utilisateurs de Dino selon d'autres critères à l'aide d'autres métriques, comme la métrique projet, pour limiter l'accès à seulement certains projets, ou la métrique organisation, pour limiter l'accès aux seules données de certains partenaires.

Outre la limitation de l'accès aux données, les métriques peuvent également faciliter les filtres et les agrégations. Par exemple, je peux vouloir compter combien de formulaires ont été collectés pour un pays donné. Dans ce cas, je peux filtrer les données de mes formulaires en fonction de la valeur de la métrique emplacement. Les filtres peuvent aussi tirer parti de la structure hiérarchique des métriques. Par exemple, si je dispose d'une structure d'emplacements à, disons, trois niveaux, parce que je cartographie des provinces (c'est-à-dire une valeur de métrique pour chaque province), regroupées en régions (c'est-à-dire une valeur de métrique pour chaque région, également utilisée comme parent pour les provinces), regroupées en pays (c'est-à-dire une valeur de métrique pour chaque pays, utilisée comme parent pour les régions). Dans ce cas, je pourrais filtrer tous les formulaires d'une région donnée en filtrant simplement la région, sélectionnant ainsi toutes les provinces qui partagent la même région.

Ce mécanisme peut également être utilisé lors de la génération de rapports. Les données d'un rapport pour un report schema donné peuvent être générées à l'aide d'une valeur particulière d'une métrique. Cela implique que le report schema est appliqué à tous les formulaires qui ont la même valeur de métrique, en suivant une hiérarchie de valeurs de métriques.

Enfin, les métriques peuvent servir à lier les données de formulaires différents. Par exemple, je peux avoir un form pour les données personnelles des bénéficiaires — un par personne — puis un autre form pour leurs visites médicales — plusieurs par personne. La métrique cas peut être utilisée pour lier le form de données personnelles aux forms de visites, et aussi pour copier certaines données du form personnel, comme la date de naissance, vers les forms de visites médicales.

Les différentes manières d'utiliser les métriques font de cette entité un outil puissant pour gérer les données.

La section Métriques est l'endroit où vous gérez les listes de valeurs disponibles pour chaque catégorie. Elle sert de hub central pour toutes vos données de référence.

![Vue principale de la page Métriques](../imgs/metrics/index.png)

---

## Types de métriques

La page principale affiche les types de métriques actifs dans votre installation Dino. Chaque type est présenté sous forme de carte avec une icône et un libellé. Cliquez sur une carte pour ouvrir sa page de gestion.

Selon la configuration de votre système, tout ou partie des types de métriques suivants peuvent être disponibles :

| Type de métrique | Description |
|---|---|
| **Domaines thématiques** | Domaines de travail ou regroupements thématiques pour vos activités. |
| **Cas** | Cas individuels, personnes ou bénéficiaires suivis à travers les données des formulaires. |
| **Emplacements** | Emplacements géographiques où les données sont collectées ou les activités se déroulent. |
| **Projets** | Projets auxquels les données des formulaires et les rapports sont liés. |
| **Organisations** | Organisations impliquées dans les activités ou responsables de celles-ci. |

!!! tip "Accéder aux métriques"
    Vous pouvez accéder à la section Métriques en cliquant sur **Métriques** dans le menu principal de l'application.

---

## Ce que vous pouvez faire

Depuis la page principale des métriques, vous pouvez :

1.  **Consulter tous les types de métriques actifs** disponibles pour vos données.
2.  **Accéder à un type de métrique spécifique** en cliquant sur sa carte. Cela vous amène à une page dédiée où vous pouvez gérer la liste des valeurs de ce type (par exemple, ajouter un nouvel emplacement ou modifier le nom d'un projet).
3.  **Utiliser le fil d'Ariane** en haut de la page pour suivre votre parcours de navigation dans la section Métriques.

Pour des instructions détaillées sur l'ajout, la modification ou la suppression de valeurs au sein d'un type de métrique spécifique, consultez la documentation de chaque type de métrique :

- [Domaines thématiques](areas.md)
- [Cas](cases.md)
- [Emplacements](locations.md)
- [Organisations](organizations.md)
- [Projets](projects.md).

---

## Naviguer dans la section Métriques

1.  Sur la page principale des métriques, passez en revue les cartes de chaque type de métrique disponible.
2.  Cliquez sur la carte du type de métrique que vous souhaitez gérer (par exemple, **Emplacements**).
3.  Vous serez redirigé vers une page dédiée à ce type de métrique, où vous pourrez consulter, ajouter, modifier ou supprimer des valeurs spécifiques.
4.  Utilisez le fil d'Ariane en haut de la page pour revenir facilement à la page principale des métriques ou à d'autres sections.

!!! warning "Configuration du système"
    Les types de métriques disponibles sont configurés par votre administrateur système. Si vous ne voyez pas un type de métrique dont vous avez besoin, contactez votre administrateur.

!!! warning "Supprimer une valeur de métrique"
    Cela vaut pour toutes les métriques. Avant de supprimer une valeur de métrique, par exemple un emplacement ou un cas donné, Dino vérifie si elle est encore utilisée. Si un form l'utilise, ou si elle possède des valeurs enfants, la suppression est refusée (*Some forms use these metrics. You cannot delete them.* / *Some metrics have children. You cannot delete them.*). Si seuls des rapports l'utilisent, vous recevez un avertissement et pouvez tout de même confirmer. Les permissions de groupe qui référencent la valeur ne sont **pas** vérifiées : retirez-la de tout groupe avant de la supprimer.