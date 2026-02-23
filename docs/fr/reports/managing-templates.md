---
title: Gestion des schémas de rapport
description: Comment créer et modifier des schémas de rapport dans Dino, y compris les champs, les métriques obligatoires, l'importation XLS et l'aperçu en direct.
---

# Gestion des schémas de rapport

Les schémas de rapport définissent la structure et la mise en page des rapports générés. Les administrateurs et les utilisateurs disposant des autorisations appropriées peuvent créer de nouveaux schémas et modifier les schémas existants.

![Gestion des schémas de rapport](../imgs/reports/managing-templates.png)

!!! note "Autorisation requise"
    La gestion des schémas de rapport nécessite des autorisations spécifiques. Si vous ne voyez pas les options de création ou d'édition, contactez votre administrateur.

---

## Accéder à la gestion des schémas

Depuis le hub Rapports, naviguez jusqu'au schéma que vous souhaitez modifier et cliquez sur son action **éditer**, ou utilisez la navigation pour accéder à l'option **Créer** pour un nouveau schéma.

---

## Paramètres du schéma

Remplissez les champs suivants pour configurer le schéma :

- **Nom du rapport** — un identifiant interne unique pour ce schéma. Une erreur apparaîtra si le nom est déjà utilisé.
- **Libellé du rapport** — le nom affiché aux utilisateurs dans l'interface.
- **Jeu d'icônes** — choisissez entre *Par défaut* (icônes standard) et *Humanitaire* (icônes spécifiques aux contextes humanitaires).
- **Identifiant de l'icône** — tapez pour rechercher et sélectionner l'icône qui représente ce schéma.
- **Métriques obligatoires** — sélectionnez un ou plusieurs types de métriques (comme projet, localisation ou organisation) qui doivent être fournis lors de la génération d'un rapport à partir de ce schéma.

---

## Schémas de formulaire associés

Sous les champs de paramètres, une section en lecture seule liste les schémas de formulaire liés à ce schéma de rapport. Ceux-ci sont définis par le système et ne peuvent pas être modifiés depuis cet écran.

---

## Aperçu du rapport

Un aperçu en direct de la mise en page du rapport est affiché sur le côté droit de l'écran. L'aperçu se met à jour au fur et à mesure que vous modifiez la structure du schéma.

---

## Importer une structure de rapport

Si vous disposez d'une définition de rapport existante au format XLS, vous pouvez l'importer au lieu de construire la structure manuellement.

1. Cliquez sur le bouton **Importer**.
2. Sélectionnez votre fichier XLS depuis votre appareil.
3. Examinez la structure importée dans l'éditeur.
4. Apportez les ajustements nécessaires, puis enregistrez.

---

## Enregistrer le schéma

Cliquez sur **Enregistrer** pour sauvegarder le schéma. Un message de confirmation apparaîtra brièvement en bas de l'écran. Après l'enregistrement, vous serez redirigé vers le hub Rapports.

!!! warning "Oups ! Une erreur s'est produite lors de l'enregistrement du rapport"
    Si un message d'erreur apparaît lors de l'enregistrement, vérifiez que les champs **Nom du rapport** et **Libellé du rapport** sont remplis et que le Nom du rapport n'est pas déjà utilisé par un autre schéma. Si le problème persiste, contactez votre administrateur.