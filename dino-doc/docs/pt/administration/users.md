---
title: Gerenciando Usuários e Grupos
description: Como criar, editar e gerenciar contas de usuário e grupos de permissão no Dino.
---

# Gerenciando Usuários e Grupos

A área de Usuários permite que administradores gerenciem quem pode acessar o Dino e o que eles têm permissão para fazer. Ela é dividida em duas seções: **Usuários**, para contas individuais, e **Grupos**, para conjuntos de permissões que podem ser atribuídos a vários usuários de uma vez.

![Gerenciando Usuários e Grupos](../imgs/administration/users.png)

!!! warning "Acesso apenas para administradores"
    Esta área é visível apenas para usuários com a função de Administrador. Se você não consegue vê-la na navegação, entre em contato com o administrador do sistema.

---

## Navegando na Área de Usuários

Ao abrir a área de Usuários, você verá um menu com duas opções:

- **Usuários** — gerenciar contas de usuário individuais.
- **Grupos** — gerenciar grupos de permissão.

Clique em qualquer opção para abrir a seção correspondente.

---

## Usuários

### Navegando pela Lista de Usuários

A lista de Usuários mostra todas as contas no sistema, exibindo o **endereço de e-mail**, **nome completo** de cada usuário e um botão de alternância **Desativado** indicando se a conta está ativa no momento.

O número total de usuários que correspondem aos filtros atuais é mostrado no topo da lista.

### Pesquisando e Filtrando

- Digite no campo de **pesquisa por palavra-chave** para filtrar usuários por qualquer texto em seus detalhes.
- Use os campos **Data de** e **Data até** para filtrar pela data de criação da conta.
- Use o filtro **Grupos de Usuários** para mostrar apenas usuários que pertencem a um grupo de permissão específico.
- Limpe qualquer filtro clicando no ícone **×** dentro desse campo.

### Ativando ou Desativando um Usuário

Cada linha contém um botão de alternância na coluna **Desativado**. Clique no botão diretamente na lista para ativar ou desativar uma conta de usuário sem abrir o editor.

### Adicionando um Novo Usuário

!!! note
    Criar novas contas requer uma conexão ativa com a internet. Se você estiver offline, o botão de adicionar mostrará um ícone de conectividade e a ação não estará disponível.

1. Clique no **botão +** (botão flutuante no canto inferior direito da página).
2. Uma caixa de diálogo será aberta. Preencha os seguintes campos:
    - **Nome Completo** — obrigatório.
    - **E-mail** — obrigatório.
    - **Senha** e **Confirmar Senha** — obrigatórios em algumas instalações (pelo menos 9 caracteres).
    - **Grupos de Permissão do Usuário** — selecione um ou mais grupos no menu suspenso para controlar o que este usuário pode acessar.
3. Clique em **Salvar** para criar a conta.

Uma mensagem de confirmação aparecerá na parte inferior da tela quando o usuário for salvo com sucesso.

### Editando um Usuário

1. Encontre o usuário na lista e clique no **ícone de lápis** em sua linha.
2. A caixa de diálogo do editor será aberta no modo de edição. Você pode atualizar o **Nome Completo** e os **Grupos de Permissão do Usuário**.
3. Clique em **Salvar** para aplicar suas alterações ou em **Fechar** para descartá-las.

### Visualizando um Usuário

Clique no **ícone de olho** na linha de um usuário para abrir seus detalhes no modo somente leitura. Nenhuma alteração pode ser feita neste modo. Clique em **Fechar** quando terminar.

### Excluindo um Usuário

1. Clique no **ícone de exclusão** na linha do usuário.
2. Uma solicitação de confirmação aparecerá. Confirme para excluir permanentemente a conta.

!!! warning
    Excluir uma conta de usuário é permanente e não pode ser desfeito.

---

## Grupos

Grupos de permissão definem quais áreas, formulários, relatórios e dados um conjunto de usuários pode acessar. Atribuir um usuário a um grupo concede a ele todas as permissões definidas para esse grupo.

### Navegando pela Lista de Grupos

A lista de Grupos mostra todos os grupos de permissão por nome. A contagem total é mostrada no topo da página.

### Pesquisando e Filtrando

- Use o campo de **pesquisa por palavra-chave** para filtrar grupos por nome.
- Use os campos **Data de** e **Data até** para filtrar pela data de criação.
- Use os filtros de métrica (**Projeto**, **Localização**, **Área Temática**, **Caso**, **Organização**) para encontrar grupos associados a escopos de dados específicos.
- Limpe qualquer filtro clicando no ícone **×** dentro desse campo.

### Adicionando um Novo Grupo

1. Clique no **botão +** (botão flutuante no canto inferior direito da página).
2. Uma caixa de diálogo será aberta mostrando uma lista categorizada de itens disponíveis para atribuir ao grupo. Os itens são agrupados em categorias como **Funções**, **Esquemas de Formulário**, **Status de Formulário**, **Esquemas de Relatório** e quaisquer tipos de métrica ativos.
3. Insira um **nome do grupo** no campo de nome no topo da caixa de diálogo.
4. Selecione os itens que deseja incluir no grupo clicando neles. Pelo menos uma **Função** deve ser selecionada antes que você possa salvar.
5. Clique em **Salvar** para criar o grupo.

Uma mensagem de confirmação aparecerá com o nome do grupo quando ele for salvo.

### Editando um Grupo

1. Clique no **ícone de lápis** na linha de um grupo.
2. A caixa de diálogo do editor será aberta com a configuração atual do grupo pré-carregada.
3. Atualize o nome ou adicione e remova itens conforme necessário. Pelo menos uma Função deve permanecer selecionada.
4. Clique em **Salvar** para aplicar suas alterações.

### Visualizando um Grupo

Clique no **ícone de olho** na linha de um grupo para abrir sua configuração no modo somente leitura. Clique em **Fechar** quando terminar.

### Excluindo um Grupo

1. Clique no **ícone de exclusão** na linha do grupo.
2. Uma solicitação de confirmação aparecerá. Confirme para excluir permanentemente o grupo.

!!! warning
    Excluir um grupo é permanente. Usuários que foram atribuídos apenas a esse grupo perderão as permissões associadas imediatamente.

---

## Solução de Problemas

### "Novas contas de usuário não podem ser criadas enquanto estiver offline."

!!! warning
    Seu dispositivo não está conectado à internet. Novas contas de usuário só podem ser criadas quando online. Verifique sua conexão e tente novamente. A edição e visualização de usuários existentes ainda está disponível offline.

### "Ops! Algo deu errado ao salvar o Usuário."

!!! warning
    O usuário não pôde ser salvo, possivelmente devido a um erro de validação ou a um problema temporário no servidor. Verifique se todos os campos obrigatórios estão preenchidos corretamente e tente novamente. Se o problema persistir, entre em contato com o administrador do sistema.

### "Ops! Algo deu errado ao executar a ação solicitada."

!!! warning
    Esta mensagem pode aparecer ao salvar ou excluir um grupo. Pode indicar um problema no lado do servidor ou um conflito com dados existentes. Tente novamente após um momento. Se o problema continuar, entre em contato com o administrador do sistema.