---
title: Agrégation
description: Visualisez et gérez les soumissions de formulaires agrégées dans Dino.
---

# Agrégation

La page Agrégation vous offre une vue centralisée de toutes les soumissions de formulaires de vos schémas de formulaires. Vous pouvez parcourir, filtrer et agir sur les soumissions sans avoir à ouvrir chaque formulaire individuellement.

![Vue principale de la page Agrégation](../imgs/aggregation/index.png)

## Consultation de la liste d’agrégation

Le tableau principal affiche une ligne par soumission. Par défaut, les colonnes **Schéma de formulaire** et **Statut** sont affichées, mais vous pouvez personnaliser les colonnes à l’aide de l’icône **Afficher les colonnes** dans l’en-tête du tableau.

- Chaque ligne affiche une icône de statut et, si le formulaire comporte des problèmes de validation, une icône d’avertissement.
- Survolez une ligne pour la surligner ; cliquez n’importe où sur une ligne pour la sélectionner et afficher les actions disponibles.

En haut de la liste, le compteur **Éléments trouvés** et le paginateur indiquent le nombre de soumissions et permettent de naviguer entre les pages.

Si vous n’appliquez aucun filtre à la liste de la page Agrégation, vous verrez le nombre total de formulaires soumis à votre Dino que vous êtes autorisé à consulter, selon les permissions de votre utilisateur.

## Filtrage et recherche

Une barre de recherche et un panneau de filtres sont disponibles pour affiner la liste.

1. Cliquez sur l’**icône de recherche** dans la barre supérieure pour déplier le panneau de filtres.
2. Utilisez le champ **mot-clé** pour rechercher dans tous les champs.
3. Utilisez les sélecteurs de **plage de dates** pour filtrer par date de création.
4. Des filtres supplémentaires apparaissent pour **Zone**, **Cas**, **Localisation**, **Organisation**, **Projet**, **Statut du formulaire** et **Utilisateur**. Ces filtres sont dynamiques et respectent les définitions de métriques de votre formulaire.
5. Les filtres actifs sont affichés sous forme de pastilles sous la barre de filtres : cliquez sur l’icône **annuler** d’une pastille pour la supprimer.

!!! tip "Filtres prédéfinis"
    La page Agrégation ne prend pas en charge les filtres prédéfinis enregistrés. Vous pouvez combiner les filtres à chaque fois que vous avez besoin d’une vue personnalisée.

## Actions de ligne

Après avoir sélectionné une ligne, les icônes d’action apparaissent dans la colonne **Actions** à droite du tableau.

| Icône | Action | Description |
|------|--------|-------------|
| `view` | Consulter | Ouvre la soumission en mode lecture seule. |
| `edit` | Modifier | Modifie les données de la soumission. |
| `print` | Imprimer | Génère un PDF de la soumission. |
| `delete` | Supprimer | Supprime la soumission après confirmation. |

Cliquez sur **Plus d’actions** (trois points) pour afficher des actions supplémentaires pour cette ligne. Les actions **Imprimer** et **Supprimer** demandent confirmation avant d’être exécutées.

## Création d’une nouvelle soumission

Le bouton flottant **+** en bas à droite de l’écran vous permet de créer une nouvelle soumission.

![Boîte de dialogue pour choisir un schéma de formulaire et démarrer une nouvelle soumission](../imgs/aggregation/index-new.png)

1. Cliquez sur le bouton **+**. Une boîte de dialogue s’ouvre et affiche les schémas de formulaires disponibles.
2. Sélectionnez ou recherchez le schéma de formulaire que vous souhaitez utiliser.
3. Après la sélection, vous êtes redirigé directement vers la page [Modifier le formulaire](../forms/edit-form.md) pour renseigner les données.

## Impression d’un PDF

Vous pouvez générer un PDF de n’importe quelle soumission, contenant le libellé du schéma de formulaire, les noms des métriques actives et les données saisies.

1. Sur la ligne à imprimer, cliquez sur l’icône **Imprimante** (ou utilisez le menu **Plus d’actions** s’il est disponible).
2. Confirmez l’action lorsque vous y êtes invité.
3. Le PDF s’ouvre dans un nouvel onglet du navigateur ou se télécharge automatiquement.

L’en-tête du PDF inclut le titre du schéma de formulaire et tous les noms de métriques actuellement actifs dans le système.

!!! warning "Disponibilité des métriques"
    Le PDF imprimé ne contient que les métriques actives au moment où vous déclenchez l’impression. Si une métrique a été ajoutée après la création de la soumission, elle n’apparaîtra pas.