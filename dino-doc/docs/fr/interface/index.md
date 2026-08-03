---
title: Navigation et interface
description: Un aperçu de l'interface de l'application Dino — la barre d'outils, la navigation latérale, les notifications, la synchronisation des données et la zone utilisateur.
---

# Navigation et interface

L'interface de Dino se compose d'une barre d'outils supérieure et d'un menu de navigation latérale, présents sur chaque page après la connexion.

![Main view of the Main Nav page](../imgs/interface/index.png)

---

## Navigation latérale

Le menu latéral vous permet de passer d'une section principale de l'application à l'autre.

**Sections standard** (visibles pour tous les utilisateurs authentifiés) :

| Section | Description |
|---|---|
| Tableau de bord | L'écran d'accueil. |
| Formulaires | Formulaires de collecte de données et soumissions. |
| Rapports | Rapports générés. |
| Agrégation | Vue unifiée des soumissions de plusieurs formulaires. |
| Métriques | Données de référence (projets, emplacements, organisations, etc.). *(Masqué pour les utilisateurs invités uniquement.)* |
| IA | Assistant IA (DinoGPT). |

**Sections administrateur** (visibles uniquement pour les administrateurs, affichées sous un séparateur) :

| Section | Description |
|---|---|
| Utilisateurs | Comptes utilisateurs et groupes de permissions. |
| Langues | Gestion des traductions de l'interface. |

Sur les grands écrans, le menu est toujours visible à gauche. Sur les petits écrans, il se replie et peut être ouvert avec le **bouton de menu** (icône hamburger) dans la barre d'outils supérieure. Quelle que soit la taille de l'écran, cliquez sur le bouton de menu pour développer les libellés du menu ou les réduire à de simples icônes.

---

## Barre d'outils supérieure

La barre d'outils en haut de l'écran contient les commandes suivantes, de gauche à droite :

- **Basculer le menu** — ouvrir ou replier le menu latéral.
- **Logo** — affiche le logo de votre organisation.
- **Indicateur de nouvelle version** — une icône de téléchargement apparaît lorsqu'une nouvelle version de Dino est disponible. Cliquez dessus pour recharger l'application et appliquer la mise à jour.
- **Crédits DINO-AI** — affiche votre solde de crédits IA restant sous forme de badge. Cliquez pour ouvrir la [Zone utilisateur](#user-area) sur le panneau Crédits. *(Visible uniquement si une clé API DINO-AI a été configurée.)*
- **Bascule mode sombre / clair** — une icône de soleil, un curseur et une icône de lune. Utilisez le curseur pour passer du thème clair au thème sombre. *(Masqué sur mobile — utilisez plutôt la Zone utilisateur.)*
- **Icône d'information** — survolez pour afficher les informations de version de cette installation.
- **Icône d'aide** — ouvre la playlist de tutoriels Dino dans un nouvel onglet.
- **Icône de paramètres** — ouvre la [Zone utilisateur](#user-area).
- **Icône de synchronisation** — affiche l'état actuel de la synchronisation des données. Cliquez pour déclencher une synchronisation manuelle.
- **Cloche de notifications** — affiche le nombre de notifications non lues sous forme de badge. La cloche sonne lorsque de nouvelles notifications arrivent. Voir [Notifications](#notifications) ci-dessous.
- **Sélecteur de langue** — change la langue de l'interface.
- **Nom d'utilisateur** — cliquez pour ouvrir la [Zone utilisateur](#user-area).
- **Icône de déconnexion** — cliquez pour vous déconnecter. L'icône est grisée pendant une synchronisation en cours ou lorsque l'appareil est hors ligne ; la déconnexion n'est pas disponible dans ces états.

---

## Synchronisation des données

Dino synchronise vos données avec le serveur en arrière-plan. L'**icône de synchronisation** dans la barre d'outils indique l'état actuel :

| Icône | Signification |
|---|---|
| `sync` (statique) | Toutes les données sont à jour. |
| `sync_problem` (pulsant) | Vous avez des modifications locales qui n'ont pas encore été synchronisées. Cliquez pour déclencher une synchronisation. |
| `sync` (rotation) | Une synchronisation est actuellement en cours. |
| `sync_disabled` | L'appareil est hors ligne ; la synchronisation n'est pas disponible. |
| `sync` avec badge `!` | Un problème de synchronisation a été rencontré. Consultez vos notifications pour plus de détails. |

Lorsqu'une synchronisation se termine, une notification apparaît brièvement en bas de l'écran :

- *« Synchronisation terminée »* — toutes les données ont été synchronisées avec succès.
- *« Synchronisation terminée avec des erreurs. Impossible de synchroniser : [éléments]. Veuillez consulter vos notifications. »* — une ou plusieurs collectes de données n'ont pas pu être synchronisées. Une notification est également créée dans votre liste de notifications.

---

## Notifications

Cliquez sur l'**icône de cloche** dans la barre d'outils pour ouvrir le menu déroulant des notifications. Le badge sur la cloche indique le nombre de messages non lus.

![Notifications dropdown open](../imgs/interface/index-notifications.png)

Depuis le menu déroulant, vous pouvez :

1.  **Cliquer sur une notification** pour la marquer comme lue.
2.  **Cliquer sur le bouton fléché** d'une notification (s'il est présent) pour accéder directement à la zone correspondante de l'application.
3.  **Tout marquer comme lu** — marque toutes les notifications actuelles comme lues.
4.  **Voir toutes les notifications** — accède à la page complète [Notifications](../notifications/index.md).

---

## Zone utilisateur

Cliquez sur l'**icône de paramètres**, votre **nom d'utilisateur** ou le **compteur de crédits DINO-AI** pour ouvrir la boîte de dialogue Zone utilisateur. Elle affiche votre nom complet et votre adresse e-mail en haut.

![User area dialog open](../imgs/interface/index-user-area.png)

### Changer le mot de passe

1.  Saisissez votre **mot de passe actuel**.
2.  Saisissez un **nouveau mot de passe**.
3.  **Confirmez le nouveau mot de passe**.
4.  Cliquez sur le bouton fléché pour enregistrer.

Un message d'erreur apparaîtra si le mot de passe actuel est incorrect ou si les nouveaux mots de passe ne correspondent pas.

### Clés API

Affichez ou définissez votre **clé API DINO-AI**. Une fois qu'une clé valide est enregistrée, elle est affichée en lecture seule. Utilisez l'icône œil pour afficher ou masquer la clé, et l'icône copier pour la copier dans le presse-papiers.

### Crédits

Affiche votre **solde de crédits DINO-AI** actuel. Si une intégration de paiement est configurée, un bouton **Ajouter** est disponible pour acheter des crédits supplémentaires.

!!! tip "Visibilité"
    Cette section n'est visible que si une clé API DINO-AI a été configurée.

### Thème DINO

Personnalisez la palette de couleurs de l'application :

- **Couleur principale**, **couleur d'accentuation**, **couleur d'avertissement** — cliquez sur les champs de couleur pour ouvrir un sélecteur de couleur.
- **Nom du préréglage** — saisissez ou sélectionnez un nom pour enregistrer ou charger un préréglage de couleur.
- Cliquez sur **Enregistrer** pour enregistrer les couleurs actuelles en tant que préréglage nommé, ou sur **Charger** pour appliquer un préréglage enregistré.

Sur mobile, une **bascule mode sombre / clair** apparaît également ici.

### Tutoriels

Cliquez sur **Démarrer la visite Dino** pour relancer la visite guidée de l'application depuis le début.

!!! tip "Disponibilité"
    Cette section n'est affichée que si la visite guidée est configurée dans votre installation.

### Sauvegarde et restauration

*(Administrateurs uniquement, si activé.)*

- **Sauvegarder les données** — télécharge une exportation complète de la base de données de l'application sous forme de fichier JSON.
- **Restaurer les données** — téléverse un fichier JSON précédemment exporté pour restaurer la base de données.

!!! warning "Prudence lors de la restauration"
    La restauration des données remplacera la base de données actuelle. Cette action est irréversible.