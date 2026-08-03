---
title: Casos
description: Gerencie casos no Dino — crie, edite, visualize, filtre, exporte e organize registros de casos com uma tabela de dados estruturada.
---

# Casos

A página Casos oferece um espaço de trabalho centralizado para acompanhar e gerenciar casos individuais. Cada caso é um registro estruturado que pode conter nome, código, imagem, relacionamento com o caso pai, notas e atributos adicionais. Você pode criar novos casos, editar os existentes, visualizar detalhes, excluir registros e exportar sua lista de casos — tudo em uma única tabela interativa.

![Main view of the Cases page](../imgs/metrics/cases.png)

## Visão geral da tabela

A tabela principal exibe as seguintes colunas por padrão:

- **Nome do caso** – O nome que você atribui ao caso (classificável).
- **Código** – Um código gerado pelo sistema ou atribuído manualmente (somente leitura após a criação).
- **Imagem do caso** – Um arquivo de imagem enviado que representa o caso.
- **Caso pai** – O nome de qualquer caso pai ao qual este caso pertence.

Colunas adicionais (como **ID**, **Notas**, **Data de criação** e **Atributos adicionais**) ficam ocultas por padrão. Você pode personalizar quais colunas aparecem clicando no botão **Personalizar colunas** (ícone de olho) no cabeçalho da tabela.

## Ações em um caso individual

No lado direito de cada linha, você encontrará ícones para as seguintes ações:

- **Editar** – Abre uma caixa de diálogo para modificar os detalhes do caso.
- **Imprimir** – Gera um cartão PDF imprimível para o caso.
- **Visualizar** – Abre uma caixa de diálogo somente leitura para inspecionar as informações do caso.
- **Excluir** – Abre uma caixa de diálogo de confirmação para remover o caso permanentemente.

Clique no ícone **Mais** (três pontos verticais) para ver todas as ações disponíveis se algumas estiverem ocultas.

## Ações em massa

Selecione vários casos usando as caixas de seleção na primeira coluna. Quando pelo menos um caso estiver selecionado, um botão **Excluir** aparece no topo da tabela. Você pode excluir todos os casos selecionados de uma vez.

!!! warning "A exclusão em massa é permanente"
    Casos excluídos não podem ser recuperados. Use a ação de exclusão em massa com cuidado.

## Criando um novo caso

1. Clique no botão de ação flutuante **Adicionar novo** (ícone de mais) no canto inferior direito da página.
2. Uma caixa de diálogo será aberta. Preencha os campos obrigatórios:
   - **Nome do caso** – Insira um nome descritivo.
   - **Código** – (Opcional) Forneça um código exclusivo. Este campo é somente leitura após a criação.
   - **Imagem do caso** – Envie um arquivo de imagem.
   - **Caso pai** – Opcionalmente, vincule este caso a um caso pai existente.
   - **Notas** – Adicione quaisquer notas relevantes.
3. Clique em **Salvar** para criar o caso.

## Importando casos

Use o botão de ação flutuante **Importar** (ícone de upload para nuvem) para fazer upload em massa de casos a partir de um arquivo. Os formatos suportados são definidos pelo administrador do sistema.

## Filtrando e pesquisando

A barra de pesquisa no topo permite filtrar casos por:

- **Palavra-chave** – Pesquisa em todos os campos exibidos.
- **Intervalo de datas** – Filtra pela data de criação (De / Até).
- **Filtros adicionais** – Selecione entre filtros predefinidos, como métrica, status, usuário ou grupo de usuários.

Depois de aplicar os filtros, você pode salvar a combinação como uma **predefinição** para reutilização rápida. Para salvar uma predefinição:

1. Abra o painel de filtros.
2. Insira um nome no campo de predefinição.
3. Clique em **Salvar**.
Para aplicar uma predefinição salva, selecione-a na lista e clique em **Aplicar**.

## Exportando casos

Clique no botão **Exportar** (ícone de download para nuvem) na barra de filtros. Escolha o formato de exportação (por exemplo, CSV ou Excel) e selecione quais colunas incluir. O arquivo exportado conterá todos os casos atualmente visíveis, respeitando os filtros ativos.

## Personalizando a tabela

- **Classificar** – Clique no cabeçalho de qualquer coluna classificável (por exemplo, **Nome do caso**, **Data de criação**) para ordenar a tabela.
- **Seletor de colunas** – Abra a caixa de diálogo do seletor de colunas para mostrar ou ocultar colunas.
- **Expandir linhas** – Alguns casos podem ter subitens (outros casos vinculados como detalhes). Clique em uma linha para expandi-la e ver os registros relacionados.

A página também exibe uma **trilha de navegação** no topo para que você possa voltar à seção principal de Métricas.

## Páginas relacionadas

- [Visão geral das métricas](index.md) – Volte ao painel principal de métricas.
- [Áreas temáticas](areas.md) – Organize os casos por área temática.
- [Localizações](locations.md) – Associe os casos a localizações geográficas.
- [Organizações](organizations.md) – Vincule os casos a organizações.
- [Projetos](projects.md) – Agrupe os casos em projetos.