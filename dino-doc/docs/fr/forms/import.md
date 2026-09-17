---
title: Importer des données
description: Apprenez à importer en masse des données structurées dans tout schéma de formulaire à l’aide d’un fichier CSV ou Excel. L’assistant en deux étapes vous permet de téléverser un fichier, puis de mapper ses colonnes aux champs du formulaire.
---

# Importer des données

La page **Importer des données** vous permet de téléverser en masse des soumissions dans un schéma de formulaire à partir d’un fichier `.xls`, `.xlsx` ou `.csv`. Un assistant en deux étapes vous guide dans le téléversement du fichier et la mise en correspondance des colonnes du fichier avec les champs du formulaire.

![Main view of the Import Data page](../imgs/forms/import.png)

## Accéder à la page Importer des données

1. Accédez à la liste **Formulaires** et sélectionnez un schéma de formulaire.
2. Dans la vue des données du formulaire, cliquez sur **Importer** (le bouton de la barre d’outils).

## Étape 1 — Téléverser le fichier

La première étape affiche une zone de glisser-déposer ou un sélecteur de fichier.

- **Formats acceptés :** `.xls`, `.xlsx`, `.csv`
- **Taille de fichier maximale :** 20 Mo

Pour téléverser :

1. Glissez un fichier sur la zone en pointillés **ou** cliquez sur **Choisir un fichier** pour parcourir vos fichiers.
2. Après la sélection, le nom du fichier apparaît dans une pastille, accompagné du nombre de colonnes détectées.
3. (Facultatif) Laissez l’option **Réutiliser les métriques existantes portant le même nom** cochée (par défaut) afin que toute métrique du fichier dont le nom correspond à une métrique déjà présente dans le système soit liée à cette métrique existante plutôt que d’en créer une copie. Décochez cette option pour toujours créer de nouvelles métriques.
4. Cliquez sur **Suivant** (ou sur le libellé de l’étape « 2 · Mapper les champs ») pour continuer.

!!! tip "Formats de fichiers"
    Dino accepte les mêmes types de fichiers que ceux utilisés pour la collecte de données standard. Assurez-vous que les en-têtes de vos colonnes sont clairs : ils seront utilisés comme suggestions lors de la mise en correspondance.

!!! note "Métriques identifiées par leur ID"
    Si une colonne de métrique dans votre fichier fournit l’**ID** (UUID) de la métrique, cette ligne est liée à la métrique existante portant cet ID et aucune nouvelle métrique n’est créée. L’ID a priorité sur le nom de la métrique, de sorte que cela se produit indépendamment de l’option **Réutiliser les métriques existantes portant le même nom** (qui ne s’applique qu’à la correspondance par nom).

## Étape 2 — Mapper les champs

Après le téléversement, un tableau répertorie toutes les colonnes de votre fichier. Chaque ligne comporte trois colonnes :

- **Colonne du fichier** – l’en-tête d’origine de votre fichier.
- **Champ du formulaire** – une liste déroulante dans laquelle vous sélectionnez le champ de formulaire correspondant.
- **Statut** – indique si la colonne est mappée, ignorée ou en erreur.

### Actions de mise en correspondance

- **Sélectionner un champ de formulaire** – ouvrez la liste déroulante d’une colonne et choisissez le champ approprié. Vous pouvez effectuer une recherche dans la liste déroulante.
- **Ignorer une colonne** – sélectionnez l’option **— Ignorer cette colonne —** dans la liste déroulante, ou cliquez sur le bouton **Ignorer** dans la colonne Statut. Les colonnes ignorées sont grisées.
- **Restaurer une colonne ignorée** – cliquez sur le bouton **Restaurer** dans la colonne Statut.

### Correspondance automatique

Cliquez sur **Correspondance automatique** pour laisser Dino associer automatiquement les colonnes aux champs de formulaire en fonction de la similarité des noms. C’est un bon point de départ – vérifiez et ajustez les correspondances si nécessaire.

!!! tip "La correspondance automatique fonctionne mieux avec des en-têtes qui correspondent exactement aux libellés des champs ou qui contiennent des mots-clés similaires."

### Répétition

Si le champ de formulaire sélectionné est un champ répétable (par exemple, plusieurs numéros de téléphone), un champ **Répétition** apparaît sous la liste déroulante. Saisissez l’index de répétition (0, 1, 2, …) pour affecter cette colonne de fichier à une occurrence du groupe répétable.

### Résumé de la barre d’outils

En haut de la zone de mise en correspondance, vous pouvez voir trois pastilles :

- **Total des colonnes** – nombre de colonnes du fichier.
- **Mappées** – colonnes qui ont été affectées à un champ de formulaire.
- **Ignorées** – colonnes que vous avez choisi d’ignorer.

Utilisez le champ **Rechercher des colonnes** pour filtrer le tableau par nom de colonne du fichier.

## Appliquer l’importation

Lorsque toutes les colonnes souhaitées sont mappées et qu’aucune erreur n’existe, le bouton **Appliquer l’importation** devient actif. Cliquez dessus pour lancer l’importation. Pendant le traitement, un indicateur de chargement apparaît. Vous pouvez cliquer sur **Retour** pour revenir à l’étape 1 ou annuler l’importation.

Après une importation réussie, vous revenez à la liste des données du formulaire, où les nouvelles soumissions apparaissent.

!!! warning "Correspondance en double"
    Si vous mappez le même champ de formulaire à plusieurs colonnes du fichier, une erreur de validation s’affiche et le bouton **Appliquer l’importation** reste désactivé tant que le problème n’est pas corrigé.