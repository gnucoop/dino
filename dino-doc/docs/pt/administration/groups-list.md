---
title: Lista de Grupos
description: Gerencie grupos de usuários no Dino — visualize, crie, edite e exclua grupos de permissão com funções, formulários, relatórios e métricas atribuídos.
---

# Lista de Grupos

A página **Lista de Grupos** mostra todos os grupos de usuários no Dino. A partir daqui você pode visualizar, editar, excluir e criar grupos. Cada grupo define um conjunto de permissões e regras de acesso ao vincular uma função de usuário a esquemas de formulário, esquemas de relatório, status de formulário e tipos de métrica específicos (como áreas, casos, projetos, localizações ou organizações).

![Main view of the Groups List page](../imgs/administration/groups-list.png)

## Visão geral da lista

A tabela exibe as seguintes colunas:

- **Nome do Grupo** – o nome do grupo de usuários (visível por padrão).
- **ID** – identificador interno (oculto por padrão).
- **Data de Criação** – quando o grupo foi criado (oculto por padrão).

Você pode personalizar quais colunas aparecem clicando no ícone **Ver Colunas** (também chamado de ícone **hotdog** pelos programadores de software!) no lado direito do cabeçalho da tabela.

## Pesquisar e filtrar

Use a **barra de pesquisa** no topo da página para filtrar grupos por palavra-chave. O painel **Filtros** (expansível) permite restringir a lista por:

- Intervalo de datas (de/até)
- Qualquer tipo de métrica definido na sua implantação, ou seja, um ou mais dos seguintes: Projeto, Localização, Área, Caso, Organização

Você também pode salvar e carregar predefinições de filtro usando o gerenciador de predefinições.

## Ações em grupos

Cada linha tem três ícones de ação à direita:

- **Visualizar** – Visualizar os detalhes do grupo (abre o editor no modo somente leitura)
- **Editar** – Editar as propriedades do grupo
- **Excluir** – Remover o grupo (é necessária confirmação)

## Criando um novo grupo

1. Clique no botão flutuante **+** no canto inferior direito da tela.
2. Na caixa de diálogo do editor que se abre, insira um **Nome do grupo** (obrigatório).
3. Navegue pelas guias para selecionar:
    - **Função do usuário** (obrigatória – você deve escolher exatamente uma função)
    - **Esquemas de formulário**
    - **Status de formulário**
    - **Esquemas de relatório**
    - **Tipos de métrica** (todos os tipos ativos para a sua implantação: Área, Caso, Projeto, Localização, Organização) – se ativo
4. Na caixa de diálogo **itens disponíveis** no lado direito, selecione um ou mais itens clicando no ícone **adicionar** ao lado de cada item para movê-lo para o painel **Itens do grupo**.
5. Clique em **Salvar**.

!!! tip "Opção Todos"
    Para tipos de métrica e outras categorias, você pode ver uma opção “Todos …”. Selecioná-la aplica a restrição a todos os itens daquele tipo.

## Editando ou visualizando um grupo

1. Na tabela, clique no ícone **Editar** (editar) ou **Visualizar** (visualizar) do grupo que você deseja modificar.
2. Na caixa de diálogo do editor, você pode:
    - Alterar o **Nome do grupo**.
    - Adicionar ou remover itens de qualquer guia (somente no modo de edição).
    - Remover itens clicando no ícone **excluir** ao lado deles.
3. Clique em **Salvar** para aplicar as alterações (o modo de visualização mostra apenas um botão **Fechar**).

## Excluindo um grupo

1. Clique no ícone **excluir** do grupo.
2. Confirme a exclusão na caixa de diálogo que aparece.

!!! warning "Ação irreversível"
    A exclusão de um grupo não pode ser desfeita. Certifique-se de que nenhum usuário dependa do grupo antes de removê-lo.

## Páginas relacionadas

- [Lista de Usuários](users-list.md) – gerencie contas de usuário individuais e suas atribuições de grupo.
- [Métricas](../metrics/index.md) – configure tipos de métrica que podem ser atribuídos a grupos (áreas, casos, projetos, etc.).
- [Esquemas de Formulário](../forms/edit-form-schema.md) – crie e edite esquemas de formulário que podem ser vinculados a grupos.
- [Esquemas de Relatório](../reports/edit-report-schema.md) – gerencie esquemas de relatório disponíveis para grupos.
- [Visão geral da interface](../interface/index.md) – saiba mais sobre a navegação e o layout geral.