---
title: XLSReport
description: Un aperçu du format basé sur Excel utilisé pour créer des rapports dans Dino.
---

# Le format XLSReport

## Qu'est-ce que XLSReport

XLSReport est un format de création basé sur un tableur qui permet de construire des **rapports DINO / AJF (Advanced JSON Forms)** sans écrire de JSON ni de code à la main. L'auteur d'un rapport remplit un classeur Excel ordinaire (`.xlsx`) en suivant un ensemble de conventions, et un convertisseur (`xls-report.ts`, qui fait partie de la bibliothèque `reports` d'AJF) analyse ce classeur pour produire un schéma JSON `AjfReport` que la plateforme DINO peut afficher sous forme de tableau de bord dynamique : tableaux, graphiques, chiffres clés (KPI), images, graphes, cartes de chaleur, etc.

Deux éléments rendent cela possible :

- **La correspondance feuille → widget** — chaque feuille du classeur (à quelques exceptions près) devient un widget du rapport. L'ordre des feuilles dans le classeur correspond à l'ordre dans lequel les widgets sont empilés dans le rapport affiché.
- **Un petit DSL de formules** (le « langage d'indicateurs ») — les cellules ne contiennent pas uniquement des valeurs littérales ; la plupart contiennent de courtes expressions (par ex. `SUM(D04, $persone, $tipo='corso')`) écrites dans un mini-langage compact et restreint à une liste blanche. Ce DSL est analysé par `hindikit-parser.ts` et traduit en JavaScript, qui est ensuite exécuté sur les données de formulaire sous-jacentes au moment de l'affichage ou de l'actualisation, à l'aide d'une bibliothèque de fonctions intégrées (`expression-utils.ts`).

Cela signifie qu'un XLSReport est en réalité composé de deux choses superposées : une **description de mise en page** (quelles feuilles produisent quels widgets, dans quel ordre) et une **description de calcul** (quelles formules calculent les nombres, les tableaux et les jeux de données que ces widgets affichent). Comme les données sous-jacentes proviennent de formulaires DINO (données soumises), toute formule XLSReport lit en fin de compte dans un ou plusieurs jeux de données de formulaire et les met en forme selon ce dont un widget a besoin (un nombre unique, un tableau pour un graphique, ou un ensemble de lignes).

XLSReport est indépendant de la plateforme et du projet : les mêmes conventions de classeur s'appliquent à n'importe quelle instance DINO et à n'importe quel ensemble de formulaires — rien dans le format n'est spécifique à une organisation ou à un déploiement particulier.

## Structure du fichier

Un XLSReport est un unique classeur `.xlsx`. Le convertisseur parcourt les feuilles du classeur **dans l'ordre** et décide de ce qu'il faut faire de chacune en recherchant une **sous-chaîne de mot-clé dans le nom de la feuille** (et non une correspondance exacte) — par exemple, une feuille nommée `table_activities` ou `2_table` est reconnue comme une feuille « table » car le nom *contient* `table`.

### Catégories de feuilles

| Le nom de la feuille contient | Rôle |
|---|---|
| `variables` (nom exact) | Déclare les variables/jeux de données nommés utilisés par les feuilles suivantes. Ne produit pas de widget en soi. |
| `filter` | Déclare un formulaire de filtre (de type ODK/XLSForm `survey` + `choices`) rattaché à la feuille *suivante* du classeur. Ne produit pas de widget propre. |
| `filter` **et** `global` | Identique à ci-dessus, mais le filtre obtenu s'applique à l'ensemble du rapport plutôt qu'à un seul widget. |
| `choices` | Une feuille complémentaire contenant des listes de choix (`list_name`, `name`, `label`), utilisée conjointement avec les feuilles `filter`. |
| `table` | Un widget `DynamicTable` ou `PaginatedTable`. |
| `chart` | Un widget `Chart` (barres, lignes, camembert, etc.). |
| `image` | Un widget `Image`. |
| `html` | Un widget `Text` qui affiche du HTML brut. |
| `graph` | Un widget `Graph` (nœuds/réseau). |
| `heatmap` | Un widget `HeatMap`. |
| `single` | Un ou plusieurs widgets `Text` formant une carte KPI/« grand nombre ». |
| `paginatedlist` | Un widget `PaginatedList` (une ligne = un mini widget tableau). |
| `paginatedDialogList` | Un widget `PaginatedList` dont les lignes ouvrent une boîte de dialogue de détail. |

Les noms de feuilles sont libres par ailleurs — utilisez-les pour rendre le classeur auto-documenté (par ex. `table_beneficiaries_by_month`, `chart_gender_split`). Comme la correspondance repose sur une recherche de sous-chaîne, évitez de choisir des noms qui contiennent accidentellement un autre mot-clé (par ex. ne nommez pas une feuille de graphique `charttable`).

### Conventions de lignes à l'intérieur d'une feuille

Chaque feuille de widget est lue comme une conversion classique de tableur vers JSON : **la ligne 1 contient les en-têtes de colonnes**, et **à partir de la ligne 2 se trouvent les données**, un objet JSON par ligne, indexé par le texte de l'en-tête. Au-delà de cette règle générique, chaque type de feuille définit sa propre signification pour la ligne d'en-tête et la première ou les deux premières lignes de données (documentées par widget dans la section 5).

### Mise en page globale

L'ensemble du classeur est encapsulé dans **une seule mise en page de premier niveau contenant une seule colonne**, et chaque feuille non spéciale contribue à exactement un widget (ou, pour `single`, plusieurs) ajouté à cette colonne dans l'ordre des feuilles. Autrement dit :

- Le rapport est toujours un **empilement vertical unique de widgets** — il n'existe aucun moyen, au niveau du tableur, de créer des colonnes côte à côte ou des conteneurs imbriqués ; le seul « imbriquement » existant est généré en interne par `paginatedlist` / `paginatedDialogList` (chaque ligne est elle-même un petit widget tableau ou une boîte de dialogue).
- Une feuille nommée `filter` rattache son filtre au widget de la feuille qui la **suit immédiatement** ; une feuille `global filter` s'attache au conteneur externe du rapport plutôt qu'à un seul widget.

### La solution de secours universelle : `js:`

Toute cellule normalement analysée par le DSL de formules peut à la place commencer par `js:` — tout ce qui suit ce préfixe est traité comme du **JavaScript brut** et transmis sans analyse. Cela donne accès à toutes les fonctions exportées par la bibliothèque d'utilitaires d'exécution, et pas seulement à celles figurant dans la liste blanche de la grammaire DSL (voir section 4), ainsi qu'à des expressions JS arbitraires (IIFE, utilisation de `Set`/`Map`, fonctions d'aide personnalisées en ligne, etc.). Utilisez-le lorsqu'un calcul ne correspond pas à la liste blanche de fonctions du DSL ou aux formes d'arguments attendues.

## Déclaration des variables

La feuille `variables` est l'endroit où vous chargez les données de formulaire et précalculez tout ce qui sera réutilisé par plusieurs widgets plus loin dans le classeur (jeux de données, filtres, valeurs d'indicateurs, libellés).

### Colonnes

| Colonne | Signification |
|---|---|
| `name` | L'identifiant de la variable. Doit être un identifiant valide (lettres, chiffres, underscore, ne commençant pas par un chiffre) — les noms invalides sont rejetés. |
| `value` | Une expression, analysée via le même DSL de formules que toutes les autres cellules (ou du JavaScript brut préfixé par `js:`). |
| `isAIPrompt` (facultatif) | Booléen ; marque la variable comme le résultat d'un prompt IA plutôt que d'une formule simple, afin de pouvoir la relire plus tard avec `PROMPT_RESULT`. |

Les lignes dont le `name` est vide sont ignorées. Les variables sont évaluées de haut en bas, et **chaque variable peut référencer n'importe quelle variable déclarée au-dessus d'elle** par son nom simple (sans préfixe `$` — ce préfixe est réservé aux *champs* de formulaire, voir section 4).

### Chargement des données de formulaire

Deux accès à l'exécution sont toujours disponibles :

- `forms['<nom du formulaire>']` — le tableau brut des données soumises pour un formulaire DINO donné.
- `schemas['<nom du formulaire>']` — le schéma du formulaire (utilisé pour résoudre la structure des groupes répétés et les libellés de choix).

La chaîne exacte du nom de formulaire à utiliser est l'identifiant que DINO attribue à ce formulaire — obtenez-le depuis la configuration admin/formulaires de DINO pour votre instance (il correspondra généralement, sans garantie, au nom de fichier xlsform du formulaire ; vérifiez les différences d'espacement, de casse ou d'espace en fin de chaîne).

Le bloc d'ouverture standard d'une feuille `variables` charge chaque formulaire dont vous avez besoin et le transforme en jeu de données structuré :

```
name  | value
F01   | forms['my_form_name']
S01   | schemas['my_form_name']
D01   | BUILD_DATASET(F01,S01)
```

`BUILD_DATASET(forms, schema)` sépare chaque donnée soumise à plat en champs de premier niveau non répétés, plus un objet `reps` regroupant les instances de groupes répétés (« repeat »/slide) par leur nom de groupe réel (dérivé du schéma). Sans schéma, il se rabat sur une heuristique générique. À partir de là, `D01` est le jeu de données que vous filtrez, agrégez et affichez.

### Délimiter / filtrer un jeu de données une fois, pour tous les usages ultérieurs

Un schéma très courant et recommandé consiste à **filtrer un jeu de données et le réaffecter au même nom de variable**, de sorte que chaque formule référençant cette variable à partir de ce point hérite automatiquement du filtre — au lieu de répéter la condition de filtre dans chaque formule :

```
name | value
D01  | FILTER_BY(D01, $status='active')
```

C'est particulièrement important car **les jeux de données de formulaire sont fréquemment partagés entre plusieurs projets, campagnes ou périmètres sur une même instance DINO** — ne présumez jamais qu'un tableau `forms['...']` est déjà limité aux seules données qui vous intéressent. Si vos formulaires comportent un champ de projet/périmètre (son nom exact dépend de la conception des formulaires de votre instance, par ex. quelque chose comme `$project_name`), filtrez explicitement chaque jeu de données :

```
scope_name = 'MY PROJECT'
D0X = FILTER_BY(D0X, $project_field = scope_name OR $secondary_project_field = scope_name)
```

Si un jeu de données comporte un groupe répété dont les instances individuelles nécessitent leur propre délimitation (par ex. une répétition « participants » où un même enregistrement collectif peut inclure des participants appartenant à des périmètres différents), filtrez aussi au niveau de chaque instance, généralement via `FLATTEN_REPS` combiné à `FILTER_BY` sur le tableau aplati, avant d'extraire les valeurs dont vous avez besoin avec `ALL_VALUES_OF` (voir section 4 pour ces fonctions). Vérifiez toujours le champ qui contient réellement la valeur d'identification/référence d'une instance répétée — il se peut qu'il ne contienne pas ce que son nom suggère (par exemple, un champ de référence « participant » à l'intérieur d'une répétition peut stocker le *nom d'affichage* de l'enregistrement lié plutôt que son *code/id* ; vérifiez avec des données réellement exportées avant de faire une jointure ou une déduplication dessus, et utilisez la même clé des deux côtés de toute comparaison).

### Variables de prompt IA

Si `isAIPrompt` est défini sur une ligne de variable, sa valeur représente le résultat d'un prompt généré par IA plutôt qu'une formule calculée simple. Ailleurs dans le classeur, vous pouvez récupérer ce texte avec `PROMPT_RESULT(report_data, '<nom de la variable>')` et l'interpoler dans un widget HTML ou à indicateur unique.

## Aperçu du DSL de formules

Chaque cellule non préfixée par `js:` est analysée par un petit analyseur descendant récursif en une expression JavaScript, puis évaluée par rapport à un contexte de données à l'exécution.

### Syntaxe de base

| Syntaxe | Signification |
|---|---|
| `$fieldname` | Une référence à un champ de formulaire. Traduit en `form.fieldname` (`form` étant l'enregistrement en portée dans cette partie de l'expression). |
| `bareIdentifier` | Une référence à un nom de la feuille `variables`, à un nom de fonction, ou à un mot-clé littéral. |
| `'text'` / `"text"` | Littéral de chaîne de caractères. |
| `123`, `1.5`, `1e3` | Littéral numérique. |
| `[a, b, c]` | Littéral de tableau. |
| `func(arg1, arg2, ...)` | Appel de fonction — seuls les noms de fonctions figurant sur la liste blanche sont acceptés (voir ci-dessous) ; tout le reste doit passer par `js:`. |
| `=` | Égalité (compilé en `==` en JS). |
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

Parce que le DSL se compile en JavaScript mais doit savoir *comment* interpréter chaque argument de fonction, chaque fonction de la liste blanche possède une signature d'arguments fixe composée de ces types :

- **`arg`** — analysé comme une expression normale et transmis tel quel (donc `$field` devient `form.field`, c'est-à-dire la *valeur* du champ).
- **`field`** — analysé comme une expression ; s'il s'avère être une référence `$field` simple, il est converti en **chaîne contenant le nom du champ entre guillemets** plutôt qu'en la valeur du champ (par ex. `$age` → `'age'`), car la fonction s'attend à savoir *sur quel champ* opérer, et non à recevoir une valeur.
- **`func(form)`**, **`func(elem)`**, **`func(elemA, elemB)`** — analysé comme une expression (généralement une condition booléenne/relationnelle écrite avec `$field`), puis encapsulé dans une fonction fléchée JS avec le(s) nom(s) de paramètre indiqué(s), par ex. `$gender = 'male'` en tant qu'argument `func(form)` devient `(form) => form.gender == 'male'`.
- Un `?` final sur un argument le marque comme **facultatif** — omettez-le, ainsi que tout ce qui suit.

Connaître le type d'argument vous indique quand écrire `$field` (pour référencer la valeur actuelle d'un champ) et quand cette même syntaxe `$field` est silencieusement transformée en chaîne de nom de champ.

### Référence des fonctions

**Chargement et mise en forme des jeux de données**

| Fonction | Signature (types) | Description |
|---|---|---|
| `BUILD_DATASET` | `(arg, arg?)` | Sépare les données soumises à plat en champs de premier niveau + `reps` (instances de groupes répétés), en utilisant le schéma s'il est fourni. |
| `FLATTEN_REPS` | `(arg, arg)` | Produit une ligne de sortie par instance d'un groupe répété nommé, en fusionnant les champs de premier niveau du parent avec ceux de cette instance. |
| `FROM_REPS` | `(arg, func(form))` | Évalue une expression une fois par instance de groupe répété (sur tous les enregistrements donnés), en collectant les résultats non nuls dans un tableau plat. |
| `APPLY` | `(arg, field, func(form))` | Renvoie une copie du jeu de données avec un champ nouveau/dérivé défini sur chaque enregistrement (et ses reps). |
| `APPLY_LABELS` | `(arg, arg, arg)` | Remplace les valeurs de choix brutes par leurs libellés lisibles (issus du schéma) pour la liste de noms de champs donnée, sur chaque enregistrement et ses reps. |
| `GET_LABELS` | `(arg, arg)` | Recherche autonome : associe un tableau de valeurs de choix brutes à leurs libellés à l'aide d'un schéma. |
| `MAP` | `(arg, func(elem))` | Map de tableau classique. |
| `OP` | `(arg, arg, func(elemA, elemB))` | Combine deux tableaux index par index, en combinant chaque paire avec une expression binaire. |
| `JOIN_FORMS` | `(arg, arg, field, field?)` | Jointure gauche de deux jeux de données en faisant correspondre un champ clé de chaque côté. |
| `JOIN_REPEATING_SLIDES` | `(arg, arg, field, field, field, field?)` | Comme `JOIN_FORMS`, mais joint également les instances de groupes répétés de chaque paire correspondante via une sous-clé. |

**Filtrage**

| Fonction | Signature | Description |
|---|---|---|
| `FILTER_BY` | `(arg, func(form))` | Renvoie une copie filtrée d'un jeu de données ; conserve un enregistrement s'il correspond au niveau supérieur, ou ne conserve que les instances de groupes répétés correspondantes si la correspondance se situe à ce niveau. |

**Comptage et agrégation**

| Fonction | Signature | Description |
|---|---|---|
| `COUNT_FORMS` | `(arg, func(form)?)` | Compte les enregistrements correspondant à une condition, en comptant chaque enregistrement une seule fois même si la condition correspond à plusieurs de ses instances répétées. |
| `COUNT_REPS` | `(arg, func(form)?)` | Compte séparément chaque enregistrement de premier niveau correspondant *et* chaque instance répétée correspondante — à utiliser pour un « nombre d'occurrences » plutôt qu'un « nombre d'enregistrements ». |
| `SUM` | `(arg, field, func(form)?)` | Somme d'un champ numérique sur les enregistrements et les instances répétées, avec un filtre facultatif. |
| `MEAN` / `MEDIAN` / `MODE` / `MIN` / `MAX` | `(arg, field, func(form)?)` | Statistiques d'agrégation classiques avec un filtre facultatif. |
| `ALL_VALUES_OF` | `(arg, field, func(form)?)` | Collecte toutes les valeurs prises par un champ sur les enregistrements et les instances répétées correspondant à un filtre facultatif, **dédupliquées**. L'outil standard pour « compter les X distincts » : à envelopper dans `LEN(...)`. |
| `LEN` | `(arg)` | Longueur d'un tableau. |
| `REMOVE_DUPLICATES` | `(arg)` | Déduplique un tableau (par identité d'égalité profonde), en préservant l'ordre. |
| `INCLUDES` | `(arg, arg)` | Indique si un tableau (ou une chaîne) contient une valeur. |

**Dates**

| Fonction | Signature | Description |
|---|---|---|
| `TODAY` | `()` | La date du jour, `YYYY-MM-DD`. |
| `ADD_DAYS` | `(arg, arg)` | Une date plus N jours. |
| `DAYS_DIFF` | `(arg, arg)` | Différence en jours entiers entre deux dates. |
| `GET_AGE` | `(arg, arg?)` | Âge en années entières à partir d'une date de naissance (et d'une date de référence facultative, par défaut aujourd'hui). |
| `IS_BEFORE` / `IS_AFTER` | `(arg, arg)` | Comparaisons de dates. |
| `IS_WITHIN_INTERVAL` | `(arg, arg, arg)` | Vérification d'intervalle de dates inclusif. |
| `COMPARE_DATE` | `(arg, arg, arg, arg?)` | Classe une date comme antérieure/dans/Postérieure à un intervalle, avec des libellés personnalisés facultatifs. |

**Nombres et formatage**

| Fonction | Signature | Description |
|---|---|---|
| `ROUND` | `(arg, arg?)` | Arrondit un nombre à N décimales (0 par défaut). |
| `PERCENT` | `(arg, arg)` | `a/b` sous forme de chaîne de pourcentage. |
| `PERCENTAGE_CHANGE` | `(arg, arg)` | Variation en pourcentage entre une valeur et une valeur de référence. |
| `CHART_TO_DATA` | `(arg, arg)` | Combine des tableaux parallèles de libellés/valeurs en un seul objet. |
| `FORMAT_TABLE_ROWS` / `FORMAT_TABLE_COLS` / `FORMAT_TABLE_FIELDS` | diverses | Affichent un tableau de lignes/colonnes/enregistrements sous forme de chaîne HTML `<table>`, utile dans les widgets `html`. |

**Sélection**

| Fonction | Signature | Description |
|---|---|---|
| `FIRST` / `LAST` | `(arg, func(form), field?)` | Trouve l'enregistrement le plus ancien/le plus récent selon un champ de date (par défaut un champ standard « créé le ») et évalue une expression sur celui-ci. |

**IA / débogage**

| Fonction | Signature | Description |
|---|---|---|
| `PROMPT_RESULT` | `(arg, arg)` | Relit le texte produit par une variable `isAIPrompt`. |
| `CONSOLE_LOG` | `(arg)` | Enregistre une valeur dans la console et la renvoie inchangée — pratique pour déboguer une formule en ligne. |

**Obsolètes (conservées pour la rétrocompatibilité ; préférez l'alternative indiquée)**

| Fonction | Préférez plutôt |
|---|---|
| `FILTER_BY_VARS` | `FILTER_BY` |
| `COUNT_FORMS_UNIQUE` | `LEN(ALL_VALUES_OF(...))` |
| `ISIN` | `INCLUDES` |
| `REPEAT` | `MAP` |
| `EVALUATE` | `IF` |

**Au-delà de la liste blanche**

Le DSL n'accepte que les fonctions ci-dessus (plus `IF`). La bibliothèque d'exécution sous-jacente expose des fonctions d'aide supplémentaires (des aides statistiques comme l'écart type, des constructeurs internes de tableaux/jeux de données de widgets utilisés par le convertisseur lui-même, etc.) qui ne sont **pas** accessibles via la syntaxe de formule simple — uniquement via la solution de secours en JavaScript brut `js:` décrite à la section 2.4.

## Widgets pris en charge et leurs propriétés

### `table` — tableau dynamique

Ligne 1 : libellés d'en-têtes de colonnes. Ligne 2 : un court code de style par colonne, `[colspan][alignment][sortable]` :

- Premier caractère : colspan (un chiffre, généralement `1`).
- Deuxième caractère : `l` = gauche, `r` = droite, tout le reste = centré.
- Troisième caractère : `s` = colonne triable, omis/tout autre = non triable.

À partir de la ligne 3, la feuille fonctionne selon l'un de deux modes :

**A. Tableau de liste de formulaires** (lié à un jeu de données) — utilisé lorsqu'une colonne `dataset` est présente :

| Colonne de configuration | Signification |
|---|---|
| *(la colonne propre à chaque en-tête)* | Le nom du champ à afficher dans cette colonne, extrait de chaque enregistrement du jeu de données. |
| `dataset` | Nom de la variable (à valeur de tableau) à parcourir — généralement un jeu de données construit dans `variables`. |
| `pagination` | Vrai → produit un tableau paginé au lieu d'un tableau simple. |
| `dialog_fields` / `dialog_fields_labels` | Noms / libellés de champs supplémentaires, séparés par des virgules, affichés dans une boîte de dialogue de détail « en savoir plus » pour chaque ligne. |
| `link_field` / `link_position` | Champ à utiliser comme URL de lien, et indice de colonne qui doit l'afficher comme lien. |

**B. Tableau statique / calculé** (sans colonne `dataset`) — chaque ligne restante est une ligne de sortie littérale, et chaque cellule est elle-même une formule (ou un littéral, ou une expression `js:`) ; placez une chaîne littérale entre guillemets pour qu'elle ne soit pas prise pour une référence de variable simple (par ex. `"140"` pour le texte `140`, par opposition à `my_indicator` pour afficher la valeur d'une variable calculée).

Les cellules d'en-tête sont stylisées en centré, gras, texte blanc sur fond uni ; les cellules du corps alternent automatiquement les couleurs de fond des lignes.

### `chart`

Uniquement la ligne 1 (sauf pour Scatter/Bubble, voir ci-dessous). Colonnes d'options reconnues (retirées de la ligne avant que le reste ne soit traité comme séries de données) :

`chartType`, `title`, `stacked`, `beginAtZeroX`, `beginAtZeroY`, `axisLabelX`, `axisLabelY`, `axisMinX`, `axisMinY`, `axisMaxX`, `axisMaxY`, `removeZeroValues`, `mainDataNumberThreshold`.

- `chartType` doit être l'un de : `Line`, `Bar`, `HorizontalBar`, `Radar`, `Scatter`, `Doughnut`, `Pie`, `PolarArea`, `Bubble`.
- `labels` (facultatif) — une formule produisant le tableau des libellés de catégories/axes.
- Chaque autre en-tête de colonne nomme une série de données ; la valeur de sa cellule est une formule produisant le tableau de nombres de cette série.
- Les graphiques `Scatter` nécessitent exactement 2 lignes de données (valeurs X, valeurs Y) ; les graphiques `Bubble` en nécessitent exactement 3 (X, Y, rayon) ; tous les autres types de graphiques nécessitent exactement 1 ligne de données.
- Les couleurs sont attribuées automatiquement à partir d'une palette intégrée (une couleur par série, ou une par point de données pour les graphiques pie/doughnut/polar-area).

### `image`

Uniquement la ligne 1. Obligatoire : `url` (une formule produisant l'URL de l'image, ou une chaîne littérale ; préfixez par `js:` pour une expression JS brute). Facultatif : `align` (`left`/`center`/`right`), `width`, `height` (chaînes de longueur CSS).

### `html`

Uniquement la ligne 1, une seule colonne `html`, contenant une chaîne HTML brute (non analysée par le DSL de formules). Prend en charge les marqueurs d'interpolation à double crochets `[[expression]]`, qui sont évalués et substitués au moment de l'affichage — utilisez-les pour intégrer la valeur d'une variable calculée dans un balisage par ailleurs statique.

### `single` — carte KPI / grand nombre

Uniquement la ligne 1 :

| Colonne | Signification |
|---|---|
| `html` (facultatif) | Un titre affiché au-dessus du nombre. |
| `current_value` | Obligatoire. La variable/expression dont la valeur est affichée comme un grand nombre (rendue via `[[current_value]]`). |
| `percentage_change` (facultatif) | Si présent, ajoute un indicateur de tendance (flèche haut/bas/stable avec couleur) basé sur son signe, affiché sous la forme `[[percentage_change]]%`. |

Comme le même texte de cellule est réutilisé à la fois comme valeur interpolée et comme expression de comparaison brute, `current_value` / `percentage_change` devraient généralement être de simples noms de variables définis dans la feuille `variables`, et non des formules en ligne complètes.

### `graph`

Chaque ligne nécessite une colonne `id` non vide. **Chaque** colonne de chaque ligne (à part `id`) est analysée comme une formule, produisant un jeu de données de nœuds de graphe par ligne.

### `heatmap`

Uniquement la ligne 1, toutes les colonnes facultatives avec des valeurs par défaut sensées : `values` (une chaîne JS brute/formule produisant les données d'intensité — non analysée par le DSL à crochets, doit déjà être valide), `idProp` (par défaut `'id'`), `features` (une chaîne GeoJSON), `startColor`, `endColor`, `highlightColor`, `showVisualMap`.

### `paginatedlist`

Ligne 1 : un pourcentage numérique de largeur de colonne par colonne. Ligne 2 (ligne de configuration) : nom de champ par colonne, plus `dataset`, `title`, `pageSize` (10 par défaut), `link_field`/`link_position`, `cellStyles`, `rowStyle` (un littéral d'objet de style brut), `backgroundColorA`/`backgroundColorB` (couleurs de lignes alternées). Chaque ligne résultante est rendue comme son propre widget tableau compact plutôt qu'un seul grand tableau.

### `paginatedDialogList`

Même configuration que `paginatedlist`, plus deux lignes supplémentaires (si présentes) : les **libellés** des champs de la boîte de dialogue, puis les **noms** des champs de la boîte de dialogue — cliquer sur une ligne ouvre une fenêtre contextuelle listant ces champs sous forme de paires libellé/valeur.

### `filter` / `global filter`

Structurée comme une feuille `survey` ODK/XLSForm (avec une feuille `choices` complémentaire dans le même classeur), convertie en un schéma de formulaire et attachée comme contrôle de filtre interactif :

- Une feuille nommée avec `filter` (mais pas `global`) s'attache au widget de la feuille immédiatement suivante.
- Une feuille nommée à la fois `filter` et `global` s'attache à l'ensemble du rapport plutôt qu'à un seul widget.

## Liste de vérification rapide pour construire un nouveau XLSReport

1. Identifiez le(s) formulaire(s) DINO dont vous avez besoin ainsi que leurs noms de formulaire/schémas exacts sur votre instance.
2. Commencez une feuille `variables` : chargez chaque formulaire avec `forms[...]`/`schemas[...]`, construisez les jeux de données avec `BUILD_DATASET`, et appliquez immédiatement tout filtre de projet/périmètre (en réaffectant le même nom de variable).
3. Précalculez tout ce qui est réutilisé par plus d'un widget comme sa propre variable nommée.
4. Ajoutez une feuille par widget, nommée avec le bon mot-clé, dans l'ordre où vous souhaitez qu'ils apparaissent.
5. Préférez la liste blanche du DSL de la section 4.3 ; recourez à `js:` uniquement lorsqu'un calcul ne s'y prête pas.
6. Vérifiez deux fois les noms de champs et les valeurs de choix par rapport au schéma réel/aux données exportées de votre instance, plutôt que de supposer qu'ils correspondent exactement aux noms de champs du xlsform source.