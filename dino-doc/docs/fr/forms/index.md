---
title: Formulaires
description: Gérez les schémas de formulaire et collectez des données structurées dans Dino.
---

# Formulaires

La page **Formulaires** est votre point de départ pour la collecte de données structurées dans Dino. Vous pouvez y parcourir, créer et gérer des schémas de formulaire, puis consulter et traiter les données recueillies via chaque formulaire.

![Vue principale de la page Formulaires](../imgs/forms/index.png)

La vue principale affiche une **grille de vignettes de schémas de formulaire**. Chaque vignette indique le libellé et l'icône du formulaire. Une vignette marquée d'une icône d'empreinte digitale est unique : une seule soumission avec cet ensemble exact de métriques peut exister. Au survol d'une vignette, des boutons d'action apparaissent :

- **Modifier le schéma du formulaire** – Modifiez la structure du formulaire (champs, validation, métriques).
- **Supprimer le schéma du formulaire** – Supprimez le schéma. Dino refuse si le schéma contient encore des données ou si un report l'utilise, et demande une confirmation si d'autres formulaires ou groupes d'utilisateurs y font référence.
- **Partager l'url publique** – Obtenez un lien public permettant des soumissions externes.
- **Afficher la carte** – Ouvrez la vue cartographique des données comportant des informations de localisation.
- **Discuter avec vos données** – Posez des questions sur vos données en langage naturel grâce à [DataChat](datachat.md).

!!! tip
    Les actions disponibles sur une vignette dépendent de vos autorisations. Il est possible que tous les boutons ne soient pas visibles.

Si aucun schéma de formulaire n'existe encore, la page affiche un message vous invitant à en ajouter un. Lorsque l'instance l'active, un champ **Filtre** au-dessus des vignettes permet de les filtrer par nom.

## Créer un schéma de formulaire

1. Cliquez sur le bouton flottant **+** en bas à droite de la page.
2. Concevez votre formulaire sur la page [Modifier le schéma du formulaire](edit-form-schema.md).

## Travailler avec les données

Cliquez sur une vignette de schéma de formulaire pour ouvrir sa **liste de form**. Ce tableau affiche toutes les données recueillies pour ce schéma.

![Liste de form (tableau de données) d'un schéma de formulaire](../imgs/forms/index-list.png)

Au-dessus du tableau, vous pouvez voir combien d'éléments ont été trouvés et naviguer entre les pages. La barre d'outils propose :

- **Ajouter un nouveau formulaire** – Créez une nouvelle soumission.
- **Importer des formulaires** – Importez des données depuis un fichier. Voir [Import Data](import.md).
- **Filtres** – Affinez la liste par plage de dates, statut, utilisateur, métriques, etc. Basculez entre les filtres *Simple* et *Avancé*, ou enregistrez un préréglage de filtre à réutiliser plus tard.
- **Exportation** – Téléchargez les données dans un fichier. Voir [Exportation](#exportation).

À gauche de la barre d'outils, le sélecteur **Données** / **Carte** / **IA** change de vue ; voir [Vues supplémentaires](#vues-supplémentaires).

Une ligne dont les données sont potentiellement incomplètes affiche une icône d'avertissement. Les lignes contenant des fichiers en attente de synchronisation affichent une icône de téléversement dans le cloud.

### Exportation

Utilisez le bouton **Exportation** dans la barre d'outils pour télécharger les données.

![Boîte de dialogue d'exportation pour télécharger les données d'un formulaire](../imgs/forms/index-export.png)

La boîte de dialogue **Exporter les données** vous permet de choisir :

1) Les formulaires à exporter.
    1) *Éléments de la page*. Uniquement les formulaires affichés sur la page courante de la liste (par défaut).
    2) *Avec les filtres actifs (N)*. Tous les formulaires correspondant aux filtres que vous avez appliqués. Lorsqu'aucun filtre n'est actif, cette option affiche *Ajouter des filtres* : elle ferme la boîte de dialogue pour vous permettre d'en définir.
    3) *Tous les éléments*. Tous les formulaires, sans filtre ni pagination. Sur un formulaire volumineux, cela peut ralentir l'appareil.
2) Le format.
    1) *csv*. Chaque formulaire exporté correspond à une ligne, et chaque champ à une colonne.
    2) *xlsx*. Idem, au format Excel.
    3) *splitted xlsx*. Format Excel, avec une feuille par slide.
3) Dans le menu **Champs et formats** :
    1) *Sélectionner tous les champs du formulaire*. Exporte tous les champs du formulaire.
    2) *Libellés des valeurs*. Pour les champs à valeurs prédéfinies (choix unique ou multiple), exporte le libellé affiché plutôt que le code interne.
    3) *Format des valeurs*, parmi :

        - *Par défaut*.
        - *Format d'analyse de données*. Les slides répétitives et les champs à choix multiple sont exportés sur plusieurs lignes, une répétition et un choix par ligne ; les autres champs sont répétés sur chaque ligne. Une colonne supplémentaire, *conta*, vaut 1 sur la première ligne de chaque formulaire et 0 sur les lignes supplémentaires générées pour le même formulaire, de sorte que la somme de *conta* compte les formulaires.
        - *Colonnes séparées*. Chaque option d'un champ à choix multiple dispose de sa propre colonne, avec 1 ou 0.
4) Les champs à exporter. La liste **Sections** à gauche affiche chaque section avec ses champs sélectionnés et son total. Pour la section active, vous pouvez rechercher un champ, utiliser **Tout sélectionner** / **Désélectionner**, ou cocher des champs individuellement. Le pied de page indique combien de champs sont sélectionnés ; cliquez sur **Exportation** pour télécharger.

Certaines colonnes sont toujours exportées et ne peuvent pas être désélectionnées :

- Form ID
- Creation date
- Update date
- DINO user data (ID and full name)
- Metrics data (id, name, etc...)
- Form status (id, name, label, level, color), when the form has statuses
- Dinoinvalid

### Actions sur les lignes

Survolez une ligne pour faire apparaître les icônes **Voir** et **Modifier**. Cliquez sur une ligne pour la sélectionner : la barre d'actions au-dessus du tableau affiche alors toutes les actions disponibles (voir, modifier, supprimer, imprimer en PDF, télécharger en DOCX, imprimer un badge). Les actions disponibles dépendent de vos autorisations et de la configuration du formulaire.

### Créer une nouvelle soumission

1. Ouvrez la liste de form du schéma de formulaire souhaité.
2. Cliquez sur **Ajouter un nouveau formulaire** dans la barre d'outils.
3. Remplissez le formulaire vierge et enregistrez-le. Voir [Edit Form](edit-form.md).

![Formulaire vierge ouvert pour soumettre une nouvelle entrée](../imgs/forms/index-create.png)

La nouvelle soumission apparaît dans la liste.

### Opérations groupées

Sélectionnez une ou plusieurs soumissions à l'aide des cases à cocher pour faire apparaître les actions groupées. Vous pouvez **supprimer** les soumissions sélectionnées ou les **Modifier** ensemble, en appliquant la même valeur de champ à toutes.

!!! warning
    La suppression d'un schéma de formulaire ou de ses données est irréversible. Soyez prudent lorsque vous utilisez les actions de suppression.

## Vues supplémentaires

Changez de vue avec les boutons **Données** / **Carte** / **IA** à gauche de la barre d'outils de la liste de form, ou depuis les boutons d'une vignette de schéma de formulaire. Les filtres que vous avez appliqués sont conservés.

- **Carte** – Consultez les données comportant des coordonnées géographiques sur une carte interactive. Elle n'est disponible que lorsque le schéma collecte des localisations. Pour en savoir plus, voir [Forms Map](forms-map.md).
- **DataChat** (la vue **IA**) – Interrogez les données de votre formulaire en langage naturel. Voir [DataChat](datachat.md) pour plus de détails.

!!! warning
    DataChat peut consommer des crédits. Vérifiez le solde de crédits de votre compte avant de l'utiliser.