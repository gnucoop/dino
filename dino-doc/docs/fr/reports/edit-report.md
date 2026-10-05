---
title: Modifier un rapport
description: Apprenez à créer un rapport à partir d'un report schema dans Dino, à ouvrir un rapport sauvegardé et à exporter les résultats.
---

# Modifier un rapport

Un rapport est généré à partir d'un [report schema](edit-report-schema.md) : il applique le schéma aux données qui correspondent aux métriques et aux dates que vous choisissez. Cette page explique comment créer un nouveau rapport et comment ouvrir et exporter un rapport sauvegardé.

![Un rapport sauvegardé ouvert à l'étape Métriques du rapport](../imgs/reports/edit-report.png)

## Créer un rapport

1. Rendez-vous sur la page [Reports](index.md) et cliquez sur la carte du report schema que vous souhaitez utiliser. La liste de ses rapports s'ouvre.
2. Cliquez sur **Ajouter un nouveau rapport** au-dessus du tableau. Si le rapport utilise des prompts IA, le nombre de jetons DINO-AI qu'il consommera est indiqué sur le bouton.
3. Si votre Dino utilise des métriques, la page s'ouvre à l'étape **Métriques du rapport** :
    1. Vérifiez la **Date de création**, et cliquez sur **Modifier** pour en choisir une autre si nécessaire.
    2. Choisissez éventuellement un **Statut du formulaire**, parmi les statuts de formulaire que vous êtes autorisé à utiliser. Le champ n'est affiché que s'il en existe.
    3. Choisissez les valeurs de métrique concernées par le rapport, comme une posizione ou un projet. Les métriques marquées d'un astérisque (*) sont requises par le report schema ; les autres sont facultatives et restreignent davantage les données. Si une valeur dont vous avez besoin n'existe pas encore, cliquez sur **Nouveau** à côté de son champ pour la créer, lorsque vous y êtes autorisé.
    4. Cliquez sur **Continuer**.
4. À l'étape **DONNÉES DU RAPPORT** :
    1. Saisissez le **Nom de rapport**. Il est obligatoire.
    2. Définissez éventuellement **Collecté depuis** et **Collecté jusqu'au** : seules les données créées dans cet intervalle sont incluses dans le rapport. Vous pouvez définir un seul des deux, ou aucun, auquel cas aucun filtre de date n'est appliqué.
5. Cliquez sur le bouton **Sauver le rapport** en bas à droite. Il est activé une fois les métriques requises et le nom renseignés.

Dino confirme que le document a été créé et vous ramène à la liste des rapports, où le nouveau rapport apparaît.

!!! warning "Rapports avec prompts IA"
    Créer un rapport qui utilise des prompts IA consomme des jetons DINO-AI. Si vous n'en avez pas assez, Dino ne crée pas le rapport et vous demande d'ajouter des jetons.

!!! tip "Les valeurs de métrique ne peuvent pas être modifiées par la suite"
    Les métriques, le statut et la plage de dates sont fixés au moment de la création du rapport. Pour voir le même schéma appliqué à d'autres valeurs, créez un autre rapport.

## Ouvrir un rapport sauvegardé

1. Rendez-vous sur la page [Reports](index.md) et cliquez sur la carte du report schema.
2. Dans la liste des rapports, survolez la ligne du rapport et cliquez sur l'icône **Voir** (œil), ou cliquez sur la ligne pour la sélectionner et cliquez sur **Voir** dans la barre d'actions au-dessus du tableau.

Si votre Dino utilise des métriques, le rapport s'ouvre à l'étape **Métriques du rapport**, qui affiche les valeurs avec lesquelles le rapport a été créé. Elles ne peuvent pas être modifiées ici. Cliquez sur **Afficher le rapport** pour passer à l'étape **DONNÉES DU RAPPORT**, où le rapport est affiché.

Pendant le chargement du rapport, Dino affiche un indicateur de chargement. Un rapport qui utilise des prompts IA affiche à la place une barre de progression, avec le message *Generating report prompt X of Y*. Si aucune donnée ne correspond au rapport, la page affiche *Aucun formulaire n'a été trouvé pour ce rapport*.

![Vue du rapport généré après avoir cliqué sur Afficher le rapport](../imgs/reports/edit-report-view.png)

## Lire le rapport

Le haut de l'étape **DONNÉES DU RAPPORT** affiche le titre du report schema, les dates **Collecté depuis** et **Collecté jusqu'au** lorsque le rapport en a, ainsi que les valeurs de métrique avec lesquelles il a été créé. Le rapport lui-même suit, tel que conçu dans son fichier [XLSReport](xlsreport.md) : tableaux, graphiques et texte.

Si le rapport contient des widgets de filtre, vous pouvez les utiliser pour restreindre les données affichées, sans modifier le rapport sauvegardé.

## Exporter un rapport

À côté de **Exporter comme:**, en haut de l'étape **DONNÉES DU RAPPORT**, choisissez un format :

* **pdf portrait** / **pdf landscape** — un document PDF dans l'orientation choisie.
* **docx portrait** / **docx landscape** — un document Word dans l'orientation choisie.
* **xlsx** — un fichier Excel avec les données du rapport.

!!! note "Où se trouvent les boutons d'export"
    Les boutons d'export appartiennent à l'étape **DONNÉES DU RAPPORT**. Lorsque votre Dino n'a pas de métriques actives, et sur le [Dashboard](../dashboard/index.md), le rapport est affiché directement, sans les étapes et sans les boutons d'export.

## Pages associées

* [Reports](index.md) — parcourez les report schemas et leurs rapports.
* [Modifier un report schema](edit-report-schema.md) — créez ou modifiez le schéma à partir duquel un rapport est généré.
* [Rapports automatiques](autoreports.md) — rapports générés automatiquement à partir d'un form schema.