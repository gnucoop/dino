---
title: Gestion des schémas de formulaire
description: Comment créer et modifier des schémas de formulaire dans Dino, y compris le constructeur de formulaires, les statuts, les métriques et les options d'importation.
---

# Gestion des schémas de formulaire

Les schémas de formulaire définissent la structure et les champs utilisés lors de la collecte de données. Les administrateurs et les utilisateurs disposant des autorisations appropriées peuvent créer de nouveaux schémas, modifier les schémas existants et configurer leur comportement.

![Gestion des schémas de formulaire](../imgs/forms/managing-templates.png)

!!! warning "Autorisation requise"
    La gestion des schémas de formulaire nécessite des autorisations spécifiques. Si vous ne voyez pas les options de création ou de modification, contactez votre administrateur.

---

## Accéder à la gestion des schémas

Depuis le hub de collecte de données, naviguez jusqu'au schéma que vous souhaitez modifier et cliquez sur son action **modifier**, ou utilisez la navigation pour accéder à l'option **Créer** pour un nouveau schéma. Les deux chemins ouvrent le même éditeur de schéma.

---

## Paramètres du schéma

En haut de l'éditeur, remplissez les champs suivants avant de concevoir la structure du formulaire :

- **Nom du formulaire** — un identifiant interne unique pour ce schéma. Une erreur apparaîtra si le nom est déjà utilisé.
- **Libellé du formulaire** — le nom affiché aux utilisateurs dans l'interface.
- **Jeu d'icônes** — choisissez entre *Par défaut* (icônes standard) et *Humanitaire* (icônes spécifiques aux contextes humanitaires).
- **Identifiant de l'icône** — tapez pour rechercher et sélectionner l'icône qui représente ce formulaire.
- **Statuts du formulaire** — sélectionnez un ou plusieurs statuts de workflow que les entrées créées avec ce schéma peuvent traverser. Vous pouvez également créer de nouveaux statuts ou modifier les statuts existants en ligne : cliquez sur l'icône **modifier** à côté d'un statut, ou sélectionnez **Créer un nouveau statut** en bas de la liste déroulante.
- **Métriques du formulaire** — sélectionnez les types de métriques (comme projet, localisation ou organisation) auxquels les entrées créées avec ce schéma seront liées.
- **Visibilité** — définissez sur *Privé* (accessible uniquement aux utilisateurs autorisés) ou *Public* (partageable via un lien public).
- **Comportement de l'ensemble des métriques** — *Par défaut* permet plusieurs entrées avec la même combinaison de métriques ; *Unique* empêche les ensembles de métriques en double pour ce formulaire.
- **Générer un rapport** — si défini sur *Oui*, un rapport automatique sera généré et lié à ce schéma lors de son enregistrement. Cette option n'est affichée que si aucun rapport automatique n'existe déjà pour le schéma.

---

## Construction de la structure du formulaire

La partie inférieure de la page contient le constructeur de formulaire, où vous pouvez ajouter, organiser et configurer les champs qui apparaîtront lorsque les utilisateurs rempliront ce formulaire.

Utilisez les commandes du constructeur de formulaire pour :

- Ajouter de nouveaux champs (texte, nombre, date, fichier, choix, et plus)
- Organiser les champs en pages ou sections
- Définir les libellés, les indications et les règles de validation des champs

Le bouton **Enregistrer** reste désactivé si le constructeur de formulaire signale des erreurs de validation. Résolvez toutes les erreurs avant de tenter d'enregistrer.

---

## Importation d'une structure de formulaire

Si vous avez une définition de formulaire existante au format XLSForm, vous pouvez l'importer au lieu de construire la structure manuellement.

1. Cliquez sur le bouton **Importer** dans la barre d'outils.
2. Sélectionnez votre fichier XLSForm depuis votre appareil.
3. Vérifiez la structure importée dans le constructeur de formulaire.
4. Apportez les ajustements nécessaires, puis enregistrez.

---

## Configuration des relations

!!! note "Schémas existants uniquement"
    Le bouton Relations n'est disponible que lors de la modification d'un schéma existant, pas lors de la création d'un nouveau.

Cliquez sur le bouton **Relations** pour ouvrir l'éditeur de relations. Cela vous permet de lier des champs de ce formulaire à des données provenant d'autres formulaires, afin que certaines valeurs de champ ou choix de liste déroulante puissent être pré-remplis en fonction des données de formulaire associées.

---

## Enregistrement du schéma

Cliquez sur **Enregistrer** pour enregistrer le schéma. Un message de confirmation apparaîtra brièvement en bas de l'écran.

Après l'enregistrement, vous serez redirigé vers le hub de collecte de données.

!!! warning "Oups ! Une erreur est survenue lors de l'enregistrement du formulaire"
    Si un message d'erreur apparaît lors de l'enregistrement, vérifiez que les champs **Nom du formulaire** et **Libellé du formulaire** sont remplis et que le Nom du formulaire n'est pas déjà utilisé par un autre schéma. Si le problème persiste, contactez votre administrateur.