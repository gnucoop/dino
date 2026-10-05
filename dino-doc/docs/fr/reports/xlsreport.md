---
title: XLSReport
description: Un aperçu du format basé sur Excel utilisé pour créer des rapports dans Dino.
---

# Le format XLSReport

## Qu'est-ce que XLSReport

XLSReport est un format de création basé sur des feuilles de calcul, qui permet de construire des **rapports DINO / AJF (Advanced JSON Forms)** sans écrire de JSON ni de code à la main. L'auteur d'un rapport remplit un classeur Excel ordinaire (`.xlsx`) en suivant un ensemble de conventions, et un convertisseur (`xls-report.ts`, qui fait partie de la bibliothèque `reports` d'AJF) analyse ce classeur pour en produire un form schema JSON `AjfReport` que la plateforme DINO peut afficher sous forme de tableau de bord dynamique : tableaux, graphiques, chiffres clés, images, graphes, cartes de chaleur, etc.

Deux éléments rendent cela possible :

- **Correspondance feuille-composant** — chaque feuille du classeur (à quelques exceptions près) devient un composant de rapport. L'ordre des feuilles dans le classeur correspond à l'ordre d'empilement des composants dans le rapport affiché.
- **Un petit langage de formules (DSL)** (le « langage des indicateurs ») — les cellules ne contiennent pas seulement des valeurs littérales ; la plupart contiennent de courtes expressions (par ex. `SUM(D04, $persone, $tipo='corso')`) écrites dans un mini-langage compact et restreint à une liste blanche de fonctions. Ce DSL est analysé par `hindikit-parser.ts` et traduit en JavaScript, qui est ensuite exécuté sur les données de form sous-jacentes au moment de l'affichage ou de l'actualisation, à l'aide d'une bibliothèque de fonctions intégrées (`expression-utils.ts`).

Cela signifie qu'un XLSReport est en réalité composé de deux choses superposées : une **description de mise en page** (quelles feuilles produisent quels composants, et dans quel ordre) et une **description de calcul** (quelles formules calculent les nombres, les tableaux et les jeux de données affichés par ces composants). Comme les données sous-jacentes proviennent de form DINO (les données), toute formule XLSReport lit en fin de compte un ou plusieurs jeux de données de form et les met en forme selon les besoins d'un composant (un nombre unique, un tableau pour un graphique, ou un tableau de lignes).

XLSReport est indépendant de la plateforme et du projet : les mêmes conventions de classeur s'appliquent à n'importe quelle instance DINO et à n'importe quel ensemble de form — rien dans le format n'est propre à une organisation ou à un déploiement particulier.

## Structure du fichier

Un XLSReport est un seul classeur `.xlsx`. Le convertisseur parcourt les feuilles du classeur **dans l'ordre** et décide de ce qu'il faut faire de chacune en recherchant une **sous-chaîne de mot-clé dans le nom de la feuille** (et non une correspondance exacte) — par exemple, une feuille nommée `table_activities` ou `2_table` est reconnue comme une feuille de type « table » parce que son nom *contient* `table`.

### Catégories de feuilles

| Le nom de la feuille contient | Rôle |
|---|---|
| `variables` (nom exact) | Déclare les variables/jeux de données nommés utilisés par les feuilles suivantes. Ne produit pas de composant en soi. |
| `filter` | Déclare un form de filtre (au format ODK/XLSForm : `survey` + `choices`) rattaché à la feuille *suivante* du classeur. Ne produit pas de composant en soi. |
| `filter` **et** `global` | Identique à ci-dessus, mais le filtre obtenu s'applique à l'ensemble du rapport plutôt qu'à un seul composant. |
| `choices` | Une feuille d'accompagnement contenant des listes de choix (`list_name`, `name`, `label`), utilisée avec les feuilles `filter`. |
| `table` | Un composant `DynamicTable` ou `PaginatedTable`. |
| `chart` | Un composant `Chart` (barres, lignes, secteurs, etc.). |
| `image` | Un composant `Image`. |
| `html` | Un composant `Text` qui affiche du HTML brut. |
| `graph` | Un composant `Graph` (nœuds/réseau). |
| `heatmap` | Un composant `HeatMap`. |
| `single` | Un ou plusieurs composants `Text` formant une carte d'indicateur / « grand nombre ». |
| `paginatedlist` | Un composant `PaginatedList` (une ligne = un mini composant tableau). |
| `paginatedDialogList` | Un composant `PaginatedList` dont les lignes ouvrent une boîte de dialogue de détail. |

Les noms de feuilles sont libres par ailleurs — utilisez-les pour que le classeur soit auto-documenté (par ex. `table_beneficiaries_by_month`, `chart_gender_split`). Comme la correspondance se fait par sous-chaîne, évitez de choisir des noms qui contiennent accidentellement un autre mot-clé (par ex. ne nommez pas une feuille de graphique `charttable`).

### Conventions de lignes dans une feuille

Chaque feuille de composant est lue comme une conversion normale de feuille de calcul vers JSON : **la ligne 1 contient les en-têtes de colonnes**, et **à partir de la ligne 2 se trouvent les données**, un objet JSON par ligne, indexé par le texte de l'en-tête. Au-delà de cette règle générique, chaque type de feuille définit sa propre signification pour la ligne d'en-tête et la ou les deux premières lignes de données (documentées par composant dans la section 5).

### Mise en page globale

L'ensemble du classeur est encapsulé dans **une mise en page de premier niveau contenant une seule colonne**, et chaque feuille non spéciale contribue à exactement un composant (ou, pour `single`, plusieurs) ajouté à cette colonne dans l'ordre des feuilles. En d'autres termes :

- Le rapport est toujours un **empilement vertical unique de composants** — il n'existe aucun moyen, au niveau de la feuille de calcul, de créer des colonnes côte à côte ou des conteneurs imbriqués ; le seul « emboîtement » possible est généré en interne par `paginatedlist` / `paginatedDialogList` (chaque ligne est elle-même un petit composant tableau ou une boîte de dialogue).
- Une feuille dont le nom contient `filter` rattache son filtre au composant dont la feuille **suit immédiatement** ; une feuille `global filter` se rattache au conteneur externe du rapport plutôt qu'à un seul composant.

### La porte de sortie universelle : `js:`

Toute cellule normalement analysée par le DSL de formules peut à la place commencer par `js:` — tout ce qui suit ce préfixe est traité comme du **JavaScript brut** et transmis sans être analysé. Cela donne accès à toutes les fonctions exportées par la bibliothèque d'utilitaires d'exécution, et pas seulement à celles autorisées par la grammaire du DSL (voir section 4), ainsi qu'à des expressions JS arbitraires (IIFE, utilisation de `Set`/`Map`, fonctions d'aide en ligne personnalisées, etc.). Utilisez-le lorsqu'un calcul ne correspond pas à la liste blanche de fonctions du DSL ou à ses formes d'arguments.

## Déclarer des variables

La feuille `variables` est l'endroit où vous chargez les données de form et précalculez tout ce qui est réutilisé par plusieurs composants plus loin dans le classeur (jeux de données, filtres, valeurs d'indicateurs, libellés).

### Colonnes

| Colonne | Signification |
|---|---|
| `name` | L'identifiant de la variable. Il doit s'agir d'un identifiant valide (lettres, chiffres, tiret bas, ne commençant pas par un chiffre) — les noms invalides sont rejetés. |
| `value` | Une expression, analysée par le même DSL de formules que toutes les autres cellules (ou du JavaScript brut préfixé par `js:`). |
| `isAIPrompt` (facultatives) | Booléen ; marque la variable comme le résultat d'une invite IA plutôt que d'une formule ordinaire, afin qu'elle puisse ensuite être relue avec `PROMPT_RESULT`. |

Les lignes dont le `name` est vide sont ignorées. Les variables sont évaluées de haut en bas, et **chaque variable peut référencer n'importe quelle variable déclarée au-dessus d'elle** par son nom simple (sans préfixe `$` — ce préfixe est réservé aux *champs* de form, voir section 4).

### Charger les données de form

Deux accès à l'exécution sont toujours disponibles :

- `forms['<form name>']` — le tableau brut des données d'un form DINO donné.
- `schemas['<form name>']` — le form schema du form (utilisé pour résoudre la structure des groupes répétés et les libellés de choix).

La chaîne exacte du nom de form à utiliser est l'identifiant que DINO attribue à ce form — obtenez-le depuis la configuration admin/forms de DINO de votre instance (il correspondra généralement, mais pas nécessairement de façon exacte, au nom de fichier xlsform du form ; vérifiez les différences d'espaces, de casse ou d'espaces en fin de chaîne).

Le bloc d'ouverture standard d'une feuille `variables` charge chaque form dont vous avez besoin et le transforme en jeu de données structuré :

```
name  | value
F01   | forms['my_form_name']
S01   | schemas['my_form_name']
D01   | BUILD_DATASET(F01,S01)
```

`BUILD_DATASET(forms, schema)` sépare chaque donnée à plat en champs de premier niveau non répétés, plus un objet `reps` regroupant les instances de groupes répétés (« repeat »/slide) par leur nom de groupe réel (dérivé du form schema). Sans form schema, il se rabat sur une heuristique générique. À partir de là, `D01` est le jeu de données que vous filtrez, agrégez et affichez.

### Délimiter / filtrer un jeu de données une fois, pour tous les usages ultérieurs

Un schéma très courant et recommandé consiste à **filtrer un jeu de données et à le réaffecter au même nom de variable**, afin que chaque formule référençant cette variable à partir de ce point hérite automatiquement du filtre — au lieu de répéter la condition de filtre dans chaque formule :

```
name | value
D01  | FILTER_BY(D01, $status='active')
```

Ce point est particulièrement important car **les jeux de données de form sont fréquemment partagés entre plusieurs projets, campagnes ou périmètres sur la même instance DINO** — ne partez jamais du principe qu'un tableau `forms['...']` est déjà limité aux seules données qui vous intéressent. Si vos form comportent un champ de projet/périmètre (son nom exact dépend de la conception des form de votre instance, par ex. quelque chose comme `$project_name`), filtrez explicitement chaque jeu de données :

```
scope_name = 'MY PROJECT'
D0X = FILTER_BY(D0X, $project_field = scope_name OR $secondary_project_field = scope_name)
```

Si un jeu de données comporte un groupe répété dont les instances individuelles doivent avoir leur propre périmètre (par ex. un repeat « participants » où un même enregistrement collectif peut inclure des participants appartenant à des périmètres différents), filtrez aussi au niveau de chaque instance, généralement via `FLATTEN_REPS` combiné à `FILTER_BY` sur le tableau aplati, avant d'extraire les valeurs dont vous avez besoin avec `ALL_VALUES_OF` (voir section 4 pour ces fonctions). Vérifiez toujours le champ qui contient réellement la valeur d'identification/référence d'une instance répétée — il peut ne pas contenir ce que son nom suggère (par exemple, un champ de référence « participant » à l'intérieur d'un repeat peut stocker le *nom d'affichage* de l'enregistrement lié plutôt que son *code/id* ; vérifiez sur des données réellement exportées avant de faire une jointure ou une déduplication dessus, et utilisez la même clé des deux côtés de toute comparaison).

### Variables d'invite IA

Si `isAIPrompt` est défini sur une ligne de variable, sa valeur représente le résultat d'une invite générée par IA plutôt qu'une formule calculée ordinaire. Ailleurs dans le classeur, vous pouvez récupérer ce texte avec `PROMPT_RESULT(report_data, '<variable name>')` et l'interpoler dans un composant HTML ou d'indicateur unique.

## Aperçu du DSL de formules

Chaque cellule non préfixée par `js:` est analysée par un petit analyseur descendant récursif et transformée en une expression JavaScript, puis évaluée par rapport à un contexte de données à l'exécution.

### Syntaxe de base

| Syntaxe | Signification |
|---|---|
| `$fieldname` | Une référence à un champ de form. Traduit en `form.fieldname` (`form` étant l'enregistrement en cours de portée dans cette partie de l'expression). |
| `bareIdentifier` | Une référence à un nom de la feuille `variables`, un nom de fonction, ou un mot-clé littéral. |
| `'text'` / `"text"` | Chaîne littérale. |
| `123`, `1.5`, `1e3` | Nombre littéral. |
| `[a, b, c]` | Tableau littéral. |
| `func(arg1, arg2, ...)` | Appel de fonction — seuls les noms de fonctions autorisés sont acceptés (voir ci-dessous) ; tout le reste doit passer par `js:`. |
| `=` | Égalité (compilée en `==` JS). |
| `!=` | Inégalité. |
| `+ - * /` , `< <= > >=` | Arithmétique / comparaison, même signification qu'en JavaScript. |
| `AND` / `OR` | Et/ou logique (compilés en `&&` / `\|\|`). |
| `!expr` | Négation logique. |
| `(expr)` | Regroupement. |
| `IF(cond, thenExpr, elseExpr)` | Conditionnel ternaire — une forme spéciale intégrée, et non une fonction ordinaire. |

Exemple :

```
IF($age >= 18 AND $status = 'active', 'adult-active', 'other')
→ (form.age >= 18 && form.status == 'active' ? 'adult-active' : 'other')
```

### Types d'arguments

Comme le DSL est compilé en JavaScript mais doit savoir *comment* interpréter chaque argument de fonction, chaque fonction autorisée a une signature d'arguments fixe composée de ces types :

- **`arg`** — analysé comme une expression normale et transmis tel quel (ainsi `$field` devient `form.field`, c'est-à-dire la *valeur* du champ).
- **`field`** — analysé comme une expression ; s'il s'avère être une simple référence `$field`, il est converti en **chaîne du nom de champ entre guillemets** plutôt qu'en valeur du champ (par ex. `$age` → `'age'`), car la fonction a besoin de savoir *sur quel champ* opérer, et non d'une valeur.
- **`func(form)`**, **`func(elem)`**, **`func(elemA, elemB)`** — analysé comme une expression (généralement une condition booléenne/relationnelle écrite avec `$field`), puis encapsulé dans une fonction fléchée JS avec le ou les noms de paramètres indiqués, par ex. `$gender = 'male'` en argument `func(form)` devient `(form) => form.gender == 'male'`.
- Un `?` final sur un argument le marque comme **facultatives** — omettez-le, ainsi que tout ce qui suit.

Connaître le type d'argument vous indique quand écrire `$field` (pour référencer la valeur actuelle d'un champ) et quand la même syntaxe `$field` est silencieusement transformée en chaîne de nom de champ.

### Référence des fonctions

**Charger et mettre en forme les jeux de données**

| Fonction | Signature (types) | Description |
|---|---|---|
| `BUILD_DATASET` | `(arg, arg?)` | Sépare les données à plat en champs de premier niveau + `reps` (instances de groupes répétés), en utilisant le form schema s'il est fourni. |
| `FLATTEN_REPS` | `(arg, arg)` | Produit une ligne de sortie par instance d'un groupe répété nommé, en fusionnant les champs de premier niveau du parent avec les champs de cette instance. |
| `FROM_REPS` | `(arg, func(form))` | Évalue une expression une fois par instance de groupe répété (sur tous les enregistrements donnés), en collectant les résultats non nuls dans un tableau plat. |
| `APPLY` | `(arg, field, func(form))` | Renvoie une copie du jeu de données avec un champ nouveau/dérivé défini sur chaque enregistrement (et ses reps). |
| `APPLY_LABELS` | `(arg, arg, arg)` | Remplace les valeurs de choix brutes par leurs libellés lisibles (issus du form schema) pour la liste de noms de champs donnée, sur chaque enregistrement et ses reps. |
| `GET_LABELS` | `(arg, arg)` | Recherche autonome : associe un tableau de valeurs de choix brutes à leurs libellés à l'aide d'un form schema. |
| `MAP` | `(arg, func(elem))` | Map de tableau classique. |
| `OP` | `(arg, arg, func(elemA, elemB))` | Parcourt deux tableaux index par index, en combinant chaque paire avec une expression binaire. |
| `JOIN_FORMS` | `(arg, arg, field, field?)` | Jointure gauche de deux jeux de données en faisant correspondre un champ clé de chaque côté. |
| `JOIN_REPEATING_SLIDES` | `(arg, arg, field, field, field, field?)` | Comme `JOIN_FORMS`, mais joint également les instances de groupes répétés de chaque paire correspondante par une sous-clé. |

**Filtre**

| Fonction | Signature | Description |
|---|---|---|
| `FILTER_BY` | `(arg, func(form))` | Renvoie une copie filtrée d'un jeu de données ; conserve un enregistrement s'il correspond au niveau supérieur, ou ne conserve que les instances de groupes répétés correspondantes si la correspondance est à ce niveau. |

**Comptage et agrégation**

| Fonction | Signature | Description |
|---|---|---|
| `COUNT_FORMS` | `(arg, func(form)?)` | Compte les enregistrements correspondant à une condition, en comptant chaque enregistrement une seule fois même si la condition correspond à plusieurs de ses instances répétées. |
| `COUNT_REPS` | `(arg, func(form)?)` | Compte séparément chaque enregistrement de premier niveau correspondant *et* chaque instance répétée correspondante — à utiliser pour le « nombre d'occurrences » plutôt que le « nombre d'enregistrements ». |
| `SUM` | `(arg, field, func(form)?)` | Somme d'un champ numérique sur les enregistrements et les instances répétées, avec un filtre facultatif. |
| `MEAN` / `MEDIAN` / `MODE` / `MIN` / `MAX` | `(arg, field, func(form)?)` | Statistiques agrégées standard avec un filtre facultatif. |
| `ALL_VALUES_OF` | `(arg, field, func(form)?)` | Collecte toutes les valeurs prises par un champ sur les enregistrements et les instances répétées correspondant à un filtre facultatif, **sans doublons**. L'outil standard pour « compter les X distincts » : encapsulez avec `LEN(...)`. |
| `LEN` | `(arg)` | Longueur d'un tableau. |
| `REMOVE_DUPLICATES` | `(arg)` | Supprime les doublons d'un tableau (par identité d'égalité profonde), en préservant l'ordre. |
| `INCLUDES` | `(arg, arg)` | Indique si un tableau (ou une chaîne) contient une valeur. |

**Dates**

| Fonction | Signature | Description |
|---|---|---|
| `TODAY` | `()` | La date du jour, `YYYY-MM-DD`. |
| `ADD_DAYS` | `(arg, arg)` | Une date plus N jours. |
| `DAYS_DIFF` | `(arg, arg)` | Différence en jours entiers entre deux dates. |
| `GET_AGE` | `(arg, arg?)` | Âge en années entières à partir d'une date de naissance (et d'une date de référence facultative, par défaut aujourd'hui). |
| `IS_BEFORE` / `IS_AFTER` | `(arg, arg)` | Comparaisons de dates. |
| `IS_WITHIN_INTERVAL` | `(arg, arg, arg)` | Vérification d'une plage de dates inclusive. |
| `COMPARE_DATE` | `(arg, arg, arg, arg?)` | Classe une date comme antérieure/comprise/postérieure à une plage, avec des libellés personnalisés facultatifs. |

**Nombres et formatage**

| Fonction | Signature | Description |
|---|---|---|
| `ROUND` | `(arg, arg?)` | Arrondit un nombre à N décimales (0 par défaut). |
| `PERCENT` | `(arg, arg)` | `a/b` sous forme de chaîne de pourcentage. |
| `PERCENTAGE_CHANGE` | `(arg, arg)` | Variation en pourcentage entre une valeur et une valeur de référence. |
| `CHART_TO_DATA` | `(arg, arg)` | Associe des tableaux parallèles de libellés/valeurs en un seul objet. |
| `FORMAT_TABLE_ROWS` / `FORMAT_TABLE_COLS` / `FORMAT_TABLE_FIELDS` | divers | Affiche un tableau de lignes/colonnes/enregistrements sous forme de chaîne HTML `<table>`, utile dans les composants `html`. |

**Sélection**

| Fonction | Signature | Description |
|---|---|---|
| `FIRST` / `LAST` | `(arg, func(form), field?)` | Trouve l'enregistrement le plus ancien/le plus récent selon un champ de date (par défaut un champ standard « created at ») et évalue une expression dessus. |

**IA / débogage**

| Fonction | Signature | Description |
|---|---|---|
| `PROMPT_RESULT` | `(arg, arg)` | Relit le texte produit par une variable `isAIPrompt`. |
| `CONSOLE_LOG` | `(arg)` | Journalise une valeur dans la console et la renvoie inchangée — pratique pour déboguer une formule en ligne. |

**Obsolètes (conservées pour la compatibilité ascendante ; préférez l'alternative indiquée)**

| Fonction | Préférez plutôt |
|---|---|
| `FILTER_BY_VARS` | `FILTER_BY` |
| `COUNT_FORMS_UNIQUE` | `LEN(ALL_VALUES_OF(...))` |
| `ISIN` | `INCLUDES` |
| `REPEAT` | `MAP` |
| `EVALUATE` | `IF` |

**Au-delà de la liste blanche**

Le DSL n'accepte que les fonctions ci-dessus (plus `IF`). La bibliothèque d'exécution sous-jacente expose des fonctions d'aide supplémentaires (aides statistiques comme l'écart-type, constructeurs internes de tableaux/jeux de données de composants utilisés par le convertisseur lui-même, etc.) qui ne sont **pas** accessibles via la syntaxe de formule ordinaire — uniquement via la porte de sortie JavaScript brut `js:` décrite à la section 2.4.

## Composants pris en charge et leurs propriétés

### `table` — tableau dynamique

Ligne 1 : les libellés d'en-têtes de colonnes. Ligne 2 : un court code de style par colonne, `[colspan][alignment][sortable]` :

- Premier caractère : colspan (un chiffre, généralement `1`).
- Deuxième caractère : `l` = gauche, `r` = droite, tout autre caractère = centré.
- Troisième caractère : `s` = colonne triable, omis/tout autre caractère = non triable.

À partir de la ligne 3, la feuille se comporte selon l'un de deux modes :

**A. Tableau de liste de form** (lié à un jeu de données) — utilisé lorsqu'une colonne `dataset` est présente :

| Colonne de configuration | Signification |
|---|---|
| *(la colonne propre à chaque en-tête)* | Le nom du champ à afficher dans cette colonne, extrait de chaque enregistrement du jeu de données. |
| `dataset` | Nom de la variable (de type tableau) à parcourir — généralement un jeu de données construit dans `variables`. |
| `pagination` | Vrai → produit un tableau paginé au lieu d'un tableau simple. |
| `dialog_fields` / `dialog_fields_labels` | Noms de champs / libellés supplémentaires séparés par des virgules, affichés dans une boîte de dialogue de détail « en savoir plus » pour chaque ligne. |
| `link_field` / `link_position` | Champ à utiliser comme URL de lien, et index de colonne qui doit l'afficher sous forme de lien. |

**B. Tableau statique / calculé** (sans colonne `dataset`) — chaque ligne restante est une ligne de sortie littérale, et chaque cellule est elle-même une formule (ou un littéral, ou une expression `js:`) ; mettez une chaîne littérale entre guillemets pour qu'elle ne soit pas prise pour une référence de variable simple (par ex. `"140"` pour le texte `140`, contre `my_indicator` pour afficher la valeur d'une variable calculée).

Les cellules d'en-tête sont stylisées en centré, gras, texte blanc sur fond uni ; les cellules du corps alternent automatiquement les couleurs de fond des lignes.

### `chart`

Ligne 1 uniquement (sauf Scatter/Bubble, voir ci-dessous). Colonnes d'options reconnues (retirées de la ligne avant que le reste ne soit traité comme séries de données) :

`chartType`, `title`, `stacked`, `beginAtZeroX`, `beginAtZeroY`, `axisLabelX`, `axisLabelY`, `axisMinX`, `axisMinY`, `axisMaxX`, `axisMaxY`, `removeZeroValues`, `mainDataNumberThreshold`.

- `chartType` doit être l'un de : `Line`, `Bar`, `HorizontalBar`, `Radar`, `Scatter`, `Doughnut`, `Pie`, `PolarArea`, `Bubble`.
- `labels` (facultatives) — une formule produisant le tableau des libellés de catégories/axes.
- Chaque autre en-tête de colonne désigne une série de données ; la valeur de sa cellule est une formule produisant le tableau de nombres de cette série.
- Les graphiques `Scatter` nécessitent exactement 2 lignes de données (valeurs X, valeurs Y) ; les graphiques `Bubble` en nécessitent exactement 3 (X, Y, rayon) ; tout autre type de graphique nécessite exactement 1 ligne de données.
- Les couleurs sont attribuées automatiquement à partir d'une palette intégrée (une couleur par série, ou une par point de données pour les secteurs/anneaux/aires polaires).

### `image`

Ligne 1 uniquement. Obligatoire : `url` (une formule produisant l'URL de l'image, ou une chaîne littérale ; préfixez par `js:` pour une expression JS brute). Facultatives : `align` (`left`/`center`/`right`), `width`, `height` (chaînes de longueur CSS).

### `html`

Ligne 1 uniquement, une seule colonne `html`, contenant une chaîne HTML brute (non analysée par le DSL de formules). Prend en charge les marqueurs d'interpolation à double crochets `[[expression]]`, qui sont évalués et substitués au moment de l'affichage — utilisez cela pour intégrer la valeur d'une variable calculée dans un balisage par ailleurs statique.

### `single` — carte d'indicateur / grand nombre

Ligne 1 uniquement :

| Colonne | Signification |
|---|---|
| `html` (facultatives) | Un titre affiché au-dessus du nombre. |
| `current_value` | Obligatoire. La variable/expression dont la valeur est affichée comme un grand nombre (rendue via `[[current_value]]`). |
| `percentage_change` (facultatives) | Si présente, ajoute un indicateur de tendance (flèche haut/bas/stable avec couleur) selon son signe, affiché sous la forme `[[percentage_change]]%`. |

Comme le même texte de cellule est réutilisé à la fois comme valeur interpolée et comme expression de comparaison brute, `current_value` / `percentage_change` devraient généralement être de simples noms de variables définies dans la feuille `variables`, et non des formules en ligne complètes.

### `graph`

Chaque ligne doit avoir une colonne `id` non vide. **Chaque** colonne de chaque ligne (hormis `id`) est analysée comme une formule, produisant un jeu de données de nœud de graphe par ligne.

### `heatmap`

Ligne 1 uniquement, toutes les colonnes sont facultatives avec des valeurs par défaut sensées : `values` (une chaîne JS brute/formule produisant les données d'intensité — non analysée par le DSL à crochets, doit déjà être valide), `idProp` (`'id'` par défaut), `features` (une chaîne GeoJSON), `startColor`, `endColor`, `highlightColor`, `showVisualMap`.

### `paginatedlist`

Ligne 1 : un pourcentage numérique de largeur de colonne par colonne. Ligne 2 (ligne de configuration) : nom de champ par colonne, plus `dataset`, `title`, `pageSize` (10 par défaut), `link_field`/`link_position`, `cellStyles`, `rowStyle` (un littéral d'objet de style brut), `backgroundColorA`/`backgroundColorB` (couleurs de lignes alternées). Chaque ligne obtenue est rendue comme son propre composant tableau compact plutôt que comme un grand tableau unique.

### `paginatedDialogList`

Même configuration que `paginatedlist`, plus deux lignes supplémentaires (si présentes) : les **libellés** des champs de la boîte de dialogue, puis les **noms** des champs de la boîte de dialogue — cliquer sur une ligne ouvre une fenêtre contextuelle listant ces champs sous forme de paires libellé/valeur.

### `filter` / `global filter`

Structuré comme une feuille `survey` ODK/XLSForm (avec une feuille `choices` d'accompagnement dans le même classeur), converti en form schema et rattaché comme contrôle de filtre interactif :

- Une feuille dont le nom contient `filter` (mais pas `global`) se rattache au composant de la feuille immédiatement suivante.
- Une feuille dont le nom contient à la fois `filter` et `global` se rattache à l'ensemble du rapport plutôt qu'à un seul composant.

## Liste de vérification rapide pour construire un nouveau XLSReport

1. Identifiez le ou les form DINO dont vous avez besoin et leurs noms/form schemas exacts sur votre instance.
2. Commencez une feuille `variables` : chargez chaque form avec `forms[...]`/`schemas[...]`, construisez les jeux de données avec `BUILD_DATASET`, et appliquez immédiatement tout filtre de projet/périmètre (en réaffectant le même nom de variable).
3. Précalculez tout ce qui est réutilisé par plus d'un composant comme sa propre variable nommée.
4. Ajoutez une feuille par composant, nommée avec le bon mot-clé, dans l'ordre où vous voulez qu'ils apparaissent.
5. Préférez la liste blanche du DSL de la section 4.3 ; passez à `js:` uniquement lorsqu'un calcul ne s'y prête pas.
6. Vérifiez deux fois les noms de champs et les valeurs de choix par rapport au form schema réel/aux données exportées de votre instance, plutôt que de supposer qu'ils correspondent exactement aux noms de champs du xlsform source.