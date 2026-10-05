---
title: Navigation et interface
description: Un aperçu de la structure de l'application Dino — la barre latérale, la synchronisation des données, les notifications, le menu utilisateur et la déconnexion.
---

# Navigation et interface

Une fois connecté, chaque page de Dino est encadrée par une **barre latérale** à gauche. Elle contient la navigation entre les zones de l'application et, en bas, la synchronisation des données, les notifications et votre carte utilisateur.

![Vue principale de la page de navigation principale](../imgs/interface/index.png)

---

## La barre latérale

En haut de la barre latérale se trouvent le logo et le **bouton de menu**, qui déploie la barre latérale pour afficher les noms des sections ou la réduit aux icônes uniquement.

!!! tip "Menu réduit"
    Lorsque la barre latérale est réduite aux icônes uniquement, survolez une icône pour voir le nom de sa section dans une infobulle.

Sur un téléphone ou un petit écran, la barre latérale est masquée. Une fine barre en haut de la page affiche alors le bouton de menu, qui ouvre la barre latérale par-dessus la page, le logo et le bouton de synchronisation.

### Sections

La navigation répertorie les zones de Dino que vous pouvez utiliser. Celles qui apparaissent dépendent de la configuration de votre instance Dino et de vos permissions.

**Sections utilisateur**, sous le titre **Utilisateur** :

| Section | Description |
|---|---|
| Tableau de bord | L'écran d'accueil. Voir [Tableau de bord](../dashboard/index.md). |
| Form | Formulaires de collecte de données et données. Voir [Form](../forms/index.md). |
| Report | Report générés. Voir [Report](../reports/index.md). |
| Agrégation | Vue unifiée des données de tous les form. Voir [Agrégation](../aggregation/index.md). |
| AI | L'assistant DinoAi, lorsqu'il est activé pour votre instance. |
| Métriques | Données de référence (projets, posizioni, organisations, etc.). Voir [Métriques](../metrics/index.md). *(Masqué pour les utilisateurs invités uniquement.)* |

**Sections d'administration**, sous le titre **Administration**, visibles uniquement par les administrateurs :

| Section | Description |
|---|---|
| Utilisateurs | Comptes utilisateur et groupes de permissions. Voir [Utilisateurs](../administration/users.md). |
| Langues | Gestion de la traduction de l'interface. Voir [Gestion des langues](../administration/languages.md). |

Votre instance peut déplacer certaines sections, comme Métriques, Report ou Agrégation, parmi les sections d'administration. Lorsque la barre latérale est réduite, les deux groupes sont séparés par une ligne au lieu de leurs titres.

---

## Synchronisation des données

Dino conserve vos données sur l'appareil et les synchronise avec le serveur en arrière-plan. Le bouton **Synchroniser** en bas de la barre latérale indique l'état actuel et, lorsque la barre latérale est déployée, l'heure de la dernière synchronisation terminée (ou *Jamais synchronisé*). Cliquez dessus pour lancer une synchronisation.

| Bouton | Signification |
|---|---|
| Icône `sync` | Toutes les données sont à jour. |
| Icône `sync`, en rotation | Une synchronisation est en cours. |
| Icône `sync_problem` sur un bouton coloré | Vous avez des modifications locales qui n'ont pas encore été synchronisées. Cliquez pour les synchroniser. |
| Badge `!` sur l'icône | Un problème a été rencontré lors de la dernière synchronisation. Consultez vos notifications pour plus de détails. |
| Icône `sync_disabled`, *Hors ligne* | L'appareil est hors ligne ; la synchronisation n'est pas disponible tant que la connexion n'est pas rétablie. |

Lorsqu'une synchronisation se termine, un message apparaît brièvement en bas de l'écran :

- *« Synchronisation terminée »* — toutes les données ont été synchronisées avec succès.
- *« Synchronisation terminée avec des erreurs. Impossible de synchroniser : [éléments]. Veuillez consulter vos notifications. »* — une ou plusieurs collections de données n'ont pas pu être synchronisées. Une notification est également créée dans votre liste de notifications.

!!! warning "Session expirée"
    Si votre session a expiré, la synchronisation s'arrête et le bouton de synchronisation affiche `sync_problem`. Vos données restent sur cet appareil. Cliquez sur le bouton : Dino tente de renouveler la session et, s'il n'y parvient pas, propose **Aller à la page de connexion**, en conservant les données sur cet appareil, ou **Plus tard**. Reconnectez-vous avec le même compte pour synchroniser les données.

---

## Boutons utilitaires

Sous le bouton de synchronisation, une rangée de petits boutons donne accès à :

- **Nouvelle version** — une icône de téléchargement apparaît lorsqu'une nouvelle version de Dino est prête. Cliquez dessus pour recharger l'application et appliquer la mise à jour.
- **Notifications** — la cloche, avec un badge comptant vos notifications non lues. Voir [Notifications](#notifications) ci-dessous.
- **Mode clair / sombre** — un bouton soleil et un bouton lune. Ils sont affichés lorsque la barre latérale est déployée et sur les petits écrans ; vous pouvez également changer de mode depuis l'[Espace utilisateur](../user-area/index.md).
- **DINO-AI Credits** — un badge indiquant vos crédits AI restants, affiché uniquement lorsque DINO-AI est configuré pour votre compte. Cliquez dessus pour ouvrir l'onglet AI de l'Espace utilisateur.

---

## Notifications

Cliquez sur la **cloche** pour ouvrir le panneau des notifications. Son en-tête indique combien de notifications ne sont pas lues. Les notifications sont regroupées par jour, chacune avec son ancienneté, et les messages répétés sont regroupés en une seule ligne avec un compteur (par exemple ×3).

![Menu déroulant des notifications ouvert](../imgs/interface/index-notifications.png)

Depuis le panneau, vous pouvez :

1.  **Cliquer sur une notification** pour la marquer comme lue. Si elle renvoie vers un endroit de Dino, indiqué par une flèche à droite, le clic vous y amène également.
2.  **Marquez tout comme lu** — affiché lorsqu'il y a des notifications non lues.
3.  **Voir toutes les notifications** — ouvre la page complète [Notifications](../notifications/index.md).

---

## Carte utilisateur et menu

Tout en bas de la barre latérale, la carte utilisateur affiche vos initiales, votre nom et une ligne avec votre rôle, la langue d'interface active et la version de Dino. Cliquez sur la carte pour ouvrir le menu utilisateur :

- **Espace utilisateur** — votre page de compte, pour changer votre mot de passe, consulter votre clé et vos crédits DINO-AI, personnaliser le thème, et plus encore. Voir [Espace utilisateur](../user-area/index.md).
- **Langue** — choisissez la langue de l'interface.
- **Aide** — un lien vers les directives configurées pour votre instance, lorsqu'il y en a.
- Les informations de build de l'installation.

---

## Déconnexion

Cliquez sur le bouton **Déconnexion** à côté de votre carte utilisateur. Dino demande toujours ce qu'il faut faire des données sur cet appareil :

- **Se déconnecter et supprimer les données** — met fin à la session et supprime toutes les données locales de cet appareil.
- **Fermer la session et conserver les données** — met fin à la session et vous amène à la page de connexion, en conservant les données sur cet appareil pour votre prochaine connexion.
- **Annuler** — reste connecté.

Le bouton Déconnexion est grisé et ne peut pas être utilisé pendant une synchronisation ou lorsque l'appareil est hors ligne.

!!! warning "Données pas encore synchronisées"
    Les données que vous n'avez pas encore synchronisées n'existent que sur cet appareil : les supprimer lors de la déconnexion les perd définitivement. En cas de doute, synchronisez d'abord ou choisissez **Fermer la session et conserver les données**. Vous connecter plus tard avec un autre compte les supprime également — voir [Connexion](../getting-started/login.md).