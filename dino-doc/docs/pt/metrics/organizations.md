---
title: Organizações
description: Gerencie organizações no Dino – visualizar, adicionar, editar, excluir e importar organizações.
---

# Organizações

A página **Organizações** lista todas as organizações configuradas na sua instância do Dino. Use esta tela para visualizar, adicionar, editar, excluir e importar organizações, bem como gerenciar a hierarquia organizacional.

![Main view of the Organizations page](../imgs/metrics/organizations.png)

## Colunas da Tabela

Por padrão, a tabela exibe as seguintes colunas:

- **Nome da Organização** – o nome da organização. Esta coluna pode ser ordenada.
- **Organização Matriz** – o nome da organização matriz, se houver.

Colunas adicionais (ID, Data de Criação, Caminho do Logotipo, URL do Site, Atributos Adicionais) estão ocultas, mas disponíveis ao personalizar a exibição das colunas usando o ícone **View Week** (canto inferior direito do cabeçalho da tabela).

## Ações por Linha

Cada linha possui três ações acessíveis ao clicar no botão **Mais** (três pontos) ao lado da linha:

- **Visualizar** (ícone de visibilidade) – abre uma caixa de diálogo somente leitura com detalhes da organização.
- **Editar** (ícone de lápis) – abre uma caixa de diálogo para modificar os detalhes da organização.
- **Excluir** (ícone de lixeira) – exclui permanentemente a organização. Uma caixa de diálogo de confirmação aparece antes da exclusão.

!!! warning "Exclua organizações com cuidado"
    A exclusão de uma organização não pode ser desfeita. Certifique-se de que nenhum caso ou formulário ativo dependa dela antes da remoção.

Você também pode clicar diretamente em uma linha para **selecioná-la** (para ações em massa) ou **expandi-la** para ver detalhes adicionais na linha.

## Ações em Massa e Filtros

Selecione várias linhas usando as caixas de seleção na primeira coluna e depois utilize os botões de exclusão em massa ou edição em massa que aparecem na barra de ferramentas.

### Pesquisa e Filtros

A barra de filtros no topo da página oferece:

- **Pesquisa por palavra-chave** – filtra organizações por qualquer texto.
- **Intervalo de datas** – filtra por intervalo de data de criação.
- **Gerenciador de predefinições** – salva e carrega predefinições de filtro de pesquisa.
- **Exportar** – baixa a lista filtrada como um arquivo.

Clique no botão **Filtrar** para abrir filtros avançados com controle mais granular.

## Adicionando e Importando Organizações

Dois botões de ação flutuantes estão sempre visíveis no canto inferior direito:

- **Adicionar Novo** (ícone de mais) – abre uma caixa de diálogo para criar uma nova organização. Você será solicitado a inserir o nome da organização, organização matriz, URL do site e outros detalhes.
- **Importar** (ícone de upload na nuvem) – permite enviar um arquivo (CSV, JSON ou XML) para importar organizações em massa. Siga as instruções na tela para mapear os campos.

!!! tip "Internacionalização"
    Os nomes e rótulos das organizações podem ser traduzidos se a sua instância do Dino suportar vários idiomas. Consulte [Idiomas](../administration/languages.md) para obter detalhes.

## Etapas: Criar uma Nova Organização

1. Clique no botão flutuante **Adicionar Novo**.
2. Na caixa de diálogo que abrir, preencha os campos obrigatórios (Nome da Organização e pelo menos um atributo).
3. Opcionalmente, defina uma **Organização Matriz** para criar uma hierarquia.
4. Clique em **Salvar**. A nova organização aparece imediatamente na lista.

## Etapas: Exportar Organizações

1. Aplique os filtros necessários na barra de pesquisa.
2. Clique no botão **Exportar** (ícone de download na nuvem) na barra de filtros.
3. Escolha o formato de exportação (CSV, Excel, etc.) e confirme.
4. O arquivo é baixado para o seu dispositivo.

## Páginas Relacionadas

- [Visão Geral das Métricas](index.md) – todas as páginas de gerenciamento de métricas.
- [Áreas Temáticas](areas.md) – gerencie áreas temáticas para organizações.
- [Casos](cases.md) – associe casos a organizações.
- [Localizações](locations.md) – vincule localizações a organizações.
- [Projetos](projects.md) – conecte organizações a projetos.