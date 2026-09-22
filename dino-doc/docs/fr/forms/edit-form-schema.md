---
title: Modifier le schéma de formulaire
description: Créer et modifier des schémas de formulaire — définir le nom, l’icône, les statuts, les métriques, la visibilité et définir les relations.
---

# Modifier le schéma de formulaire

La page Modifier le schéma de formulaire vous permet de créer un nouveau schéma de formulaire ou de modifier un schéma existant. Vous y définissez les attributs de base du formulaire, gérez ses statuts et ses métriques, contrôlez la visibilité et liez le schéma à d’autres formulaires via des relations.

Vous pouvez accéder à cette page en :

- Cliquant sur **Créer** dans la [Vue d’ensemble des formulaires](index.md) pour créer un nouveau schéma.
- Sélectionnant **Modifier** sur la carte d’un schéma existant ou depuis sa vue détaillée.

Le fil d’Ariane en haut indique votre position actuelle (par exemple, **Formulaires > Mon enquête > Modifier**).

![Main view of the Edit Form Schema page](../imgs/forms/edit-form-schema.png)

## Attributs du formulaire

Remplissez ou ajustez les champs suivants :

| Champ | Description |
|-------|-------------|
| **Nom du formulaire** | Un identifiant système unique (par exemple, `survey_2025`). Dino avertit si le nom est déjà utilisé. |
| **Libellé du formulaire** | Le nom lisible par l’humain affiché dans les listes et les rapports. |
| **Jeu d’icônes** | Choisissez **Par défaut** (icônes Material) ou **Humanitaire** (icônes SVG personnalisées). |
| **Identifiant de l’icône** | Choisissez une icône dans la liste de saisie semi-automatique. L’aperçu se met à jour en direct. |
| **Statuts du formulaire** | Une ou plusieurs étiquettes décrivant l’état d’une soumission (par exemple, Brouillon, Approuvé, Rejeté). Sélectionnez des statuts existants ou **Créer un nouveau statut** pour en ajouter un à la volée. Il est possible d’associer un niveau à chaque statut, afin d’établir un ordre entre les statuts. Lorsqu’une nouvelle donnée de formulaire est créée, elle est créée avec le statut correspondant au niveau le plus bas.|
| **Métriques du formulaire** | Métriques à collecter pour chaque soumission. Sélectionnez-en une ou plusieurs dans la liste. |
| **Visibilité** | **Privé** – le schéma de formulaire ne peut accepter de soumissions que de la part des utilisateurs DINO, à condition qu’ils aient l’autorisation de soumettre des données pour ce schéma de formulaire particulier. D’un autre côté, si un formulaire est défini sur **Public**, toute personne disposant du lien peut soumettre. Consultez la page sur les [formulaires publics](../public-forms/index.md) pour plus de détails.|
| **Comportement du jeu de métriques** | **Par défaut** – chaque valeur de métrique peut apparaître plusieurs fois dans les soumissions. **Unique** – une valeur de métrique (par exemple, un nom de district) ne peut être utilisée qu’une seule fois par formulaire. |
| **Générer un rapport** | Lorsque **Oui**, Dino génère automatiquement un rapport. Cette option est masquée si un rapport automatique est déjà présent. Consultez la section [rapport automatique](../reports/autoreports.md) pour plus de détails. |

!!! warning "Comportement du jeu de métriques uniques"
    Utilisez **Unique** avec précaution — une fois qu’une valeur est utilisée pour une métrique, elle ne peut pas être réutilisée dans une autre soumission du même schéma de formulaire.

## Gestion des statuts du formulaire

1. Cliquez sur le champ **Statuts du formulaire** pour développer la liste.
2. Pour ajouter un statut existant, cochez sa case.
3. Pour créer un nouveau statut, cliquez sur **Créer un nouveau statut**. Une boîte de dialogue s’ouvre, dans laquelle vous pouvez saisir un libellé, choisir une couleur et enregistrer.
4. Pour modifier un statut existant, cliquez sur l’icône **modifier** (crayon) à côté de celui-ci.
5. Cliquez en dehors de la liste déroulante pour la fermer.

## Définition des relations

Les relations vous permettent de lier des champs entre différents schémas de formulaire (par exemple, un sous-formulaire qui dépend d’un choix dans le formulaire principal).

1. Cliquez sur le bouton **Relations**.
2. Dans la boîte de dialogue, ajoutez, modifiez ou supprimez des connexions entre les schémas.

![Form relationships (dependencies) editor dialog](../imgs/forms/edit-form-schema-relationships.png)

!!! tip "Les relations ne sont disponibles que lors de la modification d’un schéma existant, et non lors de la création initiale."

## Enregistrement et importation

- **Enregistrer** – stocke toutes les modifications. Le bouton est désactivé si le formulaire est invalide ou en cours d’enregistrement.
- **Importer** – ouvre un sélecteur de fichier pour charger un schéma de formulaire à partir d’un fichier JSON ou CSV. Utilisez cette option pour réutiliser une structure de schéma d’un autre projet.

## Le constructeur de formulaire

Sous les attributs, la zone **Constructeur de formulaire** vous permet de faire glisser, déposer et configurer des champs individuels (questions, sections, etc.). Les modifications sont immédiatement reflétées dans l’aperçu à droite du constructeur.