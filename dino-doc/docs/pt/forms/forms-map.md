---
title: Mapa de Formulários
description: Visualize os dados de formulários em um mapa interativo com opções de filtro.
---

# Mapa de Formulários

A página Mapa de Formulários exibe os dados dos seus formulários em um mapa interativo, permitindo visualizar os dados geograficamente. Você pode filtrar os dados por data e por campos de dados específicos para focar nas informações de que precisa.

Isto só está disponível se a métrica de posição estiver ativa neste form schema. Além disso, para cada posição, o atributo de coordenadas precisa estar preenchido.

![Vista principal da página Mapa de Formulários](../imgs/forms/forms-map.png)

A página é composta por duas áreas principais:

*   **O Mapa**: Um mapa interativo que mostra marcadores agrupados para cada dado. Cada marcador é posicionado com base nos dados de posição do formulário.
*   **O Painel de Filtros**: Um conjunto de controles na lateral para filtrar os dados exibidos no mapa.

## Visualizar Detalhes dos Dados

Cada marcador no mapa representa um ou mais dados em uma posição específica.

1.  Clique em um marcador para abrir o seu popup.
2.  O popup exibe o nome da posição e os valores dos principais campos de dados desse formulário.

## Filtrar Dados no Mapa

Use os filtros para restringir quais dados aparecem no mapa.

### 1. Filtrar por Intervalo de Datas

1.  No campo **Intervalo de datas**, clique no ícone do calendário.
2.  Selecione uma data de início e uma data de fim no seletor de datas.

### 2. Filtrar por Campos de Dados

Abaixo do seletor de datas, você verá vários campos de entrada de texto. Cada campo corresponde a uma coluna de dados do seu formulário (por exemplo, "Ponto de atendimento", "Nacionalidade").

1.  Clique em qualquer campo (por exemplo, "Nacionalidade").
2.  Comece a digitar. Uma lista suspensa mostrará os valores correspondentes dos seus dados existentes.
3.  Você pode selecionar um valor da lista ou digitar seu próprio texto para filtrar os dados que contenham esse texto.
4.  Para limpar um filtro, clique no ícone **X** que aparece dentro do campo.

!!! tip "Usar Vários Filtros"
    Você pode aplicar filtros em vários campos simultaneamente. O mapa mostrará apenas os dados que correspondam a **todos** os critérios de filtro ativos.

### 3. Aplicar Seus Filtros

Depois de definir o intervalo de datas e os filtros de campos, clique no botão **Aplicar Filtros**.

O mapa será atualizado, mostrando apenas os marcadores dos dados que correspondam a todos os critérios selecionados. A visualização do mapa também dará zoom automaticamente para ajustar os marcadores filtrados.

!!! warning "Dados de Posição Obrigatórios"
    Os dados só podem aparecer no mapa se tiverem coordenadas geográficas válidas associadas à sua posição. Os dados sem estas informações não serão exibidos.