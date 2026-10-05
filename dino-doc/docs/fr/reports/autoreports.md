---
title: Rapport automatique
description: Créer ou modifier un rapport généré automatiquement
---

# Rapports automatiques

Un rapport automatique est un rapport que Dino construit pour vous à partir d'un form schema. Vous ne l'écrivez pas vous-même : vous l'activez pendant la modification du form schema, et Dino crée le report schema ainsi qu'un premier rapport pour vous.

Utilisez un rapport automatique lorsque vous souhaitez consulter les données collectées par un form sans devoir d'abord concevoir un rapport. Lorsque vous avez besoin d'un contrôle total sur la mise en page, les calculs ou les graphiques, construisez plutôt le rapport avec le [format XLSReport](xlsreport.md).

## Activer un rapport automatique

1. Ouvrez la section **Formulaires** et sélectionnez le form schema pour lequel vous voulez le rapport.
2. Rendez-vous dans l'onglet **Paramètres**.
3. Réglez **Générer un rapport** sur **Oui**.
4. Enregistrez le form schema.

Dino crée le rapport quelques secondes après l'enregistrement. Vous le trouverez dans la section [Rapports](index.md), listé comme n'importe quel autre rapport.

## Ce que Dino crée

L'enregistrement d'un form schema avec **Générer un rapport** réglé sur **Oui** produit deux éléments :

| Élément | Détails |
|---|---|
| Un report schema | Nommé d'après le form, avec le libellé **&lt;libellé du form&gt; Auto Report** et la même icône que le form. Il reste lié au form schema à partir duquel il a été généré. |
| Un premier rapport | Créé quelques secondes plus tard, daté du jour courant et qui vous est attribué. Il n'a aucun filtre de zone, de cas, de posizione, d'organisation ou de projet, il couvre donc toutes les données que le form a collectées. |

Vous pouvez ouvrir le rapport généré et l'utiliser comme n'importe quel autre : le rapport qu'il produit est un point de départ, pas un résultat figé.

## Désactiver un rapport automatique

Une fois qu'un rapport automatique existe, le champ **Générer un rapport** du form schema se verrouille sur **Oui** et affiche une indication en ce sens. Il n'est pas possible de retirer le rapport depuis cet écran.

Pour le supprimer, rendez-vous dans la section **Rapports** et supprimez le report schema du rapport généré ainsi que ses données. Le champ du form schema se déverrouille dès que le rapport a disparu, et vous pouvez le régler de nouveau sur **Non**.

## Pages liées

- [Modifier un form schema](../forms/edit-form-schema.md) — où se trouve l'option **Générer un rapport**
- [Le format XLSReport](xlsreport.md) — pour les rapports que vous concevez vous-même
- [Rapports](index.md) — la section où apparaissent les rapports générés