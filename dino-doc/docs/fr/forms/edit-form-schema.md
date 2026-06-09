---
title: Modifier le schéma de formulaire
description: Apprenez à créer et modifier les schémas de formulaire dans Dino pour définir la structure de vos formulaires de collecte de données.
---

# Modifier le schéma de formulaire

La page **Modifier le schéma de formulaire** vous permet de concevoir ou de modifier la structure d’un formulaire : les champs, leurs types, les règles de validation et la manière dont ils s’articulent entre eux. Vous pouvez créer un tout nouveau schéma ou mettre à jour un schéma existant.

![Vue principale de la page Modifier le schéma de formulaire](../imgs/forms/edit-form-schema.png)

## Créer un nouveau schéma de formulaire

1. Dans la section **Formulaires**, cliquez sur **Créer un schéma de formulaire**.
2. Saisissez un **Nom** et éventuellement une **Description** pour le schéma.
3. Ajoutez des champs à l’aide du bouton **Ajouter un champ**. Pour chaque champ, vous pouvez définir :
   - **Libellé du champ** – la question ou l’invite affichée aux collecteurs de données.
   - **Type de champ** – p. ex. texte, nombre, date, liste déroulante, géolocalisation.
   - **Interrupteur Obligatoire** – rend le champ obligatoire.
   - **Règles de validation** – valeurs min/max, extensions de fichiers autorisées, etc.
4. Réorganisez les champs en les faisant glisser dans l’ordre souhaité.
5. Cliquez sur **Enregistrer** pour créer le schéma.

## Modifier un schéma existant

1. Accédez à la page **Formulaires** et cliquez sur le schéma que vous voulez modifier.
2. Cliquez sur le bouton **Modifier** (ou ouvrez le menu d’actions du schéma et sélectionnez **Modifier**).
3. L’éditeur s’ouvre avec tous les champs existants chargés. Vous pouvez :
   - Ajouter de nouveaux champs.
   - Modifier les paramètres d’un champ existant en cliquant dessus.
   - Supprimer un champ à l’aide de son icône de corbeille.
   - Réorganiser les champs par glisser-déposer.
4. Cliquez sur **Enregistrer** pour appliquer vos modifications.

!!! warning "Modification d’un schéma ayant déjà des soumissions"
    Changer le type des champs ou supprimer des champs peut affecter les soumissions existantes. Dino vous avertira avant l’enregistrement si des incompatibilités sont détectées.

## Définir des relations entre champs (dépendances)

Vous pouvez configurer une logique conditionnelle pour que certains champs n’apparaissent que lorsqu’une valeur spécifique est sélectionnée dans un autre champ.

1. Lors de la modification d’un schéma, sélectionnez le champ que vous souhaitez rendre conditionnel.
2. Cliquez sur l’onglet ou le bouton **Relations**.
3. Dans la boîte de dialogue qui s’ouvre, choisissez le **champ parent** et la **valeur** qui doit être sélectionnée pour que ce champ soit affiché. Vous pouvez également ajouter plusieurs conditions (logique ET/OU).
4. Cliquez sur **Appliquer** pour enregistrer la relation.

![Boîte de dialogue de l’éditeur de relations (dépendances) de formulaire](../imgs/forms/edit-form-schema-relationships.png)

!!! tip "Test des dépendances"
    Après avoir enregistré le schéma, vous pouvez tester votre logique conditionnelle en ouvrant le formulaire dans la vue [Modifier le formulaire](edit-form.md) et en vérifiant que les champs dépendants apparaissent ou se masquent correctement.

## Prochaines étapes

Une fois votre schéma de formulaire prêt, vous pouvez [créer une instance de formulaire](edit-form.md) basée sur celui-ci, ou utiliser le schéma dans une [Carte de formulaires](forms-map.md) pour l’assigner à des zones et des collecteurs spécifiques.