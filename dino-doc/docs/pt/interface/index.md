---
title: Navegação e Interface
description: Uma visão geral da estrutura do aplicativo Dino — a barra de ferramentas, a navegação lateral, as notificações, a sincronização de dados e a área do usuário.
---

# Navegação e Interface

A interface do Dino é composta por uma barra de ferramentas superior e um menu de navegação lateral que estão presentes em todas as páginas após o login.

![Visão principal da página de Navegação Principal](../imgs/interface/index.png)

---

## Navegação Lateral

O menu lateral permite navegar entre as principais áreas do aplicativo.

**Seções padrão** (visíveis para todos os usuários autenticados):

| Seção | Descrição |
|---|---|
| Painel | A tela inicial. |
| Formulários | Formulários de coleta de dados e envios. |
| Relatórios | Relatórios gerados. |
| Agregação | Visão unificada dos envios de vários formulários. |
| Métricas | Dados de referência (projetos, locais, organizações, etc.). *(Oculto para usuários somente convidados.)* |
| IA | Assistente de IA (DinoGPT). |

**Seções de administração** (visíveis apenas para administradores, exibidas abaixo de um separador):

| Seção | Descrição |
|---|---|
| Usuários | Contas de usuário e grupos de permissão. |
| Idiomas | Gerenciamento de tradução da interface. |

Em telas grandes, o menu está sempre visível à esquerda. Em telas menores, ele é recolhido e pode ser aberto com o **botão de menu** (ícone de hambúrguer) na barra de ferramentas superior. Independentemente do tamanho da tela, clique no botão de menu para expandir os rótulos do menu ou recolhê-los para exibir apenas os ícones.

---

## Barra de Ferramentas Superior

A barra de ferramentas na parte superior da tela contém os seguintes controles, da esquerda para a direita:

- **Alternador do menu** — abre ou recolhe o menu lateral.
- **Logotipo** — exibe o logotipo da sua organização ou do Dino.
- **Indicador de nova versão** — um ícone de download aparece quando uma nova versão do Dino está disponível. Clique nele para recarregar o aplicativo e aplicar a atualização.
- **Créditos DINO-AI** — mostra o saldo restante de créditos de IA como um selo. Clique para abrir a [Área do Usuário](#área-do-usuário) no painel de Créditos. *(Visível apenas se uma chave de API DINO-AI tiver sido configurada.)*
- **Alternador de modo escuro / claro** — um ícone de sol, um controle deslizante e um ícone de lua. Use o controle deslizante para alternar entre os temas claro e escuro. *(Oculto no celular — use a Área do Usuário em vez disso.)*
- **Ícone de informação** — passe o mouse para ver informações de versão desta instalação.
- **Ícone de ajuda** — abre a lista de reprodução do tutorial do Dino em uma nova aba.
- **Ícone de configurações** — abre a [Área do Usuário](#área-do-usuário).
- **Ícone de sincronização** — mostra o status atual da sincronização de dados. Clique para acionar uma sincronização manual.
- **Sino de notificações** — mostra o número de notificações não lidas como um selo. O sino toca quando novas notificações chegam. Consulte [Notificações](#notificações) abaixo.
- **Seletor de idioma** — altera o idioma da interface.
- **Nome do usuário** — clique para abrir a [Área do Usuário](#área-do-usuário).
- **Ícone de sair** — clique para sair. O ícone fica esmaecido enquanto uma sincronização está em andamento ou quando o dispositivo está offline; sair não está disponível nesses estados.

---

## Sincronização de Dados

O Dino sincroniza seus dados com o servidor em segundo plano. O **ícone de sincronização** na barra de ferramentas mostra o estado atual:

| Ícone | Significado |
|---|---|
| `sync` (estático) | Todos os dados estão atualizados. |
| `sync_problem` (pulsando) | Você tem alterações locais que ainda não foram sincronizadas. Clique para acionar uma sincronização. |
| `sync` (girando) | Uma sincronização está em andamento. |
| `sync_disabled` | O dispositivo está offline; a sincronização não está disponível. |
| `sync` com selo `!` | Um problema de sincronização foi encontrado. Verifique suas notificações para mais detalhes. |

Quando uma sincronização é concluída, uma notificação aparece brevemente na parte inferior da tela:

- *"Sincronização concluída"* — todos os dados foram sincronizados com sucesso.
- *"Sincronização concluída com erros. Não foi possível sincronizar: [itens]. Verifique suas notificações."* — uma ou mais coletas de dados não puderam ser sincronizadas. Uma notificação também é criada na sua lista de notificações.

---

## Notificações

Clique no **ícone de sino** na barra de ferramentas para abrir o menu suspenso de notificações. O selo no sino mostra o número de mensagens não lidas.

![Menu suspenso de notificações aberto](../imgs/interface/index-notifications.png)

No menu suspenso, você pode:

1.  **Clicar em uma notificação** para marcá-la como lida.
2.  **Clicar no botão de seta** de uma notificação (se presente) para navegar diretamente até a área relevante do aplicativo.
3.  **Marcar todas como lidas** — marca todas as notificações atuais como lidas.
4.  **Ver todas as notificações** — navega até a página completa de [Notificações](../notifications/index.md).

---

## Área do Usuário

Clique no **ícone de configurações**, no seu **nome de usuário** ou no **contador de Créditos DINO-AI** para abrir a caixa de diálogo da Área do Usuário. Ela mostra seu nome completo e endereço de e-mail na parte superior.

![Caixa de diálogo da área do usuário aberta](../imgs/interface/index-user-area.png)

### Alterar Senha

1.  Insira sua **Senha Atual**.
2.  Insira uma **Nova Senha**.
3.  **Confirme a Nova Senha**.
4.  Clique no botão de seta para salvar.

Uma mensagem de erro aparecerá se a senha atual estiver incorreta ou se as novas senhas não coincidirem.

### Chaves de API

Visualize ou defina sua **Chave de API DINO-AI**. Uma vez que uma chave válida seja armazenada, ela é exibida em modo somente leitura. Use o ícone de olho para mostrar ou ocultar a chave, e o ícone de cópia para copiá-la para a área de transferência.

### Créditos

Mostra seu **saldo atual de créditos DINO-AI**. Se uma integração de pagamento estiver configurada, um botão **Adicionar mais** estará disponível para comprar créditos adicionais.

!!! tip "Visibilidade"
    Esta seção só é visível quando uma chave de API DINO-AI tiver sido configurada.

### Tema do DINO

Personalize o esquema de cores do aplicativo:

- **Cor primária**, **Cor de destaque**, **Cor de aviso** — clique nos campos de cor para abrir um seletor de cores.
- **Nome do predefinido** — digite ou selecione um nome para salvar ou carregar uma predefinição de cores.
- Clique em **Salvar** para salvar as cores atuais como uma predefinição nomeada, ou em **Carregar** para aplicar uma predefinição salva.

No celular, um **alternador de modo escuro / claro** também aparece aqui.

### Tutoriais

Clique em **Iniciar Tour do Dino** para reiniciar o tour guiado do aplicativo desde o início.

!!! tip "Disponibilidade"
    Esta seção só é exibida se o tour guiado estiver configurado na sua instalação.

### Backup e Restauração

*(Apenas administradores, se habilitado.)*

- **Fazer Backup dos Dados** — baixa uma exportação completa do banco de dados do aplicativo como um arquivo JSON.
- **Restaurar Dados** — faz upload de um arquivo JSON exportado anteriormente para restaurar o banco de dados.

!!! warning "Cuidado ao Restaurar"
    Restaurar dados substituirá o banco de dados atual. Esta ação não pode ser desfeita.