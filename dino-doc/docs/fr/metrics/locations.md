---
title: Lieux
description: Gérez les lieux géographiques utilisés dans les métriques et les formulaires Dino.
---

# Lieux

La page **Lieux** vous permet de gérer les lieux géographiques référencés par vos formulaires, dossiers et autres métriques. Vous pouvez ajouter de nouveaux lieux, modifier des entrées existantes, importer des données en masse et exporter la liste actuelle.

![Vue principale de la page Lieux](../imgs/metrics/locations.png)

## Ce que vous voyez

- **Fil d’Ariane** – indique votre position actuelle dans la navigation.
- **Recherche et filtres** – recherche par mot-clé, sélecteur de période et filtres avancés configurables (par exemple, par métrique, statut, utilisateur). Vous pouvez également enregistrer et charger des préréglages de filtres.
- **Tableau** – affiche le nom du lieu et le lieu parent par défaut. Les colonnes masquées (ID, date de création, coordonnées, attributs supplémentaires) peuvent être affichées via le bouton **Personnaliser les colonnes** (en bas à droite de l’en-tête du tableau).
- **Pagination** – commandes pour naviguer entre les pages.
- **Actions groupées** – sélectionnez des lignes à l’aide des cases à cocher pour supprimer ou modifier plusieurs lieux à la fois.
- **Boutons d’action flottants** – **Ajouter** (icône plus) et **Importer** (icône de téléversement vers le cloud) restent disponibles pendant le défilement.

## Actions sur les lignes

Chaque ligne propose trois actions rapides (visibles au survol de la ligne) :

- **Modifier** – ouvre la boîte de dialogue du lieu pour en modifier les détails.
- **Supprimer** – supprime le lieu après confirmation.
- **Afficher** – ouvre une boîte de dialogue en lecture seule présentant tous les champs.

Cliquer sur une ligne la sélectionne (mise en surbrillance) et, si la liste est extensible, révèle un panneau de détails contenant des données supplémentaires.

## Travailler avec les lieux

### Ajouter un nouveau lieu

1. Cliquez sur le bouton flottant **Ajouter** (coin inférieur droit).
2. Dans la boîte de dialogue, remplissez les champs obligatoires (par exemple, le nom du lieu).
3. Définissez éventuellement un lieu parent, des coordonnées et des attributs supplémentaires.
4. Cliquez sur **Enregistrer**.

### Modifier un lieu

1. Cliquez sur l’icône **Modifier** (crayon) sur la ligne souhaitée.
2. Mettez à jour les champs dans la boîte de dialogue.
3. Cliquez sur **Enregistrer**.

### Supprimer un lieu

1. Cliquez sur l’icône **Supprimer** (corbeille) sur la ligne.
2. Confirmez la suppression dans la boîte de dialogue.

### Importer des lieux depuis un fichier

1. Cliquez sur le bouton flottant **Importer** (icône de téléversement vers le cloud).
2. Sélectionnez un fichier CSV ou Excel au format attendu.
3. Mappez les colonnes vers les champs du lieu si nécessaire.
4. Cliquez sur **Importer**.

!!! tip "Modification groupée"
    Sélectionnez plusieurs lignes à l’aide des cases à cocher, puis cliquez sur le bouton **Modifier** (icône edit_note) qui apparaît au-dessus du tableau pour mettre à jour plusieurs lieux à la fois.

### Exporter la liste des lieux

1. Cliquez sur le bouton **Exporter** (icône de téléchargement depuis le cloud) dans la barre de filtres.
2. Choisissez le format d’export (CSV ou Excel).
3. Le fichier est téléchargé automatiquement.

## Pages associées

- [Vue d’ensemble des métriques](index.md) – revenir à l’accueil des métriques.
- [Dossiers](cases.md) – gérer les dossiers qui référencent des lieux.
- [Organisations](organizations.md) – gérer les organisations liées aux lieux.
- [Projets](projects.md) – consulter les projets associés aux lieux.

!!! warning "Suppression d’un lieu"
    La suppression d’un lieu peut affecter les formulaires et les dossiers qui le référencent. Assurez-vous qu’aucun enregistrement actif ne dépend de ce lieu avant de le supprimer.