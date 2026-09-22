---
title: Editar Form Schema
description: Crie e modifique form schemas — defina nome, ícone, status, métricas, visibilidade e defina relacionamentos.
---

# Editar Form Schema

A página Editar Form Schema permite criar um novo form schema ou modificar um existente. Aqui você define os atributos básicos do form, gerencia seus status e métricas, controla a visibilidade e vincula o schema a outros forms por meio de relacionamentos.

Você pode acessar esta página:

- Clicando em **Criar** na [visão geral de Forms](index.md) para criar um novo schema.
- Selecionando **Editar** no cartão de um schema existente ou em sua visualização de detalhes.

O caminho de navegação no topo mostra sua posição atual (por exemplo, **Forms > Minha Pesquisa > Editar**).

![Visão principal da página Editar Form Schema](../imgs/forms/edit-form-schema.png)

## Atributos do Form

Preencha ou ajuste os seguintes campos:

| Campo | Descrição |
|-------|-------------|
| **Nome do Form** | Um identificador único do sistema (por exemplo, `survey_2025`). O Dino avisa se o nome já estiver em uso. |
| **Rótulo do Form** | O nome legível exibido em listas e reports. |
| **Conjunto de Ícones** | Escolha **Padrão** (ícones material) ou **Humanitário** (ícones SVG personalizados). |
| **Identificador do Ícone** | Escolha um ícone na lista de preenchimento automático. A pré-visualização é atualizada em tempo real. |
| **Status do Form** | Um ou mais rótulos que descrevem o estado de um dado (por exemplo, Rascunho, Aprovado, Rejeitado). Selecione status existentes ou **Criar novo Status** para adicionar um na hora. É possível associar um nível a cada status, para estabelecer uma ordem entre os status. Quando um novo dado de form é criado, ele é criado com o status correspondente ao nível mais baixo.|
| **Métricas do Form** | Métricas a serem coletadas para cada dado. Selecione uma ou mais na lista. |
| **Visibilidade** | **Privado** – o form schema só pode aceitar dados de usuários do DINO, desde que tenham permissão para enviar dados para esse form schema específico. Por outro lado, se um form estiver definido como **Público** – qualquer pessoa com o link pode enviar. Consulte a página sobre [forms públicos](../public-forms/index.md) para mais detalhes.|
| **Comportamento do Conjunto de Métricas** | **Padrão** – cada valor de métrica pode aparecer várias vezes nos dados. **Único** – um valor de métrica (por exemplo, o nome de um distrito) pode ser usado apenas uma vez por form. |
| **Gerar Report** | Quando **Sim**, o Dino gera um report automaticamente. Esta opção fica oculta se um auto-report já estiver presente. Consulte a seção [auto report](../reports/autoreports.md) para mais detalhes. |

!!! warning "Comportamento do Conjunto de Métricas Único"
    Use **Único** com cuidado — depois que um valor é usado para uma métrica, ele não pode ser reutilizado em outro dado do mesmo form schema.

## Gerenciando Status do Form

1. Clique no campo **Status do Form** para expandir a lista.
2. Para adicionar um status existente, marque sua caixa de seleção.
3. Para criar um novo status, clique em **Criar novo Status**. Uma caixa de diálogo é aberta, onde você pode inserir um rótulo, escolher uma cor e salvar.
4. Para editar um status existente, clique no ícone **editar** (lápis) ao lado dele.
5. Clique fora do menu suspenso para fechá-lo.

## Definindo Relacionamentos

Os relacionamentos permitem vincular campos entre diferentes form schemas (por exemplo, um sub-form que depende de uma escolha no form principal).

1. Clique no botão **Relacionamentos**.
2. Na caixa de diálogo, adicione, edite ou remova conexões entre schemas.

![Caixa de diálogo do editor de relacionamentos (dependências) do form](../imgs/forms/edit-form-schema-relationships.png)

!!! tip "Os relacionamentos estão disponíveis apenas ao editar um schema existente, não durante a criação inicial."

## Salvando e Importando

- **Salvar** – armazena todas as alterações. O botão fica desabilitado se o form for inválido ou ainda estiver sendo salvo.
- **Importar** – abre um seletor de arquivos para carregar um form schema a partir de um arquivo JSON ou CSV. Use isto para reutilizar a estrutura de um schema de outro projeto.

## O Form Builder

Abaixo dos atributos, a área **Form Builder** permite arrastar, soltar e configurar campos individuais (perguntas, seções, etc.). As alterações são refletidas imediatamente na pré-visualização no lado direito do builder.