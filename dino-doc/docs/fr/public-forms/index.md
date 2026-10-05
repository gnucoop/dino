---
title: Formulaires publics
description: Comment accéder à un formulaire public dans Dino, le remplir et l'envoyer sans avoir besoin d'un compte.
---

# Formulaires publics

Les formulaires publics permettent à toute personne disposant d'un lien de soumettre des données à Dino sans avoir à se connecter ni à créer un compte. Ils sont couramment utilisés pour des enquêtes, des inscriptions ou la collecte de retours. Si vous avez reçu un lien public vers un formulaire, vous pouvez utiliser cette page pour le remplir.

Les adresses des formulaires publics suivent le modèle `/f/` suivi d'un identifiant unique (par exemple, `https://votre-instance-dino.com/f/963f643f-ad55-4b85-a3d6-100b113f2e9a`). L'identifiant correspond à l'ID du form schema. Si une valeur de métrique doit être ajoutée aux données du formulaire, elle peut être incluse dans l'URL à l'aide de la syntaxe suivante (par exemple, pour le cas d'une métrique) : `https://votre-instance-dino.com/f/963f643f-ad55-4b85-a3d6-100b113f2e9a?case=a6408e72-c60c-4d54-ad2f-44fd4a90cdb2`
où l'ID de la valeur de métrique correspond à nouveau à l'ID de la métrique attribué par Dino.

Il n'est pas nécessaire de mémoriser cette syntaxe, car le lien est généré automatiquement par Dino dès que vous cliquez sur l'icône de partage du form schema. Une fois généré, le lien peut être partagé par e-mail, WhatsApp ou tout autre moyen.

---

## Accéder à un formulaire public

1.  Cliquez sur le lien du formulaire public que vous avez reçu (par exemple, par e-mail ou dans un message partagé). Le lien vous dirigera vers `/f/...` sur votre instance Dino.
2.  Le formulaire s'ouvre directement dans votre navigateur web. Vous n'avez pas besoin de vous connecter.
3.  Vérifiez le titre du formulaire et tout texte d'introduction pour confirmer qu'il s'agit du bon formulaire.

Un sélecteur de langue dans la barre supérieure de l'écran vous permet de choisir la langue du formulaire. Utilisez-le pour basculer le formulaire dans la langue de votre choix avant de commencer à le remplir.

Si le formulaire comporte plusieurs sections, une barre de progression s'affiche sous le titre pour vous indiquer où vous en êtes.

!!! tip
    Les liens des formulaires publics contiennent un identifiant long (comme `/f/abc123def`). Si la page ne se charge pas, vérifiez que le lien complet a bien été copié.

---

## Remplir et envoyer

1.  Remplissez tous les champs du formulaire. Les champs marqués d'un astérisque (*) sont **requis**.
2.  Si le formulaire comporte plusieurs sections, utilisez les boutons **Suivant** et **Précédent** en bas du formulaire pour passer de l'une à l'autre. Le titre de la section s'affiche en haut de chaque étape.
3.  Au fur et à mesure que vous remplissez les champs, le formulaire valide votre saisie. Les entrées non valides sont généralement mises en évidence.
4.  Une fois que tous les champs requis sont valides, le bouton **Envoyer** devient actif.
5.  Cliquez sur **Envoyer** pour soumettre vos données.

!!! warning
    Le bouton **Suivant** reste désactivé si la section actuelle n'est pas encore valide, et le bouton **Envoyer** reste désactivé (grisé) si un champ requis est vide ou contient des données non valides. Vérifiez la section actuelle ou revenez aux sections précédentes pour repérer et corriger les problèmes signalés.

---

## Après l'envoi

Une fois l'envoi réussi, un écran de confirmation s'affiche avec une coche et le message : **« Le formulaire a été envoyé avec succès. »**

Une notification apparaît également en bas de votre écran pendant quelques secondes. Cliquez sur **Remplir un autre formulaire** pour recharger la page avec une copie vierge du même formulaire, ce qui vous permet de faire un nouvel envoi.

---

## Résolution des problèmes

### Le bouton Suivant ou Envoyer est désactivé.
Cela signifie que la section actuelle ou le formulaire dans son ensemble n'est pas encore valide. Vérifiez les points suivants :

*   **Champs requis vides** : assurez-vous que tous les champs marqués d'un astérisque (*) sont remplis.
*   **Données non valides** : recherchez les champs mis en évidence en rouge et corrigez les informations (par exemple, un format d'e-mail non valide).

### « Ce formulaire ne peut pas être ouvert car des informations requises manquent dans le lien. »
Le lien que vous avez utilisé est incomplet. Certains formulaires nécessitent des informations de métrique (comme un cas, une posizione ou une organisation) à inclure dans l'adresse.

*   Contactez la personne qui vous a envoyé le lien du formulaire et demandez-lui de partager le lien complet.

### « Impossible d'enregistrer le formulaire. »
Votre envoi a rencontré une erreur temporaire, souvent liée à votre connexion internet.

1.  Vérifiez votre connexion internet.
2.  Cliquez sur **« Réessayer »** dans la notification en bas de l'écran. Dino renvoie le formulaire avec les réponses que vous avez saisies : vous n'avez pas besoin de le remplir à nouveau.
3.  Si le problème persiste, contactez la personne qui vous a envoyé le lien du formulaire.

### « Oups ! Nous n'avons pas pu trouver ce Form Schema. »
Le lien que vous utilisez est incorrect ou le formulaire a été supprimé.

*   Vérifiez que vous disposez de l'URL complète et correcte.
*   Contactez la personne qui vous a partagé le lien pour en obtenir un à jour.

### Le formulaire ne se charge pas (page blanche).

*   Actualisez la page de votre navigateur.
*   Assurez-vous que votre connexion internet est stable.
*   Confirmez que le lien est complet et n'a pas été tronqué.

---

## Pages associées

*   [Forms](../forms/index.md)
*   [Edit Form Schema](../forms/edit-form-schema.md)
*   [Languages](../administration/languages.md)
*   [Metrics](../metrics/index.md)