---
title: Iniciar Sessão
description: Como iniciar sessão no Dino, repor a sua palavra-passe, criar uma conta e utilizar fornecedores de início de sessão externos.
---

# Iniciar Sessão no Dino

A página de início de sessão é o ponto de partida para aceder ao Dino. A partir daqui pode iniciar sessão na sua conta, criar uma nova conta ou recuperar o acesso se se esqueceu da sua palavra-passe. Consoante a forma como a sua organização configurou o Dino, algumas das opções descritas abaixo podem não estar visíveis.

![Main view of the Login page](../imgs/getting-started/login.png)

---

## Iniciar Sessão

Utilize as suas credenciais para aceder à plataforma.

1.  Na página de início de sessão, introduza o seu **nome de utilizador ou endereço de email** no primeiro campo.
2.  Introduza a sua **palavra-passe** no segundo campo.
3.  Clique no **botão de seta** para iniciar sessão.

Se as suas credenciais estiverem corretas, será encaminhado automaticamente para o [Painel de Controlo](../dashboard/index.md).

Se o início de sessão falhar, aparecerá uma mensagem de erro abaixo do formulário. Verifique se o seu email e palavra-passe estão corretos, certificando-se de que não existem espaços extras, e tente novamente.

---

## Repor a Sua Palavra-passe

Se se esqueceu da sua palavra-passe, pode pedir um link de reposição por email.

!!! note "Funcionalidade opcional"
    Esta opção pode não estar disponível na sua instalação. Se não vir o link "Esqueceu-se da sua palavra-passe?", contacte o seu administrador.

1.  Na página de início de sessão, clique em **"Esqueceu-se da sua palavra-passe?"** abaixo do formulário de início de sessão.
2.  Introduza o **endereço de email** associado à sua conta.
3.  Clique no **botão de seta** para enviar o pedido.

Receberá uma mensagem de confirmação no topo do ecrã. Verifique a sua caixa de entrada para um email que contém um link para definir uma nova palavra-passe. Se o email não chegar dentro de alguns minutos, verifique a pasta de spam.

Para voltar ao formulário de início de sessão sem repor a sua palavra-passe, clique em **"Na verdade, lembro-me da minha palavra-passe"**.

Para mais detalhes, consulte a página [Repor Palavra-passe](reset-password.md).

---

## Criar uma Nova Conta

Se ainda não tem uma conta, pode ser possível registar-se diretamente a partir da página de início de sessão.

!!! note "Funcionalidade opcional"
    Esta opção pode não estar disponível na sua instalação. Se não vir o link "Novo utilizador? Criar nova conta", contacte o seu administrador para que seja criada uma conta para si.

1.  Na página de início de sessão, clique em **"Novo utilizador? Criar nova conta"**.
2.  Introduza o seu **nome completo**.
3.  Introduza o seu **endereço de email**.
4.  Escolha uma **palavra-passe** (com pelo menos 9 caracteres).
5.  Volte a introduzir a sua palavra-passe no campo **Confirmar Palavra-passe** para garantir que corresponde.
6.  Se for apresentada uma **Política de Privacidade**, leia o texto e assinale a caixa de verificação para aceitar os termos e condições. Tem de aceitar para poder continuar.
7.  Clique no **botão de seta** para criar a sua conta.

Depois de a sua conta ser criada, iniciará sessão automaticamente e será encaminhado para o [Painel de Controlo](../dashboard/index.md).

Se já tem uma conta, clique em **"Já tem uma conta? Iniciar sessão"** para voltar ao formulário de início de sessão.

---

## Iniciar Sessão com uma Conta Externa

A sua organização pode permitir que inicie sessão com a sua conta Microsoft ou Google existente, em vez de uma palavra-passe separada para o Dino.

!!! note "Funcionalidade opcional"
    Esta opção pode não estar disponível na sua instalação. Os botões só aparecerão se o seu administrador tiver ativado o início de sessão externo.

1.  Na página de início de sessão, clique em **"Iniciar sessão com a Microsoft"** ou **"Iniciar sessão com o Google"**, dependendo da conta que pretende utilizar.
2.  Será redirecionado para a Microsoft ou para o Google para confirmar a sua identidade.
3.  Depois de autorizar o acesso, será redirecionado de volta para o Dino e iniciará sessão automaticamente.

---

## Definições da Página

Um pequeno conjunto de preferências de visualização está disponível diretamente na página de início de sessão.

### Tema Claro / Escuro

Existe um interruptor na parte inferior do formulário, entre um ícone de sol e um ícone de lua. Clique ou deslize-o para alternar entre o **modo claro** e o **modo escuro**. Esta definição tem efeito imediato.

### Seleção de Plataforma

!!! note "Funcionalidade opcional"
    Esta opção pode não estar disponível na sua instalação. Só é apresentada em implementações multiplataforma.

Se for visível uma lista pendente **"Escolha a sua plataforma"**, selecione a plataforma à qual pretende ligar antes de iniciar sessão. A lista pendente mostrará os ambientes que o seu administrador configurou.

---

## Resolução de Problemas

### "Ocorreu um problema ao ligar ao servidor de autenticação ou o seu token expirou."

!!! warning
    A sua sessão anterior expirou ou a ligação ao servidor de autenticação foi interrompida. Isto não é um erro da sua parte. Basta introduzir as suas credenciais e iniciar sessão novamente.

### "Ocorreu um problema durante o processo de sincronização."

!!! warning
    Ocorreu um erro ao sincronizar os seus dados, que pode estar relacionado com uma importação recente de formulários. Reveja os formulários que estava a importar para identificar possíveis problemas e, em seguida, inicie sessão novamente. Se o problema persistir, contacte o seu administrador.

### "A carregar autenticação externa…" sem redirecionamento

!!! warning
    Esta mensagem aparece brevemente quando conclui um início de sessão através da Microsoft ou do Google. Se a página não avançar automaticamente ao fim de alguns segundos, tente iniciar sessão novamente. Se o problema se repetir, contacte o seu administrador para verificar se o serviço de autenticação externa está configurado corretamente.