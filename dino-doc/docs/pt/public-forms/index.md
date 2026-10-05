---
title: Formulários públicos
description: Como acessar, preencher e enviar dados por meio de um formulário público no Dino sem precisar de uma conta.
---

# Formulários públicos

Os formulários públicos permitem que qualquer pessoa com um link envie dados ao Dino sem precisar fazer login ou ter uma conta. Isso é comumente usado para pesquisas, inscrições ou coleta de feedback. Se você recebeu um link público de um formulário, pode usar esta página para preenchê-lo.

Os endereços de formulários públicos seguem o padrão `/f/` seguido de um identificador único (por exemplo, `https://your-dino-instance.com/f/963f643f-ad55-4b85-a3d6-100b113f2e9a`). O identificador é o ID do form schema. Se algum valor de métrica precisar ser adicionado aos dados do formulário, isso pode ser incluído na URL usando a seguinte sintaxe (por exemplo, para o caso da métrica): `https://your-dino-instance.com/f/963f643f-ad55-4b85-a3d6-100b113f2e9a?case=a6408e72-c60c-4d54-ad2f-44fd4a90cdb2`
onde o ID do valor da métrica é, novamente, o ID da métrica atribuído pelo Dino.

Não é preciso memorizar essa sintaxe, pois o link é gerado automaticamente pelo Dino quando você clica no ícone de compartilhamento do form schema. Depois de gerado, o link pode ser compartilhado por e-mail, WhatsApp ou qualquer outro meio.

---

## Acessando um formulário público

1.  Clique no link do formulário público que você recebeu (por exemplo, por e-mail ou mensagem compartilhada). O link o direcionará para `/f/...` na sua instância do Dino.
2.  O formulário será aberto diretamente no seu navegador. Você não precisa fazer login.
3.  Confira o título do formulário e qualquer texto introdutório para confirmar que é o formulário correto.

Um seletor de idioma na barra superior da tela permite escolher o idioma do formulário. Use-o para mudar o formulário para o idioma de sua preferência antes de começar a preenchê-lo.

Se o formulário incluir várias seções, uma barra de progresso será exibida abaixo do título para mostrar o quanto você já avançou.

!!! tip
    Os links de formulários públicos contêm um identificador longo (como `/f/abc123def`). Se a página não carregar, verifique se o link inteiro foi copiado corretamente.

---

## Preenchendo e enviando

1.  Preencha todos os campos do formulário. Os campos marcados com um asterisco (*) são **obrigatório**.
2.  Se o formulário tiver várias seções, use os botões **Próximo** e **Anterior** na parte inferior do formulário para navegar entre elas. O título da seção é exibido na parte superior de cada etapa.
3.  À medida que você preenche os campos, o formulário valida suas respostas. Entradas inválidas geralmente são destacadas.
4.  Quando todos os campos obrigatórios estiverem válidos, o botão **Enviar** ficará ativo.
5.  Clique em **Enviar** para enviar seus dados.

!!! warning
    O botão **Próximo** permanece desativado se a seção atual ainda não estiver válida, e o botão **Enviar** permanece desativado (esmaecido) se algum campo obrigatório estiver vazio ou contiver dados inválidos. Revise a seção atual ou volte pelas seções anteriores para encontrar e corrigir quaisquer problemas destacados.

---

## Após o envio

Após um envio bem-sucedido, você verá uma tela de confirmação com um visto e a mensagem: **"O formulário foi enviado com sucesso."**

Uma notificação também aparece na parte inferior da tela por alguns segundos. Clique em **Fill out another one** nela para recarregar a página com uma nova cópia vazia do mesmo formulário, permitindo que você faça outro envio.

---

## Solução de problemas

### O botão Próximo ou Enviar está desativado.
Isso significa que a seção atual ou o formulário como um todo ainda não está válido. Verifique se há:

*   **Campos obrigatórios vazios**: certifique-se de que todos os campos marcados com um asterisco (*) estejam preenchidos.
*   **Dados inválidos**: procure campos destacados em vermelho e corrija as informações (por exemplo, um formato de e-mail inválido).

### "This form cannot be opened because some required information is missing from the link."
O link que você usou está incompleto. Alguns formulários exigem informações de métrica (como um caso, uma posição ou uma organização) incluídas no endereço.

*   Entre em contato com a pessoa que enviou o link do formulário e peça que ela compartilhe o link completo.

### "Unable to save form."
Seu envio encontrou um erro temporário, geralmente relacionado à sua conexão com a internet.

1.  Verifique sua conexão com a internet.
2.  Clique em **"Try again"** na notificação na parte inferior da tela. O Dino envia o formulário novamente com as respostas que você digitou: você não precisa preenchê-lo de novo.
3.  Se continuar falhando, entre em contato com a pessoa que enviou o link do formulário.

### "Oops! We could not find this Form Schema."
O link que você está usando está incorreto ou o formulário foi removido.

*   Verifique se você tem a URL completa e correta.
*   Entre em contato com a pessoa que compartilhou o link com você para obter um atualizado.

### O formulário não carrega (página em branco).

*   Atualize a página do navegador.
*   Certifique-se de que sua conexão com a internet esteja estável.
*   Confirme se o link está completo e não foi truncado.

---

## Páginas relacionadas

*   [Formulários](../forms/index.md)
*   [Editar form schema](../forms/edit-form-schema.md)
*   [Idiomas](../administration/languages.md)
*   [Métricas](../metrics/index.md)