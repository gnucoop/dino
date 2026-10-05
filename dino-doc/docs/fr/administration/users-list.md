---
title: Liste des utilisateurs
description: Consultez, modifiez et gérez les comptes utilisateurs de votre organisation Dino.
---

# Liste des utilisateurs

La page Liste des utilisateurs présente la liste complète de tous les comptes utilisateurs de votre organisation Dino. Vous pouvez y consulter les détails des utilisateurs, modifier les comptes et créer de nouveaux utilisateurs.

![Vue principale de la page Liste des utilisateurs](../imgs/administration/users-list.png)

## Comprendre la liste des utilisateurs

La liste principale affiche les informations clés de chaque utilisateur :

*   **Email :** L'adresse e-mail de connexion de l'utilisateur.
*   **Nom et prénom :** Le nom associé au compte.
*   **Disabled :** Un bouton à bascule indiquant si le compte est actif ou désactivé. Vous pouvez cliquer directement sur ce bouton dans la liste pour changer le statut.

Vous pouvez trier la liste selon les colonnes **Email**, **Nom et prénom** ou **Date de création**. Les colonnes **ID** et **Date de création** sont masquées par défaut. Pour afficher ou masquer des colonnes, cliquez sur le bouton **Colonnes** au-dessus de la liste, à droite, et sélectionnez celles que vous souhaitez afficher.

## Utiliser la liste

### Rechercher et filtrer

Utilisez la barre de recherche en haut de la page pour trouver des utilisateurs par leur e-mail ou leur nom et prénom.

Pour appliquer des filtres plus spécifiques :

1.  Cliquez sur le bouton **Filtres** dans la barre de recherche.
2.  Définissez un **De date** et un **À ce jour** pour filtrer par date de création, et sélectionnez un ou plusieurs groupes d'utilisateurs pour restreindre la liste aux membres de ces groupes.
3.  Cliquez sur **Chercher** pour appliquer les filtres, ou sur **Réinitialiser les filtres** pour les effacer.

Les filtres appliqués apparaissent sous forme de puces sous la barre de recherche. Cliquez sur l'icône **annuler** d'une puce pour supprimer ce filtre.

### Actions sur les utilisateurs

Survolez la ligne d'un utilisateur pour afficher les icônes **Modifier** et **Voir**. Cliquez n'importe où sur la ligne pour la sélectionner : la barre d'actions au-dessus de la liste affiche alors toutes les actions que vous pouvez effectuer sur l'utilisateur sélectionné :

*   **Modifier :** Ouvrir l'éditeur d'utilisateur pour modifier les détails du compte.
*   **Voir :** Ouvrir une visualisation en lecture seule des détails de l'utilisateur.
*   **Delete :** Supprimer définitivement le compte utilisateur. Il vous sera demandé de confirmer cette action.

## Créer un nouvel utilisateur

Pour ajouter un nouvel utilisateur à votre organisation :

1.  Cliquez sur le bouton **Ajouter un nouvel utilisateur** dans la barre d'outils au-dessus de la liste.
2.  Un form s'ouvrira. Saisissez le **Nom et prénom** et l'**Email** du nouvel utilisateur, et affectez-le aux groupes appropriés dans **User Permission Groups**. Pour plus d'informations sur les groupes, consultez [Liste des groupes](groups-list.md).
    Selon la façon dont votre Dino connecte les utilisateurs, le form peut également demander un **Mot de passe** et **Confirmez le mot de passe**, d'au moins 9 caractères.
3.  Cliquez sur **Enregistrer** pour créer le compte.

Le bouton **Enregistrer** reste indisponible tant que tous les champs obligatoires ne sont pas correctement remplis.

!!! tip "Modes Voir et Modifier"
    Le même form est utilisé pour créer, modifier et consulter des utilisateurs. En mode **Voir**, tous les champs sont en lecture seule et seul le bouton **Fermer** est affiché.

## Modifier un utilisateur

Pour modifier les informations d'un utilisateur existant :

1.  Survolez la ligne de l'utilisateur et cliquez sur l'icône **Modifier**, ou sélectionnez la ligne et cliquez sur **Modifier** dans la barre d'actions.
2.  Dans l'éditeur, mettez à jour le nom et prénom de l'utilisateur ou ses affectations de groupes. L'adresse e-mail ne peut pas être modifiée ici.
3.  Cliquez sur **Enregistrer** pour appliquer les modifications.

!!! tip "Désactivation rapide"
    Vous pouvez activer ou désactiver rapidement la capacité d'un utilisateur à se connecter en cliquant directement sur le bouton **Disabled** dans la liste, sans ouvrir l'éditeur complet.

## Pages associées

*   [Utilisateurs](users.md)
*   [Liste des groupes](groups-list.md)