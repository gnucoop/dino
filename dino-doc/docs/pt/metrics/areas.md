---
title: Gerenciando Valores de Métricas – Áreas Temáticas
description: Aprenda a visualizar, adicionar, editar, excluir e pesquisar áreas temáticas na seção de gerenciamento de métricas do Dino.
---

# Gerenciando Valores de Métricas – Áreas Temáticas

A página **Áreas Temáticas** (acessível a partir da seção Métricas) permite organizar seus dados de métricas por categorias hierárquicas. Aqui você pode visualizar, criar, editar e excluir áreas temáticas, além de filtrar e exportar a lista.

![Visão principal da página de Áreas Temáticas](../imgs/metrics/areas.png)

## O Que Você Vê

- A **trilha de navegação** no topo mostra sua localização atual no aplicativo (por exemplo, **Métricas > Áreas Temáticas**).
- A tabela principal lista todas as áreas temáticas, exibindo colunas como **Nome da Área**, **Área Pai** e (se configurado) outros atributos. Você pode personalizar as colunas visíveis clicando no ícone **view_week** no cabeçalho.
- Uma **barra de pesquisa** e um **painel de filtros** permitem encontrar áreas por palavra-chave, intervalo de datas ou outros metadados.
- O botão **Exportar** (cloud_download) permite baixar a lista atual como um arquivo.
- Dois botões de ação flutuantes estão disponíveis:
    - **+ (Adicionar Novo)** – cria uma nova área temática.
    - **cloud_upload** – importa áreas de um arquivo externo.

## Trabalhando com Áreas Temáticas

### Adicionando uma Nova Área Temática

1. Clique no botão flutuante **+**.
2. Na caixa de diálogo que abrir, preencha os campos obrigatórios (por exemplo, **Nome da Área**, **Área Pai**).
3. Clique em **Criar** para salvar a nova área.

!!! tip "Área Pai"
    Para criar uma subárea, selecione uma **Área Pai** no menu suspenso. Se deixado em branco, a nova área se torna uma entrada de nível superior.

### Editando uma Área Existente

1. Encontre a área que deseja alterar na tabela.
2. Clique no ícone **edit** (lápis) na coluna de ações da linha.
3. Modifique os campos na caixa de diálogo e clique em **Salvar**.

### Visualizando Detalhes

- Clique no ícone **visibility** para abrir uma caixa de diálogo somente leitura mostrando todos os campos da área.
- Você também pode **clicar em uma linha** para expandi-la e revelar quaisquer áreas filhas (se a hierarquia estiver configurada).

### Excluindo uma Área

1. Clique no ícone **delete** (lixeira) na coluna de ações da linha.
2. Confirme a exclusão na caixa de diálogo que aparecer.

!!! warning "Considerações sobre Exclusão"
    Excluir uma área pai pode afetar as áreas filhas. O Dino avisará se houver itens associados. Prossiga com cautela.

## Pesquisando e Filtrando

- Use o campo de **pesquisa por palavra-chave** no topo da lista para filtrar áreas por nome.
- Abra o painel de filtros clicando na seta **expand**. Você pode definir:
    - **De data / Até data** – filtrar pela data de criação.
    - **Filtros adicionais** (por exemplo, campos específicos de métricas) – se sua instância tiver atributos personalizados.
- Aplique uma **predefinição de filtro** (se disponível) para carregar rapidamente combinações de filtros salvas.

## Exportando a Lista

1. Clique no botão **cloud_download** na barra de ferramentas.
2. Escolha o formato de exportação (por exemplo, CSV, Excel).
3. O arquivo será gerado com o conjunto de áreas atualmente visível (filtrado).

## Ações em Massa

Para executar ações em várias áreas de uma vez (por exemplo, excluir várias), selecione as caixas de seleção ao lado das linhas. Os botões de ações em massa aparecerão no cabeçalho da coluna. Atualmente, a tela de Áreas Temáticas suporta **exclusão em massa**.

## Navegando com a Trilha de Navegação

A trilha de navegação mostra sua localização atual (por exemplo, **Métricas > Áreas Temáticas**). Clique em qualquer link da trilha para pular para um nível superior.

## Páginas Relacionadas

- [Visão Geral de Métricas](index.md)
- [Gerenciando Valores de Métricas – Casos](cases.md)
- [Gerenciando Valores de Métricas – Localizações](locations.md)
- [Gerenciando Valores de Métricas – Organizações](organizations.md)
- [Gerenciando Valores de Métricas – Projetos](projects.md)
- [Usuários e Grupos](../administration/users.md)