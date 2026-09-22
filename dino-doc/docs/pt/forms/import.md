---
title: Importar dados
description: Aprenda a importar dados estruturados em massa para qualquer form schema usando um arquivo CSV ou Excel. O assistente em duas etapas permite enviar um arquivo e depois mapear suas colunas para os campos do form.
---

# Importar dados

A página **Importar dados** permite enviar dados em massa para um form schema a partir de um arquivo `.xls`, `.xlsx` ou `.csv`. Um assistente em duas etapas orienta você no envio do arquivo e no mapeamento das colunas do arquivo para os campos do form.

![Visualização principal da página Importar dados](../imgs/forms/import.png)

## Acessar a página de importação

1. Navegue até a lista **Forms** e selecione um form schema.
2. Na visualização de dados do form, clique em **Importar** (o botão da barra de ferramentas).

## Etapa 1 — Enviar arquivo

A primeira etapa mostra uma área de arrastar e soltar ou um seletor de arquivos.

- **Formatos aceitos:** `.xls`, `.xlsx`, `.csv`
- **Tamanho máximo do arquivo:** 20 MB

Para enviar:

1. Arraste um arquivo para a área tracejada **ou** clique em **Escolher um arquivo** para procurar.
2. Após a seleção, o nome do arquivo aparece em um chip junto com o número de colunas detectadas.
3. (Opcional) Deixe **Reutilizar métricas existentes com o mesmo nome** marcado (o padrão) para que qualquer métrica no arquivo cujo nome corresponda a uma métrica já existente no sistema seja vinculada a essa métrica existente em vez de criar uma duplicata. Desmarque para sempre criar novas métricas.
4. Clique em **Avançar** (ou no rótulo do stepper "2 · Mapear campos") para prosseguir.

### Formatando o arquivo de importação
Veja a descrição na seção [abaixo](#formato-do-arquivo)

!!! tip "Formatos de arquivo fáceis"
    O Dino aceita o mesmo arquivo obtido durante a [exportação](index.md#export). Assim, a maneira mais fácil de obter um arquivo formatado corretamente para importação é primeiro exportar alguns dados de um form do mesmo schema e depois excluir as linhas que contêm os dados exportados, mantendo apenas os cabeçalhos das colunas. De qualquer forma, certifique-se de que os cabeçalhos das colunas estejam claros – eles serão usados como sugestões durante o mapeamento.

!!! note "Métricas identificadas por ID"
    Se uma coluna de métrica no seu arquivo fornecer o **ID** (UUID) da métrica, essa linha será vinculada à métrica existente com esse ID e nenhuma nova métrica será criada. O ID tem precedência sobre o nome da métrica, então isso acontece independentemente da opção **Reutilizar métricas existentes com o mesmo nome** (que se aplica apenas à correspondência por nome).

## Etapa 2 — Mapear campos

Após o envio, você verá uma tabela listando todas as colunas do seu arquivo. Cada linha tem três colunas:

- **Coluna do arquivo** – o cabeçalho original do seu arquivo.
- **Campo do form** – um menu suspenso onde você seleciona o campo do form correspondente.
- **Status** – mostra se a coluna está mapeada, ignorada ou se há um erro.

### Ações de mapeamento

- **Selecionar um campo do form** – abra o menu suspenso de uma coluna e escolha o campo correto. Você pode pesquisar dentro do menu suspenso.
- **Ignorar uma coluna** – selecione a opção **— Ignorar esta coluna —** no menu suspenso, ou clique no botão **Ignorar** na coluna de status. As colunas ignoradas ficam esmaecidas.
- **Restaurar uma coluna ignorada** – clique no botão **Restaurar** na coluna de status.

### Correspondência automática

Clique em **Correspondência automática** para que o Dino emparelhe automaticamente as colunas com os campos do form com base na similaridade de nomes. Este é um bom ponto de partida – revise e ajuste os mapeamentos conforme necessário.

!!! tip "A correspondência automática funciona melhor com cabeçalhos que correspondem exatamente aos rótulos dos campos ou que contêm palavras-chave semelhantes."

### Repetição

Se um campo do form selecionado for um campo de repetição (por exemplo, vários números de telefone), um campo **Repetição** aparece abaixo do menu suspenso. Insira o índice de repetição (0, 1, 2, …) para atribuir esta coluna do arquivo a uma ocorrência do grupo de repetição.

### Resumo da barra de ferramentas

Na parte superior da área de mapeamento, você pode ver três chips:

- **Total de colunas** – número de colunas do arquivo.
- **Mapeadas** – colunas que foram atribuídas a um campo do form.
- **Ignoradas** – colunas que você optou por ignorar.

Use o campo **Pesquisar colunas** para filtrar a tabela pelo nome da coluna do arquivo.

## Aplicar importação

Quando todas as colunas desejadas estiverem mapeadas e não houver erros, o botão **Aplicar importação** ficará habilitado. Clique nele para iniciar a importação. Durante o processamento, um indicador de carregamento aparece. Você pode clicar em **Voltar** para retornar à etapa 1 ou cancelar a importação.

Após uma importação bem-sucedida, você retorna à lista de dados do form, onde os novos dados aparecem.

!!! warning "Mapeamento duplicado"
    Se você mapear o mesmo campo do form para mais de uma coluna do arquivo, um erro de validação será exibido e o botão **Aplicar importação** permanecerá desabilitado até que seja corrigido.


## Formato do arquivo

Descrevemos o procedimento para importar alguns dados em massa usando um arquivo Excel gerado pelo Google Sheets. O mesmo procedimento vale para arquivos CSV ou se você trabalhar diretamente com o Excel.

Suponhamos que você queira importar dados em um form chamado Projects que tem 2 slides, um dos quais é um slide de repetição:

![O form Projects, com dois slides, um dos quais é um slide de repetição](../imgs/forms/import-repeating-slide.png)

O form Projects foi criado usando o seguinte XLSForm. A planilha "survey" é

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

e a "choices" é

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

Siga estes passos:

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

   observe que os campos que estão dentro de slides de repetição precisam ser tratados de forma diferente (por isso colocamos um asterisco). Consulte a seção específica abaixo.

   Os campos específicos do DINO podem ser:

   10. **created\_at**. A data de criação do form. Especifique isto apenas se você quiser que seus forms tenham uma data de criação diferente da data de importação;  
   11. **user\_data\_ref\_id**. O ID do usuário que será associado ao form (o padrão é o ID do usuário que está importando os forms);  
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

3. cada linha corresponderá a um novo form diferente. Então, se criarmos um arquivo com um cabeçalho \+ digamos, 5 linhas de dados, se o envio for bem-sucedido, criaremos 5 novos forms no DINO.   
4. Não é necessário ter uma coluna para cada campo do form; não é necessário preencher todas as linhas de uma determinada coluna, mas se um campo estiver vazio para todas as linhas, ele pode ser omitido,   
5. Os campos de data devem ser formatados como AAAA-MM-DD em texto (atenção).   
6. Os campos de escolha única devem conter uma das opções aceitas conforme especificado na "choices" (veja o construtor de form ou o arquivo XLSForm).   
7. Os campos de múltipla escolha devem ser formatados de acordo com o seguinte padrão: \[opt1, opt2\] (ou seja, uma lista de opções entre colchetes).

Por exemplo, um arquivo válido poderia ser o seguinte:

| country | country\_other | title | project\_date\_start | budget | isleader | area\_id |
| :---- | :---- | :---- | :---- | ----- | :---- | :---- |
| ALB | \[AFG,DZA\] | Human rights in education | 2022-01-28 | 120000 | true | 81387ff7-5c7d-44e7-9dc6-76b8d09265ac |
| ASM |  | A new approach to social justice | 2022-02-14 | 20000 |  | 81387ff7-5c7d-44e7-9dc6-76b8d09265ac |

Neste caso, estamos importando 2 forms e, para ambos, estamos selecionando apenas a métrica AREA. Além disso, observe que não fornecemos todos os campos do form para todos os forms, mas, para os campos em que fornecemos um valor, seguimos estritamente as indicações descritas acima.

### Lidando com métricas durante a importação

Durante a importação de alguns dados de form, no que diz respeito às métricas, você pode querer:

- criar novas métricas durante a importação  
- reutilizar métricas já criadas

As regras a seguir para gerenciar corretamente as métricas são as seguintes:

| METRICA | CREAZIONE DA UI | CREAZIONE DA IMPORT | CREAZIONE \+ ASSEGNAZIONE DA IMPORT | UTILIZZO DA IMPORT | CREAZIONE \+ ASSEGNAZIONE DA IMPORT (parent) | UTILIZZO PARENT |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| **Case** | name | name | name | id oppure name (con opzione reuse), oppure entrambe | name | id oppure name (con opzione reuse), oppure entrambe |
| **Organization** | name | name | name | id oppure name (con opzione reuse), oppure entrambe | name | id oppure name (con opzione reuse), oppure entrambe |
| **Location** | name | name | name | id oppure name (con opzione reuse), oppure entrambe | name | id oppure name (con opzione reuse), oppure entrambe |
| **Area** | name | name | name | id oppure name (con opzione reuse), oppure entrambe | name | id oppure name (con opzione reuse), oppure entrambe |
| **Project** | name, code | name, code | name, code | id | name, code | id |

# Slides de repetição

Se você tem campos em slides de repetição, eles precisam ser nomeados de forma diferente. Cada campo no slide de repetição precisa ser chamado \<field\_name\>\_\_X, onde X é o número da repetição, de 0 (correspondendo a uma repetição) até N-1, onde N é o número total de repetições de slide naquele form.   
Por exemplo, suponha que você tenha apenas 1 repetição do slide de repetição e queira adicionar os dois campos "Indicator description" e "Value reached". Você precisaria adicionar três colunas ao seu arquivo de importação:

| indic\_\_0 | value\_indic\_\_0 |
|  :---- | ----- |
| Number of children | 100 |

Assim, por exemplo, poderíamos ter:

| country | budget | indic\_\_0 | value\_indic\_\_0 | indic\_\_1 | value\_indic\_\_1 | isleader |
| :---- | ----- | :---- | ----- | :---- | ----- | :---- |
| ALB | 120000 | Children | 100 |  |  | true |
| ASM | 20000 |  |  |  |  |  |
| AFG | 15000 | Parents | 45 | Schools | 34 | true |

# Erros

Se ocorrer um erro durante a sincronização, o sistema forçará um logout e nenhum dado será sincronizado. Isso pode acontecer ao fornecer um ID errado para algumas das entidades referenciadas por seus IDs (como métricas e usuários).