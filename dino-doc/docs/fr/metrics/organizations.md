---
title: Organisations
description: Gérez les organisations dans Dino – afficher, ajouter, modifier, supprimer et importer des organisations.
---

# Organisations

La page **Organisations** répertorie toutes les organisations configurées dans votre instance Dino. Utilisez cet écran pour afficher, ajouter, modifier, supprimer et importer des organisations, ainsi que pour gérer la hiérarchie organisationnelle.

![Main view of the Organizations page](../imgs/metrics/organizations.png)

## Colonnes du tableau

Par défaut, le tableau affiche les colonnes suivantes :

- **Nom de l’organisation** – le nom de l’organisation. Cette colonne est triable.
- **Organisation parente** – le nom de l’organisation parente, le cas échéant.

Des colonnes supplémentaires (ID, Date de création, Chemin du logo, URL du site web, Attributs supplémentaires) sont masquées mais disponibles lorsque vous personnalisez l’affichage des colonnes à l’aide de l’icône **Vue semaine** (en bas à droite de l’en-tête du tableau).

## Actions sur les lignes

Chaque ligne propose trois actions accessibles en cliquant sur le bouton **Plus** (trois points) à côté de la ligne :

- **Afficher** (icône de visibilité) – ouvre une boîte de dialogue en lecture seule avec les détails de l’organisation.
- **Modifier** (icône de crayon) – ouvre une boîte de dialogue pour modifier les détails de l’organisation.
- **Supprimer** (icône de corbeille) – supprime définitivement l’organisation. Une boîte de dialogue de confirmation apparaît avant la suppression.

!!! warning "Supprimez les organisations avec précaution"
    La suppression d’une organisation est irréversible. Assurez-vous qu’aucun cas ni formulaire actif n’en dépend avant de la supprimer.

Vous pouvez également cliquer directement sur une ligne pour la **sélectionner** (pour des actions groupées) ou la **déplier** afin d’afficher des détails supplémentaires sur place.

## Actions groupées et filtres

Sélectionnez plusieurs lignes à l’aide des cases à cocher de la première colonne, puis utilisez les boutons de suppression groupée ou de modification groupée qui apparaissent dans la barre d’outils.

### Recherche et filtres

La barre de filtres en haut de la page propose :

- **Recherche par mot-clé** – filtre les organisations selon un texte quelconque.
- **Plage de dates** – filtre par plage de dates de création.
- **Gestionnaire de préréglages** – enregistrer et charger des préréglages de filtres de recherche.
- **Exporter** – télécharger la liste filtrée sous forme de fichier.

Cliquez sur le bouton **Filtrer** pour ouvrir des filtres avancés et bénéficier d’un contrôle plus granulaire.

## Ajout et importation d’organisations

Deux boutons d’action flottants sont toujours visibles dans le coin inférieur droit :

- **Ajouter** (icône plus) – ouvre une boîte de dialogue pour créer une nouvelle organisation. Vous serez invité à saisir le nom de l’organisation, l’organisation parente, l’URL du site web et d’autres détails.
- **Importer** (icône de téléversement) – permet d’envoyer un fichier (CSV, JSON ou XML) pour importer des organisations en masse. Suivez les instructions à l’écran pour mapper les champs.

!!! tip "Internationalisation"
    Les noms et étiquettes des organisations peuvent être traduits si votre instance Dino prend en charge plusieurs langues. Voir [Langues](../administration/languages.md) pour plus de détails.

## Étapes : créer une nouvelle organisation

1. Cliquez sur le bouton flottant **Ajouter**.
2. Dans la boîte de dialogue qui s’ouvre, remplissez les champs obligatoires (nom de l’organisation et au moins un attribut).
3. Vous pouvez éventuellement définir une **organisation parente** pour créer une hiérarchie.
4. Cliquez sur **Enregistrer**. La nouvelle organisation apparaît immédiatement dans la liste.

## Étapes : exporter des organisations

1. Appliquez les filtres souhaités dans la barre de recherche.
2. Cliquez sur le bouton **Exporter** (icône de téléchargement) dans la barre de filtres.
3. Choisissez le format d’exportation (CSV, Excel, etc.) et confirmez.
4. Le fichier est téléchargé sur votre appareil.

## Pages connexes

- [Vue d’ensemble des métriques](index.md) – toutes les pages de gestion des métriques.
- [Domaines thématiques](areas.md) – gérer les domaines thématiques des organisations.
- [Cas](cases.md) – associer des cas aux organisations.
- [Localisations](locations.md) – relier les localisations aux organisations.
- [Projets](projects.md) – connecter des organisations à des projets.