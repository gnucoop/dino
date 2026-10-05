---
title: Organisations
description: Gérez les organisations dans Dino – consultez, ajoutez, modifiez, supprimez et importez des organisations.
---

# Organisations

La page **Organisations** liste toutes les valeurs possibles de la métrique organisation. Les organisations peuvent être vos partenaires de projet ou toute entité impliquée dans vos activités. Utilisez cet écran pour consulter, ajouter, modifier, supprimer et importer des organisations, et pour gérer la hiérarchie organisationnelle.

![Vue principale de la page Organisations](../imgs/metrics/organizations.png)

## Colonnes du tableau

Par défaut, le tableau affiche les colonnes suivantes :

- **Organization Name** – le nom de l'organisation. Cette colonne est triable.
- **Organisation parent** – le nom de l'organisation parente, le cas échéant.

Des colonnes supplémentaires (ID, Creation Date, Logo path, Website url, Additional Attributes) sont masquées par défaut. Utilisez le bouton **Colonnes**, au-dessus du tableau à droite, pour les afficher ou les masquer.

## Actions sur les lignes

Survolez une ligne pour faire apparaître les icônes **Voir** et **Modifier**. Cliquez sur la ligne pour la sélectionner : la barre d'actions au-dessus du tableau affiche alors toutes les actions :

- **Voir** (icône de visibilité) – ouvre une fenêtre en lecture seule avec les détails de l'organisation.
- **Modifier** (icône de crayon) – ouvre une fenêtre pour modifier les détails de l'organisation.
- **Supprimer** (icône de corbeille) – supprime définitivement l'organisation. Une fenêtre de confirmation s'affiche d'abord.

!!! warning "Supprimez les organisations avec précaution"
    La suppression d'une organisation est irréversible. Une organisation utilisée par des form, ou qui possède des organisations enfants, ne peut pas être supprimée ; voir [Métriques](index.md).

## Actions groupées

Sélectionnez une ou plusieurs lignes à l'aide des cases à cocher de la première colonne. Une barre d'outils apparaît au-dessus du tableau avec les actions que vous pouvez appliquer :

- Avec une ligne sélectionnée, vous pouvez consulter, modifier ou supprimer cette organisation.
- Avec plusieurs lignes sélectionnées, vous pouvez toutes les supprimer en une seule fois.

## Recherche et filtres

La barre de filtres en haut de la page propose :

- **Recherche par mot-clé** – filtre les organisations par n'importe quel texte.
- **Filtres** – ouvre la fenêtre de filtres pour affiner la liste par date de création (**De date** / **À ce jour**).
- **Exportation** – télécharge la liste sous forme de fichier.

Les filtres appliqués apparaissent sous forme de puces sous la barre de filtres. Cliquez sur l'icône d'annulation d'une puce pour supprimer ce filtre.

## Ajouter et importer des organisations

Deux boutons sont disponibles dans la barre d'outils au-dessus du tableau :

- **Add new ORGANIZATION** (icône plus) – ouvre une fenêtre pour créer une nouvelle organisation.
- **Import ORGANIZATION** (icône de téléversement cloud) – téléversez un fichier pour importer des organisations en masse.

!!! tip "Hiérarchie organisationnelle"
    Définissez une **Organisation parent** lors de la création d'une organisation pour construire une hiérarchie d'entités liées.

## Étapes : créer une nouvelle organisation

1. Cliquez sur le bouton **Add new ORGANIZATION** dans la barre d'outils.
2. Dans la fenêtre qui s'ouvre, remplissez les champs obligatoires, en commençant par le nom de l'organisation. Les champs facultatifs sont marqués *(optional)*.
3. Définissez éventuellement une **Organisation parent** pour placer la nouvelle organisation dans une hiérarchie.
4. Ajoutez éventuellement un chemin de logo, une URL de site web et tout attribut supplémentaire.
5. Cliquez sur **Enregistrer**. La nouvelle organisation apparaît immédiatement dans la liste.

## Étapes : importer des organisations

1. Cliquez sur le bouton **Import ORGANIZATION** dans la barre d'outils.
2. Téléversez un fichier `.xls`, `.xlsx` ou `.csv` et mappez ses colonnes aux attributs de l'organisation.
3. Cliquez sur **Appliquer l'importation** et vérifiez le résultat. Les organisations dont le nom existe déjà sont réutilisées, et non mises à jour.

## Étapes : exporter des organisations

1. Appliquez les filtres dont vous avez besoin.
2. Cliquez sur le bouton **Exportation** dans la barre d'outils.
3. Choisissez ce qu'il faut exporter : *Éléments de la page* (par défaut), les éléments correspondant à vos filtres, ou *Tous les éléments*.
4. Choisissez le format : *csv*, *xlsx* ou *splitted xlsx*, puis cliquez sur **Exportation**.

## Pages associées

- [Présentation des métriques](index.md) – toutes les pages de gestion des métriques.
- [Zones thématiques](areas.md) – gérez les zones thématiques des organisations.
- [Cas](cases.md) – associez des cas aux organisations.
- [Positions](locations.md) – liez des positions aux organisations.
- [Projets](projects.md) – connectez les organisations aux projets.