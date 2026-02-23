---
title: Agregação
description: Como usar a visualização de Agregação no Dino para navegar e gerenciar envios de formulários de múltiplos esquemas de formulário em uma única lista.
---

# Agregação

A página de Agregação fornece uma visualização unificada de todos os envios de formulários em sua organização. Em vez de visualizar os envios de um esquema de formulário por vez, você pode ver entradas de múltiplos esquemas juntas em uma única lista filtrável.

![Agregação](../imgs/aggregation/index.png)

## Navegando na Lista

A lista exibe todos os envios que você tem permissão para visualizar. Cada linha representa um único envio. As seguintes colunas são mostradas por padrão:

*   **Esquema do Formulário**: O nome do esquema de formulário ao qual este envio pertence.
*   **Status**: O status atual do fluxo de trabalho do envio.
*   Colunas adicionais para métricas como **Projeto**, **Localização** ou **Organização** também podem aparecer, dependendo da configuração do seu sistema.

Você pode clicar em qualquer linha para selecioná-la ou expandi-la para ver mais detalhes.

## Filtrando a Lista

Uma barra de filtros está localizada acima da lista. Use-a para restringir os envios mostrados. Você pode filtrar por:

*   Projeto
*   Localização
*   Área
*   Caso
*   Código do Caso
*   Organização
*   Status do Formulário
*   Usuário

!!! tip "Dicas de Filtragem"
    A barra de filtros da Agregação é projetada para filtragem rápida e entre esquemas. Para recursos avançados como predefinições de filtros salvas ou exportação de dados, navegue até a lista de envios de um esquema de formulário específico.

## Ações na Linha

Quando você passa o mouse sobre uma linha, um conjunto de ícones de ação aparece à direita. As ações disponíveis para um envio específico dependem de suas permissões para o seu esquema de formulário.

*   **Visualizar** (![ícone de olho]()): Abre o envio em uma visualização somente leitura.
*   **Editar** (![ícone de lápis]()): Abre o envio para edição.
*   **Imprimir** (![ícone de impressora]()): Gera e abre uma versão em PDF do envio. Você será solicitado a confirmar antes que o PDF seja criado.
*   **Excluir** (![ícone de exclusão]()): Exclui permanentemente o envio. Você será solicitado a confirmar esta ação.

## Criando um Novo Envio

Você pode iniciar um novo envio de formulário diretamente da página de Agregação.

1.  Clique no botão **+** (Adicionar) no canto inferior direito da tela.
2.  Uma caixa de diálogo é aberta, mostrando uma lista de esquemas de formulário para os quais você tem permissão para criar envios.
3.  Selecione o esquema de formulário desejado na lista.
4.  Clique em **Criar Formulário**. Você será levado ao formulário para começar a preenchê-lo.