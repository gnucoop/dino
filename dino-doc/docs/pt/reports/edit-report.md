---
title: Editar Relatório
description: Aprenda a editar um relatório existente no Dino, incluindo a atualização de métricas e detalhes.
---

# Editar Relatório

A página Editar Relatório permite modificar um relatório existente. Você pode atualizar suas métricas, detalhes e outras informações após a criação.

![Main view of the Edit Report page](../imgs/reports/edit-report.png)

## Acessando a Página de Edição

Você pode navegar até a página Editar Relatório de duas maneiras:

* Na lista principal de [Relatórios](index.md), clique no título de um relatório ou na ação **Editar** (frequentemente representada por um ícone de lápis).
* Na visualização detalhada de um relatório (após clicar em **Ver o Relatório**), procure um botão ou link **Editar**.

## Editando Informações do Relatório

Ao entrar na página Editar Relatório, você verá um formulário semelhante ao usado para criar um relatório. O formulário é pré-preenchido com os dados atuais do relatório.

### Passos para Editar um Relatório

1. **Revise os dados pré-preenchidos** nos campos do formulário.
2. **Faça suas alterações** em qualquer um dos campos disponíveis:
   - **Métricas Primárias:** Atualize os principais valores numéricos do relatório.
   - **Métricas Secundárias:** Edite pontos de dados adicionais (se configurados no seu esquema de formulário).
   - **Detalhes:** Modifique texto descritivo, datas ou outras informações de suporte.
3. **Salve suas alterações** clicando no botão **Salvar** ou **Atualizar** na parte inferior do formulário.

!!! tip "Campos Opcionais"
    Dependendo da configuração da sua organização, alguns campos de métricas podem ser opcionais. Eles geralmente são marcados de acordo. Você pode deixar os campos opcionais em branco se não houver dados disponíveis.

## Visualizando o Relatório Renderizado

Após salvar suas alterações, você pode visualizar o relatório formatado. Clique no botão ou link **Ver o Relatório** para ver uma versão limpa e renderizada dos dados do relatório.

![Rendered report view after clicking View the Report](../imgs/reports/edit-report-view.png)

## Entendendo o Esquema de Formulário

A estrutura e os campos disponíveis na página Editar Relatório são determinados pelo **esquema de formulário** configurado pelo administrador. Isso garante que os dados sejam coletados de forma consistente.

![Main view of the Edit Report Schema page](../imgs/reports/edit-report-schema.png)

Se você precisar editar informações que não aparecem como um campo, entre em contato com o administrador – o esquema de formulário pode precisar ser atualizado. Você pode saber mais sobre a estrutura subjacente na documentação [Editar Esquema de Relatório](edit-report-schema.md).

!!! warning "Integridade dos Dados"
    Tenha cuidado ao editar dados históricos de relatórios, pois as alterações podem afetar a análise de tendências e os registros históricos. Garanta que suas atualizações sejam precisas.