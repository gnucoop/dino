---
title: Se connecter
description: Comment se connecter à Dino, réinitialiser votre mot de passe, créer un compte et utiliser des fournisseurs de connexion externes.
---

# Se connecter à Dino

La page de connexion est le point de départ pour accéder à Dino. Vous pouvez y vous connecter à votre compte, créer un nouveau compte ou récupérer l'accès si vous avez oublié votre mot de passe. Selon la façon dont votre organisation a configuré Dino, certaines des options décrites ci-dessous peuvent ne pas être visibles.

![Vue principale de la page de connexion](../imgs/getting-started/login.png)

La page comporte trois parties :

- un **en-tête**, avec le logo, le sélecteur de langue et un lien vers le code source de Dino sur GitHub ;
- la **carte de connexion**, à côté d'une brève présentation de la plateforme et de ses modules. Sur un téléphone, la carte apparaît en premier et la présentation suit, afin que vous puissiez vous connecter sans faire défiler la page ;
- un **pied de page**, avec le commutateur de thème clair/sombre et la version de l'application.

---

## Se connecter

Utilisez vos identifiants pour accéder à la plateforme. Si votre installation ne vous permet pas de créer un compte vous-même, la carte vous rappelle d'utiliser le compte que votre administrateur a créé pour vous.

1.  Sur la page de connexion, saisissez votre **nom d'utilisateur ou adresse e-mail** dans le premier champ.
2.  Saisissez votre **Mot de passe** dans le second champ.
3.  Cliquez sur **Se connecter**. Pendant que Dino vérifie vos identifiants, le bouton affiche **Connexion en cours…**.

Si vos identifiants sont corrects, vous serez automatiquement redirigé vers le [Tableau de bord](../dashboard/index.md).

Si la connexion échoue, un message d'erreur apparaîtra sous le formulaire. Vérifiez que votre adresse e-mail et votre mot de passe sont corrects, en vous assurant qu'il n'y a pas d'espaces superflus, puis réessayez.

!!! tip "Rester connecté"
    Si votre session expire, Dino ne vous déconnecte pas et conserve les données sur l'appareil, mais la synchronisation s'arrête : le bouton de synchronisation affiche un avertissement. Cliquez dessus : Dino tente de renouveler la session et, s'il n'y parvient pas, vous propose **Aller à la page de connexion**, en conservant les données sur cet appareil, ou **Plus tard**. Reconnectez-vous avec le même compte pour synchroniser les données.

!!! warning "Données pas encore synchronisées"
    Si les données collectées sur cet appareil n'ont pas encore été synchronisées, la page de connexion vous en informe, en nommant le compte qui les a collectées lorsque c'est possible. Connectez-vous avec ce compte pour synchroniser les données : **se connecter avec un autre compte les supprime**.

---

## Réinitialiser votre mot de passe

Si vous avez oublié votre mot de passe, vous pouvez demander un lien de réinitialisation par e-mail.

!!! note "Fonctionnalité facultative"
    Cette option peut ne pas être disponible dans votre installation. Si vous ne voyez pas le lien « Mot de passe oublié ? », contactez votre administrateur.

1.  Sur la page de connexion, cliquez sur **« Mot de passe oublié ? »** sous le formulaire de connexion.
2.  Saisissez l'**adresse e-mail** associée à votre compte.
3.  Cliquez sur **Envoyer** pour envoyer la demande.

Vous recevrez un message de confirmation en haut de l'écran. Consultez votre boîte de réception pour trouver un e-mail contenant un lien permettant de définir un nouveau mot de passe. Si l'e-mail n'arrive pas dans les quelques minutes qui suivent, vérifiez votre dossier de spam.

Pour revenir au formulaire de connexion sans réinitialiser votre mot de passe, cliquez sur **« En fait, je me souviens de mon mot de passe »**.

Pour plus de détails, consultez la page [Réinitialiser le mot de passe](reset-password.md).

---

## Créer un nouveau compte

Si vous n'avez pas encore de compte, vous pouvez peut-être vous inscrire directement depuis la page de connexion.

!!! note "Fonctionnalité facultative"
    Cette option peut ne pas être disponible dans votre installation. Si vous ne voyez pas le lien « Nouvel utilisateur ? Créer un compte », contactez votre administrateur pour qu'un compte soit créé pour vous.

1.  Sur la page de connexion, cliquez sur **« Nouvel utilisateur ? Créer un compte »**.
2.  Saisissez votre **Nom et prénom**.
3.  Saisissez votre **adresse e-mail**.
4.  Choisissez un **Mot de passe** (au moins 9 caractères).
5.  Saisissez à nouveau votre mot de passe dans le champ **Confirmez le mot de passe** pour vous assurer qu'il correspond.
6.  Si une **politique de confidentialité** est affichée, lisez le texte et cochez la case pour accepter les termes et conditions. Vous devez accepter pour pouvoir continuer.
7.  Cliquez sur **Créer un compte**.

Une fois votre compte créé, vous serez connecté et automatiquement redirigé vers le [Tableau de bord](../dashboard/index.md).

Si vous avez déjà un compte, cliquez sur **« Vous avez déjà un compte ? Connexion »** pour revenir au formulaire de connexion.

!!! tip "Choisir un mot de passe fort"
    Utilisez un mot de passe que vous ne réutilisez pas sur d'autres sites web. Un mélange de lettres majuscules et minuscules, de chiffres et de symboles le rend plus difficile à deviner.

---

## Se connecter avec un compte externe

Votre organisation peut vous permettre de vous connecter à l'aide de votre compte Microsoft ou Google existant, au lieu d'un mot de passe Dino distinct.

!!! note "Fonctionnalité facultative"
    Cette option peut ne pas être disponible dans votre installation. Les boutons n'apparaîtront que si votre administrateur a activé la connexion externe.

1.  Sur la page de connexion, cliquez sur **« Login with Microsoft »** ou **« Login with Google »**, selon le compte que vous souhaitez utiliser.
2.  Vous serez redirigé vers Microsoft ou Google pour confirmer votre identité.
3.  Après avoir autorisé l'accès, vous serez ramené vers Dino et connecté automatiquement.

---

## Paramètres de la page

Un petit ensemble de préférences d'affichage est disponible directement sur la page de connexion.

### Langue

Le sélecteur de langue dans l'en-tête, affichant le code de la langue actuelle (par exemple **ENG**), change la langue de la page avant que vous ne vous connectiez. Dino mémorise votre choix sur cet appareil.

### Thème clair / sombre

Deux boutons dans le pied de page, un soleil (*Mode clair*) et une lune (*Mode sombre*), permettent de basculer entre le **Mode clair** et le **Mode sombre**. Le paramètre prend effet immédiatement.

### Sélection de la plateforme

!!! note "Fonctionnalité facultative"
    Cette option peut ne pas être disponible dans votre installation. Elle n'est affichée que dans les déploiements multiplateformes.

Si une liste déroulante **« Choisissez votre plateforme »** est visible, sélectionnez la plateforme à laquelle vous souhaitez vous connecter avant de vous connecter. La liste déroulante affichera les environnements configurés par votre administrateur.

---

## Résolution des problèmes

### « There was a problem connecting to the Authentication server or your token has expired. »

!!! warning
    Votre session précédente a expiré ou la connexion au serveur d'authentification a été interrompue. Il ne s'agit pas d'une erreur de votre part. Saisissez simplement vos identifiants et reconnectez-vous.

### « There was a problem during syncing process. »

!!! warning
    Une erreur s'est produite lors de la synchronisation de vos données, ce qui peut être lié à un import de form récent. Vérifiez les form que vous étiez en train d'importer pour détecter d'éventuels problèmes, puis reconnectez-vous. Si le problème persiste, contactez votre administrateur.

### « Loading external authentication… » sans redirection

!!! warning
    Ce message apparaît brièvement lors de la finalisation d'une connexion via Microsoft ou Google. Si la page ne poursuit pas automatiquement après quelques secondes, essayez de vous reconnecter. Si le problème se répète, contactez votre administrateur pour vérifier que le service d'authentification externe est correctement configuré.