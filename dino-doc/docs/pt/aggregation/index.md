---
title: Agregação
description: Visualize e gerencie submissões de formulários agregadas no Dino.
---

# Agregação

A página de Agregação oferece uma visão centralizada de todas as submissões de formulários em seus projetos. Você pode navegar, filtrar e realizar ações nas submissões sem precisar abrir cada formulário individualmente.

![Visão principal da página de Agregação](../imgs/aggregation/index.png)

## Visualizando a Lista de Agregação

A tabela principal exibe uma linha por submissão. Por padrão, você vê as colunas **Esquema do Formulário** e **Status**, mas pode personalizar quais colunas aparecem usando o ícone **Ver Semana** no cabeçalho da tabela.

- Cada linha mostra um ícone de status e, se o formulário tiver problemas de validação, um ícone de aviso.
- Passe o mouse sobre uma linha para destacá-la; clique em qualquer lugar da linha para selecioná-la e revelar as ações disponíveis.

No topo da lista, o contador **Itens encontrados** e o paginador informam quantas submissões existem e permitem navegar pelas páginas.

## Filtrando e Pesquisando

Uma barra de pesquisa e um painel de filtros estão disponíveis para restringir a lista.

1. Clique no **ícone de pesquisa** na barra superior para expandir o painel de filtros.
2. Use o campo **palavra-chave** para pesquisar em todos os campos.
3. Use os seletores de **intervalo de datas** para filtrar por data de criação.
4. Filtros adicionais aparecem para **Área**, **Caso**, **Localização**, **Organização**, **Projeto**, **Status do Formulário** e **Usuário**. Eles são dinâmicos e respeitam as definições de métricas do seu formulário.
5. Os filtros ativos são exibidos como chips abaixo da barra de filtros – clique no **ícone de cancelar** em um chip para removê-lo.

!!! tip "Filtros predefinidos"
    A página de Agregação não oferece suporte a predefinições de filtros salvos. Você pode combinar filtros sempre que precisar de uma visualização personalizada.

## Ações nas Linhas

Após selecionar uma linha, os ícones de ação aparecem na coluna **Ações** no lado direito da tabela.

| Ícone | Ação | Descrição |
|------|------|-----------|
| `visibility` | Visualizar | Abre a submissão no modo somente leitura. |
| `create` | Editar | Modifica os dados da submissão. |
| `printer` | Imprimir | Gera um PDF da submissão. |
| `delete` | Excluir | Remove a submissão após confirmação. |

Clique em **Mais Vertical** (três pontos) para ver ações adicionais para essa linha. As ações **Imprimir** e **Excluir** pedem confirmação antes de executar.

## Criando uma Nova Submissão

O botão flutuante **+** no canto inferior direito da tela permite iniciar uma nova submissão.

![Diálogo para escolher um esquema de formulário e iniciar uma nova submissão](../imgs/aggregation/index-new.png)

1. Clique no botão **+**. Um diálogo é aberto mostrando os esquemas de formulário disponíveis.
2. Selecione ou pesquise o esquema de formulário que deseja usar.
3. Após a seleção, você é levado diretamente para a página [Editar Formulário](../forms/edit-form.md) para preencher os dados.

## Imprimindo um PDF

Você pode gerar um PDF de qualquer submissão que inclua o rótulo do esquema do formulário, os nomes das métricas ativas e os dados preenchidos.

1. Na linha que deseja imprimir, clique no ícone **Impressora** (ou use o menu **Mais Vertical**, se disponível).
2. Confirme a ação quando solicitado.
3. O PDF é aberto em uma nova aba do navegador ou baixado automaticamente.

O cabeçalho do PDF inclui o título do esquema do formulário e todos os nomes das métricas atualmente ativas no sistema.

!!! warning "Disponibilidade das métricas"
    O PDF impresso inclui apenas as métricas que estão ativas no momento em que você aciona a impressão. Se uma métrica foi adicionada após a criação da submissão, ela não aparecerá.
