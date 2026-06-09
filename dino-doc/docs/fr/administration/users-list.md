---
title: Liste des utilisateurs
description: Consultez, modifiez et gérez les comptes utilisateurs dans votre organisation Dino.
---

# Liste des utilisateurs

La page Liste des utilisateurs fournit une liste complète de tous les comptes utilisateurs de votre organisation Dino. Depuis cette page, vous pouvez consulter les détails des utilisateurs, modifier des comptes et créer de nouveaux utilisateurs.

![Main view of the Users List page](../imgs/administration/users-list.png)

## Comprendre la liste des utilisateurs

La liste principale affiche les informations clés pour chaque utilisateur :
*   **Email :** L'adresse email de connexion de l'utilisateur.
*   **Nom complet :** Le nom associé au compte.
*   **Désactivé :** Un interrupteur indiquant si le compte est actif ou désactivé. Vous pouvez cliquer sur cet interrupteur directement dans la liste pour modifier l'état.

Vous pouvez trier la liste par la colonne **Date de création**. La colonne **ID** est masquée par défaut.

## Travailler avec la liste

### Recherche et filtrage

Utilisez la barre de recherche en haut de la page pour trouver des utilisateurs par leur email ou leur nom complet.

Pour appliquer des filtres plus spécifiques :
1.  Cliquez sur l'icône de filtre dans la barre de recherche.
2.  Dans la section **Groupes de permissions utilisateur**, vous pouvez sélectionner un ou plusieurs groupes d'utilisateurs pour filtrer la liste et n'afficher que les membres de ces groupes.

### Actions utilisateur

Chaque ligne d'utilisateur possède un menu d'actions (trois points verticaux) sur le côté droit. Cliquez dessus pour accéder aux options suivantes :

*   **Modifier :** Ouvrir l'éditeur d'utilisateur pour modifier les détails du compte.
*   **Supprimer :** Supprimer définitivement le compte utilisateur. Une confirmation vous sera demandée.
*   **Voir :** Ouvrir une vue en lecture seule des détails de l'utilisateur.

Vous pouvez également cliquer n'importe où sur une ligne d'utilisateur pour la sélectionner, ou cliquer sur l'icône d'expansion pour afficher un résumé des informations de l'utilisateur directement dans la liste.

## Créer un nouvel utilisateur

Pour ajouter un nouvel utilisateur à votre organisation :

1.  Cliquez sur le bouton flottant bleu **+** dans le coin inférieur droit de l'écran.
2.  Un formulaire s'ouvre. Saisissez les détails du nouvel utilisateur, y compris l'email, le nom, et assignez-les aux groupes d'utilisateurs appropriés. Pour plus d'informations sur les groupes, consultez [Liste des groupes](groups-list.md).
3.  Cliquez sur **Enregistrer** pour créer le compte. Le nouvel utilisateur recevra un email avec des instructions pour définir son mot de passe.

!!! warning "Restriction hors ligne"
    Le bouton **+** sera désactivé (affichant une icône Wi-Fi désactivé) si vous n'êtes pas connecté à Internet. Les nouveaux comptes utilisateurs ne peuvent pas être créés hors ligne. Vous pouvez toujours consulter et modifier les utilisateurs existants hors ligne.

## Modifier un utilisateur

Pour modifier les informations d'un utilisateur existant :

1.  Cliquez sur le menu d'actions (trois points) sur la ligne de l'utilisateur.
2.  Sélectionnez **Modifier**.
3.  Dans l'éditeur, mettez à jour les détails de l'utilisateur ou les affectations de groupes.
4.  Cliquez sur **Enregistrer** pour appliquer les modifications.

!!! tip "Désactivation rapide"
    Vous pouvez rapidement activer ou désactiver la capacité de connexion d'un utilisateur en cliquant sur l'interrupteur **Désactivé** directement dans la liste, sans ouvrir l'éditeur complet.