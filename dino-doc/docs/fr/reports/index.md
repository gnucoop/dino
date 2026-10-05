---
title: Rapports
description: Un aperçu de la zone Rapports dans Dino — comment trouver les schémas de rapport et accéder à vos rapports.
---

# Rapports

La zone Rapports est votre point d'accès central à tous les schémas de rapport disponibles. Un schéma de rapport définit la structure et le contenu d'un rapport pouvant être généré à partir de vos données collectées. Vous pouvez y parcourir les schémas et accéder aux rapports déjà créés pour chacun d'eux.

![Vue principale de la page Rapports](../imgs/reports/index.png)

Les schémas de rapport sont créés à partir d'un format basé sur Excel appelé [XLSReport](xlsreport.md), ou générés automatiquement à partir d'un schéma de formulaire (voir [Rapports automatiques](autoreports.md)). Pour en créer un à partir d'un fichier, vous préparez d'abord un fichier XLSReport, puis vous l'importez dans Dino. Pour la procédure complète, voir [Modifier le schéma de rapport](edit-report-schema.md).

---

## Parcourir les schémas de rapport

Lorsque vous ouvrez la page Rapports, vous voyez une carte pour chaque schéma de rapport auquel vous avez accès. Les cartes sont triées par ordre alphabétique selon le libellé du schéma.

Pour trouver un schéma précis :

1. Utilisez le champ **Filtre** en haut de la page.
2. Saisissez une partie quelconque du nom ou du libellé du schéma.
3. La liste se filtre au fur et à mesure de la saisie et n'affiche que les schémas correspondants.

Pour ouvrir les rapports d'un schéma, cliquez n'importe où sur sa carte.

Sur chaque carte que vous pouvez modifier, les icônes situées dans le coin supérieur droit vous permettent de gérer le schéma directement :

- **Modifier** (icône crayon) — ouvre le schéma pour le modifier. Voir [Modifier le schéma de rapport](edit-report-schema.md).
- **Supprimer** (icône corbeille) — supprime le schéma après confirmation. Un schéma auquel des rapports sont encore associés ne peut pas être supprimé : supprimez d'abord ses rapports.

Une icône d'empreinte digitale sur une carte signifie que le schéma de rapport est *unique* : il ne peut produire qu'un seul rapport pour un ensemble exact de métriques donné. Si vous tentez de créer un rapport qui existe déjà pour ces métriques, Dino ne créera pas de doublon.

!!! tip "Pas encore de schémas ?"
    Si vous voyez le message « There are not any Reports currently available », cela signifie qu'aucun schéma de rapport n'a encore été créé ni partagé avec vous. Demandez à votre administrateur Dino d'en créer un, ou ajoutez-en un vous-même si vous en avez la permission.

---

## Ajouter un nouveau schéma de rapport

Vous pouvez commencer à créer un nouveau schéma de rapport depuis la page principale Rapports.

1. Cliquez sur le bouton **+** (*Ajouter un nouveau schéma de rapports*) dans le coin inférieur droit de l'écran. Il n'apparaît que si vous êtes autorisé à créer des schémas de rapport.
2. Suivez les étapes décrites dans [Modifier le schéma de rapport](edit-report-schema.md).

---

## Ouvrir les rapports d'un schéma

Cliquer sur une carte de schéma vous amène à la liste des rapports générés à partir de ce schéma. Vous pouvez alors :

1. Parcourir les rapports existants dans un tableau, avec des détails tels que l'utilisateur ayant créé le rapport, le nom du rapport et la plage de dates collectées.
2. Filtrer et rechercher dans la liste pour affiner les rapports dont vous avez besoin. Utilisez la recherche par mot-clé, les champs de plage de dates et le bouton **Filtres** pour des conditions plus avancées. Vous pouvez également enregistrer un ensemble de filtres comme préréglage et le réappliquer ultérieurement.
3. Ouvrir un rapport pour le consulter : survolez sa ligne et cliquez sur l'icône **Voir** (œil), ou sélectionnez la ligne et cliquez sur **Voir** dans la barre d'actions au-dessus du tableau. Voir [Modifier le rapport](edit-report.md).
4. Supprimer un rapport dont vous n'avez plus besoin : sélectionnez sa ligne, puis cliquez sur **Supprimer** dans la barre d'actions.

Pour créer un nouveau rapport à partir du schéma sélectionné, cliquez sur **Ajouter un nouveau rapport** au-dessus du tableau. Les rapports qui utilisent des prompts IA consomment des jetons DINO-AI. Le nombre de jetons que le rapport utilisera est indiqué à côté du bouton, afin que vous connaissiez toujours le coût avant de commencer.

!!! warning "Jetons insuffisants"
    Si vous n'avez pas assez de jetons DINO-AI dans votre compte, Dino ne lancera pas le rapport et affichera un message vous invitant à ajouter des jetons. Ajoutez des jetons à votre compte et réessayez.

---

## Ce que vous pouvez faire ensuite

Depuis la zone Rapports, vous pouvez passer aux tâches suivantes :

* **[Modifier le rapport](edit-report.md)** — Consultez un rapport et exportez-le.
* **[Modifier le schéma de rapport](edit-report-schema.md)** — Créez de nouveaux schémas de rapport ou modifiez ceux existants pour définir ce qui apparaît dans vos rapports. Cela nécessite généralement des permissions d'administrateur.
* **[Agrégation](../aggregation/index.md)** — Parcourez les données de tous vos schémas de formulaire dans une seule liste.