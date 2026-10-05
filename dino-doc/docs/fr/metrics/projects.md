---
title: Projets
description: Gérez vos projets dans Dino. Affichez, ajoutez, modifiez, supprimez, importez et exportez les enregistrements de projets grâce au filtrage et aux actions groupées.
---

# Projets

La page **Projets** de Dino vous permet de gérer toutes les valeurs de la métrique Projet. Vous pouvez l'utiliser pour cartographier les projets de votre organisation, un programme, des collaborations avec des donateurs ou tout autre ensemble structuré d'activités pertinentes pour votre travail. Vous pouvez afficher une liste triable de projets, en ajouter, modifier ceux existants, les supprimer, importer des données en masse et exporter la liste pour une analyse hors ligne. La page offre également des outils de filtrage pour retrouver rapidement le projet souhaité.

![Vue principale de la page Projets](../imgs/metrics/projects.png)

## Accéder à Projets

Pour ouvrir la page Projets, cliquez sur **Métriques** dans la navigation principale, puis sur la carte **Projets**. L'URL du navigateur se terminera par `/metrics/projects`.

## Comprendre la liste des projets

Le tableau principal affiche une liste de tous les projets. Chaque ligne correspond à un projet et affiche par défaut les colonnes suivantes :

- **Nom du projet** – Le nom du projet. Vous pouvez trier la liste selon cette colonne.
- **Projet parent** – Le projet de niveau supérieur auquel ce projet appartient, le cas échéant.
- **Code** – Un code de projet attribué manuellement.
- **Auto Code** – Un code généré automatiquement. Il est défini par Dino : il n'apparaît pas dans la boîte de dialogue du projet et ne peut pas être modifié.
- **Secteurs d'intervention** – Les secteurs sur lesquels le projet se concentre.
- **Donateurs** – Les sources de financement du projet.
- **Date de début** – La date à laquelle le projet commence.
- **Date de fin** – La date à laquelle le projet se termine.

Les colonnes masquées (ID, Date de création et Attributs supplémentaires) peuvent être affichées à l'aide du bouton **Colonnes** (infobulle *Personnaliser les colonnes*), au-dessus du tableau, à droite.

!!! tip "Champs en lecture seule"
    Le champ **Auto Code** est généré automatiquement et ne peut pas être modifié. Il apparaît dans la liste mais pas dans la boîte de dialogue du projet.

La barre d'outils supérieure affiche le nombre total d'éléments trouvés ainsi qu'un paginateur. Vous pouvez choisir combien de projets afficher par page.

## Gérer les projets

### Ajouter un nouveau projet

1. Cliquez sur le bouton **Ajouter un nouveau PROJET** dans la barre d'outils au-dessus du tableau.
2. Une boîte de dialogue s'ouvre, dans laquelle vous renseignez les détails du projet. Les champs facultatifs sont marqués *(facultatif)*.
3. Appuyez sur **Enregistrer** pour créer le projet. Il apparaît immédiatement dans la liste.

### Modifier un projet

1. Survolez la ligne du projet et cliquez sur l'icône **Modifier** (crayon), ou sélectionnez la ligne et cliquez sur **Modifier** dans la barre d'actions au-dessus du tableau.
2. Modifiez les champs dans la boîte de dialogue.
3. Cliquez sur **Enregistrer** pour appliquer vos modifications.

### Voir un projet

- Survolez la ligne du projet et cliquez sur l'icône **Voir** (œil), ou sélectionnez la ligne et cliquez sur **Voir** dans la barre d'actions, pour ouvrir une version en lecture seule de la boîte de dialogue des détails du projet.

### Supprimer un projet

1. Cliquez sur la ligne du projet pour la sélectionner, puis cliquez sur **Supprimer** dans la barre d'actions au-dessus du tableau.
2. Confirmez la suppression dans la fenêtre contextuelle. Le projet est définitivement supprimé.

!!! warning "Supprimer un projet"
    La suppression d'un projet le retire du système. Cette action est irréversible. Un projet utilisé par des form ou comportant des projets enfants ne peut pas être supprimé ; voir [Métriques](index.md).

## Rechercher et filtrer

La barre de **recherche et de filtres** se trouve sous le titre de la page. Vous pouvez :

- **recherche par mot-clé** – Saisissez un terme dans le champ de mot-clé ; la liste se filtre automatiquement.
- **Filtrer par plage de dates** – Cliquez sur **Filtres**, définissez une **De date** et une **À ce jour**, puis cliquez sur **Chercher**. Les dates filtrent selon la date de création du projet, et non selon sa date de début ou de fin.

Des puces de filtre apparaissent sous la barre de filtres, indiquant les filtres actifs. Vous pouvez supprimer chaque puce individuellement en cliquant sur l'icône **annuler** correspondante.

## Exporter et importer

### Exporter des projets

1. Cliquez sur le bouton **Exportation** dans la barre d'outils.
2. Choisissez ce à exporter : *Éléments de la page* (par défaut), les éléments correspondant à vos filtres, ou *Tous les éléments*.
3. Choisissez le format : *csv*, *xlsx* ou *splitted xlsx*, puis cliquez sur **Exportation**.

### Importer des projets

1. Cliquez sur le bouton **Importer un PROJET** dans la barre d'outils au-dessus du tableau.
2. Téléchargez un fichier `.xls`, `.xlsx` ou `.csv` et mappez ses colonnes aux champs du projet.
3. Cliquez sur **Appliquer l'importation** et examinez le résultat pour détecter d'éventuelles erreurs ou avertissements. Les projets dont le nom existe déjà sont réutilisés, et non mis à jour.

## Actions groupées

Vous pouvez sélectionner plusieurs projets à l'aide des cases à cocher situées à gauche de chaque ligne. Lorsque plusieurs projets sont sélectionnés, la barre d'actions au-dessus du tableau propose **Supprimer**, qui retire tous les projets sélectionnés après confirmation. Il n'existe pas de modification groupée.

Après la suppression, la liste se met à jour automatiquement.

## Pages liées

- [Aperçu des métriques](index.md)
- [Zones thématiques](areas.md)
- [Organisations](organizations.md)
- [Positions](locations.md)
- [Cas](cases.md)