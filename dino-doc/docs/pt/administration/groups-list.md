---
title: Lista de grupos
description: Gerencie grupos de usuários no Dino — visualize, crie, edite e exclua grupos de permissão com papéis, formulários, relatórios e métricas atribuídos.
---

# Lista de grupos

A página **Lista de grupos** mostra todos os grupos de usuários no Dino. Aqui você pode visualizar, editar, excluir e criar grupos. Cada grupo define um conjunto de permissões e regras de acesso ao vincular um papel de usuário a form schemas, report schemas, status de formulário e tipos de métrica específicos (como áreas, casos, projetos, posições ou organizações).

![Visualização principal da página Lista de grupos](../imgs/administration/groups-list.png)

## Visão geral da lista

A tabela exibe as seguintes colunas:

- **Nome do grupo** – o nome do grupo de usuários (visível por padrão).
- **ID** – identificador interno (oculto por padrão).
- **Data de criação** – quando o grupo foi criado (oculto por padrão).

Você pode personalizar quais colunas aparecem clicando no ícone **Personalize as colunas** no lado direito do cabeçalho da tabela.

## Busca e filtro

Use a **barra de busca** no topo da página para filtrar grupos por palavra-chave. O painel **Filtros** (expansível) permite restringir a lista por:

- Intervalo de datas (de/até)
- Qualquer tipo de métrica definido na sua implantação, ou seja, um ou mais dos seguintes: Projeto, Posição, Área, Caso, Organização

Você também pode salvar e carregar predefinições de filtro usando o gerenciador de predefinições.

## Ações sobre grupos

Cada linha tem três ícones de ação à direita:

- **Visualizar** – Visualizar detalhes do grupo (abre o editor em modo somente leitura)
- **Editar** – Editar propriedades do grupo
- **Excluir** – Remover o grupo (confirmação obrigatória)


## Criando um novo grupo

1. Clique no botão flutuante **+** no canto inferior direito da tela.
2. Na caixa de diálogo do editor que abre, insira um **Nome do grupo** (obrigatório).
3. Navegue pelas abas para selecionar:
    - **Papel de usuário** (obrigatório – você deve escolher exatamente um papel)
    - **Form schemas**
    - **Status de formulário**
    - **Report schemas**
    - **Tipos de métrica** (todos os tipos ativos na sua implantação: Área, Caso, Projeto, Posição, Organização) – se ativo
4. Na caixa de diálogo de **itens disponíveis** à direita, selecione um ou mais itens clicando no ícone **adicionar** ao lado de cada item para movê-lo para o painel **Itens do grupo**.
5. Clique em **Salvar**.

!!! tip "Opção All"
    Para tipos de métrica e outras categorias, você pode ver uma opção “All …”. Selecioná-la aplica a restrição a todos os itens desse tipo.

## Editando ou visualizando um grupo

1. Na tabela, clique no ícone **Editar** (edit) ou **Visualizar** (view) do grupo que você deseja modificar.
2. Na caixa de diálogo do editor, você pode:
    - Alterar o **Nome do grupo**.
    - Adicionar ou remover itens de qualquer aba (somente no modo de edição).
    - Remover itens clicando no ícone **excluir** ao lado deles.
3. Clique em **Salvar** para aplicar as alterações (o modo de visualização mostra apenas um botão **Fechar**).

## Excluindo um grupo

1. Clique no ícone **excluir** do grupo.
2. Confirme a exclusão na caixa de diálogo que aparece.

!!! warning "Ação irreversível"
    Excluir um grupo não pode ser desfeito. Certifique-se de que nenhum usuário depende do grupo antes de removê-lo.

## Páginas relacionadas

- [Lista de usuários](users-list.md) – gerencie contas de usuários individuais e suas atribuições de grupo.
- [Métricas](../metrics/index.md) – configure tipos de métrica que podem ser atribuídos a grupos (áreas, casos, projetos etc.).
- [Form Schemas](../forms/edit-form-schema.md) – crie e edite form schemas que podem ser vinculados a grupos.
- [Report Schemas](../reports/edit-report-schema.md) – gerencie report schemas disponíveis para grupos.
- [Visão geral da interface](../interface/index.md) – conheça a navegação e o layout geral.