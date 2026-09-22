---
title: Gerenciando Idiomas
description: Como gerenciar as traduções do aplicativo, incluindo adicionar idiomas, editar textos e exportar arquivos.
---

# Gerenciando Idiomas

A página **Idiomas** permite que administradores gerenciem todos os textos traduzidos usados no Dino. Aqui você pode navegar, editar e adicionar traduções, gerenciar quais idiomas estão disponíveis e exportar arquivos de tradução para backup ou edição.

![Visão principal da página Idiomas](../imgs/administration/languages.png)

!!! warning "Apenas para administradores"
    Esta área é visível apenas para usuários com o papel de Administrador. Se você não consegue vê-la na navegação, entre em contato com o administrador do sistema.

---

## Navegando pelas Traduções

A visão principal exibe uma lista de todas as entradas de tradução. Cada entrada mostra sua **chave** — o identificador interno usado pelo aplicativo — e, quando um idioma está selecionado, o texto traduzido correspondente.

Um indicador de carregamento é exibido enquanto os dados de tradução estão sendo buscados.

### Filtrando a Lista

Dois controles no topo da página permitem restringir as entradas exibidas:

- **Busca por palavra-chave** — digite qualquer palavra para filtrar entradas cuja chave ou tradução contenha esse texto. A lista é atualizada conforme você digita.
- **Seletor de idioma** — uma linha de botões mostra **Chave** e um botão para cada idioma disponível. Clique no nome de um idioma para exibir as traduções desse idioma ao lado de cada chave. Entradas sem tradução para o idioma selecionado são exibidas como *(Sem tradução)*.

---

## Editando uma Entrada de Tradução

1. Clique em qualquer entrada da lista para abrir a caixa de diálogo **Editar Tradução**.
2. A caixa de diálogo mostra a **chave** e um campo de texto para cada idioma disponível.
3. Atualize as traduções conforme necessário.
4. Clique em **Salvar** para aplicar as alterações, ou em **Desfazer** para fechar sem salvar.

Você também pode remover permanentemente uma entrada individual nesta caixa de diálogo clicando no botão **Remover**. Isso exclui a chave de tradução e todas as suas traduções associadas.

!!! warning
    Remover uma entrada de tradução é permanente. A chave e todos os seus valores de idioma serão excluídos.

---

## Adicionando uma Nova Entrada de Tradução

Use esta opção quando precisar adicionar uma chave de tradução que ainda não existe no sistema.

1. Clique no botão **+ Tradução** na barra de ferramentas.
2. A caixa de diálogo **Adicionar Tradução** será aberta. Ela contém um campo de texto para cada idioma ativo no momento.
3. Insira o texto da tradução para cada idioma conforme necessário.
4. Clique em **Salvar** para adicionar a nova entrada, ou em **Desfazer** para cancelar.

Uma mensagem de confirmação aparecerá brevemente após a entrada ser salva.

---

## Gerenciando Idiomas

Use esta opção para adicionar um novo idioma, atualizar as traduções de um idioma existente ou remover um conjunto de traduções personalizado.

1. Clique no botão **Idioma** na barra de ferramentas.
2. A caixa de diálogo **Configurações de Idioma** será aberta. Ela mostra uma lista de idiomas disponíveis e oferece as seguintes ações:
   - **Botão +** para adicionar um novo idioma.
   - Clique no nome de um idioma na lista para selecioná-lo e visualizar uma prévia de suas traduções.
   - **Atualizar tradução** (com um idioma selecionado) para enviar um novo arquivo JSON.
   - **Remover tradução personalizada** para excluir os dados de tradução personalizados do idioma selecionado.

### Adicionando um Novo Idioma

1. Clique no **botão +** no topo da caixa de diálogo.
2. Um formulário aparecerá solicitando um **rótulo de idioma** (o nome que aparecerá na interface, por exemplo "Francês" ou "fr").
3. Opcionalmente, envie um **arquivo de tradução JSON** clicando em **Adicionar JSON** e selecionando um arquivo do seu dispositivo. O conteúdo do arquivo será pré-visualizado antes de salvar.
4. Clique em **Salvar** para adicionar o idioma, ou em **Desfazer** para cancelar.

### Visualizando um Idioma Existente

Clique no botão com o nome de um idioma para selecioná-lo. A caixa de diálogo mostrará uma prévia de todas as chaves e valores de tradução armazenados atualmente para esse idioma.

### Atualizando as Traduções de um Idioma

Com um idioma selecionado, clique em **Atualizar tradução** para enviar um novo arquivo JSON. A caixa de diálogo fará uma prévia das alterações — novas chaves adicionadas e chaves modificadas — antes de você salvar.

1. Clique em **Atualizar tradução** e selecione um arquivo JSON do seu dispositivo.
2. Revise a prévia mostrando as linhas adicionadas e modificadas.
3. Clique em **Salvar** para aplicar a atualização, ou em **Desfazer** para cancelar.

### Removendo uma Tradução Personalizada

Com um idioma selecionado, clique em **Remover tradução personalizada** para excluir os dados de tradução personalizados desse idioma.

!!! warning
    Isso remove as traduções personalizadas do idioma selecionado. O idioma em si pode permanecer no sistema, mas seu conteúdo personalizado será perdido.

---

## Exportando Traduções

Você pode baixar os dados de tradução de qualquer idioma como um arquivo JSON.

1. Clique no botão **Exportar** (ícone de download) na barra de ferramentas.
2. A caixa de diálogo **Exportar** será aberta mostrando uma lista de idiomas disponíveis.
3. Clique no nome do idioma que deseja exportar. Uma prévia dos seus dados de tradução aparecerá à direita.
4. Clique em **Baixar** para salvar o arquivo no seu dispositivo.