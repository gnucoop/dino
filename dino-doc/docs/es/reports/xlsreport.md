---
title: XLSReport
description: Una visión general del formato basado en Excel que se utiliza para crear informes en Dino.
---

# El formato XLSReport

## Qué es XLSReport

XLSReport es un formato de autoría basado en hojas de cálculo para construir **informes de DINO / AJF (Advanced JSON Forms)** sin escribir JSON ni código a mano. Quien redacta un informe rellena un libro de Excel normal (`.xlsx`) siguiendo una serie de convenciones, y un convertidor (`xls-report.ts`, parte de la librería `reports` de AJF) analiza ese libro y lo transforma en un esquema JSON `AjfReport` que la plataforma DINO puede representar como un panel en vivo: tablas, gráficos, cifras KPI, imágenes, grafos, mapas de calor y más.

Dos cosas lo hacen posible:

- **Asignación de hojas a componentes** — cada hoja del libro (con algunas excepciones especiales) se convierte en un componente del informe. El orden de las hojas en el libro es el orden en que se apilan los componentes en el informe representado.
- **Un pequeño DSL de fórmulas** ("lenguaje de indicadores") — las celdas no contienen solo valores literales; la mayoría contienen expresiones breves (p. ej. `SUM(D04, $persone, $tipo='corso')`) escritas en un mini-lenguaje compacto con una lista blanca de funciones permitidas. Este DSL lo analiza `hindikit-parser.ts` y se traduce a JavaScript, que después se ejecuta sobre los datos del formulario correspondiente en el momento de representar o actualizar, usando una librería de funciones integradas (`expression-utils.ts`).

Esto significa que un XLSReport es en realidad dos cosas superpuestas: una **descripción de la disposición** (qué hojas producen qué componentes, en qué orden) y una **descripción del cálculo** (qué fórmulas calculan los números, arrays y conjuntos de datos que muestran esos componentes). Como los datos subyacentes proceden de formularios DINO (datos), cualquier fórmula de un XLSReport lee en última instancia de uno o varios conjuntos de datos de formulario y los da forma hasta obtener lo que el componente necesita (un único número, un array para un gráfico o una tabla de filas).

XLSReport es independiente de la plataforma y del proyecto: las mismas convenciones de libro se aplican a cualquier instancia de DINO y a cualquier conjunto de formularios — nada en el formato es específico de una organización o despliegue concreto.

## Estructura del archivo

Un XLSReport es un único libro `.xlsx`. El convertidor recorre las hojas del libro **en orden** y decide qué hacer con cada una buscando una **subcadena clave en el nombre de la hoja** (no una coincidencia exacta) — por ejemplo, una hoja llamada `table_activities` o `2_table` se reconoce como hoja de tipo "table" porque el nombre *contiene* `table`.

### Categorías de hojas

| El nombre de la hoja contiene | Función |
|---|---|
| `variables` (nombre exacto) | Declara las variables/conjuntos de datos con nombre que usan las hojas posteriores. No produce ningún componente por sí misma. |
| `filter` | Declara un formulario de filtro (estilo ODK/XLSForm `survey` + `choices`) asociado a la *siguiente* hoja del libro. No produce un componente propio. |
| `filter` **y** `global` | Igual que el anterior, pero el filtro resultante se aplica a todo el informe en lugar de a un único componente. |
| `choices` | Una hoja complementaria que contiene listas de opciones (`list_name`, `name`, `label`), usada junto con las hojas `filter`. |
| `table` | Un componente `DynamicTable` o `PaginatedTable`. |
| `chart` | Un componente `Chart` (barras, líneas, circular, etc.). |
| `image` | Un componente `Image`. |
| `html` | Un componente `Text` que representa HTML sin procesar. |
| `graph` | Un componente `Graph` (de nodos/red). |
| `heatmap` | Un componente `HeatMap`. |
| `single` | Uno o varios componentes `Text` que forman una tarjeta KPI / de "número grande". |
| `paginatedlist` | Un componente `PaginatedList` (una fila = un componente de tabla en miniatura). |
| `paginatedDialogList` | Un componente `PaginatedList` cuyas filas abren un diálogo de detalle. |

Por lo demás, los nombres de las hojas son libres — úsalos para que el libro se documente a sí mismo (p. ej. `table_beneficiaries_by_month`, `chart_gender_split`). Como la coincidencia es por subcadena, evita elegir nombres que contengan accidentalmente otra palabra clave (p. ej., no llames a una hoja de gráfico `charttable`).

### Convenciones de filas dentro de una hoja

Cada hoja de componente se lee como una conversión normal de hoja de cálculo a JSON: **la fila 1 contiene los encabezados de columna** y **a partir de la fila 2 vienen los datos**, un objeto JSON por fila con el texto del encabezado como clave. Más allá de esa regla genérica, cada tipo de hoja define su propio significado para la fila de encabezados y para la primera o las dos primeras filas de datos (documentado por componente en la sección 5).

### Disposición general

Todo el libro se envuelve en **una única disposición de nivel superior que contiene una sola columna**, y cada hoja no especial aporta exactamente un componente (o, en el caso de `single`, varios) añadido a esa columna en el orden de las hojas. En otras palabras:

- El informe es siempre una **pila vertical única de componentes** — no hay forma, a nivel de hoja de cálculo, de crear columnas paralelas ni contenedores anidados; el único "anidamiento" que existe lo genera internamente `paginatedlist` / `paginatedDialogList` (cada fila es a su vez un pequeño componente de tabla o de diálogo).
- Una hoja con nombre `filter` asocia su filtro al componente de la hoja que **la sigue inmediatamente**; una hoja `global filter` lo asocia al contenedor externo del informe en lugar de a un único componente.

### La vía de escape universal: `js:`

Cualquier celda que normalmente se analiza mediante el DSL de fórmulas puede empezar en su lugar por `js:` — todo lo que sigue a ese prefijo se trata como **JavaScript sin procesar** y se deja pasar sin analizar. Esto da acceso a todas las funciones exportadas por la librería de utilidades en tiempo de ejecución, no solo a las incluidas en la lista blanca de la gramática del DSL (véase la sección 4), y a expresiones JS arbitrarias (IIFE, uso de `Set`/`Map`, funciones auxiliares en línea personalizadas, etc.). Úsalo cuando un cálculo no encaje en la lista blanca de funciones del DSL o en las formas de sus argumentos.

## Declaración de variables

La hoja `variables` es donde se cargan los datos de los formularios y se precalcula todo lo que reutilizarán varios componentes más adelante en el libro (conjuntos de datos, filtros, valores de indicadores, etiquetas).

### Columnas

| Columna | Significado |
|---|---|
| `name` | El identificador de la variable. Debe ser un identificador válido (letras, dígitos, guion bajo, sin empezar por dígito) — los nombres no válidos se rechazan. |
| `value` | Una expresión, analizada mediante el mismo DSL de fórmulas que el resto de celdas (o JavaScript sin procesar precedido de `js:`). |
| `isAIPrompt` (opcional) | Booleano; marca la variable como resultado de un prompt de IA en lugar de una fórmula normal, de modo que después pueda recuperarse con `PROMPT_RESULT`. |

Las filas con `name` vacío se omiten. Las variables se evalúan de arriba a abajo, y **cada variable puede referenciar cualquier variable declarada por encima de ella** por su nombre simple (sin el prefijo `$` — ese prefijo está reservado para los *campos* del formulario, véase la sección 4).

### Carga de datos de formularios

Siempre hay disponibles dos búsquedas en tiempo de ejecución:

- `forms['<nombre del formulario>']` — el array sin procesar de datos de un formulario DINO dado.
- `schemas['<nombre del formulario>']` — el esquema del formulario (se usa para resolver la estructura de grupos repetidos y las etiquetas de las opciones).

La cadena exacta del nombre de formulario que hay que usar es el identificador que DINO asigna a ese formulario — obtenlo de la configuración de administración/formularios de DINO de tu instancia (normalmente coincidirá, pero no se garantiza que coincida exactamente, con el nombre de archivo xlsform del formulario; comprueba si hay diferencias de espaciado, mayúsculas/minúsculas o espacios finales).

El bloque inicial estándar de una hoja `variables` carga cada formulario que necesitas y lo convierte en un conjunto de datos estructurado:

```
name  | value
F01   | forms['my_form_name']
S01   | schemas['my_form_name']
D01   | BUILD_DATASET(F01,S01)
```

`BUILD_DATASET(forms, schema)` divide cada dato plano en campos de nivel superior no repetidos más un objeto `reps` que agrupa las instancias de grupos repetidos ("repeat"/diapositiva) por su nombre de grupo real (derivado del esquema). Sin esquema, recurre a una heurística genérica. A partir de este punto, `D01` es el conjunto de datos que filtras, agregas y muestras.

### Acotar/filtrar un conjunto de datos una sola vez, para todos los usos posteriores

Un patrón muy habitual y recomendado consiste en **filtrar un conjunto de datos y reasignarlo al mismo nombre de variable**, de modo que toda fórmula que referencie esa variable a partir de ese momento herede automáticamente el filtro — en lugar de repetir la condición del filtro en cada fórmula:

```
name | value
D01  | FILTER_BY(D01, $status='active')
```

Esto es especialmente importante porque **los conjuntos de datos de formulario se comparten con frecuencia entre más de un proyecto, campaña o ámbito en la misma instancia de DINO** — nunca des por hecho que un array `forms['...']` ya está acotado solo a los datos que te interesan. Si tus formularios llevan un campo de proyecto/ámbito (su nombre exacto depende del diseño de formularios de tu instancia, p. ej. algo como `$project_name`), filtra cada conjunto de datos explícitamente:

```
scope_name = 'MY PROJECT'
D0X = FILTER_BY(D0X, $project_field = scope_name OR $secondary_project_field = scope_name)
```

Si un conjunto de datos tiene un grupo repetido cuyas instancias individuales necesitan su propio acotamiento (p. ej. un repeat de "participantes" donde un único registro colectivo puede incluir participantes de ámbitos distintos), filtra también a nivel de cada instancia, normalmente mediante `FLATTEN_REPS` combinado con `FILTER_BY` sobre el array aplanado, antes de extraer los valores que necesitas con `ALL_VALUES_OF` (véase la sección 4 para estas funciones). Comprueba siempre el campo que realmente contiene el valor identificativo/de referencia de una instancia repetida — puede que no contenga lo que su nombre sugiere (por ejemplo, un campo de referencia a "participante" dentro de un repeat puede almacenar el *nombre para mostrar* del registro enlazado en lugar de su *código/id*; verifícalo con datos reales exportados antes de hacer join o deduplicar por él, y usa la misma clave en ambos lados de cualquier comparación).

### Variables de prompt de IA

Si `isAIPrompt` está activado en una fila de variable, su valor representa el resultado de un prompt generado por IA en lugar de una fórmula calculada normal. En cualquier otro lugar del libro puedes recuperar ese texto con `PROMPT_RESULT(report_data, '<nombre de la variable>')` e interpolarlo en un componente HTML o de indicador único.

## Visión general del DSL de fórmulas

Cada celda que no empiece por `js:` la analiza un pequeño analizador descendente recursivo y se convierte en una expresión JavaScript, que después se evalúa contra un contexto de datos en tiempo de ejecución.

### Sintaxis básica

| Sintaxis | Significado |
|---|---|
| `$fieldname` | Una referencia a un campo del formulario. Se traduce a `form.fieldname` (`form` es el registro que esté en el ámbito en esa parte de la expresión). |
| `bareIdentifier` | Una referencia a un nombre de la hoja `variables`, a un nombre de función o a una palabra clave literal. |
| `'text'` / `"text"` | Literal de cadena. |
| `123`, `1.5`, `1e3` | Literal numérico. |
| `[a, b, c]` | Literal de array. |
| `func(arg1, arg2, ...)` | Llamada a función — solo se aceptan los nombres de función de la lista blanca (véase más abajo); cualquier otra cosa debe pasar por `js:`. |
| `=` | Igualdad (se compila a `==` de JS). |
| `!=` | Desigualdad. |
| `+ - * /` , `< <= > >=` | Aritmética / comparación, con el mismo significado que en JavaScript. |
| `AND` / `OR` | Y/o lógicos (se compilan a `&&` / `\|\|`). |
| `!expr` | Negación lógica. |
| `(expr)` | Agrupación. |
| `IF(cond, thenExpr, elseExpr)` | Condicional ternario — una forma especial integrada, no una función normal. |

Ejemplo:

```
IF($age >= 18 AND $status = 'active', 'adult-active', 'other')
→ (form.age >= 18 && form.status == 'active' ? 'adult-active' : 'other')
```

### Tipos de argumento

Como el DSL se compila a JavaScript pero necesita saber *cómo* interpretar cada argumento de función, cada función de la lista blanca tiene una firma de argumentos fija compuesta por estos tipos:

- **`arg`** — se analiza como una expresión normal y se pasa tal cual (así, `$field` se convierte en `form.field`, es decir, el *valor* del campo).
- **`field`** — se analiza como una expresión; si resulta ser una referencia `$field` simple, se convierte en la **cadena con el nombre del campo entrecomillado** en lugar del valor del campo (p. ej. `$age` → `'age'`), porque la función espera saber *sobre qué campo* operar, no un valor.
- **`func(form)`**, **`func(elem)`**, **`func(elemA, elemB)`** — se analiza como una expresión (normalmente una condición booleana/relacional escrita con `$field`) y después se envuelve en una función flecha de JS con los nombres de parámetro indicados, p. ej. `$gender = 'male'` como argumento `func(form)` se convierte en `(form) => form.gender == 'male'`.
- Un `?` final en un argumento lo marca como **opcional** — si lo omites, omites también todo lo que va después.

Conocer el tipo de argumento te indica cuándo escribir `$field` (para referenciar el valor actual de un campo) y cuándo esa misma sintaxis `$field` se convierte silenciosamente en una cadena con el nombre del campo.

### Referencia de funciones

**Carga y modelado de conjuntos de datos**

| Función | Firma (tipos) | Descripción |
|---|---|---|
| `BUILD_DATASET` | `(arg, arg?)` | Divide los datos planos en campos de nivel superior + `reps` (instancias de grupos repetidos), usando el esquema si se proporciona. |
| `FLATTEN_REPS` | `(arg, arg)` | Produce una fila de salida por cada instancia de un grupo repetido con nombre, fusionando los campos de nivel superior del padre con los campos de esa instancia. |
| `FROM_REPS` | `(arg, func(form))` | Evalúa una expresión una vez por cada instancia de grupo repetido (en todos los registros dados), recopilando los resultados no nulos en un array plano. |
| `APPLY` | `(arg, field, func(form))` | Devuelve una copia del conjunto de datos con un campo nuevo/derivado establecido en cada registro (y sus reps). |
| `APPLY_LABELS` | `(arg, arg, arg)` | Sustituye los valores de opción sin procesar por sus etiquetas legibles (del esquema) para la lista de nombres de campo indicada, en cada registro y sus reps. |
| `GET_LABELS` | `(arg, arg)` | Búsqueda independiente: asigna un array de valores de opción sin procesar a sus etiquetas usando un esquema. |
| `MAP` | `(arg, func(elem))` | Map de array normal. |
| `OP` | `(arg, arg, func(elemA, elemB))` | Combina dos arrays índice por índice, combinando cada par con una expresión binaria. |
| `JOIN_FORMS` | `(arg, arg, field, field?)` | Left join de dos conjuntos de datos haciendo coincidir un campo clave en cada lado. |
| `JOIN_REPEATING_SLIDES` | `(arg, arg, field, field, field, field?)` | Como `JOIN_FORMS`, pero además une las instancias de grupo repetido de cada par coincidente por una subclave. |

**Filtrado**

| Función | Firma | Descripción |
|---|---|---|
| `FILTER_BY` | `(arg, func(form))` | Devuelve una copia filtrada de un conjunto de datos; conserva un registro si coincide a nivel superior, o conserva solo las instancias de grupo repetido coincidentes si la coincidencia es a ese nivel. |

**Recuento y agregación**

| Función | Firma | Descripción |
|---|---|---|
| `COUNT_FORMS` | `(arg, func(form)?)` | Cuenta los registros que cumplen una condición, contando cada registro una sola vez aunque la condición coincida con más de una de sus instancias repetidas. |
| `COUNT_REPS` | `(arg, func(form)?)` | Cuenta por separado cada registro de nivel superior coincidente *y* cada instancia repetida coincidente — úsala para "número de ocurrencias" en lugar de "número de registros". |
| `SUM` | `(arg, field, func(form)?)` | Suma de un campo numérico en los registros e instancias repetidas, con un filtro opcional. |
| `MEAN` / `MEDIAN` / `MODE` / `MIN` / `MAX` | `(arg, field, func(form)?)` | Estadísticas agregadas estándar con un filtro opcional. |
| `ALL_VALUES_OF` | `(arg, field, func(form)?)` | Recopila todos los valores que toma un campo en los registros e instancias repetidas que cumplen un filtro opcional, **sin duplicados**. La herramienta estándar para "recuento de X distintos": envuélvela con `LEN(...)`. |
| `LEN` | `(arg)` | Longitud de un array. |
| `REMOVE_DUPLICATES` | `(arg)` | Elimina los duplicados de un array (por identidad de igualdad profunda), conservando el orden. |
| `INCLUDES` | `(arg, arg)` | Indica si un array (o una cadena) contiene un valor. |

**Fechas**

| Función | Firma | Descripción |
|---|---|---|
| `TODAY` | `()` | La fecha de hoy, `YYYY-MM-DD`. |
| `ADD_DAYS` | `(arg, arg)` | Una fecha más N días. |
| `DAYS_DIFF` | `(arg, arg)` | Diferencia en días completos entre dos fechas. |
| `GET_AGE` | `(arg, arg?)` | Edad en años completos dada una fecha de nacimiento (y una fecha de referencia opcional, por defecto hoy). |
| `IS_BEFORE` / `IS_AFTER` | `(arg, arg)` | Comparaciones de fechas. |
| `IS_WITHIN_INTERVAL` | `(arg, arg, arg)` | Comprobación de rango de fechas inclusivo. |
| `COMPARE_DATE` | `(arg, arg, arg, arg?)` | Clasifica una fecha como anterior/dentro de/posterior a un rango, con etiquetas personalizadas opcionales. |

**Números y formato**

| Función | Firma | Descripción |
|---|---|---|
| `ROUND` | `(arg, arg?)` | Redondea un número a N decimales (por defecto 0). |
| `PERCENT` | `(arg, arg)` | `a/b` como cadena de porcentaje. |
| `PERCENTAGE_CHANGE` | `(arg, arg)` | Cambio porcentual entre un valor y un valor de referencia. |
| `CHART_TO_DATA` | `(arg, arg)` | Combina arrays paralelos de etiquetas/valores en un único objeto. |
| `FORMAT_TABLE_ROWS` / `FORMAT_TABLE_COLS` / `FORMAT_TABLE_FIELDS` | varias | Representa un array de filas/columnas/registros como una cadena `<table>` HTML, útil dentro de componentes `html`. |

**Selección**

| Función | Firma | Descripción |
|---|---|---|
| `FIRST` / `LAST` | `(arg, func(form), field?)` | Encuentra el registro más antiguo/más reciente por un campo de fecha (por defecto un campo estándar de "fecha de creación") y evalúa una expresión sobre él. |

**IA / depuración**

| Función | Firma | Descripción |
|---|---|---|
| `PROMPT_RESULT` | `(arg, arg)` | Recupera el texto producido por una variable `isAIPrompt`. |
| `CONSOLE_LOG` | `(arg)` | Registra un valor en la consola y lo devuelve sin cambios — muy útil para depurar una fórmula en línea. |

**Obsoletas (se mantienen por compatibilidad hacia atrás; se prefiere la alternativa indicada)**

| Función | Prefiere en su lugar |
|---|---|
| `FILTER_BY_VARS` | `FILTER_BY` |
| `COUNT_FORMS_UNIQUE` | `LEN(ALL_VALUES_OF(...))` |
| `ISIN` | `INCLUDES` |
| `REPEAT` | `MAP` |
| `EVALUATE` | `IF` |

**Más allá de la lista blanca**

El DSL solo acepta las funciones anteriores (más `IF`). La librería de tiempo de ejecución subyacente expone funciones auxiliares adicionales (utilidades estadísticas como la desviación estándar, constructores internos de tablas/conjuntos de datos de componentes que usa el propio convertidor, etc.) que **no** son accesibles mediante la sintaxis de fórmulas normal — solo a través de la vía de escape de JavaScript sin procesar `js:` descrita en la sección 2.4.

## Componentes compatibles y sus propiedades

### `table` — tabla dinámica

Fila 1: etiquetas de los encabezados de columna. Fila 2: un código de estilo breve por columna, `[colspan][alignment][sortable]`:

- Primer carácter: colspan (un dígito, normalmente `1`).
- Segundo carácter: `l` = izquierda, `r` = derecha, cualquier otra cosa = centrado.
- Tercer carácter: `s` = columna ordenable, omitido/cualquier otra cosa = no ordenable.

A partir de la fila 3, la hoja se comporta de uno de estos dos modos:

**A. Tabla de lista de formulario** (vinculada a un conjunto de datos) — se usa cuando hay una columna `dataset`:

| Columna de configuración | Significado |
|---|---|
| *(la columna propia de cada encabezado)* | El nombre del campo que se muestra en esa columna, tomado de cada registro del conjunto de datos. |
| `dataset` | Nombre de la variable (con valor de array) que se itera — normalmente un conjunto de datos creado en `variables`. |
| `pagination` | Verdadero → produce una tabla paginada en lugar de una simple. |
| `dialog_fields` / `dialog_fields_labels` | Nombres de campo / etiquetas adicionales, separados por comas, que se muestran en un diálogo de detalle "leer más" por fila. |
| `link_field` / `link_position` | Campo que se usa como URL del enlace y el índice de columna que debe representarlo como enlace. |

**B. Tabla estática / calculada** (sin columna `dataset`) — cada fila restante es una fila de salida literal, y cada celda es a su vez una fórmula (o un literal, o una expresión `js:`); pon las cadenas literales entre comillas para que no se confundan con una referencia a variable simple (p. ej. `"140"` para el texto `140`, frente a `my_indicator` para mostrar el valor de una variable calculada).

Las celdas de encabezado se estilizan centradas, en negrita y con texto blanco sobre fondo sólido; las celdas del cuerpo alternan automáticamente los colores de fondo de las filas.

### `chart`

Solo la fila 1 (excepto Dispersión/Burbuja, véase más abajo). Columnas de opción reconocidas (se eliminan de la fila antes de tratar el resto como series de datos):

`chartType`, `title`, `stacked`, `beginAtZeroX`, `beginAtZeroY`, `axisLabelX`, `axisLabelY`, `axisMinX`, `axisMinY`, `axisMaxX`, `axisMaxY`, `removeZeroValues`, `mainDataNumberThreshold`.

- `chartType` debe ser uno de: `Line`, `Bar`, `HorizontalBar`, `Radar`, `Scatter`, `Doughnut`, `Pie`, `PolarArea`, `Bubble`.
- `labels` (opcional) — una fórmula que produce el array de etiquetas de categoría/eje.
- Cada uno de los demás encabezados de columna nombra una serie de datos; el valor de su celda es una fórmula que produce el array de números de esa serie.
- Los gráficos `Scatter` necesitan exactamente 2 filas de datos (valores X, valores Y); los gráficos `Bubble` necesitan exactamente 3 (X, Y, radio); cualquier otro tipo de gráfico necesita exactamente 1 fila de datos.
- Los colores se asignan automáticamente a partir de una paleta integrada (un color por serie, o uno por punto de datos para circular/dona/área polar).

### `image`

Solo la fila 1. Obligatorio: `url` (una fórmula que produce la URL de la imagen, o una cadena literal; usa el prefijo `js:` para una expresión JS sin procesar). Opcional: `align` (`left`/`center`/`right`), `width`, `height` (cadenas de longitud CSS).

### `html`

Solo la fila 1, una única columna `html`, que contiene una cadena HTML sin procesar (no analizada por el DSL de fórmulas). Admite marcadores de interpolación de doble corchete `[[expression]]`, que se evalúan y sustituyen en el momento de representar — úsalo para incrustar el valor de una variable calculada dentro de un marcado que por lo demás es estático.

### `single` — tarjeta KPI / de número grande

Solo la fila 1:

| Columna | Significado |
|---|---|
| `html` (opcional) | Un encabezado que se muestra encima del número. |
| `current_value` | Obligatorio. La variable/expresión cuyo valor se muestra como un número grande (representado mediante `[[current_value]]`). |
| `percentage_change` (opcional) | Si está presente, añade un indicador de tendencia (flecha hacia arriba/abajo/plana con color) según su signo, mostrado como `[[percentage_change]]%`. |

Como el mismo texto de celda se reutiliza tanto como valor interpolado como expresión de comparación sin procesar, `current_value` / `percentage_change` deberían ser generalmente nombres de variable simples definidos en la hoja `variables`, no fórmulas en línea completas.

### `graph`

Cada fila necesita una columna `id` no vacía. **Todas** las columnas de todas las filas (aparte de `id`) se analizan como fórmulas, produciendo un conjunto de datos de nodos de grafo por fila.

### `heatmap`

Solo la fila 1, todas las columnas opcionales con valores predeterminados razonables: `values` (una cadena JS sin procesar/fórmula que produce los datos de intensidad — no se analiza mediante el DSL de corchetes, ya debe ser válida), `idProp` (por defecto `'id'`), `features` (una cadena GeoJSON), `startColor`, `endColor`, `highlightColor`, `showVisualMap`.

### `paginatedlist`

Fila 1: un porcentaje numérico de ancho de columna por columna. Fila 2 (fila de configuración): nombre de campo por columna, más `dataset`, `title`, `pageSize` (por defecto 10), `link_field`/`link_position`, `cellStyles`, `rowStyle` (un literal de objeto de estilo sin procesar), `backgroundColorA`/`backgroundColorB` (colores de filas alternas). Cada fila resultante se representa como su propio componente de tabla compacto en lugar de una única tabla grande.

### `paginatedDialogList`

La misma configuración que `paginatedlist`, más dos filas adicionales (cuando están presentes): **etiquetas** de los campos del diálogo y después **nombres** de los campos del diálogo — al hacer clic en una fila se abre una ventana emergente que lista esos campos como pares etiqueta/valor.

### `filter` / `global filter`

Se estructura como una hoja `survey` de ODK/XLSForm (con una hoja `choices` complementaria en el mismo libro), se convierte en un esquema de formulario y se asocia como control de filtro interactivo:

- Una hoja con nombre `filter` (pero no `global`) se asocia al componente de la hoja inmediatamente siguiente.
- Una hoja con nombre que contiene tanto `filter` como `global` se asocia a todo el informe en lugar de a un único componente.

## Lista de comprobación rápida para crear un nuevo XLSReport

1. Identifica el formulario o formularios DINO que necesitas y sus nombres/esquemas exactos en tu instancia.
2. Empieza una hoja `variables`: carga cada formulario con `forms[...]`/`schemas[...]`, crea conjuntos de datos con `BUILD_DATASET` y aplica de inmediato los filtros de proyecto/ámbito (reasignando el mismo nombre de variable).
3. Precalcula como variable propia todo lo que reutilice más de un componente.
4. Añade una hoja por componente, con el nombre y la palabra clave correctos, en el orden en que quieres que aparezcan.
5. Da preferencia a la lista blanca del DSL de la sección 4.3; recurre a `js:` solo cuando un cálculo no encaje en ella.
6. Verifica dos veces los nombres de campo y los valores de opción con el esquema real o los datos exportados de tu instancia, en lugar de dar por hecho que coinciden exactamente con los nombres de campo del xlsform de origen.