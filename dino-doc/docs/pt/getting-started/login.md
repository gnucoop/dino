---
title: Iniciar Sessão
description: Como iniciar sessão no Dino, redefinir a sua palavra-passe, criar uma conta e utilizar fornecedores de login externos.
---

# Iniciar Sessão no Dino

A página de Login é o ponto de partida da sua experiência no Dino. A partir daqui pode iniciar sessão na sua conta, criar uma nova conta ou recuperar o acesso se se esqueceu da sua palavra-passe. Dependendo de como a sua organização configurou o Dino, algumas das opções descritas abaixo podem não estar visíveis na sua instalação.

![Iniciar Sessão](../imgs/getting-started/login.png)

---

## Iniciar Sessão

Utilize as suas credenciais para aceder à plataforma.

1.  Na página de Login, introduza o seu **nome de utilizador ou endereço de email** no primeiro campo.
2.  Introduza a sua **palavra-passe** no segundo campo.
3.  Clique no **botão com a seta** para iniciar sessão.

Se as suas credenciais estiverem corretas, será automaticamente redirecionado para o Dashboard.

Se o início de sessão falhar, aparecerá uma mensagem de erro abaixo do formulário. Verifique novamente se o seu email e palavra-passe estão corretos, garantindo que não existem espaços extra, e tente novamente.

---

## Redefinir a Sua Palavra-passe

Se se esqueceu da sua palavra-passe, pode solicitar um link de redefinição por email.

!!! note "Funcionalidade opcional"
    Esta opção pode não estar disponível na sua instalação. Se não vir o link "Esqueceu-se da sua palavra-passe?", contacte o seu administrador.

1.  Na página de Login, clique em **"Esqueceu-se da sua palavra-passe?"** abaixo do formulário de início de sessão.
2.  Introduza o **endereço de email** associado à sua conta.
3.  Clique no **botão com a seta** para enviar o pedido.

Receberá uma mensagem de confirmação no topo do ecrã. Verifique a sua caixa de entrada para um email contendo um link para definir uma nova palavra-passe. Se o email não chegar dentro de alguns minutos, verifique a sua pasta de spam.

Para voltar ao formulário de início de sessão sem redefinir a sua palavra-passe, clique em **"Na verdade, lembro-me da minha palavra-passe"**.

---

## Criar uma Nova Conta

Se ainda não tem uma conta, poderá registar-se diretamente a partir da página de Login.

!!! note "Funcionalidade opcional"
    Esta opção pode não estar disponível na sua instalação. Se não vir o link "Novo utilizador? Criar nova conta", contacte o seu administrador para que uma conta seja criada para si.

1.  Na página de Login, clique em **"Novo utilizador? Criar nova conta"**.
2.  Introduza o seu **nome completo**.
3.  Introduza o seu **endereço de email**.
4.  Escolha uma **palavra-passe** (com pelo menos 9 caracteres).
5.  Reintroduza a sua palavra-passe no campo **Confirmar Palavra-passe** para garantir que corresponde.
6.  Se for apresentada uma **Política de Privacidade**, leia o texto e marque a caixa de verificação para aceitar os termos e condições. Deve aceitar para poder prosseguir.
7.  Clique no **botão com a seta** para criar a sua conta.

Assim que a sua conta for criada, a sua sessão será iniciada e será automaticamente redirecionado para o Dashboard.

Se já tem uma conta, clique em **"Já tem uma conta? Login"** para voltar ao formulário de início de sessão.

---

## Iniciar Sessão com uma Conta Externa

A sua organização pode permitir-lhe iniciar sessão utilizando a sua conta Microsoft ou Google existente, em vez de uma palavra-passe Dino separada.

!!! note "Funcionalidade opcional"
    Esta opção pode não estar disponível na sua instalação. Os botões só aparecerão se o seu administrador tiver ativado o login externo.

1.  Na página de Login, clique em **"Login com Microsoft"** ou **"Login com Google"**, dependendo da conta que pretende utilizar.
2.  Será redirecionado para a Microsoft ou Google para confirmar a sua identidade.
3.  Após autorizar o acesso, será trazido de volta ao Dino e a sua sessão será iniciada automaticamente.

---

## Definições da Página

Um pequeno conjunto de preferências de visualização está disponível diretamente na página de Login.

### Tema Claro / Escuro

Um interruptor está disponível na parte inferior do formulário, entre um ícone de sol e um ícone de lua. Clique ou deslize-o para alternar entre **modo claro** e **modo escuro**. Esta definição tem efeito imediato.

### Seleção da Plataforma

!!! note "Funcionalidade opcional"
    Esta opção pode não estar disponível na sua instalação. Só é mostrada em implementações multi-plataforma.

Se um menu pendente **"Escolha a sua plataforma"** estiver visível, selecione a plataforma à qual se pretende ligar antes de iniciar sessão. O menu pendente listará os ambientes que o seu administrador configurou.

---

## Resolução de Problemas

### "Ocorreu um problema ao ligar ao servidor de Autenticação ou o seu token expirou."

!!! warning
    A sua sessão anterior expirou ou a ligação ao servidor de autenticação foi interrompida. Isto não é um erro da sua parte. Basta introduzir as suas credenciais e iniciar sessão novamente.

### "Ocorreu um problema durante o processo de sincronização."

!!! warning
    Ocorreu um erro ao sincronizar os seus dados, o que pode estar relacionado com uma importação de formulário recente. Reveja quaisquer formulários que estava a importar para potenciais problemas e, em seguida, inicie sessão novamente. Se o problema persistir, contacte o seu administrador.

### "A carregar autenticação externa…" sem redirecionamento

!!! warning
    Esta mensagem aparece brevemente ao completar um início de sessão através da Microsoft ou Google. Se a página não prosseguir automaticamente após alguns segundos, tente iniciar sessão novamente. Se o problema se repetir, contacte o seu administrador para verificar se o serviço de autenticação externa está corretamente configurado.