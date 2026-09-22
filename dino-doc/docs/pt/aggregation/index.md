---
title: Agregação
description: Visualize e gerencie dados de formulários agregados no Dino.
---

# Agregação

A página Agregação oferece uma visualização centralizada de todos os dados enviados pelos form schema. Você pode navegar, filtrar e executar ações sobre os dados dos formulários sem precisar abrir cada formulário individualmente.

![Visualização principal da página Agregação](../imgs/aggregation/index.png)

## Visualizando a lista de agregação

A tabela principal exibe uma linha por dado enviado. Por padrão, você vê as colunas **Form Schema** e **Status**, mas pode personalizar quais colunas aparecem usando o ícone **View Columns** no cabeçalho da tabela.

- Cada linha mostra um ícone de status e, se o formulário tiver problemas de validação, um ícone de aviso.
- Passe o mouse sobre uma linha para ver um destaque; clique em qualquer lugar de uma linha para selecioná-la e revelar as ações disponíveis.

No topo da lista, o contador **Items found** e o paginador informam quantos dados existem e permitem navegar entre as páginas.

Se você não aplicar nenhum filtro à lista na página Agregação, verá o número total de formulários enviados ao seu Dino que você tem permissão para ver, de acordo com as permissões do seu usuário.

## Filtro e pesquisa

Uma barra de pesquisa e um painel de filtros estão disponíveis para restringir a lista.

1. Clique no **ícone de pesquisa** na barra superior para expandir o painel de filtros.
2. Use o campo **keyword** para pesquisar em todos os campos.
3. Use os seletores de **intervalo de datas** para filtrar por data de criação.
4. Filtros adicionais aparecem para **Area**, **Case**, **Location**, **Organization**, **Project**, **Form Status** e **User**. Eles são dinâmicos e respeitam as definições de métricas do seu formulário.
5. Os filtros ativos são exibidos como chips abaixo da barra de filtros – clique no **ícone de cancelar** em um chip para removê-lo.

!!! tip "Filtros predefinidos"
    A página Agregação não oferece suporte a filtros predefinidos salvos. Você pode combinar filtros sempre que precisar de uma visualização personalizada.

## Ações de linha

Após selecionar uma linha, os ícones de ação aparecem na coluna **Actions** no lado direito da tabela.

| Ícone | Ação | Descrição |
|------|--------|-------------|
| `view` | Visualizar | Abrir o dado em modo somente leitura. |
| `edit` | Editar | Modificar os dados do formulário. |
| `print` | Imprimir | Gerar um PDF do dado. |
| `delete` | Excluir | Remover o dado após confirmação. |

Clique em **More Horiz** (três pontos) para ver ações adicionais para essa linha. As ações **Print** e **Delete** pedem confirmação antes de serem executadas.

## Criando um novo dado

O botão flutuante **+** no canto inferior direito da tela permite iniciar um novo preenchimento.

![Diálogo para escolher um form schema e iniciar um novo preenchimento](../imgs/aggregation/index-new.png)

1. Clique no botão **+**. Um diálogo é aberto mostrando os form schema disponíveis.
2. Selecione ou pesquise o form schema que deseja usar.
3. Após a seleção, você é levado diretamente à página [Edit Form](../forms/edit-form.md) para preencher os dados.

## Imprimindo um PDF

Você pode gerar um PDF de qualquer dado que inclua o rótulo do form schema, os nomes das métricas ativas e os dados preenchidos.

1. Na linha que deseja imprimir, clique no ícone **Printer** (ou use o menu **More Horiz**, se disponível).
2. Confirme a ação quando solicitado.
3. O PDF abre em uma nova aba do navegador ou é baixado automaticamente.

O cabeçalho do PDF inclui o título do form schema e todos os nomes de métricas ativos no sistema no momento.

!!! warning "Disponibilidade de métricas"
    O PDF impresso inclui apenas as métricas que estão ativas no momento em que você dispara a impressão. Se uma métrica foi adicionada depois que o dado foi criado, ela não aparecerá.