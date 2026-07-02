---
title: Casos
description: Gerencie casos no Dino — crie, edite, visualize, filtre, exporte e organize registros de casos com uma tabela de dados estruturada.
---

# Casos

A página Casos oferece um espaço de trabalho centralizado para acompanhar e gerenciar casos individuais. Cada caso é um registro estruturado que pode conter nome, código, imagem, relação com caso pai, anotações e atributos adicionais. Você pode criar novos casos, editar os existentes, visualizar detalhes, excluir registros e exportar sua lista de casos — tudo a partir de uma única tabela interativa.

![Visão principal da página Casos](../imgs/metrics/cases.png)

## Visão geral da tabela

A tabela principal exibe as seguintes colunas por padrão:

- **Nome do caso** – O nome que você atribui ao caso (ordenável).
- **Código** – Um código gerado pelo sistema ou atribuído manualmente (somente leitura após a criação).
- **Imagem do caso** – Um arquivo de imagem enviado representando o caso.
- **Caso pai** – O nome de qualquer caso pai ao qual este caso pertence.

Colunas adicionais (como **ID**, **Anotações**, **Data de criação** e **Atributos adicionais**) ficam ocultas por padrão. Você pode personalizar quais colunas aparecem clicando no botão **Personalizar colunas** (ícone de olho) no cabeçalho da tabela.

## Ações em um único caso

No lado direito de cada linha, você encontrará ícones para as seguintes ações:

- **Editar** – Abre uma caixa de diálogo para modificar os detalhes do caso.
- **Imprimir** – Gera um cartão PDF imprimível do caso.
- **Visualizar** – Abre uma caixa de diálogo somente leitura para inspecionar informações do caso.
- **Excluir** – Abre uma caixa de diálogo de confirmação para remover permanentemente o caso.

Clique no ícone **Mais** (três pontos verticais) para ver todas as ações disponíveis caso algumas estejam ocultas.

## Ações em lote

Selecione vários casos usando as caixas de seleção na primeira coluna. Quando pelo menos um caso estiver selecionado, um botão **Excluir** aparece no topo da tabela. Você pode excluir todos os casos selecionados de uma vez.

!!! warning "Exclusão em lote é permanente"
    Casos excluídos não podem ser recuperados. Use a ação de exclusão em lote com cuidado.

## Criando um novo caso

1. Clique no botão de ação flutuante **Adicionar novo** (ícone de mais) no canto inferior direito da página.
2. Uma caixa de diálogo será aberta. Preencha os campos obrigatórios:
   - **Nome do caso** – Insira um nome descritivo.
   - **Código** – (Opcional) Forneça um código único. Este campo é somente leitura após a criação.
   - **Imagem do caso** – Envie um arquivo de imagem.
   - **Caso pai** – Opcionalmente, vincule este caso a um caso pai existente.
   - **Anotações** – Adicione quaisquer anotações relevantes.
3. Clique em **Salvar** para criar o caso.

## Importando casos

Use o botão de ação flutuante **Importar** (ícone de upload na nuvem) para fazer upload em lote de casos a partir de um arquivo. Os formatos suportados são definidos pelo administrador do sistema.

## Filtrando e pesquisando

A barra de pesquisa no topo permite filtrar casos por:

- **Palavra-chave** – Pesquisa em todos os campos exibidos.
- **Intervalo de datas** – Filtrar por data de criação (De / Até).
- **Filtros adicionais** – Selecione entre filtros predefinidos, como métrica, status, usuário ou grupo de usuários.

Após aplicar os filtros, você pode salvar a combinação como um **preset** para reutilização rápida. Para salvar um preset:

1. Abra o painel de filtros.
2. Insira um nome no campo de preset.
3. Clique em **Salvar**.  
Para aplicar um preset salvo, selecione-o na lista e clique em **Aplicar**.

## Exportando casos

Clique no botão **Exportar** (ícone de download na nuvem) na barra de filtros. Escolha o formato de exportação (por exemplo, CSV ou Excel) e selecione quais colunas incluir. O arquivo exportado conterá todos os casos atualmente visíveis, respeitando os filtros ativos.

## Personalizando a tabela

- **Ordenar** – Clique em qualquer cabeçalho de coluna ordenável (por exemplo, **Nome do caso**, **Data de criação**) para ordenar a tabela.
- **Seletor de colunas** – Abra a caixa de diálogo do seletor de colunas para mostrar ou ocultar colunas.
- **Expandir linhas** – Alguns casos podem ter subitens (outros casos vinculados como detalhes). Clique em uma linha para expandi-la e ver os registros relacionados.

A página também exibe um **caminho de navegação** (breadcrumb) no topo para que você possa voltar à seção principal de Métricas.

## Páginas relacionadas

- [Visão geral de Métricas](index.md) – Retorne ao painel principal de métricas.
- [Áreas temáticas](areas.md) – Organize casos por área temática.
- [Localizações](locations.md) – Associe casos a localizações geográficas.
- [Organizações](organizations.md) – Vincule casos a organizações.
- [Projetos](projects.md) – Agrupe casos em projetos.