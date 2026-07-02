---
title: Projets
description: Gérez vos projets dans Dino. Visualisez, ajoutez, modifiez, supprimez, importez et exportez des enregistrements de projets avec filtres et actions groupées.
---

# Projets

La page **Projets** dans Dino vous permet de gérer tous vos enregistrements structurés de projets. Vous pouvez visualiser une liste triable de projets, en ajouter de nouveaux, modifier des existants, les supprimer, importer des données en masse et exporter la liste pour une analyse hors ligne. La page offre également des outils de filtrage puissants pour trouver rapidement le projet souhaité.

![Vue principale de la page Projets](../imgs/metrics/projects.png)

## Naviguer vers Projets

Pour ouvrir la page Projets, développez la section **Métriques** dans la navigation principale et sélectionnez **Projets**. L'URL du navigateur se terminera par `/metrics/projects`.

## Comprendre la liste des projets

Le tableau principal affiche une liste de tous les projets. Chaque ligne correspond à un projet et affiche par défaut les colonnes suivantes :

- **Nom du projet** – Le nom du projet. Vous pouvez trier la liste par cette colonne.
- **Projet parent** – Le projet de niveau supérieur auquel ce projet appartient, le cas échéant.
- **Code** – Un code de projet attribué manuellement.
- **Code auto** – Un code généré automatiquement. Ce champ est en lecture seule et ne peut pas être modifié.
- **Secteurs d'intervention** – Les secteurs sur lesquels le projet se concentre.
- **Donateurs** – Les sources de financement du projet.
- **Date de début** – La date de début du projet.
- **Date de fin** – La date de fin du projet.

Les colonnes masquées (ID, Date de création et Attributs supplémentaires) peuvent être affichées en cliquant sur le bouton **Personnaliser les colonnes** (l'icône ressemble à une vue semaine) en haut à droite du tableau.

!!! tip "Champs en lecture seule"
    Le champ **Code auto** est généré automatiquement et ne peut pas être modifié. Il apparaîtra grisé dans la boîte de dialogue d'édition.

La barre d'outils supérieure affiche le nombre total d'éléments trouvés et un paginateur. Vous pouvez choisir combien de projets afficher par page.

## Gérer les projets

### Ajouter un nouveau projet

1. Cliquez sur le bouton flottant **Ajouter** (icône **+** entourée) en bas à droite de l'écran.
2. Une boîte de dialogue s'ouvre pour saisir les détails du projet. Les champs obligatoires sont marqués en conséquence.
3. Appuyez sur **Enregistrer** pour créer le projet. Il apparaîtra immédiatement dans la liste.

### Modifier un projet

1. Dans la ligne du projet que vous souhaitez modifier, cliquez sur l'icône **modifier** (crayon).
2. Modifiez les champs dans la boîte de dialogue. Le champ **Code auto** sera grisé.
3. Cliquez sur **Enregistrer** pour appliquer les modifications.

### Consulter un projet

- Cliquez sur l'icône **consulter** (œil) dans la ligne du projet pour ouvrir une version en lecture seule des détails du projet.

### Supprimer un projet

1. Cliquez sur l'icône **supprimer** (poubelle) dans la ligne du projet.
2. Confirmez la suppression dans la fenêtre contextuelle. Le projet sera définitivement supprimé.

!!! warning "Supprimer un projet"
    La suppression d'un projet le retire du système. Cette action est irréversible. Assurez-vous d'avoir sélectionné le bon projet avant de confirmer.

## Rechercher et filtrer

La barre de **recherche et filtres** se trouve sous le fil d'Ariane. Vous pouvez :

- **Rechercher par mot-clé** – Saisissez un terme dans le champ de mot-clé ; la liste se filtre automatiquement.
- **Filtrer par plage de dates** – Utilisez les sélecteurs **Date de début** et **Date de fin** pour restreindre les projets par date de début ou de fin.
- **Appliquer des filtres supplémentaires** – Cliquez sur le bouton **liste des filtres** (icône entonnoir) pour ouvrir une boîte de dialogue avec des filtres plus avancés, tels que les secteurs, les donateurs ou d'autres attributs personnalisés.
- **Enregistrer et charger des préréglages de filtres** – Utilisez le gestionnaire de préréglages pour enregistrer votre combinaison de filtres actuelle et la recharger ultérieurement.

Des puces de filtre apparaissent sous la barre de filtre, indiquant les filtres actifs. Vous pouvez supprimer chaque puce en cliquant sur l'icône **annuler** correspondante.

## Exporter et importer

### Exporter des projets

1. Cliquez sur le bouton **exporter** (icône de téléchargement de nuage) dans la barre de filtre.
2. Choisissez le format d'exportation (par exemple, CSV, Excel) et les colonnes à inclure.
3. Le fichier sera téléchargé sur votre ordinateur.

### Importer des projets

1. Cliquez sur le bouton flottant **importer** (icône de téléchargement de nuage) en bas à droite.
2. Téléchargez un fichier correctement formaté (par exemple, CSV ou Excel). Le système créera ou mettra à jour les projets en fonction des données.
3. Consultez les résultats d'importation pour toute erreur ou avertissement.

## Actions groupées

Vous pouvez sélectionner plusieurs projets à l'aide des cases à cocher à gauche de chaque ligne. Dès qu'au moins un projet est sélectionné, la barre d'outils au-dessus du tableau affiche des actions groupées :

- **Supprimer la sélection** – Supprime tous les projets sélectionnés après confirmation.
- **Modifier la sélection (édition groupée)** – Ouvre une boîte de dialogue où vous pouvez modifier un champ commun pour tous les projets sélectionnés en une seule fois.

Après une modification ou une suppression groupée, la liste se met à jour automatiquement.