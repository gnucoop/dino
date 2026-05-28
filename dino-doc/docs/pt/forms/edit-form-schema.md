---
title: Editar Esquema de Formulário
description: Aprenda a criar e editar esquemas de formulário no Dino para definir a estrutura dos seus formulários de coleta de dados.
---

# Editar Esquema de Formulário

A página **Editar Esquema de Formulário** permite projetar ou modificar a estrutura de um formulário — os campos, seus tipos, regras de validação e como eles se relacionam entre si. Você pode criar um esquema totalmente novo ou atualizar um existente.

![Main view of the Edit Form Schema page](../imgs/forms/edit-form-schema.png)

## Criar um Novo Esquema de Formulário

1. Na seção **Formulários**, clique em **Criar Esquema de Formulário**.
2. Insira um **Nome** e, opcionalmente, uma **Descrição** para o esquema.
3. Adicione campos usando o botão **Adicionar Campo**. Para cada campo, você pode definir:
   - **Rótulo do Campo** – a pergunta ou instrução exibida aos coletores de dados.
   - **Tipo de Campo** – por exemplo, texto, número, data, seleção, geolocalização.
   - Alternância **Obrigatório** – torna o campo obrigatório.
   - Regras de **Validação** – como valores mínimo/máximo, extensões de arquivo permitidas, etc.
4. Reorganize os campos arrastando-os para a ordem desejada.
5. Clique em **Salvar** para criar o esquema.

## Editar um Esquema de Formulário Existente

1. Navegue até a página **Formulários** e clique no esquema que deseja modificar.
2. Clique no botão **Editar** (ou abra o menu de ações do esquema e selecione **Editar**).
3. O editor abre com todos os campos existentes carregados. Você pode:
   - Adicionar novos campos.
   - Editar configurações de campo existentes clicando no campo.
   - Excluir um campo usando seu ícone de lixeira.
   - Reordenar campos por arrastar e soltar.
4. Clique em **Salvar** para aplicar as alterações.

!!! warning "Editando um esquema que já possui envios"
    Alterar tipos de campo ou remover campos pode afetar envios existentes. O Dino avisará antes de salvar se alguma incompatibilidade for detectada.

## Definindo Relacionamentos entre Campos (Dependências)

Você pode configurar lógica condicional para que determinados campos apareçam apenas quando um valor específico for selecionado em outro campo.

1. Durante a edição de um esquema, selecione um campo que você deseja que seja condicional.
2. Clique na guia ou botão **Relacionamentos**.
3. No diálogo que se abre, escolha o **campo pai** e o **valor** que deve ser selecionado para que este campo seja exibido. Você também pode adicionar múltiplas condições (lógica E/OU).
4. Clique em **Aplicar** para salvar o relacionamento.

![Form relationships (dependencies) editor dialog](../imgs/forms/edit-form-schema-relationships.png)

!!! tip "Testando dependências"
    Após salvar o esquema, você pode testar sua lógica condicional abrindo o formulário na visualização [Editar Formulário](edit-form.md) e verificando se os campos dependentes aparecem ou ocultam corretamente.

## Próximos Passos

Assim que o esquema do formulário estiver pronto, você pode [criar uma instância de formulário](edit-form.md) baseada nele, ou usar o esquema em um [Mapa de Formulários](forms-map.md) para atribuí-lo a áreas e coletores específicos.