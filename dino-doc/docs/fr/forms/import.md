---
title: Importer des données
description: Apprenez à importer en masse des données structurées dans n'importe quel schéma de formulaire à l'aide d'un fichier CSV ou Excel. L'assistant en deux étapes vous permet de télécharger un fichier, puis de mapper ses colonnes aux champs du formulaire.
---

# Importer des données

La page **Importer des données** vous permet de télécharger en masse des soumissions dans un schéma de formulaire à partir d'un fichier `.xls`, `.xlsx` ou `.csv`. Un assistant en deux étapes vous guide pour télécharger le fichier et mapper les colonnes du fichier aux champs du formulaire.

![Main view of the Import Data page](../imgs/forms/import.png)

## Accéder à la page Importer

1. Accédez à la liste des **Formulaires** et sélectionnez un schéma de formulaire.
2. Depuis la vue des données du formulaire, cliquez sur **Importer** (le bouton de la barre d'outils).

## Étape 1 — Télécharger un fichier

La première étape affiche une zone de glisser-déposer ou un sélecteur de fichiers.

- **Formats acceptés :** `.xls`, `.xlsx`, `.csv`
- **Taille maximale du fichier :** 20 Mo

Pour télécharger :

1. Faites glisser un fichier sur la zone en pointillés **ou** cliquez sur **Choisir un fichier** pour parcourir.
2. Après la sélection, le nom du fichier apparaît dans un jeton avec le nombre de colonnes détectées.
3. (Facultatif) Laissez cochée l'option **Réutiliser les métriques existantes portant le même nom** (valeur par défaut) afin que toute métrique du fichier dont le nom correspond à une métrique déjà présente dans le système soit liée à cette métrique existante au lieu de créer un doublon. Décochez-la pour toujours créer de nouvelles métriques.
4. Cliquez sur **Suivant** (ou sur le libellé de l'étape « 2 · Mapper les champs ») pour continuer.

!!! tip "Formats de fichiers"
    Dino accepte les mêmes types de fichiers que ceux utilisés pour la collecte de données standard. Assurez-vous que les en-têtes de colonnes sont clairs – ils seront utilisés comme suggestions lors du mappage.

!!! note "Métriques identifiées par ID"
    Si une colonne de métrique de votre fichier fournit l'**ID** (UUID) de la métrique, cette ligne est liée à la métrique existante portant cet ID et aucune nouvelle métrique n'est créée. L'ID est prioritaire sur le nom de la métrique, ce qui se produit donc indépendamment de l'option **Réutiliser les métriques existantes portant le même nom** (qui ne s'applique qu'à la correspondance par nom).

## Étape 2 — Mapper les champs

Après le téléchargement, vous voyez un tableau listant toutes les colonnes de votre fichier. Chaque ligne comporte trois colonnes :

- **Colonne du fichier** – l'en-tête original de votre fichier.
- **Champ du formulaire** – un menu déroulant pour sélectionner le champ correspondant.
- **Statut** – indique si la colonne est mappée, ignorée ou en erreur.

### Actions de mappage

- **Sélectionner un champ du formulaire** – ouvrez le menu déroulant d'une colonne et choisissez le champ approprié. Vous pouvez rechercher dans le menu déroulant.
- **Ignorer une colonne** – sélectionnez l'option **— Ignorer cette colonne —** dans le menu déroulant, ou cliquez sur le bouton **Ignorer** dans la colonne de statut. Les colonnes ignorées sont grisées.
- **Restaurer une colonne ignorée** – cliquez sur le bouton **Restaurer** dans la colonne de statut.

### Correspondance automatique

Cliquez sur **Correspondance automatique** pour laisser Dino associer automatiquement les colonnes aux champs du formulaire en fonction de la similitude des noms. C'est un bon point de départ – vérifiez et ajustez les mappages si nécessaire.

!!! tip "La correspondance automatique fonctionne mieux lorsque les en-têtes correspondent exactement aux libellés des champs ou contiennent des mots-clés similaires."

### Répétition

Si un champ de formulaire sélectionné est un champ répétable (par exemple, plusieurs numéros de téléphone), un champ **Répétition** apparaît sous le menu déroulant. Saisissez l'index de répétition (0, 1, 2, …) pour attribuer cette colonne de fichier à une occurrence du groupe répétable.

### Résumé de la barre d'outils

En haut de la zone de mappage, vous pouvez voir trois jetons :

- **Total des colonnes** – nombre de colonnes du fichier.
- **Mappées** – colonnes qui ont été assignées à un champ du formulaire.
- **Ignorées** – colonnes que vous avez choisi d'ignorer.

Utilisez le champ **Rechercher des colonnes** pour filtrer le tableau par nom de colonne du fichier.

## Appliquer l'importation

Lorsque toutes les colonnes souhaitées sont mappées et qu'aucune erreur n'est présente, le bouton **Appliquer l'importation** devient actif. Cliquez dessus pour démarrer l'importation. Pendant le traitement, un indicateur de chargement apparaît. Vous pouvez cliquer sur **Retour** pour revenir à l'étape 1 ou annuler l'importation.

Après une importation réussie, vous êtes redirigé vers la liste des données du formulaire, où les nouvelles soumissions apparaissent.

!!! warning "Mappage en double"
    Si vous mappez le même champ de formulaire à plusieurs colonnes du fichier, une erreur de validation s'affiche et le bouton **Appliquer l'importation** reste désactivé jusqu'à ce que l'erreur soit corrigée.