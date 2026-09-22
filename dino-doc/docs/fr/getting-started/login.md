---
title: Connexion
description: Comment se connecter à Dino, réinitialiser votre mot de passe, créer un compte et utiliser des fournisseurs de connexion externes.
---

# Se connecter à Dino

La page de connexion est le point de départ pour accéder à Dino. À partir de là, vous pouvez vous connecter à votre compte, créer un nouveau compte ou récupérer l'accès si vous avez oublié votre mot de passe. Selon la façon dont votre organisation a configuré Dino, certaines des options décrites ci-dessous peuvent ne pas être visibles.

![Vue principale de la page de connexion](../imgs/getting-started/login.png)

---

## Se connecter

Utilisez vos identifiants pour accéder à la plateforme.

1.  Sur la page de connexion, saisissez votre **nom d'utilisateur ou adresse e-mail** dans le premier champ.
2.  Saisissez votre **mot de passe** dans le deuxième champ.
3.  Cliquez sur le **bouton fléché** pour vous connecter.

Si vos identifiants sont corrects, vous serez automatiquement redirigé vers le [Tableau de bord](../dashboard/index.md).

Si la connexion échoue, un message d'erreur apparaîtra sous le formulaire. Vérifiez que votre e-mail et votre mot de passe sont corrects, en vous assurant qu'il n'y a pas d'espaces superflus, puis réessayez.

---

## Réinitialiser votre mot de passe

Si vous avez oublié votre mot de passe, vous pouvez demander un lien de réinitialisation par e-mail.

!!! note "Fonctionnalité facultative"
    Cette option peut ne pas être disponible dans votre installation. Si vous ne voyez pas le lien « Mot de passe oublié ? », contactez votre administrateur.

1.  Sur la page de connexion, cliquez sur **« Mot de passe oublié ? »** sous le formulaire de connexion.
2.  Saisissez l'**adresse e-mail** associée à votre compte.
3.  Cliquez sur le **bouton fléché** pour envoyer la demande.

Un message de confirmation s'affichera en haut de l'écran. Consultez votre boîte de réception pour trouver un e-mail contenant un lien permettant de définir un nouveau mot de passe. Si l'e-mail n'arrive pas dans les quelques minutes qui suivent, vérifiez votre dossier de spam.

Pour revenir au formulaire de connexion sans réinitialiser votre mot de passe, cliquez sur **« En fait, je me souviens de mon mot de passe »**.

Pour plus de détails, consultez la page [Réinitialiser le mot de passe](reset-password.md).

---

## Créer un nouveau compte

Si vous n'avez pas encore de compte, vous pourrez peut-être vous inscrire directement depuis la page de connexion.

!!! note "Fonctionnalité facultative"
    Cette option peut ne pas être disponible dans votre installation. Si vous ne voyez pas le lien « Nouvel utilisateur ? Créer un nouveau compte », contactez votre administrateur pour qu'un compte soit créé pour vous.

1.  Sur la page de connexion, cliquez sur **« Nouvel utilisateur ? Créer un nouveau compte »**.
2.  Saisissez votre **nom complet**.
3.  Saisissez votre **adresse e-mail**.
4.  Choisissez un **mot de passe** (au moins 9 caractères).
5.  Saisissez à nouveau votre mot de passe dans le champ **Confirmer le mot de passe** pour vous assurer qu'il correspond.
6.  Si une **politique de confidentialité** est affichée, lisez le texte et cochez la case pour accepter les termes et conditions. Vous devez accepter pour continuer.
7.  Cliquez sur le **bouton fléché** pour créer votre compte.

Une fois votre compte créé, vous serez connecté et automatiquement redirigé vers le [Tableau de bord](../dashboard/index.md).

Si vous avez déjà un compte, cliquez sur **« Vous avez déjà un compte ? Connexion »** pour revenir au formulaire de connexion.

---

## Se connecter avec un compte externe

Votre organisation peut vous permettre de vous connecter à l'aide de votre compte Microsoft ou Google existant, plutôt qu'avec un mot de passe Dino distinct.

!!! note "Fonctionnalité facultative"
    Cette option peut ne pas être disponible dans votre installation. Les boutons n'apparaîtront que si votre administrateur a activé la connexion externe.

1.  Sur la page de connexion, cliquez sur **« Se connecter avec Microsoft »** ou **« Se connecter avec Google »**, selon le compte que vous souhaitez utiliser.
2.  Vous serez redirigé vers Microsoft ou Google pour confirmer votre identité.
3.  Après avoir autorisé l'accès, vous serez ramené vers Dino et connecté automatiquement.

---

## Paramètres de la page

Quelques préférences d'affichage sont disponibles directement sur la page de connexion.

### Thème clair / sombre

Un interrupteur est disponible en bas du formulaire, entre une icône de soleil et une icône de lune. Cliquez dessus ou faites-le glisser pour basculer entre le **mode clair** et le **mode sombre**. Ce paramètre prend effet immédiatement.

### Sélection de la plateforme

!!! note "Fonctionnalité facultative"
    Cette option peut ne pas être disponible dans votre installation. Elle n'est affichée que dans les déploiements multi-plateformes.

Si une liste déroulante **« Choisissez votre plateforme »** est visible, sélectionnez la plateforme à laquelle vous souhaitez vous connecter avant de vous connecter. La liste déroulante indiquera les environnements configurés par votre administrateur.

---

## Résolution des problèmes

### « Un problème est survenu lors de la connexion au serveur d'authentification ou votre jeton a expiré. »

!!! warning
    Votre session précédente a expiré ou la connexion au serveur d'authentification a été interrompue. Il ne s'agit pas d'une erreur de votre part. Saisissez simplement vos identifiants et connectez-vous à nouveau.

### « Un problème est survenu lors du processus de synchronisation. »

!!! warning
    Une erreur s'est produite lors de la synchronisation de vos données, ce qui peut être lié à un import de formulaire récent. Vérifiez les formulaires que vous étiez en train d'importer pour détecter d'éventuels problèmes, puis reconnectez-vous. Si le problème persiste, contactez votre administrateur.

### « Chargement de l'authentification externe… » sans redirection

!!! warning
    Ce message apparaît brièvement lors de la connexion via Microsoft ou Google. Si la page ne progresse pas automatiquement après quelques secondes, essayez de vous connecter à nouveau. Si le problème se répète, contactez votre administrateur pour vérifier que le service d'authentification externe est correctement configuré.