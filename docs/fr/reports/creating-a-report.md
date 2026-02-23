---
title: Créer un rapport
description: Comment générer un nouveau rapport à partir d'un schéma de rapport dans Dino, y compris la sélection des métriques et la définition d'une plage de dates.
---

# Créer un rapport

Pour générer un nouveau rapport, accédez au hub Rapports, ouvrez un schéma de rapport et cliquez sur le **bouton +** (le bouton circulaire flottant en bas à droite de la page).

![Créer un rapport](../imgs/reports/creating-a-report.png)

!!! note "Autorisation requise"
    Le bouton d'ajout n'est visible que si vous avez l'autorisation de créer des rapports pour ce schéma.

---

## Étape 1 — Métriques du rapport

Si le schéma de rapport nécessite des métriques, la première étape vous demande de sélectionner les valeurs de métrique que ce rapport couvrira (par exemple : projet, lieu ou organisation).

1.  Remplissez tous les champs de métrique obligatoires.
2.  Cliquez sur **Suivant** pour continuer.

---

## Étape 2 — Données du rapport

Dans la deuxième étape, remplissez les champs suivants :

- **Nom du rapport** *(obligatoire)* — Un nom pour identifier ce rapport.
- **Collecté depuis** *(facultatif)* — Le début de la plage de dates pour les données incluses dans le rapport.
- **Collecté jusqu'à** *(facultatif)* — La fin de la plage de dates.

La plage de dates est facultative. Si elle est laissée vide, le rapport inclura toutes les données disponibles pour les métriques sélectionnées.

!!! tip "Schémas sans métriques"
    Si le schéma de rapport n'utilise pas de métriques, vous verrez directement uniquement les champs du nom du rapport et de la plage de dates, sans étapes intermédiaires.

---

## Enregistrement du rapport

Cliquez sur le bouton **Enregistrer le rapport** (le bouton circulaire flottant) pour générer et enregistrer le rapport.

- Si le rapport est généré avec succès, un message de confirmation s'affichera et vous serez redirigé vers la liste des rapports.

!!! warning "Rapports alimentés par IA"
    Certains schémas de rapport utilisent l'IA pour générer du contenu. Créer un rapport à partir de ces schémas coûte des crédits IA. Le coût en crédits est indiqué dans l'infobulle du bouton d'ajout avant de commencer. Si votre compte ne dispose pas de suffisamment de crédits, un message s'affichera et le rapport ne pourra pas être créé.