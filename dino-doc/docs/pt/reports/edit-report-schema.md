---
title: Editar esquema de relatório
description: Crie ou modifique um esquema de relatório importando um arquivo XLSReport e verifique-o na pré-visualização antes de salvar.
---

# Editar esquema de relatório

A página **Editar esquema de relatório** permite criar um novo esquema de relatório ou modificar um existente. Um esquema de relatório define a estrutura, o layout e as fontes de dados de um relatório no Dino. O seu conteúdo vem de um arquivo [XLSReport](xlsreport.md) que você importa nesta página.

![Vista principal da página Editar esquema de relatório](../imgs/reports/edit-report-schema.png)

## Campos da página

| Campo | Descrição |
|-------|-------------|
| **Nome do relatório** | Obrigatório. Deve ser único: se já estiver em uso, a página mostra *Este nome já está a ser utilizado.* |
| **Rótulo do relatório** | Obrigatório. O nome exibido em listas e cartões. |
| **Conjunto de ícones** | **Padrão** ou **Humanitarian**. |
| **Ícone do formulário** | Escolha um ícone na lista de preenchimento automático. A pré-visualização é atualizada em tempo real. |
| **Métricas necessárias** | As métricas que devem ser escolhidas quando um relatório é gerado a partir deste esquema. |

Abaixo dos campos, a página mostra:

- **Esquemas de formulário associados** – os esquemas de formulário que o relatório utiliza, somente leitura. Eles são obtidos do arquivo XLSReport importado quando você salva.
- **Pré-visualização do relatório** – o relatório renderizado a partir do esquema importado ou salvo.

As fontes de dados, colunas e filtros são todos definidos no arquivo XLSReport: a página não tem controles para escolhê-los.

## Criar um novo esquema de relatório

1. Abra a seção **Relatórios** no menu principal.
2. Clique no botão **+** (*Add new Reports schema*) no canto inferior direito.
3. Insira o **Nome do relatório** e o **Rótulo do relatório** e, opcionalmente, o ícone e as **Métricas necessárias**.
4. Clique em **Importar** e depois em **Escolha um arquivo** e selecione o seu arquivo XLSReport (.xls ou .xlsx).
5. Clique em **Aplicar**: o arquivo é carregado na página e exibido na **Pré-visualização do relatório**.
6. Clique em **Salvar** para armazenar o esquema. **Salvar** permanece desativado até que os campos obrigatórios sejam válidos.

!!! warning "Importar antes de salvar"
    Um novo esquema de relatório não pode ser salvo sem um arquivo importado: salvá-lo vazio mostra *Oops! Something went wrong saving the Report*. **Aplicar** apenas carrega o arquivo na página; nada é armazenado até que você clique em **Salvar**.

## Editar um esquema de relatório existente

1. Abra a seção **Relatórios**.
2. No cartão do esquema de relatório, clique no ícone de lápis (*Editar esquema de relatório*).
3. Altere os campos ou importe um novo arquivo XLSReport para substituir o conteúdo do relatório.
4. Clique em **Salvar** para atualizar o esquema.

Para excluir um esquema de relatório, clique no ícone de lixo (*Eliminar esquema de relatório*) no seu cartão. Um esquema que ainda tem relatórios não pode ser excluído: exclua primeiro os seus relatórios.

## Próximos passos

Depois de salvar o seu esquema de relatório, você pode:

* Navegar até a página [Relatórios](index.md) para visualizar e executar o seu novo relatório.
* Usar [Editar relatório](edit-report.md) para trabalhar com o próprio relatório depois que o esquema estiver pronto.
* Voltar a esta página para fazer mais ajustes conforme necessário.