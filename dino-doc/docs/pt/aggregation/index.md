---
title: Agregação
description: Veja e gerencie submissões de formulários agregadas no Dino.
---

# Agregação

A página Agregação fornece uma visão centralizada de todas as submissões de formulários nos seus esquemas de formulário. Você pode navegar, filtrar e agir sobre as submissões sem precisar abrir cada formulário individualmente.

![Main view of the Aggregation page](../imgs/aggregation/index.png)

## Visualizar a Lista de Agregação

A tabela principal exibe uma linha por submissão. Por padrão, você vê as colunas **Esquema do Formulário** e **Estado**, mas pode personalizar quais colunas aparecem usando o ícone **Ver Colunas** no cabeçalho da tabela.

- Cada linha mostra um ícone de estado e, se o formulário tiver problemas de validação, um ícone de aviso.
- Passe o cursor sobre uma linha para vê-la destacada; clique em qualquer lugar da linha para selecioná-la e revelar as ações disponíveis.

No topo da lista, o contador **Itens encontrados** e o paginador mostram quantas submissões existem e permitem navegar pelas páginas.

Se você não aplicar nenhum filtro à lista da página Agregação, verá o número total de formulários submetidos ao seu Dino que você tem permissão de ver, de acordo com as permissões do seu usuário.

## Filtrar e Pesquisar

Uma barra de pesquisa e um painel de filtros estão disponíveis para restringir a lista.

1. Clique no ícone de **pesquisa** na barra superior para expandir o painel de filtros.
2. Use o campo de **palavra-chave** para pesquisar em todos os campos.
3. Use os seletores de **intervalo de datas** para filtrar pela data de criação.
4. Filtros adicionais aparecem para **Área**, **Caso**, **Localização**, **Organização**, **Projeto**, **Estado do Formulário** e **Usuário**. Eles são dinâmicos e respeitam as definições de métricas do seu formulário.
5. Os filtros ativos são exibidos como etiquetas abaixo da barra de filtros — clique no ícone **cancelar** em uma etiqueta para removê-la.

!!! tip "Filtros predefinidos"
    A página Agregação não suporta filtros predefinidos salvos. Você pode combinar filtros sempre que precisar de uma visualização personalizada.

## Ações nas Linhas

Depois de selecionar uma linha, os ícones de ação aparecem na coluna **Ações**, no lado direito da tabela.

| Ícone | Ação | Descrição |
|------|--------|-------------|
| `view` | Ver | Abre a submissão em modo somente leitura. |
| `edit` | Editar | Modifica os dados da submissão. |
| `print` | Imprimir | Gera um PDF da submissão. |
| `delete` | Excluir | Remove a submissão após confirmação. |

Clique em **Mais** (três pontos) para ver ações adicionais para essa linha. As ações **Imprimir** e **Excluir** pedem confirmação antes de serem executadas.

## Criar uma Nova Submissão

O botão flutuante **+**, no canto inferior direito da tela, permite iniciar uma nova submissão.

![Dialog to choose a form schema and start a new submission](../imgs/aggregation/index-new.png)

1. Clique no botão **+**. Uma caixa de diálogo é aberta mostrando os esquemas de formulário disponíveis.
2. Selecione ou pesquise o esquema de formulário que deseja usar.
3. Após a seleção, você é levado diretamente para a página [Editar Formulário](../forms/edit-form.md) para preencher os dados.

## Imprimir um PDF

Você pode gerar um PDF de qualquer submissão que inclua o rótulo do esquema de formulário, os nomes das métricas ativas e os dados preenchidos.

1. Na linha que deseja imprimir, clique no ícone de **Impressora** (ou use o menu **Mais**, se disponível).
2. Confirme a ação quando solicitado.
3. O PDF abre em uma nova guia do navegador ou é baixado automaticamente.

O cabeçalho do PDF inclui o título do esquema de formulário e todos os nomes de métricas ativos no sistema.

!!! warning "Disponibilidade das métricas"
    O PDF impresso inclui apenas as métricas que estão ativas no momento em que você aciona a impressão. Se uma métrica foi adicionada após a criação da submissão, ela não aparecerá.