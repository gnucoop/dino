---
title: Gérer les valeurs des métriques – Domaines thématiques
description: Apprenez à consulter, ajouter, modifier, supprimer et rechercher des domaines thématiques dans la section de gestion des métriques de Dino.
---

# Gérer les valeurs des métriques – Domaines thématiques

La page **Domaines thématiques** (accessible depuis la section Métriques) vous permet d'organiser vos données de métriques par catégories hiérarchiques. Vous pouvez ici consulter, créer, modifier et supprimer des domaines thématiques, ainsi que filtrer et exporter la liste.

![Vue principale de la page Gérer les valeurs des métriques](../imgs/metrics/areas.png)

## Ce que vous voyez

- **Le fil d'Ariane** en haut indique votre emplacement actuel dans l'application.
- Le tableau principal liste tous les domaines thématiques, avec des colonnes telles que **Nom du domaine**, **Domaine parent** et (si configuré) d'autres attributs. Vous pouvez personnaliser les colonnes visibles en cliquant sur l'icône **view_week** dans l'en-tête.
- Une **barre de recherche** et un **panneau de filtre** vous permettent de trouver des domaines par mot-clé, plage de dates ou autres métadonnées.
- Le bouton **Exporter** (cloud_download) permet de télécharger la liste actuelle sous forme de fichier.
- Deux boutons d'action flottants sont disponibles :
    - **+ (Ajouter)** – crée un nouveau domaine thématique.
    - **cloud_upload** – importe des domaines à partir d'un fichier externe.

## Travailler avec les domaines thématiques

### Ajouter un nouveau domaine thématique

1. Cliquez sur le bouton flottant **+**.
2. Dans la boîte de dialogue qui s'ouvre, remplissez les champs obligatoires (par ex., **Nom du domaine**, **Domaine parent**).
3. Cliquez sur **Créer** pour enregistrer le nouveau domaine.

!!! tip "Domaine parent"
    Pour créer un sous-domaine, sélectionnez un **Domaine parent** dans la liste déroulante. Si laissé vide, le nouveau domaine devient une entrée de premier niveau.

### Modifier un domaine existant

1. Trouvez le domaine que vous souhaitez modifier dans le tableau.
2. Cliquez sur l'icône **edit** (crayon) dans la colonne des actions de la ligne.
3. Modifiez les champs dans la boîte de dialogue et cliquez sur **Enregistrer**.

### Consulter les détails

- Cliquez sur l'icône **visibility** pour ouvrir une boîte de dialogue en lecture seule affichant tous les champs du domaine.
- Vous pouvez également **cliquer sur une ligne** pour la développer et révéler les éventuels sous-domaines (si la hiérarchie est configurée).

### Supprimer un domaine

1. Cliquez sur l'icône **delete** (corbeille) dans la colonne des actions de la ligne.
2. Confirmez la suppression dans la boîte de dialogue qui apparaît.

!!! warning "Considérations sur la suppression"
    La suppression d'un domaine parent peut affecter les sous-domaines. Dino vous avertira s'il existe des éléments associés. Procédez avec prudence.

## Recherche et filtrage

- Utilisez le champ de **recherche par mot-clé** en haut de la liste pour filtrer les domaines par nom.
- Ouvrez le panneau de filtre en cliquant sur la flèche **expand**. Vous pouvez définir :
    - **Date de début / Date de fin** – filtrer par date de création.
    - **Filtres supplémentaires** (par ex., champs spécifiques aux métriques) – si votre instance possède des attributs personnalisés.
- Appliquez un **préréglage de filtre** (si disponible) pour charger rapidement des combinaisons de filtres sauvegardées.

## Exporter la liste

1. Cliquez sur le bouton **cloud_download** dans la barre d'outils.
2. Choisissez le format d'exportation (par ex., CSV, Excel).
3. Le fichier sera généré avec l'ensemble des domaines actuellement visibles (filtrés).

## Actions groupées

Pour effectuer des actions sur plusieurs domaines à la fois (par ex., supprimer plusieurs), sélectionnez les cases à cocher en regard des lignes. Les boutons d'actions groupées apparaîtront dans l'en-tête de colonne. Actuellement, l'écran des domaines thématiques prend en charge la **suppression groupée**.

## Naviguer avec le fil d'Ariane

Le fil d'Ariane indique votre emplacement actuel (par ex., **Métriques > Domaines thématiques**). Cliquez sur un lien du fil d'Ariane pour accéder à un niveau supérieur.

## Pages connexes

- [Aperçu des métriques](index.md)
- [Gérer les valeurs des métriques – Cas, Lieux, Organisations et Projets](areas.md) (cette page)
- [Utilisateurs et groupes](../administration/users.md)
