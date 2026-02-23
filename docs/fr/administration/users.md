---
title: Gestion des utilisateurs et des groupes
description: Comment créer, modifier et gérer les comptes utilisateurs et les groupes de permissions dans Dino.
---

# Gestion des utilisateurs et des groupes

La section Utilisateurs permet aux administrateurs de gérer qui peut accéder à Dino et ce qu'ils sont autorisés à faire. Elle est divisée en deux parties : **Utilisateurs**, pour les comptes individuels, et **Groupes**, pour les ensembles de permissions qui peuvent être attribués à plusieurs utilisateurs en une fois.

![Gestion des utilisateurs et des groupes](../imgs/administration/users.png)

!!! warning "Accès administrateur uniquement"
    Cette zone n'est visible que par les utilisateurs ayant le rôle Administrateur. Si vous ne la voyez pas dans la navigation, contactez votre administrateur système.

---

## Naviguer dans la section Utilisateurs

Lorsque vous ouvrez la section Utilisateurs, vous verrez un menu avec deux options :

- **Utilisateurs** — gérer les comptes utilisateurs individuels.
- **Groupes** — gérer les groupes de permissions.

Cliquez sur l'une ou l'autre option pour ouvrir la section correspondante.

---

## Utilisateurs

### Parcourir la liste des utilisateurs

La liste Utilisateurs affiche tous les comptes du système, avec pour chaque utilisateur son **adresse e-mail**, son **nom complet** et un interrupteur **Désactivé** indiquant si le compte est actuellement actif.

Le nombre total d'utilisateurs correspondant à vos filtres actuels est affiché en haut de la liste.

### Rechercher et filtrer

- Saisissez du texte dans le champ **recherche par mot-clé** pour filtrer les utilisateurs par tout texte contenu dans leurs détails.
- Utilisez les champs **Date de début** et **Date de fin** pour filtrer par date de création de compte.
- Utilisez le filtre **Groupes d'utilisateurs** pour n'afficher que les utilisateurs appartenant à un groupe de permissions spécifique.
- Effacez tout filtre en cliquant sur l'icône **×** à l'intérieur du champ.

### Activer ou désactiver un utilisateur

Chaque ligne contient un interrupteur dans la colonne **Désactivé**. Cliquez directement sur l'interrupteur dans la liste pour activer ou désactiver un compte utilisateur sans ouvrir l'éditeur.

### Ajouter un nouvel utilisateur

!!! note
    La création de nouveaux comptes nécessite une connexion Internet active. Si vous êtes hors ligne, le bouton d'ajout affichera une icône de connectivité et l'action ne sera pas disponible.

1. Cliquez sur le **bouton +** (bouton flottant en bas à droite de la page).
2. Une boîte de dialogue s'ouvrira. Remplissez les champs suivants :
    - **Nom complet** — obligatoire.
    - **E-mail** — obligatoire.
    - **Mot de passe** et **Confirmer le mot de passe** — obligatoires dans certaines installations (au moins 9 caractères).
    - **Groupes de permissions utilisateur** — sélectionnez un ou plusieurs groupes dans la liste déroulante pour contrôler ce à quoi cet utilisateur peut accéder.
3. Cliquez sur **Enregistrer** pour créer le compte.

Un message de confirmation apparaîtra en bas de l'écran une fois l'utilisateur enregistré avec succès.

### Modifier un utilisateur

1. Trouvez l'utilisateur dans la liste et cliquez sur l'**icône crayon** sur sa ligne.
2. La boîte de dialogue d'édition s'ouvrira en mode édition. Vous pouvez mettre à jour le **Nom complet** et les **Groupes de permissions utilisateur**.
3. Cliquez sur **Enregistrer** pour appliquer vos modifications, ou sur **Fermer** pour les annuler.

### Consulter un utilisateur

Cliquez sur l'**icône œil** sur la ligne d'un utilisateur pour ouvrir ses détails en mode lecture seule. Aucune modification ne peut être effectuée dans ce mode. Cliquez sur **Fermer** lorsque vous avez terminé.

### Supprimer un utilisateur

1. Cliquez sur l'**icône de suppression** sur la ligne de l'utilisateur.
2. Une invite de confirmation apparaîtra. Confirmez pour supprimer définitivement le compte.

!!! warning
    La suppression d'un compte utilisateur est permanente et ne peut pas être annulée.

---

## Groupes

Les groupes de permissions définissent les zones, formulaires, rapports et données auxquels un ensemble d'utilisateurs peut accéder. Attribuer un utilisateur à un groupe lui accorde toutes les permissions définies pour ce groupe.

### Parcourir la liste des groupes

La liste Groupes affiche tous les groupes de permissions par nom. Le nombre total est indiqué en haut de la page.

### Rechercher et filtrer

- Utilisez le champ **recherche par mot-clé** pour filtrer les groupes par nom.
- Utilisez les champs **Date de début** et **Date de fin** pour filtrer par date de création.
- Utilisez les filtres métriques (**Projet**, **Localisation**, **Domaine thématique**, **Cas**, **Organisation**) pour trouver les groupes associés à des périmètres de données spécifiques.
- Effacez tout filtre en cliquant sur l'icône **×** à l'intérieur du champ.

### Ajouter un nouveau groupe

1. Cliquez sur le **bouton +** (bouton flottant en bas à droite de la page).
2. Une boîte de dialogue s'ouvrira, affichant une liste catégorisée des éléments disponibles à attribuer au groupe. Les éléments sont regroupés en catégories telles que **Rôles**, **Schémas de formulaire**, **Statuts de formulaire**, **Schémas de rapport** et tout type de métrique actif.
3. Saisissez un **nom de groupe** dans le champ de nom en haut de la boîte de dialogue.
4. Sélectionnez les éléments que vous souhaitez inclure dans le groupe en cliquant dessus. Au moins un **Rôle** doit être sélectionné avant de pouvoir enregistrer.
5. Cliquez sur **Enregistrer** pour créer le groupe.

Un message de confirmation apparaîtra avec le nom du groupe une fois celui-ci enregistré.

### Modifier un groupe

1. Cliquez sur l'**icône crayon** sur la ligne d'un groupe.
2. La boîte de dialogue d'édition s'ouvrira avec la configuration actuelle du groupe préchargée.
3. Mettez à jour le nom ou ajoutez et supprimez des éléments selon les besoins. Au moins un Rôle doit rester sélectionné.
4. Cliquez sur **Enregistrer** pour appliquer vos modifications.

### Consulter un groupe

Cliquez sur l'**icône œil** sur la ligne d'un groupe pour ouvrir sa configuration en mode lecture seule. Cliquez sur **Fermer** lorsque vous avez terminé.

### Supprimer un groupe

1. Cliquez sur l'**icône de suppression** sur la ligne du groupe.
2. Une invite de confirmation apparaîtra. Confirmez pour supprimer définitivement le groupe.

!!! warning
    La suppression d'un groupe est permanente. Les utilisateurs qui n'étaient attribués qu'à ce groupe perdront immédiatement les permissions associées.

---

## Dépannage

### "Les nouveaux comptes utilisateur ne peuvent pas être créés hors ligne."

!!! warning
    Votre appareil n'est pas connecté à Internet. Les nouveaux comptes utilisateur ne peuvent être créés qu'en ligne. Vérifiez votre connexion et réessayez. La modification et la consultation des utilisateurs existants restent disponibles hors ligne.

### "Oups ! Une erreur s'est produite lors de l'enregistrement de l'utilisateur."

!!! warning
    L'utilisateur n'a pas pu être enregistré, peut-être en raison d'une erreur de validation ou d'un problème temporaire du serveur. Vérifiez que tous les champs obligatoires sont correctement remplis et réessayez. Si le problème persiste, contactez votre administrateur système.

### "Oups ! Une erreur s'est produite lors de l'exécution de l'action demandée."

!!! warning
    Ce message peut apparaître lors de l'enregistrement ou de la suppression d'un groupe. Il peut indiquer un problème côté serveur ou un conflit avec des données existantes. Réessayez après un moment. Si le problème continue, contactez votre administrateur système.