---
title: Organizações
description: Gerencie organizações no Dino – visualize, adicione, edite, delete e importe organizações.
---

# Organizações

A página **Organizações** lista todos os valores possíveis da métrica de organização. As organizações podem ser os parceiros do seu projeto ou qualquer entidade envolvida nas suas atividades. Use este ecrã para visualizar, adicionar, editar, deletar e importar organizações, e para gerir a hierarquia organizacional.

![Vista principal da página Organizações](../imgs/metrics/organizations.png)

## Colunas da tabela

Por predefinição, a tabela mostra as seguintes colunas:

- **Organization Name** – o nome da organização. Esta coluna é ordenável.
- **Organização principal** – o nome da organização principal, se existir.

Colunas adicionais (ID, Creation Date, Logo path, Website url, Additional Attributes) estão ocultas por predefinição. Use o botão **Colunas**, acima da tabela à direita, para as mostrar ou ocultar.

## Ações de linha

Passe o cursor sobre uma linha para mostrar os ícones **Ver** e **Editar**. Clique na linha para a selecionar: a barra de ações acima da tabela passa então a mostrar todas as ações:

- **Ver** (ícone de visibilidade) – abre uma caixa de diálogo de leitura com os detalhes da organização.
- **Editar** (ícone de lápis) – abre uma caixa de diálogo para alterar os detalhes da organização.
- **Deletar** (ícone de caixote do lixo) – deleta permanentemente a organização. Aparece primeiro uma caixa de diálogo de confirmação.

!!! warning "Delete organizações com cuidado"
    Deletar uma organização não pode ser revertido. Uma organização que é usada por forms, ou que tem organizações filhas, não pode ser deletada; consulte [Métricas](index.md).

## Ações em massa

Selecione uma ou mais linhas usando as caixas de seleção na primeira coluna. Aparece uma barra de ferramentas acima da tabela com as ações que pode aplicar:

- Com uma linha selecionada, pode visualizar, editar ou deletar essa organização.
- Com várias linhas selecionadas, pode deletá-las todas de uma vez.

## Pesquisa e Filtros

A barra de filtros no topo da página oferece:

- **Pesquisa por palavra-chave** – filtre organizações por qualquer texto.
- **Filtros** – abra a caixa de diálogo de filtros para restringir a lista por data de criação (**Data inicial** / **Até à data**).
- **Exportar** – descarregue a lista como ficheiro.

Os filtros aplicados aparecem como etiquetas abaixo da barra de filtros. Clique no ícone de cancelar numa etiqueta para remover esse filtro.

## Adicionar e importar organizações

Dois botões estão disponíveis na barra de ferramentas acima da tabela:

- **Add new ORGANIZATION** (ícone de mais) – abre uma caixa de diálogo para criar uma nova organização.
- **Import ORGANIZATION** (ícone de carregamento para a nuvem) – carregue um ficheiro para importar organizações em massa.

!!! tip "Hierarquia organizacional"
    Defina uma **Organização principal** ao criar uma organização para construir uma hierarquia de entidades relacionadas.

## Passos: criar uma nova organização

1. Clique no botão **Add new ORGANIZATION** na barra de ferramentas.
2. Na caixa de diálogo que se abre, preencha os campos obrigatórios, começando pelo Organization Name. Os campos opcionais estão marcados com *(optional)*.
3. Opcionalmente, defina uma **Organização principal** para colocar a nova organização numa hierarquia.
4. Opcionalmente, adicione um caminho de logótipo, URL do website e quaisquer atributos adicionais.
5. Clique em **Salvar**. A nova organização aparece imediatamente na lista.

## Passos: importar organizações

1. Clique no botão **Import ORGANIZATION** na barra de ferramentas.
2. Carregue um ficheiro `.xls`, `.xlsx` ou `.csv` e mapeie as suas colunas para os atributos da organização.
3. Clique em **Aplicar importação** e reveja o resultado. As organizações cujo nome já existe são reutilizadas, não atualizadas.

## Passos: exportar organizações

1. Aplique os filtros de que necessita.
2. Clique no botão **Exportar** na barra de ferramentas.
3. Escolha o que exportar: *Itens na página* (a predefinição), os itens correspondentes aos seus filtros, ou *Todos os itens*.
4. Escolha o formato: *csv*, *xlsx* ou *splitted xlsx* e clique em **Exportar**.

## Páginas relacionadas

- [Visão geral das métricas](index.md) – todas as páginas de gestão de métricas.
- [Áreas temáticas](areas.md) – gerir áreas temáticas para organizações.
- [Casos](cases.md) – associar casos a organizações.
- [Posições](locations.md) – ligar posições a organizações.
- [Projetos](projects.md) – ligar organizações a projetos.