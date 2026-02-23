---
title: Consultation et gestion des rapports
description: Comment parcourir, filtrer, consulter, exporter, marquer comme favori et supprimer des rapports dans Dino.
---

# Consultation et gestion des rapports

Cette page liste tous les rapports générés à partir d'un schéma de rapport spécifique. Vous pouvez parcourir, rechercher, consulter, exporter, marquer comme favori et supprimer des rapports individuels depuis cette liste centrale.

---

## Parcourir la liste

La liste affiche tous les rapports pour le schéma sélectionné. Chaque ligne représente un rapport.

La liste comprend les colonnes suivantes :

*   **Utilisateur** : La personne qui a créé le rapport.
*   **Nom** : Le titre du rapport.
*   **Statut** : Le statut actuel du rapport.
*   **Collecté depuis / Collecté jusqu'au** : La plage de dates des données incluses dans le rapport.
*   **Date de création** : Quand le rapport a été créé.
*   **Projet, Lieu, Zone, Cas, Organisation** : Ces colonnes n'apparaissent que si les types de métriques correspondants sont actifs dans votre espace de travail.

Utilisez les contrôles de pagination en bas de la liste pour naviguer entre les pages.

---

## Rechercher et filtrer

Utilisez la barre de filtres au-dessus de la liste pour affiner les rapports affichés.

1.  Cliquez sur n'importe quel champ de filtre (comme **Projet** ou **Lieu**) pour sélectionner des valeurs spécifiques.
2.  Vous pouvez combiner plusieurs filtres.
3.  Pour enregistrer votre combinaison de filtres pour une utilisation ultérieure, cliquez sur l'icône du menu de préréglages dans la barre de filtres et sélectionnez **Enregistrer comme préréglage**.
4.  Pour charger un filtre enregistré, ouvrez le menu des préréglages et sélectionnez le nom du préréglage.

---

## Actions sur les rapports

Chaque ligne de rapport possède des icônes d'action sur la droite. Les actions disponibles dépendent de vos autorisations utilisateur.

*   **Voir** (![icône œil](../imgs/reports/eye-icon.png)) : Ouvre le rapport en vue lecture seule.
*   **Ajouter aux favoris** (![icône étoile](../imgs/reports/star-outline-icon.png)) : Marque ce rapport comme favori pour un accès rapide.
*   **Retirer des favoris** (![icône étoile](../imgs/reports/star-filled-icon.png)) : Retire le rapport de votre liste de favoris.
*   **Supprimer** (![icône poubelle](../imgs/reports/delete-icon.png)) : Supprime définitivement le rapport. Vous serez invité à confirmer cette action.

!!! tip "Actions basées sur les permissions"
    Vous ne verrez peut-être pas toutes les actions. Les icônes affichées sont basées sur les autorisations accordées à votre rôle utilisateur.

---

## Ajouter un nouveau rapport

Un bouton flottant **+** est disponible si vous avez l'autorisation de créer de nouveaux rapports pour ce schéma.

1.  Cliquez sur le bouton **+**.
2.  Si le schéma de rapport utilise des fonctionnalités d'IA, une info-bulle indiquera combien de crédits seront utilisés. La création du rapport se poursuivra automatiquement.

!!! warning "Crédits insuffisants"
    Si vous n'avez pas assez de crédits IA, un message d'avertissement s'affichera. Vous devrez ajouter plus de crédits à votre compte avant de pouvoir créer ce rapport.

---

## Consulter un rapport

Pour consulter un rapport, cliquez sur sa ligne dans la liste ou utilisez l'icône d'action **Voir**.

### 1. Sélection des métriques

Si le schéma de rapport est lié à des métriques, vous verrez d'abord une étape de sélection des métriques.

1.  Choisissez des valeurs pour les métriques requises (par exemple, Projet, Lieu).
2.  Ajustez la **Date de début** et la **Date de fin** si nécessaire.
3.  Cliquez sur **Suivant** pour générer et charger le rapport.

### 2. Affichage du rapport

La vue du rapport montre le titre du rapport, la plage de dates, les métriques sélectionnées et le contenu principal du rapport, qui est structuré selon son schéma.

!!! note "Contenu généré par IA"
    Si le rapport inclut du texte généré par IA, vous verrez un indicateur de progression (par exemple, "Génération de l'invite de rapport 1 sur 3") pendant la préparation du contenu. Cela se produit automatiquement.

### 3. Exporter un rapport

Depuis la vue du rapport, vous pouvez l'exporter dans différents formats.

*   **PDF** : Cliquez sur le bouton PDF pour télécharger un fichier PDF.
*   **Excel (XLSX)** : Cliquez sur le bouton Excel pour télécharger une feuille de calcul.
*   **Word (DOCX)** : Cliquez sur le bouton Word pour télécharger un document Word.

!!! warning "Aucun contenu exportable"
    Si vous essayez d'exporter vers Excel et que vous voyez un message indiquant "Aucun widget exportable n'a été trouvé", cela signifie que le rapport ne contient aucune donnée de tableau ou de graphique pouvant être mise dans une feuille de calcul.

---

## Dépannage

### "Aucun formulaire n'a été trouvé pour ce rapport"

!!! warning
    Cette erreur signifie que le rapport n'a pas pu être généré car il n'y a aucune donnée soumise liée à celui-ci. Assurez-vous que des soumissions de formulaires ont été collectées en utilisant le schéma de formulaire connecté à ce rapport avant d'essayer de le consulter.