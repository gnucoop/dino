---
title: Projets
description: Gérez vos projets dans Dino. Consultez, ajoutez, modifiez, supprimez, importez et exportez des fiches projets avec filtres et actions groupées.
---

# Projets

La page **Projets** de Dino vous permet de gérer toutes vos fiches projets structurées. Vous pouvez consulter une liste triable de projets, en ajouter de nouveaux, modifier les existants, les supprimer, importer des données en masse et exporter la liste pour une analyse hors ligne. La page offre également de puissants outils de filtrage pour trouver rapidement le projet souhaité.

![Vue principale de la page Projets](../imgs/metrics/projects.png)

## Accéder aux projets

Pour ouvrir la page Projets, déployez la section **Métriques** dans la navigation principale et sélectionnez **Projets**. L'URL du navigateur se terminera par `/metrics/projects`.

## Comprendre la liste des projets

Le tableau principal affiche une liste de tous les projets. Chaque ligne correspond à un projet et présente par défaut les colonnes suivantes :

- **Nom du projet** – Le nom du projet. Vous pouvez trier la liste selon cette colonne.
- **Projet parent** – Le projet de niveau supérieur auquel ce projet est rattaché, s'il y en a un.
- **Code** – Un code projet attribué manuellement.
- **Code automatique** – Un code généré automatiquement. Ce champ est en lecture seule et ne peut pas être modifié.
- **Secteurs d'intervention** – Les secteurs sur lesquels le projet se concentre.
- **Bailleurs** – Les sources de financement du projet.
- **Date de début** – La date à laquelle le projet commence.
- **Date de fin** – La date à laquelle le projet se termine.

Les colonnes masquées (ID, Date de création et Attributs supplémentaires) peuvent être affichées en cliquant sur le bouton **Personnaliser les colonnes** (l'icône ressemble à une vue hebdomadaire) en haut à droite du tableau.

!!! tip "Champs en lecture seule"
    Le champ **Code automatique** est généré automatiquement et ne peut pas être modifié. Il apparaîtra grisé dans la boîte de dialogue de modification.

La barre d'outils supérieure affiche le nombre total d'éléments trouvés ainsi qu'un paginateur. Vous pouvez choisir le nombre de projets à afficher par page.

## Gérer les projets

### Ajouter un nouveau projet

1. Cliquez sur le bouton flottant **Ajouter nouveau** (l'icône **+** entourée d'un cercle) en bas à droite de l'écran.
2. Une boîte de dialogue s'ouvre pour saisir les détails du projet. Les champs obligatoires sont signalés en conséquence.
3. Appuyez sur **Enregistrer** pour créer le projet. Il apparaîtra immédiatement dans la liste.

### Modifier un projet

1. Dans la ligne du projet à modifier, cliquez sur l'icône **modifier** (crayon).
2. Modifiez les champs dans la boîte de dialogue. Le champ **Code automatique** sera grisé.
3. Cliquez sur **Enregistrer** pour appliquer vos modifications.

### Consulter un projet

- Cliquez sur l'icône **consulter** (œil) dans la ligne du projet pour ouvrir une version en lecture seule de la boîte de dialogue des détails du projet.

### Supprimer un projet

1. Cliquez sur l'icône **supprimer** (corbeille) dans la ligne du projet.
2. Confirmez la suppression dans la fenêtre contextuelle. Le projet sera définitivement supprimé.

!!! warning "Suppression d'un projet"
    La suppression d'un projet le retire du système. Cette action est irréversible. Assurez-vous d'avoir sélectionné le bon projet avant de confirmer.

## Recherche et filtres

La barre de **recherche et filtres** se trouve sous le fil d'Ariane. Vous pouvez :

- **Rechercher par mot-clé** – Saisissez un terme dans le champ de mot-clé ; la liste se filtre automatiquement.
- **Filtrer par plage de dates** – Utilisez les sélecteurs **Date de début** et **Date de fin** pour restreindre les projets selon leur date de début ou de fin.
- **Appliquer des filtres supplémentaires** – Cliquez sur le bouton **liste de filtres** (icône entonnoir) pour ouvrir une boîte de dialogue avec des filtres plus avancés, comme les secteurs, les bailleurs ou d'autres attributs personnalisés.
- **Enregistrer et charger des préréglages de filtres** – Utilisez le gestionnaire de préréglages pour enregistrer votre combinaison de filtres actuelle et la recharger plus tard.

Des pastilles de filtre apparaissent sous la barre de filtres, indiquant les filtres actifs. Vous pouvez retirer chaque pastille individuellement en cliquant sur l'icône **annuler** correspondante.

## Exportation et importation

### Exporter des projets

1. Cliquez sur le bouton **exporter** (icône de téléchargement nuage) dans la barre de filtres.
2. Choisissez le format d'exportation (par ex. CSV, Excel) et les colonnes à inclure.
3. Le fichier sera téléchargé sur votre ordinateur.

### Importer des projets

1. Cliquez sur le bouton flottant **importer** (icône de téléversement nuage) en bas à droite.
2. Téléversez un fichier au format approprié (par ex. CSV ou Excel). Le système créera ou mettra à jour les projets en fonction des données.
3. Vérifiez les résultats de l'importation pour détecter d'éventuelles erreurs ou avertissements.

## Actions groupées

Vous pouvez sélectionner plusieurs projets à l'aide des cases à cocher situées à gauche de chaque ligne. Dès qu'au moins un projet est sélectionné, la barre d'outils au-dessus du tableau affiche les actions groupées :

- **Supprimer la sélection** – Supprime tous les projets sélectionnés après confirmation.
- **Modifier la sélection (édition groupée du formulaire)** – Ouvre une boîte de dialogue permettant de modifier un champ commun pour tous les projets sélectionnés à la fois.

Après une modification ou une suppression groupée, la liste se met automatiquement à jour.