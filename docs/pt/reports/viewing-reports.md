---
title: Visualizar e Gerir Relatórios
description: Como navegar, filtrar, visualizar, exportar, favoritar e eliminar relatórios no Dino.
---

# Visualizar e Gerir Relatórios

Esta página lista todos os relatórios gerados a partir de um esquema de relatório específico. Pode navegar, pesquisar, visualizar, exportar, marcar como favorito e eliminar relatórios individuais a partir desta lista central.

---

## Navegar na Lista

A lista apresenta todos os relatórios para o esquema selecionado. Cada linha representa um relatório.

A lista inclui as seguintes colunas:

*   **Utilizador**: A pessoa que criou o relatório.
*   **Nome**: O título do relatório.
*   **Estado**: O estado atual do relatório.
*   **Dados desde / Dados até**: O intervalo de datas dos dados incluídos no relatório.
*   **Data de Criação**: Quando o relatório foi criado.
*   **Projeto, Localização, Área, Caso, Organização**: Estas colunas aparecem apenas se os tipos de métrica correspondentes estiverem ativos no seu espaço de trabalho.

Utilize os controlos de paginação na parte inferior da lista para navegar entre páginas.

---

## Pesquisar e Filtrar

Utilize a barra de filtros acima da lista para restringir os relatórios apresentados.

1.  Clique em qualquer campo de filtro (como **Projeto** ou **Localização**) para selecionar valores específicos.
2.  Pode combinar vários filtros.
3.  Para guardar a sua combinação de filtros para uso posterior, clique no ícone do menu de predefinições na barra de filtros e selecione **Guardar como predefinição**.
4.  Para carregar um filtro guardado, abra o menu de predefinições e selecione o nome da predefinição.

---

## Ações sobre Relatórios

Cada linha de relatório tem ícones de ação à direita. As ações disponíveis para si dependem das suas permissões de utilizador.

*   **Visualizar** (![ícone de olho](../imgs/reports/eye-icon.png)): Abre o relatório numa vista só de leitura.
*   **Adicionar aos favoritos** (![ícone de estrela](../imgs/reports/star-outline-icon.png)): Marca este relatório como favorito para acesso rápido.
*   **Remover dos favoritos** (![ícone de estrela](../imgs/reports/star-filled-icon.png)): Remove o relatório da sua lista de favoritos.
*   **Eliminar** (![ícone de lixo](../imgs/reports/delete-icon.png)): Elimina permanentemente o relatório. Será solicitada a confirmação desta ação.

!!! tip "Ações baseadas em permissões"
    Pode não ver todas as ações. Os ícones apresentados baseiam-se nas permissões concedidas ao seu papel de utilizador.

---

## Adicionar um Novo Relatório

Um botão flutuante **+** está disponível se tiver permissão para criar novos relatórios para este esquema.

1.  Clique no botão **+**.
2.  Se o esquema de relatório utilizar funcionalidades de IA, uma dica de contexto mostrará quantos créditos serão utilizados. A criação do relatório prosseguirá automaticamente.

!!! warning "Créditos Insuficientes"
    Se não tiver créditos de IA suficientes, aparecerá uma mensagem de aviso. Será necessário adicionar mais créditos à sua conta antes de poder criar este relatório.

---

## Visualizar um Relatório

Para visualizar um relatório, clique na sua linha na lista ou utilize o ícone de ação **Visualizar**.

### 1. Selecionar Métricas

Se o esquema de relatório estiver ligado a métricas, verá primeiro um passo de seleção de métricas.

1.  Escolha valores para as métricas obrigatórias (ex.: Projeto, Localização).
2.  Ajuste a **Data de Início** e a **Data de Fim** se necessário.
3.  Clique em **Seguinte** para gerar e carregar o relatório.

### 2. Visualização do Relatório

A vista do relatório mostra o título do relatório, o intervalo de datas, as métricas selecionadas e o conteúdo principal do relatório, que está estruturado de acordo com o seu esquema.

!!! note "Conteúdo gerado por IA"
    Se o relatório incluir texto gerado por IA, verá um indicador de progresso (ex.: "A gerar prompt de relatório 1 de 3") enquanto o conteúdo é preparado. Isto acontece automaticamente.

### 3. Exportar um Relatório

A partir da vista do relatório, pode exportá-lo em diferentes formatos.

*   **PDF**: Clique no botão PDF para transferir um ficheiro PDF.
*   **Excel (XLSX)**: Clique no botão Excel para transferir uma folha de cálculo.
*   **Word (DOCX)**: Clique no botão Word para transferir um documento Word.

!!! warning "Sem conteúdo exportável"
    Se tentar exportar para Excel e vir uma mensagem a dizer "Não foi encontrado nenhum widget exportável", significa que o relatório não contém quaisquer dados de tabela ou gráfico que possam ser colocados numa folha de cálculo.

---

## Resolução de Problemas

### "Não foram encontrados Formulários para este Relatório"

!!! warning
    Este erro significa que o relatório não pôde ser gerado porque não existem dados submetidos ligados a ele. Certifique-se de que foram recolhidos envios de formulários utilizando o esquema de formulário ligado a este relatório antes de tentar visualizá-lo.