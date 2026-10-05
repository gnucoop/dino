---
title: Localizações
description: Gerenciar localizações geográficas usadas nas métricas e nos form do Dino.
---

# Localizações

A página **Localizações** permite gerenciar as localizações geográficas referenciadas pelos seus form, casos e outras métricas. Você pode adicionar novas localizações, editar entradas existentes, importar dados em massa e exportar a lista atual.

![Visualização principal da página Localizações](../imgs/metrics/locations.png)

## O que você vê

- **Percorso di navigazione** – mostra sua posição atual na navegação.
- **Busca e Filtros** – um campo de busca por palavra-chave e o botão **Filtros** para filtrar por data de criação (**Data inicial** / **Até à data**).
- **Contador de itens encontrados** – mostra quantas localizações correspondem aos filtros atuais.
- **tabela** – exibe Nome da Localização e Localização Pai por padrão. As colunas ocultas (ID, Data de Criação, Coordenadas, Atributos Adicionais) podem ser exibidas pelo botão **Colunas**, acima da tabela, à direita.
- **Paginação** – controles para navegar entre as páginas.
- **Ações em massa** – selecione linhas usando as caixas de seleção para deletar várias localizações de uma vez.
- **Botões da barra de ferramentas** – **Adicionar nova LOCALIZAÇÃO** (ícone de mais) e **Importar LOCALIZAÇÃO** (ícone de upload na nuvem) ficam acima da tabela.

## Ações da linha

Passe o mouse sobre uma linha para exibir os ícones **Editar** e **Ver**. Clique na linha para selecioná-la e destacá-la: a barra de ações acima da tabela mostra então todas as ações:

- **Editar** – abre a caixa de diálogo da localização para modificar os detalhes.
- **Deletar** – remove a localização após confirmação.
- **Ver** – abre uma caixa de diálogo somente leitura exibindo todos os campos.

## Trabalhando com localizações

### Adicionar uma nova localização

1. Clique no botão **Adicionar nova LOCALIZAÇÃO** acima da tabela.
2. Na caixa de diálogo, preencha os campos obrigatórios (por exemplo, Nome da Localização). Os campos opcionais estão marcados como *(opcional)*.
3. Opcionalmente, defina uma Localização Pai, Coordenadas e Atributos Adicionais.
4. Clique em **Salvar**.

### Editar uma localização

1. Passe o mouse sobre a linha e clique no ícone **Editar** (lápis), ou selecione a linha e clique em **Editar** na barra de ações.
2. Atualize os campos na caixa de diálogo.
3. Clique em **Salvar**.

### Deletar uma localização

1. Clique na linha para selecioná-la e, em seguida, clique em **Deletar** na barra de ações acima da tabela.
2. Confirme a exclusão na janela de confirmação.

Uma localização que é usada por form, ou que possui localizações filhas, não pode ser deletada; consulte [Métricas](index.md).

### Importar localizações de um arquivo

1. Clique no botão **Importar LOCALIZAÇÃO** acima da tabela.
2. Envie um arquivo `.xls`, `.xlsx` ou `.csv`.
3. Mapeie as colunas do arquivo para os campos da localização.
4. Clique em **Aplicar importação** e revise o resultado.

Localizações cujo nome já existe são reutilizadas, não atualizadas.

### Exportar a lista de localizações

1. Clique em **Exportar** na barra de ferramentas.
2. Escolha o que exportar: *Itens da página* (o padrão), os itens que correspondem aos seus filtros, ou *Todos os itens*.
3. Escolha o formato: *csv*, *xlsx* ou *splitted xlsx* e, em seguida, clique em **Exportar**.

!!! tip "Exclusão em massa"
    Selecione várias linhas usando as caixas de seleção e, em seguida, clique em **Deletar** na barra de ações acima da tabela para deletar várias localizações de uma vez.

### Coordenadas da localização

Se você definir o atributo **Coordenadas** para uma localização, essa informação é usada para visualizar os dados do seu form em um [mapa](../forms/forms-map.md).

## Páginas relacionadas

- [Visão Geral das Métricas](index.md) – voltar à página inicial das métricas.
- [Casos](cases.md) – gerenciar casos que referenciam localizações.
- [Organizações](organizations.md) – gerenciar organizações vinculadas a localizações.
- [Projetos](projects.md) – visualizar projetos associados a localizações.