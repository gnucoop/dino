---
title: Formulaires
description: Gérez les schémas de formulaires et collectez des soumissions de données structurées dans Dino.
---

# Formulaires

La page **Formulaires** est votre point de départ pour la collecte de données structurées dans Dino. Depuis ici, vous pouvez parcourir, créer et gérer les schémas de formulaires, puis consulter et travailler avec les soumissions recueillies via chaque formulaire.

![Main view of the Forms page](../imgs/forms/index.png)

La vue principale affiche une **grille de tuiles de schémas de formulaires**. Chaque tuile affiche le libellé et l'icône du formulaire. Le survol d'une tuile révèle des boutons d'action :

- **Modifier le schéma** – Modifier la structure du formulaire (champs, validation, métriques).
- **Supprimer le schéma** – Supprimer le schéma du formulaire (et toutes ses soumissions).
- **Partager l'URL** – Obtenir un lien public pour autoriser les soumissions externes.
- **Voir la carte** – Ouvrir la vue cartographique pour les soumissions avec données de localisation.
- **Discuter avec vos données** – Utiliser la fonction [DataChat](datachat.md) pour poser des questions en langage naturel sur les soumissions.

!!! tip "Astuce"
    Les actions disponibles sur une tuile dépendent de vos autorisations. Il se peut que vous ne voyiez pas tous les boutons.

Pour créer un nouveau schéma de formulaire, cliquez sur le bouton flottant **+** en bas à droite. Vous serez redirigé vers la page [Modifier le schéma de formulaire](edit-form-schema.md) pour concevoir votre formulaire.

## Travailler avec les soumissions

Cliquez sur une tuile de schéma de formulaire pour accéder à sa **liste de soumissions**. Ce tableau affiche toutes les entrées de données collectées pour ce schéma.

![Submission list (data table) for a form schema](../imgs/forms/index-list.png)

La liste comprend une **barre de filtre** qui vous permet de rechercher par mot-clé, plage de dates, métriques, statut, utilisateur, etc. Vous pouvez également enregistrer des préréglages de filtre pour une réutilisation rapide.

Utilisez le bouton **Exporter** pour télécharger les soumissions au format CSV ou XLSX.

![Export dialog for downloading form submissions](../imgs/forms/index-export.png)

### Actions sur les lignes

Cliquez sur une ligne pour développer ses détails, ou utilisez les actions sur les lignes (afficher, modifier, supprimer, imprimer en PDF, télécharger en DOCX, imprimer un badge). Les actions disponibles dépendent de vos autorisations et de la configuration du formulaire.

### Créer une nouvelle soumission

Cliquez sur le bouton flottant **+** sur la page de liste pour ouvrir un formulaire vierge pour la saisie de données.

![Blank form opened to submit a new data entry](../imgs/forms/index-create.png)

Remplissez les champs et soumettez. La nouvelle soumission apparaîtra dans la liste.

### Opérations groupées

Sélectionnez plusieurs soumissions à l'aide des cases à cocher pour effectuer une **suppression** ou une **modification** groupée (modifier la même valeur de champ dans toutes les entrées sélectionnées).

## Vues supplémentaires

- **Carte** – Visualisez les soumissions avec des coordonnées géographiques sur une carte interactive. En savoir plus dans [Carte des formulaires](forms-map.md).
- **DataChat** – Interrogez vos données de formulaire en langage naturel. Consultez [DataChat](datachat.md) pour plus de détails.

!!! warning "Avertissement"
    La fonction DataChat peut consommer des crédits. Vérifiez le solde de crédits de votre compte avant de l'utiliser.