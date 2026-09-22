---
title: Modifier le report schema
description: Créez ou modifiez un report schema pour définir la structure, la mise en page et les sources de données des report dans Dino.
---

# Modifier le report schema

La page **Modifier le report schema** vous permet de créer un nouveau report schema ou d'en modifier un existant. Un report schema définit la structure, la mise en page et les sources de données d'un report dans Dino.

![Vue principale de la page Modifier le report schema](../imgs/reports/edit-report-schema.png)

Sur cette page, vous configurez le nom et la description du report, ainsi que les champs de données spécifiques qui apparaîtront dans le report à partir des données soumises via vos form.

## Créer un nouveau report schema

Pour créer un nouveau report schema :

1. Accédez à la section **Reports** du menu principal.
2. Cliquez sur **Créer un report schema**.
3. Vous êtes redirigé vers la page Modifier le report schema.
4. Saisissez un **Nom** descriptif pour votre report.
5. (Facultatif) Ajoutez une **Description** expliquant l'objectif du report.
6. Importez un fichier XLSReport
7. Cliquez sur **Enregistrer** pour créer le schema.

## Modifier un report schema existant

Pour modifier un report schema que vous avez déjà créé :

1. Accédez à la section **Reports**.
2. Trouvez dans la liste le report schema que vous souhaitez modifier et cliquez dessus.
3. Cliquez sur le bouton **Modifier** (souvent représenté par une icône en forme de crayon).
4. Vous êtes redirigé vers la page Modifier le report schema, avec la configuration actuelle chargée.
5. Apportez les modifications souhaitées au nom, à la description ou à la configuration des données.
6. Cliquez sur **Enregistrer** pour mettre à jour le schema.

!!! tip "Enregistrer votre travail"
    Pensez toujours à cliquer sur **Enregistrer** après avoir effectué des modifications. Vos changements ne sont pas appliqués tant que vous n'avez pas enregistré le schema.

## Configurer les données du report

Le cœur du report schema consiste à définir quelles données issues de vos form apparaîtront dans le report. Vous pouvez généralement :

* **Sélectionner la source de données :** choisissez le form schema qui contient les données sur lesquelles vous souhaitez établir votre report.
* **Sélectionner les champs de données :** choisissez des champs spécifiques dans les form schema connectés pour les inclure en tant que colonnes du report.
* **Définir les noms affichés :** personnalisez l'en-tête de colonne affiché dans le report pour chaque champ sélectionné.
* **Définir des filtres :** définissez des conditions pour n'inclure que certaines données répondant à vos critères (par exemple, les données d'une plage de dates donnée).

!!! warning "Source de données"
    Un report schema doit être connecté à au moins un form schema pour disposer de données à afficher. Assurez-vous que le form concerné existe avant de créer votre report.

## Étapes suivantes

Après avoir enregistré votre report schema, vous pouvez :

* Accéder à la page [Reports](index.md) pour consulter et exécuter votre nouveau report.
* Revenir à cette page pour effectuer d'autres ajustements si nécessaire.