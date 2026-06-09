---
title: Liste des groupes
description: Consultez et gérez les groupes d'utilisateurs sur la page Liste des groupes dans Dino. Découvrez les filtres, le tableau de données et comment créer ou modifier des groupes.
---

# Liste des groupes

La page Liste des groupes affiche tous les groupes d'utilisateurs de votre instance Dino. Depuis cette page, vous pouvez visualiser, filtrer et créer de nouveaux groupes, ou modifier des groupes existants.

![Vue principale de la page Liste des groupes](../imgs/administration/groups-list.png)

## Ce que vous voyez

La page contient :

- **Barre de recherche et de filtres** – Utilisez les filtres disponibles pour affiner la liste des groupes. Les filtres incluent Projet, Lieu, Zone, Cas et Organisation. Vous pouvez également utiliser la zone de recherche générale pour trouver des groupes par nom.
- **Tableau de données** – Affiche les informations principales de chaque groupe, notamment le nom du groupe. Des colonnes supplémentaires (ID, date de création) sont masquées par défaut mais peuvent être affichées via le sélecteur de colonnes.
- **Bouton d'action flottant** – Un bouton « + » dans le coin inférieur droit ouvre l'éditeur pour créer un nouveau groupe.
- **Actions sur les lignes** – Cliquez sur une ligne pour faire apparaître des options intégrées permettant de sélectionner ou de développer plus de détails sur ce groupe.

## Utilisation des filtres

1. Cliquez sur l'icône de filtre pour ouvrir la barre de filtres.
2. Choisissez un type de filtre dans la liste déroulante (par exemple, **Projet**).
3. Sélectionnez ou saisissez la valeur par laquelle vous souhaitez filtrer.
4. La liste se met automatiquement à jour pour afficher uniquement les groupes correspondants.

!!! tip "Filtres multiples"
    Vous pouvez appliquer plusieurs filtres à la fois pour affiner davantage les résultats.

## Créer un nouveau groupe

1. Cliquez sur le bouton flottant **+** en bas à droite de la page.
2. L'éditeur de groupe s'ouvre. Saisissez les informations requises :
   - **Nom du groupe** – Un nom unique pour le groupe.
3. Facultativement, affectez des utilisateurs au groupe (voir [Liste des utilisateurs](users-list.md) pour gérer les utilisateurs individuels).
4. Cliquez sur **Enregistrer** pour créer le groupe. Il apparaît immédiatement dans la liste.

## Modifier ou consulter un groupe

- **Cliquez n'importe où sur une ligne** pour développer ou sélectionner le groupe. Les actions disponibles dépendent de vos autorisations.
- Pour ouvrir l'éditeur complet d'un groupe, cliquez sur l'icône de modification (crayon) qui apparaît sur la ligne.
- Vous pouvez modifier le nom du groupe et ses membres.

!!! warning "Suppression de groupes"
    La suppression d'un groupe retire tous ses membres du groupe. Cette action est irréversible. Supprimez via l'icône de suppression (poubelle) de la ligne après avoir développé ou sélectionné la ligne.

## Pages connexes

- [Liste des utilisateurs](users-list.md) – Gérer les comptes d'utilisateurs individuels
- [Utilisateurs](users.md) – Aperçu de l'administration des utilisateurs
- [Notifications](../notifications/index.md) – Configurer les notifications pour les groupes