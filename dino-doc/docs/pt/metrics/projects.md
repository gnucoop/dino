---
title: Projetos
description: Gerencie seus projetos no Dino. Visualize, adicione, edite, exclua, importe e exporte registros de projetos com filtros e ações em massa.
---

# Projetos

A página **Projetos** no Dino permite gerenciar todos os seus registros estruturados de projetos. Você pode visualizar uma lista ordenável de projetos, adicionar novos, editar os existentes, excluí-los, importar dados em massa e exportar a lista para análise offline. A página também oferece ferramentas poderosas de filtro para encontrar rapidamente o projeto que você precisa.

![Main view of the Projects page](../imgs/metrics/projects.png)

## Navegando até Projetos

Para abrir a página Projetos, expanda a seção **Métricas** no menu de navegação principal e selecione **Projetos**. A URL do navegador terminará com `/metrics/projects`.

## Entendendo a Lista de Projetos

A tabela principal mostra uma lista de todos os projetos. Cada linha corresponde a um projeto e exibe as seguintes colunas por padrão:

- **Nome do Projeto** – O nome do projeto. Você pode ordenar a lista por esta coluna.
- **Projeto Pai** – O projeto de nível superior ao qual este projeto pertence, se houver.
- **Código** – Um código de projeto atribuído manualmente.
- **Código Automático** – Um código gerado automaticamente. Este campo é somente leitura e não pode ser editado.
- **Setores de Intervenção** – Os setores nos quais o projeto atua.
- **Doadores** – As fontes de financiamento do projeto.
- **Data de Início** – A data em que o projeto começa.
- **Data de Término** – A data em que o projeto termina.

As colunas ocultas (ID, Data de Criação e Atributos Adicionais) podem ser exibidas clicando no botão **Personalizar colunas** (o ícone parece um modo de exibição semanal) no canto superior direito da tabela.

!!! tip "Campos somente leitura"
    O campo **Código Automático** é gerado automaticamente e não pode ser alterado. Ele aparecerá acinzentado no diálogo de edição.

A barra de ferramentas superior exibe o número total de itens encontrados e um paginador. Você pode escolher quantos projetos exibir por página.

## Gerenciando Projetos

### Adicionando um Novo Projeto

1. Clique no botão flutuante **Adicionar novo** (o ícone **+** circulado) no canto inferior direito da tela.
2. Um diálogo é aberto onde você preenche os detalhes do projeto. Os campos obrigatórios estão marcados de acordo.
3. Pressione **Salvar** para criar o projeto. Ele aparecerá na lista imediatamente.

### Editando um Projeto

1. Na linha do projeto que você deseja alterar, clique no ícone de **edição** (lápis).
2. Modifique os campos no diálogo. O campo **Código Automático** ficará acinzentado.
3. Clique em **Salvar** para aplicar as alterações.

### Visualizando um Projeto

- Clique no ícone de **visualização** (olho) na linha do projeto para abrir uma versão somente leitura do diálogo de detalhes do projeto.

### Excluindo um Projeto

1. Clique no ícone de **exclusão** (lixeira) na linha do projeto.
2. Confirme a exclusão na janela pop-up. O projeto será removido permanentemente.

!!! warning "Excluindo um projeto"
    Excluir um projeto o remove do sistema. Essa ação não pode ser desfeita. Certifique-se de ter selecionado o projeto correto antes de confirmar.

## Pesquisa e Filtros

A barra de pesquisa e filtros fica abaixo da trilha de navegação. Você pode:

- **Pesquisar por palavra-chave** – Digite qualquer termo no campo de palavra-chave; a lista é filtrada automaticamente.
- **Filtrar por período** – Use os seletores de **Data inicial** e **Data final** para restringir os projetos por data de início ou término.
- **Aplicar filtros adicionais** – Clique no botão **lista de filtros** (ícone de funil) para abrir um diálogo com filtros mais avançados, como setores, doadores ou outros atributos personalizados.
- **Salvar e carregar predefinições de filtro** – Use o gerenciador de predefinições para salvar sua combinação atual de filtros e recarregá-la depois.

Os chips de filtro aparecem abaixo da barra de filtros, mostrando os filtros ativos. Você pode remover chips individuais clicando no ícone de cancelar em cada um.

## Exportando e Importando

### Exportando Projetos

1. Clique no botão **exportar** (ícone de download na nuvem) na barra de filtros.
2. Escolha o formato de exportação (por exemplo, CSV, Excel) e as colunas que deseja incluir.
3. O arquivo será baixado para o seu computador.

### Importando Projetos

1. Clique no botão flutuante **importar** (ícone de upload na nuvem) no canto inferior direito.
2. Envie um arquivo formatado corretamente (por exemplo, CSV ou Excel). O sistema criará ou atualizará projetos com base nos dados.
3. Revise os resultados da importação para verificar erros ou avisos.

## Ações em Massa

Você pode selecionar vários projetos usando as caixas de seleção à esquerda de cada linha. Quando pelo menos um projeto estiver selecionado, a barra de ferramentas acima da tabela mostrará as ações em massa:

- **Excluir selecionados** – Remove todos os projetos selecionados após a confirmação.
- **Editar selecionados (edição em massa de formulário)** – Abre um diálogo onde você pode editar um campo comum para todos os projetos selecionados de uma só vez.

Após edição ou exclusão em massa, a lista é atualizada automaticamente.