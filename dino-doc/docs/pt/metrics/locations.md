---
title: Localizações
description: Gerencie as localizações geográficas usadas nas métricas e nos formulários do Dino.
---

# Localizações

A página **Localizações** permite gerenciar as localizações geográficas referenciadas pelos seus formulários, casos e outras métricas. Você pode adicionar novas localizações, editar entradas existentes, importar dados em massa e exportar a lista atual.

![Main view of the Locations page](../imgs/metrics/locations.png)

## O que você vê

- **Trilha de navegação** – mostra sua posição atual na navegação.
- **Pesquisa e filtros** – pesquisa por palavra-chave, seletor de intervalo de datas e filtros avançados configuráveis (por exemplo, por métrica, status, usuário). Você também pode salvar e carregar predefinições de filtro.
- **Tabela** – exibe Nome da Localização e Localização Pai por padrão. Colunas ocultas (ID, Data de Criação, Coordenadas, Atributos Adicionais) podem ser exibidas pelo botão **Personalizar colunas** (canto inferior direito do cabeçalho da tabela).
- **Paginação** – controles para navegar entre as páginas.
- **Ações em massa** – selecione linhas usando caixas de seleção para excluir ou editar várias localizações de uma vez.
- **Botões de ação flutuantes** – **Adicionar Novo** (ícone de adição) e **Importar** (ícone de upload de nuvem) permanecem disponíveis enquanto você rola a página.

## Ações nas linhas

Cada linha tem três ações rápidas (visíveis ao passar o mouse sobre a linha):

- **Editar** – abre a caixa de diálogo de localização para modificar os detalhes.
- **Excluir** – remove a localização após confirmação.
- **Visualizar** – abre uma caixa de diálogo somente leitura mostrando todos os campos.

Clicar em uma linha a seleciona (destaca) e, se a lista for expansível, revela um painel de detalhes com dados adicionais.

## Trabalhando com localizações

### Adicionar uma nova localização

1. Clique no botão flutuante **Adicionar Novo** (canto inferior direito).
2. Na caixa de diálogo, preencha os campos obrigatórios (por exemplo, Nome da Localização).
3. Opcionalmente, defina Localização Pai, Coordenadas e Atributos Adicionais.
4. Clique em **Salvar**.

### Editar uma localização

1. Clique no ícone **Editar** (lápis) na linha desejada.
2. Atualize os campos na caixa de diálogo.
3. Clique em **Salvar**.

### Excluir uma localização

1. Clique no ícone **Excluir** (lixeira) na linha.
2. Confirme a exclusão na caixa de diálogo.

### Importar localizações de um arquivo

1. Clique no botão flutuante **Importar** (ícone de upload de nuvem).
2. Selecione um arquivo CSV ou Excel seguindo o formato esperado.
3. Mapeie as colunas para os campos de localização, se necessário.
4. Clique em **Importar**.

!!! tip "Edição em massa"
    Selecione várias linhas usando as caixas de seleção e clique no botão **Editar** (ícone edit_note) que aparece acima da tabela para atualizar várias localizações de uma só vez.

### Exportar a lista de localizações

1. Clique no botão **Exportar** (ícone de download de nuvem) na barra de filtros.
2. Escolha o formato de exportação (CSV ou Excel).
3. O arquivo é baixado automaticamente.

## Páginas relacionadas

- [Visão geral das métricas](index.md) – retorne à página inicial das métricas.
- [Casos](cases.md) – gerencie casos que referenciam localizações.
- [Organizações](organizations.md) – gerencie organizações vinculadas a localizações.
- [Projetos](projects.md) – visualize projetos associados a localizações.

!!! warning "Excluindo uma localização"
    Excluir uma localização pode afetar formulários e casos que a referenciam. Certifique-se de que nenhum registro ativo dependa da localização antes de removê-la.