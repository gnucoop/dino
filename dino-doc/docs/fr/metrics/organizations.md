---
title: Organisations
description: Gérer les organisations dans Dino – consulter, ajouter, modifier, supprimer et importer des organisations.
---

# Organisations

La page **Organisations** liste toutes les organisations configurées dans votre instance Dino. Utilisez cet écran pour consulter, ajouter, modifier, supprimer et importer des organisations, ainsi que pour gérer la hiérarchie organisationnelle.

![Vue principale de la page Organisations](../imgs/metrics/organizations.png)

## Colonnes du tableau

Par défaut, le tableau affiche les colonnes suivantes :

- **Nom de l'organisation** – le nom de l'organisation. Cette colonne peut être triée.
- **Organisation parente** – le nom de l'organisation parente, s'il y en a une.

Des colonnes supplémentaires (ID, Date de création, Chemin du logo, URL du site web, Attributs supplémentaires) sont masquées mais disponibles lorsque vous personnalisez l'affichage des colonnes à l'aide de l'icône **Voir la semaine** (en bas à droite de l'en-tête du tableau).

## Actions par ligne

Chaque ligne propose trois actions accessibles en cliquant sur le bouton **Plus** (trois points) à côté de la ligne :

- **Consulter** (icône œil) – ouvre une boîte de dialogue en lecture seule avec les détails de l'organisation.
- **Modifier** (icône crayon) – ouvre une boîte de dialogue pour modifier les détails de l'organisation.
- **Supprimer** (icône poubelle) – supprime définitivement l'organisation. Une boîte de dialogue de confirmation apparaît avant la suppression.

!!! warning "Suppression d'organisations avec précaution"
    La suppression d'une organisation est irréversible. Assurez-vous qu'aucun dossier ou formulaire actif n'en dépend avant de la retirer.

Vous pouvez également cliquer directement sur une ligne pour la **sélectionner** (actions groupées) ou la **développer** pour voir plus de détails sur place.

## Actions groupées et filtres

Sélectionnez plusieurs lignes à l'aide des cases à cocher de la première colonne, puis utilisez les boutons de suppression ou de modification groupées qui apparaissent dans la barre d'outils.

### Recherche et filtres

La barre de filtres en haut de la page propose :

- **Recherche par mot-clé** – filtre les organisations par tout texte.
- **Période** – filtre par plage de dates de création.
- **Gestionnaire de préréglages** – enregistre et charge des préréglages de filtres de recherche.
- **Exporter** – télécharge la liste filtrée sous forme de fichier.

Cliquez sur le bouton **Filtrer** pour ouvrir des filtres avancés offrant un contrôle plus granulaire.

## Ajouter et importer des organisations

Deux boutons d'action flottants sont toujours visibles dans le coin inférieur droit :

- **Ajouter** (icône plus) – ouvre une boîte de dialogue pour créer une nouvelle organisation. Vous serez invité à saisir le nom de l'organisation, l'organisation parente, l'URL du site web et d'autres détails.
- **Importer** (icône de téléchargement cloud) – permet de charger un fichier (CSV, JSON ou XML) pour importer des organisations en masse. Suivez les instructions à l'écran pour mapper les champs.

!!! tip "Internationalisation"
    Les noms et libellés des organisations peuvent être traduits si votre instance Dino prend en charge plusieurs langues. Voir [Langues](../administration/languages.md) pour plus de détails.

## Étapes : Créer une nouvelle organisation

1. Cliquez sur le bouton flottant **Ajouter**.
2. Dans la boîte de dialogue qui s'ouvre, remplissez les champs obligatoires (Nom de l'organisation et au moins un attribut).
3. Optionnellement, définissez une **Organisation parente** pour créer une hiérarchie.
4. Cliquez sur **Enregistrer**. La nouvelle organisation apparaît immédiatement dans la liste.

## Étapes : Exporter des organisations

1. Appliquez les filtres souhaités dans la barre de recherche.
2. Cliquez sur le bouton **Exporter** (icône de téléchargement cloud) dans la barre de filtres.
3. Choisissez le format d'exportation (CSV, Excel, etc.) et confirmez.
4. Le fichier se télécharge sur votre appareil.

## Pages connexes

- [Aperçu des métriques](index.md) – toutes les pages de gestion des métriques.
- [Domaines thématiques](areas.md) – gérer les domaines thématiques des organisations.
- [Dossiers](cases.md) – associer des dossiers aux organisations.
- [Lieux](locations.md) – lier des lieux aux organisations.
- [Projets](projects.md) – connecter des organisations aux projets.