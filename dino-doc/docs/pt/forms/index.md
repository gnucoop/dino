---
title: Formulários
description: Gerencie esquemas de formulários e colete envios de dados estruturados no Dino.
---

# Formulários

A página **Formulários** é o seu ponto de partida para a coleta de dados estruturados no Dino. A partir daqui, você pode navegar, criar e gerenciar esquemas de formulários, além de visualizar e trabalhar com os envios reunidos por meio de cada formulário.

![Visão principal da página de Formulários](../imgs/forms/index.png)

A visão principal exibe uma **grade de blocos de esquemas de formulários**. Cada bloco mostra o rótulo e o ícone do formulário. Ao passar o mouse sobre um bloco, são revelados os botões de ação:

- **Editar Esquema** – Modificar a estrutura do formulário (campos, validação, métricas).
- **Excluir Esquema** – Remover o esquema do formulário (e todos os seus envios).
- **Compartilhar URL** – Obter um link público para permitir envios externos.
- **Visualizar Mapa** – Abrir a visualização do mapa para envios com dados de localização.
- **Conversar com seus dados** – Use o recurso [DataChat](datachat.md) para fazer perguntas sobre os envios em linguagem natural.

!!! tip
    As ações disponíveis em um bloco dependem das suas permissões. Pode ser que você não veja todos os botões.

Para criar um novo esquema de formulário, clique no botão flutuante **+** no canto inferior direito. Você será levado à página [Editar Esquema do Formulário](edit-form-schema.md) para projetar seu formulário.

## Trabalhando com Envios

Clique em um bloco de esquema de formulário para acessar sua **lista de envios**. Esta tabela mostra todas as entradas de dados coletadas para esse esquema.

![Lista de envios (tabela de dados) para um esquema de formulário](../imgs/forms/index-list.png)

A lista inclui uma **barra de filtros** que permite pesquisar por palavra-chave, intervalo de datas, métricas, status, usuário e muito mais. Você também pode salvar predefinições de filtro para reutilização rápida.

Use o botão **exportar** para baixar os envios nos formatos CSV ou XLSX.

![Diálogo de exportação para baixar envios de formulário](../imgs/forms/index-export.png)

### Ações nas Linhas

Clique em uma linha para expandir seus detalhes ou use as ações da linha (visualizar, editar, excluir, imprimir como PDF, baixar como DOCX, imprimir crachá). As ações disponíveis dependem das suas permissões e da configuração do formulário.

### Criando um Novo Envio

Clique no botão flutuante **+** na página de lista para abrir um formulário em branco para entrada de dados.

![Formulário em branco aberto para enviar uma nova entrada de dados](../imgs/forms/index-create.png)

Preencha os campos e envie. O novo envio aparecerá na lista.

### Operações em Lote

Selecione vários envios usando as caixas de seleção para realizar **exclusão** ou **edição** em lote (alterar o mesmo valor de campo em todas as entradas selecionadas).

## Visualizações Adicionais

- **Mapa** – Visualize envios com coordenadas geográficas em um mapa interativo. Saiba mais em [Mapa de Formulários](forms-map.md).
- **DataChat** – Consulte seus dados de formulário usando linguagem natural. Veja [DataChat](datachat.md) para detalhes.

!!! warning
    O recurso DataChat pode consumir créditos. Verifique o saldo de créditos da sua conta antes de usá-lo.