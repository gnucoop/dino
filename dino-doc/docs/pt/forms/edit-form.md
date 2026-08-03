---
title: Editar uma submissão de formulário
description: Aprenda como editar uma submissão de formulário existente no Dino.
---

# Editar uma submissão de formulário

A tela Editar Formulário permite modificar uma submissão de formulário existente. Você pode atualizar dados, adicionar novas informações ou salvar suas alterações como rascunho para concluir depois.

Ao abrir uma submissão de formulário para edição, você vê a mesma interface de formulário usada para entrada de dados, mas com todos os dados salvos anteriormente já preenchidos.

![Visão principal da página Editar Formulário](../imgs/forms/edit-form.png)

## Como editar uma submissão

1.  Navegue até a lista de submissões do seu formulário.
2.  Localize a submissão específica que deseja editar.
3.  Clique no botão **Editar** (geralmente representado por um ícone de lápis) para essa submissão. Isso abre o formulário no modo de edição.
4.  Faça as alterações desejadas em qualquer campo do formulário.
5.  Escolha uma ação na parte inferior do formulário:
    *   **Salvar Rascunho**: Salva suas alterações atuais sem submeter o formulário. Você pode voltar e editá-lo novamente mais tarde.
    *   **Submeter**: Salva todas as alterações e submete os dados atualizados do formulário.

!!! tip "Rastreamento de alterações"
    Dino registra automaticamente as alterações feitas entre a submissão original e a versão editada. Isso cria um histórico de quem mudou o quê e quando.

## Recursos disponíveis

Ao editar, você tem acesso aos mesmos recursos que ao criar uma nova submissão:

*   **Métricas Opcionais**: Alguns formulários podem ter seções ou perguntas opcionais que você pode optar por preencher.
*   **Upload de Arquivos**: Anexe novos arquivos ou substitua os existentes se esse recurso estiver habilitado no seu formulário.
*   **Campos Secundários**: Para determinados pontos de dados, campos adicionais relacionados podem ser exibidos para um preenchimento mais detalhado.
*   **Relacionamentos do Formulário (Dependências)**: Se o formulário incluir campos dependentes, você poderá ver solicitações adicionais com base em respostas anteriores. As dependências são definidas quando o esquema do formulário é criado.

![Diálogo do editor de relacionamentos (dependências) do formulário](../imgs/forms/edit-form-schema-relationships.png)

!!! warning "Integridade dos dados"
    Tenha cuidado ao editar dados críticos. Outros relatórios ou análises podem depender dos valores originalmente submetidos. Considere se criar uma nova submissão corrigida pode ser mais adequado do que editar uma antiga.

## Entendendo a estrutura do formulário

O formulário que você vê durante a edição é baseado em um **esquema de formulário** — o modelo subjacente que define todos os campos, seções e regras. Você pode visualizar uma pré-visualização compilada do esquema do formulário no designer.

![Visualização do formulário compilado após clicar em Ver o Formulário](../imgs/forms/edit-form-view.png)

O próprio esquema pode ser editado separadamente. Se você precisar alterar a estrutura de um formulário (adicionar ou remover campos, ajustar a validação), consulte [Editar Esquema do Formulário](edit-form-schema.md).

![Visão principal da página Editar Esquema do Formulário](../imgs/forms/edit-form-schema.png)

## Ações relacionadas

*   Para entender a estrutura do próprio formulário, consulte [Editar Esquema do Formulário](edit-form-schema.md).
*   Para criar uma nova submissão do zero, normalmente você começa pela página principal [Formulários](index.md).
*   Para navegar pelos seus formulários e submissões em um mapa, consulte [Mapa de Formulários](forms-map.md).