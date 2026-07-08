---
title: Navigation & Interface
description: Un aperçu de l'interface de l'application Dino — la barre d'outils, le menu latéral, les notifications, la synchronisation des données et la zone utilisateur.
---

# Navigation & Interface

L'interface de Dino se compose d'une barre d'outils supérieure et d'un menu de navigation latéral, présents sur chaque page après la connexion.

![Vue principale de la page de navigation](../imgs/interface/index.png)

---

## Menu latéral

Le menu latéral permet de naviguer entre les principales zones de l'application.

**Sections standard** (visibles par tous les utilisateurs authentifiés) :

| Section | Description |
|---|---|
| Tableau de bord | Écran d'accueil. |
| Formulaires | Formulaires de collecte de données et soumissions. |
| Rapports | Rapports générés. |
| Agrégation | Vue unifiée des soumissions issues de plusieurs formulaires. |
| Métriques | Données de référence (projets, lieux, organisations, etc.). *(Masqué pour les utilisateurs invités.)* |
| IA | Assistant IA (DinoGPT). |

**Sections d'administration** (visibles uniquement par les administrateurs, affichées sous un séparateur) :

| Section | Description |
|---|---|
| Utilisateurs | Comptes utilisateurs et groupes de permissions. |
| Langues | Gestion des traductions de l'interface. |

Sur les grands écrans, le menu est toujours visible à gauche. Sur les écrans plus petits, il se rétracte et peut être ouvert via le **bouton menu** (icône hamburger) dans la barre d'outils supérieure. Quelle que soit la taille d'écran, cliquez sur le bouton menu pour développer les libellés du menu ou les réduire à de simples icônes.

---

## Barre d'outils supérieure

La barre d'outils en haut de l'écran contient les contrôles suivants, de gauche à droite :

- **Bascule du menu** — ouvrir ou rétracter le menu latéral.
- **Logo** — affiche le logo de votre organisation.
- **Indicateur de nouvelle version** — une icône de téléchargement apparaît lorsqu'une nouvelle version de Dino est disponible. Cliquez pour recharger l'application et appliquer la mise à jour.
- **Crédits DINO-AI** — affiche votre solde de crédits IA restants sous forme de badge. Cliquez pour ouvrir la [Zone utilisateur](#zone-utilisateur) sur le panneau Crédits. *(Visible uniquement si une clé API DINO-AI a été configurée.)*
- **Bascule mode sombre / clair** — une icône de soleil, un curseur et une icône de lune. Utilisez le curseur pour basculer entre les thèmes clair et sombre. *(Masqué sur mobile — utilisez la Zone utilisateur à la place.)*
- **Icône d'information** — survolez pour voir les informations de version de cette installation.
- **Icône d'aide** — ouvre la playlist tutoriel de Dino dans un nouvel onglet.
- **Icône Paramètres** — ouvre la [Zone utilisateur](#zone-utilisateur).
- **Icône de synchronisation** — affiche l'état actuel de la synchronisation des données. Cliquez pour déclencher une synchronisation manuelle.
- **Cloche de notifications** — affiche le nombre de notifications non lues sous forme de badge. La cloche sonne lorsque de nouvelles notifications arrivent. Voir [Notifications](#notifications) ci-dessous.
- **Sélecteur de langue** — changer la langue de l'interface.
- **Nom d'utilisateur** — cliquez pour ouvrir la [Zone utilisateur](#zone-utilisateur).
- **Icône de déconnexion** — cliquez pour vous déconnecter. L'icône est grisée pendant une synchronisation en cours ou lorsque l'appareil est hors ligne ; la déconnexion n'est pas disponible dans ces états.

---

## Synchronisation des données

Dino synchronise vos données avec le serveur en arrière-plan. L'**icône de synchronisation** dans la barre d'outils indique l'état actuel :

| Icône | Signification |
|---|---|
| `sync` (statique) | Toutes les données sont à jour. |
| `sync_problem` (pulsation) | Vous avez des modifications locales non encore synchronisées. Cliquez pour déclencher une synchronisation. |
| `sync` (rotation) | Une synchronisation est en cours. |
| `sync_disabled` | L'appareil est hors ligne ; la synchronisation n'est pas disponible. |
| `sync` avec badge `!` | Un problème de synchronisation est survenu. Consultez vos notifications pour plus de détails. |

Lorsqu'une synchronisation se termine, une notification apparaît brièvement en bas de l'écran :

- *"Synchronisation terminée"* — toutes les données synchronisées avec succès.
- *"Synchronisation terminée avec des erreurs. Impossible de synchroniser : [éléments]. Veuillez consulter vos notifications."* — un ou plusieurs recueils de données n'ont pas pu être synchronisés. Une notification est également créée dans votre liste de notifications.

---

## Notifications

Cliquez sur l'**icône de cloche** dans la barre d'outils pour ouvrir le menu déroulant des notifications. Le badge sur la cloche indique le nombre de messages non lus.

![Menu déroulant des notifications ouvert](../imgs/interface/index-notifications.png)

Depuis le menu déroulant, vous pouvez :

1.  **Cliquer sur une notification** pour la marquer comme lue.
2.  **Cliquer sur le bouton fléché** d'une notification (s'il est présent) pour accéder directement à la zone correspondante de l'application.
3.  **Tout marquer comme lu** — marque toutes les notifications actuelles comme lues.
4.  **Voir toutes les notifications** — navigue vers la page complète [Notifications](../notifications/index.md).

---

## Zone utilisateur

Cliquez sur l'**icône Paramètres**, votre **nom d'utilisateur** ou le **compteur de crédits DINO-AI** pour ouvrir la boîte de dialogue de la Zone utilisateur. Elle affiche votre nom complet et votre adresse e-mail en haut.

![Boîte de dialogue de la zone utilisateur ouverte](../imgs/interface/index-user-area.png)

### Modifier le mot de passe

1.  Saisissez votre **Mot de passe actuel**.
2.  Saisissez un **Nouveau mot de passe**.
3.  **Confirmez le nouveau mot de passe**.
4.  Cliquez sur le bouton fléché pour enregistrer.

Un message d'erreur apparaît si le mot de passe actuel est incorrect ou si les nouveaux mots de passe ne correspondent pas.

### Clés API

Consultez ou définissez votre **Clé API DINO-AI**. Une fois qu'une clé valide est stockée, elle s'affiche en lecture seule. Utilisez l'icône en forme d'œil pour afficher ou masquer la clé, et l'icône de copie pour la copier dans le presse-papiers.

### Crédits

Affiche votre **solde de crédits DINO-AI** actuel. Si une intégration de paiement est configurée, un bouton **Ajouter plus** est disponible pour acheter des crédits supplémentaires.

!!! tip "Visibilité"
    Cette section n'est visible que si une clé API DINO-AI a été configurée.

### Thème DINO

Personnalisez la palette de couleurs de l'application :

- **Couleur primaire**, **Couleur d'accentuation**, **Couleur d'avertissement** — cliquez sur les champs de couleur pour ouvrir un sélecteur de couleur.
- **Nom du préréglage** — tapez ou sélectionnez un nom pour enregistrer ou charger un préréglage de couleurs.
- Cliquez sur **Enregistrer** pour sauvegarder les couleurs actuelles sous forme de préréglage nommé, ou sur **Charger** pour appliquer un préréglage enregistré.

Sur mobile, une **bascule mode sombre / clair** apparaît également ici.

### Tutoriels

Cliquez sur **Démarrer la visite guidée de Dino** pour relancer la visite guidée de l'application depuis le début.

!!! tip "Disponibilité"
    Cette section n'est affichée que si la visite guidée est configurée dans votre installation.

### Sauvegarde et restauration

*(Administrateurs uniquement, si activé.)*

- **Sauvegarder les données** — télécharge une exportation complète de la base de données de l'application au format JSON.
- **Restaurer les données** — télécharge un fichier JSON précédemment exporté pour restaurer la base de données.

!!! warning "Attention à la restauration"
    La restauration des données remplacera la base de données actuelle. Cette action est irréversible.