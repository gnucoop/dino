---
title: DinoGPT
description: Como usar o assistente de IA DinoGPT no Dino para fazer perguntas e obter respostas de uma base de conhecimento configurada.
---

# DinoGPT

O DinoGPT é um assistente de IA que permite fazer perguntas em linguagem natural e receber respostas extraídas de uma base de conhecimento configurada. Ele foi projetado para conversas diretas — você digita uma pergunta e recebe uma resposta, juntamente com referências aos documentos de origem nos quais a resposta se baseia.

![DinoGPT](../imgs/gpt/index.png)

!!! note "Funcionalidade opcional"
    Este recurso requer uma chave de API DINO-AI e pode não estar disponível na sua instalação. Se você não conseguir ver esta opção, entre em contato com o administrador.

---

## Aceitando os Termos de Uso

Na primeira vez que você abrir o DinoGPT, será exibida uma declaração de termos de uso explicando como o assistente funciona, o que ele pode e não pode fazer e suas responsabilidades como usuário. Leia os termos e clique em **Aceitar** para continuar.

Sua aceitação é salva no seu dispositivo, portanto, você não será solicitado novamente em visitas futuras.

---

## Inserindo Sua Chave de API

Após aceitar os termos, você será solicitado a inserir sua **chave de API DINO-AI**.

1. Digite sua chave de API no campo.
2. Pressione **Enter** ou clique no **botão de seta** para enviá-la.

O sistema verificará a chave. Se for válida, uma mensagem de confirmação aparecerá e a interface de chat será carregada. Sua chave é salva no seu dispositivo, portanto, você não precisa reinseri-la na próxima vez.

!!! warning "Chave de API Inválida"
    Se a chave for rejeitada, verifique se você a inseriu corretamente. Uma mensagem de erro aparecerá abaixo do campo se a chave não for reconhecida.

!!! warning "Serviço indisponível"
    Se a mensagem *"O DINO-AI não está respondendo no momento"* aparecer, o serviço pode estar temporariamente indisponível. Tente novamente mais tarde.

---

## Fazendo Perguntas

Assim que o chat estiver pronto, o assistente o cumprimentará e um campo de entrada de texto aparecerá na parte inferior da tela.

1. Selecione um **Namespace** no menu suspenso para escolher de qual base de conhecimento o assistente deve extrair informações.
2. Clique dentro do campo de texto e digite sua pergunta.
3. Pressione **Enter** para enviar.
4. O assistente processará sua pergunta e exibirá a resposta no histórico do chat acima.

Você pode continuar a conversa fazendo perguntas de acompanhamento. O assistente leva em consideração todo o histórico da conversa ao gerar cada resposta.

---

## Entendendo as Respostas

Cada resposta do assistente pode incluir:

- **Texto da resposta** — a resposta do assistente à sua pergunta.
- **Fontes** — chips clicáveis que mostram o documento ou arquivo do qual a resposta foi extraída, juntamente com o número da página, se disponível. Clique em um chip de fonte para ler a passagem relevante.
- **Perguntas sugeridas** — chips clicáveis com perguntas de acompanhamento sugeridas pelo assistente. Clique em uma para enviá-la diretamente.

---

## Fornecendo Feedback

As respostas incluem um botão de **polegar para cima** e **polegar para baixo**. Use-os para avaliar a qualidade da resposta. Uma mensagem de confirmação aparecerá quando seu feedback for enviado.

---

## Solução de Problemas

### Chat atingiu o comprimento máximo

!!! warning
    Se o assistente responder que o chat atingiu seu comprimento máximo, recarregue a página para iniciar uma nova conversa.

### "Desculpe, você não tem Créditos suficientes!"

!!! warning
    Sua conta ficou sem créditos do DINO-AI. Um link pode aparecer para comprar créditos adicionais. Se precisar de ajuda, entre em contato com seu administrador.