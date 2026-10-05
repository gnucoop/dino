---
title: Editar relatório
description: Aprenda a criar um relatório a partir de um esquema de relatório no Dino, abrir um relatório salvo e exportar os resultados.
---

# Editar relatório

Um relatório é gerado a partir de um [esquema de relatório](edit-report-schema.md): ele aplica o esquema aos envios que correspondem às métricas e às datas que você escolher. Esta página explica como criar um novo relatório e como abrir e exportar um relatório salvo.

![Um relatório salvo aberto na etapa Métricas do relatório](../imgs/reports/edit-report.png)

## Criar um relatório

1. Acesse a página [Relatórios](index.md) e clique no cartão do esquema de relatório que você deseja usar. A lista de relatórios dele é aberta.
2. Clique em **Adicionar novo relatório** acima da tabela. Se o relatório usar prompts de IA, o número de tokens DINO-AI que ele consumirá será exibido no botão.
3. Se o seu Dino usar métricas, a página será aberta na etapa **Métricas do relatório**:
    1. Verifique a **Data de criação** e clique em **Alterar** para escolher outra, se necessário.
    2. Opcionalmente, escolha um **Estado do formulário**, entre os estados de formulário que você tem permissão para usar. O campo é exibido apenas quando houver algum.
    3. Escolha os valores das métricas sobre os quais o relatório se refere, como um local ou um projeto. As métricas marcadas com um asterisco (*) são obrigatórias para o esquema de relatório; as outras são opcionais e restringem ainda mais os dados. Se um valor de que você precisa ainda não existir, clique em **Novo** ao lado do respectivo campo para criá-lo, quando você tiver permissão.
    4. Clique em **Continuar**.
4. Na etapa **DADOS DO RELATORIO**:
    1. Insira o **Nome do relatório**. Ele é obrigatório.
    2. Opcionalmente, defina **Recolhido desde** e **Recolhido até**: apenas os envios criados dentro desse intervalo são incluídos no relatório. Você pode definir apenas uma das duas, ou nenhuma, caso em que nenhum filtro de data será aplicado.
5. Clique no botão **Salvar relatório** no canto inferior direito. Ele fica habilitado assim que as métricas obrigatórias e o nome forem preenchidos.

O Dino confirma que o documento foi criado e leva você de volta à lista de relatórios, onde o novo relatório aparece.

!!! warning "Relatórios com prompts de IA"
    Criar um relatório que usa prompts de IA consome tokens DINO-AI. Se você não tiver o suficiente, o Dino não criará o relatório e solicitará que você adicione mais tokens.

!!! tip "Os valores das métricas não podem ser alterados depois"
    As métricas, o status e o intervalo de datas são fixados quando o relatório é criado. Para ver o mesmo esquema aplicado a outros valores, crie outro relatório.

## Abrir um relatório salvo

1. Acesse a página [Relatórios](index.md) e clique no cartão do esquema de relatório.
2. Na lista de relatórios, passe o mouse sobre a linha do relatório e clique no ícone **Ver** (olho), ou clique na linha para selecioná-la e clique em **Ver** na barra de ações acima da tabela.

Se o seu Dino usar métricas, o relatório será aberto na etapa **Métricas do relatório**, que mostra os valores com os quais o relatório foi criado. Eles não podem ser alterados aqui. Clique em **Veja o relatório** para ir para a etapa **DADOS DO RELATORIO**, onde o relatório é exibido.

Enquanto o relatório estiver carregando, o Dino exibe um indicador de carregamento. Um relatório que usa prompts de IA exibe uma barra de progresso em vez disso, com a mensagem *Generating report prompt X of Y*. Se nenhum envio corresponder ao relatório, a página exibirá *Nenhum formulário foi encontrado para este relatório*.

![Visualização do relatório renderizada após clicar em Veja o relatório](../imgs/reports/edit-report-view.png)

## Ler o relatório

O topo da etapa **DADOS DO RELATORIO** mostra o título do esquema de relatório, as datas **Recolhido desde** e **Recolhido até** quando o relatório as tiver, e os valores das métricas com os quais ele foi criado. O relatório em si vem a seguir, conforme projetado em seu arquivo [XLSReport](xlsreport.md): tabelas, gráficos e texto.

Se o relatório contiver widgets de filtro, você poderá usá-los para restringir os dados exibidos, sem alterar o relatório salvo.

## Exportar um relatório

Ao lado de **Exportar como:**, no topo da etapa **DADOS DO RELATORIO**, escolha um formato:

* **pdf portrait** / **pdf landscape** — um documento PDF na orientação escolhida.
* **docx portrait** / **docx landscape** — um documento do Word na orientação escolhida.
* **xlsx** — um arquivo do Excel com os dados do relatório.

!!! note "Onde estão os botões de exportação"
    Os botões de exportação pertencem à etapa **DADOS DO RELATORIO**. Quando o seu Dino não tem métricas ativas, e no [Dashboard](../dashboard/index.md), o relatório é exibido diretamente, sem as etapas e sem os botões de exportação.

## Páginas relacionadas

* [Relatórios](index.md) — navegue pelos esquemas de relatório e seus relatórios.
* [Editar esquema de relatório](edit-report-schema.md) — crie ou altere o esquema a partir do qual um relatório é gerado.
* [Relatórios automáticos](autoreports.md) — relatórios gerados automaticamente a partir de um esquema de formulário.