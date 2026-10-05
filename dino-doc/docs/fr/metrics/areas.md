---
title: Gestion des valeurs métriques – Domaines thématiques
description: Apprenez à afficher, ajouter, modifier, supprimer et rechercher des domaines thématiques dans la section de gestion des métriques de Dino.
---

# Gestion des valeurs métriques – Domaines thématiques

La page **Domaines thématiques** (accessible depuis la section Metrics) vous permet d'organiser vos données métriques par catégories hiérarchiques. Vous pouvez y afficher, créer, modifier et supprimer des domaines thématiques, ainsi que filtrer et exporter la liste.

![Vue principale de la page Domaines thématiques](../imgs/metrics/areas.png)

## Ce que vous voyez

- Le **percorso di navigazione** en haut indique votre position actuelle dans l'application (par exemple, **Metrics > Domaines thématiques**).
- Le tableau principal répertorie tous les domaines thématiques, en affichant des colonnes telles que **Area Name**, **Domaine parent** et (si configuré) d'autres attributs. Vous pouvez personnaliser les colonnes visibles en cliquant sur le bouton **Colonnes** au-dessus du tableau.
- Un champ de **recherche par mot-clé** et le bouton **Filtres** vous permettent de trouver des domaines par nom ou par date de création.
- Le bouton **Exportation** (cloud_download) vous permet de télécharger la liste actuelle sous forme de fichier.
- Deux boutons de barre d'outils sont disponibles :
    - **Add new AREA** – crée un nouveau domaine thématique.
    - **Import AREA** – ouvre la page d'importation, où vous téléchargez un fichier `.xls`, `.xlsx` ou `.csv`, mappez ses colonnes et vérifiez le résultat. Les domaines dont le nom existe déjà sont réutilisés, et non mis à jour.

## Travailler avec les domaines thématiques

### Ajouter un nouveau domaine thématique

1. Cliquez sur le bouton **Add new AREA** dans la barre d'outils.
2. Dans la boîte de dialogue qui s'ouvre, renseignez le champ **Area Name** et, si nécessaire, le **Domaine parent** ainsi que tout attribut supplémentaire. Les champs facultatifs sont marqués *(optional)*.
3. Cliquez sur **Enregistrer** pour créer le nouveau domaine.

!!! tip "Domaine parent"
    Pour créer un sous-domaine, commencez à taper dans le champ **Domaine parent** et choisissez le parent parmi les suggestions. Si vous le laissez vide, le nouveau domaine devient une entrée de premier niveau.

### Modifier un domaine existant

1. Trouvez le domaine que vous souhaitez modifier dans le tableau.
2. Survolez sa ligne et cliquez sur l'icône **Modifier** (crayon), ou cliquez sur la ligne pour la sélectionner puis cliquez sur **Modifier** dans la barre d'actions au-dessus du tableau.
3. Modifiez les champs dans la boîte de dialogue et cliquez sur **Enregistrer**.

![Boîte de dialogue de modification d'une valeur métrique](../imgs/metrics/areas-edit.png)

### Consulter les détails

- Survolez une ligne et cliquez sur l'icône **Visibilité** (œil), ou sélectionnez la ligne et cliquez sur **Voir** dans la barre d'actions, pour ouvrir une boîte de dialogue en lecture seule affichant tous les champs du domaine.

### Supprimer un domaine

1. Cliquez sur la ligne du domaine pour la sélectionner, puis cliquez sur **Supprimer** dans la barre d'actions au-dessus du tableau.
2. Confirmez la suppression dans la boîte de dialogue qui apparaît.

!!! warning "Considérations sur la suppression"
    Un domaine utilisé par des form, ou qui possède des domaines enfants, ne peut pas être supprimé. Si seuls des report l'utilisent, Dino vous avertit et vous permet de confirmer. Les groupes d'utilisateurs qui accordent le domaine ne sont pas vérifiés : retirez-le d'abord de ceux-ci. Voir [Metrics](index.md).

## Recherche et filtrage

- Utilisez le champ de **recherche par mot-clé** au-dessus de la liste pour filtrer les domaines par nom.
- Cliquez sur **Filtres** pour définir une **De date** et une **À ce jour**, qui filtrent par date de création, puis cliquez sur **Chercher**.
- Les filtres appliqués apparaissent sous forme de puces sous la barre d'outils ; cliquez sur l'icône **annuler** d'une puce pour la retirer.

## Exporter la liste

1. Cliquez sur le bouton **Exportation** dans la barre d'outils.
2. Choisissez ce qu'il faut exporter : *Éléments de la page* (par défaut), les éléments correspondant à vos filtres, ou *Tous les éléments*.
3. Choisissez le format : *csv*, *xlsx* ou *splitted xlsx*, puis cliquez sur **Exportation**.

## Actions groupées

Pour effectuer des actions sur plusieurs domaines à la fois, cochez les cases situées à côté des lignes. Lorsqu'une ligne est sélectionnée, ses actions individuelles apparaissent dans la barre d'actions au-dessus du tableau ; lorsque plusieurs lignes sont sélectionnées, la barre propose les actions groupées. L'écran Domaines thématiques ne prend actuellement en charge que la **suppression groupée**.

## Naviguer avec le percorso di navigazione

Le percorso di navigazione indique votre position actuelle (par exemple, **Metrics > Domaines thématiques**). Cliquez sur n'importe quel lien du percorso di navigazione pour remonter d'un niveau.

## Pages associées

- [Metrics Overview](index.md)
- [Gestion des valeurs métriques – Cases](cases.md)
- [Gestion des valeurs métriques – Locations](locations.md)
- [Gestion des valeurs métriques – Organizations](organizations.md)
- [Gestion des valeurs métriques – Projects](projects.md)
- [Users and Groups](../administration/users.md)