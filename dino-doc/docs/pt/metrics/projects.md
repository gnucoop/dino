---
title: Projetos
description: Gerencie seus projetos no Dino. Visualize, adicione, edite, exclua, importe e exporte registros de projetos com filtro e ações em massa.
---

# Projetos

A página **Projetos** no Dino permite gerenciar todos os valores da metrica Projeto. Isso pode ser usado para mapear os projetos da sua organização, um programa, colaborações com doadores ou qualquer outro tipo de grupo estruturado de atividades relevante para o seu trabalho. Você pode visualizar uma lista ordenável de projetos, adicionar novos, editar os existentes, excluí-los, importar dados em massa e exportar a lista para análise offline. A página também oferece ferramentas de filtro poderosas para encontrar rapidamente o projeto que você precisa.

![Visualização principal da página Projetos](../imgs/metrics/projects.png)

## Navegando até Projetos

Para abrir a página Projetos, expanda a seção **Metricas** na navegação principal e selecione **Projetos**. A URL do navegador terminará com `/metrics/projects`.

## Entendendo a Lista de Projetos

A tabela principal mostra uma lista de todos os projetos. Cada linha corresponde a um projeto e exibe as seguintes colunas por padrão:

- **Nome do Projeto** – O nome do projeto. Você pode ordenar a lista por esta coluna.
- **Projeto Pai** – O projeto de nível superior ao qual este projeto pertence, se houver.
- **Código** – Um código de projeto atribuído manualmente.
- **Código Automático** – Um código gerado automaticamente. Este campo é somente leitura e não pode ser editado.
- **Setores de Intervenção** – Os setores nos quais o projeto se concentra.
- **Doadores** – As fontes de financiamento do projeto.
- **Data de Início** – A data em que o projeto começa.
- **Data de Término** – A data em que o projeto termina.

Colunas ocultas (ID, Data de Criação e Atributos Adicionais) podem ser exibidas clicando no botão **Personalizar colunas** (o ícone parece uma visualização semanal) no canto superior direito da tabela.

!!! tip "Campos somente leitura"
    O campo **Código Automático** é gerado automaticamente e não pode ser alterado. Ele aparecerá esmaecido na caixa de diálogo de edição.

A barra de ferramentas superior exibe o número total de itens encontrados e um paginador. Você pode escolher quantos projetos visualizar por página.

## Gerenciando Projetos

### Adicionando um Novo Projeto

1. Clique no botão flutuante **Adicionar Novo** (o ícone **+** circulado) no canto inferior direito da tela.
2. Uma caixa de diálogo será aberta onde você preencherá os detalhes do projeto. Os campos obrigatórios estão marcados conforme necessário.
3. Pressione **Salvar** para criar o projeto. Ele aparecerá na lista imediatamente.

### Editando um Projeto

1. Na linha do projeto que você deseja alterar, clique no ícone **editar** (lápis).
2. Modifique os campos na caixa de diálogo. O campo **Código Automático** ficará esmaecido.
3. Clique em **Salvar** para aplicar suas alterações.

### Visualizando um Projeto

- Clique no ícone **visualizar** (olho) na linha do projeto para abrir uma versão somente leitura da caixa de diálogo de detalhes do projeto.

### Excluindo um Projeto

1. Clique no ícone **excluir** (lixeira) na linha do projeto.
2. Confirme a exclusão na janela pop-up. O projeto será removido permanentemente.

!!! warning "Excluindo um projeto"
    Excluir um projeto o remove do sistema. Esta ação não pode ser desfeita. Certifique-se de ter selecionado o projeto correto antes de confirmar.

## Pesquisa e Filtro

A barra de **pesquisa e filtros** fica abaixo do caminho de navegação. Você pode:

- **Pesquisar por palavra-chave** – Digite qualquer termo no campo de palavra-chave; a lista é filtrada automaticamente.
- **Filtrar por intervalo de datas** – Use os seletores **Data inicial** e **Data final** para restringir projetos por data de início ou término.
- **Aplicar filtros adicionais** – Clique no botão **lista de filtros** (ícone de funil) para abrir uma caixa de diálogo com filtros mais avançados, como setores, doadores ou outros atributos personalizados.
- **Salvar e carregar predefinições de filtro** – Use o gerenciador de predefinições para salvar sua combinação de filtros atual e recarregá-la posteriormente.

Chips de filtro aparecem abaixo da barra de filtros, mostrando os filtros ativos. Você pode remover chips individuais clicando no ícone **cancelar** em cada um deles.

## Exportando e Importando

### Exportando Projetos

1. Clique no botão **exportar** (ícone de download na nuvem) na barra de filtros.
2. Escolha o formato de exportação (por exemplo, CSV, Excel) e as colunas que deseja incluir.
3. O arquivo será baixado para o seu computador.

### Importando Projetos

1. Clique no botão flutuante **importar** (ícone de upload na nuvem) no canto inferior direito.
2. Faça upload de um arquivo formatado corretamente (por exemplo, CSV ou Excel). O sistema criará ou atualizará projetos com base nos dados.
3. Revise os resultados da importação para verificar se há erros ou avisos.

## Ações em Massa

Você pode selecionar vários projetos usando as caixas de seleção à esquerda de cada linha. Assim que pelo menos um projeto for selecionado, a barra de ferramentas acima da tabela exibirá ações em massa:

- **Excluir selecionados** – Remove todos os projetos selecionados após confirmação.
- **Editar selecionados (edição em massa de formulário)** – Abre uma caixa de diálogo onde você pode editar um campo comum para todos os projetos selecionados de uma só vez.

Após a edição ou exclusão em massa, a lista é atualizada automaticamente.