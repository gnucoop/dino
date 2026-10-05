---
title: Lista de grupos
description: Gerencie grupos de usuários no Dino — visualize, crie, edite e exclua grupos de permissão com funções, formulários, relatórios e métricas atribuídos.
---

# Lista de grupos

A página **Lista de grupos** mostra todos os grupos de usuários no Dino. Aqui você pode visualizar, editar, excluir e criar grupos. Cada grupo define um conjunto de permissões e regras de acesso ao vincular uma função de usuário a formulários, relatórios, estados de formulário e tipos de métricas específicos (como áreas, casos, projetos, localizações ou organizações).

![Visualização principal da página Lista de grupos](../imgs/administration/groups-list.png)

## Visão geral da lista

A tabela exibe as seguintes colunas:

- **Nome do grupo** – o nome do grupo de usuários (visível por padrão).
- **ID** – identificador interno (oculto por padrão).
- **Data de criação** – quando o grupo foi criado (oculto por padrão).

O número de itens encontrados aparece acima da tabela, ao lado do paginador. Use o botão **Colunas** (dica *Personalizar as colunas*), acima da tabela à direita, para alterar quais colunas são exibidas.

## Pesquisa e filtro

Use o campo **pesquisa por palavra-chave** na barra de ferramentas para filtrar grupos por nome. Abra a caixa de diálogo **Filtros** para mais opções:

1. Clique em **Filtros**.
2. Defina uma **Data inicial** e uma **Até à data** para restringir os resultados aos grupos criados nesse intervalo.
3. Refine a lista por um ou mais filtros de métricas — **Projeto**, **Localização**, **Área**, **Caso** ou **Organização** — dependendo de quais estão ativos na sua implantação.
4. Clique em **Pesquisar** para aplicar os filtros, ou em **Repor os filtros** para limpá-los.

Os filtros aplicados aparecem como chips abaixo da barra de ferramentas. Clique no ícone **cancelar** de um chip para remover esse filtro.

## Ações sobre grupos

Passe o mouse sobre uma linha para mostrar os ícones **Editar** e **Ver**. Clique em uma linha para selecioná-la: a barra de ações acima da tabela então mostra todas as ações que você pode usar sobre ela:

- **Ver** – Ver detalhes do grupo (abre a página do grupo em modo somente leitura)
- **Editar** – Editar propriedades do grupo
- **Deletar** – Remover o grupo (confirmação necessária)

## Criando um novo grupo

Os grupos são criados e editados em uma página dedicada, não em uma caixa de diálogo.

1. Clique em **Adicionar novo grupo** na barra de ferramentas. A página *Criar grupo* é aberta.
2. Digite o **Nome do grupo** no cabeçalho da página.
3. Escolha os itens do grupo, uma aba por vez. Cada aba mostra quantos itens contém, e aparece apenas se sua categoria tiver itens:
    - **Função de usuário** (obrigatória – um grupo contém exatamente uma função; adicionar outra a substitui)
    - **Formulários**
    - **Estado do formulário**
    - **Report schema**
    - Uma aba por tipo de métrica ativo (**Área**, **Caso**, **Projeto**, **Localização**, **Organização**)
4. No painel esquerdo, pesquise os itens e clique em **Adicionar** ao lado de cada um que você quiser, ou em **Adicionar todos os exibidos** para adicionar todos os itens listados. O painel direito (*No grupo*) mostra o que o grupo contém para essa categoria.
5. Clique em **Salvar**. Ele é habilitado apenas quando o grupo tem um nome e uma função de usuário.

!!! tip "Opção Todos"
    Toda categoria, exceto Função de usuário, tem uma opção "Todos …" no topo de sua lista (por exemplo *Todos os formulários*). Escolhê-la substitui os itens individuais; adicionar um item individual a remove. Para métricas com hierarquia, adicionar um valor também adiciona seus filhos.

!!! note "Grupos de administrador"
    Se a função do grupo for uma função de administrador, **Formulários** e **Report schema** são sempre definidos como **Todos** e bloqueados, conforme mostrado por um ícone de cadeado: apenas um grupo que contém **Todos** neles pode criar novos schemas. Escolha uma função diferente para liberar o bloqueio.

## Editando ou visualizando um grupo

1. Na tabela, clique no ícone **Editar** ou **Ver** do grupo. A página *Editar grupo* ou *Ver grupo* é aberta.

    ![Editor para modificar um grupo de permissões de usuário](../imgs/administration/groups-list-edit.png)

2. No modo de edição você pode:
    - Alterar o **Nome do grupo**.
    - Adicionar itens do painel esquerdo, ou removê-los do painel direito com o botão × (**Limpar** remove todos os itens da categoria).
3. Clique em **Salvar** para aplicar as alterações. Não há botão Cancelar: para sair sem salvar, volte pelo caminho de navegação.

No modo de visualização, tudo é somente leitura e não há **Salvar**.

## Excluindo um grupo

1. Clique na linha do grupo para selecioná-la, depois clique em **Deletar** na barra de ações.
2. Confirme a exclusão na caixa de diálogo que aparece.

!!! warning "Ação irreversível"
    Excluir um grupo não pode ser desfeito. Certifique-se de que nenhum usuário depende do grupo antes de removê-lo.

## Páginas relacionadas

- [Lista de usuários](users-list.md) – gerencie contas de usuários individuais e suas atribuições de grupo.
- [Métricas](../metrics/index.md) – configure tipos de métricas que podem ser atribuídos a grupos (áreas, casos, projetos, etc.).
- [Formulários](../forms/edit-form-schema.md) – crie e edite formulários que podem ser vinculados a grupos.
- [Report schemas](../reports/edit-report-schema.md) – gerencie report schemas disponíveis para grupos.
- [Visão geral da interface](../interface/index.md) – conheça a navegação e o layout geral.