---
title: Organizações
description: Gerencie organizações no Dino – veja, adicione, edite, exclua e importe organizações.
---

# Organizações

A página **Organizações** lista todas as organizações configuradas na sua instância do Dino. Utilize esta tela para ver, adicionar, editar, excluir e importar organizações, bem como para gerenciar a hierarquia organizacional.

![Main view of the Organizations page](../imgs/metrics/organizations.png)

## Colunas da Tabela

Por padrão, a tabela mostra as seguintes colunas:

- **Nome da Organização** – o nome da organização. Esta coluna é classificável.
- **Organização Matriz** – o nome da organização matriz, se houver.

As colunas adicionais (ID, Data de Criação, Caminho do Logotipo, URL do Site, Atributos Adicionais) estão ocultas, mas disponíveis ao personalizar a exibição das colunas usando o ícone **Ver Semana** (canto inferior direito do cabeçalho da tabela).

## Ações de Linha

Cada linha possui três ações acessíveis clicando no botão **Mais** (três pontos) ao lado da linha:

- **Ver** (ícone de visibilidade) – abre uma caixa de diálogo somente leitura com os detalhes da organização.
- **Editar** (ícone de lápis) – abre uma caixa de diálogo para modificar os detalhes da organização.
- **Excluir** (ícone de lixeira) – exclui permanentemente a organização. Uma caixa de diálogo de confirmação aparece antes da exclusão.

!!! warning "Exclua organizações com cuidado"
    A exclusão de uma organização não pode ser desfeita. Certifique-se de que nenhum caso ou formulário ativo dependa dela antes de removê-la.

Você também pode clicar diretamente em uma linha para **selecioná-la** (para ações em massa) ou **expandir** para ver detalhes adicionais inline.

## Ações em Massa e Filtros

Selecione várias linhas usando as caixas de seleção na primeira coluna e use os botões de exclusão em massa ou edição em massa que aparecem na barra de ferramentas.

### Pesquisa e Filtros

A barra de filtros no topo da página oferece:

- **Pesquisa por palavra-chave** – filtra organizações por qualquer texto.
- **Intervalo de datas** – filtra pelo intervalo de data de criação.
- **Gerenciador de predefinições** – salvar e carregar predefinições de filtro de pesquisa.
- **Exportar** – baixar a lista filtrada como arquivo.

Clique no botão **Filtrar** para abrir filtros avançados e obter um controle mais granular.

## Como Adicionar e Importar Organizações

Dois botões de ação flutuantes estão sempre visíveis no canto inferior direito:

- **Adicionar Novo** (ícone de adição) – abre uma caixa de diálogo para criar uma nova organização. Você será solicitado a inserir o nome da organização, a organização matriz, o URL do site e outros detalhes.
- **Importar** (ícone de envio para nuvem) – permite enviar um arquivo (CSV, JSON ou XML) para importar organizações em massa. Siga as instruções na tela para mapear os campos.

!!! tip "Internacionalização"
    Nomes e rótulos de organizações podem ser traduzidos se a sua instância do Dino suportar vários idiomas. Consulte [Idiomas](../administration/languages.md) para obter detalhes.

## Passos: Criar uma Nova Organização

1. Clique no botão flutuante **Adicionar Novo**.
2. Na caixa de diálogo que abre, preencha os campos obrigatórios (Nome da Organização e pelo menos um atributo).
3. Opcionalmente, defina uma **Organização Matriz** para criar uma hierarquia.
4. Clique em **Salvar**. A nova organização aparece imediatamente na lista.

## Passos: Exportar Organizações

1. Aplique os filtros necessários na barra de pesquisa.
2. Clique no botão **Exportar** (ícone de download na nuvem) na barra de filtros.
3. Escolha o formato de exportação (CSV, Excel, etc.) e confirme.
4. O arquivo é baixado para o seu dispositivo.

## Páginas Relacionadas

- [Visão Geral de Métricas](index.md) – todas as páginas de gerenciamento de métricas.
- [Áreas Temáticas](areas.md) – gerencie áreas temáticas para organizações.
- [Casos](cases.md) – associe casos a organizações.
- [Localizações](locations.md) – vincule localizações a organizações.
- [Projetos](projects.md) – conecte organizações a projetos.