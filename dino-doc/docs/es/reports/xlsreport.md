---
title: XLSReport
description: Una visión general del formato basado en Excel utilizado para crear report en Dino.
---

# El formato XLSReport

## Qué es XLSReport

XLSReport es un formato de autoría basado en hojas de cálculo para construir **report DINO / AJF (Advanced JSON Forms)** sin escribir JSON ni código a mano. Quien redacta un report completa un libro de Excel normal (`.xlsx`) siguiendo una serie de convenciones, y un conversor (`xls-report.ts`, parte de la librería `reports` de AJF) analiza ese libro y lo transforma en un form schema JSON `AjfReport` que la plataforma DINO puede representar como un panel en vivo: tablas, gráficos, cifras KPI, imágenes, grafos, mapas de calor y más.

Dos cosas lo hacen posible:

- **Correspondencia entre hoja y widget** — cada hoja del libro (con algunas excepciones especiales) se convierte en un widget del report. El orden de las hojas del libro es el orden en que se apilan los widgets en el report representado.
- **Un pequeño DSL de fórmulas** ("lenguaje de indicadores") — las celdas no contienen solo valores literales; la mayoría contienen expresiones cortas (por ejemplo, `SUM(D04, $persone, $tipo='corso')`) escritas en un mini-lenguaje compacto con lista blanca. Este DSL lo analiza `hindikit-parser.ts` y se traduce a JavaScript, que luego se ejecuta contra los datos del form subyacentes en el momento de representar/actualizar, usando una librería de funciones integradas (`expression-utils.ts`).

Esto significa que un XLSReport son en realidad dos cosas superpuestas: una **descripción de la disposición** (qué hojas producen qué widgets, y en qué orden) y una **descripción del cálculo** (qué fórmulas calculan los números, arrays y conjuntos de datos que esos widgets muestran). Dado que los datos subyacentes provienen de form DINO (los datos enviados), cualquier fórmula de un XLSReport lee en última instancia de uno o más conjuntos de datos de form y les da la forma que necesita cada widget (un único número, un array para un gráfico o una tabla de filas).

XLSReport es independiente de la plataforma y del proyecto: las mismas convenciones de libro se aplican a cualquier instancia de DINO y a cualquier conjunto de form — nada en el formato es específico de una organización o despliegue en particular.

## Estructura del archivo

Un XLSReport es un único libro `.xlsx`. El conversor recorre las hojas del libro **en orden** y decide qué hacer con cada una buscando una **subcadena clave en el nombre de la hoja** (no una coincidencia exacta) — por ejemplo, una hoja llamada `table_activities` o `2_table` se reconoce como hoja "table" porque el nombre *contiene* `table`.

### Categorías de hojas

| El nombre de la hoja contiene | Rol |
|---|---|
| `variables` (nombre exacto) | Declara variables/conjuntos de datos con nombre que usan las hojas posteriores. No produce un widget por sí misma. |
| `filter` | Declara un form de filtro (estilo ODK/XLSForm `survey` + `choices`) asociado a la hoja *siguiente* del libro. No produce un widget propio. |
| `filter` **y** `global` | Igual que el anterior, pero el filtro resultante se aplica a todo el report en lugar de a un único widget. |
| `choices` | Una hoja complementaria que contiene listas de opciones (`list_name`, `name`, `label`), usada junto con las hojas `filter`. |
| `table` | Un widget `DynamicTable` o `PaginatedTable`. |
| `chart` | Un widget `Chart` (barras, líneas, circular, etc.). |
| `image` | Un widget `Image`. |
| `html` | Un widget `Text` que representa HTML en bruto. |
| `graph` | Un widget `Graph` (nodos/red). |
| `heatmap` | Un widget `HeatMap`. |
| `single` | Uno o más widgets `Text` que forman una tarjeta KPI/"número grande". |
| `paginatedlist` | Un widget `PaginatedList` (una fila = un mini widget de tabla). |
| `paginatedDialogList` | Un widget `PaginatedList` cuyas elementos abren un cuadro de diálogo de detalle. |

Los nombres de las hojas por lo demás son libres — úsalos para que el libro se documente por sí mismo (por ejemplo, `table_beneficiaries_by_month`, `chart_gender_split`). Dado que la coincidencia es por subcadena, evita elegir nombres que contengan accidentalmente otra palabra clave (por ejemplo, no llames a una hoja de gráfico `charttable`).

### Convenciones de filas dentro de una hoja

Toda hoja de widget se lee como una conversión normal de hoja de cálculo a JSON: **la fila 1 contiene los encabezados de columna** y **de la fila 2 en adelante están los datos**, un objeto JSON por fila con las claves tomadas del texto del encabezado. Más allá de esa regla genérica, cada tipo de hoja define su propio significado para la fila de encabezado y para la primera o las dos primeras filas de datos (documentado por widget en la sección 5).

### Disposición general

Todo el libro se envuelve en **una disposición de nivel superior que contiene una sola columna**, y cada hoja no especial aporta exactamente un widget (o, en el caso de `single`, varios) añadido a esa columna en el orden de las hojas. En otras palabras:

- El report es siempre una **pila vertical única de widgets** — no hay forma a nivel de hoja de cálculo de crear columnas paralelas o contenedores anidados; el único "anidamiento" que existe lo genera internamente `paginatedlist` / `paginatedDialogList` (cada fila es en sí misma una pequeña tabla o un widget de diálogo).
- Una hoja con `filter` en el nombre asocia su filtro al widget de la hoja que **la sigue inmediatamente**; una hoja `global filter` se asocia al contenedor externo del report en lugar de a un único widget.

### La vía de escape universal: `js:`

Cualquier celda que normalmente se analiza mediante el DSL de fórmulas puede empezar en su lugar por `js:` — todo lo que sigue a ese prefijo se trata como **JavaScript en bruto** y se deja pasar sin analizar. Esto da acceso a todas las funciones exportadas por la librería de utilidades en tiempo de ejecución, no solo a las que están en la lista blanca de la gramática del DSL (véase la sección 4), y a expresiones JS arbitrarias (IIFEs, uso de `Set`/`Map`, funciones auxiliares en línea personalizadas, etc.). Úsalo cuando un cálculo no encaje en la lista blanca de funciones o en las formas de argumento del DSL.

## Declarar variables

La hoja `variables` es donde cargas los datos del form y precalculas todo lo que reutilizarán varios widgets más adelante en el libro (conjuntos de datos, filtros, valores de indicadores, etiquetas).

### Columnas

| Columna | Significado |
|---|---|
| `name` | El identificador de la variable. Debe ser un identificador válido (letras, dígitos, guion bajo, sin empezar por un dígito) — los nombres no válidos se rechazan. |
| `value` | Una expresión, analizada con el mismo DSL de fórmulas que cualquier otra celda (o JavaScript en bruto con prefijo `js:`). |
| `isAIPrompt` (opcionales) | Booleano; marca la variable como resultado de un prompt de IA en lugar de una fórmula normal, para poder leerla después con `PROMPT_RESULT`. |

Las filas con `name` vacío se omiten. Las variables se evalúan de arriba abajo, y **cada variable puede referenciar cualquier variable declarada por encima de ella** por su nombre simple (sin prefijo `$` — ese prefijo está reservado para los *campos* del form, véase la sección 4).

### Cargar datos del form

Siempre hay disponibles dos búsquedas en tiempo de ejecución:

- `forms['<form name>']` — el array en bruto de datos enviados para un form DINO dado.
- `schemas['<form name>']` — el form schema (se usa para resolver la estructura de grupos repetidos y las etiquetas de las opciones).

La cadena exacta del nombre del form que debes usar es el identificador que DINO asigna a ese form — obtenlo de la configuración de administración/form de DINO para tu instancia (normalmente coincidirá, pero no se garantiza que coincida exactamente, con el nombre de archivo xlsform del form; comprueba diferencias de espaciado, mayúsculas y espacios finales).

El bloque de apertura estándar de una hoja `variables` carga cada form que necesitas y lo convierte en un conjunto de datos estructurado:

```
name  | value
F01   | forms['my_form_name']
S01   | schemas['my_form_name']
D01   | BUILD_DATASET(F01,S01)
```

`BUILD_DATASET(forms, schema)` divide cada dato enviado plano en campos de nivel superior no repetidos más un objeto `reps` que agrupa las instancias de grupos repetidos ("repeat"/slide) por su nombre de grupo real (derivado del schema). Sin un schema, recurre a una heurística genérica. A partir de este punto, `D01` es el conjunto de datos que filtras, agregas y muestras.

### Acotar / filtrar un conjunto de datos una vez, para todos los usos posteriores

Un patrón muy común y recomendado es **filtrar un conjunto de datos y reasignarlo al mismo nombre de variable**, de modo que toda fórmula que referencie esa variable a partir de ese momento herede automáticamente el filtro — en lugar de repetir la condición de filtro en cada fórmula:

```
name | value
D01  | FILTER_BY(D01, $status='active')
```

Esto es especialmente importante porque **los conjuntos de datos de form con frecuencia se comparten entre más de un proyecto, campaña o ámbito en la misma instancia de DINO** — nunca asumas que un array `forms['...']` ya está acotado solo a los datos que te interesan. Si tus form llevan un campo de proyecto/ámbito (su nombre exacto depende del diseño del form de tu instancia, por ejemplo algo como `$project_name`), filtra cada conjunto de datos explícitamente:

```
scope_name = 'MY PROJECT'
D0X = FILTER_BY(D0X, $project_field = scope_name OR $secondary_project_field = scope_name)
```

Si un conjunto de datos tiene un grupo repetido cuyas instancias individuales necesitan su propia acotación (por ejemplo, un repeat de "participantes" donde un único registro colectivo puede incluir participantes que pertenecen a ámbitos distintos), filtra también a nivel de instancia individual, normalmente mediante `FLATTEN_REPS` combinado con `FILTER_BY` sobre el array aplanado, antes de extraer los valores que necesitas con `ALL_VALUES_OF` (véase la sección 4 para estas funciones). Comprueba siempre el campo que realmente contiene el valor identificativo/de referencia de una instancia repetida — puede que no contenga lo que su nombre sugiere (por ejemplo, un campo de referencia "participant" dentro de un repeat puede almacenar el *nombre visible* del registro enlazado en lugar de su *código/id*; verifícalo con datos reales exportados antes de hacer un join o deduplicar por él, y usa la misma clave en ambos lados de cualquier comparación).

### Variables de prompt de IA

Si `isAIPrompt` está activado en una fila de variable, su valor representa el resultado de un prompt generado por IA en lugar de una fórmula calculada normal. En cualquier otra parte del libro puedes recuperar ese texto con `PROMPT_RESULT(report_data, '<variable name>')` e interpolarlo en un widget HTML o single-indicator.

## Visión general del DSL de fórmulas

Cada celda que no empiece por `js:` se analiza con un pequeño analizador descendente recursivo que la convierte en una expresión JavaScript, y luego se evalúa contra un contexto de datos en tiempo de ejecución.

### Sintaxis básica

| Sintaxis | Significado |
|---|---|
| `$fieldname` | Una referencia a un campo del form. Se traduce a `form.fieldname` (`form` es el registro que esté en el ámbito en esa parte de la expresión). |
| `bareIdentifier` | Una referencia a un nombre de la hoja `variables`, a un nombre de función o a una palabra clave literal. |
| `'text'` / `"text"` | Literal de cadena. |
| `123`, `1.5`, `1e3` | Literal numérico. |
| `[a, b, c]` | Literal de array. |
| `func(arg1, arg2, ...)` | Llamada a función — solo se aceptan los nombres de función de la lista blanca (véase más abajo); cualquier otra cosa debe pasar por `js:`. |
| `=` | Igualdad (se compila a `==` de JS). |
| `!=` | Desigualdad. |
| `+ - * /` , `< <= > >=` | Aritmética / comparación, con el mismo significado que en JavaScript. |
| `AND` / `OR` | Y/o lógico (se compilan a `&&` / `\|\|`). |
| `!expr` | Negación lógica. |
| `(expr)` | Agrupación. |
| `IF(cond, thenExpr, elseExpr)` | Condicional ternario — una forma especial integrada, no una función normal. |

Ejemplo:

```
IF($age >= 18 AND $status = 'active', 'adult-active', 'other')
→ (form.age >= 18 && form.status == 'active' ? 'adult-active' : 'other')
```

### Tipos de argumento

Dado que el DSL se compila a JavaScript pero debe saber *cómo* interpretar cada argumento de función, cada función de la lista blanca tiene una firma de argumentos fija compuesta por estos tipos:

- **`arg`** — se analiza como una expresión normal y se pasa tal cual (así, `$field` se convierte en `form.field`, es decir, el *valor* del campo).
- **`field`** — se analiza como una expresión; si resulta ser una referencia `$field` simple, se convierte en la **cadena del nombre del campo entrecomillada** en lugar del valor del campo (por ejemplo, `$age` → `'age'`), porque la función espera saber *sobre qué campo* operar, no un valor.
- **`func(form)`**, **`func(elem)`**, **`func(elemA, elemB)`** — se analiza como una expresión (normalmente una condición booleana/relacional escrita con `$field`), y luego se envuelve en una función flecha de JS con los nombres de parámetro indicados, por ejemplo, `$gender = 'male'` como argumento `func(form)` se convierte en `(form) => form.gender == 'male'`.
- Un `?` final en un argumento lo marca como **opcionales** — omítelo junto con todo lo que venga después.

Conocer el tipo de argumento te dice cuándo escribir `$field` (para referenciar el valor actual de un campo) y cuándo esa misma sintaxis `$field` se convierte silenciosamente en una cadena con el nombre del campo.

### Referencia de funciones

**Cargar y dar forma a los conjuntos de datos**

| Función | Firma (tipos) | Descripción |
|---|---|---|
| `BUILD_DATASET` | `(arg, arg?)` | Divide los datos enviados planos en campos de nivel superior + `reps` (instancias de grupos repetidos), usando el schema si se proporciona. |
| `FLATTEN_REPS` | `(arg, arg)` | Produce una fila de salida por cada instancia de un grupo repetido con nombre, fusionando los campos de nivel superior del padre con los campos de esa instancia. |
| `FROM_REPS` | `(arg, func(form))` | Evalúa una expresión una vez por cada instancia de grupo repetido (en todos los registros dados), recogiendo los resultados no nulos en un array plano. |
| `APPLY` | `(arg, field, func(form))` | Devuelve una copia del conjunto de datos con un campo nuevo/derivado establecido en cada registro (y en sus reps). |
| `APPLY_LABELS` | `(arg, arg, arg)` | Reemplaza los valores de opción en bruto por sus etiquetas legibles (del schema) para la lista de nombres de campo dada, en cada registro y en sus reps. |
| `GET_LABELS` | `(arg, arg)` | Búsqueda independiente: asigna un array de valores de opción en bruto a sus etiquetas usando un schema. |
| `MAP` | `(arg, func(elem))` | Map de array normal. |
| `OP` | `(arg, arg, func(elemA, elemB))` | Combina dos arrays índice por índice, uniendo cada par con una expresión binaria. |
| `JOIN_FORMS` | `(arg, arg, field, field?)` | Left join de dos conjuntos de datos haciendo coincidir un campo clave en cada lado. |
| `JOIN_REPEATING_SLIDES` | `(arg, arg, field, field, field, field?)` | Como `JOIN_FORMS`, pero además une las instancias de grupos repetidos de cada par coincidente por una subclave. |

**Filtro**

| Función | Firma | Descripción |
|---|---|---|
| `FILTER_BY` | `(arg, func(form))` | Devuelve una copia filtrada de un conjunto de datos; conserva un registro si coincide a nivel superior, o conserva solo las instancias de grupo repetido coincidentes si la coincidencia es a ese nivel. |

**Recuento y agregación**

| Función | Firma | Descripción |
|---|---|---|
| `COUNT_FORMS` | `(arg, func(form)?)` | Cuenta los registros que cumplen una condición, contando cada registro una vez aunque la condición coincida con más de una de sus instancias repetidas. |
| `COUNT_REPS` | `(arg, func(form)?)` | Cuenta por separado cada registro de nivel superior coincidente *y* cada instancia repetida coincidente — úsala para "número de ocurrencias" en lugar de "número de registros". |
| `SUM` | `(arg, field, func(form)?)` | Suma de un campo numérico en registros e instancias repetidas, con un filtro opcional. |
| `MEAN` / `MEDIAN` / `MODE` / `MIN` / `MAX` | `(arg, field, func(form)?)` | Estadísticas agregadas estándar con un filtro opcional. |
| `ALL_VALUES_OF` | `(arg, field, func(form)?)` | Recoge todos los valores que toma un campo en los registros e instancias repetidas que cumplen un filtro opcional, **sin duplicados**. La herramienta estándar para "recuento de X distintos": envuélvela con `LEN(...)`. |
| `LEN` | `(arg)` | Longitud de un array. |
| `REMOVE_DUPLICATES` | `(arg)` | Elimina los duplicados de un array (por identidad de igualdad profunda), conservando el orden. |
| `INCLUDES` | `(arg, arg)` | Si un array (o cadena) contiene un valor. |

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
| `FORMAT_TABLE_ROWS` / `FORMAT_TABLE_COLS` / `FORMAT_TABLE_FIELDS` | varias | Representa un array de filas/columnas/registros como una cadena HTML `<table>`, útil dentro de widgets `html`. |

**Selección**

| Función | Firma | Descripción |
|---|---|---|
| `FIRST` / `LAST` | `(arg, func(form), field?)` | Encuentra el registro más antiguo/reciente por un campo de fecha (por defecto, un campo estándar de "created at") y evalúa una expresión contra él. |

**IA / depuración**

| Función | Firma | Descripción |
|---|---|---|
| `PROMPT_RESULT` | `(arg, arg)` | Lee el texto producido por una variable `isAIPrompt`. |
| `CONSOLE_LOG` | `(arg)` | Registra un valor en la consola y lo devuelve sin cambios — práctico para depurar una fórmula en línea. |

**Obsoletas (se mantienen por compatibilidad; se prefiere la alternativa indicada)**

| Función | Preferir en su lugar |
|---|---|
| `FILTER_BY_VARS` | `FILTER_BY` |
| `COUNT_FORMS_UNIQUE` | `LEN(ALL_VALUES_OF(...))` |
| `ISIN` | `INCLUDES` |
| `REPEAT` | `MAP` |
| `EVALUATE` | `IF` |

**Más allá de la lista blanca**

El DSL solo acepta las funciones anteriores (más `IF`). La librería de tiempo de ejecución subyacente expone funciones auxiliares adicionales (utilidades estadísticas como la desviación estándar, constructores internos de tablas/conjuntos de datos de widgets usados por el propio conversor, etc.) que **no** son accesibles mediante la sintaxis de fórmulas normal — solo a través de la vía de escape de JavaScript en bruto `js:` descrita en la sección 2.4.

## Widgets compatibles y sus propiedades

### `table` — tabla dinámica

Fila 1: etiquetas de encabezado de columna. Fila 2: un código de estilo corto por columna, `[colspan][alignment][sortable]`:

- Primer carácter: colspan (un dígito, normalmente `1`).
- Segundo carácter: `l` = izquierda, `r` = derecha, cualquier otra cosa = centro.
- Tercer carácter: `s` = columna ordenable, omitido/cualquier otra cosa = no ordenable.

A partir de la fila 3, la hoja se comporta de uno de estos dos modos:

**A. Tabla de lista de form** (vinculada a un conjunto de datos) — se usa cuando hay una columna `dataset`:

| Columna de configuración | Significado |
|---|---|
| *(la columna propia de cada encabezado)* | El nombre del campo que se muestra en esa columna, tomado de cada registro del conjunto de datos. |
| `dataset` | Nombre de la variable (con valor de array) a iterar — normalmente un conjunto de datos creado en `variables`. |
| `pagination` | Verdadero → produce una tabla paginada en lugar de una simple. |
| `dialog_fields` / `dialog_fields_labels` | Nombres / etiquetas de campos adicionales separados por comas que se muestran en un cuadro de diálogo de detalle "leer más" por registro. |
| `link_field` / `link_position` | Campo que se usa como URL del enlace, y qué índice de columna debe mostrarlo como enlace. |

**B. Tabla estática / calculada** (sin columna `dataset`) — cada fila restante es una fila de salida literal, y cada celda es en sí misma una fórmula (o literal, o expresión `js:`); entrecomilla una cadena literal para que no se confunda con una referencia a variable simple (por ejemplo, `"140"` para el texto `140`, frente a `my_indicator` para mostrar el valor de una variable calculada).

Las celdas de encabezado se estilizan centradas, en negrita, con texto blanco sobre fondo sólido; las celdas del cuerpo alternan automáticamente los colores de fondo de las filas.

### `chart`

Solo fila 1 (excepto Scatter/Bubble, véase más abajo). Columnas de opciones reconocidas (se eliminan de la fila antes de tratar el resto como series de datos):

`chartType`, `title`, `stacked`, `beginAtZeroX`, `beginAtZeroY`, `axisLabelX`, `axisLabelY`, `axisMinX`, `axisMinY`, `axisMaxX`, `axisMaxY`, `removeZeroValues`, `mainDataNumberThreshold`.

- `chartType` debe ser uno de: `Line`, `Bar`, `HorizontalBar`, `Radar`, `Scatter`, `Doughnut`, `Pie`, `PolarArea`, `Bubble`.
- `labels` (opcionales) — una fórmula que produce el array de etiquetas de categoría/eje.
- Cada encabezado de columna restante nombra una serie de datos; el valor de su celda es una fórmula que produce el array de números de esa serie.
- Los gráficos `Scatter` necesitan exactamente 2 filas de datos (valores X, valores Y); los gráficos `Bubble` necesitan exactamente 3 (X, Y, radio); cualquier otro tipo de gráfico necesita exactamente 1 fila de datos.
- Los colores se asignan automáticamente desde una paleta integrada (un color por serie, o uno por punto de datos para circular/doughnut/área polar).

### `image`

Solo fila 1. Obligatorias: `url` (una fórmula que produce la URL de la imagen, o una cadena literal; con prefijo `js:` para una expresión JS en bruto). Opcionales: `align` (`left`/`center`/`right`), `width`, `height` (cadenas de longitud CSS).

### `html`

Solo fila 1, una única columna `html`, que contiene una cadena HTML en bruto (no se analiza con el DSL de fórmulas). Admite marcadores de interpolación de doble corchete `[[expression]]`, que se evalúan y sustituyen al representar — úsalo para incrustar el valor de una variable calculada dentro de un marcado por lo demás estático.

### `single` — tarjeta KPI / número grande

Solo fila 1:

| Columna | Significado |
|---|---|
| `html` (opcionales) | Un encabezado que se muestra encima del número. |
| `current_value` | Obligatoria. La variable/expresión cuyo valor se muestra como un número grande (se representa mediante `[[current_value]]`). |
| `percentage_change` (opcionales) | Si está presente, añade un indicador de tendencia (flecha arriba/abajo/plana con color) basado en su signo, que se muestra como `[[percentage_change]]%`. |

Como el mismo texto de celda se reutiliza tanto como valor interpolado como expresión de comparación en bruto, `current_value` / `percentage_change` normalmente deberían ser nombres de variable simples definidos en la hoja `variables`, no fórmulas completas en línea.

### `graph`

Cada fila necesita una columna `id` no vacía. **Todas** las columnas de todas las filas (aparte de `id`) se analizan como una fórmula, produciendo un conjunto de datos de nodos de grafo por fila.

### `heatmap`

Solo fila 1, todas las columnas opcionales con valores predeterminados razonables: `values` (una cadena JS en bruto/fórmula que produce los datos de intensidad — no se analiza con el DSL de corchetes, ya debe ser válida), `idProp` (por defecto `'id'`), `features` (una cadena GeoJSON), `startColor`, `endColor`, `highlightColor`, `showVisualMap`.

### `paginatedlist`

Fila 1: un porcentaje numérico de ancho de columna por columna. Fila 2 (fila de configuración): nombre de campo por columna, más `dataset`, `title`, `pageSize` (por defecto 10), `link_field`/`link_position`, `cellStyles`, `rowStyle` (un literal de objeto de estilo en bruto), `backgroundColorA`/`backgroundColorB` (colores de rayas alternas). Cada fila resultante se representa como su propio widget de tabla compacto en lugar de una única tabla grande.

### `paginatedDialogList`

La misma configuración que `paginatedlist`, más dos filas adicionales (cuando están presentes): **etiquetas** de los campos del diálogo, y luego **nombres** de los campos del diálogo — al hacer clic en una fila se abre una ventana emergente que lista esos campos como pares etiqueta/valor.

### `filter` / `global filter`

Estructurada como una hoja `survey` de ODK/XLSForm (con una hoja `choices` complementaria en el mismo libro), convertida en un form schema y asociada como control de filtro interactivo:

- Una hoja con `filter` en el nombre (pero no `global`) se asocia al widget de la hoja inmediatamente siguiente.
- Una hoja con `filter` y `global` en el nombre se asocia a todo el report en lugar de a un único widget.

## Lista de comprobación rápida para crear un nuevo XLSReport

1. Identifica el form o los form DINO que necesitas y sus nombres de form/schemas exactos en tu instancia.
2. Empieza una hoja `variables`: carga cada form con `forms[...]`/`schemas[...]`, crea conjuntos de datos con `BUILD_DATASET` y aplica de inmediato los filtros de proyecto/ámbito (reasignando el mismo nombre de variable).
3. Precalcula como variable con nombre propia todo lo que reutilice más de un widget.
4. Añade una hoja por widget, con el nombre y la palabra clave correctos, en el orden en que quieras que aparezcan.
5. Prefiere la lista blanca del DSL de la sección 4.3; recurre a `js:` solo cuando un cálculo no encaje en ella.
6. Verifica dos veces los nombres de campo y los valores de opción con el schema real o los datos exportados de tu instancia, en lugar de asumir que coinciden exactamente con los nombres de campo del xlsform de origen.