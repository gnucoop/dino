---
title: Lista de Grupos
description: Gerencie grupos de usuários no Dino — visualize, crie, edite e exclua grupos de permissão com funções, formulários, relatórios e métricas atribuídos.
---

# Lista de Grupos

A página **Lista de Grupos** mostra todos os grupos de usuários no Dino. A partir daqui, você pode visualizar, editar, excluir e criar grupos. Cada grupo define um conjunto de permissões e regras de acesso vinculando uma função de usuário a esquemas de formulário, esquemas de relatório, status de formulário e tipos de métricas (como áreas, casos, projetos, locais ou organizações) específicos.

![Main view of the Groups List page](../imgs/administration/groups-list.png)

## Visão geral da lista

A tabela exibe as seguintes colunas:

- **Nome do Grupo** – o nome do grupo de usuários (visível por padrão).
- **ID** – identificador interno (oculto por padrão).
- **Data de Criação** – quando o grupo foi criado (oculto por padrão).

Você pode personalizar quais colunas aparecem clicando no ícone **view_week** no cabeçalho da tabela.

## Pesquisar e filtrar

Use a **barra de pesquisa** no topo da página para filtrar grupos por palavra-chave. O painel **Filtros** (expansível) permite restringir a lista por:

- Intervalo de datas (de/até)
- Projeto, local, área, caso, organização e outros filtros disponíveis

Você também pode salvar e carregar predefinições de filtro usando o gerenciador de predefinições.

## Ações nos grupos

Cada linha possui três ícones de ação à direita:

- **visibility** – Visualizar detalhes do grupo (abre o editor no modo somente leitura)
- **create** – Editar propriedades do grupo
- **delete** – Remover o grupo (confirmação necessária)

Clicar em uma linha expande uma seção de detalhes que mostra informações adicionais ou itens aninhados (se houver).

## Criar um novo grupo

1. Clique no botão flutuante **+** no canto inferior direito da tela.
2. Na caixa de diálogo do editor que se abre, insira um **Nome do Grupo**.
3. No painel **Itens disponíveis**, navegue pelas abas para selecionar:
    - **Função de usuário** (obrigatório – você deve escolher exatamente uma função)
    - **Esquemas de formulário**
    - **Esquemas de relatório**
    - **Status de formulário**
    - Tipos de métrica (Área, Caso, Projeto, Local, Organização) – se ativos
4. Clique no ícone **add** ao lado de cada item para movê-lo para o painel **Itens do grupo**.
5. Clique em **Salvar**.

!!! tip "Opção 'Todos'"
    Para tipos de métrica e outras categorias, você pode ver uma opção "Todos…". Selecionar isso aplica a restrição a todos os itens desse tipo.

## Editar ou visualizar um grupo

1. Na tabela, clique no ícone **create** (editar) ou **visibility** (visualizar) do grupo que deseja modificar.
2. Na caixa de diálogo do editor, você pode:
    - Alterar o **Nome do Grupo**.
    - Adicionar ou remover itens de qualquer aba (apenas no modo de edição).
    - Remover itens clicando no ícone **delete** ao lado deles.
3. Clique em **Salvar** para aplicar as alterações (o modo de visualização mostra apenas um botão **Fechar**).

## Excluir um grupo

1. Clique no ícone **delete** do grupo.
2. Confirme a exclusão na caixa de diálogo que aparece.

!!! warning "Ação irreversível"
    Excluir um grupo não pode ser desfeito. Certifique-se de que nenhum usuário dependa do grupo antes de removê-lo.

## Páginas relacionadas

- [Lista de Usuários](users-list.md) – gerencie contas de usuário individuais e suas atribuições de grupo.
- [Métricas](../metrics/index.md) – configure tipos de métrica que podem ser atribuídos a grupos (áreas, casos, projetos, etc.).
- [Esquemas de Formulário](../forms/edit-form-schema.md) – crie e edite esquemas de formulário que podem ser vinculados a grupos.
- [Esquemas de Relatório](../reports/edit-report-schema.md) – gerencie esquemas de relatório disponíveis para grupos.
- [Visão geral da interface](../interface/index.md) – aprenda sobre navegação e layout geral.
