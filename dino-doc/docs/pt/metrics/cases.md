---
title: Casos
description: Gerencie casos no Dino — crie, edite, visualize, imprima, filtre e exporte registros de casos a partir de uma tabela de dados estruturada.
---

# Casos

A página Casos é um espaço de trabalho centralizado para acompanhar e gerenciar registros de casos individuais. Cada caso é um registro estruturado que pode conter um nome, um código, uma imagem, uma relação de caso principal, notas e atributos adicionais. A partir desta página, você pode criar novos casos, editar ou visualizar casos existentes, imprimir cards de casos, deletar registros e exportar sua lista de casos — tudo em uma única tabela interativa.

![Visualização principal da página Casos](../imgs/metrics/cases.png)

## Visão geral da tabela

A tabela exibe as seguintes colunas por padrão:

- **Nome do caso** – O nome atribuído ao caso (ordenável).
- **Código** – Um código que identifica o caso. O Dino o gera: você não o insere, e ele não é exibido no diálogo do caso.
- **Imagem do caso** – Um arquivo de imagem enviado que representa o caso.
- **Caso principal** – O nome de qualquer caso principal ao qual este caso pertence.

Colunas adicionais — **ID**, **Notas**, **Data de criação** e **Atributos adicionais** — ficam ocultas por padrão. Clique em **Colunas** acima da tabela para escolher quais colunas aparecem. Você também pode arrastar os cabeçalhos das colunas para reordená-las, e a página mostra o número total de itens encontrados ao lado do paginador.

## Trabalhando com um único caso

Passe o mouse sobre uma linha para exibir os ícones **Editar** e **Ver**. Clique na linha para selecioná-la: a barra de ações acima da tabela passa então a mostrar todas as ações:

- **Editar** – Abre um diálogo onde você pode modificar os detalhes do caso.
- **Imprimir** – Gera um card em PDF imprimível para o caso.
- **Ver** – Abre um diálogo somente leitura para inspecionar as informações do caso.
- **Deletar** – Abre um diálogo de confirmação para remover o caso permanentemente.

## Trabalhando com vários casos

1. Selecione uma ou mais linhas usando as caixas de seleção na primeira coluna.
2. Quando uma única linha está selecionada, todas as suas ações ficam disponíveis na barra de ações acima da tabela.
3. Quando várias linhas estão selecionadas, apenas as ações em massa permanecem — atualmente **Deletar**.

!!! warning "A exclusão é permanente"
    Casos deletados não podem ser recuperados. Revise sua seleção com atenção antes de confirmar uma exclusão em massa. Um caso que é usado por forms, ou que possui casos filhos, não pode ser deletado; consulte [Métricas](index.md).

## Criando um caso

1. Clique em **Adicionar novo CASO** na barra de ferramentas acima da tabela.
2. No diálogo, preencha os detalhes do caso. Os campos opcionais estão marcados com *(opcional)*.
    - **Nome do caso** – Insira um nome descritivo.
    - **Imagem do caso** – Envie um arquivo de imagem.
    - **Caso principal** – Opcionalmente, vincule este caso a um caso principal existente.
    - **Notas** – Adicione quaisquer notas relevantes.
3. Clique em **Salvar** para criar o caso.

## Importando casos

Clique em **Importar CASO** na barra de ferramentas para enviar casos em massa a partir de um arquivo `.xls`, `.xlsx` ou `.csv`. A página de importação orienta você no envio do arquivo, no mapeamento de suas colunas e na revisão do resultado. Casos cujo nome já existe são reutilizados, não atualizados; o código é gerado pelo Dino e não pode ser importado.

## Pesquisar e filtrar

Use a barra de ferramentas para restringir a tabela:

- **Pesquisa por palavra-chave** – Digite no campo de pesquisa para encontrar texto nos campos exibidos.
- **Filtros** – Abra o painel de filtros para definir uma **Data inicial** e uma **Até à data**, que filtram pela data de criação, e clique em **Pesquisar**. O selo no botão **Filtros** mostra quantos filtros estão ativos.
- Os filtros aplicados aparecem como chips abaixo da barra de ferramentas; clique no ícone de cancelar em um chip para remover aquele filtro.

## Exportando casos

1. Clique em **Exportar** na barra de ferramentas.
2. Escolha o que exportar: *Itens da página* (o padrão), os itens correspondentes aos seus filtros, ou *Todos os itens*.
3. Escolha o formato: *csv*, *xlsx* ou *splitted xlsx*, e clique em **Exportar**.

## Páginas relacionadas

- [Visão geral das métricas](index.md) – Retorne ao painel principal de métricas.
- [Áreas temáticas](areas.md) – Organize casos por área temática.
- [Posições](locations.md) – Associe casos a posições geográficas.
- [Organizações](organizations.md) – Vincule casos a organizações.
- [Projetos](projects.md) – Agrupe casos em projetos.