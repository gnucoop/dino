---
title: Lista de Grupos
description: Visualize e gerencie grupos de usuários na página Lista de Grupos no Dino. Saiba mais sobre filtros, a tabela de dados e como criar ou editar grupos.
---

# Lista de Grupos

A página Lista de Grupos exibe todos os grupos de usuários da sua instância do Dino. A partir daqui você pode visualizar, filtrar e criar novos grupos, ou editar grupos existentes.

![Visão principal da página Lista de Grupos](../imgs/administration/groups-list.png)

## O que você vê

A página contém:

- **Barra de pesquisa e filtros** – Use os filtros disponíveis para reduzir a lista de grupos. Os filtros incluem Projeto, Localização, Área, Caso e Organização. Você também pode usar a caixa de pesquisa geral para encontrar grupos pelo nome.
- **Tabela de dados** – Mostra informações principais sobre cada grupo, incluindo o nome do grupo. Colunas adicionais (ID, data de criação) ficam ocultas por padrão, mas podem ser exibidas através do seletor de colunas.
- **Botão de ação flutuante** – Um botão "+" no canto inferior direito abre o editor para criar um novo grupo.
- **Ações nas linhas** – Clique em uma linha para revelar opções embutidas de seleção ou expansão de mais detalhes sobre aquele grupo.

## Usando filtros

1. Clique no ícone de filtro para abrir a barra de filtros.
2. Escolha um tipo de filtro no menu suspenso (ex.: **Projeto**).
3. Selecione ou digite o valor pelo qual deseja filtrar.
4. A lista é atualizada automaticamente para mostrar apenas os grupos correspondentes.

!!! tip "Múltiplos filtros"
    Você pode aplicar vários filtros ao mesmo tempo para refinar ainda mais os resultados.

## Criando um novo grupo

1. Clique no botão flutuante **+** no canto inferior direito da página.
2. O editor de grupos é aberto. Insira as informações necessárias:
   - **Nome do grupo** – Um nome único para o grupo.
3. Opcionalmente, atribua usuários ao grupo (consulte [Lista de Usuários](users-list.md) para gerenciar usuários individuais).
4. Clique em **Salvar** para criar o grupo. Ele aparece na lista imediatamente.

## Editando ou visualizando um grupo

- **Clique em qualquer lugar de uma linha** para expandir ou selecionar o grupo. As ações disponíveis dependem das suas permissões.
- Para abrir o editor completo de um grupo, clique no ícone de edição (lápis) que aparece na linha.
- Você pode alterar o nome do grupo e seus membros.

!!! warning "Excluindo grupos"
    Excluir um grupo remove todos os seus membros do grupo. Esta ação não pode ser desfeita. Exclua através do ícone de exclusão (lixeira) da linha após expandir ou selecionar a linha.

## Páginas relacionadas

- [Lista de Usuários](users-list.md) – Gerenciar contas de usuário individuais
- [Usuários](users.md) – Visão geral da administração de usuários
- [Notificações](../notifications/index.md) – Configurar notificações para grupos