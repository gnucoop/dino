---
title: Gerenciando Esquemas de Relatórios
description: Como criar e editar esquemas de relatórios no Dino, incluindo campos, métricas obrigatórias, importação XLS e a pré-visualização ao vivo.
---

# Gerenciando Esquemas de Relatórios

Os esquemas de relatório definem a estrutura e o layout dos relatórios gerados. Administradores e usuários com as permissões apropriadas podem criar novos esquemas e editar os existentes.

![Gerenciando Esquemas de Relatórios](../imgs/reports/managing-templates.png)

!!! note "Permissão necessária"
    O gerenciamento de esquemas de relatório requer permissões específicas. Se você não consegue ver as opções de criar ou editar, entre em contato com seu administrador.

---

## Acessando o Gerenciamento de Esquemas

No hub de Relatórios, navegue até o esquema que deseja editar e clique na ação **editar**, ou use a navegação para acessar a opção **Criar** para um novo esquema.

---

## Configurações do Esquema

Preencha os seguintes campos para configurar o esquema:

- **Nome do Relatório** — um identificador interno único para este esquema. Um erro será exibido se o nome já estiver em uso.
- **Rótulo do Relatório** — o nome de exibição mostrado aos usuários na interface.
- **Conjunto de Ícones** — escolha entre *Padrão* (ícones padrão) e *Humanitário* (ícones específicos para contextos humanitários).
- **Identificador do Ícone** — digite para pesquisar e selecionar o ícone que representa este esquema.
- **Métricas Obrigatórias** — selecione um ou mais tipos de métrica (como projeto, localização ou organização) que devem ser fornecidos ao gerar um relatório a partir deste esquema.

---

## Esquemas de Formulário Associados

Abaixo dos campos de configuração, uma seção somente leitura lista os esquemas de formulário vinculados a este esquema de relatório. Eles são definidos pelo sistema e não podem ser alterados nesta tela.

---

## Pré-visualização do Relatório

Uma pré-visualização ao vivo do layout do relatório é exibida no lado direito da tela. A pré-visualização é atualizada conforme você faz alterações na estrutura do esquema.

---

## Importando uma Estrutura de Relatório

Se você tem uma definição de relatório existente em formato XLS, pode importá-la em vez de construir a estrutura manualmente.

1. Clique no botão **Importar**.
2. Selecione seu arquivo XLS do seu dispositivo.
3. Revise a estrutura importada no editor.
4. Faça os ajustes necessários e salve.

---

## Salvando o Esquema

Clique em **Salvar** para salvar o esquema. Uma mensagem de confirmação aparecerá brevemente na parte inferior da tela. Após salvar, você será redirecionado para o hub de Relatórios.

!!! warning "Ops! Algo deu errado ao salvar o Relatório"
    Se uma mensagem de erro aparecer ao salvar, verifique se os campos **Nome do Relatório** e **Rótulo do Relatório** estão preenchidos e se o Nome do Relatório não está sendo usado por outro esquema. Se o problema persistir, entre em contato com seu administrador.