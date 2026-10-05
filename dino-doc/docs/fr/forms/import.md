---
title: Importer des données
description: Apprenez à importer en masse des données structurées dans n'importe quel form schema à l'aide d'un fichier CSV ou Excel. L'assistant vous permet de téléverser un fichier, d'associer ses colonnes aux champs du form et de consulter le résultat de l'importation.
---

# Importer des données

La page **Importer des données** vous permet de téléverser en masse des données dans un form schema à partir d'un fichier `.xls`, `.xlsx` ou `.csv`. Un assistant en trois étapes — **Téléverser un fichier**, **Associer les champs**, **Résultat** — vous guide pour téléverser le fichier, associer ses colonnes aux champs du form et consulter le résultat.

![Vue principale de la page Importer des données](../imgs/forms/import.png)

## Accéder à la page d'importation

1. Accédez à la liste **Formulaires** et sélectionnez un form schema.
2. Depuis la vue des données du form, cliquez sur **Importer des formulaires** dans la barre d'outils.

## Étape 1 — Téléverser un fichier

La première étape affiche une zone de glisser-déposer ou un sélecteur de fichier.

- **Formats acceptés :** `.xls`, `.xlsx`, `.csv`
- **Taille maximale du fichier :** 20 Mo

Pour téléverser :

1. (Facultatif) Laissez cochée l'option **Réutiliser les métriques existantes portant le même nom** (par défaut) afin que toute métrique du fichier dont le nom correspond à une métrique déjà présente dans le système soit liée à cette métrique existante plutôt que de créer un doublon. Décochez-la pour toujours créer de nouvelles métriques.
2. Glissez un fichier sur la zone en pointillés **ou** cliquez sur **Choisir un fichier** pour parcourir vos dossiers.
3. Une fois le fichier lu, l'assistant passe automatiquement à **Associer les champs**.

### Formater le fichier d'importation
Consultez la description dans la section [ci-dessous](#format-de-fichier)

!!! tip "Formats de fichier faciles"
    Dino accepte le même fichier que celui obtenu lors de l'[exportation](index.md#exportation). Ainsi, la façon la plus simple d'obtenir un fichier correctement formaté pour l'importation consiste à exporter d'abord des données depuis le même schema, puis à supprimer les lignes contenant les données exportées en ne conservant que les en-têtes de colonnes. Dans tous les cas, assurez-vous que vos en-têtes de colonnes sont clairs : ils serviront de suggestions lors de l'association.

!!! note "Métriques identifiées par ID"
    Si une colonne de métrique de votre fichier fournit l'**ID** (UUID) de la métrique, cette ligne est liée à la métrique existante portant cet ID et aucune nouvelle métrique n'est créée. L'ID prime sur le nom de la métrique, et cela se produit donc indépendamment de l'option **Réutiliser les métriques existantes portant le même nom** (qui ne s'applique qu'à la correspondance par nom).

## Étape 2 — Associer les champs

Après le téléversement, un tableau répertorie toutes les colonnes de votre fichier. Chaque ligne comporte trois colonnes :

- **Colonne du fichier** – l'en-tête d'origine de votre fichier.
- **Champ** – une liste déroulante dans laquelle vous sélectionnez le champ du form correspondant.
- **Statut** – indique si la colonne est associée, ignorée ou en erreur.

### Actions d'association

- **Sélectionner un champ du form** – ouvrez la liste déroulante d'une colonne et choisissez le champ correct. Vous pouvez effectuer une recherche dans la liste déroulante.
- **Ignorer une colonne** – sélectionnez l'option **— Ignorer cette colonne —** dans la liste déroulante, ou cliquez sur le bouton **Ignorer** dans la colonne du statut. Les colonnes ignorées sont grisées.
- **Restaurer une colonne ignorée** – cliquez sur le bouton **Restaurer** dans la colonne du statut.

### Correspondance automatique

Lors de la lecture du fichier, Dino associe chaque colonne dont l'en-tête correspond exactement au nom d'un champ du form, ou au nom d'un champ répétitif suivi de `__N` (voir [Diapositives répétitives](#diapositives-répétitives)). Les autres colonnes restent à associer manuellement.

Cliquez sur **Tout réassocier** pour réinitialiser toutes les colonnes et laisser Dino les associer à nouveau, en rapprochant cette fois aussi les colonnes des champs dont les noms ou les libellés sont similaires. Vérifiez le résultat et ajustez les associations si nécessaire.

!!! tip "L'association est plus efficace avec des en-têtes qui reprennent les noms des champs, comme dans un fichier exporté."

### Répétition

Si le champ du form sélectionné est un champ répétitif (par exemple, plusieurs numéros de téléphone), un champ **Répétition** apparaît sous la liste déroulante. Saisissez l'index de répétition (0, 1, 2, …) pour affecter cette colonne du fichier à une occurrence du groupe répétitif.

### Résumé de la barre d'outils

En haut de la zone d'association, trois indicateurs s'affichent :

- **Total des colonnes** – nombre de colonnes du fichier.
- **Associé** – colonnes affectées à un champ du form.
- **Ignoré** – colonnes que vous avez choisi d'ignorer.

Utilisez le champ **Rechercher des colonnes…** pour filtrer le tableau par nom de colonne du fichier.

Cliquez sur **Retour** pour revenir à l'étape de téléversement : le fichier et les associations sont abandonnés, et vous choisissez à nouveau le fichier.

Lorsque toutes les colonnes souhaitées sont associées et qu'aucune erreur ne subsiste, le bouton **Appliquer l'importation** devient actif. Cliquez dessus pour lancer l'importation. Pendant le traitement, un indicateur de chargement s'affiche.

!!! warning "Association en double"
    Si vous associez le même champ du form à plusieurs colonnes du fichier, une erreur de validation s'affiche (*Champ associé à plusieurs colonnes*) et le bouton **Appliquer l'importation** reste inactif jusqu'à correction.

## Étape 3 — Résultat

La dernière étape indique ce qui s'est passé :

- Une bannière vous indique si l'importation a **réussi**, a été **partielle** (certaines lignes ont été rejetées) ou s'est terminée par une **ERREUR** (rien n'a été importé).
- Des compteurs affichent **Lignes importées**, **Lignes rejetées**, **Lignes du fichier** et **Métriques créées**.
- Les listes de problèmes indiquent les lignes du fichier concernées et la raison. Utilisez **Rechercher par ligne ou erreur** pour filtrer les longues listes.

Cliquez sur **Fermer** pour revenir à la liste de form, où les nouvelles données apparaissent. Après une erreur, **Retour** vous ramène à l'étape d'association pour corriger les problèmes.


## Format de fichier

Nous décrivons la procédure permettant d'importer des données en masse à l'aide d'un fichier Excel généré depuis Google Sheets. La même procédure s'applique aux fichiers CSV ou si vous travaillez directement avec Excel.

Nous supposons que vous souhaitez importer des données dans un form appelé Projects comportant 2 diapositives, dont l'une est une diapositive répétitive :

![Le form Projects, avec deux diapositives dont l'une est répétitive](../imgs/forms/import-repeating-slide.png)

Le form Projects a été créé à l'aide du XLSForm suivant. La feuille « survey » est

| type | name | label |
| ----- | ----- | ----- |
| **begin group** | **start** | **Start** |
| select\_one countries | country | Country |
| select\_multiple countries | country\_other | Other Countries |
| text | title | Project Title |
| date | project\_date\_start | Start date |
| select\_one donors | selected\_donor | Donor |
| integer | budget | Budget |
| boolean | isleader | Leading applicant |
| **end group** |  |  |
| **begin repeat** | **indicators** | **Indicators** |
| text | indic | Indicator description |
| integer | value\_indic | Value reached |
| **end repeat** |  |  |

et la feuille « choices » est

| list\_name | name | label |
| ----- | ----- | ----- |
| donors | ue | UE |
| donors | govita | ITALIAN GOVERNMENT |
| donors | un | UN |
| donors | pub | ALTRI DONATORI PUBBLICI |
| donors | la | ENTI LOCALI |
| donors | priv | DONATORI PRIVATI |
| donors | other | Others |
|  |  |  |
| countries | AFG | Afghanistan |
| countries | ALB | Albania |
| countries | DZA | Algeria |
| countries | ASM | American Samoa |

Suivez ces étapes :

1. Créez un fichier vide ne contenant qu'une seule feuille (les noms du fichier et de la feuille n'ont pas d'importance).   
2. Dans la première ligne, vous devez indiquer les noms des champs du form ainsi que ceux des champs spécifiques à DINO. Dans cet exemple, les champs du form peuvent être :  
   1. **country**  
   2. **country\_other**  
   3. **title**  
   4. **project\_date\_start**  
   5. **selected\_donor**  
   6. **budget**  
   7. **isleader**  
   8. ***indic*** (\*)  
   9. ***value\_indic*** (\*)

   veillez à ce que les champs situés dans des diapositives répétitives soient traités différemment (c'est pourquoi nous avons mis un astérisque). Reportez-vous à la section spécifique ci-dessous.

   Les champs spécifiques à DINO peuvent être :

   10. **created\_at**. La date de création du form. Indiquez-la uniquement si vous souhaitez que vos forms aient une date de création différente de la date d'importation ;  
   11. **user\_data\_ref\_id**. L'ID de l'utilisateur qui sera associé au form. Il s'applique uniquement lorsqu'un administrateur effectue l'importation ; pour les autres utilisateurs, la valeur est ignorée et les forms sont attribués à l'utilisateur qui les importe ;  
   12. **area\_id**. L'ID de la métrique AREA à associer au form ;  
   13. \[area\_name\]  
   14. **case\_id**. L'ID de la métrique CASE à associer au form ;  
   15. \[case\_name\]	  
   16. **project\_id**. L'ID de la métrique PROJECT à associer au form ;  
   17. \[project\_name\]  
   18. \[project\_code\]  
   19. **location\_id**. L'ID de la métrique LOCATION à associer au form ;  
   20. \[location\_name\]  
   21. **organization\_id**. L'ID de la métrique ORGANISATION à associer au form ;  
   22. \[organization\_name\]  
   23. **form\_status\_name**. Le nom de l'un des statuts du form schema. Les lignes qui n'en comportent pas reçoivent le premier statut du schema. Si une valeur ne correspond à aucun nom de statut existant, le fichier n'est pas importé (*Statuts non valides*) ;  
   24. **dinoinvalid**. Marque le form comme invalide. Utilisez `true`, `1`, `yes`, `y` ou `x` ; toute autre valeur ou une cellule vide laisse le form valide.

3. chaque ligne correspondra à un nouveau form différent. Ainsi, si nous créons un fichier avec un en-tête et, disons, 5 lignes de données, si le téléversement réussit, nous créerons 5 nouveaux forms dans DINO.   
4. Il n'est pas nécessaire d'avoir une colonne pour chaque champ du form ; il n'est pas nécessaire de remplir toutes les lignes d'une colonne donnée, mais si un champ est vide pour toutes les lignes, il peut être omis,   
5. Les champs de date doivent être formatés AAAA-MM-JJ sous forme de texte (attention).   
6. Les champs à choix unique doivent contenir l'une des options acceptées telles que spécifiées dans les « choices » (voir le form builder ou le fichier XLSForm).   
7. Les champs à choix multiple doivent être formatés selon le modèle suivant : \[opt1, opt2\] (c'est-à-dire une liste d'options entre crochets).

Par exemple, un fichier valide pourrait être le suivant :

| country | country\_other | title | project\_date\_start | budget | isleader | area\_id |
| :---- | :---- | :---- | :---- | ----- | :---- | :---- |
| ALB | \[AFG,DZA\] | Human rights in education | 2022-01-28 | 120000 | true | 81387ff7-5c7d-44e7-9dc6-76b8d09265ac |
| ASM |  | A new approach to social justice | 2022-02-14 | 20000 |  | 81387ff7-5c7d-44e7-9dc6-76b8d09265ac |

Dans ce cas, nous importons 2 forms et, pour les deux, nous ne sélectionnons que la métrique AREA. De plus, notez que nous ne fournissons pas tous les champs du form pour tous les forms, mais que pour les champs où nous fournissons une valeur, nous suivons strictement les indications décrites ci-dessus.

### Gérer les métriques lors de l'importation

Lors de l'importation de données, en ce qui concerne les métriques, vous pouvez souhaiter :

- créer de nouvelles métriques lors de l'importation  
- réutiliser des métriques déjà créées

Les règles à suivre pour gérer correctement les métriques sont les suivantes :

| MÉTRIQUE | CRÉER DEPUIS L'INTERFACE | CRÉER DEPUIS L'IMPORTATION | CRÉER \+ ASSOCIER DEPUIS L'IMPORTATION | UTILISER DEPUIS L'IMPORTATION | CRÉER \+ ASSOCIER DEPUIS L'IMPORTATION (parent) | UTILISER COMME PARENT |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| **Cas** | nom | nom | nom | id, ou nom (avec l'option de réutilisation), ou les deux | nom, dans une autre ligne du même fichier | id ou nom |
| **Organisation** | nom | nom | nom | id, ou nom (avec l'option de réutilisation), ou les deux | nom, dans une autre ligne du même fichier | id ou nom |
| **Emplacement** | nom | nom | nom | id, ou nom (avec l'option de réutilisation), ou les deux | nom, dans une autre ligne du même fichier | id ou nom |
| **Domaine** | nom | nom | nom | id, ou nom (avec l'option de réutilisation), ou les deux | nom, dans une autre ligne du même fichier | id ou nom |
| **Projet** | nom, code | nom, code | nom, code | id, ou nom (avec l'option de réutilisation), ou les deux | nom et code, dans une autre ligne du même fichier | id ou nom |

Lorsqu'une ligne comporte à la fois l'id et le nom d'une métrique, l'id l'emporte et le nom est ignoré. Une nouvelle métrique n'est créée que lorsque le nom est fourni et que l'id est vide.

Les parents sont définis à l'aide des colonnes `<metric>_parent_id` et `<metric>_parent_name` (par exemple `location_parent_name`), et ne s'appliquent qu'aux métriques créées par l'importation. Le parent doit être du même type de métrique et soit déjà exister, soit être créé par une autre ligne du même fichier, dans n'importe quel ordre. Un parent qui ne correspond à rien n'est pas créé : cette métrique est signalée comme *métrique avec un parent non valide*.

## Diapositives répétitives

Si vous avez des champs dans des diapositives répétitives, ils doivent être nommés différemment. Chaque champ de la diapositive répétitive doit être nommé \<field\_name\>\_\_X où X est le numéro de répétition, de 0 (correspondant à une répétition) à N-1, où N est le nombre total de répétitions de la diapositive dans ce form.   
Par exemple, supposons que vous n'ayez qu'une seule répétition de la diapositive répétitive et que vous souhaitiez ajouter les deux champs « Indicator description » et « Value reached ». Vous devrez alors ajouter ces deux colonnes à votre fichier d'importation :

| indic\_\_0 | value\_indic\_\_0 |
|  :---- | ----- |
| Number of children | 100 |

Ainsi, par exemple, nous pourrions avoir :

| country | budget | indic\_\_0 | value\_indic\_\_0 | indic\_\_1 | value\_indic\_\_1 | isleader |
| :---- | ----- | :---- | ----- | :---- | ----- | :---- |
| ALB | 120000 | Children | 100 |  |  | true |
| ASM | 20000 |  |  |  |  |  |
| AFG | 15000 | Parents | 45 | Schools | 34 | true |

## Erreurs

- **IDs inconnus** – si une colonne fait référence à un utilisateur ou à une métrique par un ID qui n'existe pas dans Dino, le fichier entier n'est pas importé (*Fichier non importé!*), et le résultat indique les *Identifiants utilisateur non valides* ou les *Identifiants de métrique non valides*. Vérifiez les IDs de votre fichier avant l'importation.
- **Statut de form inconnu** – un `form_status_name` qui ne correspond à aucun statut du schema interrompt également l'importation (*Statuts non valides*).
- **Métriques impossibles à lier** – une ligne qui nomme une métrique que Dino ne peut ni créer ni trouver est rejetée, et le résultat en indique la raison ; les autres lignes sont importées.