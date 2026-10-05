---
title: Gerenciando valores de métricas – Áreas temáticas
description: Aprenda como visualizar, adicionar, editar, deletar e pesquisar áreas temáticas na seção de gerenciamento de métricas do Dino.
---

# Gerenciando valores de métricas – Áreas temáticas

A página **Áreas temáticas** (acessível pela seção Métricas) permite organizar os dados das suas métricas em categorias hierárquicas. Aqui você pode visualizar, criar, editar e deletar áreas temáticas, além de filtrar e exportar a lista.

![Visualização principal da página Áreas temáticas](../imgs/metrics/areas.png)

## O que você vê

- O **percurso de navegação** no topo mostra sua localização atual no aplicativo (por exemplo, **Métricas > Áreas temáticas**).
- A tabela principal lista todas as áreas temáticas, exibindo colunas como **Nome da área**, **Área principal** e (se configurado) outros atributos. Você pode personalizar as colunas visíveis clicando no botão **Colunas** acima da tabela.
- Um campo de **pesquisa por palavra-chave** e o botão **Filtros** permitem encontrar áreas por nome ou por data de criação.
- O botão **Exportar** (cloud_download) permite baixar a lista atual como um arquivo.
- Dois botões estão disponíveis na barra de ferramentas:
    - **Adicionar nova ÁREA** – cria uma nova área temática.
    - **Importar ÁREA** – abre a página de importação, onde você envia um arquivo `.xls`, `.xlsx` ou `.csv`, mapeia suas colunas e revisa o resultado. Áreas cujo nome já existe são reutilizadas, não atualizadas.

## Trabalhando com áreas temáticas

### Adicionando uma nova área temática

1. Clique no botão **Adicionar nova ÁREA** na barra de ferramentas.
2. No diálogo que abre, preencha o **Nome da área** e, se necessário, a **Área principal** e quaisquer atributos adicionais. Campos opcionais são marcados como *(opcional)*.
3. Clique em **Salvar** para criar a nova área.

!!! tip "Área principal"
    Para criar uma subárea, comece a digitar no campo **Área principal** e escolha a área principal entre as sugestões. Se deixado em branco, a nova área se torna uma entrada de nível superior.

### Editando uma área existente

1. Encontre na tabela a área que deseja alterar.
2. Passe o mouse sobre a linha e clique no ícone **Editar** (lápis), ou clique na linha para selecioná-la e clique em **Editar** na barra de ações acima da tabela.
3. Modifique os campos no diálogo e clique em **Salvar**.

![Diálogo de edição para modificar um valor de métrica](../imgs/metrics/areas-edit.png)

### Visualizando detalhes

- Passe o mouse sobre uma linha e clique no ícone de **Visibilidade** (olho), ou selecione a linha e clique em **Ver** na barra de ações, para abrir um diálogo somente leitura mostrando todos os campos da área.

### Deletando uma área

1. Clique na linha da área para selecioná-la e, em seguida, clique em **Deletar** na barra de ações acima da tabela.
2. Confirme a exclusão no diálogo que aparece.

!!! warning "Considerações ao deletar"
    Uma área usada por form, ou que tenha áreas filhas, não pode ser deletada. Se apenas report a utilizarem, o Dino avisa e permite confirmar. Grupos de usuários que concedem a área não são verificados: remova-a deles primeiro. Veja [Métricas](index.md).

## Pesquisando e filtrando

- Use o campo de **pesquisa por palavra-chave** acima da lista para filtrar áreas por nome.
- Clique em **Filtros** para definir uma **Data inicial** e uma **Até à data**, que filtram por data de criação, e então clique em **Pesquisar**.
- Os filtros aplicados aparecem como chips abaixo da barra de ferramentas; clique no ícone **cancelar** em um chip para removê-lo.

## Exportando a lista

1. Clique no botão **Exportar** na barra de ferramentas.
2. Escolha o que exportar: *Itens na página* (o padrão), os itens que correspondem aos seus filtros, ou *Todos os itens*.
3. Escolha o formato: *csv*, *xlsx* ou *splitted xlsx*, e então clique em **Exportar**.

## Ações em massa

Para executar ações em várias áreas ao mesmo tempo, marque as caixas de seleção ao lado das linhas. Quando uma linha está selecionada, suas ações individuais aparecem na barra de ações acima da tabela; quando várias linhas estão selecionadas, a barra oferece as ações em massa. A tela Áreas temáticas atualmente suporta apenas **exclusão em massa**.

## Navegando com o percurso de navegação

O percurso de navegação mostra sua localização atual (por exemplo, **Métricas > Áreas temáticas**). Clique em qualquer link do percurso de navegação para ir a um nível superior.

## Páginas relacionadas

- [Visão geral de Métricas](index.md)
- [Gerenciando valores de métricas – Casos](cases.md)
- [Gerenciando valores de métricas – Posições](locations.md)
- [Gerenciando valores de métricas – Organizações](organizations.md)
- [Gerenciando valores de métricas – Projetos](projects.md)
- [Usuários e grupos](../administration/users.md)