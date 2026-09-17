---
title: Modifier un rapport
description: Découvrez comment modifier un rapport existant dans Dino, notamment la mise à jour des indicateurs et des détails.
---

# Modifier un rapport

La page Modifier un rapport vous permet de modifier un rapport existant. Vous pouvez mettre à jour ses indicateurs, ses détails et d'autres informations après sa création.

![Main view of the Edit Report page](../imgs/reports/edit-report.png)

## Accéder à la page Modifier un rapport

Vous pouvez accéder à la page Modifier un rapport de deux manières :

* Depuis la liste principale des [rapports](index.md), cliquez sur le titre d'un rapport ou sur l'action **Modifier** (souvent représentée par une icône de crayon).
* Depuis la vue détaillée d'un rapport (après avoir cliqué sur **Afficher le rapport**), recherchez un bouton ou un lien **Modifier**.

## Modifier les informations du rapport

Une fois sur la page Modifier un rapport, vous verrez un formulaire similaire à celui utilisé pour créer un rapport. Le formulaire est pré-rempli avec les données actuelles du rapport.

### Étapes pour modifier un rapport

1. **Vérifiez les données pré-remplies** dans les champs du formulaire.
2. **Apportez vos modifications** aux champs disponibles :
   - **Indicateurs principaux :** Mettez à jour les principales valeurs numériques du rapport.
   - **Indicateurs secondaires :** Modifiez des points de données supplémentaires (si configurés pour votre schéma de formulaire).
   - **Détails :** Modifiez le texte descriptif, les dates ou d'autres informations complémentaires.
3. **Enregistrez vos modifications** en cliquant sur le bouton **Enregistrer** ou **Mettre à jour** en bas du formulaire.

!!! tip "Champs facultatifs"
    Selon la configuration de votre organisation, certains champs d'indicateurs peuvent être facultatifs. Ils sont généralement signalés comme tels. Vous pouvez laisser les champs facultatifs vides si aucune donnée n'est disponible.

## Affichage du rapport mis en forme

Après avoir enregistré vos modifications, vous pouvez consulter le rapport mis en forme. Cliquez sur le bouton ou le lien **Afficher le rapport** pour obtenir une version propre et mise en forme des données du rapport.

![Rendered report view after clicking View the Report](../imgs/reports/edit-report-view.png)

## Comprendre le schéma de formulaire

La structure et les champs disponibles sur la page Modifier un rapport sont déterminés par le **schéma de formulaire** configuré par votre administrateur. Cela garantit une collecte cohérente des données.

![Main view of the Edit Report Schema page](../imgs/reports/edit-report-schema.png)

Si vous devez modifier des informations qui n'apparaissent pas comme un champ, contactez votre administrateur – le schéma de formulaire devra peut-être être mis à jour. Vous pouvez en apprendre davantage sur la structure sous-jacente dans la documentation [Modifier le schéma du rapport](edit-report-schema.md).

!!! warning "Intégrité des données"
    Soyez prudent lorsque vous modifiez des données historiques de rapport, car les modifications peuvent affecter l'analyse des tendances et les enregistrements historiques. Assurez-vous que vos mises à jour sont exactes.