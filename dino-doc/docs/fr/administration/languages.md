---
title: Gestion des langues
description: Comment gérer les traductions de Dino — trouver une Clé de traduction, la traduire dans toutes les langues, ajouter ou renommer des clés, et importer ou exporter un fichier de langue.
---

# Gestion des langues

La page **Langues** permet aux administrateurs de gérer tout le texte traduit utilisé dans Dino. Chaque texte possède une **Clé de traduction** — généralement le texte anglais lui-même — et une valeur pour chaque langue disponible. Vous pouvez y trouver une clé, la traduire, ajouter de nouvelles clés et importer ou exporter le dictionnaire complet d'une langue.

![Vue principale de la page Langues](../imgs/administration/languages.png)

L'en-tête de la page affiche un résumé de votre couverture de traduction : le nombre total de Clés de traduction et le pourcentage de complétion. Sous l'en-tête, la page est divisée en deux zones — la liste des Clés de traduction à gauche et le détail de la clé sélectionnée à droite.

!!! warning "Accès réservé aux administrateurs"
    Cette zone n'est visible que par les utilisateurs ayant le rôle Administrateur. Si vous ne la voyez pas dans la navigation, contactez votre administrateur système.

---

## Parcourir les Clés de traduction

Chaque ligne de la liste affiche une clé et, dans un anneau sur sa gauche, le pourcentage de langues qui la traduisent déjà. Si le texte contient des espaces réservés dynamiques, comme `{{language}}`, ils sont listés sous la clé.

### Rechercher et filtrer la liste

- Saisissez du texte dans le champ **Rechercher une clé ou un texte…** pour trouver une clé. La recherche porte à la fois sur les clés et sur leurs traductions.
- Utilisez les deux boutons à côté du champ de recherche pour choisir ce qui est listé :
    - **Toutes** — toutes les Clés de traduction.
    - **À traduire** — uniquement les clés encore manquantes dans au moins une langue.

La recherche et le filtre fonctionnent ensemble : avec **À traduire** sélectionné, la recherche ne porte que sur les clés restant à traduire.

---

## Traduire une clé

1. Cliquez sur une clé dans la liste. Son détail s'ouvre à droite.
2. Le détail affiche une carte par langue, marquée **Traduit** ou **Manquant**, avec une zone de texte contenant sa valeur.
3. Saisissez la traduction dans la zone de chaque langue que vous souhaitez compléter.

Il n'y a pas de bouton d'enregistrement : chaque modification est enregistrée automatiquement un instant après que vous avez arrêté de taper. L'en-tête du détail affiche **Enregistrement…** pendant l'enregistrement et **Enregistré** une fois terminé ; en cas de problème, il affiche **Échec de l'enregistrement**. Une barre de progression à côté indique combien de langues traduisent la clé.

!!! tip "Espaces réservés"
    Conservez les espaces réservés de la clé, comme `{{language}}`, inchangés dans chaque traduction : Dino les remplace par la valeur réelle lorsqu'il affiche le texte. Ils sont mis en évidence dans la clé affichée en haut du détail.

### Renommer ou retirer une clé

En haut du détail, à côté de la clé :

- **Renommer la clé** (icône crayon) — transforme la clé en champ modifiable. Saisissez la nouvelle clé et appuyez sur **Entrée**, ou cliquez en dehors du champ, pour l'appliquer ; appuyez sur **Échap** pour annuler.
- **Retirer** (icône corbeille) — supprime la clé et toutes ses traductions, après confirmation avec **Oui**.

!!! warning "Les clés sont utilisées par l'application"
    Dino recherche les textes par leur clé. Renommer ou retirer une clé utilisée par l'application fait apparaître ce texte comme non traduit ; ne modifiez donc les clés que lorsque vous savez où elles sont utilisées.

---

## Ajouter une nouvelle Clé de traduction

1. Cliquez sur **Traduction** (icône plus) dans l'en-tête de la page. La boîte de dialogue **Nouvelle traduction** s'ouvre.
2. Saisissez la **Clé**. Elle est obligatoire. Utilisez `{{` et `}}` autour d'un nom, comme `{{name}}`, pour les espaces réservés dynamiques.
3. Remplissez éventuellement les traductions : la boîte de dialogue liste toutes les langues disponibles, et un compteur indique combien vous en avez remplies. Les langues que vous laissez vides restent marquées comme manquantes, et vous pourrez les compléter plus tard depuis le détail.
4. Cliquez sur **Enregistrer la traduction**, ou sur **Annuler** pour fermer la boîte de dialogue sans ajouter la clé.

---

## Travailler avec une langue entière

Cliquez sur **Toutes les langues** dans l'en-tête de la page pour ouvrir la boîte de dialogue qui affiche le dictionnaire complet de chaque langue.

1. À gauche, choisissez une langue dans **Langues**. Utilisez **Rechercher une langue…** pour la trouver dans une longue liste. Un point coloré à côté de chaque langue indique son degré de complétion ; survolez une langue pour voir combien de valeurs elle possède.
2. À droite, la boîte de dialogue affiche un aperçu en lecture seule de la langue sélectionnée : chaque clé avec sa valeur, ou *Manquant*. Utilisez **Rechercher dans le fichier…** pour chercher une clé ou une valeur. Les traductions individuelles se modifient depuis la page principale, pas ici.
3. Le pied de page indique combien de valeurs sont présentes sur le total.

### Exporter une langue

Cliquez sur **Exportation** suivi du code de la langue (par exemple **Exportation ITA**). Dino télécharge un fichier JSON nommé d'après la langue, comme `ita.json`, contenant les clés que la langue traduit. Les clés encore manquantes sont omises.

### Importer un fichier de langue

1. Sélectionnez la langue que vous souhaitez mettre à jour.
2. Cliquez sur **Importer un fichier** et choisissez un fichier `.json`. La boîte de dialogue le vérifie et affiche **JSON valide** ou **JSON non valide** ; un fichier valide est affiché dans l'aperçu avec son nom et son nombre de lignes.
3. Cliquez sur **Enregistrer** pour le stocker. **Enregistrer** n'est activé qu'après l'importation d'un fichier.

Les valeurs du fichier remplacent les valeurs existantes ayant la même clé ; les clés absentes du fichier conservent leurs valeurs actuelles. Rien n'est stocké tant que vous n'avez pas cliqué sur **Enregistrer** : **Fermer** abandonne le fichier importé.

!!! tip "Traduire en dehors de Dino"
    Pour faire traduire une langue par une personne n'ayant pas accès à Dino, exportez-la, faites compléter le fichier JSON, puis importez-le à nouveau dans la même langue.

---

## Pages associées

- [Interface](../interface/index.md) — comment changer la langue dans laquelle vous utilisez Dino.
- [Liste des utilisateurs](users-list.md) — gérer les utilisateurs qui peuvent accéder à cette page.