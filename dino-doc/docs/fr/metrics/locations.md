---
title: Emplacements
description: Gérez les emplacements géographiques utilisés dans les métriques et les form de Dino.
---

# Emplacements

La page **Emplacements** vous permet de gérer les emplacements géographiques référencés par vos form, vos cas et d'autres métriques. Vous pouvez ajouter de nouveaux emplacements, modifier des entrées existantes, importer des données en masse et exporter la liste actuelle.

![Vue principale de la page Emplacements](../imgs/metrics/locations.png)

## Ce que vous voyez

- **Percorso di navigazione** – indique votre position actuelle dans la navigation.
- **Recherche et filtres** – un champ de recherche par mot-clé, et le bouton **Filtres** pour filtrer par date de création (**De date** / **À ce jour**).
- **Compteur d'éléments trouvés** – indique combien d'emplacements correspondent aux filtres actuels.
- **tableau** – affiche par défaut le nom de l'emplacement et l'emplacement parent. Les colonnes masquées (ID, date de création, coordonnées, attributs supplémentaires) peuvent être affichées via le bouton **Colonnes**, au-dessus du tableau, à droite.
- **Pagination** – contrôles de navigation entre les pages.
- **Actions groupées** – sélectionnez des lignes à l'aide des cases à cocher pour supprimer plusieurs emplacements à la fois.
- **Boutons de la barre d'outils** – **Ajouter un nouvel EMPLACEMENT** (icône plus) et **Importer un EMPLACEMENT** (icône de téléchargement cloud) se trouvent au-dessus du tableau.

## Actions sur les lignes

Survolez une ligne pour afficher les icônes **Modifier** et **Voir**. Cliquez sur la ligne pour la sélectionner et la mettre en surbrillance : la barre d'actions au-dessus du tableau affiche alors toutes les actions :

- **Modifier** – ouvre la boîte de dialogue de l'emplacement pour en modifier les détails.
- **Supprimer** – supprime l'emplacement après confirmation.
- **Voir** – ouvre une boîte de dialogue en lecture seule affichant tous les champs.

## Utiliser les emplacements

### Ajouter un nouvel emplacement

1. Cliquez sur le bouton **Ajouter un nouvel EMPLACEMENT** au-dessus du tableau.
2. Dans la boîte de dialogue, renseignez les champs obligatoires (par exemple, le nom de l'emplacement). Les champs facultatifs sont marqués *(facultatif)*.
3. Vous pouvez éventuellement définir un emplacement parent, des coordonnées et des attributs supplémentaires.
4. Cliquez sur **Enregistrer**.

### Modifier un emplacement

1. Survolez la ligne et cliquez sur l'icône **Modifier** (crayon), ou sélectionnez la ligne et cliquez sur **Modifier** dans la barre d'actions.
2. Mettez à jour les champs dans la boîte de dialogue.
3. Cliquez sur **Enregistrer**.

### Supprimer un emplacement

1. Cliquez sur la ligne pour la sélectionner, puis cliquez sur **Supprimer** dans la barre d'actions au-dessus du tableau.
2. Confirmez la suppression dans l'invite.

Un emplacement utilisé par des form, ou comportant des emplacements enfants, ne peut pas être supprimé ; voir [Métriques](index.md).

### Importer des emplacements depuis un fichier

1. Cliquez sur le bouton **Importer un EMPLACEMENT** au-dessus du tableau.
2. Importez un fichier `.xls`, `.xlsx` ou `.csv`.
3. Associez les colonnes du fichier aux champs d'emplacement.
4. Cliquez sur **Appliquer l'importation** et vérifiez le résultat.

Les emplacements dont le nom existe déjà sont réutilisés, et non mis à jour.

### Exporter la liste des emplacements

1. Cliquez sur **Exportation** dans la barre d'outils.
2. Choisissez ce qu'il faut exporter : *Éléments de la page* (par défaut), les éléments correspondant à vos filtres, ou *Tous les éléments*.
3. Choisissez le format : *csv*, *xlsx* ou *splitted xlsx*, puis cliquez sur **Exportation**.

!!! tip "Suppression groupée"
    Sélectionnez plusieurs lignes à l'aide des cases à cocher, puis cliquez sur **Supprimer** dans la barre d'actions au-dessus du tableau pour supprimer plusieurs emplacements à la fois.

### Coordonnées des emplacements

Si vous définissez l'attribut **Coordonnées** pour un emplacement, cette information est utilisée pour visualiser les données de vos form sur une [carte](../forms/forms-map.md).

## Pages associées

- [Présentation des métriques](index.md) – revenir à l'accueil des métriques.
- [Cas](cases.md) – gérer les cas qui font référence à des emplacements.
- [Organisations](organizations.md) – gérer les organisations liées aux emplacements.
- [Projets](projects.md) – consulter les projets associés aux emplacements.