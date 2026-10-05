---
title: Editar um envio de formulário
description: Saiba como editar um envio de formulário existente no Dino, incluindo métricas de formulário, rascunhos e como salvar suas alterações.
---

# Editar um envio de formulário

A tela Editar formulário permite modificar um envio que já foi salvo. Você vê a mesma interface de formulário usada para entrada de dados, mas com todas as respostas salvas anteriormente já preenchidas. A partir daqui, você pode corrigir valores, completar informações faltantes ou salvar seu progresso como rascunho e terminar depois.

![Visão principal da página Editar formulário](../imgs/forms/edit-form.png)

## Como abrir um envio para edição

1. Acesse a página [Formulários](index.md).
2. Abra o form schema que contém o envio.
3. Localize o envio que deseja alterar na lista de envios.
4. Passe o mouse sobre a linha dele e clique no ícone **Editar** (lápis), ou clique na linha para selecioná-la e clique em **Editar** na barra de ações acima da tabela. A tela Editar formulário abre com os dados salvos carregados.

## Trabalhando com Métricas de formulário

Se o seu formulário usa métricas, a tela abre na etapa **Métricas de formulário** antes de mostrar o questionário. Esses valores determinam como o envio é datado e agrupado em reports e agregações — eles não fazem parte do questionário em si.

1. Revise ou altere a **Data de criação** clicando em **Alterar** e escolhendo uma nova data.
2. Preencha todos os campos de métrica exibidos, como localização, projeto ou organização.
3. Se o form schema tiver status, escolha o **Estado do formulário** do envio.
4. Clique em **Preencher o formulário** para avançar ao questionário. Quando você abriu o envio com **Ver**, o botão exibe **Ver o formulário**.

!!! tip "Criando uma nova métrica na hora"
    Se uma métrica de que você precisa ainda não existe, clique em **Novo** ao lado do campo de métrica para criá-la sem sair do formulário. Esta opção só aparece se você tiver permissão para criar métricas.

![A etapa Métricas de formulário](../imgs/forms/index-create.png)

## Editando suas respostas

Depois que o questionário é exibido, você pode alterar qualquer campo que tenha permissão para editar. Dependendo de como o formulário foi configurado, os campos podem estar organizados em uma, duas ou três colunas, e alguns podem ser validados enquanto você digita.

1. Clique em um campo e atualize seu valor.
2. Avance pelas etapas ou seções restantes do questionário.
3. Quando terminar, escolha uma ação no topo do formulário:
    * **Salvar forma**: Salva todas as suas alterações e atualiza o envio.
    * **Salve o rascunho**: Armazena suas alterações atuais sem finalizá-las, para que você possa voltar e continuar depois. Este botão só aparece se os rascunhos estiverem habilitados para o seu formulário.

!!! tip "Acompanhando alterações"
    Quando o módulo de logs está habilitado na sua instância do Dino, o Dino registra as alterações feitas em cada envio. Selecione um envio na lista e clique em **Ver histórico** na barra de ações para ver quem alterou o quê e quando.

!!! warning "Editando dados críticos"
    Outros reports ou análises podem depender dos valores neste envio. Se você está corrigindo um erro grave, considere se um novo envio pode ser mais apropriado do que alterar um antigo.

## Revisando o formulário enviado

Se você abrir um envio com a ação **Ver** em vez de **Editar**, o formulário abre em modo somente leitura. Todos os campos ficam visíveis, mas não podem ser editados, e as ações de salvar ficam indisponíveis. Use esta visualização para verificar o que foi registrado.

![Visualização do formulário preenchido após clicar em Ver o formulário](../imgs/forms/edit-form-view.png)

## Ações relacionadas

* Para alterar a estrutura do próprio formulário — seus campos, seções e regras de validação — consulte [Editar form schema](edit-form-schema.md).
* Para entender como os campos se relacionam entre si e como as dependências se comportam, consulte as opções de relacionamentos em [Editar form schema](edit-form-schema.md).
* Para ver os envios em um mapa, consulte [Mapa de formulários](forms-map.md).
* Para criar um envio totalmente novo, comece pela página [Formulários](index.md).