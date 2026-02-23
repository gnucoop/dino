---
title: Criando um Relatório
description: Como gerar um novo relatório a partir de um esquema de relatório no Dino, incluindo a seleção de métricas e a definição de um intervalo de datas.
---

# Criando um Relatório

Para gerar um novo relatório, navegue até o hub de Relatórios, abra um esquema de relatório e clique no **botão +** (o botão circular flutuante no canto inferior direito da página).

![Criando um Relatório](../imgs/reports/creating-a-report.png)

!!! note "Permissão necessária"
    O botão de adicionar só fica visível se você tiver permissão para criar relatórios para este esquema.

---

## Etapa 1 — Métricas do Relatório

Se o esquema de relatório exigir métricas, a primeira etapa pede que você selecione os valores das métricas que este relatório abrangerá (por exemplo: projeto, local ou organização).

1.  Preencha todos os campos de métrica obrigatórios.
2.  Clique em **Próximo** para continuar.

---

## Etapa 2 — Dados do Relatório

Na segunda etapa, preencha os seguintes campos:

- **Nome do Relatório** *(obrigatório)* — Um nome para identificar este relatório.
- **Coletado Desde** *(opcional)* — O início do intervalo de datas para os dados incluídos no relatório.
- **Coletado Até** *(opcional)* — O fim do intervalo de datas.

O intervalo de datas é opcional. Se deixado em branco, o relatório incluirá todos os dados disponíveis para as métricas selecionadas.

!!! tip "Esquemas sem métricas"
    Se o esquema de relatório não usar métricas, você verá apenas os campos de nome do relatório e intervalo de datas diretamente, sem um indicador de etapas.

---

## Salvando o Relatório

Clique no botão **Salvar relatório** (o botão circular flutuante) para gerar e salvar o relatório.

- Se o relatório for gerado com sucesso, uma mensagem de confirmação aparecerá e você será retornado à lista de relatórios.

!!! warning "Relatórios com IA"
    Alguns esquemas de relatório usam IA para gerar conteúdo. Criar um relatório a partir desses esquemas custa créditos de IA. O custo em créditos é mostrado na dica de ferramenta do botão de adicionar antes de você começar. Se sua conta não tiver créditos suficientes, uma mensagem aparecerá e o relatório não poderá ser criado.