---
title: Agrégation
description: Consultez, filtrez et gérez tous les formulaires soumis pour l'ensemble de vos Formulaires depuis une seule page.
---

# Agrégation

La page Agrégation vous offre une vue centralisée de tous les formulaires soumis pour l'ensemble de vos Formulaires. Au lieu d'ouvrir chaque formulaire individuellement, vous pouvez parcourir tous les formulaires soumis dans un seul tableau, les affiner à l'aide de filtres et effectuer des actions telles que Voir, Modifier, Imprimer ou Supprimer.

![Main view of the Aggregation page](../imgs/aggregation/index.png)

## Consulter la liste d'agrégation

Le tableau affiche une ligne par formulaire soumis. Par défaut, vous voyez les colonnes **Formulaires** et **Statut** ; utilisez le bouton **Colonnes** au-dessus du tableau, à droite, pour choisir les colonnes affichées.

- Chaque ligne affiche une icône de statut. Si un formulaire soumis présente des problèmes de validation, une icône d'avertissement apparaît sur la ligne.
- Survolez une ligne pour afficher les icônes **Voir** et **Modifier** ; cliquez n'importe où sur une ligne pour la sélectionner et révéler toutes les actions disponibles.
- Le compteur **Éléments trouvés** et le paginateur en haut de la page vous indiquent combien de formulaires soumis existent et vous permettent de naviguer entre les pages.

Si vous n'appliquez aucun filtre, la liste affiche tous les formulaires soumis que vous êtes autorisé à voir, en fonction de vos permissions d'utilisateur.

## Filtre et recherche

1. Saisissez un terme dans le champ **recherche par mot-clé** de la barre d'outils pour effectuer une recherche dans les formulaires soumis.
2. Cliquez sur **Filtres** dans la barre d'outils pour ouvrir le panneau de filtres.
3. Choisissez une **De date** et une **À ce jour** pour filtrer par date de création.
4. Renseignez l'un des filtres supplémentaires : **Domaine**, **Cas**, **Case code**, **Emplacement**, **Organisation**, **Projet**, **Statut du formulaire** et **Utilisateur**. Les valeurs proposées dépendent des métriques configurées dans votre Dino.
5. Cliquez sur **Chercher** pour appliquer vos filtres, ou sur **Réinitialiser les filtres** pour les effacer.

Les filtres actifs apparaissent sous forme de puces sous la barre d'outils. Cliquez sur l'icône **annuler** d'une puce pour supprimer ce filtre.

!!! tip "Aucun préréglage enregistré"
    La page Agrégation ne prend pas en charge les préréglages de filtres enregistrés ni les conditions de filtre avancées. Vous combinez les filtres chaque fois que vous avez besoin d'une visualisation personnalisée ; supprimer une puce est le moyen le plus rapide d'assouplir une recherche existante.

## Actions sur les lignes

Survolez une ligne pour afficher les icônes **Voir** (œil) et **Modifier** (crayon). Pour voir toutes les actions, cliquez sur la ligne pour la sélectionner : la barre d'actions au-dessus du tableau affiche alors un bouton pour chaque action que vous êtes autorisé à utiliser.

| Action | Description |
|--------|-------------|
| **Voir** | Ouvrir le formulaire soumis en mode lecture seule. |
| **Modifier** | Modifier les données du formulaire soumis. |
| **Imprimer** | Générer un PDF du formulaire soumis. |
| **Supprimer** | Supprimer le formulaire soumis. |

**Imprimer** et **Supprimer** demandent une confirmation (*Do you want to print the selected items?*, **Oui** / **Non**) avant de s'exécuter.

## Créer un nouveau formulaire soumis

Le bouton **Ajouter un nouveau formulaire** dans la barre d'outils vous permet de démarrer un nouveau formulaire soumis. Il n'est affiché que si la création de formulaires soumis depuis la page Agrégation est activée pour votre instance Dino.

![Dialog to choose a form schema and start a new submission](../imgs/aggregation/index-new.png)

1. Cliquez sur **Ajouter un nouveau formulaire**. La boîte de dialogue **Créer le formulaire** s'ouvre et liste les Formulaires disponibles.
2. Sélectionnez le Formulaires que vous souhaitez utiliser.
3. Cliquez sur **Créer le formulaire**. Vous êtes redirigé vers la page [Modifier le formulaire](../forms/edit-form.md), où vous renseignez et enregistrez les données.

## Imprimer un PDF

Vous pouvez générer un PDF de n'importe quel formulaire soumis. Le PDF inclut le libellé du Formulaires, les noms des métriques actives et les données saisies.

1. Cliquez sur la ligne que vous souhaitez imprimer pour la sélectionner, puis cliquez sur **Imprimer** dans la barre d'actions.
2. Confirmez avec **Oui**.
3. Le PDF s'ouvre dans un nouvel onglet du navigateur ou se télécharge automatiquement.

L'en-tête du PDF inclut le titre du Formulaires et tous les noms des métriques actuellement actives dans le système.

!!! warning "Disponibilité des métriques"
    Le PDF inclut uniquement les métriques actives au moment où vous lancez l'impression. Une métrique ajoutée après la création du formulaire soumis n'apparaîtra pas.

## Pages associées

- [Formulaires](../forms/index.md) — gérer les Formulaires derrière vos formulaires soumis.
- [Modifier le formulaire](../forms/edit-form.md) — renseigner et mettre à jour les données des formulaires soumis.
- [Import Data](../forms/import.md) — importer des formulaires soumis dans Dino en masse.
- [Métriques](../metrics/index.md) — configurer les métriques qui alimentent les filtres et le rendu imprimé.