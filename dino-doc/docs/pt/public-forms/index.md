---
title: Formulários públicos
description: Como acessar, preencher e enviar um formulário público no Dino sem precisar de uma conta.
---

# Formulários públicos

Os formulários públicos permitem que qualquer pessoa com um link envie dados ao Dino sem precisar fazer login ou ter uma conta. Isso é comumente usado para pesquisas, inscrições ou coleta de feedback. Se você recebeu um link público para um formulário, pode usar esta página para preenchê-lo.

Os endereços de formulários públicos seguem o padrão `/f/` seguido de um identificador único (por exemplo, `https://your-dino-instance.com/f/963f643f-ad55-4b85-a3d6-100b113f2e9a`). O identificador é o ID do form schema. Se algum valor de métrica precisar ser adicionado aos dados do formulário, ele pode ser incluído na URL usando a seguinte sintaxe (por exemplo, para o caso da métrica): `https://your-dino-instance.com/f/963f643f-ad55-4b85-a3d6-100b113f2e9a?case=a6408e72-c60c-4d54-ad2f-44fd4a90cdb2`
onde o ID do valor da métrica é, novamente, o ID da métrica atribuído pelo Dino.

Não é preciso memorizar essa sintaxe, pois o link é gerado automaticamente pelo Dino quando você clica no ícone de compartilhamento do form schema. Depois de gerado, o link pode ser compartilhado por e-mail, WhatsApp ou qualquer outro meio.

---

## Acessando um formulário público

1.  Clique no link do formulário público que você recebeu (por exemplo, por e-mail ou mensagem compartilhada). O link direcionará você para `/f/...` na sua instância do Dino.
2.  O formulário abrirá diretamente no seu navegador. Você não precisa fazer login.
3.  Revise o título do formulário e qualquer texto introdutório para confirmar que é o formulário correto.

!!! tip
    Os links de formulários públicos contêm um identificador longo (como `/f/abc123def`). Se a página não carregar, verifique se o link completo foi copiado corretamente.

---

## Preenchendo e enviando

1.  Preencha todos os campos do formulário. Os campos marcados com asterisco (*) são **obrigatórios**.
2.  Se o formulário tiver várias seções, use as abas ou botões de navegação na parte superior do formulário para alternar entre elas.
3.  À medida que você preenche os campos, o formulário valida suas informações. Entradas inválidas geralmente são destacadas.
4.  Quando todos os campos obrigatórios forem válidos, o botão principal de envio (geralmente um botão circular com ícone de enviar) ficará ativo.
5.  Clique no botão de envio para enviar seus dados.

!!! warning
    O botão de envio permanecerá desabilitado (acinzentado) se algum campo obrigatório estiver vazio ou contiver dados inválidos. Percorra o formulário para encontrar e corrigir quaisquer problemas destacados.

---

## Após o envio

Após um envio bem-sucedido, você verá uma tela de confirmação com uma marca de seleção e a mensagem: **"O formulário foi enviado com sucesso."**

Uma notificação também aparecerá na parte inferior da tela. A partir dessa notificação, você pode:

*   **Preencher outro**: clique aqui para recarregar a página com uma cópia nova e vazia do mesmo formulário, permitindo que você faça outro envio.
*   **Fechar**: dispensa a notificação.

---

## Solução de problemas

### O botão de envio está desabilitado.
Isso significa que o formulário ainda não é válido. Verifique se há:

*   **Campos obrigatórios vazios**: certifique-se de que todos os campos marcados com asterisco (*) estejam preenchidos.
*   **Dados inválidos**: procure campos destacados em vermelho e corrija as informações (por exemplo, um formato de e-mail inválido).

### "Não foi possível salvar o formulário."
Seu envio encontrou um erro temporário, geralmente relacionado à sua conexão com a internet.

1.  Clique em **"Tentar novamente"** na notificação na parte inferior da tela.
2.  Se o erro persistir, verifique sua conexão com a internet e tente atualizar a página.
3.  Se continuar falhando, entre em contato com a pessoa que enviou o link do formulário.

### "Ops! Não conseguimos encontrar este Form Schema."
O link que você está usando está incorreto ou o formulário foi removido.

*   Verifique se você tem a URL completa e correta.
*   Entre em contato com a pessoa que compartilhou o link com você para obter um atualizado.

### O formulário não carrega (página em branco).

*   Atualize a página do navegador.
*   Certifique-se de que sua conexão com a internet esteja estável.
*   Confirme se o link está completo e não foi truncado.