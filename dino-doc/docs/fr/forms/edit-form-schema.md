---
title: Modifier le schéma de formulaire
description: Créer et modifier des schémas de formulaire — définir le nom, l'icône, les statuts, les métriques, la visibilité et les relations.
---

# Modifier le schéma de formulaire

La page Modifier le schéma de formulaire vous permet de créer un nouveau schéma de formulaire ou d'en modifier un existant. Vous y définissez les attributs de base du formulaire, gérez ses statuts et ses métriques, contrôlez sa visibilité et reliez le schéma à d'autres formulaires via des relations.

Vous pouvez accéder à cette page en :

- Cliquant sur **Créer** dans la [vue d'ensemble des formulaires](index.md) pour créer un nouveau schéma.
- Sélectionnant **Modifier** sur la carte d'un schéma existant ou à partir de sa vue détaillée.

Le fil d'Ariane en haut indique votre position actuelle (par exemple, **Formulaires > Mon enquête > Modifier**).

![Main view of the Edit Form Schema page](../imgs/forms/edit-form-schema.png)

## Attributs du formulaire

Remplissez ou ajustez les champs suivants :

| Champ | Description |
|-------|-------------|
| **Nom du formulaire** | Identifiant système unique (par exemple, `survey_2025`). Dino avertit si le nom est déjà utilisé. |
| **Libellé du formulaire** | Le nom lisible par les utilisateurs, affiché dans les listes et les rapports. |
| **Jeu d'icônes** | Choisissez **Par défaut** (icônes Material) ou **Humanitaire** (icônes SVG personnalisées). |
| **Identifiant d'icône** | Sélectionnez une icône dans la liste d'autocomplétion. L'aperçu se met à jour en direct. |
| **Statuts du formulaire** | Un ou plusieurs libellés décrivant l'état d'une soumission (par exemple, Brouillon, Approuvé, Rejeté). Sélectionnez des statuts existants ou cliquez sur **Créer un nouveau statut** pour en ajouter un à la volée. |
| **Métriques du formulaire** | Métriques à collecter pour chaque soumission. Sélectionnez-en une ou plusieurs dans la liste. |
| **Visibilité** | **Privé** – seuls les membres des groupes assignés peuvent voir le formulaire. **Public** – toute personne disposant du lien peut le voir et soumettre. |
| **Comportement de l'ensemble de métriques** | **Par défaut** – chaque valeur de métrique peut apparaître plusieurs fois dans les soumissions. **Unique** – une valeur de métrique (par exemple, un nom de district) ne peut être utilisée qu'une seule fois par formulaire. |
| **Générer un rapport** | Lorsque **Oui** est sélectionné, Dino génère automatiquement un rapport après chaque soumission. Cette option est masquée si un rapport automatique est déjà configuré. |

!!! warning "Comportement « Unique » de l'ensemble de métriques"
    Utilisez **Unique** avec précaution — une fois qu'une valeur est utilisée pour une métrique, elle ne peut plus être réutilisée dans une autre soumission du même formulaire.

## Gestion des statuts du formulaire

1. Cliquez sur le champ **Statuts du formulaire** pour développer la liste.
2. Pour ajouter un statut existant, cochez sa case.
3. Pour créer un nouveau statut, cliquez sur **Créer un nouveau statut**. Une boîte de dialogue s'ouvre pour saisir un libellé, choisir une couleur et enregistrer.
4. Pour modifier un statut existant, cliquez sur l'icône **modifier** (crayon) à côté de celui-ci.
5. Cliquez en dehors de la liste déroulante pour la fermer.

## Définition des relations

Les relations vous permettent de lier des champs entre différents schémas de formulaire (par exemple, un sous-formulaire qui dépend d'un choix dans le formulaire principal).

1. Cliquez sur le bouton **Relations**.
2. Dans la boîte de dialogue, ajoutez, modifiez ou supprimez des connexions entre schémas.

![Form relationships (dependencies) editor dialog](../imgs/forms/edit-form-schema-relationships.png)

!!! tip "Les relations ne sont disponibles que lors de la modification d'un schéma existant, pas lors de sa création initiale."

## Enregistrement et importation

- **Enregistrer** – enregistre toutes les modifications. Le bouton est désactivé si le formulaire est invalide ou en cours d'enregistrement.
- **Importer** – ouvre un sélecteur de fichier pour charger un schéma de formulaire à partir d'un fichier JSON ou CSV. Utilisez cette option pour réutiliser la structure d'un schéma d'un autre projet.

## Le générateur de formulaire

Sous les attributs, la zone **Générateur de formulaire** vous permet de glisser-déposer et de configurer les champs individuels (questions, sections, etc.). Les modifications sont répercutées immédiatement dans l'aperçu sur le côté droit du générateur.