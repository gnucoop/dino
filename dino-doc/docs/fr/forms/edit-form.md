---
title: Modifier une soumission de formulaire
description: Apprenez à modifier une soumission de formulaire existante dans Dino, y compris les métriques du formulaire, les brouillons et l'enregistrement de vos modifications.
---

# Modifier une soumission de formulaire

L'écran Modifier le formulaire vous permet de modifier une soumission déjà enregistrée. Vous retrouvez la même interface de formulaire que celle utilisée pour la saisie de données, mais avec toutes les réponses précédemment enregistrées déjà remplies. À partir de là, vous pouvez corriger des valeurs, compléter des informations manquantes ou enregistrer votre progression en tant que brouillon pour terminer plus tard.

![Vue principale de la page Modifier le formulaire](../imgs/forms/edit-form.png)

## Comment ouvrir une soumission pour la modifier

1. Rendez-vous sur la page [Formulaires](index.md).
2. Ouvrez le schéma de formulaire qui contient la soumission.
3. Repérez la soumission que vous souhaitez modifier dans la liste des soumissions.
4. Survolez sa ligne et cliquez sur l'icône **Modifier** (crayon), ou cliquez sur la ligne pour la sélectionner puis cliquez sur **Modifier** dans la barre d'actions au-dessus du tableau. L'écran Modifier le formulaire s'ouvre avec les données enregistrées chargées.

## Travailler avec les métriques du formulaire

Si votre formulaire utilise des métriques, l'écran s'ouvre sur l'étape **Formez des métriques** avant d'afficher le questionnaire. Ces valeurs déterminent la façon dont la soumission est datée et regroupée dans les rapports et les agrégations — elles ne font pas partie du questionnaire lui-même.

1. Vérifiez ou modifiez la **Date de création** en cliquant sur **Modifier** et en choisissant une nouvelle date.
2. Remplissez les champs de métriques affichés, tels que le lieu, le projet ou l'organisation.
3. Si le schéma de formulaire comporte des statuts, choisissez le **Statut du formulaire** de la soumission.
4. Cliquez sur **Remplir le Formulaire** pour passer au questionnaire. Lorsque vous avez ouvert la soumission avec **Voir**, le bouton affiche **Visualiser le Formulaire**.

!!! tip "Créer une nouvelle métrique à la volée"
    Si une métrique dont vous avez besoin n'existe pas encore, cliquez sur **Nouveau** à côté du champ de métrique pour la créer sans quitter le formulaire. Cette option n'apparaît que si vous avez la permission de créer des métriques.

![L'étape Formez des métriques](../imgs/forms/index-create.png)

## Modifier vos réponses

Une fois le questionnaire affiché, vous pouvez modifier tout champ que vous avez la permission de modifier. Selon la configuration du formulaire, les champs peuvent être disposés sur une, deux ou trois colonnes, et certains peuvent être validés au fur et à mesure de la saisie.

1. Cliquez dans un champ et mettez à jour sa valeur.
2. Parcourez les étapes ou sections restantes du questionnaire.
3. Lorsque vous avez terminé, choisissez une action en haut du formulaire :
    * **Sauver le formulaire** : enregistre toutes vos modifications et met à jour la soumission.
    * **Sauver le projet** : stocke vos modifications actuelles sans les finaliser, afin que vous puissiez revenir et continuer plus tard. Ce bouton n'apparaît que si les brouillons sont activés pour votre formulaire.

!!! tip "Suivre les modifications"
    Lorsque le module de journaux est activé pour votre instance Dino, Dino enregistre les modifications apportées à chaque soumission. Sélectionnez une soumission dans la liste et cliquez sur **View History** dans la barre d'actions pour voir qui a modifié quoi et quand.

!!! warning "Modifier des données critiques"
    D'autres rapports ou analyses peuvent dépendre des valeurs de cette soumission. Si vous corrigez une erreur grave, demandez-vous si une nouvelle soumission ne serait pas plus appropriée que la modification d'une ancienne.

## Consulter le formulaire soumis

Si vous ouvrez une soumission avec l'action **Voir** plutôt que **Modifier**, le formulaire s'ouvre en mode lecture seule. Tous les champs sont visibles mais ne peuvent pas être modifiés, et les actions d'enregistrement ne sont pas disponibles. Utilisez cette vue pour vérifier ce qui a été enregistré.

![Vue du formulaire compilé après avoir cliqué sur Visualiser le Formulaire](../imgs/forms/edit-form-view.png)

## Actions associées

* Pour modifier la structure du formulaire lui-même — ses champs, sections et règles de validation — consultez [Modifier le schéma de formulaire](edit-form-schema.md).
* Pour comprendre comment les champs sont liés entre eux et comment les dépendances se comportent, consultez les options de relations dans [Modifier le schéma de formulaire](edit-form-schema.md).
* Pour visualiser les soumissions sur une carte, consultez [Carte des formulaires](forms-map.md).
* Pour créer une toute nouvelle soumission à la place, commencez par la page [Formulaires](index.md).