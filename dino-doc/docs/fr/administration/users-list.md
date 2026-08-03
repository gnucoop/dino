---
title: Liste des utilisateurs
description: Consultez, modifiez et gérez les comptes utilisateurs de votre organisation Dino.
---

# Liste des utilisateurs

La page Liste des utilisateurs fournit une liste complète de tous les comptes utilisateurs de votre organisation Dino. Depuis cette page, vous pouvez consulter les détails des utilisateurs, modifier les comptes et créer de nouveaux utilisateurs.

![Main view of the Users List page](../imgs/administration/users-list.png)

## Comprendre la liste des utilisateurs

La liste principale affiche les informations clés pour chaque utilisateur :

* **E-mail :** L'adresse e-mail de connexion de l'utilisateur.
* **Nom complet :** Le nom associé au compte.
* **Désactivé :** Un bouton à bascule indiquant si le compte est actif ou désactivé. Vous pouvez cliquer directement sur ce bouton dans la liste pour modifier le statut.

Vous pouvez trier la liste par la colonne **Date de création**. La colonne **ID** est masquée par défaut.

## Travailler avec la liste

### Recherche et filtrage

Utilisez la barre de recherche en haut de la page pour trouver des utilisateurs par leur e-mail ou leur nom complet.

Pour appliquer des filtres plus spécifiques :

1. Cliquez sur l'icône de filtre dans la barre de recherche.
2. Dans la section **Groupes de permissions utilisateur**, vous pouvez sélectionner un ou plusieurs groupes d'utilisateurs pour filtrer la liste et n'afficher que les membres de ces groupes.

### Actions utilisateur

Chaque ligne d'utilisateur possède un menu d'actions (trois points verticaux) sur le côté droit. Cliquez dessus pour accéder aux options suivantes :

* **Modifier :** Ouvrir l'éditeur d'utilisateur pour modifier les détails du compte.
* **Supprimer :** Supprimer définitivement le compte utilisateur. Une confirmation vous sera demandée.
* **Voir :** Ouvrir une vue en lecture seule des détails de l'utilisateur.

Vous pouvez également cliquer n'importe où sur la ligne d'un utilisateur pour la sélectionner, ou cliquer sur l'icône d'expansion pour afficher un résumé des informations de l'utilisateur directement dans la liste.

## Création d'un utilisateur

Pour ajouter un nouvel utilisateur à votre organisation :

1. Cliquez sur le bouton flottant bleu **+** dans le coin inférieur droit de l'écran.
2. Un formulaire s'ouvre. Saisissez les détails du nouvel utilisateur, notamment l'e-mail, le nom, et assignez-le aux groupes d'utilisateurs appropriés. Pour plus d'informations sur les groupes, consultez [Liste des groupes](groups-list.md).
3. Cliquez sur **Enregistrer** pour créer le compte. Le nouvel utilisateur recevra un e-mail avec des instructions pour définir son mot de passe.

!!! warning "Restriction hors ligne"
    Le bouton **+** sera désactivé (affichant une icône Wi-Fi barré) si vous n'êtes pas connecté à Internet. Les nouveaux comptes utilisateur ne peuvent pas être créés hors ligne. Vous pouvez toujours consulter et modifier les utilisateurs existants hors ligne.

## Modification d'un utilisateur

Pour modifier les informations d'un utilisateur existant :

1. Cliquez sur le menu d'actions (trois points) sur la ligne de l'utilisateur.
2. Sélectionnez **Modifier**.
3. Dans l'éditeur, mettez à jour les détails de l'utilisateur ou ses affectations de groupe.
4. Cliquez sur **Enregistrer** pour appliquer les modifications.

!!! tip "Désactivation rapide"
    Vous pouvez rapidement activer ou désactiver la possibilité pour un utilisateur de se connecter en cliquant directement sur l'interrupteur **Désactivé** dans la liste, sans ouvrir l'éditeur complet.