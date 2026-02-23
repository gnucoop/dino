---
title: Gerenciando Métricas
description: Como navegar, criar, editar, visualizar, importar e excluir entradas de métricas (áreas, casos, localizações, organizações, projetos) no Dino.
---

# Gerenciando Métricas

No Dino, você pode gerenciar diferentes tipos de dados estruturados, chamados de métricas. Isso inclui Áreas Temáticas, Casos, Localizações, Projetos e Organizações. Você acessa cada tipo pela navegação principal. Cada tipo de métrica tem uma página de gerenciamento dedicada com um layout consistente para visualizar e gerenciar suas entradas.

![Gerenciando Métricas](../imgs/metrics/managing-metrics.png)

!!! note "Permissão necessária"
    Gerenciar valores de métricas requer permissões específicas. Se você não consegue ver as opções de criar, editar ou excluir, entre em contato com seu administrador.

---

## Navegando na Lista

A página principal mostra uma lista de todas as entradas para o tipo de métrica selecionado. Você pode:

*   **Pesquisar e Filtrar**: Use a barra de pesquisa acima da lista para encontrar entradas por nome ou outros atributos.
*   **Ordenar**: Clique nos cabeçalhos das colunas marcados com um ícone de ordenação para reorganizar a lista.
*   **Exportar**: Clique no botão **Exportar** na barra de ferramentas para baixar a lista atual como um arquivo.
*   **Selecionar ou Expandir**: Clique em qualquer lugar de uma linha para selecioná-la. Clique no ícone de expansão para ver mais detalhes.

---

## Criando uma Nova Entrada

1.  Clique no botão **+** (o botão flutuante circular no canto inferior direito da tela).
2.  Um diálogo será aberto com campos para a nova entrada.
3.  Preencha as informações necessárias e clique em **Salvar**.

---

## Editando ou Visualizando uma Entrada

Cada linha na lista tem ícones de ação no lado direito.

1.  Para visualizar os detalhes de uma entrada sem editá-la, clique no ícone **Visualizar (olho)**.
2.  Para editar uma entrada, clique no ícone **Editar (lápis)**.
3.  O mesmo diálogo de edição é aberto, preenchido com os dados atuais da entrada. Faça suas alterações e clique em **Salvar**.

---

## Excluindo Entradas

Você pode excluir entradas individualmente ou em massa.

**Para excluir uma única entrada:**
1.  Clique no ícone **Excluir (lixeira)** na linha que deseja remover.
2.  Um diálogo de confirmação aparecerá. Clique em **Confirmar** para excluir a entrada permanentemente.

**Para excluir várias entradas:**
1.  Selecione as entradas marcando as caixas em suas linhas.
2.  Uma barra de ferramentas aparecerá. Clique na ação **Excluir** nesta barra de ferramentas.
3.  Confirme a exclusão no diálogo que aparecer.

---

## Importando Entradas em Massa

Você pode adicionar muitas entradas de uma vez importando-as de um arquivo.

1.  Clique no botão **Importar (upload em nuvem)**, que é um botão flutuante no canto inferior direito da tela.
2.  No diálogo, clique em **Escolher arquivo** e selecione um arquivo `.xls`, `.xlsx` ou `.csv` do seu dispositivo.
3.  (Opcional) Marque a caixa para **Não importar métricas se o nome existir** para evitar criar entradas duplicadas.
4.  Clique em **Aplicar** para iniciar a importação.
5.  Clique em **Fechar** quando o processo estiver completo.

---

## Entendendo o Editor de Entradas

Quando você cria, edita ou visualiza uma entrada, um diálogo é aberto com seus campos. Os campos disponíveis dependem do tipo de métrica.

### Campos Comuns
*   **Nome** *(Obrigatório)*: O nome de exibição para esta entrada. Deve ser único dentro de seu tipo de métrica.
*   **Pai**: Um campo opcional para vincular esta entrada a um pai, criando uma hierarquia (por exemplo, um subprojeto dentro de um projeto). Comece a digitar para pesquisar e selecionar um pai.

### Campos Específicos da Métrica

| Tipo de Métrica | Campos Principais (Além de Nome e Pai) |
| :--- | :--- |
| **Áreas Temáticas** | Nenhum campo padrão adicional. |
| **Casos** | **Código** (somente leitura), **Imagem** (fazer upload ou tirar uma foto). |
| **Localizações** | **Coordenadas**. |
| **Organizações** | **Caminho do Logotipo**, **URL do Site**. |
| **Projetos** | **Código**, **Setores de Intervenção**, **Doadores**, **Data de Início**, **Data de Término**. |

### Atributos Adicionais

Abaixo dos campos padrão, você encontrará uma seção **Atributos adicionais**. Aqui você pode anexar pares chave-valor personalizados a uma entrada.
*   Clique em **+** para adicionar uma nova linha de atributo.
*   Clique em **-** ao lado de um atributo para removê-lo.
*   Esta seção fica oculta no modo de visualização se nenhum atributo personalizado existir.

### Salvando Seu Trabalho
Clique em **Salvar** para criar ou atualizar a entrada. Uma breve mensagem de confirmação aparecerá.

!!! warning "Erros ao Salvar"
    Se você vir um erro ao salvar, verifique se todos os campos obrigatórios estão preenchidos e se o nome da entrada não está já em uso. Se o problema persistir, entre em contato com seu administrador.

!!! warning "Upload de Imagem Offline"
    Se você salvar uma entrada com uma imagem enquanto estiver offline, a imagem não será enviada. Você deve salvar a entrada novamente quando estiver online para fazer o upload do arquivo de imagem.