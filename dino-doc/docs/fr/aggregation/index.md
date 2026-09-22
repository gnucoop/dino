---
title: Agrégation
description: Affichez et gérez les soumissions de form agrégées dans Dino.
---

# Agrégation

La page Agrégation vous offre une vue centralisée de toutes les soumissions de form de vos form schema. Vous pouvez parcourir, filtrer et agir sur les soumissions de form sans avoir à ouvrir chaque form individuellement.

![Vue principale de la page Agrégation](../imgs/aggregation/index.png)

## Consulter la liste d'agrégation

Le tableau principal affiche une ligne par soumission. Par défaut, vous voyez les colonnes **Form Schema** et **Statut**, mais vous pouvez personnaliser les colonnes affichées à l'aide de l'icône **Afficher les colonnes** dans l'en-tête du tableau.

- Chaque ligne affiche une icône de statut et, si le form présente des problèmes de validation, une icône d'avertissement.
- Survolez une ligne pour la mettre en surbrillance ; cliquez n'importe où sur une ligne pour la sélectionner et faire apparaître les actions disponibles.

En haut de la liste, le compteur **Éléments trouvés** et la pagination vous indiquent combien de soumissions existent et vous permettent de naviguer d'une page à l'autre.

Si vous n'appliquez aucun filtre à la liste de la page Agrégation, vous verrez le nombre total de form envoyés à votre Dino que vous êtes autorisé à consulter, en fonction des permissions de votre utilisateur.

## Filtrage et recherche

Une barre de recherche et un panneau de filtres sont disponibles pour affiner la liste.

1. Cliquez sur l'**icône de recherche** dans la barre supérieure pour déplier le panneau de filtres.
2. Utilisez le champ **mot-clé** pour effectuer une recherche dans tous les champs.
3. Utilisez les sélecteurs de **plage de dates** pour filtrer par date de création.
4. Des filtres supplémentaires apparaissent pour **Zone**, **Cas**, **Emplacement**, **Organisation**, **Projet**, **Statut du form** et **Utilisateur**. Ils sont dynamiques et respectent les définitions de métriques de votre form.
5. Les filtres actifs s'affichent sous forme de puces sous la barre de filtres – cliquez sur l'icône **Annuler** d'une puce pour la retirer.

!!! tip "Filtres prédéfinis"
    La page Agrégation ne prend pas en charge les préréglages de filtres enregistrés. Vous pouvez combiner les filtres chaque fois que vous avez besoin d'une vue personnalisée.

## Actions sur les lignes

Après avoir sélectionné une ligne, les icônes d'action apparaissent dans la colonne **Actions** à droite du tableau.

| Icône | Action | Description |
|------|--------|-------------|
| `view` | Visualiser | Ouvrir la soumission en lecture seule. |
| `edit` | Modifier | Modifier les données de la soumission. |
| `print` | Imprimer | Générer un PDF de la soumission. |
| `delete` | Supprimer | Supprimer la soumission après confirmation. |

Cliquez sur **More Horiz** (trois points) pour afficher d'autres actions pour cette ligne. Les actions **Imprimer** et **Supprimer** demandent une confirmation avant d'être exécutées.

## Créer une nouvelle soumission

Le bouton flottant **+** en bas à droite de l'écran vous permet de démarrer une nouvelle soumission.

![Boîte de dialogue permettant de choisir un form schema et de démarrer une nouvelle soumission](../imgs/aggregation/index-new.png)

1. Cliquez sur le bouton **+**. Une boîte de dialogue s'ouvre et affiche les form schema disponibles.
2. Sélectionnez ou recherchez le form schema que vous souhaitez utiliser.
3. Après la sélection, vous êtes directement redirigé vers la page [Modifier le form](../forms/edit-form.md) pour saisir les données.

## Imprimer un PDF

Vous pouvez générer un PDF de n'importe quelle soumission, comprenant le libellé du form schema, les noms des métriques actives et les données saisies.

1. Sur la ligne concernée, cliquez sur l'icône **Imprimante** (ou utilisez le menu **More Horiz** si disponible).
2. Confirmez l'action lorsque vous y êtes invité.
3. Le PDF s'ouvre dans un nouvel onglet du navigateur ou se télécharge automatiquement.

L'en-tête du PDF inclut le titre du form schema et tous les noms des métriques actuellement actives dans le système.

!!! warning "Disponibilité des métriques"
    Le PDF imprimé inclut uniquement les métriques actives au moment où vous lancez l'impression. Si une métrique a été ajoutée après la création de la soumission, elle n'apparaîtra pas.