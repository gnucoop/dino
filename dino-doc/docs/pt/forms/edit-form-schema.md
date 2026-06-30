---
title: Editar Esquema de Formulário
description: Criar e modificar esquemas de formulários — definir nome, ícone, status, métricas, visibilidade e relacionamentos.
---

# Editar Esquema de Formulário

A página Editar Esquema de Formulário permite criar um novo esquema de formulário ou modificar um existente. Aqui você define os atributos básicos do formulário, gerencia seus status e métricas, controla a visibilidade e vincula o esquema a outros formulários por meio de relacionamentos.

Você pode acessar esta página:

- Clicando em **Criar** na [visão geral de Formulários](index.md) para criar um novo esquema.
- Selecionando **Editar** no cartão de um esquema existente ou em sua visualização detalhada.

Os breadcrumbs no topo mostram sua posição atual (ex.: **Formulários > Minha Pesquisa > Editar**).

![Visão principal da página Editar Esquema de Formulário](../imgs/forms/edit-form-schema.png)

## Atributos do Formulário

Preencha ou ajuste os seguintes campos:

| Campo | Descrição |
|-------|-----------|
| **Nome do Formulário** | Um identificador único no sistema (ex.: `survey_2025`). O Dino avisa se o nome já estiver em uso. |
| **Rótulo do Formulário** | O nome legível exibido em listas e relatórios. |
| **Conjunto de Ícones** | Escolha **Padrão** (ícones material) ou **Humanitário** (ícones SVG personalizados). |
| **Identificador do Ícone** | Selecione um ícone na lista de autocompletar. A pré-visualização é atualizada em tempo real. |
| **Status do Formulário** | Um ou mais rótulos que descrevem o estado de uma submissão (ex.: Rascunho, Aprovado, Rejeitado). Selecione status existentes ou clique em **Criar novo Status** para adicionar um rapidamente. |
| **Métricas do Formulário** | Métricas a serem coletadas para cada submissão. Selecione uma ou mais na lista. |
| **Visibilidade** | **Privado** – apenas membros dos grupos atribuídos podem ver o formulário. **Público** – qualquer pessoa com o link pode visualizar e enviar. |
| **Comportamento do Conjunto de Métricas** | **Padrão** – cada valor de métrica pode aparecer várias vezes em diferentes submissões. **Único** – um valor de métrica (ex.: nome de um distrito) pode ser usado apenas uma vez por formulário. |
| **Gerar Relatório** | Quando **Sim**, o Dino gera automaticamente um relatório após cada submissão. Esta opção fica oculta se um relatório automático já estiver configurado. |

!!! warning "Comportamento Único do Conjunto de Métricas"
    Use **Único** com cuidado — uma vez que um valor é usado para uma métrica, ele não pode ser reutilizado em outra submissão do mesmo formulário.

## Gerenciando Status do Formulário

1. Clique no campo **Status do Formulário** para expandir a lista.
2. Para adicionar um status existente, marque sua caixa de seleção.
3. Para criar um novo status, clique em **Criar novo Status**. Uma caixa de diálogo será aberta, onde você pode inserir um rótulo, escolher uma cor e salvar.
4. Para editar um status existente, clique no ícone de **editar** (lápis) ao lado dele.
5. Clique fora do menu suspenso para fechá-lo.

## Definindo Relacionamentos

Relacionamentos permitem vincular campos entre diferentes esquemas de formulários (ex.: um subformulário que depende de uma escolha no formulário principal).

1. Clique no botão **Relacionamentos**.
2. Na caixa de diálogo, adicione, edite ou remova conexões entre esquemas.

![Editor de relacionamentos (dependências) de formulários](../imgs/forms/edit-form-schema-relationships.png)

!!! tip "Relacionamentos estão disponíveis apenas ao editar um esquema existente, não durante a criação inicial."

## Salvando e Importando

- **Salvar** – armazena todas as alterações. O botão fica desabilitado se o formulário for inválido ou estiver sendo salvo.
- **Importar** – abre um seletor de arquivos para carregar um esquema de formulário a partir de um arquivo JSON ou CSV. Use esta opção para reutilizar uma estrutura de esquema de outro projeto.

## O Construtor de Formulários

Abaixo dos atributos, a área **Construtor de Formulários** permite arrastar, soltar e configurar campos individuais (perguntas, seções, etc.). As alterações são refletidas imediatamente na pré-visualização à direita do construtor.
