---
title: Localizações
description: Gerencie localizações geográficas usadas nas métricas e formulários do Dino.
---

# Localizações

A página **Localizações** permite gerenciar as localizações geográficas referenciadas por seus formulários, casos e outras métricas. Você pode adicionar novas localizações, editar entradas existentes, importar dados em lote e exportar a lista atual.

![Visão principal da página de Localizações](../imgs/metrics/locations.png)

## O que você vê

- **Migalhas de pão** – mostra sua posição atual na navegação.
- **Pesquisa e Filtros** – pesquisa por palavra‑chave, seletor de intervalo de datas e filtros avançados configuráveis (por exemplo, por métrica, status, usuário). Você também pode salvar e carregar predefinições de filtros.
- **Tabela** – exibe por padrão Nome da Localização e Localização Pai. Colunas ocultas (ID, Data de Criação, Coordenadas, Atributos Adicionais) podem ser exibidas através do botão **Personalizar colunas** (canto inferior direito do cabeçalho da tabela).
- **Paginação** – controles para navegar entre as páginas.
- **Ações em lote** – selecione linhas usando as caixas de seleção para excluir ou editar várias localizações de uma só vez.
- **Botões de ação flutuantes** – **Adicionar Novo** (ícone de mais) e **Importar** (ícone de upload para nuvem) permanecem disponíveis enquanto você rola a página.

## Ações por linha

Cada linha possui três ações rápidas (visíveis ao passar o mouse sobre a linha):

- **Editar** – abre o diálogo da localização para modificar detalhes.
- **Excluir** – remove a localização após confirmação.
- **Visualizar** – abre um diálogo somente leitura exibindo todos os campos.

Clicar em uma linha a seleciona (destaca) e, se a lista for expansível, revela um painel de detalhes com dados adicionais.

## Trabalhando com localizações

### Adicionar uma nova localização

1. Clique no botão flutuante **Adicionar Novo** (canto inferior direito).
2. No diálogo, preencha os campos obrigatórios (por exemplo, Nome da Localização).
3. Opcionalmente, defina uma Localização Pai, Coordenadas e Atributos Adicionais.
4. Clique em **Salvar**.

### Editar uma localização

1. Clique no ícone **Editar** (lápis) na linha desejada.
2. Atualize os campos no diálogo.
3. Clique em **Salvar**.

### Excluir uma localização

1. Clique no ícone **Excluir** (lixeira) na linha.
2. Confirme a exclusão no aviso.

### Importar localizações de um arquivo

1. Clique no botão flutuante **Importar** (ícone de upload para nuvem).
2. Selecione um arquivo CSV ou Excel seguindo o formato esperado.
3. Mapeie colunas para campos de localização, se necessário.
4. Clique em **Importar**.

!!! tip "Edição em lote"
    Selecione várias linhas usando as caixas de seleção e, em seguida, clique no botão **Editar** (ícone edit_note) que aparece acima da tabela para atualizar várias localizações de uma só vez.

### Exportar a lista de localizações

1. Clique no botão **Exportar** (ícone de download para nuvem) na barra de filtros.
2. Escolha o formato de exportação (CSV ou Excel).
3. O arquivo é baixado automaticamente.

## Páginas relacionadas

- [Visão Geral das Métricas](index.md) – retorne à página inicial das métricas.
- [Casos](cases.md) – gerencie casos que referenciam localizações.
- [Organizações](organizations.md) – gerencie organizações vinculadas a localizações.
- [Projetos](projects.md) – visualize projetos associados a localizações.

!!! warning "Excluindo uma localização"
    A exclusão de uma localização pode afetar formulários e casos que a referenciam. Certifique‑se de que nenhum registro ativo dependa da localização antes de removê‑la.