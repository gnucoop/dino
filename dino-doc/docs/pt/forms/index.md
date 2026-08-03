---
title: Formulários
description: Gerencie esquemas de formulário e colete envios de dados estruturados no Dino.
---

# Formulários

A página **Formulários** é o seu ponto de partida para a coleta de dados estruturados no Dino. A partir daqui você pode navegar, criar e gerenciar esquemas de formulário, além de visualizar e trabalhar com os envios coletados por meio de cada formulário.

![Main view of the Forms page](../imgs/forms/index.png)

A visualização principal exibe uma **grade de cartões de esquema de formulário**. Cada cartão mostra o rótulo e o ícone do formulário. Passar o mouse sobre um cartão revela os botões de ação:

- **Editar Esquema** – Modificar a estrutura do formulário (campos, validação, métricas).
- **Excluir Esquema** – Remover o esquema do formulário (e todos os seus envios).
- **Compartilhar URL** – Obter um link público para permitir envios externos.
- **Ver Mapa** – Abrir a visualização do mapa para envios com dados de localização.
- **Conversar com seus dados** – Use o recurso [DataChat](datachat.md) para fazer perguntas sobre os envios em linguagem natural.

!!! tip
    As ações disponíveis em um cartão dependem das suas permissões. Talvez você não veja todos os botões.

Para criar um novo esquema de formulário, clique no botão flutuante **+** no canto inferior direito. Você será levado à página [Editar Esquema de Formulário](edit-form-schema.md) para criar o seu formulário.

## Trabalhando com Envios

Clique em um cartão de esquema de formulário para acessar sua **lista de envios**. Esta tabela mostra todas as entradas de dados coletadas para esse esquema.

![Submission list (data table) for a form schema](../imgs/forms/index-list.png)

A lista inclui uma **barra de filtros** que permite pesquisar por palavra-chave, intervalo de datas, métricas, status, usuário e muito mais. Você também pode salvar predefinições de filtro para reutilização rápida.

Use o botão **exportar** para baixar os envios nos formatos CSV ou XLSX.

![Export dialog for downloading form submissions](../imgs/forms/index-export.png)

### Ações de Linha

Clique em uma linha para expandir seus detalhes ou use as ações de linha (visualizar, editar, excluir, imprimir como PDF, baixar como DOCX, imprimir crachá). As ações disponíveis dependem das suas permissões e da configuração do formulário.

### Criando um Novo Envio

Clique no botão flutuante **+** na página de lista para abrir um formulário em branco para inserção de dados.

![Blank form opened to submit a new data entry](../imgs/forms/index-create.png)

Preencha os campos e envie. O novo envio aparecerá na lista.

### Operações em Massa

Selecione vários envios usando as caixas de seleção para executar **exclusão** ou **edição** em massa (alterar o mesmo valor de campo em todas as entradas selecionadas).

## Visualizações Adicionais

- **Mapa** – Visualize envios com coordenadas geográficas em um mapa interativo. Saiba mais em [Mapa de Formulários](forms-map.md).
- **DataChat** – Consulte os dados do seu formulário usando linguagem natural. Consulte [DataChat](datachat.md) para obter detalhes.

!!! warning
    O recurso DataChat pode consumir créditos. Verifique o saldo de créditos da sua conta antes de usá-lo.