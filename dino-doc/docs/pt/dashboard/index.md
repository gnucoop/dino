---
title: Painel
description: O painel do Dino é a sua tela inicial e oferece acesso rápido a formulários, relatórios e outros recursos.
---

# Painel

O Painel é a primeira tela que você vê após entrar no Dino. Ele funciona como o seu centro de navegação da aplicação. Dependendo da configuração do seu sistema, o Painel será exibido em um de dois layouts: um **Painel de Menu** ou um **Painel de Relatório**.

![Visão principal da página do Painel](../imgs/dashboard/index.png)

---

## Painel de Menu

Neste layout, o Painel apresenta uma grade de cartões de navegação. Cada cartão oferece acesso rápido a uma área principal da aplicação que você tem permissão para usar.

Normalmente, você verá os seguintes cartões:

*   **Formulários**: Acesse a área de [Formulários](../forms/index.md) para criar form schemas, coletar dados e revisar dados.
*   **Relatórios**: Acesse a área de [Relatórios](../reports/index.md) para criar, visualizar e gerenciar relatórios com base nos dados coletados.
*   **Métricas**: Acesse a área de [Métricas](../metrics/index.md) para gerenciar dados de referência como projetos, posições e organizações.
    !!! warning "Visibilidade"
        O cartão Métricas fica oculto se a sua conta de usuário tiver apenas permissões de convidado.
*   **Usuários**: Acesse a área da [Lista de Usuários](../administration/users-list.md) para gerenciar contas de usuário e grupos.
    !!! tip "Acesso de administrador"
        O cartão Usuários só é visível para usuários com privilégios de administrador.

Para navegar, basta clicar no cartão da área que deseja acessar.

---

## Painel de Relatório

Neste layout, o seu Painel é personalizado para exibir um único relatório que você marcou como favorito. Isso permite que você veja visualizações de dados importantes imediatamente após entrar.

Se você ainda não selecionou um relatório favorito, verá uma mensagem de boas-vindas solicitando que adicione um.

### Definindo um relatório favorito

1.  Vá para a área de [Relatórios](../reports/index.md).
2.  Abra o relatório que deseja ver no seu Painel.
3.  Na lista do relatório, clique na linha do relatório para selecioná-lo e, em seguida, clique no botão de coração (**Add to favourites**) na barra de ações. Essa opção só está disponível se os favoritos estiverem habilitados na sua instância do Dino.
4.  Atualize ou volte ao seu Painel. O relatório selecionado agora será exibido.

### Alterando ou removendo um favorito

Para alterar o seu relatório favorito, basta adicionar um relatório diferente aos seus favoritos. O novo relatório substituirá o antigo no seu Painel. Para limpar o Painel, selecione o relatório favorito na lista e clique no botão de coração preenchido para removê-lo dos seus favoritos.

!!! tip "Trabalhando com o relatório exibido"
    O relatório mostrado no seu Painel é o mesmo relatório que você abre na área de [Relatórios](../reports/index.md). Se ele contiver widgets de filtro, você também poderá usá-los aqui para restringir os dados exibidos.

## Tour guiado

Na primeira vez que você acessa o Dino, um tour guiado pode ser iniciado automaticamente a partir do Painel para apresentar as principais áreas da aplicação.

*   Siga as instruções na tela para aprender sobre a navegação e as principais ações.
*   Se você pular ou concluir o tour, poderá reiniciá-lo a qualquer momento com **Start Dino Tour** na aba **Tutoriais** da [Área do usuário](../user-area/index.md). A aba só é exibida quando o tour guiado está configurado para a sua instância do Dino.