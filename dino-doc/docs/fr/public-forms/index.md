---
title: Formulaires publics
description: Comment accéder à un formulaire public dans Dino, le remplir et l'envoyer sans avoir besoin d'un compte.
---

# Formulaires publics

Les formulaires publics permettent à toute personne disposant d'un lien d'envoyer des données à Dino sans avoir à se connecter ni à posséder un compte. Ils sont couramment utilisés pour des sondages, des inscriptions ou la collecte de retours. Si vous avez reçu un lien public vers un formulaire, cette page vous explique comment le remplir.

Les adresses des formulaires publics suivent le modèle `/f/` suivi d'un identifiant unique (par exemple `https://your-dino-instance.com/f/963f643f-ad55-4b85-a3d6-100b113f2e9a`). Cet identifiant correspond à l'ID du form schema. Si une valeur de métrique doit être ajoutée aux données du formulaire, elle peut être incluse dans l'URL à l'aide de la syntaxe suivante (ici, dans le cas d'une métrique) : `https://your-dino-instance.com/f/963f643f-ad55-4b85-a3d6-100b113f2e9a?case=a6408e72-c60c-4d54-ad2f-44fd4a90cdb2`
où l'ID de la valeur de métrique est là encore l'ID de la métrique attribué par Dino.

Il n'est pas nécessaire de mémoriser cette syntaxe, car le lien est généré automatiquement par Dino dès que vous cliquez sur l'icône de partage du form schema. Une fois généré, le lien peut être partagé par e-mail, WhatsApp ou tout autre moyen.

---

## Accéder à un formulaire public

1. Cliquez sur le lien du formulaire public que vous avez reçu (par e-mail ou dans un message partagé, par exemple). Le lien vous dirigera vers `/f/...` sur votre instance Dino.
2. Le formulaire s'ouvre directement dans votre navigateur web. Vous n'avez pas besoin de vous connecter.
3. Vérifiez le titre du formulaire ainsi que l'éventuel texte d'introduction pour confirmer qu'il s'agit du bon formulaire.

!!! tip
    Les liens des formulaires publics contiennent un identifiant long (comme `/f/abc123def`). Si la page ne se charge pas, assurez-vous que le lien a été copié dans son intégralité.

---

## Remplir et envoyer

1. Remplissez tous les champs du formulaire. Les champs marqués d'un astérisque (*) sont **obligatoires**.
2. Si le formulaire comporte plusieurs sections, utilisez les onglets ou les boutons de navigation situés en haut du formulaire pour passer de l'une à l'autre.
3. Au fur et à mesure que vous remplissez les champs, le formulaire valide vos saisies. Les entrées invalides sont généralement mises en évidence.
4. Une fois que tous les champs obligatoires sont valides, le bouton d'envoi principal (généralement un bouton circulaire avec une icône d'envoi) devient actif.
5. Cliquez sur le bouton d'envoi pour transmettre vos données.

!!! warning
    Le bouton d'envoi reste désactivé (grisé) si un champ obligatoire est vide ou contient des données invalides. Parcourez le formulaire pour repérer et corriger les problèmes signalés.

---

## Après l'envoi

Une fois l'envoi réussi, un écran de confirmation s'affiche avec une coche et le message : **« Le formulaire a bien été envoyé. »**

Une notification apparaît également en bas de votre écran. Depuis cette notification, vous pouvez :

*   **Remplir un autre formulaire** : cliquez ici pour recharger la page avec une copie vierge du même formulaire et effectuer un nouvel envoi.
*   **Fermer** : fermer la notification.

---

## Dépannage

### Le bouton d'envoi est désactivé.
Cela signifie que le formulaire n'est pas encore valide. Vérifiez les points suivants :

*   **Champs obligatoires vides** : assurez-vous que tous les champs marqués d'un astérisque (*) sont remplis.
*   **Données invalides** : recherchez les champs mis en évidence en rouge et corrigez les informations (par exemple, un format d'e-mail invalide).

### « Impossible d'enregistrer le formulaire. »
Votre envoi a rencontré une erreur temporaire, souvent liée à votre connexion internet.

1. Cliquez sur **« Réessayer »** dans la notification en bas de l'écran.
2. Si l'erreur persiste, vérifiez votre connexion internet et essayez d'actualiser la page.
3. Si le problème persiste, contactez la personne qui vous a envoyé le lien du formulaire.

### « Oups ! Nous n'avons pas pu trouver ce form schema. »
Le lien que vous utilisez est incorrect ou le formulaire a été supprimé.

*   Vérifiez que l'URL est complète et correcte.
*   Contactez la personne qui vous a partagé le lien pour en obtenir une version à jour.

### Le formulaire ne se charge pas (page blanche).

*   Actualisez la page de votre navigateur.
*   Assurez-vous que votre connexion internet est stable.
*   Vérifiez que le lien est complet et n'a pas été tronqué.