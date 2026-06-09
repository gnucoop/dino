---
title: Modifier une soumission de formulaire
description: Apprenez à modifier une soumission de formulaire existante dans Dino.
---

# Modifier une soumission de formulaire

L'écran Modifier le formulaire vous permet de modifier une soumission de formulaire existante. Vous pouvez mettre à jour des données, ajouter de nouvelles informations ou enregistrer vos modifications en tant que brouillon pour les terminer plus tard.

Lorsque vous ouvrez une soumission de formulaire pour la modifier, vous voyez la même interface de formulaire que celle utilisée pour la saisie, mais avec toutes les données précédemment enregistrées déjà remplies.

![Main view of the Edit Form page](../imgs/forms/edit-form.png)

## Comment modifier une soumission

1.  Accédez à la liste des soumissions pour votre formulaire.
2.  Localisez la soumission spécifique que vous souhaitez modifier.
3.  Cliquez sur le bouton **Modifier** (généralement représenté par une icône de crayon) pour cette soumission. Cela ouvre le formulaire en mode édition.
4.  Effectuez les modifications souhaitées dans n'importe quel champ du formulaire.
5.  Choisissez une action en bas du formulaire :
    *   **Enregistrer le brouillon** : enregistre vos modifications actuelles sans soumettre le formulaire. Vous pouvez y revenir et le modifier à nouveau plus tard.
    *   **Soumettre** : enregistre toutes les modifications et soumet les données mises à jour du formulaire.

!!! tip "Suivi des modifications"
    Dino enregistre automatiquement les modifications que vous apportez entre la soumission originale et la version modifiée. Cela crée un historique de qui a changé quoi et quand.

## Fonctionnalités disponibles

Lors de la modification, vous avez accès aux mêmes fonctionnalités que lors de la création d'une nouvelle soumission :

*   **Métriques optionnelles** : certains formulaires peuvent avoir des sections ou des questions facultatives que vous pouvez choisir de remplir.
*   **Téléchargement de fichiers** : joignez de nouveaux fichiers ou remplacez des fichiers existants si cette fonctionnalité est activée pour votre formulaire.
*   **Champs secondaires** : pour certains points de données, des champs associés supplémentaires peuvent être affichés pour une saisie plus détaillée.
*   **Relations de formulaire (dépendances)** : si le formulaire comporte des champs dépendants, vous pouvez voir des invites supplémentaires basées sur les réponses précédentes. Les dépendances sont définies lors de la création du schéma de formulaire.

![Form relationships (dependencies) editor dialog](../imgs/forms/edit-form-schema-relationships.png)

!!! warning "Intégrité des données"
    Soyez prudent lors de la modification de données critiques. D'autres rapports ou analyses peuvent dépendre des valeurs soumises initialement. Demandez-vous s'il ne serait pas plus approprié de créer une nouvelle soumission corrigée plutôt que d'en modifier une ancienne.

## Comprendre la structure du formulaire

Le formulaire que vous voyez lors de la modification est basé sur un **schéma de formulaire** — le plan sous-jacent qui définit tous les champs, sections et règles. Vous pouvez afficher un aperçu compilé du schéma de formulaire depuis le concepteur.

![Compiled form view after clicking View the Form](../imgs/forms/edit-form-view.png)

Le schéma lui-même peut être modifié séparément. Si vous devez modifier la structure d'un formulaire (ajouter ou supprimer des champs, ajuster la validation), consultez [Modifier le schéma de formulaire](edit-form-schema.md).

![Main view of the Edit Form Schema page](../imgs/forms/edit-form-schema.png)

## Actions connexes

*   Pour comprendre la structure du formulaire lui-même, consultez [Modifier le schéma de formulaire](edit-form-schema.md).
*   Pour créer une toute nouvelle soumission, vous commencez généralement depuis la page principale [Formulaires](index.md).
*   Pour parcourir vos formulaires et soumissions sur une carte, consultez [Carte des formulaires](forms-map.md).