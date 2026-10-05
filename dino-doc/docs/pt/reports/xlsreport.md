---
title: XLSReport
description: Uma visão geral do formato baseado em Excel usado para criar relatórios no Dino.
---

# O formato XLSReport

## O que é o XLSReport

XLSReport é um formato de criação baseado em folha de cálculo para construir **relatórios DINO / AJF (Advanced JSON Forms)** sem escrever JSON ou código à mão. Um autor de relatórios preenche um livro de Excel comum (`.xlsx`) seguindo um conjunto de convenções, e um conversor (`xls-report.ts`, parte da biblioteca `reports` do AJF) analisa esse livro num form schema `AjfReport` que a plataforma DINO pode renderizar como um dashboard em tempo real: tabelas, gráficos, números KPI, imagens, grafos, heatmaps e muito mais.

Duas coisas tornam isto possível:

- **Mapeamento entre folhas e widgets** — cada folha do livro (com algumas exceções especiais) torna-se um widget de relatório. A ordem das folhas no livro é a ordem em que os widgets são empilhados no relatório renderizado.
- **Uma pequena DSL de fórmulas** ("linguagem de indicadores") — as células não contêm apenas valores literais; a maioria contém expressões curtas (por exemplo, `SUM(D04, $persone, $tipo='corso')`) escritas numa mini-linguagem compacta e com lista branca. Esta DSL é analisada por `hindikit-parser.ts` e traduzida para JavaScript, que é depois executado sobre os dados do form subjacentes no momento da renderização/atualização, usando uma biblioteca de funções incorporadas (`expression-utils.ts`).

Isto significa que um XLSReport é, na realidade, duas coisas sobrepostas: uma **descrição de layout** (que folhas produzem que widgets, em que ordem) e uma **descrição de cálculo** (que fórmulas calculam os números, arrays e conjuntos de dados que esses widgets apresentam). Como os dados subjacentes provêm de form DINO (dados), qualquer fórmula de um XLSReport acaba por ler de um ou mais conjuntos de dados de form e modelá-los conforme o que um widget precisa (um único número, um array para um gráfico ou uma tabela de linhas).

O XLSReport é independente da plataforma e do projeto: as mesmas convenções de livro aplicam-se a qualquer instância DINO e a qualquer conjunto de form — nada no formato é específico de uma determinada organização ou implementação.

## Estrutura do ficheiro

Um XLSReport é um único livro `.xlsx`. O conversor percorre as folhas do livro **por ordem** e decide o que fazer com cada uma procurando uma **subcadeia de palavra-chave no nome da folha** (não uma correspondência exata) — por exemplo, uma folha com o nome `table_activities` ou `2_table` é reconhecida como uma folha "table" porque o nome *contém* `table`.

### Categorias de folhas

| O nome da folha contém | Função |
|---|---|
| `variables` (nome exato) | Declara variáveis/conjuntos de dados nomeados usados pelas folhas seguintes. Não produz um widget por si só. |
| `filter` | Declara um form de filtro (estilo ODK/XLSForm `survey` + `choices`) associado à folha *seguinte* no livro. Não produz um widget próprio. |
| `filter` **e** `global` | Igual ao anterior, mas o filtro resultante aplica-se a todo o relatório em vez de a um único widget. |
| `choices` | Uma folha complementar que contém listas de opções (`list_name`, `name`, `label`), usada em conjunto com as folhas `filter`. |
| `table` | Um widget `DynamicTable` ou `PaginatedTable`. |
| `chart` | Um widget `Chart` (barras, linhas, circular, etc.). |
| `image` | Um widget `Image`. |
| `html` | Um widget `Text` que renderiza HTML em bruto. |
| `graph` | Um widget `Graph` (nós/rede). |
| `heatmap` | Um widget `HeatMap`. |
| `single` | Um ou mais widgets `Text` que formam um cartão KPI/"número grande". |
| `paginatedlist` | Um widget `PaginatedList` (uma linha = um widget de mini tabela). |
| `paginatedDialogList` | Um widget `PaginatedList` cujas dados abrem um diálogo de detalhe. |

De resto, os nomes das folhas são livres — use-os para manter o livro autodocumentado (por exemplo, `table_beneficiaries_by_month`, `chart_gender_split`). Como a correspondência é uma verificação de subcadeia, evite escolher nomes que contenham acidentalmente outra palavra-chave (por exemplo, não dê a uma folha de gráfico o nome `charttable`).

### Convenções de linhas dentro de uma folha

Cada folha de widget é lida como uma conversão normal de folha de cálculo para JSON: **a linha 1 contém os cabeçalhos das colunas** e **a partir da linha 2 estão os dados**, um objeto JSON por linha com as chaves baseadas no texto do cabeçalho. Para além dessa regra genérica, cada tipo de folha define o seu próprio significado para a linha de cabeçalho e para a primeira ou as duas primeiras linhas de dados (documentado por widget na secção 5).

### Layout geral

Todo o livro é envolvido em **um layout de nível superior que contém uma única coluna**, e cada folha não especial contribui com exatamente um widget (ou, para `single`, vários) acrescentado a essa coluna pela ordem das folhas. Por outras palavras:

- O relatório é sempre uma **pilha vertical única de widgets** — não existe forma, ao nível da folha de cálculo, de criar colunas lado a lado ou contentores aninhados; o único "aninhamento" que existe é gerado internamente por `paginatedlist` / `paginatedDialogList` (cada linha é ela própria um pequeno widget de tabela ou diálogo).
- Uma folha com o nome `filter` associa o seu filtro ao widget da folha que **a segue imediatamente**; uma folha `global filter` associa-se ao contentor externo do relatório em vez de a um único widget.

### A saída de emergência universal: `js:`

Qualquer célula que seja normalmente analisada através da DSL de fórmulas pode, em vez disso, começar por `js:` — tudo o que vem depois desse prefixo é tratado como **JavaScript em bruto** e passado sem análise. Isto dá acesso a todas as funções exportadas pela biblioteca de utilitários de runtime, não apenas às que estão na lista branca da gramática da DSL (ver secção 4), e a expressões JS arbitrárias (IIFEs, uso de `Set`/`Map`, funções auxiliares inline personalizadas, etc.). Use-a quando um cálculo não se encaixar na lista branca de funções da DSL ou nas formas dos argumentos.

## Declarar variáveis

A folha `variables` é onde carrega os dados dos form e pré-calcula tudo o que é reutilizado por vários widgets mais adiante no livro (conjuntos de dados, filtros, valores de indicadores, rótulos).

### Colunas

| Coluna | Significado |
|---|---|
| `name` | O identificador da variável. Deve ser um identificador válido (letras, dígitos, sublinhado, não começando por um dígito) — os nomes inválidos são rejeitados. |
| `value` | Uma expressão, analisada através da mesma DSL de fórmulas que todas as outras células (ou JavaScript em bruto com prefixo `js:`). |
| `isAIPrompt` (opcionais) | Booleano; marca a variável como resultado de um prompt de IA em vez de uma fórmula simples, para que possa ser lida mais tarde com `PROMPT_RESULT`. |

As linhas com um `name` vazio são ignoradas. As variáveis são avaliadas de cima para baixo, e **cada variável pode referenciar qualquer variável declarada acima dela** pelo seu nome simples (sem prefixo `$` — esse prefixo está reservado para *campos* de form, ver secção 4).

### Carregar dados de form

Dois acessos de runtime estão sempre disponíveis:

- `forms['<form name>']` — o array em bruto de dados de um determinado form DINO.
- `schemas['<form name>']` — o form schema (usado para resolver a estrutura de grupos repetidos e os rótulos das opções).

A string exata do nome do form a usar é o identificador que a DINO atribui a esse form — obtenha-o a partir da configuração de administração/form da DINO da sua instância (normalmente corresponderá, mas não é garantido que corresponda exatamente, ao nome do ficheiro xlsform do form; verifique diferenças de espaçamento, maiúsculas/minúsculas e espaços no final).

O bloco de abertura padrão de uma folha `variables` carrega cada form de que precisa e transforma-o num conjunto de dados estruturado:

```
name  | value
F01   | forms['my_form_name']
S01   | schemas['my_form_name']
D01   | BUILD_DATASET(F01,S01)
```

`BUILD_DATASET(forms, schema)` divide cada dados plano em campos de nível superior não repetidos mais um objeto `reps` que agrupa as instâncias de grupos repetidos ("repeat"/slide) pelo seu nome real de grupo (derivado do schema). Sem um schema, recorre a uma heurística genérica. A partir daqui, `D01` é o conjunto de dados que filtra, agrega e apresenta.

### Delimitar/filtrar um conjunto de dados uma vez, para todos os usos posteriores

Um padrão muito comum e recomendado é **filtrar um conjunto de dados e reatribuí-lo ao mesmo nome de variável**, para que cada fórmula que referencie essa variável a partir daí herde automaticamente o filtro — em vez de repetir a condição do filtro em cada fórmula:

```
name | value
D01  | FILTER_BY(D01, $status='active')
```

Isto é especialmente importante porque **os conjuntos de dados de form são frequentemente partilhados por mais do que um projeto, campanha ou âmbito na mesma instância DINO** — nunca assuma que um array `forms['...']` já está delimitado apenas aos dados que lhe interessam. Se os seus form tiverem um campo de projeto/âmbito (o nome exato depende do design do form da sua instância, por exemplo algo como `$project_name`), filtre cada conjunto de dados explicitamente:

```
scope_name = 'O MEU PROJETO'
D0X = FILTER_BY(D0X, $project_field = scope_name OR $secondary_project_field = scope_name)
```

Se um conjunto de dados tiver um grupo repetido cujas instâncias individuais precisam do seu próprio âmbito (por exemplo, um repeat de "participantes" em que um único registo coletivo pode incluir participantes pertencentes a âmbitos diferentes), filtre também ao nível de cada instância, normalmente através de `FLATTEN_REPS` combinado com `FILTER_BY` sobre o array achatado, antes de extrair os valores de que precisa com `ALL_VALUES_OF` (ver secção 4 para estas funções). Verifique sempre o campo que contém efetivamente o valor identificador/referência de uma instância repetida — pode não conter o que o seu nome sugere (por exemplo, um campo de referência "participant" dentro de um repeat pode guardar o *nome de apresentação* do registo associado em vez do seu *código/id*; confirme com dados reais exportados antes de fazer junções/deduplicações com base nele, e use a mesma chave em ambos os lados de qualquer comparação).

### Variáveis de prompt de IA

Se `isAIPrompt` estiver definido numa linha de variável, o seu valor representa o resultado de um prompt gerado por IA em vez de uma fórmula calculada simples. Em qualquer outro ponto do livro, pode recuperar esse texto com `PROMPT_RESULT(report_data, '<variable name>')` e interpolar em HTML ou num widget de indicador único.

## Visão geral da DSL de fórmulas

Cada célula que não comece por `js:` é analisada por um pequeno parser descendente recursivo numa expressão JavaScript e depois avaliada contra um contexto de dados em tempo de execução.

### Sintaxe principal

| Sintaxe | Significado |
|---|---|
| `$fieldname` | Uma referência a um campo de form. Traduzida para `form.fieldname` (`form` é o registo que estiver em âmbito nessa parte da expressão). |
| `bareIdentifier` | Uma referência a um nome da folha `variables`, um nome de função ou uma palavra-chave literal. |
| `'text'` / `"text"` | Literal de string. |
| `123`, `1.5`, `1e3` | Literal numérico. |
| `[a, b, c]` | Literal de array. |
| `func(arg1, arg2, ...)` | Chamada de função — só são aceites nomes de funções na lista branca (ver abaixo); qualquer outra coisa tem de passar por `js:`. |
| `=` | Igualdade (compila para `==` em JS). |
| `!=` | Desigualdade. |
| `+ - * /` , `< <= > >=` | Aritmética / comparação, com o mesmo significado que em JavaScript. |
| `AND` / `OR` | E/ou lógico (compilam para `&&` / `\|\|`). |
| `!expr` | Negação lógica. |
| `(expr)` | Agrupamento. |
| `IF(cond, thenExpr, elseExpr)` | Condicional ternário — uma forma especial incorporada, não uma função normal. |

Exemplo:

```
IF($age >= 18 AND $status = 'active', 'adult-active', 'other')
→ (form.age >= 18 && form.status == 'active' ? 'adult-active' : 'other')
```

### Tipos de argumentos

Como a DSL compila para JavaScript mas tem de saber *como* interpretar cada argumento de função, cada função na lista branca tem uma assinatura fixa de argumentos composta por estes tipos:

- **`arg`** — analisado como uma expressão normal e passado tal como está (portanto `$field` torna-se `form.field`, isto é, o *valor* do campo).
- **`field`** — analisado como uma expressão; se for uma referência simples a `$field`, é convertido na **string do nome do campo entre aspas** em vez do valor do campo (por exemplo, `$age` → `'age'`), porque a função espera saber *sobre que campo* operar, não um valor.
- **`func(form)`**, **`func(elem)`**, **`func(elemA, elemB)`** — analisados como uma expressão (normalmente uma condição booleana/relacional escrita com `$field`) e depois envolvidos numa função arrow de JS com o(s) nome(s) de parâmetro indicado(s), por exemplo `$gender = 'male'` como argumento `func(form)` torna-se `(form) => form.gender == 'male'`.
- Um `?` no final de um argumento marca-o como **opcionais** — omita-o e tudo o que vem depois.

Saber o tipo de argumento diz-lhe quando escrever `$field` (para referenciar o valor atual de um campo) versus quando a mesma sintaxe `$field` é silenciosamente convertida numa string com o nome do campo.

### Referência de funções

**Carregar e modelar conjuntos de dados**

| Função | Assinatura (tipos) | Descrição |
|---|---|---|
| `BUILD_DATASET` | `(arg, arg?)` | Divide os dados planos em campos de nível superior + `reps` (instâncias de grupos repetidos), usando o schema se fornecido. |
| `FLATTEN_REPS` | `(arg, arg)` | Produz uma linha de saída por instância de um grupo repetido nomeado, fundindo os campos de nível superior do pai com os campos dessa instância. |
| `FROM_REPS` | `(arg, func(form))` | Avalia uma expressão uma vez por instância de grupo repetido (em todos os registos fornecidos), recolhendo os resultados não nulos num array plano. |
| `APPLY` | `(arg, field, func(form))` | Devolve uma cópia do conjunto de dados com um campo novo/derivado definido em cada registo (e nas suas reps). |
| `APPLY_LABELS` | `(arg, arg, arg)` | Substitui os valores de opção em bruto pelos seus rótulos legíveis por humanos (do schema) para a lista de nomes de campos indicada, em cada registo e nas suas reps. |
| `GET_LABELS` | `(arg, arg)` | Consulta autónoma: mapeia um array de valores de opção em bruto para os seus rótulos usando um schema. |
| `MAP` | `(arg, func(elem))` | Map simples de array. |
| `OP` | `(arg, arg, func(elemA, elemB))` | Combina dois arrays índice a índice, combinando cada par com uma expressão binária. |
| `JOIN_FORMS` | `(arg, arg, field, field?)` | Junção à esquerda de dois conjuntos de dados através da correspondência de um campo chave em cada lado. |
| `JOIN_REPEATING_SLIDES` | `(arg, arg, field, field, field, field?)` | Como `JOIN_FORMS`, mas também faz a junção das instâncias de grupos repetidos de cada par correspondido através de uma subchave. |

**Filtro**

| Função | Assinatura | Descrição |
|---|---|---|
| `FILTER_BY` | `(arg, func(form))` | Devolve uma cópia filtrada de um conjunto de dados; mantém um registo se corresponder ao nível superior, ou mantém apenas as instâncias de grupos repetidos correspondentes se a correspondência for a esse nível. |

**Contagem e agregação**

| Função | Assinatura | Descrição |
|---|---|---|
| `COUNT_FORMS` | `(arg, func(form)?)` | Conta os registos que correspondem a uma condição, contando cada registo uma vez mesmo que a condição corresponda a mais do que uma das suas instâncias repetidas. |
| `COUNT_REPS` | `(arg, func(form)?)` | Conta separadamente cada registo de nível superior correspondente *e* cada instância repetida correspondente — use para "número de ocorrências" em vez de "número de registos". |
| `SUM` | `(arg, field, func(form)?)` | Soma de um campo numérico em registos e instâncias repetidas, com um filtro opcional. |
| `MEAN` / `MEDIAN` / `MODE` / `MIN` / `MAX` | `(arg, field, func(form)?)` | Estatísticas agregadas padrão com um filtro opcional. |
| `ALL_VALUES_OF` | `(arg, field, func(form)?)` | Recolhe todos os valores que um campo assume em registos e instâncias repetidas que correspondam a um filtro opcional, **sem duplicados**. A ferramenta padrão para "contagem de X distintos": envolva com `LEN(...)`. |
| `LEN` | `(arg)` | Comprimento de um array. |
| `REMOVE_DUPLICATES` | `(arg)` | Remove duplicados de um array (por identidade de igualdade profunda), preservando a ordem. |
| `INCLUDES` | `(arg, arg)` | Se um array (ou string) contém um valor. |

**Datas**

| Função | Assinatura | Descrição |
|---|---|---|
| `TODAY` | `()` | A data de hoje, `YYYY-MM-DD`. |
| `ADD_DAYS` | `(arg, arg)` | Uma data mais N dias. |
| `DAYS_DIFF` | `(arg, arg)` | Diferença em dias inteiros entre duas datas. |
| `GET_AGE` | `(arg, arg?)` | Idade em anos completos dada uma data de nascimento (e uma data de referência opcional, por omissão hoje). |
| `IS_BEFORE` / `IS_AFTER` | `(arg, arg)` | Comparações de datas. |
| `IS_WITHIN_INTERVAL` | `(arg, arg, arg)` | Verificação de intervalo de datas inclusivo. |
| `COMPARE_DATE` | `(arg, arg, arg, arg?)` | Classifica uma data como antes/dentro/depois de um intervalo, com rótulos personalizados opcionais. |

**Números e formatação**

| Função | Assinatura | Descrição |
|---|---|---|
| `ROUND` | `(arg, arg?)` | Arredonda um número para N casas decimais (por omissão 0). |
| `PERCENT` | `(arg, arg)` | `a/b` como string de percentagem. |
| `PERCENTAGE_CHANGE` | `(arg, arg)` | Variação percentual entre um valor e um valor de referência. |
| `CHART_TO_DATA` | `(arg, arg)` | Combina arrays paralelos de rótulos/valores num único objeto. |
| `FORMAT_TABLE_ROWS` / `FORMAT_TABLE_COLS` / `FORMAT_TABLE_FIELDS` | várias | Renderiza um array de linhas/colunas/registos como uma string `<table>` HTML, útil dentro de widgets `html`. |

**Seleção**

| Função | Assinatura | Descrição |
|---|---|---|
| `FIRST` / `LAST` | `(arg, func(form), field?)` | Encontra o registo mais antigo/mais recente por um campo de data (por omissão um campo padrão de "criado em") e avalia uma expressão contra ele. |

**IA / depuração**

| Função | Assinatura | Descrição |
|---|---|---|
| `PROMPT_RESULT` | `(arg, arg)` | Lê o texto produzido por uma variável `isAIPrompt`. |
| `CONSOLE_LOG` | `(arg)` | Regista um valor na consola e devolve-o sem alterações — útil para depurar uma fórmula inline. |

**Obsoletas (mantidas por compatibilidade retroativa; prefira a alternativa indicada)**

| Função | Prefira em vez disso |
|---|---|
| `FILTER_BY_VARS` | `FILTER_BY` |
| `COUNT_FORMS_UNIQUE` | `LEN(ALL_VALUES_OF(...))` |
| `ISIN` | `INCLUDES` |
| `REPEAT` | `MAP` |
| `EVALUATE` | `IF` |

**Para além da lista branca**

A DSL só aceita as funções acima (mais `IF`). A biblioteca de runtime subjacente expõe funções auxiliares adicionais (auxiliares estatísticos como o desvio padrão, construtores internos de tabelas/conjuntos de dados de widgets usados pelo próprio conversor, etc.) que **não** são acessíveis através da sintaxe simples de fórmulas — apenas através da saída de emergência de JavaScript em bruto `js:` descrita na secção 2.4.

## Widgets suportados e as suas propriedades

### `table` — tabela dinâmica

Linha 1: rótulos dos cabeçalhos das colunas. Linha 2: um código curto de estilo por coluna, `[colspan][alignment][sortable]`:

- Primeiro carácter: colspan (um dígito, normalmente `1`).
- Segundo carácter: `l` = esquerda, `r` = direita, qualquer outra coisa = centro.
- Terceiro carácter: `s` = coluna ordenável, omitido/qualquer outra coisa = não ordenável.

A partir da linha 3, a folha comporta-se de um de dois modos:

**A. Tabela de lista de form** (ligada a um conjunto de dados) — usada quando está presente uma coluna `dataset`:

| Coluna de configuração | Significado |
|---|---|
| *(a coluna própria de cada cabeçalho)* | O nome do campo a apresentar nessa coluna, retirado de cada registo do conjunto de dados. |
| `dataset` | Nome da variável (com valor de array) a iterar — normalmente um conjunto de dados construído em `variables`. |
| `pagination` | Verdadeiro → produz uma tabela paginada em vez de uma simples. |
| `dialog_fields` / `dialog_fields_labels` | Nomes / rótulos de campos extra separados por vírgulas, mostrados num diálogo de detalhe "ler mais" por linha. |
| `link_field` / `link_position` | Campo a usar como URL de ligação e o índice da coluna que o deve renderizar como ligação. |

**B. Tabela estática / calculada** (sem coluna `dataset`) — cada linha restante é uma linha de saída literal, e cada célula é ela própria uma fórmula (ou literal, ou expressão `js:`); envolva uma string literal entre aspas para que não seja confundida com uma referência a variável simples (por exemplo, `"140"` para o texto `140`, versus `my_indicator` para apresentar o valor de uma variável calculada).

As células de cabeçalho são estilizadas a centrado, negrito, texto branco sobre fundo sólido; as células do corpo alternam automaticamente as cores de fundo das linhas.

### `chart`

Apenas a linha 1 (exceto Scatter/Bubble, ver abaixo). Colunas de opções reconhecidas (removidas da linha antes de as restantes serem tratadas como séries de dados):

`chartType`, `title`, `stacked`, `beginAtZeroX`, `beginAtZeroY`, `axisLabelX`, `axisLabelY`, `axisMinX`, `axisMinY`, `axisMaxX`, `axisMaxY`, `removeZeroValues`, `mainDataNumberThreshold`.

- `chartType` tem de ser um de: `Line`, `Bar`, `HorizontalBar`, `Radar`, `Scatter`, `Doughnut`, `Pie`, `PolarArea`, `Bubble`.
- `labels` (opcionais) — uma fórmula que produz o array de rótulos de categoria/eixo.
- Todos os outros cabeçalhos de coluna dão nome a uma série de dados; o valor da sua célula é uma fórmula que produz o array de números dessa série.
- Os gráficos `Scatter` precisam exatamente de 2 linhas de dados (valores X, valores Y); os gráficos `Bubble` precisam exatamente de 3 (X, Y, raio); todos os outros tipos de gráfico precisam exatamente de 1 linha de dados.
- As cores são atribuídas automaticamente a partir de uma paleta incorporada (uma cor por série, ou uma por ponto de dados para pie/doughnut/polar-area).

### `image`

Apenas a linha 1. Obrigatório: `url` (uma fórmula que produz o URL da imagem, ou uma string literal; use o prefixo `js:` para uma expressão JS em bruto). Opcionais: `align` (`left`/`center`/`right`), `width`, `height` (strings de comprimento CSS).

### `html`

Apenas a linha 1, coluna única `html`, contendo uma string HTML em bruto (não analisada pela DSL de fórmulas). Suporta marcadores de interpolação de duplo parêntese reto `[[expression]]`, que são avaliados e substituídos em tempo de renderização — use isto para incorporar o valor de uma variável calculada dentro de markup de outro modo estático.

### `single` — cartão KPI / número grande

Apenas a linha 1:

| Coluna | Significado |
|---|---|
| `html` (opcionais) | Um cabeçalho mostrado acima do número. |
| `current_value` | Obrigatório. A variável/expressão cujo valor é mostrado como um número grande (renderizado via `[[current_value]]`). |
| `percentage_change` (opcionais) | Se presente, acrescenta um indicador de tendência (seta para cima/baixo/lateral com cor) com base no seu sinal, mostrado como `[[percentage_change]]%`. |

Como o mesmo texto de célula é reutilizado tanto como valor interpolado como expressão de comparação em bruto, `current_value` / `percentage_change` devem geralmente ser nomes simples de variáveis definidos na folha `variables`, e não fórmulas inline completas.

### `graph`

Cada linha precisa de uma coluna `id` não vazia. **Todas** as colunas em todas as linhas (exceto `id`) são analisadas como uma fórmula, produzindo um conjunto de dados de nós de grafo por linha.

### `heatmap`

Apenas a linha 1, todas as colunas opcionais com predefinições sensatas: `values` (uma string JS em bruto/fórmula que produz os dados de intensidade — não analisada através da DSL de parênteses retos, tem de ser já válida), `idProp` (por omissão `'id'`), `features` (uma string GeoJSON), `startColor`, `endColor`, `highlightColor`, `showVisualMap`.

### `paginatedlist`

Linha 1: uma percentagem numérica de largura de coluna por coluna. Linha 2 (linha de configuração): nome do campo por coluna, mais `dataset`, `title`, `pageSize` (por omissão 10), `link_field`/`link_position`, `cellStyles`, `rowStyle` (um literal de objeto de estilo em bruto), `backgroundColorA`/`backgroundColorB` (cores de faixas alternadas). Cada linha resultante é renderizada como o seu próprio widget de tabela compacto em vez de uma grande tabela.

### `paginatedDialogList`

Mesma configuração que `paginatedlist`, mais duas linhas adicionais (quando presentes): **rótulos** dos campos do diálogo e, depois, **nomes** dos campos do diálogo — clicar numa linha abre uma janela pop-up que lista esses campos como pares rótulo/valor.

### `filter` / `global filter`

Estruturada como uma folha `survey` ODK/XLSForm (com uma folha `choices` complementar no mesmo livro), convertida num form schema e associada como um controlo de filtro interativo:

- Uma folha com o nome `filter` (mas não `global`) associa-se ao widget da folha imediatamente seguinte.
- Uma folha com o nome `filter` e `global` associa-se a todo o relatório em vez de a um único widget.

## Lista de verificação rápida para construir um novo XLSReport

1. Identifique o(s) form DINO de que precisa e os seus nomes/schemas exatos na sua instância.
2. Comece uma folha `variables`: carregue cada form com `forms[...]`/`schemas[...]`, construa conjuntos de dados com `BUILD_DATASET` e aplique imediatamente quaisquer filtros de projeto/âmbito (reatribuindo o mesmo nome de variável).
3. Pré-calcule tudo o que seja reutilizado por mais do que um widget como a sua própria variável nomeada.
4. Acrescente uma folha por widget, com o nome com a palavra-chave correta, pela ordem em que quer que apareçam.
5. Prefira a lista branca da DSL na secção 4.3; recorra a `js:` apenas quando um cálculo não se encaixar nela.
6. Confirme os nomes dos campos e os valores das opções com o schema real/dados exportados da sua instância, em vez de assumir que correspondem exatamente aos nomes de campos do xlsform de origem.