---
title: Iniciar sessão
description: Como iniciar sessão no Dino, redefinir a sua palavra-passe, criar uma conta e utilizar fornecedores de início de sessão externos.
---

# Iniciar sessão no Dino

A página de início de sessão é o ponto de partida para acessar o Dino. A partir daqui pode iniciar sessão na sua conta, criar uma nova conta ou recuperar o acesso caso se tenha esquecido da palavra-passe. Dependendo de como a sua organização configurou o Dino, algumas das opções descritas abaixo podem não estar visíveis.

![Vista principal da página de início de sessão](../imgs/getting-started/login.png)

---

## Iniciar sessão

Utilize as suas credenciais para acessar a plataforma.

1.  Na página de início de sessão, introduza o seu **nome de utilizador ou endereço de email** no primeiro campo.
2.  Introduza a sua **palavra-passe** no segundo campo.
3.  Clique no **botão de seta** para iniciar sessão.

Se as suas credenciais estiverem corretas, será redirecionado automaticamente para o [Dashboard](../dashboard/index.md).

Se o início de sessão falhar, será apresentada uma mensagem de erro abaixo do formulário. Verifique novamente se o seu email e palavra-passe estão corretos, certificando-se de que não existem espaços adicionais, e tente novamente.

---

## Redefinir a sua palavra-passe

Caso se tenha esquecido da palavra-passe, pode solicitar um link de redefinição por email.

!!! note "Funcionalidade opcional"
    Esta opção pode não estar disponível na sua instalação. Se não vir o link "Esqueceu-se da palavra-passe?", contacte o seu administrador.

1.  Na página de início de sessão, clique em **"Esqueceu-se da palavra-passe?"** abaixo do formulário de início de sessão.
2.  Introduza o **endereço de email** associado à sua conta.
3.  Clique no **botão de seta** para enviar o pedido.

Receberá uma mensagem de confirmação no topo do ecrã. Verifique a sua caixa de entrada para encontrar um email com um link para definir uma nova palavra-passe. Se o email não chegar dentro de alguns minutos, verifique a sua pasta de spam.

Para voltar ao formulário de início de sessão sem redefinir a palavra-passe, clique em **"Na verdade, lembro-me da minha palavra-passe"**.

Para mais detalhes, consulte a página [Redefinir palavra-passe](reset-password.md).

---

## Criar uma nova conta

Se ainda não tem uma conta, poderá conseguir registar-se diretamente a partir da página de início de sessão.

!!! note "Funcionalidade opcional"
    Esta opção pode não estar disponível na sua instalação. Se não vir o link "Novo utilizador? Criar nova conta", contacte o seu administrador para que lhe seja criada uma conta.

1.  Na página de início de sessão, clique em **"Novo utilizador? Criar nova conta"**.
2.  Introduza o seu **nome completo**.
3.  Introduza o seu **endereço de email**.
4.  Escolha uma **palavra-passe** (com pelo menos 9 caracteres).
5.  Volte a introduzir a palavra-passe no campo **Confirmar palavra-passe** para garantir que coincidem.
6.  Se for apresentada uma **Política de Privacidade**, leia o texto e marque a caixa para aceitar os termos e condições. Tem de aceitar para poder prosseguir.
7.  Clique no **botão de seta** para criar a sua conta.

Assim que a sua conta for criada, iniciará sessão automaticamente e será redirecionado para o [Dashboard](../dashboard/index.md).

Se já tem uma conta, clique em **"Já tem uma conta? Iniciar sessão"** para voltar ao formulário de início de sessão.

---

## Iniciar sessão com uma conta externa

A sua organização pode permitir que inicie sessão com a sua conta Microsoft ou Google existente, em vez de uma palavra-passe Dino separada.

!!! note "Funcionalidade opcional"
    Esta opção pode não estar disponível na sua instalação. Os botões só aparecerão se o seu administrador tiver ativado o início de sessão externo.

1.  Na página de início de sessão, clique em **"Iniciar sessão com a Microsoft"** ou **"Iniciar sessão com o Google"**, dependendo da conta que pretende utilizar.
2.  Será redirecionado para a Microsoft ou para o Google para confirmar a sua identidade.
3.  Após autorizar o acesso, voltará ao Dino e iniciará sessão automaticamente.

---

## Definições da página

Um pequeno conjunto de preferências de visualização está disponível diretamente na página de início de sessão.

### Tema claro / escuro

Está disponível um interruptor na parte inferior do formulário, entre um ícone de sol e um ícone de lua. Clique ou deslize-o para alternar entre o **modo claro** e o **modo escuro**. Esta definição tem efeito imediato.

### Seleção de plataforma

!!! note "Funcionalidade opcional"
    Esta opção pode não estar disponível na sua instalação. Só é apresentada em implementações multiplataforma.

Se estiver visível uma lista pendente **"Escolha a sua plataforma"**, selecione a plataforma à qual pretende ligar-se antes de iniciar sessão. A lista pendente apresentará os ambientes que o seu administrador configurou.

---

## Resolução de problemas

### "Ocorreu um problema ao ligar ao servidor de autenticação ou o seu token expirou."

!!! warning
    A sua sessão anterior expirou ou a ligação ao servidor de autenticação foi interrompida. Isto não é um erro da sua parte. Basta introduzir as suas credenciais e iniciar sessão novamente.

### "Ocorreu um problema durante o processo de sincronização."

!!! warning
    Ocorreu um erro ao sincronizar os seus dados, que pode estar relacionado com uma importação de formulários recente. Reveja os formulários que estava a importar para detetar possíveis problemas e, em seguida, inicie sessão novamente. Se o problema persistir, contacte o seu administrador.

### "A carregar autenticação externa…" sem redirecionamento

!!! warning
    Esta mensagem aparece brevemente ao concluir um início de sessão através da Microsoft ou do Google. Se a página não avançar automaticamente após alguns segundos, tente iniciar sessão novamente. Se o problema se repetir, contacte o seu administrador para verificar se o serviço de autenticação externo está corretamente configurado.