---
title: Gestion des langues
description: Comment gérer les traductions de l'application, y compris l'ajout de langues, la modification de texte et l'exportation de fichiers.
---

# Gestion des langues

La page **Langues** permet aux administrateurs de gérer tous les textes traduits utilisés dans Dino. À partir de cette page, vous pouvez parcourir, modifier et ajouter des traductions, gérer les langues disponibles et exporter des fichiers de traduction pour sauvegarde ou édition.

![Gestion des langues](../imgs/administration/languages.png)

!!! warning "Accès administrateur uniquement"
    Cette zone n'est visible que pour les utilisateurs ayant le rôle Administrateur. Si vous ne la voyez pas dans la navigation, contactez votre administrateur système.

---

## Parcourir les traductions

La vue principale affiche une liste de toutes les entrées de traduction. Chaque entrée affiche sa **clé** — l'identifiant interne utilisé par l'application — et, lorsqu'une langue est sélectionnée, le texte traduit correspondant.

Un indicateur de chargement est affiché pendant le chargement des données de traduction.

### Filtrer la liste

Deux contrôles en haut de la page vous permettent de réduire les entrées affichées :

- **Recherche par mot-clé** — saisissez un mot pour filtrer les entrées dont la clé ou la traduction contient ce texte. La liste se met à jour au fur et à mesure que vous tapez.
- **Sélecteur de langue** — une rangée de boutons affiche **Clé** et un bouton pour chaque langue disponible. Cliquez sur un nom de langue pour afficher les traductions de cette langue à côté de chaque clé. Les entrées sans traduction pour la langue sélectionnée sont affichées comme *(Pas de traduction)*.

---

## Modifier une entrée de traduction

1. Cliquez sur n'importe quelle entrée de la liste pour ouvrir la boîte de dialogue **Modifier la traduction**.
2. La boîte de dialogue affiche la **clé** et un champ de texte pour chaque langue disponible.
3. Mettez à jour les traductions si nécessaire.
4. Cliquez sur **Enregistrer** pour appliquer vos modifications, ou sur **Annuler** pour fermer sans enregistrer.

Vous pouvez également supprimer définitivement une entrée individuelle depuis cette boîte de dialogue en cliquant sur le bouton **Supprimer**. Cela supprime la clé de traduction et toutes ses traductions associées.

!!! warning
    La suppression d'une entrée de traduction est permanente. La clé et toutes ses valeurs de langue seront supprimées.

---

## Ajouter une nouvelle entrée de traduction

Utilisez cette fonction lorsque vous devez ajouter une clé de traduction qui n'existe pas encore dans le système.

1. Cliquez sur le bouton **+ Traduction** dans la barre d'outils.
2. La boîte de dialogue **Ajouter une traduction** s'ouvrira. Elle contient un champ de texte pour chaque langue actuellement active.
3. Saisissez le texte de traduction pour chaque langue si nécessaire.
4. Cliquez sur **Enregistrer** pour ajouter la nouvelle entrée, ou sur **Annuler** pour annuler.

Un message de confirmation apparaîtra brièvement après l'enregistrement de l'entrée.

---

## Gérer les langues

Utilisez cette fonction pour ajouter une nouvelle langue, mettre à jour les traductions d'une langue existante ou supprimer un ensemble de traductions personnalisées.

1. Cliquez sur le bouton **Langue** dans la barre d'outils.
2. La boîte de dialogue **Paramètres de langue** s'ouvrira. Elle affiche une liste des langues disponibles et propose les actions suivantes :

### Ajouter une nouvelle langue

1. Cliquez sur le bouton **+** en haut de la boîte de dialogue.
2. Un formulaire apparaîtra, demandant un **libellé de langue** (le nom qui apparaîtra dans l'interface, par exemple "Français" ou "fr").
3. Optionnellement, téléversez un **fichier de traduction JSON** en cliquant sur **Ajouter JSON** et en sélectionnant un fichier depuis votre appareil. Le contenu du fichier sera prévisualisé avant l'enregistrement.
4. Cliquez sur **Enregistrer** pour ajouter la langue, ou sur **Annuler** pour annuler.

### Voir une langue existante

Cliquez sur un bouton de nom de langue pour la sélectionner. La boîte de dialogue affichera un aperçu de toutes les clés et valeurs de traduction actuellement stockées pour cette langue.

### Mettre à jour les traductions d'une langue

Avec une langue sélectionnée, cliquez sur **Mettre à jour la traduction** pour téléverser un nouveau fichier JSON. La boîte de dialogue prévisualisera les modifications — nouvelles clés ajoutées et clés modifiées — avant que vous n'enregistriez.

1. Cliquez sur **Mettre à jour la traduction** et sélectionnez un fichier JSON depuis votre appareil.
2. Examinez l'aperçu montrant les lignes ajoutées et modifiées.
3. Cliquez sur **Enregistrer** pour appliquer la mise à jour, ou sur **Annuler** pour annuler.

### Supprimer une traduction personnalisée

Avec une langue sélectionnée, cliquez sur **Supprimer la traduction personnalisée** pour supprimer les données de traduction personnalisées pour cette langue.

!!! warning
    Cela supprime les traductions personnalisées pour la langue sélectionnée. La langue elle-même peut rester dans le système, mais son contenu personnalisé sera perdu.

---

## Exporter les traductions

Vous pouvez télécharger les données de traduction pour n'importe quelle langue sous forme de fichier JSON.

1. Cliquez sur le bouton **Exporter** (icône de téléchargement) dans la barre d'outils.
2. La boîte de dialogue **Exporter** s'ouvrira, affichant une liste des langues disponibles.
3. Cliquez sur le nom de la langue que vous souhaitez exporter. Un aperçu de ses données de traduction apparaîtra sur la droite.
4. Cliquez sur **Télécharger** pour enregistrer le fichier sur votre appareil.