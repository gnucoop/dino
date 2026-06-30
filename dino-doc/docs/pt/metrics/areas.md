---
title: Gerenciando Valores de Métricas – Áreas Temáticas
description: Aprenda a visualizar, adicionar, editar, excluir e pesquisar áreas temáticas na seção de gerenciamento de métricas do Dino.
---

# Gerenciando Valores de Métricas – Áreas Temáticas

A página **Áreas Temáticas** (acessível a partir da seção Métricas) permite organizar seus dados de métricas em categorias hierárquicas. Aqui você pode visualizar, criar, editar e excluir áreas temáticas, além de filtrar e exportar a lista.

![Visão principal da página Gerenciando Valores de Métricas](../imgs/metrics/areas.png)

## O que você vê

- **Breadcrumbs** no topo mostram sua localização atual no aplicativo.
- A tabela principal lista todas as áreas temáticas, exibindo colunas como **Nome da Área**, **Área Pai** e (se configurado) outros atributos. Você pode personalizar as colunas visíveis clicando no ícone **view_week** no cabeçalho.
- Uma **barra de pesquisa** e **painel de filtro** permitem encontrar áreas por palavra-chave, intervalo de datas ou outros metadados.
- O botão **Exportar** (cloud_download) permite baixar a lista atual como um arquivo.
- Dois botões de ação flutuante estão disponíveis:
    - **+ (Adicionar Novo)** – cria uma nova área temática.
    - **cloud_upload** – importa áreas de um arquivo externo.

## Trabalhando com Áreas Temáticas

### Adicionando uma Nova Área Temática

1. Clique no botão flutuante **+**.
2. No diálogo que se abre, preencha os campos obrigatórios (ex.: **Nome da Área**, **Área Pai**).
3. Clique em **Criar** para salvar a nova área.

!!! tip "Área Pai"
    Para criar uma subárea, selecione uma **Área Pai** no menu suspenso. Se deixado em branco, a nova área se torna um item de nível superior.

### Editando uma Área Existente

1. Localize a área que deseja alterar na tabela.
2. Clique no ícone **edit** (lápis) na coluna de ações da linha.
3. Modifique os campos no diálogo e clique em **Salvar**.

### Visualizando Detalhes

- Clique no ícone **visibility** para abrir um diálogo somente leitura mostrando todos os campos da área.
- Você também pode **clicar em uma linha** para expandi-la e revelar áreas filhas (se a hierarquia estiver configurada).

### Excluindo uma Área

1. Clique no ícone **delete** (lixeira) na coluna de ações da linha.
2. Confirme a exclusão no diálogo que aparece.

!!! warning "Considerações sobre Exclusão"
    Excluir uma área pai pode afetar áreas filhas. O Dino avisará se houver itens associados. Prossiga com cuidado.

## Pesquisa e Filtragem

- Use o campo de **pesquisa por palavra-chave** no topo da lista para filtrar áreas pelo nome.
- Abra o painel de filtro clicando na seta **expand**. Você pode definir:
    - **Data de / Data até** – filtrar pela data de criação.
    - **Filtros adicionais** (ex.: campos específicos de métricas) – se sua instância tiver atributos personalizados.
- Aplique um **preset de filtro** (se disponível) para carregar rapidamente combinações de filtro salvas.

## Exportando a Lista

1. Clique no botão **cloud_download** na barra de ferramentas.
2. Escolha o formato de exportação (ex.: CSV, Excel).
3. O arquivo será gerado com o conjunto atual (filtrado) de áreas.

## Ações em Lote

Para realizar ações em várias áreas ao mesmo tempo (ex.: excluir várias), selecione as caixas de seleção ao lado das linhas. Os botões de ação em lote aparecerão no cabeçalho da coluna. Atualmente, a tela de Áreas Temáticas suporta **exclusão em lote**.

## Navegando com Breadcrumbs

Os breadcrumbs mostram sua localização atual (ex.: **Métricas > Áreas Temáticas**). Clique em qualquer link do breadcrumb para pular para um nível superior.

## Páginas Relacionadas

- [Visão Geral de Métricas](index.md)
- [Gerenciando Valores de Métricas – Casos, Locais, Organizações e Projetos](areas.md) (esta página)
- [Usuários e Grupos](../administration/users.md)
