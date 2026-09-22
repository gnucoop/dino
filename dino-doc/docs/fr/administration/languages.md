---
title: Gestion des langues
description: Comment gérer les traductions de l'application, notamment l'ajout de langues, la modification du texte et l'exportation de fichiers.
---

# Gestion des langues

La page **Langues** permet aux administrateurs de gérer l'ensemble du texte traduit utilisé dans Dino. Vous pouvez y parcourir, modifier et ajouter des traductions, gérer les langues disponibles et exporter les fichiers de traduction à des fins de sauvegarde ou de modification.

![Main view of the Languages page](../imgs/administration/languages.png)

!!! warning "Accès administrateur uniquement"
    Cette section n'est visible que par les utilisateurs ayant le rôle Administrateur. Si vous ne la voyez pas dans la navigation, contactez votre administrateur système.

---

## Parcourir les traductions

La vue principale affiche une liste de toutes les entrées de traduction. Chaque entrée présente sa **clé** — l'identifiant interne utilisé par l'application — et, lorsqu'une langue est sélectionnée, le texte traduit correspondant.

Un indicateur de chargement s'affiche pendant la récupération des données de traduction.

### Filtrer la liste

Deux contrôles situés en haut de la page vous permettent de restreindre les entrées affichées :

- **Recherche par mot-clé** — saisissez un mot pour filtrer les entrées dont la clé ou la traduction contient ce texte. La liste se met à jour au fur et à mesure de la saisie.
- **Sélecteur de langue** — une rangée de boutons affiche **Clé** ainsi qu'un bouton pour chaque langue disponible. Cliquez sur le nom d'une langue pour afficher ses traductions en regard de chaque clé. Les entrées dépourvues de traduction pour la langue sélectionnée sont affichées sous la forme *(Aucune traduction)*.

---

## Modifier une entrée de traduction

1. Cliquez sur n'importe quelle entrée de la liste pour ouvrir la boîte de dialogue **Modifier la traduction**.
2. La boîte de dialogue affiche la **clé** et un champ de texte pour chaque langue disponible.
3. Mettez à jour les traductions selon vos besoins.
4. Cliquez sur **Enregistrer** pour appliquer vos modifications, ou sur **Annuler** pour fermer sans enregistrer.

Vous pouvez également supprimer définitivement une entrée individuelle depuis cette boîte de dialogue en cliquant sur le bouton **Supprimer**. Cette action supprime la clé de traduction et toutes les traductions qui lui sont associées.

!!! warning
    La suppression d'une entrée de traduction est définitive. La clé et toutes ses valeurs linguistiques seront supprimées.

---

## Ajouter une nouvelle entrée de traduction

Utilisez cette option lorsque vous devez ajouter une clé de traduction qui n'existe pas encore dans le système.

1. Cliquez sur le bouton **+ Traduction** dans la barre d'outils.
2. La boîte de dialogue **Ajouter une traduction** s'ouvre. Elle contient un champ de texte pour chaque langue actuellement active.
3. Saisissez le texte de traduction pour chaque langue selon vos besoins.
4. Cliquez sur **Enregistrer** pour ajouter la nouvelle entrée, ou sur **Annuler** pour abandonner.

Un message de confirmation apparaît brièvement une fois l'entrée enregistrée.

---

## Gérer les langues

Utilisez cette section pour ajouter une nouvelle langue, mettre à jour les traductions d'une langue existante ou supprimer un ensemble de traductions personnalisées.

1. Cliquez sur le bouton **Langue** dans la barre d'outils.
2. La boîte de dialogue **Paramètres de langue** s'ouvre. Elle affiche la liste des langues disponibles et propose les actions suivantes :
   - **Bouton +** pour ajouter une nouvelle langue.
   - Cliquez sur le nom d'une langue dans la liste pour la sélectionner et afficher un aperçu de ses traductions.
   - **Mettre à jour la traduction** (avec une langue sélectionnée) pour importer un nouveau fichier JSON.
   - **Supprimer la traduction personnalisée** pour supprimer les données de traduction personnalisées de la langue sélectionnée.

### Ajouter une nouvelle langue

1. Cliquez sur le **bouton +** en haut de la boîte de dialogue.
2. Un formulaire apparaît et vous demande un **libellé de langue** (le nom qui apparaîtra dans l'interface, par exemple « French » ou « fr »).
3. Vous pouvez éventuellement importer un **fichier de traduction JSON** en cliquant sur **Ajouter un JSON** et en sélectionnant un fichier sur votre appareil. Le contenu du fichier sera prévisualisé avant l'enregistrement.
4. Cliquez sur **Enregistrer** pour ajouter la langue, ou sur **Annuler** pour abandonner.

### Consulter une langue existante

Cliquez sur le bouton d'une langue pour la sélectionner. La boîte de dialogue affiche un aperçu de toutes les clés de traduction et de leurs valeurs actuellement stockées pour cette langue.

### Mettre à jour les traductions d'une langue

Avec une langue sélectionnée, cliquez sur **Mettre à jour la traduction** pour importer un nouveau fichier JSON. La boîte de dialogue prévisualise les modifications — clés ajoutées et clés modifiées — avant l'enregistrement.

1. Cliquez sur **Mettre à jour la traduction** et sélectionnez un fichier JSON sur votre appareil.
2. Examinez l'aperçu présentant les lignes ajoutées et modifiées.
3. Cliquez sur **Enregistrer** pour appliquer la mise à jour, ou sur **Annuler** pour abandonner.

### Supprimer une traduction personnalisée

Avec une langue sélectionnée, cliquez sur **Supprimer la traduction personnalisée** pour supprimer les données de traduction personnalisées de cette langue.

!!! warning
    Cette action supprime les traductions personnalisées de la langue sélectionnée. La langue elle-même peut rester dans le système, mais son contenu personnalisé sera perdu.

---

## Exporter les traductions

Vous pouvez télécharger les données de traduction de n'importe quelle langue sous forme de fichier JSON.

1. Cliquez sur le bouton **Exporter** (icône de téléchargement) dans la barre d'outils.
2. La boîte de dialogue **Exporter** s'ouvre et affiche la liste des langues disponibles.
3. Cliquez sur le nom de la langue que vous souhaitez exporter. Un aperçu de ses données de traduction apparaît à droite.
4. Cliquez sur **Télécharger** pour enregistrer le fichier sur votre appareil.