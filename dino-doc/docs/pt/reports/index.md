---
title: Relatórios
description: Uma visão geral da área de Relatórios do Dino — como encontrar report schemas e navegar até os seus relatórios.
---

# Relatórios

A área de Relatórios é o seu centro de acesso a todos os report schemas disponíveis. Um report schema define a estrutura e o conteúdo de um relatório que pode ser gerado a partir dos seus dados coletados. A partir daqui, você pode navegar pelos schemas e acessar os relatórios que já foram criados para cada um deles.

![Visualização principal da página de Relatórios](../imgs/reports/index.png)

Os report schemas são criados a partir de um formato baseado em Excel chamado [XLSReport](xlsreport.md), ou gerados automaticamente a partir de um form schema (veja [Relatórios automáticos](autoreports.md)). Para criar um a partir de um arquivo, você primeiro prepara um arquivo XLSReport e depois o importa para o Dino. Para o procedimento completo, veja [Editar Report Schema](edit-report-schema.md).

---

## Navegando pelos Report Schemas

Quando você abre a página de Relatórios, vê um cartão para cada report schema ao qual tem permissão de acesso. Os cartões são ordenados alfabeticamente pelo rótulo do schema.

Para encontrar um schema específico:

1. Use o campo **Filtrar** no topo da página.
2. Digite qualquer parte do nome ou rótulo do schema.
3. A lista é filtrada conforme você digita, mostrando apenas os schemas correspondentes.

Para abrir os relatórios de um schema, clique em qualquer lugar do seu cartão.

Em cada cartão que você pode editar, os ícones no canto superior direito permitem gerenciar o schema diretamente:

- **Editar** (ícone de lápis) — abre o schema para edição. Veja [Editar Report Schema](edit-report-schema.md).
- **Deletar** (ícone de lixeira) — remove o schema após a sua confirmação. Um schema que ainda tem relatórios não pode ser deletado: delete seus relatórios primeiro.

Um ícone de impressão digital em um cartão significa que o report schema é *único*: ele só pode produzir um relatório para um conjunto exato de métricas. Se você tentar criar um relatório que já existe para essas métricas, o Dino não criará uma duplicata.

!!! tip "Ainda não há schemas?"
    Se você vir a mensagem "There are not any Reports currently available" (Não há nenhum relatório disponível no momento), significa que nenhum report schema foi criado ainda ou compartilhado com você. Peça ao seu administrador do Dino para criar um, ou adicione um você mesmo se tiver permissão.

---

## Adicionando um Novo Report Schema

Você pode começar a criar um novo report schema a partir da página principal de Relatórios.

1. Clique no botão **+** (*Add new Reports schema*) no canto inferior direito da tela. Ele só é exibido se você tiver permissão para criar report schemas.
2. Siga os passos descritos em [Editar Report Schema](edit-report-schema.md).

---

## Abrindo os Relatórios de um Schema

Clicar em um cartão de schema leva você à lista de relatórios gerados a partir desse schema. A partir daí, você pode:

1. Navegar pelos relatórios existentes em uma tabela, com detalhes como o usuário que criou o relatório, o nome do relatório e o intervalo de datas coletadas.
2. Filtrar e pesquisar a lista para restringir os relatórios que você precisa. Use a pesquisa por palavra-chave, os campos de intervalo de datas e o botão **Filtros** para condições mais avançadas. Você também pode salvar um conjunto de filtros como predefinição e aplicá-lo novamente mais tarde.
3. Abrir um relatório para revisá-lo: passe o mouse sobre a sua linha e clique no ícone **Ver** (olho), ou selecione a linha e clique em **Ver** na barra de ações acima da tabela. Veja [Editar Relatório](edit-report.md).
4. Deletar um relatório que você não precisa mais: selecione a sua linha e clique em **Deletar** na barra de ações.

Para criar um novo relatório a partir do schema selecionado, clique em **Adicionar novo relatório** acima da tabela. Relatórios que usam prompts de IA consomem DINO-AI Tokens. O número de tokens que o relatório usará é mostrado ao lado do botão, para que você sempre saiba o custo antes de começar.

!!! warning "Tokens insuficientes"
    Se você não tiver DINO-AI Tokens suficientes na sua conta, o Dino não iniciará o relatório e mostrará uma mensagem pedindo para você adicionar mais tokens. Adicione tokens à sua conta e tente novamente.

---

## O que você pode fazer a seguir

A partir da área de Relatórios, você pode avançar para estas tarefas:

* **[Editar Relatório](edit-report.md)** — Revisar um relatório e exportá-lo.
* **[Editar Report Schema](edit-report-schema.md)** — Criar novos report schemas ou editar os existentes para definir o que aparece nos seus relatórios. Isso normalmente exige permissões de administrador.
* **[Agregação](../aggregation/index.md)** — Navegar pelos dados de todos os seus form schemas em uma única lista.