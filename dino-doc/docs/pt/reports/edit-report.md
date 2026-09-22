---
title: Editar report
description: Aprenda a editar um report existente no Dino, incluindo a atualização de métricas e detalhes.
---

# Editar report

A página Editar report permite que você modifique um report existente. Você pode atualizar suas métricas, detalhes e outras informações após ele ter sido criado.

![Visualização principal da página Editar report](../imgs/reports/edit-report.png)

## Acessar a página de edição

Você pode navegar até a página Editar report de duas maneiras:

* Na lista principal de [Reports](index.md), clique no título de um report ou na ação **Editar** (geralmente representada por um ícone de lápis).
* Dentro da visualização detalhada de um report (após clicar em **Visualizar o report**), procure um botão ou link **Editar**.

## Editar informações do report

Ao acessar a página Editar report, você verá um form semelhante ao usado para criar um report. O form é pré-preenchido com os dados atuais do report.

### Passos para editar um report

1. **Revise os dados pré-preenchidos** nos campos do form.
2. **Faça suas alterações** em qualquer um dos campos disponíveis:
   - **Métricas primárias:** Atualize os principais valores numéricos do report.
   - **Métricas secundárias:** Edite pontos de dados adicionais (se configurados para o seu form schema).
   - **Detalhes:** Modifique textos descritivos, datas ou outras informações de apoio.
3. **Salve suas alterações** clicando no botão **Salvar** ou **Atualizar** na parte inferior do form.

!!! tip "Campos opcionais"
    Dependendo da configuração da sua organização, alguns campos de métricas podem ser opcionais. Eles geralmente são marcados como tal. Você pode deixar campos opcionais em branco se não houver dados disponíveis.

## Visualizar o report renderizado

Após salvar suas alterações, você pode visualizar o report formatado. Clique no botão ou link **Visualizar o report** para ver uma versão renderizada e limpa dos dados do report.

![Visualização do report renderizado após clicar em Visualizar o report](../imgs/reports/edit-report-view.png)

## Entender o form schema

A estrutura e os campos disponíveis na página Editar report são determinados pelo **form schema** configurado pelo seu administrador. Isso garante que os dados sejam coletados de forma consistente.

![Visualização principal da página Editar report schema](../imgs/reports/edit-report-schema.png)

Se você precisar editar informações que não aparecem como um campo, entre em contato com seu administrador – o form schema pode precisar ser atualizado. Você pode saber mais sobre a estrutura subjacente na documentação [Editar report schema](edit-report-schema.md).

!!! warning "Integridade dos dados"
    Tenha cuidado ao editar dados históricos de reports, pois as alterações podem afetar a análise de tendências e os registros históricos. Certifique-se de que suas atualizações sejam precisas.