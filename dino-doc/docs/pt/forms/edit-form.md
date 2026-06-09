---
title: Editar um Envio de Formulário
description: Aprenda como editar um envio de formulário existente no Dino.
---

# Editar um Envio de Formulário

A tela Editar Formulário permite que você modifique um envio de formulário existente. Você pode atualizar dados, adicionar novas informações ou salvar suas alterações como rascunho para concluir depois.

Ao abrir um envio de formulário para editar, você vê a mesma interface de formulário usada para entrada de dados, mas com todos os dados previamente salvos já preenchidos.

![Visão principal da página Editar Formulário](../imgs/forms/edit-form.png)

## Como Editar um Envio

1.  Navegue até a lista de envios do seu formulário.
2.  Localize o envio específico que deseja editar.
3.  Clique no botão **Editar** (geralmente representado por um ícone de lápis) para esse envio. Isso abre o formulário no modo de edição.
4.  Faça as alterações desejadas em qualquer campo do formulário.
5.  Escolha uma ação na parte inferior do formulário:
    *   **Salvar Rascunho**: Salva suas alterações atuais sem enviar o formulário. Você pode voltar e editá-lo novamente mais tarde.
    *   **Enviar**: Salva todas as alterações e envia os dados do formulário atualizados.

!!! tip "Rastreamento de Alterações"
    O Dino registra automaticamente as alterações feitas entre o envio original e a versão editada. Isso cria um histórico de quem alterou o quê e quando.

## Recursos Disponíveis

Durante a edição, você tem acesso aos mesmos recursos de quando cria um novo envio:

*   **Métricas Opcionais**: Alguns formulários podem ter seções ou perguntas opcionais que você pode optar por preencher.
*   **Upload de Arquivos**: Anexe novos arquivos ou substitua os existentes, se esse recurso estiver ativado para o seu formulário.
*   **Campos Secundários**: Para determinados pontos de dados, campos adicionais relacionados podem ser exibidos para uma entrada mais detalhada.
*   **Relacionamentos do Formulário (Dependências)**: Se o formulário incluir campos dependentes, você poderá ver prompts adicionais com base em respostas anteriores. As dependências são definidas quando o esquema do formulário é criado.

![Diálogo do editor de relacionamentos (dependências) do formulário](../imgs/forms/edit-form-schema-relationships.png)

!!! warning "Integridade dos Dados"
    Tenha cuidado ao editar dados críticos. Outros relatórios ou análises podem depender dos valores originais enviados. Considere se criar um novo envio corrigido pode ser mais apropriado do que editar um antigo.

## Entendendo a Estrutura do Formulário

O formulário que você vê durante a edição é baseado em um **esquema de formulário** — o modelo subjacente que define todos os campos, seções e regras. Você pode visualizar uma prévia compilada do esquema do formulário a partir do designer.

![Visualização do formulário compilado após clicar em Ver o Formulário](../imgs/forms/edit-form-view.png)

O próprio esquema pode ser editado separadamente. Se precisar alterar a estrutura de um formulário (adicionar ou remover campos, ajustar validação), consulte [Editar Esquema do Formulário](edit-form-schema.md).

![Visão principal da página Editar Esquema do Formulário](../imgs/forms/edit-form-schema.png)

## Ações Relacionadas

*   Para entender a estrutura do formulário em si, consulte [Editar Esquema do Formulário](edit-form-schema.md).
*   Para criar um novo envio do zero, normalmente você começa pela página principal de [Formulários](index.md).
*   Para navegar pelos seus formulários e envios em um mapa, consulte [Mapa de Formulários](forms-map.md).