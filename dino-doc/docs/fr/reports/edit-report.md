---
title: Modifier un rapport
description: Apprenez à modifier un rapport existant dans Dino, y compris la mise à jour des métriques et des détails.
---

# Modifier un rapport

La page Modifier un rapport vous permet de modifier un rapport existant. Vous pouvez mettre à jour ses métriques, ses détails et d'autres informations après sa création.

![Main view of the Edit Report page](../imgs/reports/edit-report.png)

## Accéder à la page de modification

Vous pouvez accéder à la page Modifier un rapport de deux manières :

* Depuis la liste principale des [rapports](index.md), cliquez sur le titre d'un rapport ou sur l'action **Modifier** (souvent représentée par une icône en forme de crayon).
* Depuis la vue détaillée d'un rapport (après avoir cliqué sur **Voir le rapport**), recherchez un bouton ou un lien **Modifier**.

## Modifier les informations du rapport

Une fois sur la page Modifier un rapport, vous verrez un formulaire similaire à celui utilisé pour créer un rapport. Le formulaire est prérempli avec les données actuelles du rapport.

### Étapes pour modifier un rapport

1. **Vérifiez les données préremplies** dans les champs du formulaire.
2. **Effectuez vos modifications** sur l'un des champs disponibles :
   - **Métriques principales :** Mettez à jour les valeurs numériques principales du rapport.
   - **Métriques secondaires :** Modifiez les points de données supplémentaires (si configurés pour votre schéma de formulaire).
   - **Détails :** Modifiez le texte descriptif, les dates ou d'autres informations complémentaires.
3. **Enregistrez vos modifications** en cliquant sur le bouton **Enregistrer** ou **Mettre à jour** en bas du formulaire.

!!! tip "Champs facultatifs"
    Selon la configuration de votre organisation, certains champs de métriques peuvent être facultatifs. Ils sont généralement indiqués comme tels. Vous pouvez laisser les champs facultatifs vides si aucune donnée n'est disponible.

## Visualiser le rapport généré

Après avoir enregistré vos modifications, vous pouvez visualiser le rapport formaté. Cliquez sur le bouton ou le lien **Voir le rapport** pour voir une version propre et rendue des données du rapport.

![Rendered report view after clicking View the Report](../imgs/reports/edit-report-view.png)

## Comprendre le schéma de formulaire

La structure et les champs disponibles sur la page Modifier un rapport sont déterminés par le **schéma de formulaire** configuré par votre administrateur. Cela garantit une collecte cohérente des données.

![Main view of the Edit Report Schema page](../imgs/reports/edit-report-schema.png)

Si vous devez modifier des informations qui n'apparaissent pas en tant que champ, contactez votre administrateur – le schéma de formulaire peut nécessiter une mise à jour. Vous pouvez en apprendre davantage sur la structure sous-jacente dans la documentation [Schéma de modification de rapport](edit-report-schema.md).

!!! warning "Intégrité des données"
    Soyez prudent lors de la modification des données de rapport historiques, car les changements peuvent affecter l'analyse des tendances et les enregistrements historiques. Assurez-vous que vos mises à jour sont exactes.