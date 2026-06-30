---
title: Modifier le schéma du formulaire
description: Créez et modifiez des schémas de formulaire — définissez le nom, l'icône, les statuts, les métriques, la visibilité et les relations.
---

# Modifier le schéma du formulaire

La page Modifier le schéma du formulaire vous permet de créer un nouveau schéma de formulaire ou d'en modifier un existant. Vous y définissez les attributs de base du formulaire, gérez ses statuts et métriques, contrôlez la visibilité et liez le schéma à d'autres formulaires via des relations.

Vous pouvez accéder à cette page en :

- Cliquant sur **Créer** dans la [Vue d'ensemble des formulaires](index.md) pour créer un nouveau schéma.
- En sélectionnant **Modifier** sur la carte d'un schéma existant ou depuis sa vue détaillée.

Le fil d'Ariane en haut indique votre position actuelle (ex. **Formulaires > Mon enquête > Modifier**).

![Vue principale de la page Modifier le schéma du formulaire](../imgs/forms/edit-form-schema.png)

## Attributs du formulaire

Remplissez ou ajustez les champs suivants :

| Champ | Description |
|-------|-------------|
| **Nom du formulaire** | Un identifiant système unique (ex. `survey_2025`). Dino vous avertit si le nom est déjà pris. |
| **Libellé du formulaire** | Le nom lisible affiché dans les listes et les rapports. |
| **Jeu d'icônes** | Choisissez **Par défaut** (icônes Material) ou **Humanitaire** (icônes SVG personnalisées). |
| **Identifiant d'icône** | Choisissez une icône dans la liste de saisie semi-automatique. L'aperçu se met à jour en direct. |
| **Statuts du formulaire** | Un ou plusieurs libellés décrivant l'état d'une soumission (ex. Brouillon, Approuvé, Rejeté). Sélectionnez des statuts existants ou **Créez un nouveau statut** pour en ajouter un à la volée. |
| **Métriques du formulaire** | Métriques à collecter pour chaque soumission. Sélectionnez-en une ou plusieurs dans la liste. |
| **Visibilité** | **Privé** – seuls les membres des groupes assignés peuvent voir le formulaire. **Public** – toute personne possédant le lien peut le consulter et soumettre. |
| **Comportement du jeu de métriques** | **Par défaut** – chaque valeur de métrique peut apparaître plusieurs fois dans les soumissions. **Unique** – une valeur de métrique (par exemple, un nom de district) ne peut être utilisée qu'une seule fois par formulaire. |
| **Générer un rapport** | Lorsque **Oui**, Dino génère automatiquement un rapport après chaque soumission. Cette option est masquée si un rapport automatique est déjà configuré. |

!!! warning "Comportement unique du jeu de métriques"
    Utilisez **Unique** avec précaution — une fois qu'une valeur est utilisée pour une métrique, elle ne peut pas être réutilisée dans une autre soumission du même formulaire.

## Gestion des statuts du formulaire

1. Cliquez sur le champ **Statuts du formulaire** pour dérouler la liste.
2. Pour ajouter un statut existant, cochez sa case.
3. Pour créer un nouveau statut, cliquez sur **Créer un nouveau statut**. Une boîte de dialogue s'ouvre pour saisir un libellé, choisir une couleur et enregistrer.
4. Pour modifier un statut existant, cliquez sur l'icône **modifier** (crayon) à côté.
5. Cliquez en dehors de la liste déroulante pour la fermer.

## Définition des relations

Les relations permettent de lier des champs entre différents schémas de formulaires (par exemple, un sous-formulaire qui dépend d'un choix dans le formulaire principal).

1. Cliquez sur le bouton **Relations**.
2. Dans la boîte de dialogue, ajoutez, modifiez ou supprimez des connexions entre les schémas.

![Éditeur de relations (dépendances) entre formulaires](../imgs/forms/edit-form-schema-relationships.png)

!!! tip "Les relations ne sont disponibles que lors de la modification d'un schéma existant, pas lors de la création initiale."

## Sauvegarde et importation

- **Enregistrer** – sauvegarde toutes les modifications. Le bouton est désactivé si le formulaire est invalide ou en cours d'enregistrement.
- **Importer** – ouvre un sélecteur de fichiers pour charger un schéma de formulaire depuis un fichier JSON ou CSV. Utilisez cette option pour réutiliser une structure de schéma d'un autre projet.

## Le concepteur de formulaire

Sous les attributs, la zone **Concepteur de formulaire** vous permet de glisser-déposer et de configurer des champs individuels (questions, sections, etc.). Les modifications sont immédiatement reflétées dans l'aperçu sur le côté droit du concepteur.
