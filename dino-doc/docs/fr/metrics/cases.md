---
title: Cas
description: Gérer les cas dans Dino — créez, modifiez, consultez, imprimez, filtrez et exportez les enregistrements de cas depuis un tableau de données structuré.
---

# Cas

La page Cas est un espace de travail centralisé pour suivre et gérer les enregistrements de cas individuels. Chaque cas est un enregistrement structuré qui peut contenir un nom, un code, une image, une relation parent, des notes et des attributs supplémentaires. Depuis cette page, vous pouvez créer de nouveaux cas, modifier ou consulter les cas existants, imprimer des fiches de cas, supprimer des enregistrements et exporter votre liste de cas — le tout à partir d'un seul tableau interactif.

![Vue principale de la page Cas](../imgs/metrics/cases.png)

## Aperçu du tableau

Le tableau affiche les colonnes suivantes par défaut :

- **Case Name** – Le nom attribué au cas (triable).
- **Code** – Un code identifiant le cas. Dino le génère : vous ne le saisissez pas, et il n'est pas affiché dans la boîte de dialogue du cas.
- **Case Image** – Un fichier image téléversé représentant le cas.
- **Cas parent** – Le nom du cas parent auquel ce cas appartient.

Les colonnes supplémentaires — **ID**, **Notes**, **Date de création** et **Attributs supplémentaires** — sont masquées par défaut. Cliquez sur **Colonnes** au-dessus du tableau pour choisir les colonnes à afficher. Vous pouvez également faire glisser les en-têtes de colonnes pour les réorganiser, et la page affiche le nombre total d'éléments trouvés à côté du paginateur.

## Travailler avec un seul cas

Survolez une ligne pour afficher les icônes **Modifier** et **Voir**. Cliquez sur la ligne pour la sélectionner : la barre d'actions au-dessus du tableau affiche alors toutes les actions :

- **Modifier** – Ouvre une boîte de dialogue dans laquelle vous pouvez modifier les détails du cas.
- **Imprimer** – Génère une fiche PDF imprimable pour le cas.
- **Voir** – Ouvre une boîte de dialogue en lecture seule pour consulter les informations du cas.
- **Supprimer** – Ouvre une boîte de dialogue de confirmation pour supprimer définitivement le cas.

## Travailler avec plusieurs cas

1. Sélectionnez une ou plusieurs lignes à l'aide des cases à cocher de la première colonne.
2. Lorsqu'une seule ligne est sélectionnée, toutes ses actions deviennent disponibles dans la barre d'actions au-dessus du tableau.
3. Lorsque plusieurs lignes sont sélectionnées, seules les actions groupées restent disponibles — actuellement **Supprimer**.

!!! warning "La suppression est définitive"
    Les cas supprimés ne peuvent pas être récupérés. Vérifiez attentivement votre sélection avant de confirmer une suppression groupée. Un cas utilisé par des form, ou comportant des cas enfants, ne peut pas être supprimé ; voir [Metrics](index.md).

## Créer un cas

1. Cliquez sur **Add new CASE** dans la barre d'outils au-dessus du tableau.
2. Dans la boîte de dialogue, renseignez les détails du cas. Les champs facultatifs sont marqués *(optional)*.
    - **Case Name** – Saisissez un nom descriptif.
    - **Case Image** – Téléversez un fichier image.
    - **Cas parent** – Liez éventuellement ce cas à un cas parent existant.
    - **Notes** – Ajoutez toute note pertinente.
3. Cliquez sur **Enregistrer** pour créer le cas.

## Importer des cas

Cliquez sur **Import CASE** dans la barre d'outils pour téléverser des cas en masse à partir d'un fichier `.xls`, `.xlsx` ou `.csv`. La page d'importation vous guide à travers le téléversement du fichier, le mappage de ses colonnes et la vérification du résultat. Les cas dont le nom existe déjà sont réutilisés, et non mis à jour ; le code est généré par Dino et ne peut pas être importé.

## Rechercher et filtrer

Utilisez la barre d'outils pour affiner le tableau :

- **Recherche par mot-clé** – Saisissez du texte dans le champ de recherche pour trouver une correspondance dans les champs affichés.
- **Filtres** – Ouvrez le panneau de filtres pour définir un **De date** et un **À ce jour**, qui filtrent par date de création, puis cliquez sur **Chercher**. Le badge sur le bouton **Filtres** indique le nombre de filtres actifs.
- Les filtres appliqués apparaissent sous forme de puces sous la barre d'outils ; cliquez sur l'icône d'annulation d'une puce pour supprimer ce filtre.

## Exporter des cas

1. Cliquez sur **Exportation** dans la barre d'outils.
2. Choisissez ce qu'il faut exporter : *Éléments de la page* (par défaut), les éléments correspondant à vos filtres, ou *Tous les éléments*.
3. Choisissez le format : *csv*, *xlsx* ou *splitted xlsx*, puis cliquez sur **Exportation**.

## Pages associées

- [Metrics Overview](index.md) – Revenir au tableau de bord principal des métriques.
- [Thematic Areas](areas.md) – Organiser les cas par domaine thématique.
- [Locations](locations.md) – Associer les cas à des localisations géographiques.
- [Organizations](organizations.md) – Lier les cas à des organisations.
- [Projects](projects.md) – Regrouper les cas sous des projets.