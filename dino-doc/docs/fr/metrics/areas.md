---
title: Gestion des valeurs métriques – Domaines thématiques
description: Apprenez à afficher, ajouter, modifier, supprimer et rechercher des domaines thématiques dans la section de gestion des métriques de Dino.
---

# Gestion des valeurs métriques – Domaines thématiques

La page **Domaines thématiques** (accessible depuis la section Métriques) vous permet d’organiser vos données métriques par catégories hiérarchiques. Vous pouvez ici afficher, créer, modifier et supprimer des domaines thématiques, ainsi que filtrer et exporter la liste.

![Main view of the Thematic Areas page](../imgs/metrics/areas.png)

## Ce que vous voyez

- Le **fil d’Ariane** en haut affiche votre position actuelle dans l’application (par exemple, **Métriques > Domaines thématiques**).
- Le tableau principal répertorie tous les domaines thématiques, avec des colonnes telles que **Nom du domaine**, **Domaine parent** et, si configuré, d’autres attributs. Vous pouvez personnaliser les colonnes visibles en cliquant sur l’icône **view_week** dans l’en-tête.
- Une **barre de recherche** et un **panneau de filtres** vous permettent de trouver des domaines par mot-clé, plage de dates ou autres métadonnées.
- Le bouton **Exporter** (cloud_download) vous permet de télécharger la liste actuelle sous forme de fichier.
- Deux boutons d’action flottants sont disponibles :
    - **+ (Ajouter)** – crée un nouveau domaine thématique.
    - **cloud_upload** – importe des domaines à partir d’un fichier externe.

## Travailler avec les domaines thématiques

### Ajouter un nouveau domaine thématique

1. Cliquez sur le bouton flottant **+**.
2. Dans la boîte de dialogue qui s’ouvre, remplissez les champs obligatoires (par exemple, **Nom du domaine**, **Domaine parent**).
3. Cliquez sur **Créer** pour enregistrer le nouveau domaine.

!!! tip "Domaine parent"
    Pour créer un sous-domaine, sélectionnez un **domaine parent** dans la liste déroulante. Si le champ est laissé vide, le nouveau domaine devient une entrée de niveau supérieur.

### Modifier un domaine existant

1. Trouvez le domaine à modifier dans le tableau.
2. Cliquez sur l’icône **edit** (crayon) dans la colonne des actions de la ligne.
3. Modifiez les champs dans la boîte de dialogue, puis cliquez sur **Enregistrer**.

### Afficher les détails

- Cliquez sur l’icône **visibility** pour ouvrir une boîte de dialogue en lecture seule affichant tous les champs du domaine.
- Vous pouvez également **cliquer sur une ligne** pour la développer et révéler d’éventuels sous-domaines (si la hiérarchie est configurée).

### Supprimer un domaine

1. Cliquez sur l’icône **delete** (corbeille) dans la colonne des actions de la ligne.
2. Confirmez la suppression dans la boîte de dialogue qui apparaît.

!!! warning "Précautions lors de la suppression"
    La suppression d’un domaine parent peut affecter les sous-domaines. Dino vous avertira s’il existe des éléments associés. Procédez avec prudence.

## Recherche et filtres

- Utilisez le champ **recherche par mot-clé** en haut de la liste pour filtrer les domaines par nom.
- Ouvrez le panneau de filtres en cliquant sur la flèche **expand**. Vous pouvez définir :
    - **Date de début / Date de fin** – filtrer par date de création.
    - **Filtres supplémentaires** (par exemple, champs spécifiques aux métriques) – si votre instance possède des attributs personnalisés.
- Appliquez un **préréglage de filtre** (si disponible) pour charger rapidement des combinaisons de filtres enregistrées.

## Exporter la liste

1. Cliquez sur le bouton **cloud_download** dans la barre d’outils.
2. Choisissez le format d’exportation (par exemple, CSV, Excel).
3. Le fichier sera généré avec l’ensemble des domaines actuellement visibles (filtrés).

## Actions groupées

Pour effectuer des actions sur plusieurs domaines à la fois (par exemple, en supprimer plusieurs), cochez les cases à côté des lignes. Les boutons d’actions groupées apparaissent dans l’en-tête de colonne. Actuellement, l’écran des domaines thématiques prend en charge la **suppression groupée**.

## Naviguer avec le fil d’Ariane

Le fil d’Ariane affiche votre position actuelle (par exemple, **Métriques > Domaines thématiques**). Cliquez sur un lien du fil d’Ariane pour accéder à un niveau supérieur.

## Pages connexes

- [Vue d’ensemble des métriques](index.md)
- [Gestion des valeurs métriques – Cas](cases.md)
- [Gestion des valeurs métriques – Localisations](locations.md)
- [Gestion des valeurs métriques – Organisations](organizations.md)
- [Gestion des valeurs métriques – Projets](projects.md)
- [Utilisateurs et groupes](../administration/users.md)