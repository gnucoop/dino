---
title: Importar dados
description: Aprenda a importar dados estruturados em massa para qualquer form schema usando um arquivo CSV ou Excel. O assistente permite carregar um arquivo, mapear suas colunas para os campos do form e revisar o resultado da importação.
---

# Importar dados

A página **Importar dados** permite carregar dados em massa para um form schema a partir de um arquivo `.xls`, `.xlsx` ou `.csv`. Um assistente em três etapas — **Carregar arquivo**, **Mapear campos**, **Resultado** — orienta você no carregamento do arquivo, no mapeamento de suas colunas para os campos do form e na revisão do resultado.

![Visão principal da página Importar dados](../imgs/forms/import.png)

## Acessar a página de importação

1. Navegue até a lista **Formulários** e selecione um form schema.
2. Na visualização de dados do form, clique em **Importar formulários** na barra de ferramentas.

## Etapa 1 — Carregar arquivo

A primeira etapa mostra uma zona de arrastar e soltar ou um seletor de arquivos.

- **Formatos aceitos:** `.xls`, `.xlsx`, `.csv`
- **Tamanho máximo do arquivo:** 20 MB

Para carregar:

1. (Opcional) Deixe **Reutilizar métricas existentes com o mesmo nome** marcado (o padrão) para que qualquer métrica no arquivo cujo nome corresponda a uma métrica já existente no sistema seja vinculada a essa métrica existente em vez de criar uma duplicata. Desmarque para sempre criar novas métricas.
2. Arraste um arquivo para a área tracejada **ou** clique em **Escolher um arquivo** para procurar.
3. Depois que o arquivo for lido, o assistente passa automaticamente para **Mapear campos**.

### Formatar o arquivo de importação
Veja a descrição na seção [abaixo](#formato-do-arquivo)

!!! tip "Formatos de arquivo fáceis"
    O Dino aceita o mesmo arquivo obtido durante a [exportação](index.md#exportar). Portanto, a maneira mais fácil de obter um arquivo devidamente formatado para importação é primeiro exportar alguns dados do form do mesmo schema e depois excluir as linhas que contêm os dados exportados, mantendo apenas os cabeçalhos das colunas. Em qualquer caso, certifique-se de que os cabeçalhos das colunas estejam claros – eles serão usados como sugestões durante o mapeamento.

!!! note "Métricas identificadas por ID"
    Se uma coluna de métrica no seu arquivo fornecer o **ID** (UUID) da métrica, essa linha será vinculada à métrica existente com esse ID e nenhuma nova métrica será criada. O ID tem precedência sobre o nome da métrica, então isso acontece independentemente da opção **Reutilizar métricas existentes com o mesmo nome** (que se aplica apenas à correspondência por nome).

## Etapa 2 — Mapear campos

Após o carregamento, você verá uma tabela listando todas as colunas do seu arquivo. Cada linha tem três colunas:

- **Coluna do arquivo** – o cabeçalho original do seu arquivo.
- **Campo** – um menu suspenso onde você seleciona o campo do form correspondente.
- **Status** – mostra se a coluna está mapeada, ignorada ou se tem um erro.

### Ações de mapeamento

- **Selecionar um campo do form** – abra o menu suspenso de uma coluna e escolha o campo correto. Você pode pesquisar dentro do menu suspenso.
- **Ignorar uma coluna** – selecione a opção **— Ignorar esta coluna —** no menu suspenso, ou clique no botão **Ignorar** na coluna de status. As colunas ignoradas ficam esmaecidas.
- **Restaurar uma coluna ignorada** – clique no botão **Restaurar** na coluna de status.

### Correspondência automática

Quando o arquivo é lido, o Dino mapeia todas as colunas cujo cabeçalho é exatamente o nome de um campo do form, ou o nome de um campo repetido seguido de `__N` (veja [Slides repetidos](#slides-repetidos)). As outras colunas ficam para você mapear.

Clique em **Reassociar tudo** para redefinir todas as colunas e deixar o Dino associá-las novamente, desta vez também pareando colunas com campos cujos nomes ou rótulos sejam semelhantes. Revise o resultado e ajuste os mapeamentos conforme necessário.

!!! tip "A correspondência funciona melhor com cabeçalhos que são os nomes dos campos, como em um arquivo exportado."

### Repetição

Se um campo do form selecionado for um campo repetido (por exemplo, vários números de telefone), um campo **Repetição** aparece abaixo do menu suspenso. Insira o índice de repetição (0, 1, 2, …) para atribuir esta coluna do arquivo a uma ocorrência do grupo repetido.

### Resumo da barra de ferramentas

Na parte superior da área de mapeamento, você pode ver três chips:

- **Total de colunas** – número de colunas do arquivo.
- **Mapeado** – colunas que foram atribuídas a um campo do form.
- **Ignorado** – colunas que você escolheu ignorar.

Use o campo **Pesquisar colunas…** para filtrar a tabela pelo nome da coluna do arquivo.

Clique em **Voltar** para retornar à etapa de carregamento: o arquivo e os mapeamentos são descartados, e você escolhe o arquivo novamente.

Quando todas as colunas desejadas estiverem mapeadas e não houver erros, o botão **Aplicar importação** fica habilitado. Clique nele para iniciar a importação. Durante o processamento, um indicador de carregamento aparece.

!!! warning "Mapeamento duplicado"
    Se você mapear o mesmo campo do form para mais de uma coluna do arquivo, um erro de validação será exibido (*Campo mapeado para mais de uma coluna*) e o botão **Aplicar importação** permanecerá desabilitado até ser corrigido.

## Etapa 3 — Resultado

A última etapa informa o que aconteceu:

- Um banner informa se a importação foi **bem-sucedida**, **parcial** (algumas linhas foram rejeitadas) ou terminou com um **ERRO** (nada foi importado).
- Contadores mostram **Linhas importadas**, **Linhas rejeitadas**, **Linhas no arquivo** e **Métricas criadas**.
- As listas de problemas mostram as linhas do arquivo afetadas e o motivo. Use **Pesquisar por linha ou erro** para filtrar listas longas.

Clique em **Fechar** para retornar à lista de dados do form, onde os novos dados aparecem. Após um erro, **Voltar** leva você de volta à etapa de mapeamento para corrigir os problemas.


## Formato do arquivo

Descrevemos o procedimento para importar alguns dados em massa usando um arquivo Excel gerado a partir do Google Sheets. O mesmo procedimento vale para arquivos CSV ou se você trabalhar diretamente com o Excel.

Suponhamos que você queira importar dados em um form chamado Projects que tem 2 slides, um dos quais é um slide repetido:

![O form Projects, com dois slides, um dos quais é um slide repetido](../imgs/forms/import-repeating-slide.png)

O form Projects foi criado usando o seguinte XLSForm. A planilha “survey” é

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

e a “choices” é

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

Siga estas etapas:

1. Crie um arquivo vazio com apenas uma planilha (os nomes do arquivo e da planilha não importam).
2. Na primeira linha, você precisa colocar os nomes dos campos do form e dos campos específicos do DINO. Neste exemplo, os campos do form podem ser:
   1. **country**
   2. **country\_other**
   3. **title**
   4. **project\_date\_start**
   5. **selected\_donor**
   6. **budget**
   7. **isleader**
   8. ***indic*** (\*)
   9. ***value\_indic*** (\*)

   cuidado, pois os campos que estão dentro de slides repetidos precisam ser tratados de forma diferente (por isso colocamos um asterisco). Consulte a seção específica abaixo.

   Os campos específicos do DINO podem ser:

   10. **created\_at**. A data de criação do form. Especifique isso apenas se quiser que seus forms tenham uma data de criação diferente da data da importação;
   11. **user\_data\_ref\_id**. O ID do usuário que será associado ao form. É aplicado apenas quando um administrador importa; para outros usuários, o valor é ignorado e os forms são atribuídos ao usuário que os está importando;
   12. **area\_id**. O ID da métrica AREA a ser associada ao form;
   13. \[area\_name\]
   14. **case\_id**. O ID da métrica CASE a ser associada ao form;
   15. \[case\_name\]
   16. **project\_id**. O ID da métrica PROJECT a ser associada ao form;
   17. \[project\_name\]
   18. \[project\_code\]
   19. **location\_id**. O ID da métrica LOCATION a ser associada ao form;
   20. \[location\_name\]
   21. **organization\_id**. O ID da métrica ORGANISATION a ser associada ao form;
   22. \[organization\_name\]
   23. **form\_status\_name**. O nome de um dos status do form schema. As linhas sem ele recebem o primeiro status do schema. Se algum valor não corresponder a um nome de status existente, o arquivo não será importado (*Status inválidos*);
   24. **dinoinvalid**. Marca o form como inválido. Use `true`, `1`, `yes`, `y` ou `x`; qualquer outro valor ou uma célula vazia deixa o form válido.

3. cada linha corresponderá a um novo form diferente. Então, se criarmos um arquivo com um cabeçalho \+ digamos, 5 linhas de dados, se o carregamento for bem-sucedido, criaremos 5 novos forms no DINO.
4. Não é necessário ter uma coluna para cada campo do form; não é necessário preencher todas as linhas de uma determinada coluna, mas se um campo estiver vazio para todas as linhas, ele pode ser omitido,
5. Os campos de data devem ser formatados como AAAA-MM-DD em formato de texto (cuidado).
6. Os campos de escolha única devem conter uma das opções aceitas conforme especificado na “choices” (veja o construtor de forms ou o arquivo XLSForm).
7. Os campos de múltipla escolha devem ser formatados de acordo com o seguinte padrão: \[opt1, opt2\] (ou seja, uma lista de opções entre colchetes).

Por exemplo, um arquivo válido poderia ser o seguinte:

| country | country\_other | title | project\_date\_start | budget | isleader | area\_id |
| :---- | :---- | :---- | :---- | ----- | :---- | :---- |
| ALB | \[AFG,DZA\] | Human rights in education | 2022-01-28 | 120000 | true | 81387ff7-5c7d-44e7-9dc6-76b8d09265ac |
| ASM |  | A new approach to social justice | 2022-02-14 | 20000 |  | 81387ff7-5c7d-44e7-9dc6-76b8d09265ac |

Neste caso, estamos importando 2 forms; para ambos, estamos selecionando apenas a métrica AREA. Além disso, observe que não fornecemos todos os campos do form para todos os forms, mas, para os campos em que fornecemos um valor, seguimos rigorosamente as indicações descritas acima.

### Lidar com métricas durante a importação

Durante a importação de alguns dados de form, no que diz respeito às métricas, você pode querer:

- criar novas métricas durante a importação
- reutilizar métricas já criadas

As regras a seguir para gerenciar corretamente as métricas são as seguintes:

| MÉTRICA | CRIAR NA INTERFACE | CRIAR NA IMPORTAÇÃO | CRIAR \+ ATRIBUIR NA IMPORTAÇÃO | USAR NA IMPORTAÇÃO | CRIAR \+ ATRIBUIR NA IMPORTAÇÃO (pai) | USAR COMO PAI |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| **Caso** | nome | nome | nome | id, ou nome (com a opção de reutilização), ou ambos | nome, em outra linha do mesmo arquivo | id ou nome |
| **Organização** | nome | nome | nome | id, ou nome (com a opção de reutilização), ou ambos | nome, em outra linha do mesmo arquivo | id ou nome |
| **Localização** | nome | nome | nome | id, ou nome (com a opção de reutilização), ou ambos | nome, em outra linha do mesmo arquivo | id ou nome |
| **Área** | nome | nome | nome | id, ou nome (com a opção de reutilização), ou ambos | nome, em outra linha do mesmo arquivo | id ou nome |
| **Projeto** | nome, código | nome, código | nome, código | id, ou nome (com a opção de reutilização), ou ambos | nome e código, em outra linha do mesmo arquivo | id ou nome |

Quando uma linha tem tanto o id quanto o nome de uma métrica, o id prevalece e o nome é ignorado. Uma nova métrica é criada apenas quando o nome é fornecido e o id está vazio.

Os pais são definidos com as colunas `<metric>_parent_id` e `<metric>_parent_name` (por exemplo `location_parent_name`), e se aplicam apenas a métricas criadas pela importação. O pai deve ser do mesmo tipo de métrica e já existir ou ser criado por outra linha do mesmo arquivo, em qualquer ordem. Um pai que não corresponde a nada não é criado: essa métrica é reportada como *métrica com parent inválido*.

## Slides repetidos

Se você tiver um campo em slides repetidos, eles precisam ser nomeados de forma diferente. Cada campo no slide repetido precisa ser chamado \<field\_name\>\_\_X, onde X é o número da repetição, de 0 (correspondente a uma repetição) a N-1, onde N é o número total de repetições de slide naquele form.
Por exemplo, suponha que você tenha apenas 1 repetição do slide repetido e queira adicionar os campos “Indicator description” e “Value reached”. Você precisaria adicionar estas duas colunas ao seu arquivo de importação:

| indic\_\_0 | value\_indic\_\_0 |
|  :---- | ----- |
| Number of children | 100 |

Então, por exemplo, poderíamos ter:

| country | budget | indic\_\_0 | value\_indic\_\_0 | indic\_\_1 | value\_indic\_\_1 | isleader |
| :---- | ----- | :---- | ----- | :---- | ----- | :---- |
| ALB | 120000 | Children | 100 |  |  | true |
| ASM | 20000 |  |  |  |  |  |
| AFG | 15000 | Parents | 45 | Schools | 34 | true |

## Erros

- **IDs desconhecidos** – se uma coluna se referir a um usuário ou a uma métrica por um ID que não existe no Dino, o arquivo inteiro não será importado (*Arquivo não importado!*), e o resultado lista os *Ids de usuário inválidos* ou *Ids de métrica inválidos*. Verifique os IDs no seu arquivo antes de importar.
- **Status de form desconhecido** – um `form_status_name` que não corresponde a nenhum status do schema também interrompe a importação (*Status inválidos*).
- **Métricas que não podem ser vinculadas** – uma linha que nomeia uma métrica que o Dino não consegue criar ou encontrar é rejeitada, e o resultado mostra o motivo; as outras linhas são importadas.