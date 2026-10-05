---
title: Liste des groupes
description: Gérez les groupes d'utilisateurs dans Dino — consultez, créez, modifiez et supprimez des groupes de permissions avec les rôles, formulaires, rapports et métriques associés.
---

# Liste des groupes

La page **Liste des groupes** affiche tous les groupes d'utilisateurs dans Dino. Vous pouvez y consulter, modifier, supprimer et créer des groupes. Chaque groupe définit un ensemble de permissions et de règles d'accès en associant un rôle utilisateur à des formulaires, des rapports, des statuts de formulaire et des types de métriques spécifiques (tels que les domaines, les cas, les projets, les emplacements ou les organisations).

![Vue principale de la page Liste des groupes](../imgs/administration/groups-list.png)

## Aperçu de la liste

Le tableau comporte les colonnes suivantes :

- **Nom de groupe** – le nom du groupe d'utilisateurs (visible par défaut).
- **ID** – identifiant interne (masqué par défaut).
- **Date de création** – la date de création du groupe (masquée par défaut).

Le nombre d'éléments trouvés apparaît au-dessus du tableau, à côté du paginateur. Utilisez le bouton **Colonnes** (infobulle *Personnaliser les colonnes*), au-dessus du tableau à droite, pour modifier les colonnes affichées.

## Recherche et filtrage

Utilisez le champ **recherche par mot-clé** dans la barre d'outils pour filtrer les groupes par nom. Ouvrez la boîte de dialogue **Filtres** pour plus d'options :

1. Cliquez sur **Filtres**.
2. Définissez une **De date** et une **À ce jour** pour limiter les résultats aux groupes créés dans cette plage.
3. Affinez la liste à l'aide d'un ou plusieurs filtres de métriques — **Projet**, **Emplacement**, **Domaine**, **Cas** ou **Organisation** — selon ceux actifs dans votre déploiement.
4. Cliquez sur **Chercher** pour appliquer les filtres, ou sur **Réinitialiser les filtres** pour les effacer.

Les filtres appliqués apparaissent sous forme de puces sous la barre d'outils. Cliquez sur l'icône **annuler** d'une puce pour supprimer ce filtre.

## Actions sur les groupes

Survolez une ligne pour faire apparaître les icônes **Modifier** et **Voir**. Cliquez sur une ligne pour la sélectionner : la barre d'actions au-dessus du tableau affiche alors toutes les actions disponibles :

- **Voir** – Voir les détails du groupe (ouvre la page du groupe en mode lecture seule)
- **Modifier** – Modifier les propriétés du groupe
- **Supprimer** – Supprimer le groupe (confirmation requise)

## Créer un nouveau groupe

Les groupes sont créés et modifiés sur une page dédiée, et non dans une boîte de dialogue.

1. Cliquez sur **Ajouter un nouveau groupe** dans la barre d'outils. La page *Créer un groupe* s'ouvre.
2. Saisissez le **Nom de groupe** dans l'en-tête de la page.
3. Choisissez les éléments du groupe, onglet par onglet. Chaque onglet indique le nombre d'éléments qu'il contient et n'apparaît que si sa catégorie comporte des éléments :
    - **Rôle utilisateur** (obligatoire – un groupe ne contient qu'un seul rôle ; en ajouter un autre le remplace)
    - **Formulaires**
    - **Statut du formulaire**
    - **Report schema**
    - Un onglet par type de métrique actif (**Domaine**, **Cas**, **Projet**, **Emplacement**, **Organisation**)
4. Dans le panneau de gauche, recherchez les éléments et cliquez sur **Ajouter** à côté de chacun de ceux que vous voulez, ou sur **Ajouter tous les affichés** pour ajouter tous les éléments listés. Le panneau de droite (*Dans le groupe*) montre ce que le groupe contient pour cette catégorie.
5. Cliquez sur **Enregistrer**. Il n'est activé que lorsque le groupe possède un nom et un rôle utilisateur.

!!! tip "Option Tous"
    Chaque catégorie, sauf Rôle utilisateur, propose une option « Tous … » en haut de sa liste (par exemple *Tous les formulaires*). La choisir remplace les éléments individuels ; ajouter un élément individuel la supprime. Pour les métriques hiérarchiques, ajouter une valeur ajoute aussi ses enfants.

!!! note "Groupes administrateurs"
    Si le rôle du groupe est un rôle administrateur, **Formulaires** et **Report schema** sont toujours définis sur **Tous** et verrouillés, comme l'indique une icône de cadenas : seul un groupe positionné sur **Tous** pour ces éléments peut créer de nouveaux schémas. Choisissez un autre rôle pour lever le verrou.

## Modifier ou consulter un groupe

1. Dans le tableau, cliquez sur l'icône **Modifier** ou **Voir** du groupe. La page *Modifier le groupe* ou *Voir le groupe* s'ouvre.

    ![Éditeur de modification d'un groupe de permissions utilisateur](../imgs/administration/groups-list-edit.png)

2. En mode modification, vous pouvez :
    - Modifier le **Nom de groupe**.
    - Ajouter des éléments depuis le panneau de gauche, ou les retirer du panneau de droite avec le bouton × (**Vider** supprime tous les éléments de la catégorie).
3. Cliquez sur **Enregistrer** pour appliquer les modifications. Il n'y a pas de bouton Annuler : pour quitter sans enregistrer, revenez en arrière via le fil d'Ariane.

En mode consultation, tout est en lecture seule et il n'y a pas de bouton **Enregistrer**.

## Supprimer un groupe

1. Cliquez sur la ligne du groupe pour la sélectionner, puis cliquez sur **Supprimer** dans la barre d'actions.
2. Confirmez la suppression dans la boîte de dialogue qui apparaît.

!!! warning "Action irréversible"
    La suppression d'un groupe est irréversible. Assurez-vous qu'aucun utilisateur ne dépend du groupe avant de le supprimer.

## Pages associées

- [Liste des utilisateurs](users-list.md) – gérez les comptes utilisateurs individuels et leurs affectations de groupe.
- [Métriques](../metrics/index.md) – configurez les types de métriques pouvant être attribués aux groupes (domaines, cas, projets, etc.).
- [Formulaires](../forms/edit-form-schema.md) – créez et modifiez les formulaires pouvant être liés aux groupes.
- [Report schemas](../reports/edit-report-schema.md) – gérez les report schemas disponibles pour les groupes.
- [Vue d'ensemble de l'interface](../interface/index.md) – découvrez la navigation et la disposition générale.