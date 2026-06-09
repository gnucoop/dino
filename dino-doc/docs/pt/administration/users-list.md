---
title: Lista de Usuários
description: Visualize, edite e gerencie contas de usuários na sua organização Dino.
---

# Lista de Usuários

A página Lista de Usuários exibe uma lista completa de todas as contas de usuários da sua organização Dino. A partir daqui, você pode visualizar detalhes dos usuários, editar contas e criar novos usuários.

![Visualização principal da página Lista de Usuários](../imgs/administration/users-list.png)

## Entendendo a Lista de Usuários

A lista principal mostra as principais informações de cada usuário:
*   **E-mail:** O endereço de e-mail de login do usuário.
*   **Nome Completo:** O nome associado à conta.
*   **Desabilitado:** Um botão de alternância que indica se a conta está ativa ou desativada. Você pode clicar nesse botão diretamente na lista para alterar o status.

Você pode ordenar a lista pela coluna **Data de Criação**. A coluna **ID** fica oculta por padrão.

## Trabalhando com a Lista

### Pesquisar e Filtrar

Use a barra de pesquisa no topo da página para encontrar usuários pelo e-mail ou nome completo.

Para aplicar filtros mais específicos:
1.  Clique no ícone de filtro na barra de pesquisa.
2.  Na seção **Grupos de Permissão de Usuário**, você pode selecionar um ou mais grupos de usuários para filtrar a lista e exibir apenas os membros desses grupos.

### Ações do Usuário

Cada linha de usuário possui um menu de ações (três pontos verticais) no lado direito. Clique nele para acessar as seguintes opções:

*   **Editar:** Abre o editor de usuário para modificar os detalhes da conta.
*   **Excluir:** Remove permanentemente a conta de usuário. Será solicitada a confirmação desta ação.
*   **Visualizar:** Abre uma visualização somente leitura dos detalhes do usuário.

Você também pode clicar em qualquer lugar da linha de um usuário para selecioná-la, ou clicar no ícone de expandir para visualizar um resumo das informações do usuário diretamente na lista.

## Criando um Novo Usuário

Para adicionar um novo usuário à sua organização:

1.  Clique no botão flutuante azul **+** no canto inferior direito da tela.
2.  Um formulário será aberto. Insira os detalhes do novo usuário, incluindo e-mail, nome e atribua-o aos grupos de usuários apropriados. Para mais informações sobre grupos, consulte [Lista de Grupos](groups-list.md).
3.  Clique em **Salvar** para criar a conta. O novo usuário receberá um e-mail com instruções para definir sua senha.

!!! warning "Restrição Offline"
    O botão **+** ficará desabilitado (exibindo um ícone de Wi-Fi desligado) se você não estiver conectado à internet. Não é possível criar novas contas de usuário enquanto estiver offline. Você ainda pode visualizar e editar usuários existentes offline.

## Editando um Usuário

Para modificar as informações de um usuário existente:

1.  Clique no menu de ações (três pontos) na linha do usuário.
2.  Selecione **Editar**.
3.  No editor, atualize qualquer detalhe do usuário ou atribuições de grupo.
4.  Clique em **Salvar** para aplicar as alterações.

!!! tip "Desabilitar Rápido"
    Você pode ativar ou desativar rapidamente a capacidade de login de um usuário clicando no botão de alternância **Desabilitado** diretamente na lista, sem abrir o editor completo.