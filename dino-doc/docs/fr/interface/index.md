---
title: Navigation et interface
description: Un aperçu de l'interface de l'application Dino — la barre d'outils, la navigation latérale, les notifications, la synchronisation des données et l'espace utilisateur.
---

# Navigation et interface

L'interface de Dino se compose d'une barre d'outils supérieure et d'un menu de navigation latéral, présents sur chaque page après votre connexion.

![Main view of the Main Nav page](../imgs/interface/index.png)

---

## Navigation latérale

Le menu latéral vous permet de passer d'une zone principale de l'application à l'autre.

**Sections standard** (visibles par tous les utilisateurs authentifiés) :

| Section | Description |
|---|---|
| Tableau de bord | L'écran d'accueil. |
| Formulaires | Formulaires de collecte de données et soumissions. |
| Rapports | Rapports générés. |
| Agrégation | Vue unifiée des soumissions issues de plusieurs formulaires. |
| Métriques | Données de référence (projets, sites, organisations, etc.). *(Masqué pour les utilisateurs invités uniquement.)* |
| IA | Assistant IA (DinoGPT). |

**Sections d'administration** (visibles uniquement par les administrateurs, affichées sous un séparateur) :

| Section | Description |
|---|---|
| Utilisateurs | Comptes utilisateurs et groupes de permissions. |
| Langues | Gestion des traductions de l'interface. |

Sur les grands écrans, le menu est toujours visible à gauche. Sur les écrans plus petits, il se replie et peut être ouvert à l'aide du **bouton de menu** (icône hamburger) de la barre d'outils supérieure. Quelle que soit la taille de l'écran, cliquez sur le bouton de menu pour afficher les libellés du menu ou les réduire aux seules icônes.

---

## Barre d'outils supérieure

La barre d'outils située en haut de l'écran contient les commandes suivantes, de gauche à droite :

- **Bouton de menu** — ouvre ou replie le menu latéral.
- **Logo** — affiche le logo de votre organisation ou celui de Dino.
- **Indicateur de nouvelle version** — une icône de téléchargement apparaît lorsqu'une nouvelle version de Dino est disponible. Cliquez dessus pour recharger l'application et appliquer la mise à jour.
- **Crédits DINO-AI** — affiche votre solde de crédits IA restant sous forme de badge. Cliquez pour ouvrir l'[espace utilisateur](#espace-utilisateur) sur le panneau Crédits. *(Visible uniquement si une clé API DINO-AI a été configurée.)*
- **Bouton mode sombre / clair** — une icône soleil, un curseur et une icône lune. Utilisez le curseur pour basculer entre les thèmes clair et sombre. *(Masqué sur mobile — utilisez plutôt l'espace utilisateur.)*
- **Icône d'information** — survolez-la pour afficher les informations de version de cette installation.
- **Icône d'aide** — ouvre la playlist de tutoriels Dino dans un nouvel onglet.
- **Icône de paramètres** — ouvre l'[espace utilisateur](#espace-utilisateur).
- **Icône de synchronisation** — affiche l'état actuel de la synchronisation des données. Cliquez pour lancer une synchronisation manuelle.
- **Cloche de notifications** — affiche le nombre de notifications non lues sous forme de badge. La cloche sonne lorsque de nouvelles notifications arrivent. Voir [Notifications](#notifications) ci-dessous.
- **Sélecteur de langue** — change la langue de l'interface.
- **Nom d'utilisateur** — cliquez pour ouvrir l'[espace utilisateur](#espace-utilisateur).
- **Icône de déconnexion** — cliquez pour vous déconnecter. L'icône est grisée pendant une synchronisation ou lorsque l'appareil est hors ligne ; la déconnexion n'est pas disponible dans ces cas.

---

## Synchronisation des données

Dino synchronise vos données avec le serveur en arrière-plan. L'**icône de synchronisation** de la barre d'outils indique l'état actuel :

| Icône | Signification |
|---|---|
| `sync` (statique) | Toutes les données sont à jour. |
| `sync_problem` (pulsation) | Vous avez des modifications locales qui n'ont pas encore été synchronisées. Cliquez pour lancer une synchronisation. |
| `sync` (rotation) | Une synchronisation est en cours. |
| `sync_disabled` | L'appareil est hors ligne ; la synchronisation n'est pas disponible. |
| `sync` avec un badge `!` | Un problème de synchronisation a été rencontré. Consultez vos notifications pour plus de détails. |

Lorsqu'une synchronisation se termine, une notification apparaît brièvement en bas de l'écran :

- *« Synchronisation terminée »* — toutes les données ont été synchronisées avec succès.
- *« Synchronisation terminée avec des erreurs. Impossible de synchroniser : [éléments]. Veuillez consulter vos notifications. »* — une ou plusieurs collections de données n'ont pas pu être synchronisées. Une notification est également créée dans votre liste de notifications.

---

## Notifications

Cliquez sur l'**icône de cloche** de la barre d'outils pour ouvrir le menu déroulant des notifications. Le badge affiché sur la cloche indique le nombre de messages non lus.

![Notifications dropdown open](../imgs/interface/index-notifications.png)

Depuis ce menu déroulant, vous pouvez :

1.  **Cliquer sur une notification** pour la marquer comme lue.
2.  **Cliquer sur le bouton fléché** d'une notification (s'il est présent) pour accéder directement à la zone concernée de l'application.
3.  **Tout marquer comme lu** — marque toutes les notifications actuelles comme lues.
4.  **Voir toutes les notifications** — accède à la page complète [Notifications](../notifications/index.md).

---

## Espace utilisateur

Cliquez sur l'**icône de paramètres**, sur votre **nom d'utilisateur** ou sur le **compteur de crédits DINO-AI** pour ouvrir la boîte de dialogue de l'espace utilisateur. Votre nom complet et votre adresse e-mail s'affichent en haut.

![User area dialog open](../imgs/interface/index-user-area.png)

### Changer le mot de passe

1.  Saisissez votre **mot de passe actuel**.
2.  Saisissez un **nouveau mot de passe**.
3.  **Confirmez le nouveau mot de passe**.
4.  Cliquez sur le bouton fléché pour enregistrer.

Un message d'erreur s'affiche si le mot de passe actuel est incorrect ou si les nouveaux mots de passe ne correspondent pas.

### Clés API

Consultez ou définissez votre **clé API DINO-AI**. Une fois une clé valide enregistrée, elle s'affiche en lecture seule. Utilisez l'icône en forme d'œil pour afficher ou masquer la clé, et l'icône de copie pour la copier dans le presse-papiers.

### Crédits

Affiche votre **solde de crédits DINO-AI** actuel. Si une intégration de paiement est configurée, un bouton **Ajouter** permet d'acheter des crédits supplémentaires.

!!! tip "Visibilité"
    Cette section n'est visible que lorsqu'une clé API DINO-AI a été configurée.

### Thème Dino

Personnalisez le jeu de couleurs de l'application :

- **Couleur principale**, **Couleur d'accentuation**, **Couleur d'avertissement** — cliquez sur les champs de couleur pour ouvrir un sélecteur de couleur.
- **Nom du préréglage** — saisissez ou sélectionnez un nom pour enregistrer ou charger un préréglage de couleurs.
- Cliquez sur **Enregistrer** pour enregistrer les couleurs actuelles sous forme de préréglage nommé, ou sur **Charger** pour appliquer un préréglage enregistré.

Sur mobile, un **bouton de bascule mode sombre / clair** apparaît également ici.

### Tutoriels

Cliquez sur **Démarrer la visite Dino** pour relancer depuis le début la visite guidée de l'application.

!!! tip "Disponibilité"
    Cette section n'est affichée que si la visite guidée est configurée dans votre installation.

### Sauvegarde et restauration

*(Administrateurs uniquement, si activé.)*

- **Sauvegarder les données** — télécharge un export complet de la base de données de l'application au format JSON.
- **Restaurer les données** — téléverse un fichier JSON précédemment exporté pour restaurer la base de données.

!!! warning "Prudence avec la restauration"
    La restauration des données remplacera la base de données actuelle. Cette action est irréversible.