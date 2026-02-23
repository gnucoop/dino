---
title: Visualizar e Gerenciar Envios
description: Como navegar, pesquisar, visualizar, editar, exportar e gerenciar envios de formulários no Dino.
---

# Visualizar e Gerenciar Envios

Esta página mostra todos os envios de um esquema de formulário específico. Você pode navegar, pesquisar, visualizar detalhes, editar, exportar e gerenciar entradas individuais a partir desta lista.

---

## Navegando pela Lista

A lista exibe todos os envios do formulário selecionado. O número total de entradas que correspondem aos seus filtros atuais é mostrado no topo.

Use os **controles de paginação** para navegar entre as páginas ou pular para a primeira ou última página.

Você também pode alterar quais **colunas** estão visíveis clicando no **botão seletor de colunas** (ícone de grade) no cabeçalho da tabela.

---

## Pesquisando e Filtrando

Uma barra de filtros acima da lista permite restringir quais entradas são mostradas:

- **Pesquisa por palavra-chave** — digite qualquer palavra para filtrar entradas cujos campos contenham esse texto.
- **Data de / Data até** — mostrar apenas entradas criadas dentro de um intervalo de datas.
- **Filtros de métricas** — filtrar por projeto, localização, área, caso, organização ou outros dados vinculados.
- **Filtro de status** — mostrar apenas entradas com um status específico do fluxo de trabalho.
- **Filtro de usuário** — mostrar apenas entradas criadas por um usuário ou grupo de usuários específico.
- **Filtros salvos (predefinições)** — salve sua combinação atual de filtros como uma predefinição para acesso rápido posterior. Use o menu de predefinições na barra de filtros para salvar, carregar ou excluir predefinições.

Para remover um filtro, clique no **×** dentro desse campo.

---

## Ações por Linha

Cada linha possui um conjunto de ícones de ação à direita. As ações disponíveis dependem das suas permissões:

- **Visualizar** (ícone de olho) — abrir a entrada no modo somente leitura.
- **Editar** (ícone de lápis) — abrir a entrada para edição.
- **Imprimir** (ícone de impressora) — gerar uma versão em PDF da entrada.
- **Exportar como Word** (ícone de documento) — baixar a entrada como um documento do Word.
- **Duplicar** (ícone de cópia) — criar um novo rascunho de entrada pré-preenchido com os dados desta entrada.
- **Excluir** (ícone de lixeira) — excluir permanentemente a entrada. Uma solicitação de confirmação será exibida.
- **Imprimir crachá** (ícone de crachá) — gerar um documento de crachá para esta entrada (disponível se o formulário estiver vinculado a um caso).
- **Ver log** (ícone de histórico) — ver o histórico de alterações feitas nesta entrada.

!!! note "Ações baseadas em permissão"
    Nem todas as ações estão visíveis para todos os usuários. As ações mostradas dependem das permissões atribuídas a você. Algumas ações, como editar ou excluir, podem estar disponíveis apenas se o status da entrada permitir.

---

## Ações em Massa

Para atuar em várias entradas de uma vez:

1. Selecione as entradas que deseja gerenciar marcando a caixa de seleção em suas linhas.
2. Use os **botões de ação em massa** que aparecem na barra de ferramentas para excluir ou editar todas as entradas selecionadas de uma só vez.

!!! warning "Restrições de edição em massa"
    A edição em massa só está disponível se todas as entradas selecionadas tiverem um status que permita a edição.

---

## Adicionando uma Nova Entrada

Clique no **botão +** (botão circular flutuante no canto inferior direito da página) para abrir um formulário em branco e registrar um novo envio.

---

## Importando Entradas

Clique no **botão importar** (ícone de upload em nuvem, botão flutuante no canto inferior direito) para importar entradas em massa a partir de um arquivo.

---

## Exportando a Lista

Clique no **Botão Exportar** (ícone de download) na barra de filtros para baixar a lista atual de entradas como um arquivo.

---

## Visualizando Dados em um Mapa

Se os envios incluírem dados geográficos, clique no **Botão Mapa** na barra de filtros para abrir a [Visualização de Mapa](map-view.md) para este formulário.