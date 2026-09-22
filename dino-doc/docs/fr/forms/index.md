---
title: Formulaires
description: Gérez les schémas de formulaire et collectez des soumissions de données structurées dans Dino.
---

# Formulaires

La page **Formulaires** est votre point de départ pour la collecte de données structurées dans Dino. Vous pouvez y parcourir, créer et gérer des schémas de formulaire, puis consulter et traiter les soumissions recueillies via chaque formulaire.

![Vue principale de la page Formulaires](../imgs/forms/index.png)

La vue principale affiche une **grille de vignettes de schémas de formulaire**. Chaque vignette présente le libellé et l'icône du formulaire. Le survol d'une vignette fait apparaître des boutons d'action :

- **Modifier le schéma** – Modifiez la structure du formulaire (champs, validation, mesures).
- **Supprimer le schéma** – Supprimez le schéma de formulaire (ainsi que toutes ses soumissions).
- **Partager l'URL** – Obtenez un lien public pour autoriser les soumissions externes.
- **Voir la carte** – Ouvrez la vue cartographique des soumissions contenant des données de localisation.
- **Discuter avec vos données** – Utilisez la fonctionnalité [DataChat](datachat.md) pour poser des questions sur les soumissions en langage naturel.

!!! tip
    Les actions disponibles sur une vignette dépendent de vos autorisations. Il est possible que certains boutons ne s'affichent pas.

Pour créer un nouveau schéma de formulaire, cliquez sur le bouton flottant **+** en bas à droite. Vous serez redirigé vers la page [Modifier le schéma de formulaire](edit-form-schema.md) pour concevoir votre formulaire.

## Travailler avec les soumissions

Cliquez sur une vignette de schéma de formulaire pour accéder à sa **liste de soumissions**. Ce tableau présente toutes les entrées de données collectées pour ce schéma.

![Liste des soumissions (tableau de données) d'un schéma de formulaire](../imgs/forms/index-list.png)

La liste comporte une **barre de filtres** qui vous permet de rechercher par mot-clé, plage de dates, mesures, statut, utilisation

### Export

Utilisez le bouton **export** pour télécharger les soumissions au format CSV ou XLSX.

![Boîte de dialogue d'export pour télécharger les soumissions de formulaire](../imgs/forms/index-export.png)

La boîte de dialogue d'export permet de définir plusieurs paramètres importants pour l'export :

1) Combien de formulaires exporter.   
   1) *Formulaires de la page*. Exporte uniquement les formulaires affichés sur la page précédente, éventuellement filtrés et répartis en pages.   
   2) *Ajouter des filtres* ou *Tous les éléments/1filtres*. Si vous avez déjà appliqué un filtre à votre liste de formulaires, seuls les formulaires filtrés peuvent être exportés (deuxième option). Si vous n'avez encore appliqué aucun filtre, la première option s'affiche et vous permet d'ajouter d'autres filtres.   
   3) *Tous les formulaires*. Tous les formulaires, sans filtrage ni pagination.   
2) Format.   
    1) *CSV*. Les données seront exportées dans un fichier CSV. Chaque formulaire extrait constituera une ligne du fichier, les champs correspondant aux colonnes.   
    2) *XLSX*. Export au format Excel.  
    3) *XLSX séparé*. Export au format Excel où chaque page correspond à une feuille différente.   
3) Options des champs  
    1) *Sélectionner tous les champs du formulaire*. Permet d'exporter tous les champs du formulaire.  
    2) *Valeurs des libellés*. Pour les champs dont les valeurs sont préfixées (champs à sélection unique ou multiple), la valeur exportée est la valeur affichée, et non le code interne utilisé pour représenter cette valeur.   
    3) *Format d'analyse de données*. Les formulaires contenant des pages répétitives et des choix multiples sont exportés sur plusieurs lignes, chaque ligne ne contenant qu'une seule page répétitive et un seul choix multiple, les autres champs restant identiques. Une colonne supplémentaire, appelée *conta*, est ajoutée. Cette colonne prend la valeur 1 uniquement dans la première ligne du groupe de répétition, et 0 dans les autres.  
    4) *Colonnes séparées*. Les choix multiples sont exportés sous forme de plusieurs colonnes. 
4) *Sélection de la page*. Permet d'afficher la liste des champs de chaque page, si vous souhaitez n'exporter que certains champs et non la totalité.   
5) *Sélection des champs*. Vous pouvez sélectionner/désélectionner chaque champ individuellement.   

Certaines colonnes du fichier exporté ne peuvent pas être désélectionnées. Il s'agit de :

- Form ID
- Date de création
- Date de mise à jour
- Données utilisateur DINO (nom et ID)
- Données de mesures (id, nom, etc...)
- Dinoinvalid

### Actions sur les lignes

Cliquez sur une ligne pour développer ses détails, ou utilisez les actions de ligne (consulter, modifier, supprimer, imprimer en PDF, télécharger au format DOCX, imprimer un badge). Les actions disponibles dépendent de vos autorisations et de la configuration du formulaire.

### Créer une nouvelle soumission

Cliquez sur le bouton flottant **+** de la page de liste pour ouvrir un formulaire vierge et saisir des données.

![Formulaire vierge ouvert pour soumettre une nouvelle entrée de données](../imgs/forms/index-create.png)

Remplissez les champs et validez. La nouvelle soumission apparaîtra dans la liste.

### Opérations groupées

Sélectionnez plusieurs soumissions à l'aide des cases à cocher pour effectuer une **suppression** ou une **modification** groupée (modifier la même valeur de champ dans toutes les entrées sélectionnées).

## Autres vues

- **Carte** – Consultez les soumissions comportant des coordonnées géographiques sur une carte interactive. Pour en savoir plus, voir [Carte des formulaires](forms-map.md).
- **DataChat** – Interrogez les données de vos formulaires en langage naturel. Voir [DataChat](datachat.md) pour plus de détails.

!!! warning
    La fonctionnalité DataChat peut consommer des crédits. Vérifiez le solde de crédits de votre compte avant de l'utiliser.