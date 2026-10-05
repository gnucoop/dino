---
title: Agregação
description: Veja, filtre e gerencie todos os dados de formulários de todos os seus form schemas numa única página.
---

# Agregação

A página Agregação dá-lhe uma visualização centralizada de todos os dados de formulários dos seus form schemas. Em vez de abrir cada formulário individualmente, pode percorrer todos os dados numa única tabela, restringi-los com filtros e realizar ações como ver, editar, imprimir ou apagar.

![Vista principal da página Agregação](../imgs/aggregation/index.png)

## Ver a lista de agregação

A tabela apresenta uma linha por cada dado submetido. Por predefinição, vê as colunas **Formulários** e **Status**; utilize o botão **Colunas** acima da tabela, à direita, para escolher que colunas são apresentadas.

- Cada linha mostra um ícone de estado. Se um dado tiver problemas de validação, aparece um ícone de aviso na linha.
- Passe o cursor sobre uma linha para mostrar os ícones **Ver** e **Editar**; clique em qualquer ponto de uma linha para a selecionar e revelar todas as ações disponíveis.
- O contador **Itens encontrados** e o paginador no topo da página indicam quantos dados existem e permitem-lhe navegar entre páginas.

Se não aplicar nenhum filtro, a lista mostra todos os dados que lhe é permitido ver, com base nas suas permissões de utilizador.

## Filtro e pesquisa

1. Escreva no campo **pesquisa por palavra-chave** na barra de ferramentas para pesquisar entre os dados.
2. Clique em **Filtros** na barra de ferramentas para abrir o painel de filtros.
3. Escolha uma **Data inicial** e uma **Até à data** para filtrar por data de criação.
4. Preencha qualquer um dos filtros adicionais: **Área**, **Caso**, **Código do caso**, **Localização**, **Organização**, **Projeto**, **Estado do formulário** e **Utilizador**. Os valores apresentados dependem das métricas configuradas no seu Dino.
5. Clique em **Pesquisar** para aplicar os filtros, ou em **Repor os filtros** para os limpar.

Os filtros ativos aparecem como etiquetas por baixo da barra de ferramentas. Clique no ícone **cancelar** de uma etiqueta para remover esse filtro.

!!! tip "Sem predefinições guardadas"
    A página Agregação não suporta predefinições de filtros guardadas nem condições de filtro avançadas. Combine os filtros de cada vez que precisar de uma visualização personalizada; remover uma etiqueta é a forma mais rápida de aliviar uma pesquisa existente.

## Ações de linha

Passe o cursor sobre uma linha para mostrar os ícones **Ver** (olho) e **Editar** (lápis). Para ver todas as ações, clique na linha para a selecionar: a barra de ações acima da tabela mostra então um botão para cada ação que lhe é permitido utilizar.

| Ação | Descrição |
|--------|-------------|
| **Ver** | Abrir o dado em modo só de leitura. |
| **Editar** | Modificar os dados do formulário. |
| **Imprimir** | Gerar um PDF do dado. |
| **Deletar** | Remover o dado. |

**Imprimir** e **Deletar** pedem confirmação (*Do you want to print the selected items?*, **Sim** / **Não**) antes de serem executadas.

## Criar um novo dado

O botão **Adicionar novo formulário** na barra de ferramentas permite-lhe iniciar um novo dado. Só é apresentado se a criação de dados a partir da página Agregação estiver ativada na sua instância do Dino.

![Caixa de diálogo para escolher um form schema e iniciar um novo dado](../imgs/aggregation/index-new.png)

1. Clique em **Adicionar novo formulário**. A caixa de diálogo **Criar formulário** abre-se, listando os form schemas disponíveis.
2. Selecione o form schema que pretende utilizar.
3. Clique em **Criar formulário**. É encaminhado para a página [Editar formulário](../forms/edit-form.md), onde preenche e guarda os dados.

## Imprimir um PDF

Pode gerar um PDF de qualquer dado submetido. O PDF inclui a etiqueta do form schema, os nomes das métricas ativas e os dados que foram preenchidos.

1. Clique na linha que pretende imprimir para a selecionar e, em seguida, clique em **Imprimir** na barra de ações.
2. Confirme com **Sim**.
3. O PDF abre num novo separador do navegador ou é transferido automaticamente.

O cabeçalho do PDF inclui o título do form schema e todos os nomes das métricas atualmente ativas no sistema.

!!! warning "Disponibilidade das métricas"
    O PDF inclui apenas as métricas que estão ativas no momento em que aciona a impressão. Uma métrica adicionada depois de o dado ter sido criado não aparecerá.

## Páginas relacionadas

- [Formulários](../forms/index.md) — gerir os form schemas por trás dos seus dados.
- [Editar formulário](../forms/edit-form.md) — preencher e atualizar dados de formulários.
- [Importar dados](../forms/import.md) — trazer dados para o Dino em massa.
- [Métricas](../metrics/index.md) — configurar as métricas que alimentam os filtros e o resultado impresso.