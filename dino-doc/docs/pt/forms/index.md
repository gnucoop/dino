---
title: Formulários
description: Faça a gestão de esquemas de formulário e recolha dados estruturados no Dino.
---

# Formulários

A página **Formulários** é o seu ponto de partida para a recolha de dados estruturados no Dino. A partir daqui pode explorar, criar e gerir esquemas de formulário e, em seguida, ver e trabalhar com os dados recolhidos através de cada formulário.

![Vista principal da página Formulários](../imgs/forms/index.png)

A vista principal apresenta uma **grelha de mosaicos de esquemas de formulário**. Cada mosaico mostra a etiqueta e o ícone do formulário. Um mosaico marcado com um ícone de impressão digital é único: só pode existir um dado com esse conjunto exato de métricas. Ao passar o cursor sobre um mosaico, aparecem botões de ação:

- **Editar esquema de formulário** – Modificar a estrutura do formulário (campos, validação, métricas).
- **Eliminar esquema de formulário** – Remover o esquema. O Dino recusa se o esquema ainda tiver dados ou se um report o utilizar, e pede confirmação se outros formulários ou grupos de utilizadores lhe fizerem referência.
- **Partilhar url público** – Obter um link público que permite submissões externas.
- **Ver mapa** – Abrir a vista de mapa para os dados com informações de posição.
- **Converse com seus dados** – Fazer perguntas sobre os seus dados em linguagem natural através do [DataChat](datachat.md).

!!! tip
    As ações disponíveis num mosaico dependem das suas permissões. É possível que não veja todos os botões.

Se ainda não existirem esquemas de formulário, a página mostra uma mensagem a convidá-lo a adicionar um. Quando a instância o permite, um campo **Filtrar** acima dos mosaicos permite restringi-los por nome.

## Criar um esquema de formulário

1. Clique no botão flutuante **+** no canto inferior direito da página.
2. Desenhe o seu formulário na página [Editar esquema de formulário](edit-form-schema.md).

## Trabalhar com dados

Clique num mosaico de esquema de formulário para abrir a sua **lista de form**. Esta tabela mostra todos os dados recolhidos para esse esquema.

![Lista de form (tabela de dados) de um esquema de formulário](../imgs/forms/index-list.png)

Acima da tabela pode ver quantos itens foram encontrados e pode navegar entre páginas. A barra de ferramentas oferece:

- **Adicionar novo formulário** – Criar um novo dado.
- **Importar formulários** – Trazer dados a partir de um ficheiro. Ver [Importar dados](import.md).
- **Filtros** – Restringir a lista por intervalo de datas, estado, utilizador, métricas e mais. Alterne entre filtros *Simples* e *Avançados*, ou guarde um filtro predefinido para reutilizar mais tarde.
- **Exportar** – Descarregar dados num ficheiro. Ver [Exportar](#exportar).

À esquerda da barra de ferramentas, o seletor **Dados** / **Mapa** / **IA** altera a vista; ver [Vistas adicionais](#vistas-adicionais).

Uma linha cujos dados possam estar incompletos mostra um ícone de aviso. As linhas com ficheiros à espera de sincronização mostram um ícone de carregamento para a nuvem.

### Exportar

Utilize o botão **Exportar** na barra de ferramentas para descarregar dados.

![Diálogo Exportar para descarregar dados de formulários](../imgs/forms/index-export.png)

O diálogo **Exportar dados** permite-lhe escolher:

1) Que formulários exportar.
    1) *Itens na página*. Apenas os formulários apresentados na página atual da lista (a predefinição).
    2) *Com filtros ativos (N)*. Todos os formulários que correspondem aos filtros que aplicou. Quando não há nenhum filtro ativo, esta opção apresenta *Adicionar filtros*: fecha o diálogo para que possa definir alguns.
    3) *Todos os itens*. Todos os formulários, sem filtro nem paginação. Num formulário extenso, isto pode tornar o dispositivo mais lento.
2) O formato.
    1) *csv*. Cada formulário exportado é uma linha e cada campo uma coluna.
    2) *xlsx*. O mesmo, em formato Excel.
    3) *splitted xlsx*. Formato Excel, com uma folha por slide.
3) No menu **Campos e formatos**:
    1) *Selecionar tudo Form fields*. Exporta todos os campos do formulário.
    2) *Etiquetas dos valores*. Para campos com valores predefinidos (escolha única ou múltipla), exporta a etiqueta apresentada em vez do código interno.
    3) *Formato do valor*, um de:

        - *Predefinido*.
        - *Formato de análise de dados*. Os slides repetidos e os campos de escolha múltipla são exportados em várias linhas, uma repetição e uma escolha por linha; os outros campos são repetidos em cada linha. Uma coluna adicional, *conta*, é 1 na primeira linha de cada formulário e 0 nas linhas adicionais geradas para o mesmo formulário, pelo que somar *conta* conta os formulários.
        - *Colunas separadas*. Cada opção de um campo de escolha múltipla recebe a sua própria coluna, com 1 ou 0.
4) Os campos a exportar. A lista **Secções** à esquerda mostra cada secção com os seus campos selecionados e o total. Para a secção ativa pode pesquisar um campo, utilizar **Selecionar tudo** / **Desselecionar**, ou marcar campos individuais. O rodapé mostra quantos campos estão selecionados; clique em **Exportar** para descarregar.

Algumas colunas são sempre exportadas e não podem ser desselecionadas:

- ID do formulário
- Data de criação
- Data de atualização
- Dados do utilizador DINO (ID e nome completo)
- Dados das métricas (id, nome, etc...)
- Estado do formulário (id, nome, etiqueta, nível, cor), quando o formulário tem estados
- Dinoinvalid

### Ações de linha

Passe o cursor sobre uma linha para mostrar os ícones **Ver** e **Editar**. Clique numa linha para a selecionar: a barra de ações acima da tabela mostra então todas as ações que pode utilizar sobre ela (ver, editar, deletar, imprimir como PDF, descarregar como DOCX, imprimir crachá). As ações disponíveis dependem das suas permissões e da configuração do formulário.

### Criar um novo dado

1. Abra a lista de form do esquema de formulário que pretende.
2. Clique em **Adicionar novo formulário** na barra de ferramentas.
3. Preencha o formulário em branco e guarde-o. Ver [Editar formulário](edit-form.md).

![Formulário em branco aberto para submeter um novo dado](../imgs/forms/index-create.png)

O novo dado aparece na lista.

### Operações em massa

Selecione um ou mais dados através das caixas de seleção para revelar as ações em massa. Pode **deletar** os dados selecionados ou **Editar** todos em conjunto, aplicando o mesmo valor de campo a todos eles.

!!! warning
    Eliminar um esquema de formulário ou os seus dados não pode ser anulado. Tenha cuidado ao utilizar ações de eliminação.

## Vistas adicionais

Altere a vista com os botões **Dados** / **Mapa** / **IA** à esquerda da barra de ferramentas da lista de form, ou a partir dos botões num mosaico de esquema de formulário. Os filtros que aplicou são mantidos.

- **Mapa** – Ver os dados com coordenadas geográficas num mapa interativo. Está disponível apenas quando o esquema recolhe informações de posições. Saiba mais em [Mapa de formulários](forms-map.md).
- **DataChat** (a vista **IA**) – Consulte os dados dos seus formulários em linguagem natural. Ver [DataChat](datachat.md) para mais detalhes.

!!! warning
    O DataChat pode consumir créditos. Verifique o saldo de créditos da sua conta antes de o utilizar.