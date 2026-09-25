---
title: Formulários
description: Gerencie form schemas e colete dados estruturados no Dino.
---

# Formulários

A página **Formulários** é o seu ponto de partida para a coleta de dados estruturados no Dino. A partir daqui, você pode navegar, criar e gerenciar form schemas, além de visualizar e trabalhar com os dados coletados por meio de cada form.

![Visualização principal da página Formulários](../imgs/forms/index.png)

A visualização principal exibe uma **grade de cards de form schema**. Cada card mostra o rótulo e o ícone do form. Ao passar o mouse sobre um card, aparecem botões de ação:

- **Editar Schema** – Modifique a estrutura do form (campos, validação, métricas).
- **Excluir Schema** – Remova o form schema (e todos os seus dados).
- **Compartilhar URL** – Obtenha um link público para permitir envios externos.
- **Ver Mapa** – Abra a visualização de mapa para dados com informações de posição.
- **Conversar com seus dados** – Use o recurso [DataChat](datachat.md) para fazer perguntas sobre os dados em linguagem natural.

!!! tip
    As ações disponíveis em um card dependem das suas permissões. Você pode não ver todos os botões.

Para criar um novo form schema, clique no botão flutuante **+** no canto inferior direito. Você será direcionado para a página [Editar Form Schema](edit-form-schema.md) para projetar seu form.

## Trabalhando com Dados

Clique em um card de form schema para acessar sua **lista de form**. Esta tabela mostra todos os dados coletados para esse schema.

![Lista de form (tabela de dados) de um form schema](../imgs/forms/index-list.png)

A lista inclui uma **barra de filtro** que permite pesquisar por palavra-chave, intervalo de datas, métricas, status, usuário e muito mais. Você também pode salvar predefinições de filtros para reutilizá-las rapidamente.

### Exportar

Use o botão **exportar** para baixar os dados em formato CSV ou XLSX.

![Diálogo de exportação para baixar dados do form](../imgs/forms/index-export.png)

O diálogo de exportação permite especificar alguns parâmetros importantes para a exportação:

1) Quantos forms exportar.   
   1) *Forms na página*. Exporta apenas os forms que foram exibidos na página anterior, potencialmente filtrados e divididos em páginas.   
   2) *Adicionar filtros* ou *Todos os itens/1filters*. Se você já aplicou um filtro à sua lista de form, apenas o form filtrado pode ser exportado (segunda opção). Se você ainda não aplicou nenhum filtro, a primeira opção é exibida e permite adicionar mais filtros.   
   3) *Todos os forms*. Todos os forms, sem filtro ou paginação.   
2) Formato.   
    1) *CSV*. Os dados serão exportados para um arquivo CSV. Cada form extraído será uma linha em um arquivo onde os campos serão as colunas.   
    2) *XLSX*. Exportação em formato Excel.  
    3) *XLSX dividido*. Exportação em formato Excel onde cada slide é uma planilha diferente.   
3) Opções de campos  
    1) *Selecionar todos os campos do form*. Permite exportar todos os campos do form.  
    2) *Valores dos rótulos*. Para campos que possuem valores prefixados (campos de seleção única ou múltipla), o valor exportado é o valor exibido, não o código interno usado para representar esse valor.   
    3) *Formato de Análise de Dados*. Forms que contêm slides repetidos e múltipla escolha são exportados em várias linhas, cada linha contendo apenas um slide repetido e apenas uma múltipla escolha, os demais campos permanecem os mesmos. Uma coluna extra é adicionada, chamada *conta*. Essa coluna assume o valor 1 apenas na primeira linha do grupo de repetição, e 0 nas demais.  
    4) *Colunas Separadas*. Múltipla escolha são exportadas como múltiplas colunas 
4) *Slide de seleção*. Permite visualizar a lista de campos em cada slide, caso você queira exportar apenas alguns dos campos e não todos.   
5) *Seleção de campos*. Você pode selecionar/desselecionar campos individuais.   

Algumas colunas do arquivo exportado não podem ser desmarcadas. São elas:

- ID do Form
- Data de criação
- Data de atualização
- Dados do Usuário DINO (nome e ID)
- Dados de métricas (id, nome, etc...)
- Dinoinvalid

### Ações de Linha

Clique em uma linha para expandir seus detalhes, ou use as ações de linha (visualizar, editar, excluir, imprimir como PDF, baixar como DOCX, imprimir crachá). As ações disponíveis dependem das suas permissões e da configuração do form.

### Criando um Novo Dado

Clique no botão flutuante **+** na página da lista para abrir um form em branco para entrada de dados.

![Form em branco aberto para enviar um novo dado](../imgs/forms/index-create.png)

Preencha os campos e envie. O novo dado aparecerá na lista.

### Operações em Massa

Selecione vários dados usando as caixas de seleção para realizar **exclusão** ou **edição** em massa (alterar o mesmo valor de campo em todos os dados selecionados).

## Visualizações Adicionais

- **Mapa** – Visualize dados com coordenadas geográficas em um mapa interativo. Saiba mais em [Mapa de Forms](forms-map.md).
- **DataChat** – Consulte os dados do seu form usando linguagem natural. Veja [DataChat](datachat.md) para detalhes.

!!! warning
    O recurso DataChat pode consumir créditos. Verifique o saldo de créditos da sua conta antes de usá-lo.