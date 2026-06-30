---
title: Formulários
description: Gerencie a coleta de dados estruturados com formulários, visualize e edite submissões, filtre, exporte e importe dados.
---
# Formulários

A página **Formulários** é o seu hub central para toda a coleta de dados estruturados no Dino. Aqui você pode gerenciar esquemas de formulários, visualizar e editar submissões e realizar ações em massa nos seus dados.

![Visão principal da página de Formulários](../imgs/forms/index.png)

## Grade de Esquemas de Formulários

Ao abrir a página de Formulários, você verá uma grade com todos os esquemas de formulários disponíveis. Cada bloco exibe o nome do esquema e seu ícone. Passe o mouse sobre um bloco para revelar os botões de ação:

- **Editar Esquema** — Abre o editor de esquemas para modificar a estrutura do formulário.
- **Excluir Esquema** — Remove o esquema e todas as suas submissões.
- **Compartilhar URL Público** — Gera um link público para o esquema, permitindo coleta externa de dados.
- **Ver Mapa** — Abre o [Mapa de Formulários](forms-map.md) exibindo submissões geolocalizadas.
- **Converse com seus dados** — Inicia o [DataChat](datachat.md) para fazer perguntas sobre as submissões.

Clique em um bloco para abrir a lista de submissões daquele esquema.

!!! tip "Use a barra de filtros"
    No topo da página você pode filtrar esquemas por palavra-chave. A grade é atualizada automaticamente.

## Lista de Submissões

Após selecionar um esquema de formulário, você é levado a uma visão detalhada em lista. Esta tabela mostra todas as submissões (entradas) para aquele esquema. Cada linha exibe campos chave, incluindo o status (se definido) e quaisquer métricas personalizadas.

![Lista de envios de um esquema de formulário](../imgs/forms/index-list.png)

A partir desta lista, você pode:

- **Adicionar uma nova submissão** — Clique no botão flutuante **+** (canto inferior direito) para abrir um formulário em branco.
- **Editar uma submissão existente** — Clique no ícone de **editar** da linha.
- **Visualizar detalhes da submissão** — Clique no ícone de **visualizar**.
- **Excluir uma submissão** — Clique no ícone de **excluir**.
- **Imprimir ou baixar** um PDF ou DOCX da submissão.
- **Imprimir um crachá** (se a métrica de caso estiver ativa).
- **Expandir uma linha** para ver detalhes aninhados (se configurado).

### Filtragem e Pesquisa

Use o painel de filtro expansível no topo da lista:

- **Pesquisa por palavra-chave** — Encontre submissões por qualquer texto.
- **Intervalo de datas** — Filtrar por data de criação.
- **Filtros de métricas** — Reduza por localização, projeto, área, caso, organização ou outras métricas personalizadas.
- **Filtro de status** — Filtrar por status do formulário (ex.: Aprovado, Pendente).
- **Filtro de usuário** — Mostrar apenas submissões criadas por um usuário específico.

Você pode salvar e recarregar predefinições de filtro usando o **gerenciador de predefinições**.

### Ações em Massa

Selecione várias linhas usando as caixas de seleção. Em seguida, realize operações em massa:

- **Excluir** — Remove submissões selecionadas.
- **Edição em massa** — Modifica um campo em todas as submissões selecionadas.

### Exportação e Importação

![Caixa de diálogo de exportação para baixar submissões do formulário](../imgs/forms/index-export.png)

Clique no botão **exportar** (ícone de download na nuvem) para abrir a caixa de diálogo de exportação. Escolha entre os formatos CSV ou XLSX e baixe todas as submissões filtradas.

![Caixa de diálogo de importação para enviar várias submissões a partir de um arquivo](../imgs/forms/index-import.png)

Se um botão **importar** (ícone de upload na nuvem) aparecer, você pode enviar um arquivo (CSV ou XLSX) para adicionar várias submissões de uma vez.

!!! warning "Permissões"
    Algumas ações (editar esquema, excluir, exportar, importar) estão disponíveis apenas se você tiver as permissões necessárias. Entre em contato com seu administrador para solicitar acesso.

## Páginas Relacionadas

- [Editar Esquema de Formulário](edit-form-schema.md) — Personalize a estrutura de um formulário.
- [Mapa de Formulários](forms-map.md) — Visualize submissões geolocalizadas em um mapa.
- [DataChat](datachat.md) — Faça perguntas sobre os dados do seu formulário.
- [Editar Formulário](edit-form.md) — Preencher ou modificar uma única submissão.
- [Relatórios](../reports/index.md) — Crie resumos e visualizações a partir dos seus dados.
