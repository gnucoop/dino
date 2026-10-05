---
title: Relatório automático
description: Criar ou modificar um relatório gerado automaticamente
---

# Relatórios automáticos

Um relatório automático é um relatório que o Dino cria para você a partir de um form schema. Você não o escreve por conta própria: você o ativa ao editar o form schema, e o Dino cria o report schema e um primeiro relatório para você.

Use um relatório automático quando quiser ver os dados que um form coleta sem antes projetar um relatório. Quando precisar de controle total sobre o layout, os cálculos ou os gráficos, crie o relatório com o [formato XLSReport](xlsreport.md).

## Ativar um relatório automático

1. Abra a seção **Formulários** e selecione o form schema para o qual você quer o relatório.
2. Vá para a aba **Configurações**.
3. Defina **Gerar relatório** como **Sim**.
4. Salve o form schema.

O Dino cria o relatório alguns segundos após salvar. Você pode encontrá-lo na seção [Relatórios](index.md), listado como qualquer outro relatório.

## O que o Dino cria

Salvar um form schema com **Gerar relatório** definido como **Sim** produz duas coisas:

| Item | Detalhes |
|---|---|
| Um report schema | Nomeado a partir do form, com o rótulo **&lt;rótulo do form&gt; Auto Report** e o mesmo ícone do form. Ele permanece vinculado ao form schema a partir do qual foi gerado. |
| Um primeiro relatório | Criado alguns segundos depois, datado com o dia atual e atribuído a você. Ele não tem filtro de área, caso, posição, organização ou projeto, portanto abrange todos os dados que o form coletou. |

Você pode abrir o relatório gerado e trabalhar com ele como qualquer outro: o relatório que ele produz é um ponto de partida, não um resultado fixo.

## Desativar um relatório automático

Depois que um relatório automático existe, o campo **Gerar relatório** no form schema fica travado em **Sim** e mostra uma dica nesse sentido. Não há como remover o relatório a partir dessa tela.

Para removê-lo, vá para a seção **Relatórios** e exclua o report schema do relatório gerado junto com seus dados. O campo no form schema é desbloqueado assim que o relatório desaparece, e você pode defini-lo de volta como **Não**.

## Páginas relacionadas

- [Editar form schema](../forms/edit-form-schema.md) — onde fica a opção **Gerar relatório**
- [O formato XLSReport](xlsreport.md) — para relatórios que você mesmo projeta
- [Relatórios](index.md) — a seção onde os relatórios gerados aparecem