---
title: Connexion
description: Comment se connecter à Dino, réinitialiser votre mot de passe, créer un compte et utiliser les fournisseurs de connexion externes.
---

# Se connecter à Dino

La page de connexion est le point de départ pour accéder à Dino. Depuis cette page, vous pouvez vous connecter à votre compte, créer un nouveau compte ou récupérer l'accès si vous avez oublié votre mot de passe. Selon la configuration de Dino par votre organisation, certaines options décrites ci-dessous peuvent ne pas être visibles.

![Main view of the Login page](../imgs/getting-started/login.png)

---

## Se connecter

Utilisez vos identifiants pour accéder à la plateforme.

1.  Sur la page de connexion, saisissez votre **nom d'utilisateur ou adresse e-mail** dans le premier champ.
2.  Saisissez votre **mot de passe** dans le deuxième champ.
3.  Cliquez sur le **bouton fléché** pour vous connecter.

Si vos identifiants sont corrects, vous serez automatiquement redirigé vers le [Tableau de bord](../dashboard/index.md).

Si la connexion échoue, un message d'erreur apparaîtra sous le formulaire. Vérifiez que votre adresse e-mail et votre mot de passe sont corrects, en vous assurant qu'il n'y a pas d'espaces superflus, puis réessayez.

---

## Réinitialisation de votre mot de passe

Si vous avez oublié votre mot de passe, vous pouvez demander un lien de réinitialisation par e-mail.

!!! note "Fonctionnalité facultative"
    Cette option peut ne pas être disponible dans votre installation. Si vous ne voyez pas le lien « Mot de passe oublié ? », contactez votre administrateur.

1.  Sur la page de connexion, cliquez sur **« Mot de passe oublié ? »** sous le formulaire de connexion.
2.  Saisissez l'**adresse e-mail** associée à votre compte.
3.  Cliquez sur le **bouton fléché** pour envoyer la demande.

Un message de confirmation s'affichera en haut de l'écran. Consultez votre boîte de réception pour trouver un e-mail contenant un lien permettant de définir un nouveau mot de passe. Si l'e-mail n'arrive pas dans un délai de quelques minutes, vérifiez votre dossier de courrier indésirable.

Pour revenir au formulaire de connexion sans réinitialiser votre mot de passe, cliquez sur **« En fait, je me souviens de mon mot de passe »**.

Pour plus de détails, consultez la page [Réinitialisation du mot de passe](reset-password.md).

---

## Création d'un nouveau compte

Si vous n'avez pas encore de compte, vous pourrez peut-être vous inscrire directement depuis la page de connexion.

!!! note "Fonctionnalité facultative"
    Cette option peut ne pas être disponible dans votre installation. Si vous ne voyez pas le lien « Nouvel utilisateur ? Créer un compte », contactez votre administrateur pour qu'un compte soit créé pour vous.

1.  Sur la page de connexion, cliquez sur **« Nouvel utilisateur ? Créer un compte »**.
2.  Saisissez votre **nom complet**.
3.  Saisissez votre **adresse e-mail**.
4.  Choisissez un **mot de passe** (d'au moins 9 caractères).
5.  Saisissez à nouveau votre mot de passe dans le champ **Confirmer le mot de passe** pour vous assurer qu'il correspond.
6.  Si une **Politique de confidentialité** est affichée, lisez le texte et cochez la case pour accepter les conditions générales. Vous devez accepter pour continuer.
7.  Cliquez sur le **bouton fléché** pour créer votre compte.

Une fois votre compte créé, vous serez connecté et redirigé automatiquement vers le [Tableau de bord](../dashboard/index.md).

Si vous avez déjà un compte, cliquez sur **« Déjà un compte ? Se connecter »** pour revenir au formulaire de connexion.

---

## Connexion avec un compte externe

Votre organisation peut vous permettre de vous connecter avec votre compte Microsoft ou Google existant, au lieu d'un mot de passe Dino distinct.

!!! note "Fonctionnalité facultative"
    Cette option peut ne pas être disponible dans votre installation. Les boutons n'apparaîtront que si votre administrateur a activé la connexion externe.

1.  Sur la page de connexion, cliquez sur **« Connexion avec Microsoft »** ou **« Connexion avec Google »**, selon le compte que vous souhaitez utiliser.
2.  Vous serez redirigé vers Microsoft ou Google pour confirmer votre identité.
3.  Après avoir autorisé l'accès, vous serez ramené à Dino et connecté automatiquement.

---

## Paramètres de la page

Un petit ensemble de préférences d'affichage est disponible directement sur la page de connexion.

### Thème clair / sombre

Un bouton à bascule est disponible en bas du formulaire, entre une icône de soleil et une icône de lune. Cliquez dessus ou faites-le glisser pour passer du **mode clair** au **mode sombre**. Ce paramètre prend effet immédiatement.

### Sélection de la plateforme

!!! note "Fonctionnalité facultative"
    Cette option peut ne pas être disponible dans votre installation. Elle n'est affichée que dans les déploiements multi-plateformes.

Si une liste déroulante **« Choisissez votre plateforme »** est visible, sélectionnez la plateforme à laquelle vous souhaitez vous connecter avant de vous connecter. La liste déroulante répertorie les environnements configurés par votre administrateur.

---

## Dépannage

### « Un problème est survenu lors de la connexion au serveur d'authentification ou votre jeton a expiré. »

!!! warning
    Votre session précédente a expiré ou la connexion au serveur d'authentification a été interrompue. Ce n'est pas une erreur de votre part. Saisissez simplement vos identifiants et reconnectez-vous.

### « Un problème est survenu pendant le processus de synchronisation. »

!!! warning
    Une erreur s'est produite lors de la synchronisation de vos données, ce qui peut être lié à une importation récente de formulaires. Examinez les formulaires que vous importiez pour détecter d'éventuels problèmes, puis reconnectez-vous. Si le problème persiste, contactez votre administrateur.

### « Chargement de l'authentification externe… » sans redirection

!!! warning
    Ce message apparaît brièvement lors de la finalisation d'une connexion via Microsoft ou Google. Si la redirection ne s'effectue pas automatiquement après quelques secondes, essayez de vous reconnecter. Si le problème se reproduit, contactez votre administrateur pour vérifier que le service d'authentification externe est correctement configuré.