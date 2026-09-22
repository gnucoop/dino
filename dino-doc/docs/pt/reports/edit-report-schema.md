---
title: Editar Report Schema
description: Crie ou modifique um report schema para definir a estrutura, o layout e as fontes de dados dos relatórios no Dino.
---

# Editar Report Schema

A página **Editar Report Schema** permite criar um novo report schema ou modificar um existente. Um report schema define a estrutura, o layout e as fontes de dados de um relatório no Dino.

![Visualização principal da página Editar Report Schema](../imgs/reports/edit-report-schema.png)

Nesta página, você configura o nome, a descrição e os campos de dados específicos que aparecerão no relatório a partir dos dados dos seus form.

## Criar um Novo Report Schema

Para criar um novo report schema:

1. Acesse a seção **Relatórios** no menu principal.
2. Clique em **Criar Report Schema**.
3. Você será direcionado para a página Editar Report Schema.
4. Insira um **Nome** descritivo para o seu relatório.
5. (Opcional) Forneça uma **Descrição** para explicar a finalidade do relatório.
6. Importe um arquivo XLSReport
7. Clique em **Salvar** para criar o schema.

## Editar um Report Schema Existente

Para modificar um report schema que você já criou:

1. Acesse a seção **Relatórios**.
2. Encontre o report schema que deseja editar na lista e clique nele.
3. Clique no botão **Editar** (geralmente representado por um ícone de lápis).
4. Você será direcionado para a página Editar Report Schema com a configuração atual carregada.
5. Faça as alterações desejadas no nome, na descrição ou na configuração de dados.
6. Clique em **Salvar** para atualizar o schema.

!!! tip "Salvando Seu Trabalho"
    Lembre-se sempre de clicar em **Salvar** após fazer alterações. Suas modificações não são aplicadas até que você salve o schema.

## Configurar os Dados do Relatório

O cerne do report schema é definir quais dados dos seus enviados aparecerão no relatório. Normalmente, você pode:

* **Selecionar a Fonte de Dados:** Escolha o form schema que contém os dados sobre os quais deseja gerar o relatório.
* **Selecionar os Campos de Dados:** Escolha campos específicos dos form schema conectados para incluir como colunas no relatório.
* **Definir os Nomes de Exibição:** Personalize o cabeçalho da coluna exibido no relatório para cada campo selecionado.
* **Definir Filtros:** Estabeleça condições para incluir apenas os enviados específicos que atendam aos seus critérios (por exemplo, enviados de um determinado intervalo de datas).

!!! warning "Fonte de Dados"
    Um report schema deve estar conectado a pelo menos um form schema para ter dados a exibir. Certifique-se de que o form relevante existe antes de criar seu relatório.

## Próximos Passos

Após salvar seu report schema, você pode:

* Acessar a página [Relatórios](index.md) para visualizar e executar seu novo relatório.
* Retornar a esta página para fazer mais ajustes conforme necessário.