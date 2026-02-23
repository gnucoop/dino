---
title: Gerenciamento de Esquemas de Formulário
description: Como criar e editar esquemas de formulário no Dino, incluindo o construtor de formulários, status, métricas e opções de importação.
---

# Gerenciamento de Esquemas de Formulário

Os esquemas de formulário definem a estrutura e os campos utilizados na coleta de dados. Administradores e usuários com as permissões adequadas podem criar novos esquemas, editar os existentes e configurar seu comportamento.

![Gerenciando Esquemas de Formulário](../imgs/forms/managing-templates.png)

!!! warning "Permissão necessária"
    O gerenciamento de esquemas de formulário requer permissões específicas. Se você não consegue ver as opções de criar ou editar, entre em contato com seu administrador.

---

## Acessando o Gerenciamento de Esquemas

No hub de Coleta de Dados, navegue até o esquema que deseja editar e clique na ação **editar**, ou use a navegação para acessar a opção **Criar** para um novo esquema. Ambos os caminhos abrem o mesmo editor de esquema.

---

## Configurações do Esquema

No topo do editor, preencha os seguintes campos antes de projetar a estrutura do formulário:

- **Nome do Formulário** — um identificador interno único para este esquema. Um erro será exibido se o nome já estiver em uso.
- **Rótulo do Formulário** — o nome de exibição mostrado aos usuários na interface.
- **Conjunto de Ícones** — escolha entre *Padrão* (ícones padrão) e *Humanitário* (ícones específicos para contextos humanitários).
- **Identificador do Ícone** — digite para pesquisar e selecionar o ícone que representa este formulário.
- **Status do Formulário** — selecione um ou mais status de fluxo de trabalho pelos quais as entradas criadas com este esquema podem passar. Você também pode criar novos status ou editar os existentes diretamente: clique no ícone **editar** ao lado de um status ou selecione **Criar novo Status** na parte inferior da lista suspensa.
- **Métricas do Formulário** — selecione os tipos de métrica (como projeto, localização ou organização) aos quais as entradas criadas com este esquema serão vinculadas.
- **Visibilidade** — defina como *Privado* (acessível apenas para usuários autorizados) ou *Público* (compartilhável via um link público).
- **Comportamento do Conjunto de Métricas** — *Padrão* permite múltiplas entradas com a mesma combinação de métricas; *Único* impede conjuntos de métricas duplicados para este formulário.
- **Gerar Relatório** — se definido como *Sim*, um relatório automático será gerado e vinculado a este esquema quando ele for salvo. Esta opção só é exibida se nenhum relatório automático já existir para o esquema.

---

## Construindo a Estrutura do Formulário

A seção inferior da página contém o construtor de formulários, onde você pode adicionar, organizar e configurar os campos que aparecerão quando os usuários preencherem este formulário.

Use os controles do construtor de formulários para:

- Adicionar novos campos (texto, número, data, arquivo, escolha e mais)
- Organizar campos em páginas ou seções
- Definir rótulos, dicas e regras de validação dos campos

O botão **Salvar** permanece desabilitado se o construtor de formulários reportar quaisquer erros de validação. Resolva todos os erros antes de tentar salvar.

---

## Importando uma Estrutura de Formulário

Se você tem uma definição de formulário existente no formato XLSForm, pode importá-la em vez de construir a estrutura manualmente.

1. Clique no botão **Importar** na barra de ferramentas.
2. Selecione seu arquivo XLSForm do seu dispositivo.
3. Revise a estrutura importada no construtor de formulários.
4. Faça os ajustes necessários e salve.

---

## Configurando Relacionamentos

!!! note "Apenas esquemas existentes"
    O botão Relacionamentos só está disponível ao editar um esquema existente, não ao criar um novo.

Clique no botão **Relacionamentos** para abrir o editor de relacionamentos. Isso permite vincular campos neste formulário a dados de outros formulários, para que certos valores de campo ou opções de lista suspensa possam ser preenchidos automaticamente com base em dados de formulários relacionados.

---

## Salvando o Esquema

Clique em **Salvar** para salvar o esquema. Uma mensagem de confirmação aparecerá brevemente na parte inferior da tela.

Após salvar, você será retornado ao hub de Coleta de Dados.

!!! warning "Ops! Algo deu errado ao salvar o Formulário"
    Se uma mensagem de erro aparecer ao salvar, verifique se os campos **Nome do Formulário** e **Rótulo do Formulário** estão preenchidos e se o Nome do Formulário não está sendo usado por outro esquema. Se o problema persistir, entre em contato com seu administrador.