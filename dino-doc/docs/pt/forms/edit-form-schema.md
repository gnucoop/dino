---
title: Editar Esquema de Formulário
description: Crie e modifique esquemas de formulário — defina nome, ícone, status, métricas, visibilidade e relacionamentos.
---

# Editar Esquema de Formulário

A página Editar Esquema de Formulário permite criar um novo esquema de formulário ou modificar um existente. Aqui você define os atributos básicos do formulário, gerencia seus status e métricas, controla a visibilidade e vincula o esquema a outros formulários por meio de relacionamentos.

Você pode acessar esta página por meio de:

- Clicando em **Criar** na [Visão geral dos formulários](index.md) para criar um novo esquema.
- Selecionando **Editar** no cartão de um esquema existente ou na sua visualização de detalhes.

A trilha de navegação no topo mostra sua posição atual (por exemplo, **Formulários > Minha Pesquisa > Editar**).

![Main view of the Edit Form Schema page](../imgs/forms/edit-form-schema.png)

## Atributos do Formulário

Preencha ou ajuste os seguintes campos:

| Campo | Descrição |
|-------|------------|
| **Nome do Formulário** | Um identificador exclusivo no sistema (ex.: `survey_2025`). O Dino avisa se o nome já estiver em uso. |
| **Rótulo do Formulário** | O nome legível exibido em listas e relatórios. |
| **Conjunto de Ícones** | Escolha **Padrão** (ícones de material) ou **Humanitário** (ícones SVG personalizados). |
| **Identificador do Ícone** | Selecione um ícone na lista de autocompletar. A pré-visualização é atualizada em tempo real. |
| **Status do Formulário** | Um ou mais rótulos que descrevem o estado de um envio (ex.: Rascunho, Aprovado, Rejeitado). Selecione status existentes ou clique em **Criar novo status** para adicionar um na hora. |
| **Métricas do Formulário** | Métricas a serem coletadas em cada envio. Selecione uma ou mais da lista. |
| **Visibilidade** | **Privado** – somente membros dos grupos atribuídos podem ver o formulário. **Público** – qualquer pessoa com o link pode visualizar e enviar. |
| **Comportamento do Conjunto de Métricas** | **Padrão** – cada valor de métrica pode aparecer várias vezes entre os envios. **Único** – um valor de métrica (ex.: nome de um distrito) pode ser usado apenas uma vez por formulário. |
| **Gerar Relatório** | Quando **Sim**, o Dino gera automaticamente um relatório após cada envio. Essa opção fica oculta se um relatório automático já estiver configurado. |

!!! warning "Comportamento Único do Conjunto de Métricas"
    Use **Único** com cuidado — depois que um valor é usado para uma métrica, ele não pode ser reutilizado em outro envio do mesmo formulário.

## Gerenciando os Status do Formulário

1. Clique no campo **Status do Formulário** para expandir a lista.
2. Para adicionar um status existente, marque a caixa de seleção correspondente.
3. Para criar um novo status, clique em **Criar novo status**. Uma janela de diálogo é aberta para você inserir um rótulo, escolher uma cor e salvar.
4. Para editar um status existente, clique no ícone de **edição** (lápis) ao lado dele.
5. Clique fora do menu suspenso para fechá-lo.

## Definindo Relacionamentos

Os relacionamentos permitem vincular campos entre diferentes esquemas de formulário (ex.: um subformulário que depende de uma escolha no formulário principal).

1. Clique no botão **Relacionamentos**.
2. Na janela de diálogo, adicione, edite ou remova conexões entre esquemas.

![Form relationships (dependencies) editor dialog](../imgs/forms/edit-form-schema-relationships.png)

!!! tip "Relacionamentos estão disponíveis somente ao editar um esquema existente, não durante a criação inicial."

## Salvando e Importando

- **Salvar** – armazena todas as alterações. O botão fica desabilitado se o formulário for inválido ou enquanto estiver sendo salvo.
- **Importar** – abre um seletor de arquivos para carregar um esquema de formulário a partir de um arquivo JSON ou CSV. Use essa opção para reaproveitar uma estrutura de esquema de outro projeto.

## O Construtor de Formulários

Abaixo dos atributos, a área **Construtor de Formulários** permite arrastar, soltar e configurar campos individuais (perguntas, seções etc.). As alterações são refletidas imediatamente na pré-visualização do lado direito do construtor.