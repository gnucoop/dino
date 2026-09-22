---
title: XLSReport
description: Uma visão geral do formato baseado em Excel usado para criar relatórios no Dino.
---

# O formato XLSReport

## O que é o XLSReport

O XLSReport é um formato de criação baseado em planilha para construir **relatórios DINO / AJF (Advanced JSON Forms)** sem escrever JSON ou código manualmente. Um autor de relatório preenche uma pasta de trabalho comum do Excel (`.xlsx`) seguindo um conjunto de convenções, e um conversor (`xls-report.ts`, parte da biblioteca `reports` do AJF) analisa essa pasta de trabalho em um form schema JSON do tipo `AjfReport` que a plataforma DINO pode renderizar como um painel ao vivo: tabelas, gráficos, números de KPI, imagens, grafos, mapas de calor e muito mais.

Duas coisas tornam isso possível:

- **Mapeamento de planilha para widget** — cada planilha na pasta de trabalho (com algumas exceções especiais) se torna um widget de relatório. A ordem das planilhas na pasta de trabalho é a ordem em que os widgets são empilhados no relatório renderizado.
- **Uma pequena DSL de fórmulas** ("linguagem de indicadores") — as células não contêm apenas valores literais; a maioria delas contém expressões curtas (por exemplo, `SUM(D04, $persone, $tipo='corso')`) escritas em uma minilinguagem compacta e com lista de permissões. Essa DSL é analisada por `hindikit-parser.ts` e traduzida para JavaScript, que é então executado sobre os dados subjacentes dos form no momento da renderização/atualização, usando uma biblioteca de funções internas (`expression-utils.ts`).

Isso significa que um XLSReport é na verdade duas coisas sobrepostas: uma **descrição de layout** (quais planilhas produzem quais widgets, em qual ordem) e uma **descrição de cálculo** (quais fórmulas calculam os números, arrays e conjuntos de dados que esses widgets exibem). Como os dados subjacentes vêm de form do DINO (dados), qualquer fórmula de XLSReport, em última análise, lê de um ou mais conjuntos de dados de form e os molda para o que um widget precisar (um único número, um array para um gráfico ou uma tabela de linhas).

O XLSReport é agnóstico quanto a plataforma e projeto: as mesmas convenções de pasta de trabalho se aplicam a qualquer instância DINO e a qualquer conjunto de form — nada no formato é específico de uma organização ou implantação em particular.

## Estrutura do arquivo

Um XLSReport é uma única pasta de trabalho `.xlsx`. O conversor itera pelas planilhas da pasta de trabalho **em ordem** e decide o que fazer com cada uma procurando por uma **substring de palavra-chave no nome da planilha** (não uma correspondência exata) — por exemplo, uma planilha chamada `table_activities` ou `2_table` é reconhecida como uma planilha do tipo "table" porque o nome *contém* `table`.

### Categorias de planilha

| O nome da planilha contém | Papel |
|---|---|
| `variables` (nome exato) | Declara variáveis/conjuntos de dados nomeados usados pelas planilhas seguintes. Não produz um widget por si só. |
| `filter` | Declara um form de filtro (estilo ODK/XLSForm `survey` + `choices`) anexado à *próxima* planilha na pasta de trabalho. Não produz um widget próprio. |
| `filter` **e** `global` | O mesmo que acima, mas o filtro resultante se aplica ao relatório inteiro em vez de a um único widget. |
| `choices` | Uma planilha complementar que contém listas de escolhas (`list_name`, `name`, `label`), usada em conjunto com planilhas `filter`. |
| `table` | Um widget `DynamicTable` ou `PaginatedTable`. |
| `chart` | Um widget `Chart` (barra, linha, pizza etc.). |
| `image` | Um widget `Image`. |
| `html` | Um widget `Text` que renderiza HTML bruto. |
| `graph` | Um widget `Graph` (nó/rede). |
| `heatmap` | Um widget `HeatMap`. |
| `single` | Um ou mais widgets `Text` formando um cartão de KPI/"número grande". |
| `paginatedlist` | Um widget `PaginatedList` (uma linha = um widget de minitabela). |
| `paginatedDialogList` | Um widget `PaginatedList` cujas linhas abrem um diálogo de detalhes. |

Os nomes das planilhas são livres fora isso — use-os para manter a pasta de trabalho autodocumentada (por exemplo, `table_beneficiaries_by_month`, `chart_gender_split`). Como a correspondência é uma verificação de substring, evite escolher nomes que contenham acidentalmente outra palavra-chave (por exemplo, não nomeie uma planilha de gráfico como `charttable`).

### Convenções de linha dentro de uma planilha

Toda planilha de widget é lida como uma conversão normal de planilha para JSON: **a linha 1 contém os cabeçalhos das colunas**, e **da linha 2 em diante ficam os dados**, um objeto JSON por linha com chave pelo texto do cabeçalho. Além dessa regra genérica, cada tipo de planilha define seu próprio significado para a linha de cabeçalho e para as primeiras uma ou duas linhas de dados (documentado por widget na seção 5).

### Layout geral

A pasta de trabalho inteira é envolvida em **um layout de nível superior contendo uma coluna**, e toda planilha não especial contribui com exatamente um widget (ou, no caso de `single`, vários) anexado a essa coluna na ordem das planilhas. Em outras palavras:

- O relatório é sempre uma **pilha vertical única de widgets** — não há maneira, no nível da planilha, de criar colunas lado a lado ou contêineres aninhados; o único "aninhamento" que existe é gerado internamente por `paginatedlist` / `paginatedDialogList` (cada linha é ela mesma um pequeno widget de tabela ou diálogo).
- Uma planilha com nome `filter` anexa seu filtro ao widget da planilha que **a segue imediatamente**; uma planilha `global filter` se anexa ao contêiner externo do relatório em vez de a um único widget.

### A saída de emergência universal: `js:`

Qualquer célula que normalmente seria analisada pela DSL de fórmulas pode, em vez disso, começar com `js:` — tudo após esse prefixo é tratado como **JavaScript bruto** e passado sem análise. Isso dá acesso a todas as funções exportadas pela biblioteca de utilitários de tempo de execução, não apenas às que estão na lista de permissões da gramática da DSL (veja a seção 4), e a expressões JS arbitrárias (IIFEs, uso de `Set`/`Map`, funções auxiliares inline personalizadas etc.). Use isso quando um cálculo não se encaixar na lista de permissões de funções da DSL ou nas formas de argumentos.

## Declarando variáveis

A planilha `variables` é onde você carrega os dados dos form e pré-calcula tudo que for reutilizado por vários widgets mais adiante na pasta de trabalho (conjuntos de dados, filtros, valores de indicadores, rótulos).

### Colunas

| Coluna | Significado |
|---|---|
| `name` | O identificador da variável. Deve ser um identificador válido (letras, dígitos, sublinhado, não começando com um dígito) — nomes inválidos são rejeitados. |
| `value` | Uma expressão, analisada pela mesma DSL de fórmulas que todas as outras células (ou JavaScript bruto prefixado com `js:`). |
| `isAIPrompt` (opcional) | Booleano; marca a variável como resultado de um prompt de IA em vez de uma fórmula simples, para que possa ser lida depois com `PROMPT_RESULT`. |

Linhas com `name` vazio são ignoradas. As variáveis são avaliadas de cima para baixo, e **cada variável pode referenciar qualquer variável declarada acima dela** pelo seu nome simples (sem o prefixo `$` — esse prefixo é reservado para *campos* de form, veja a seção 4).

### Carregando dados de form

Duas consultas de tempo de execução estão sempre disponíveis:

- `forms['<nome do form>']` — o array bruto de dados de um determinado form do DINO.
- `schemas['<nome do form>']` — o form schema (usado para resolver a estrutura de grupos repetidos e os rótulos de escolhas).

A string exata do nome do form a usar é o identificador que o DINO atribui àquele form — obtenha-o na configuração de administração/form da sua instância do DINO (normalmente corresponderá, mas não é garantido que corresponda exatamente, ao nome do arquivo xlsform do form; verifique diferenças de espaçamento/maiúsculas/espaço no final).

O bloco de abertura padrão de uma planilha `variables` carrega cada form que você precisa e o transforma em um conjunto de dados estruturado:

```
name  | value
F01   | forms['my_form_name']
S01   | schemas['my_form_name']
D01   | BUILD_DATASET(F01,S01)
```

`BUILD_DATASET(forms, schema)` divide cada dado plano em campos de nível superior não repetidos mais um objeto `reps` que agrupa instâncias de grupos repetidos ("repeat"/slide) pelo seu nome real de grupo (derivado do schema). Sem um schema, ele recorre a uma heurística genérica. A partir daqui, `D01` é o conjunto de dados que você filtra, agrega e exibe.

### Escopo / filtragem de um conjunto de dados uma vez, para cada uso posterior

Um padrão muito comum e recomendado é **filtrar um conjunto de dados e reatribuí-lo ao mesmo nome de variável**, para que toda fórmula que referencie essa variável a partir daí herde automaticamente o filtro — em vez de repetir a condição de filtro em cada fórmula:

```
name | value
D01  | FILTER_BY(D01, $status='active')
```

Isso é especialmente importante porque **os conjuntos de dados de form são frequentemente compartilhados entre mais de um projeto, campanha ou escopo na mesma instância do DINO** — nunca presuma que um array `forms['...']` já esteja limitado apenas aos dados que lhe interessam. Se seus form carregarem um campo de projeto/escopo (seu nome exato depende do design do form da sua instância, por exemplo algo como `$project_name`), filtre cada conjunto de dados explicitamente:

```
scope_name = 'MY PROJECT'
D0X = FILTER_BY(D0X, $project_field = scope_name OR $secondary_project_field = scope_name)
```

Se um conjunto de dados tiver um grupo repetido cujas instâncias individuais precisem de seu próprio escopo (por exemplo, um repeat de "participantes" em que um único registro coletivo pode incluir participantes pertencentes a escopos diferentes), filtre também no nível da instância, normalmente via `FLATTEN_REPS` combinado com `FILTER_BY` no array achatado, antes de extrair os valores de que você precisa com `ALL_VALUES_OF` (veja a seção 4 para essas funções). Sempre verifique o campo que realmente contém o valor identificador/de referência de uma instância repetida — ele pode não conter o que seu nome sugere (por exemplo, um campo de referência "participant" dentro de um repeat pode armazenar o *nome de exibição* do registro vinculado em vez de seu *código/id*; verifique contra dados reais exportados antes de fazer join/deduplicação com base nele, e use a mesma chave nos dois lados de qualquer comparação).

### Variáveis de prompt de IA

Se `isAIPrompt` estiver definido em uma linha de variável, seu valor representa o resultado de um prompt gerado por IA em vez de uma fórmula calculada simples. Em outros lugares da pasta de trabalho, você pode recuperar esse texto com `PROMPT_RESULT(report_data, '<nome da variável>')` e interpolá-lo em um widget de HTML ou de indicador único.

## Visão geral da DSL de fórmulas

Toda célula que não seja `js:` é analisada por um pequeno analisador descendente recursivo em uma expressão JavaScript, e então avaliada contra um contexto de dados em tempo de execução.

### Sintaxe principal

| Sintaxe | Significado |
|---|---|
| `$fieldname` | Uma referência a campo de form. Traduzida para `form.fieldname` (`form` é qualquer registro em escopo naquela parte da expressão). |
| `bareIdentifier` | Uma referência a um nome da planilha `variables`, um nome de função ou uma palavra-chave literal. |
| `'text'` / `"text"` | Literal de string. |
| `123`, `1.5`, `1e3` | Literal numérico. |
| `[a, b, c]` | Literal de array. |
| `func(arg1, arg2, ...)` | Chamada de função — apenas nomes de funções na lista de permissões são aceitos (veja abaixo); qualquer outra coisa deve passar por `js:`. |
| `=` | Igualdade (compila para `==` em JS). |
| `!=` | Desigualdade. |
| `+ - * /` , `< <= > >=` | Aritmética / comparação, mesmo significado que em JavaScript. |
| `AND` / `OR` | E lógico / ou lógico (compilam para `&&` / `\|\|`). |
| `!expr` | Negação lógica. |
| `(expr)` | Agrupamento. |
| `IF(cond, thenExpr, elseExpr)` | Condicional ternário — uma forma especial interna, não uma função comum. |

Exemplo:

```
IF($age >= 18 AND $status = 'active', 'adult-active', 'other')
→ (form.age >= 18 && form.status == 'active' ? 'adult-active' : 'other')
```

### Tipos de argumento

Como a DSL compila para JavaScript mas precisa saber *como* interpretar cada argumento de função, toda função na lista de permissões tem uma assinatura de argumentos fixa composta destes tipos:

- **`arg`** — analisado como uma expressão normal e passado como está (então `$field` se torna `form.field`, ou seja, o *valor* do campo).
- **`field`** — analisado como uma expressão; se for uma referência `$field` simples, é convertido na **string do nome do campo entre aspas** em vez do valor do campo (por exemplo, `$age` → `'age'`), porque a função espera saber *em qual campo* operar, não um valor.
- **`func(form)`**, **`func(elem)`**, **`func(elemA, elemB)`** — analisado como uma expressão (normalmente uma condição booleana/relacional escrita com `$field`), e então envolvido em uma função arrow do JS com os nomes de parâmetro indicados, por exemplo, `$gender = 'male'` como argumento `func(form)` se torna `(form) => form.gender == 'male'`.
- Um `?` ao final de um argumento o marca como **opcional** — omita-o e tudo depois dele.

Saber o tipo de argumento indica quando escrever `$field` (para referenciar o valor atual de um campo) versus quando a mesma sintaxe `$field` é silenciosamente transformada em uma string de nome de campo.

### Referência de funções

**Carregamento e modelagem de conjuntos de dados**

| Função | Assinatura (tipos) | Descrição |
|---|---|---|
| `BUILD_DATASET` | `(arg, arg?)` | Divide dados planos em campos de nível superior + `reps` (instâncias de grupos repetidos), usando o schema se fornecido. |
| `FLATTEN_REPS` | `(arg, arg)` | Produz uma linha de saída por instância de um grupo repetido nomeado, mesclando os campos de nível superior do pai com os campos dessa instância. |
| `FROM_REPS` | `(arg, func(form))` | Avalia uma expressão uma vez por instância de grupo repetido (em todos os registros fornecidos), coletando resultados não nulos em um array plano. |
| `APPLY` | `(arg, field, func(form))` | Retorna uma cópia do conjunto de dados com um campo novo/derivado definido em cada registro (e seus reps). |
| `APPLY_LABELS` | `(arg, arg, arg)` | Substitui valores de escolha brutos por seus rótulos legíveis por humanos (do schema) para a lista de nomes de campos fornecida, em cada registro e seus reps. |
| `GET_LABELS` | `(arg, arg)` | Consulta autônoma: mapeia um array de valores de escolha brutos para seus rótulos usando um schema. |
| `MAP` | `(arg, func(elem))` | Map de array simples. |
| `OP` | `(arg, arg, func(elemA, elemB))` | Combina dois arrays índice a índice, combinando cada par com uma expressão binária. |
| `JOIN_FORMS` | `(arg, arg, field, field?)` | Left join de dois conjuntos de dados combinando um campo-chave de cada lado. |
| `JOIN_REPEATING_SLIDES` | `(arg, arg, field, field, field, field?)` | Como `JOIN_FORMS`, mas também faz join das instâncias de grupos repetidos de cada par correspondido por uma subchave. |

**Filtragem**

| Função | Assinatura | Descrição |
|---|---|---|
| `FILTER_BY` | `(arg, func(form))` | Retorna uma cópia filtrada de um conjunto de dados; mantém um registro se ele corresponder no nível superior, ou mantém apenas as instâncias de grupo repetido correspondentes se a correspondência for nesse nível. |

**Contagem e agregação**

| Função | Assinatura | Descrição |
|---|---|---|
| `COUNT_FORMS` | `(arg, func(form)?)` | Conta registros que correspondem a uma condição, contando cada registro uma vez mesmo que a condição corresponda a mais de uma de suas instâncias repetidas. |
| `COUNT_REPS` | `(arg, func(form)?)` | Conta cada registro de nível superior correspondente *e* cada instância repetida correspondente separadamente — use para "número de ocorrências" em vez de "número de registros". |
| `SUM` | `(arg, field, func(form)?)` | Soma de um campo numérico em registros e instâncias repetidas, com um filtro opcional. |
| `MEAN` / `MEDIAN` / `MODE` / `MIN` / `MAX` | `(arg, field, func(form)?)` | Estatísticas agregadas padrão com um filtro opcional. |
| `ALL_VALUES_OF` | `(arg, field, func(form)?)` | Coleta cada valor que um campo assume em registros e instâncias repetidas que correspondem a um filtro opcional, **sem duplicatas**. A ferramenta padrão para "contagem de X distintos": envolva com `LEN(...)`. |
| `LEN` | `(arg)` | Comprimento de um array. |
| `REMOVE_DUPLICATES` | `(arg)` | Remove duplicatas de um array (por identidade de igualdade profunda), preservando a ordem. |
| `INCLUDES` | `(arg, arg)` | Se um array (ou string) contém um valor. |

**Datas**

| Função | Assinatura | Descrição |
|---|---|---|
| `TODAY` | `()` | Data de hoje, `YYYY-MM-DD`. |
| `ADD_DAYS` | `(arg, arg)` | Uma data mais N dias. |
| `DAYS_DIFF` | `(arg, arg)` | Diferença em dias inteiros entre duas datas. |
| `GET_AGE` | `(arg, arg?)` | Idade em anos completos dada uma data de nascimento (e uma data de referência opcional, padrão hoje). |
| `IS_BEFORE` / `IS_AFTER` | `(arg, arg)` | Comparações de datas. |
| `IS_WITHIN_INTERVAL` | `(arg, arg, arg)` | Verificação de intervalo de datas inclusive. |
| `COMPARE_DATE` | `(arg, arg, arg, arg?)` | Classifica uma data como antes/dentro/depois de um intervalo, com rótulos personalizados opcionais. |

**Números e formatação**

| Função | Assinatura | Descrição |
|---|---|---|
| `ROUND` | `(arg, arg?)` | Arredonda um número para N casas decimais (padrão 0). |
| `PERCENT` | `(arg, arg)` | `a/b` como uma string de porcentagem. |
| `PERCENTAGE_CHANGE` | `(arg, arg)` | Variação percentual entre um valor e um valor de referência. |
| `CHART_TO_DATA` | `(arg, arg)` | Combina arrays paralelos de rótulos/valores em um único objeto. |
| `FORMAT_TABLE_ROWS` / `FORMAT_TABLE_COLS` / `FORMAT_TABLE_FIELDS` | várias | Renderiza um array de linhas/colunas/registros como uma string HTML `<table>`, útil dentro de widgets `html`. |

**Seleção**

| Função | Assinatura | Descrição |
|---|---|---|
| `FIRST` / `LAST` | `(arg, func(form), field?)` | Encontra o registro mais antigo/mais recente por um campo de data (padrão um campo padrão "created at") e avalia uma expressão sobre ele. |

**IA / depuração**

| Função | Assinatura | Descrição |
|---|---|---|
| `PROMPT_RESULT` | `(arg, arg)` | Lê de volta o texto produzido por uma variável `isAIPrompt`. |
| `CONSOLE_LOG` | `(arg)` | Registra um valor no console e o retorna inalterado — útil para depurar uma fórmula inline. |

**Obsoletas (mantidas para compatibilidade com versões anteriores; prefira a alternativa mostrada)**

| Função | Prefira em vez disso |
|---|---|
| `FILTER_BY_VARS` | `FILTER_BY` |
| `COUNT_FORMS_UNIQUE` | `LEN(ALL_VALUES_OF(...))` |
| `ISIN` | `INCLUDES` |
| `REPEAT` | `MAP` |
| `EVALUATE` | `IF` |

**Além da lista de permissões**

A DSL aceita apenas as funções acima (mais `IF`). A biblioteca de tempo de execução subjacente expõe funções auxiliares adicionais (auxiliares estatísticos como desvio padrão, construtores internos de conjuntos de dados de tabela/widget usados pelo próprio conversor etc.) que **não** são acessíveis pela sintaxe de fórmula simples — apenas pela saída de emergência de JavaScript bruto `js:` descrita na seção 2.4.

## Widgets suportados e suas propriedades

### `table` — tabela dinâmica

Linha 1: rótulos de cabeçalho das colunas. Linha 2: um código curto de estilo por coluna, `[colspan][alignment][sortable]`:

- Primeiro caractere: colspan (um dígito, geralmente `1`).
- Segundo caractere: `l` = esquerda, `r` = direita, qualquer outra coisa = centro.
- Terceiro caractere: `s` = coluna classificável, omitido/qualquer outra coisa = não classificável.

Da linha 3 em diante, a planilha se comporta em um de dois modos:

**A. Tabela de lista de form** (vinculada a um conjunto de dados) — usada quando existe uma coluna `dataset`:

| Coluna de configuração | Significado |
|---|---|
| *(a coluna do próprio cabeçalho)* | O nome do campo a exibir naquela coluna, extraído de cada registro do conjunto de dados. |
| `dataset` | Nome da variável (com valor de array) a iterar — normalmente um conjunto de dados criado em `variables`. |
| `pagination` | Verdadeiro → produz uma tabela paginada em vez de uma simples. |
| `dialog_fields` / `dialog_fields_labels` | Nomes / rótulos de campos extras, separados por vírgula, mostrados em um diálogo de detalhes "leia mais" por linha. |
| `link_field` / `link_position` | Campo a usar como URL do link, e qual índice de coluna deve renderizá-lo como um link. |

**B. Tabela estática / calculada** (sem coluna `dataset`) — cada linha restante é uma linha de saída literal, e cada célula é ela mesma uma fórmula (ou literal, ou expressão `js:`); coloque uma string literal entre aspas para que não seja confundida com uma referência de variável simples (por exemplo, `"140"` para o texto `140`, versus `my_indicator` para exibir o valor de uma variável calculada).

As células de cabeçalho são estilizadas centralizadas, em negrito, com texto branco sobre fundo sólido; as células do corpo alternam as cores de fundo das linhas automaticamente.

### `chart`

Apenas a linha 1 (exceto Scatter/Bubble, veja abaixo). Colunas de opção reconhecidas (removidas da linha antes que o restante seja tratado como séries de dados):

`chartType`, `title`, `stacked`, `beginAtZeroX`, `beginAtZeroY`, `axisLabelX`, `axisLabelY`, `axisMinX`, `axisMinY`, `axisMaxX`, `axisMaxY`, `removeZeroValues`, `mainDataNumberThreshold`.

- `chartType` deve ser um dos seguintes: `Line`, `Bar`, `HorizontalBar`, `Radar`, `Scatter`, `Doughnut`, `Pie`, `PolarArea`, `Bubble`.
- `labels` (opcional) — uma fórmula que produz o array de rótulos de categoria/eixo.
- Todo outro cabeçalho de coluna nomeia uma série de dados; seu valor de célula é uma fórmula que produz o array de números dessa série.
- Gráficos `Scatter` precisam de exatamente 2 linhas de dados (valores X, valores Y); gráficos `Bubble` precisam de exatamente 3 (X, Y, raio); todo outro tipo de gráfico precisa de exatamente 1 linha de dados.
- As cores são atribuídas automaticamente a partir de uma paleta interna (uma cor por série, ou uma por ponto de dados para pizza/rosca/área polar).

### `image`

Apenas a linha 1. Obrigatório: `url` (uma fórmula que produz a URL da imagem, ou uma string literal; prefixe com `js:` para uma expressão JS bruta). Opcional: `align` (`left`/`center`/`right`), `width`, `height` (strings de comprimento CSS).

### `html`

Apenas a linha 1, coluna única `html`, contendo uma string HTML bruta (não analisada pela DSL de fórmulas). Suporta marcadores de interpolação com colchetes duplos `[[expression]]`, que são avaliados e substituídos no momento da renderização — use isso para incorporar o valor de uma variável calculada dentro de uma marcação estática.

### `single` — cartão de KPI / número grande

Apenas a linha 1:

| Coluna | Significado |
|---|---|
| `html` (opcional) | Um título exibido acima do número. |
| `current_value` | Obrigatório. A variável/expressão cujo valor é mostrado como um número grande (renderizado via `[[current_value]]`). |
| `percentage_change` (opcional) | Se presente, adiciona um indicador de tendência (seta para cima/baixo/estável com cor) com base em seu sinal, mostrado como `[[percentage_change]]%`. |

Como o mesmo texto de célula é reutilizado tanto como valor interpolado quanto como expressão de comparação bruta, `current_value` / `percentage_change` geralmente devem ser nomes de variáveis simples definidos na planilha `variables`, não fórmulas inline completas.

### `graph`

Toda linha precisa de uma coluna `id` não vazia. **Toda** coluna em toda linha (exceto `id`) é analisada como uma fórmula, produzindo um conjunto de dados de nó de grafo por linha.

### `heatmap`

Apenas a linha 1, todas as colunas opcionais com padrões sensatos: `values` (uma string de JS bruto/fórmula que produz os dados de intensidade — não analisada pela DSL de colchetes, já deve ser válida), `idProp` (padrão `'id'`), `features` (uma string GeoJSON), `startColor`, `endColor`, `highlightColor`, `showVisualMap`.

### `paginatedlist`

Linha 1: uma porcentagem numérica de largura de coluna por coluna. Linha 2 (linha de configuração): nome do campo por coluna, mais `dataset`, `title`, `pageSize` (padrão 10), `link_field`/`link_position`, `cellStyles`, `rowStyle` (um literal de objeto de estilo bruto), `backgroundColorA`/`backgroundColorB` (cores de listras zebradas). Cada linha resultante é renderizada como seu próprio widget de tabela compacto em vez de uma única tabela grande.

### `paginatedDialogList`

Mesma configuração que `paginatedlist`, mais duas linhas adicionais (quando presentes): **rótulos** dos campos do diálogo, depois **nomes** dos campos do diálogo — clicar em uma linha abre um popup listando esses campos como pares rótulo/valor.

### `filter` / `global filter`

Estruturada como uma planilha `survey` do ODK/XLSForm (com uma planilha `choices` complementar na mesma pasta de trabalho), convertida em um form schema e anexada como um controle de filtro interativo:

- Uma planilha nomeada com `filter` (mas não `global`) se anexa ao widget da planilha imediatamente seguinte.
- Uma planilha nomeada com `filter` e `global` se anexa ao relatório inteiro em vez de a um único widget.

## Lista de verificação rápida para construir um novo XLSReport

1. Identifique o(s) form do DINO de que você precisa e seus nomes/schemas exatos na sua instância.
2. Comece uma planilha `variables`: carregue cada form com `forms[...]`/`schemas[...]`, crie conjuntos de dados com `BUILD_DATASET` e aplique quaisquer filtros de projeto/escopo imediatamente (reatribuindo o mesmo nome de variável).
3. Pré-calcule como sua própria variável nomeada tudo o que for reutilizado por mais de um widget.
4. Adicione uma planilha por widget, nomeada com a palavra-chave correta, na ordem em que você quer que apareçam.
5. Prefira a lista de permissões da DSL na seção 4.3; recorra a `js:` apenas quando um cálculo não se encaixar nela.
6. Verifique duas vezes os nomes de campos e os valores de escolha em relação ao schema real/dados exportados na sua instância, em vez de presumir que correspondam exatamente aos nomes de campos do xlsform de origem.