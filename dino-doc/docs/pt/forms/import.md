---
title: Importar Dados
description: Aprenda a importar dados estruturados em lote para qualquer esquema de formulário usando um arquivo CSV ou Excel. O assistente de duas etapas permite que você faça upload de um arquivo e mapeie suas colunas para os campos do formulário.
---

# Importar Dados

A página **Importar Dados** permite que você faça upload em lote de submissões para um esquema de formulário a partir de um arquivo `.xls`, `.xlsx` ou `.csv`. Um assistente de duas etapas guia você pelo upload do arquivo e pelo mapeamento das colunas do arquivo para os campos do formulário.

![Visualização principal da página Importar Dados](../imgs/forms/import.png)

## Acessar a Página de Importação

1. Navegue até a lista de **Formulários** e selecione um esquema de formulário.
2. Na visualização de dados do formulário, clique em **Importar** (o botão da barra de ferramentas).

## Etapa 1 — Enviar Arquivo

A primeira etapa mostra uma zona de arrastar e soltar ou um seletor de arquivos.

- **Formatos aceitos:** `.xls`, `.xlsx`, `.csv`
- **Tamanho máximo do arquivo:** 20 MB

Para enviar:

1. Arraste um arquivo para a área tracejada **ou** clique em **Escolher um arquivo** para navegar.
2. Após a seleção, o nome do arquivo aparece em um chip juntamente com o número de colunas detectadas.
3. (Opcional) Deixe marcada a opção **Reutilizar métricas existentes com o mesmo nome** (padrão) para que qualquer métrica do arquivo cujo nome coincida com uma métrica já existente no sistema seja vinculada a essa métrica existente em vez de criar uma duplicata. Desmarque para sempre criar novas métricas.
4. Clique em **Avançar** (ou no rótulo do assistente “2 · Mapear campos”) para prosseguir.

!!! tip "Formatos de arquivo"
    Dino aceita os mesmos tipos de arquivo usados para coleta de dados padrão. Certifique-se de que os cabeçalhos das colunas estejam claros – eles serão usados como sugestões durante o mapeamento.

!!! note "Métricas identificadas por ID"
    Se uma coluna de métrica no seu arquivo fornecer o **ID** (UUID) da métrica, essa linha é vinculada à métrica existente com esse ID e nenhuma métrica nova é criada. O ID tem prioridade sobre o nome da métrica, portanto isso ocorre independentemente da opção **Reutilizar métricas existentes com o mesmo nome** (que se aplica apenas à correspondência por nome).

## Etapa 2 — Mapear Campos

Após o upload, você verá uma tabela listando todas as colunas do seu arquivo. Cada linha tem três colunas:

- **Coluna do arquivo** – o cabeçalho original do seu arquivo.
- **Campo do formulário** – um menu suspenso onde você seleciona o campo correspondente do formulário.
- **Status** – mostra se a coluna está mapeada, ignorada ou possui um erro.

### Ações de Mapeamento

- **Selecionar um campo do formulário** – abra o menu suspenso de uma coluna e escolha o campo correto. Você pode pesquisar dentro do menu suspenso.
- **Ignorar uma coluna** – selecione a opção **— Ignorar esta coluna —** no menu suspenso, ou clique no botão **Ignorar** na coluna de status. Colunas ignoradas são cinzas.
- **Restaurar uma coluna ignorada** – clique no botão **Restaurar** na coluna de status.

### Correspondência Automática

Clique em **Auto‑match** para permitir que o Dino emparelhe automaticamente colunas com campos do formulário com base na similaridade de nomes. Este é um bom ponto de partida – revise e ajuste os mapeamentos conforme necessário.

!!! tip "Auto‑match funciona melhor com cabeçalhos que correspondem exatamente aos rótulos dos campos ou contêm palavras-chave semelhantes."

### Repetição

Se um campo de formulário selecionado for um campo repetitivo (por exemplo, vários números de telefone), uma entrada de **Repetição** aparece abaixo do menu suspenso. Insira o índice de repetição (0, 1, 2, …) para atribuir esta coluna do arquivo a uma ocorrência do grupo repetitivo.

### Resumo da Barra de Ferramentas

No topo da área de mapeamento, você pode ver três chips:

- **Total de colunas** – número de colunas do arquivo.
- **Mapeadas** – colunas que foram atribuídas a um campo do formulário.
- **Ignoradas** – colunas que você escolheu ignorar.

Use a entrada **Pesquisar colunas** para filtrar a tabela pelo nome da coluna do arquivo.

## Aplicar Importação

Quando todas as colunas desejadas estão mapeadas e não há erros, o botão **Aplicar importação** fica habilitado. Clique nele para iniciar a importação. Durante o processamento, um spinner aparece. Você pode clicar em **Voltar** para retornar à etapa 1 ou cancelar a importação.

Após uma importação bem-sucedida, você retorna à lista de dados do formulário, onde as novas submissões aparecem.

!!! warning "Mapeamento duplicado"
    Se você mapear o mesmo campo do formulário para mais de uma coluna do arquivo, um erro de validação é exibido e o botão **Aplicar importação** permanece desabilitado até que seja corrigido.