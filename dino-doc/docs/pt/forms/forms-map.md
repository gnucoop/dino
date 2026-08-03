---
title: Mapa de Formulários
description: Visualize as submissões de formulários em um mapa interativo com opções de filtro.
---

# Mapa de Formulários

A página Mapa de Formulários exibe as submissões do seu formulário em um mapa interativo, permitindo visualizar os dados geograficamente. Você pode filtrar as submissões por data e por campos de dados específicos para focar nas informações que precisa.

![Main view of the Forms Map page](../imgs/forms/forms-map.png)

A página consiste em duas áreas principais:

*   **O Mapa**: Um mapa interativo que mostra marcadores agrupados para cada submissão. Cada marcador é posicionado com base nos dados de localização da submissão.
*   **O Painel de Filtros**: Um conjunto de controles na lateral para filtrar os dados exibidos no mapa.

## Visualizando Detalhes da Submissão

Cada marcador no mapa representa uma ou mais submissões em uma localização específica.

1.  Clique em um marcador para abrir o pop-up.
2.  O pop-up exibe o nome da localização e os valores dos principais campos de dados dessa submissão.

## Filtrando Submissões no Mapa

Use os filtros para restringir quais submissões aparecem no mapa.

### 1. Filtrar por Intervalo de Datas

1.  No campo **Intervalo de datas**, clique no ícone de calendário.
2.  Selecione uma data inicial e uma data final no seletor de datas.

### 2. Filtrar por Campos de Dados

Abaixo do seletor de datas, você verá vários campos de entrada de texto. Cada campo corresponde a uma coluna de dados do seu formulário (por exemplo, "Ponto de atendimento", "Nacionalidade").

1.  Clique em qualquer campo (por exemplo, "Nacionalidade").
2.  Comece a digitar. Uma lista suspensa mostrará valores correspondentes dos seus dados existentes.
3.  Você pode selecionar um valor da lista ou digitar seu próprio texto para filtrar as submissões que contenham esse texto.
4.  Para limpar um filtro, clique no ícone **X** que aparece dentro do campo.

!!! tip "Usando Vários Filtros"
    Você pode aplicar filtros em vários campos simultaneamente. O mapa só mostrará as submissões que corresponderem a **todos** os critérios de filtro ativos.

### 3. Aplicar Seus Filtros

Após definir o intervalo de datas e os filtros de campo, clique no botão **Aplicar Filtros**.

O mapa será atualizado, mostrando apenas os marcadores das submissões que correspondem a todos os critérios selecionados. A visualização do mapa também ampliará automaticamente para ajustar aos marcadores filtrados.

!!! warning "Dados de Localização Necessários"
    As submissões só podem aparecer no mapa se tiverem coordenadas geográficas válidas associadas à sua localização. Submissões sem esses dados não serão exibidas.