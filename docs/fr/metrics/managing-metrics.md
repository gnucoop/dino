---
title: Gestion des métriques
description: Comment parcourir, créer, modifier, visualiser, importer et supprimer des entrées de métriques (domaines thématiques, cas, lieux, organisations, projets) dans Dino.
---

# Gestion des métriques

Dans Dino, vous pouvez gérer différents types de données structurées, appelées métriques. Celles-ci incluent les Domaines Thématiques, les Cas, les Lieux, les Projets et les Organisations. Vous accédez à chaque type depuis la navigation principale. Chaque type de métrique dispose d'une page de gestion dédiée avec une mise en page cohérente pour visualiser et gérer ses entrées.

![Gestion des métriques](../imgs/metrics/managing-metrics.png)

!!! note "Autorisation requise"
    La gestion des valeurs de métriques nécessite des autorisations spécifiques. Si vous ne voyez pas les options de création, modification ou suppression, contactez votre administrateur.

---

## Parcourir la liste

La page principale affiche une liste de toutes les entrées pour le type de métrique sélectionné. Vous pouvez :

*   **Rechercher et filtrer** : Utilisez la barre de recherche au-dessus de la liste pour trouver des entrées par nom ou d'autres attributs.
*   **Trier** : Cliquez sur les en-têtes de colonnes marqués d'une icône de tri pour réorganiser la liste.
*   **Exporter** : Cliquez sur le bouton **Exporter** dans la barre d'outils pour télécharger la liste actuelle sous forme de fichier.
*   **Sélectionner ou développer** : Cliquez n'importe où sur une ligne pour la sélectionner. Cliquez sur l'icône de développement pour voir plus de détails.

---

## Créer une nouvelle entrée

1.  Cliquez sur le bouton **+** (le bouton flottant circulaire en bas à droite de l'écran).
2.  Une boîte de dialogue s'ouvrira avec les champs pour la nouvelle entrée.
3.  Remplissez les informations requises et cliquez sur **Enregistrer**.

---

## Modifier ou visualiser une entrée

Chaque ligne de la liste comporte des icônes d'action sur le côté droit.

1.  Pour visualiser les détails d'une entrée sans la modifier, cliquez sur l'icône **Visualiser (œil)**.
2.  Pour modifier une entrée, cliquez sur l'icône **Modifier (crayon)**.
3.  La même boîte de dialogue d'édition s'ouvre, pré-remplie avec les données actuelles de l'entrée. Effectuez vos modifications et cliquez sur **Enregistrer**.

---

## Supprimer des entrées

Vous pouvez supprimer des entrées individuellement ou en masse.

**Pour supprimer une seule entrée :**
1.  Cliquez sur l'icône **Supprimer (poubelle)** sur la ligne que vous souhaitez retirer.
2.  Une boîte de dialogue de confirmation apparaîtra. Cliquez sur **Confirmer** pour supprimer définitivement l'entrée.

**Pour supprimer plusieurs entrées :**
1.  Sélectionnez les entrées en cochant les cases sur leurs lignes.
2.  Une barre d'outils apparaîtra. Cliquez sur l'action **Supprimer** dans cette barre d'outils.
3.  Confirmez la suppression dans la boîte de dialogue qui apparaît.

---

## Importer des entrées en masse

Vous pouvez ajouter de nombreuses entrées à la fois en les important depuis un fichier.

1.  Cliquez sur le bouton **Importer (téléchargement cloud)**, qui est un bouton flottant en bas à droite de l'écran.
2.  Dans la boîte de dialogue, cliquez sur **Choisir un fichier** et sélectionnez un fichier `.xls`, `.xlsx` ou `.csv` depuis votre appareil.
3.  (Facultatif) Cochez la case **Ne pas importer les métriques si le nom existe** pour éviter de créer des entrées en double.
4.  Cliquez sur **Appliquer** pour démarrer l'importation.
5.  Cliquez sur **Fermer** lorsque le processus est terminé.

---

## Comprendre l'éditeur d'entrée

Lorsque vous créez, modifiez ou visualisez une entrée, une boîte de dialogue s'ouvre avec ses champs. Les champs disponibles dépendent du type de métrique.

### Champs communs
*   **Nom** *(Obligatoire)* : Le nom d'affichage pour cette entrée. Il doit être unique au sein de son type de métrique.
*   **Parent** : Un champ facultatif pour lier cette entrée à un parent, créant ainsi une hiérarchie (par exemple, un sous-projet au sein d'un projet). Commencez à taper pour rechercher et sélectionner un parent.

### Champs spécifiques aux métriques

| Type de métrique | Champs clés (au-delà du Nom et du Parent) |
| :--- | :--- |
| **Domaines Thématiques** | Aucun champ standard supplémentaire. |
| **Cas** | **Code** (lecture seule), **Image** (télécharger ou prendre une photo). |
| **Lieux** | **Coordonnées**. |
| **Organisations** | **Chemin du logo**, **URL du site web**. |
| **Projets** | **Code**, **Secteurs d'intervention**, **Bailleurs de fonds**, **Date de début**, **Date de fin**. |

### Attributs supplémentaires

Sous les champs standard, vous trouverez une section **Attributs supplémentaires**. Ici, vous pouvez attacher des paires clé-valeur personnalisées à une entrée.
*   Cliquez sur **+** pour ajouter une nouvelle ligne d'attribut.
*   Cliquez sur **-** à côté d'un attribut pour le supprimer.
*   Cette section est masquée en mode visualisation si aucun attribut personnalisé n'existe.

### Enregistrer votre travail
Cliquez sur **Enregistrer** pour créer ou mettre à jour l'entrée. Un bref message de confirmation apparaîtra.

!!! warning "Erreurs d'enregistrement"
    Si vous voyez une erreur lors de l'enregistrement, vérifiez que tous les champs obligatoires sont remplis et que le nom de l'entrée n'est pas déjà utilisé. Si le problème persiste, contactez votre administrateur.

!!! warning "Téléchargement d'image hors ligne"
    Si vous enregistrez une entrée avec une image alors que vous êtes hors ligne, l'image ne sera pas téléchargée. Vous devez enregistrer à nouveau l'entrée une fois de retour en ligne pour télécharger le fichier image.