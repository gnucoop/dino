---
title: Agrégation
description: Utilisez la vue Agrégation dans Dino pour parcourir, filtrer et gérer les soumissions de formulaires de tous vos schémas de formulaires dans une seule liste unifiée.
---

# Agrégation

La page Agrégation offre une vue unifiée de toutes les soumissions de formulaires de votre organisation. Au lieu de consulter les soumissions d'un seul schéma de formulaire à la fois, vous pouvez voir les entrées de plusieurs schémas ensemble dans une seule liste filtrable.

![Main view of the Aggregation page](../imgs/aggregation/index.png)

## Parcourir la liste

La liste affiche toutes les soumissions que vous avez l'autorisation de consulter. Chaque ligne représente une soumission unique. Les colonnes suivantes sont affichées par défaut :

* **Schéma de formulaire** : Le nom du schéma de formulaire auquel cette soumission appartient.
* **Statut** : Le statut actuel du workflow de la soumission.
* Des colonnes supplémentaires pour des métriques comme **Projet**, **Lieu** ou **Organisation** peuvent également apparaître, selon la configuration de votre système.

Vous pouvez cliquer sur n'importe quelle ligne pour la sélectionner ou l'étendre afin d'afficher plus de détails.

## Filtrer la liste

Une barre de filtrage se trouve au-dessus de la liste. Utilisez-la pour affiner les soumissions affichées. Vous pouvez filtrer par :

* Projet
* Lieu
* Zone
* Cas
* Code de cas
* Organisation
* Statut du formulaire
* Utilisateur

!!! tip "Conseils de filtrage"
    La barre de filtrage de l'Agrégation est conçue pour un filtrage rapide entre les schémas. Pour des fonctionnalités avancées comme les préréglages de filtre enregistrés ou l'export de données, accédez à la [liste des soumissions pour un schéma de formulaire spécifique](../forms/index.md).

## Actions sur les lignes

Lorsque vous survolez une ligne, un ensemble d'icônes d'action apparaît sur la droite. Les actions disponibles pour une soumission spécifique dépendent de vos autorisations pour son schéma de formulaire.

* **Afficher** : Ouvrir la soumission en lecture seule.
* **Modifier** : Ouvrir la soumission pour modification.
* **Imprimer** : Générer et ouvrir une version PDF de la soumission. Une confirmation vous sera demandée avant la création du PDF.
* **Supprimer** : Supprimer définitivement la soumission. Une confirmation vous sera demandée pour cette action.

## Créer une nouvelle soumission

Vous pouvez démarrer une nouvelle soumission de formulaire directement depuis la page Agrégation.

1. Cliquez sur le bouton **+** (Ajouter) dans le coin inférieur droit de l'écran.
2. Une boîte de dialogue s'ouvre, affichant une liste des schémas de formulaires pour lesquels vous avez l'autorisation de créer des soumissions.
3. Sélectionnez le schéma de formulaire souhaité dans la liste.
4. Cliquez sur **Créer un formulaire**. Vous serez redirigé vers le formulaire pour commencer à le remplir.