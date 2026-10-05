---
title: Espace utilisateur
description: Gérez les paramètres de votre compte dans Dino — changez votre mot de passe, consultez votre clé et vos crédits DINO-AI, personnalisez le thème DINO, sauvegardez ou restaurez vos données, et lancez le Dino Tour.
---

# Espace utilisateur

L'**Espace utilisateur** est votre page de compte personnelle. Elle rassemble tout ce qui vous appartient en propre plutôt qu'à l'ensemble de l'installation Dino : vos identifiants de connexion, votre clé et vos crédits DINO-AI, les couleurs que Dino utilise pour vous, la sauvegarde et la restauration des données, ainsi que la visite guidée.

L'en-tête de la page affiche vos initiales, votre nom complet et votre adresse e-mail, ce qui vous permet de toujours vérifier avec quel compte vous êtes connecté. La version de Dino actuellement en cours d'exécution est affichée en haut à droite.

![Vue principale de la page Espace utilisateur](../imgs/user-area/index.png)

L'Espace utilisateur est organisé en onglets. L'onglet sur lequel vous vous trouvez fait partie de l'adresse de la page, vous pouvez donc mettre un onglet précis en favori et y revenir directement. Le passage d'un onglet à l'autre ne modifie pas l'historique de votre navigateur — appuyer sur Retour quitte l'Espace utilisateur au lieu de revenir sur les onglets que vous avez visités.

## Changer votre mot de passe

L'onglet **Mot de passe** est l'endroit où vous mettez à jour le mot de passe que vous utilisez pour vous connecter à Dino.

1. Dans le champ **Mot de passe actuel**, saisissez le mot de passe que vous utilisez actuellement.
2. Dans le champ **Nouveau mot de passe**, saisissez votre nouveau mot de passe. Il doit comporter au minimum le nombre de caractères indiqué sous le champ.
3. Dans le champ **Confirmer un nouveau mot de passe**, saisissez à nouveau le nouveau mot de passe.
4. Sélectionnez **Mettre à jour le mot de passe**.

Si vous souhaitez recommencer, sélectionnez **Annuler** pour effacer les trois champs. Si le mot de passe actuel ne correspond pas, Dino vous le signale et aucune modification n'est effectuée.

!!! tip "Choisissez un mot de passe fort"
    Utilisez un mot de passe que vous n'employez nulle part ailleurs et conservez-le dans un gestionnaire de mots de passe. Consultez [Réinitialiser le mot de passe](../getting-started/reset-password.md) si vous avez oublié le mot de passe actuel et ne pouvez pas vous connecter.

## Clé et crédits DINO-AI

L'onglet **IA** affiche la clé DINO-AI associée à votre compte, ainsi que le nombre de crédits DINO-AI qu'il vous reste.

- Sélectionnez **Afficher** pour révéler la clé, ou **Masquer** pour la masquer à nouveau.
- Sélectionnez **Copier** pour placer la clé dans votre presse-papiers.
- Si votre installation permet l'achat de crédits, sélectionnez **Ajouter plus** pour les recharger.

La clé est attribuée automatiquement à votre compte lorsque vous vous connectez — il n'y a rien à coller ici. Si aucune clé n'est associée à votre compte, l'onglet l'indique.

## Thème DINO

L'onglet **Thème DINO** contrôle les couleurs que Dino utilise pour vous. Les modifications de couleur ne s'appliquent qu'après leur enregistrement, vous pouvez donc expérimenter librement ; le choix clair/sombre s'applique immédiatement.

1. Sélectionnez les champs **Couleur primaire**, **Couleur accent** et **Couleur d'avertissement**, puis choisissez une couleur dans le sélecteur.
2. Utilisez le champ **Nom du préréglage** pour nommer la combinaison, ou choisissez un nom existant dans la liste.
3. Basculez entre le mode clair et le mode sombre à l'aide des boutons soleil et lune.
4. Sélectionnez **Enregistrer le thème** pour appliquer vos choix.

Le panneau **Aperçu** montre à quoi ressembleront vos couleurs sélectionnées avant que vous ne les validiez. **Charger le préréglage** restaure une combinaison enregistrée, et **Réinitialiser** abandonne vos modifications et revient au thème actuellement appliqué.

!!! tip "Les thèmes sont conservés dans ce navigateur"
    Votre thème et vos préréglages enregistrés sont stockés dans le navigateur que vous utilisez. Sur un autre navigateur ou appareil, Dino repart du thème par défaut.

## Sauvegarde et restauration

L'onglet **Sauvegarde et restauration** vous permet de télécharger une copie complète de vos données ou d'en recharger une. Il n'est affiché qu'aux administrateurs, et uniquement lorsque la sauvegarde et la restauration sont activées pour votre installation.

Pour sauvegarder vos données :

1. Sélectionnez **Télécharger la sauvegarde**.
2. Enregistrez le fichier, nommé `dino_db_export.json`, dans un emplacement sûr.

Pour restaurer des données :

1. Sélectionnez **Choisir un fichier de sauvegarde** et choisissez un fichier `.json` exporté depuis Dino.
2. Confirmez la restauration lorsque Dino vous le demande.
3. Attendez que Dino restaure les données. Un indicateur de chargement s'affiche jusqu'à la fin du processus.

!!! warning "La restauration écrase les données correspondantes"
    Les données du fichier sont écrites dans la base de données locale de cet appareil : tout enregistrement ayant le même ID qu'un enregistrement importé est écrasé. Effectuez une nouvelle sauvegarde avant de restaurer, et assurez-vous que le fichier est bien celui que vous souhaitez.

## Tutoriels

L'onglet **Tutoriels** n'est affiché que lorsque la visite guidée est configurée pour votre installation, et contient une seule action. Sélectionnez **Démarrer Dino Tour** pour lancer la visite guidée des principales fonctionnalités de Dino — un rappel utile si vous débutez sur la plateforme ou souhaitez revoir une section particulière.

## Pages liées

- [Connexion](../getting-started/login.md)
- [Réinitialiser le mot de passe](../getting-started/reset-password.md)
- [Navigation principale](../interface/index.md)