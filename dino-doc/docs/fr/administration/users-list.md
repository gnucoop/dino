---
title: Liste des utilisateurs
description: Consultez, modifiez et gérez les comptes utilisateurs de votre organisation Dino.
---

# Liste des utilisateurs

La page Liste des utilisateurs présente l'ensemble des comptes utilisateurs de votre organisation Dino. Vous pouvez y consulter les détails des utilisateurs, modifier les comptes et créer de nouveaux utilisateurs.

![Vue principale de la page Liste des utilisateurs](../imgs/administration/users-list.png)

## Comprendre la liste des utilisateurs

La liste principale affiche les informations clés de chaque utilisateur :

*   **E-mail :** l'adresse e-mail de connexion de l'utilisateur.
*   **Nom complet :** le nom associé au compte.
*   **Désactivé :** un bouton bascule indiquant si le compte est actif ou désactivé. Vous pouvez cliquer directement sur ce bouton dans la liste pour modifier le statut.

Vous pouvez trier la liste par la colonne **Date de création**. La colonne **ID** est masquée par défaut.

## Utiliser la liste

### Recherche et filtres

Utilisez la barre de recherche en haut de la page pour trouver des utilisateurs par leur e-mail ou leur nom complet.

Pour appliquer des filtres plus précis :

1.  Cliquez sur l'icône de filtre dans la barre de recherche.
2.  Dans la section **User Permission Groups**, vous pouvez sélectionner un ou plusieurs groupes d'utilisateurs afin de n'afficher que les membres de ces groupes.

### Actions sur les utilisateurs

Chaque ligne d'utilisateur comporte un menu d'actions (trois points verticaux) sur la droite. Cliquez dessus pour accéder aux options suivantes :

*   **Edit :** ouvrez l'éditeur d'utilisateur pour modifier les détails du compte.
*   **Delete :** supprimez définitivement le compte utilisateur. Une confirmation vous sera demandée.
*   **View :** ouvrez une vue en lecture seule des détails de l'utilisateur.

Vous pouvez également cliquer n'importe où sur la ligne d'un utilisateur pour la sélectionner, ou cliquer sur l'icône d'agrandissement pour afficher un résumé des informations de l'utilisateur directement dans la liste.

## Créer un nouvel utilisateur

Pour ajouter un nouvel utilisateur à votre organisation :

1.  Cliquez sur le bouton flottant bleu **+** dans le coin inférieur droit de l'écran.
2.  Un formulaire s'ouvre. Saisissez les informations du nouvel utilisateur, notamment son e-mail et son nom, puis affectez-le aux groupes d'utilisateurs appropriés. Pour plus d'informations sur les groupes, consultez [Liste des groupes](groups-list.md).
3.  Cliquez sur **Save** pour créer le compte. Le nouvel utilisateur recevra un e-mail contenant les instructions pour définir son mot de passe.

!!! warning "Restriction hors ligne"
    Le bouton **+** sera désactivé (affichant une icône Wi-Fi barrée) si vous n'êtes pas connecté à Internet. Il n'est pas possible de créer de nouveaux comptes utilisateurs hors ligne. Vous pouvez toutefois consulter et modifier les utilisateurs existants hors ligne.

## Modifier un utilisateur

Pour modifier les informations d'un utilisateur existant :

1.  Cliquez sur le menu d'actions (trois points) sur la ligne de l'utilisateur.
2.  Sélectionnez **Edit**.
3.  Dans l'éditeur, mettez à jour les détails de l'utilisateur ou ses affectations de groupes.
4.  Cliquez sur **Save** pour appliquer les modifications.

!!! tip "Désactivation rapide"
    Vous pouvez activer ou désactiver rapidement la possibilité de connexion d'un utilisateur en cliquant sur le bouton bascule **Désactivé** directement dans la liste, sans ouvrir l'éditeur complet.