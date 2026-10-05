---
title: Lista de usuários
description: Visualize, edite e gerencie contas de usuário na sua organização Dino.
---

# Lista de usuários

A página Lista de usuários fornece uma lista completa de todas as contas de usuário na sua organização Dino. A partir daqui, você pode visualizar detalhes dos usuários, editar contas e criar novos usuários.

![Visualização principal da página Lista de usuários](../imgs/administration/users-list.png)

## Entendendo a Lista de usuários

A lista principal exibe informações importantes de cada usuário:

*   **Email:** O endereço de email de login do usuário.
*   **Nome completo:** O nome associado à conta.
*   **Desativado:** Um botão de alternância que indica se a conta está ativa ou desativada. Você pode clicar nesse botão diretamente na lista para alterar o status.

Você pode ordenar a lista pelas colunas **Email**, **Nome completo** ou **Data de criação**. As colunas **ID** e **Data de criação** ficam ocultas por padrão. Para mostrar ou ocultar colunas, clique no botão **Colunas** acima da lista, à direita, e selecione as que deseja exibir.

## Trabalhando com a Lista

### Pesquisa e filtro

Use a barra de pesquisa na parte superior da página para encontrar usuários pelo email ou nome completo.

Para aplicar filtros mais específicos:

1.  Clique no botão **Filtros** na barra de pesquisa.
2.  Defina uma **Data inicial** e uma **Até à data** para filtrar por data de criação, e selecione um ou mais grupos de usuários para restringir a lista aos membros desses grupos.
3.  Clique em **Pesquisar** para aplicar os filtros, ou em **Repor os filtros** para limpá-los.

Os filtros aplicados aparecem como chips abaixo da barra de pesquisa. Clique no ícone **cancelar** em um chip para remover esse filtro.

### Ações do usuário

Passe o mouse sobre a linha de um usuário para mostrar os ícones **Editar** e **Ver**. Clique em qualquer lugar da linha para selecioná-la: a barra de ações acima da lista então mostra todas as ações que você pode executar no usuário selecionado:

*   **Editar:** Abrir o editor de usuário para modificar os detalhes da conta.
*   **Ver:** Abrir uma visualização somente leitura dos detalhes do usuário.
*   **Excluir:** Remover permanentemente a conta do usuário. Será solicitado que você confirme esta ação.

## Criando um novo usuário

Para adicionar um novo usuário à sua organização:

1.  Clique no botão **Adicionar novo usuário** na barra de ferramentas acima da lista.
2.  Um formulário será aberto. Insira o **Nome completo** e o **Email** do novo usuário, e atribua-o aos grupos apropriados em **Grupos de permissão do usuário**. Para mais informações sobre grupos, consulte [Lista de grupos](groups-list.md).
    Dependendo de como o seu Dino autentica os usuários, o formulário também pode solicitar uma **Senha** e **Confirme sua senha**, com pelo menos 9 caracteres.
3.  Clique em **Salvar** para criar a conta.

O botão **Salvar** permanece indisponível até que todos os campos obrigatórios sejam preenchidos corretamente.

!!! tip "Modos de visualização e edição"
    O mesmo formulário é usado para criar, editar e visualizar usuários. No modo **Ver**, todos os campos são somente leitura e apenas o botão **Fechar** é exibido.

## Editando um usuário

Para modificar as informações de um usuário existente:

1.  Passe o mouse sobre a linha do usuário e clique no ícone **Editar**, ou selecione a linha e clique em **Editar** na barra de ações.
2.  No editor, atualize o nome completo do usuário ou as atribuições de grupo. O endereço de email não pode ser alterado aqui.
3.  Clique em **Salvar** para aplicar as alterações.

!!! tip "Desativação rápida"
    Você pode ativar ou desativar rapidamente a capacidade de um usuário fazer login clicando no botão **Desativado** diretamente na lista, sem abrir o editor completo.

## Páginas relacionadas

*   [Usuários](users.md)
*   [Lista de grupos](groups-list.md)