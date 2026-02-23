---
title: Explorando Dados em um Mapa
description: Como usar a visualização de mapa para visualizar e filtrar envios de formulários geograficamente.
---

# Explorando Dados em um Mapa

A Visualização de Mapa mostra todos os envios de um formulário em um mapa interativo. Os envios são exibidos como marcadores, que são agrupados em clusters quando muitos pontos estão próximos. Você pode usar os filtros à esquerda para restringir os dados exibidos.

![Explorando Dados em um Mapa](../imgs/forms/map-view.png)

## Usando o Mapa

1.  **Navegar no Mapa**:
    *   **Mover**: Clique e arraste o mapa para movê-lo.
    *   **Zoom**: Use a roda de rolagem do mouse ou os botões `+` (aumentar zoom) e `-` (diminuir zoom) no canto inferior direito do mapa.
2.  **Ver Detalhes do Envio**:
    *   **Clique em um cluster** para ampliar e dividi-lo em marcadores individuais.
    *   **Clique em um marcador individual** para abrir um popup com detalhes desse envio específico, como a localização e dados-chave do formulário.

!!! tip "Encontrando Seus Dados"
    Quando você abre o mapa pela primeira vez, ele ampliará e centralizará automaticamente para mostrar todos os envios disponíveis para o formulário atual.

## Filtrando Envios no Mapa

Um painel de filtros no lado esquerdo permite restringir quais envios são mostrados no mapa.

1.  **Definir um Intervalo de Datas**:
    *   Use o seletor **Intervalo de datas** para escolher uma data inicial ("Data de início") e uma data final ("Data de término"). Apenas os envios criados dentro deste período serão exibidos.

2.  **Filtrar por Dados do Formulário**:
    *   Campos de filtro adicionais (como Área, Caso, Organização ou Projeto) aparecem com base no esquema do formulário e nos dados coletados.
    *   Clique em um campo de filtro para ver uma lista de autocompletar com todos os valores existentes para esse campo em seus dados.
    *   Comece a digitar para restringir a lista ou selecione um valor específico no menu suspenso.

3.  **Aplicar Seus Filtros**:
    *   Após definir seu intervalo de datas e quaisquer outros filtros, clique no botão **Aplicar Filtros**.
    *   O mapa será atualizado, mostrando apenas os marcadores que correspondem a todos os seus critérios selecionados. O mapa também será recentralizado para se ajustar aos resultados filtrados.

!!! warning "Limpando Filtros"
    Para limpar um filtro de texto, clique no ícone `X` dentro do campo. Para limpar o intervalo de datas, exclua o texto nas entradas de data. Você deve clicar em **Aplicar Filtros** após limpar para que as alterações entrem em vigor.