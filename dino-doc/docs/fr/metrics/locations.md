---
title: Lieux
description: Gérez les lieux géographiques utilisés dans les métriques et les formulaires de Dino.
---

# Lieux

La page **Lieux** vous permet de gérer les lieux géographiques référencés par vos formulaires, cas et autres métriques. Vous pouvez ajouter de nouveaux lieux, modifier les entrées existantes, importer des données en masse et exporter la liste actuelle.

![Vue principale de la page Lieux](../imgs/metrics/locations.png)

## Ce que vous voyez

- **Fil d'Ariane** – indique votre position actuelle dans la navigation.
- **Recherche et filtres** – recherche par mot-clé, sélecteur de plage de dates et filtres avancés configurables (par exemple par métrique, statut ou utilisateur). Vous pouvez également enregistrer et charger des préréglages de filtres.
- **Tableau** – affiche par défaut le nom du lieu et le lieu parent. Les colonnes masquées (ID, date de création, coordonnées, attributs supplémentaires) peuvent être affichées via le bouton **Afficher les colonnes** (en bas à droite de l'en-tête du tableau).
- **Pagination** – contrôles permettant de naviguer entre les pages.
- **Actions groupées** – sélectionnez des lignes à l'aide des cases à cocher pour supprimer ou modifier plusieurs lieux à la fois.
- **Boutons d'action flottants** – **Ajouter** (icône plus) et **Importer** (icône de chargement dans le cloud) restent disponibles lorsque vous faites défiler la page.

## Actions par ligne

Chaque ligne dispose de trois actions rapides (visibles lorsque vous survolez la ligne) :

- **Modifier** – ouvre la boîte de dialogue du lieu pour en modifier les détails.
- **Supprimer** – supprime le lieu après confirmation.
- **Voir** – ouvre une boîte de dialogue en lecture seule affichant tous les champs.

Cliquer sur une ligne la sélectionne (la met en surbrillance) et, si la liste est extensible, affiche un panneau de détail contenant des données supplémentaires.

## Travailler avec les lieux

### Ajouter un lieu

1. Cliquez sur le bouton flottant **Ajouter** (en bas à droite).
2. Dans la boîte de dialogue, renseignez les champs obligatoires (par exemple le nom du lieu).
3. Définissez éventuellement un lieu parent, des coordonnées et des attributs supplémentaires.
4. Cliquez sur **Enregistrer**.

### Modifier un lieu

1. Cliquez sur l'icône **Modifier** (crayon) de la ligne souhaitée.
2. Mettez à jour les champs dans la boîte de dialogue.
3. Cliquez sur **Enregistrer**.

### Supprimer un lieu

1. Cliquez sur l'icône **Supprimer** (corbeille) de la ligne.
2. Confirmez la suppression dans la fenêtre de confirmation.

### Importer des lieux depuis un fichier

1. Cliquez sur le bouton flottant **Importer** (icône de chargement dans le cloud).
2. Sélectionnez un fichier CSV ou Excel respectant le format attendu.
3. Associez les colonnes aux champs du lieu si nécessaire.
4. Cliquez sur **Importer**.

!!! tip "Modification en masse"
    Sélectionnez plusieurs lignes à l'aide des cases à cocher, puis cliquez sur le bouton **Modifier** (icône edit_note) qui apparaît au-dessus du tableau pour mettre à jour plusieurs lieux à la fois.

### Exporter la liste des lieux

1. Cliquez sur le bouton **Exporter** (icône de téléchargement depuis le cloud) dans la barre de filtres.
2. Choisissez le format d'export (CSV ou Excel).
3. Le fichier se télécharge automatiquement.

### Coordonnées d'un lieu

Si vous définissez l'attribut « coordinates » d'un lieu donné, cette information sera utilisée pour visualiser les données de votre formulaire sur une [carte](../forms/forms-map.md).

## Pages liées

- [Vue d'ensemble des métriques](index.md) – revenir à l'accueil des métriques.
- [Cas](cases.md) – gérer les cas qui référencent des lieux.
- [Organisations](organizations.md) – gérer les organisations liées aux lieux.
- [Projets](projects.md) – consulter les projets associés aux lieux.