---
title: Emplacements
description: Gérez les emplacements géographiques utilisés dans l'ensemble des métriques et formulaires Dino.
---

# Emplacements

La page **Emplacements** vous permet de gérer les emplacements géographiques référencés par vos formulaires, cas et autres métriques. Vous pouvez ajouter de nouveaux emplacements, modifier des entrées existantes, importer des données en masse et exporter la liste actuelle.

![Vue principale de la page Emplacements](../imgs/metrics/locations.png)

## Ce que vous voyez

- **Fil d'Ariane** – indique votre position actuelle dans la navigation.
- **Recherche et filtres** – recherche par mot-clé, sélecteur de plage de dates et filtres avancés configurables (par exemple, par métrique, statut, utilisateur). Vous pouvez également enregistrer et charger des préréglages de filtres.
- **Tableau** – affiche par défaut le Nom de l'emplacement et l'Emplacement parent. Les colonnes masquées (ID, Date de création, Coordonnées, Attributs supplémentaires) peuvent être affichées via le bouton **Personnaliser les colonnes** (en bas à droite de l'en-tête du tableau).
- **Pagination** – contrôles pour naviguer entre les pages.
- **Actions groupées** – sélectionnez des lignes à l'aide des cases à cocher pour supprimer ou modifier plusieurs emplacements à la fois.
- **Boutons d'action flottants** – **Ajouter nouveau** (icône plus) et **Importer** (icône de téléchargement cloud) restent disponibles pendant le défilement.

## Actions par ligne

Chaque ligne dispose de trois actions rapides (visibles en survolant la ligne) :

- **Modifier** – ouvre la boîte de dialogue de l'emplacement pour modifier les détails.
- **Supprimer** – supprime l'emplacement après confirmation.
- **Afficher** – ouvre une boîte de dialogue en lecture seule montrant tous les champs.

Cliquer sur une ligne la sélectionne (surbrillance) et, si la liste est extensible, révèle un panneau de détails avec des données supplémentaires.

## Travailler avec les emplacements

### Ajouter un nouvel emplacement

1. Cliquez sur le bouton flottant **Ajouter nouveau** (coin inférieur droit).
2. Dans la boîte de dialogue, remplissez les champs obligatoires (par exemple, Nom de l'emplacement).
3. Définissez éventuellement un Emplacement parent, des Coordonnées et des Attributs supplémentaires.
4. Cliquez sur **Enregistrer**.

### Modifier un emplacement

1. Cliquez sur l'icône **Modifier** (crayon) sur la ligne souhaitée.
2. Mettez à jour les champs dans la boîte de dialogue.
3. Cliquez sur **Enregistrer**.

### Supprimer un emplacement

1. Cliquez sur l'icône **Supprimer** (poubelle) sur la ligne.
2. Confirmez la suppression dans l'invite.

### Importer des emplacements depuis un fichier

1. Cliquez sur le bouton flottant **Importer** (icône de téléchargement cloud).
2. Sélectionnez un fichier CSV ou Excel respectant le format attendu.
3. Si nécessaire, mappez les colonnes aux champs d'emplacement.
4. Cliquez sur **Importer**.

!!! tip "Modification groupée"
    Sélectionnez plusieurs lignes à l'aide des cases à cocher, puis cliquez sur le bouton **Modifier** (icône edit_note) qui apparaît au-dessus du tableau pour mettre à jour plusieurs emplacements à la fois.

### Exporter la liste des emplacements

1. Cliquez sur le bouton **Exporter** (icône de téléchargement cloud) dans la barre de filtres.
2. Choisissez le format d'exportation (CSV ou Excel).
3. Le fichier se télécharge automatiquement.

## Pages associées

- [Aperçu des métriques](index.md) – retour à l'accueil des métriques.
- [Cas](cases.md) – gérer les cas qui référencent des emplacements.
- [Organisations](organizations.md) – gérer les organisations liées aux emplacements.
- [Projets](projects.md) – consulter les projets associés aux emplacements.

!!! warning "Suppression d'un emplacement"
    La suppression d'un emplacement peut affecter les formulaires et les cas qui le référencent. Assurez-vous qu'aucun enregistrement actif ne dépend de l'emplacement avant de le supprimer.