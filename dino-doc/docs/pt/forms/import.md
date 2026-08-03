---
title: Importar Dados
description: Aprenda a importar em massa dados estruturados em qualquer esquema de formulário usando um arquivo CSV ou Excel. O assistente de duas etapas permite enviar um arquivo e mapear suas colunas para os campos do formulário.
---

# Importar Dados

A página **Importar Dados** permite importar em massa submissões em um esquema de formulário a partir de um arquivo `.xls`, `.xlsx` ou `.csv`. Um assistente de duas etapas guia você pelo envio do arquivo e pelo mapeamento das colunas do arquivo para os campos do formulário.

![Main view of the Import Data page](../imgs/forms/import.png)

## Acessar a página de importação

1. Navegue até a lista **Formulários** e selecione um esquema de formulário.
2. Na visualização de dados do formulário, clique em **Importar** (o botão da barra de ferramentas).

## Etapa 1 — Enviar arquivo

A primeira etapa mostra uma área de arrastar e soltar ou um seletor de arquivos.

- **Formatos aceitos:** `.xls`, `.xlsx`, `.csv`
- **Tamanho máximo do arquivo:** 20 MB

Para enviar:

1. Arraste um arquivo para a área tracejada **ou** clique em **Escolher um arquivo** para navegar.
2. Após a seleção, o nome do arquivo aparece em uma etiqueta junto com o número de colunas detectadas.
3. (Opcional) Deixe marcada a opção **Reutilizar métricas existentes com o mesmo nome** (padrão) para que qualquer métrica no arquivo cujo nome corresponda a uma métrica já existente no sistema seja vinculada a essa métrica existente em vez de criar uma duplicata. Desmarque-a para sempre criar novas métricas.
4. Clique em **Avançar** (ou no rótulo da etapa “2 · Mapear campos”) para continuar.

!!! tip "Formatos de arquivo"
    O Dino aceita os mesmos tipos de arquivo usados para coleta de dados padrão. Certifique-se de que os cabeçalhos das colunas estejam claros – eles serão usados como sugestões durante o mapeamento.

!!! note "Métricas identificadas por ID"
    Se uma coluna de métrica no seu arquivo fornecer o **ID** (UUID) da métrica, essa linha será vinculada à métrica existente com esse ID e nenhuma métrica nova será criada. O ID tem precedência sobre o nome da métrica, portanto isso ocorre independentemente da opção **Reutilizar métricas existentes com o mesmo nome** (que só se aplica à correspondência por nome).

## Etapa 2 — Mapear campos

Após o envio, você verá uma tabela listando todas as colunas do seu arquivo. Cada linha tem três colunas:

- **Coluna do arquivo** – o cabeçalho original do seu arquivo.
- **Campo do formulário** – um menu suspenso onde você seleciona o campo correspondente do formulário.
- **Status** – mostra se a coluna está mapeada, ignorada ou se há um erro.

### Ações de mapeamento

- **Selecionar um campo do formulário** – abra o menu suspenso de uma coluna e escolha o campo correto. Você pode pesquisar no menu suspenso.
- **Ignorar uma coluna** – selecione a opção **— Ignorar esta coluna —** no menu suspenso, ou clique no botão **Ignorar** na coluna de status. Colunas ignoradas ficam acinzentadas.
- **Restaurar uma coluna ignorada** – clique no botão **Restaurar** na coluna de status.

### Correspondência automática

Clique em **Correspondência automática** para que o Dino associe automaticamente colunas a campos do formulário com base na semelhança dos nomes. Este é um bom ponto de partida – revise e ajuste os mapeamentos conforme necessário.

!!! tip "A correspondência automática funciona melhor com cabeçalhos que correspondam exatamente aos rótulos dos campos ou que contenham palavras-chave semelhantes."

### Repetição

Se o campo do formulário selecionado for um campo repetível (por exemplo, vários números de telefone), um campo de entrada **Repetição** aparece abaixo do menu suspenso. Digite o índice de repetição (0, 1, 2, …) para atribuir esta coluna do arquivo a uma ocorrência do grupo repetível.

### Resumo da barra de ferramentas

No topo da área de mapeamento, você pode ver três etiquetas:

- **Total de colunas** – número de colunas do arquivo.
- **Mapeadas** – colunas que foram atribuídas a um campo do formulário.
- **Ignoradas** – colunas que você optou por ignorar.

Use o campo **Pesquisar colunas** para filtrar a tabela pelo nome da coluna do arquivo.

## Aplicar importação

Quando todas as colunas desejadas estiverem mapeadas e não houver erros, o botão **Aplicar importação** será habilitado. Clique nele para iniciar a importação. Durante o processamento, um indicador de carregamento aparece. Você pode clicar em **Voltar** para retornar à etapa 1 ou cancelar a importação.

Após uma importação bem-sucedida, você é levado de volta à lista de dados do formulário, onde as novas submissões aparecem.

!!! warning "Mapeamento duplicado"
    Se você mapear o mesmo campo do formulário para mais de uma coluna do arquivo, um erro de validação será exibido e o botão **Aplicar importação** permanecerá desabilitado até que o problema seja corrigido.