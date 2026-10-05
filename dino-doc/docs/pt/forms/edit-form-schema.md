---
title: Editar form schema
description: Construa e modifique form schemas — defina nome, ícone, visibilidade, status, métricas, relacionamentos e a própria estrutura do form.
---

# Editar form schema

A página Editar form schema permite criar um novo form schema ou modificar um existente. Aqui você define os atributos gerais do form, gerencia seus status e métricas, controla a visibilidade, conecta-o a outros form schemas e constrói as perguntas que seus usuários responderão.

Você pode acessar esta página:

- Clicando no botão **+** (*Adicionar novo form schema*) no canto inferior direito da [visão geral de Forms](index.md) para construir um novo schema.
- Selecionando **Editar** no card de um schema existente ou na sua visualização de detalhes.

O caminho de navegação no topo mostra sua posição atual (por exemplo, **Forms / Schema / Meu questionário / Editar**).

![Visualização principal da página Editar form schema](../imgs/forms/edit-form-schema.png)

O editor está organizado em abas — **Configurações**, **Métricas**, **Status**, **Construir** e **Relacionamentos**. Os botões **Salvar** e **Importar XLSForm** permanecem visíveis na linha de abas, para que você possa salvar seu trabalho de qualquer aba.

## Aba Configurações

A aba **Configurações** contém os metadados e a configuração geral do questionário.

| Campo | Descrição |
|-------|-------------|
| **Nome do formulário** | Um identificador único do sistema (por exemplo, `survey_2025`). O Dino avisa se o nome já estiver em uso. |
| **Etiqueta do formulário** | O nome legível exibido em listas e reports. |
| **Conjunto de ícones** | Escolha **Padrão** (ícones material) ou **Humanitarian** (ícones SVG personalizados). |
| **Ícone do formulário** | Escolha um ícone na lista de preenchimento automático. A pré-visualização ao lado do campo é atualizada em tempo real. |
| **Visibilidade** | **Privado** — apenas usuários do Dino com permissão para enviar podem mandar dados para este form schema. **Público** — qualquer pessoa com o link pode enviar. Consulte [forms públicos](../public-forms/index.md) para mais detalhes. |
| **Gerar relatório** | Quando **Sim**, o Dino gera automaticamente um report para o form. Se um report já existir, esta opção fica travada em **Sim**; para desativá-la, exclua primeiro o schema e os dados do report. Consulte [Reports automáticos](../reports/autoreports.md) para mais detalhes. |

!!! tip "Vá direto para as perguntas"
    Clique em **Ir para a construção** na parte inferior da aba Configurações para abrir a aba **Construir** imediatamente.

## Aba Métricas

Na aba **Métricas** você escolhe quais métricas se aplicam a este questionário e como elas se comportam.

- **Métricas de formulário** — as métricas a coletar para cada dado. Selecione uma ou mais na lista.
- **Comportamento do conjunto de métricas** — **Padrão** permite que cada valor de métrica apareça várias vezes entre os dados. **Único** permite que um valor de métrica (por exemplo, o nome de um distrito) seja usado apenas uma vez por form.
- **Métricas a incluir no formulário** — selecione as métricas cujos dados devem ser incluídos no form.
- **Métricas incluídas como opções de escolha** — adicione uma linha por métrica que você deseja expor como origem de escolha. Para cada linha, escolha a métrica, liste opcionalmente atributos adicionais a serem levados para a escolha e adicione uma condição de filtro se quiser restringir as opções disponíveis. A nova origem de escolha é chamada `$metricName_metric_choice`.

!!! warning "Comportamento do conjunto de métricas Único"
    Use **Único** com cuidado — uma vez que um valor é usado para uma métrica, ele não pode ser reutilizado em outro dado do mesmo form schema.

## Aba Status

Na aba **Status** você define os status que um dado deste questionário pode ter (por exemplo, Rascunho, Aprovado, Rejeitado).

1. Clique no campo **Estado dos formulários** para expandir a lista.
2. Para adicionar um status existente, selecione-o na lista.
3. Para criar um novo status, clique em **Crie novo status**. Uma caixa de diálogo é aberta, onde você pode inserir uma etiqueta, escolher uma cor e salvar.
4. Para editar um status existente, clique no ícone **Editar** (lápis) ao lado dele.
5. Clique fora da lista suspensa para fechá-la.

Você também pode associar um nível a cada status para estabelecer uma ordem. Quando novos dados de form são criados, eles recebem o status com o nível mais baixo.

## Aba Construir

A aba **Construir** contém o construtor de forms, onde você arrasta, solta e configura campos, slides e seções individuais. As alterações são refletidas imediatamente na pré-visualização. Use esta aba para definir as perguntas que os usuários realmente responderão.

## Aba Relacionamentos

Os relacionamentos trazem valores de campos ou escolhas de outros form schemas para este — por exemplo, um subform que depende de uma escolha feita no form principal.

1. Abra a aba **Relacionamentos**.
2. Clique em **Adicionar relação com outros formulários**.
3. Na nova linha, escolha o **Formulários** de onde trazer os dados e selecione os **Campos** a trazer para este form.
4. Opcionalmente, escolha um ou mais valores de **Métrica** para filtrar o relacionamento.
5. Para usar um único campo como opção de escolha, ative **Campo como opção** e escolha o **Campo de rótulo** e, se necessário, um **Campo adicional**.

![Aba Relacionamentos do editor de form schema](../imgs/forms/edit-form-schema-relationships.png)

!!! tip "Salve primeiro"
    A aba Relacionamentos e as seções de dados de métricas precisam de um form schema salvo. Enquanto você ainda estiver criando um schema, elas permanecem bloqueadas com o aviso *Salve o form primeiro para adicionar relacionamentos*.

## Salvando e importando

- **Salvar** — armazena todas as alterações. O botão fica desativado enquanto o form é inválido ou já está sendo salvo.
- **Importar XLSForm** — abre uma caixa de diálogo onde você arrasta um arquivo XLSForm ou clica em **Escolha um arquivo** (`.xls` ou `.xlsx`; o arquivo precisa das planilhas *survey*, *choices* e *settings*) e depois clica em **Aplicar** para carregá-lo no editor. Use isto para reutilizar a estrutura de um schema de outro projeto. Nada é armazenado até você clicar em **Salvar**.