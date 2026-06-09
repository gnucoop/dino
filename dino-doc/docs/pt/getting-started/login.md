---
title: Fazer Login
description: Como entrar no Dino, redefinir sua senha, criar uma conta e usar provedores de login externos.
---

# Fazendo Login no Dino

A página de Login é o ponto de partida para acessar o Dino. A partir daqui, você pode entrar na sua conta, criar uma nova conta ou recuperar o acesso se tiver esquecido sua senha. Dependendo de como sua organização configurou o Dino, algumas das opções descritas abaixo podem não estar visíveis.

![Visão principal da página de Login](../imgs/getting-started/login.png)

---

## Entrando

Use suas credenciais para acessar a plataforma.

1.  Na página de Login, insira seu **nome de usuário ou endereço de e-mail** no primeiro campo.
2.  Insira sua **senha** no segundo campo.
3.  Clique no **botão de seta** para entrar.

Se suas credenciais estiverem corretas, você será direcionado automaticamente para o [Painel de Controle](../dashboard/index.md).

Se o login falhar, uma mensagem de erro aparecerá abaixo do formulário. Verifique novamente se seu e-mail e senha estão corretos, certificando-se de que não há espaços extras, e tente novamente.

---

## Redefinindo Sua Senha

Se você esqueceu sua senha, pode solicitar um link de redefinição por e-mail.

!!! note "Funcionalidade opcional"
    Esta opção pode não estar disponível na sua instalação. Se você não vir o link "Esqueceu sua senha?", entre em contato com seu administrador.

1.  Na página de Login, clique em **"Esqueceu sua senha?"** abaixo do formulário de login.
2.  Insira o **endereço de e-mail** associado à sua conta.
3.  Clique no **botão de seta** para enviar a solicitação.

Você receberá uma mensagem de confirmação no topo da tela. Verifique sua caixa de entrada para um e-mail contendo um link para definir uma nova senha. Se o e-mail não chegar em alguns minutos, verifique sua pasta de spam.

Para voltar ao formulário de login sem redefinir sua senha, clique em **"Na verdade, eu lembro da minha senha"**.

Para mais detalhes, consulte a página [Redefinir Senha](reset-password.md).

---

## Criando uma Nova Conta

Se você ainda não tem uma conta, pode ser possível se registrar diretamente da página de Login.

!!! note "Funcionalidade opcional"
    Esta opção pode não estar disponível na sua instalação. Se você não vir o link "Novo usuário? Criar nova conta", entre em contato com seu administrador para que uma conta seja criada para você.

1.  Na página de Login, clique em **"Novo usuário? Criar nova conta"**.
2.  Insira seu **nome completo**.
3.  Insira seu **endereço de e-mail**.
4.  Escolha uma **senha** (pelo menos 9 caracteres).
5.  Redigite sua senha no campo **Confirmar Senha** para garantir que corresponda.
6.  Se uma **Política de Privacidade** for exibida, leia o texto e marque a caixa de seleção para aceitar os termos e condições. Você deve aceitar para prosseguir.
7.  Clique no **botão de seta** para criar sua conta.

Assim que sua conta for criada, você será conectado e direcionado automaticamente para o [Painel de Controle](../dashboard/index.md).

Se você já tem uma conta, clique em **"Já tem uma conta? Login"** para retornar ao formulário de login.

---

## Entrando com uma Conta Externa

Sua organização pode permitir que você entre usando sua conta existente da Microsoft ou do Google, em vez de uma senha separada do Dino.

!!! note "Funcionalidade opcional"
    Esta opção pode não estar disponível na sua instalação. Os botões só aparecerão se seu administrador tiver habilitado o login externo.

1.  Na página de Login, clique em **"Entrar com a Microsoft"** ou **"Entrar com o Google"**, dependendo de qual conta você deseja usar.
2.  Você será redirecionado para a Microsoft ou Google para confirmar sua identidade.
3.  Após autorizar o acesso, você será trazido de volta ao Dino e conectado automaticamente.

---

## Configurações da Página

Um pequeno conjunto de preferências de exibição está disponível diretamente na página de Login.

### Tema Claro / Escuro

Uma alternância está disponível na parte inferior do formulário, entre um ícone de sol e um ícone de lua. Clique ou deslize para alternar entre o **modo claro** e o **modo escuro**. Essa configuração entra em vigor imediatamente.

### Seleção de Plataforma

!!! note "Funcionalidade opcional"
    Esta opção pode não estar disponível na sua instalação. Ela só é exibida em implantações com múltiplas plataformas.

Se um menu suspenso **"Escolha sua plataforma"** estiver visível, selecione a plataforma à qual deseja se conectar antes de entrar. O menu listará os ambientes que seu administrador configurou.

---

## Solução de Problemas

### "Houve um problema ao conectar ao servidor de autenticação ou seu token expirou."

!!! warning
    Sua sessão anterior expirou ou a conexão com o servidor de autenticação foi interrompida. Isso não é um erro da sua parte. Basta inserir suas credenciais e entrar novamente.

### "Houve um problema durante o processo de sincronização."

!!! warning
    Ocorreu um erro ao sincronizar seus dados, o que pode estar relacionado a uma importação de formulário recente. Revise quaisquer formulários que você estava importando em busca de possíveis problemas e, em seguida, entre novamente. Se o problema persistir, entre em contato com seu administrador.

### "Carregando autenticação externa…" sem redirecionamento

!!! warning
    Esta mensagem aparece brevemente ao concluir um login via Microsoft ou Google. Se a página não prosseguir automaticamente após alguns segundos, tente entrar novamente. Se o problema se repetir, entre em contato com seu administrador para verificar se o serviço de autenticação externa está configurado corretamente.