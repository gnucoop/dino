---
title: Gerenciando Idiomas
description: Como gerenciar traduções da aplicação, incluindo adicionar idiomas, editar textos e exportar arquivos.
---

# Gerenciando Idiomas

A página **Idiomas** permite que administradores gerenciem todos os textos traduzidos usados em todo o Dino. A partir daqui, você pode navegar, editar e adicionar traduções, gerenciar quais idiomas estão disponíveis e exportar arquivos de tradução para backup ou edição.

![Gerenciando Idiomas](../imgs/administration/languages.png)

!!! warning "Acesso apenas para administradores"
    Esta área é visível apenas para usuários com a função de Administrador. Se você não consegue vê-la na navegação, entre em contato com o administrador do sistema.

---

## Navegando pelas Traduções

A visualização principal mostra uma lista de todas as entradas de tradução. Cada entrada exibe sua **chave** — o identificador interno usado pela aplicação — e, quando um idioma é selecionado, o texto traduzido correspondente.

Um indicador de carregamento é exibido enquanto os dados de tradução estão sendo buscados.

### Filtrando a Lista

Dois controles no topo da página permitem restringir as entradas exibidas:

- **Busca por palavra-chave** — digite qualquer palavra para filtrar entradas cuja chave ou tradução contenha aquele texto. A lista é atualizada enquanto você digita.
- **Seletor de idioma** — uma linha de botões mostra **Chave** e um botão para cada idioma disponível. Clique no nome de um idioma para exibir as traduções daquele idioma ao lado de cada chave. Entradas sem tradução para o idioma selecionado são mostradas como *(Sem tradução)*.

---

## Editando uma Entrada de Tradução

1. Clique em qualquer entrada da lista para abrir a caixa de diálogo **Editar Tradução**.
2. A caixa de diálogo mostra a **chave** e um campo de texto para cada idioma disponível.
3. Atualize as traduções conforme necessário.
4. Clique em **Salvar** para aplicar suas alterações, ou em **Desfazer** para fechar sem salvar.

Você também pode remover permanentemente uma entrada individual desta caixa de diálogo clicando no botão **Remover**. Isso exclui a chave de tradução e todas as suas traduções associadas.

!!! warning
    Remover uma entrada de tradução é permanente. A chave e todos os seus valores de idioma serão excluídos.

---

## Adicionando uma Nova Entrada de Tradução

Use isso quando precisar adicionar uma chave de tradução que ainda não existe no sistema.

1. Clique no botão **+ Tradução** na barra de ferramentas.
2. A caixa de diálogo **Adicionar Tradução** será aberta. Ela contém um campo de texto para cada idioma atualmente ativo.
3. Insira o texto da tradução para cada idioma conforme necessário.
4. Clique em **Salvar** para adicionar a nova entrada, ou em **Desfazer** para cancelar.

Uma mensagem de confirmação aparecerá brevemente após a entrada ser salva.

---

## Gerenciando Idiomas

Use isso para adicionar um novo idioma, atualizar as traduções de um idioma existente ou remover um conjunto de traduções personalizado.

1. Clique no botão **Idioma** na barra de ferramentas.
2. A caixa de diálogo **Configurações de Idioma** será aberta. Ela mostra uma lista de idiomas disponíveis e fornece as seguintes ações:

### Adicionando um Novo Idioma

1. Clique no botão **+** no topo da caixa de diálogo.
2. Um formulário aparecerá solicitando um **rótulo de idioma** (o nome que aparecerá na interface, por exemplo "Francês" ou "fr").
3. Opcionalmente, faça upload de um **arquivo de tradução JSON** clicando em **Adicionar JSON** e selecionando um arquivo do seu dispositivo. O conteúdo do arquivo será visualizado antes de salvar.
4. Clique em **Salvar** para adicionar o idioma, ou em **Desfazer** para cancelar.

### Visualizando um Idioma Existente

Clique em um botão com o nome do idioma para selecioná-lo. A caixa de diálogo mostrará uma prévia de todas as chaves e valores de tradução atualmente armazenados para aquele idioma.

### Atualizando as Traduções de um Idioma

Com um idioma selecionado, clique em **Atualizar tradução** para fazer upload de um novo arquivo JSON. A caixa de diálogo mostrará uma prévia das alterações — novas chaves adicionadas e chaves modificadas — antes de você salvar.

1. Clique em **Atualizar tradução** e selecione um arquivo JSON do seu dispositivo.
2. Revise a prévia mostrando as linhas adicionadas e modificadas.
3. Clique em **Salvar** para aplicar a atualização, ou em **Desfazer** para cancelar.

### Removendo uma Tradução Personalizada

Com um idioma selecionado, clique em **Remover tradução personalizada** para excluir os dados de tradução personalizada daquele idioma.

!!! warning
    Isso remove as traduções personalizadas para o idioma selecionado. O idioma em si pode permanecer no sistema, mas seu conteúdo personalizado será perdido.

---

## Exportando Traduções

Você pode baixar os dados de tradução de qualquer idioma como um arquivo JSON.

1. Clique no botão **Exportar** (ícone de download) na barra de ferramentas.
2. A caixa de diálogo **Exportar** será aberta mostrando uma lista de idiomas disponíveis.
3. Clique no nome do idioma que deseja exportar. Uma prévia dos seus dados de tradução aparecerá à direita.
4. Clique em **Baixar** para salvar o arquivo no seu dispositivo.