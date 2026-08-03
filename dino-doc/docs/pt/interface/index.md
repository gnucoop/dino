---
title: Navegação e Interface
description: Uma visão geral do aplicativo Dino — barra de ferramentas, navegação lateral, notificações, sincronização de dados e área do usuário.
---

# Navegação e Interface

A interface do Dino consiste em uma barra de ferramentas superior e um menu de navegação lateral, presentes em todas as páginas após o login.

![Main view of the Main Nav page](../imgs/interface/index.png)

---

## Navegação Lateral

O menu lateral permite que você navegue entre as principais áreas do aplicativo.

**Seções padrão** (visíveis a todos os usuários autenticados):

| Seção | Descrição |
|---|---|
| Painel | A tela inicial. |
| Formulários | Formulários de coleta de dados e submissões. |
| Relatórios | Relatórios gerados. |
| Agregação | Visão unificada das submissões de vários formulários. |
| Métricas | Dados de referência (projetos, localizações, organizações etc.). *(Oculto para usuários apenas convidados.)* |
| IA | Assistente de IA (DinoGPT). |

**Seções administrativas** (visíveis apenas para administradores, mostradas abaixo de um separador):

| Seção | Descrição |
|---|---|
| Usuários | Contas de usuário e grupos de permissão. |
| Idiomas | Gerenciamento de tradução da interface. |

Em telas grandes, o menu fica sempre visível à esquerda. Em telas menores, ele é recolhido e pode ser aberto com o **botão de menu** (ícone de hambúrguer) na barra de ferramentas superior. Em qualquer tamanho de tela, clique no botão de menu para expandir os rótulos do menu ou recolhê-los para apenas ícones.

---

## Barra de Ferramentas Superior

A barra de ferramentas no topo da tela contém os seguintes controles, da esquerda para a direita:

- **Alternar menu** — abre ou recolhe o menu lateral.
- **Logotipo** — exibe o logotipo da sua organização.
- **Indicador de nova versão** — um ícone de download aparece quando uma nova versão do Dino está disponível. Clique nele para recarregar o aplicativo e aplicar a atualização.
- **Créditos DINO-AI** — mostra seu saldo restante de créditos de IA como um selo. Clique para abrir a [Área do Usuário](#área-do-usuário) no painel de Créditos. *(Somente visível se uma chave de API DINO-AI tiver sido configurada.)*
- **Alternador de modo escuro/claro** — um ícone de sol, um controle deslizante e um ícone de lua. Use o controle deslizante para alternar entre os temas claro e escuro. *(Oculto em dispositivos móveis — use a Área do Usuário.)*
- **Ícone de informações** — passe o mouse para ver as informações de versão desta instalação.
- **Ícone de ajuda** — abre a lista de reprodução do tutorial do Dino em uma nova guia.
- **Ícone de configurações** — abre a [Área do Usuário](#área-do-usuário).
- **Ícone de sincronização** — mostra o status atual da sincronização de dados. Clique para acionar uma sincronização manual.
- **Sino de notificações** — mostra o número de notificações não lidas como um selo. O sino toca quando novas notificações chegam. Consulte [Notificações](#notificações) abaixo.
- **Seletor de idioma** — alterne o idioma da interface.
- **Nome do usuário** — clique para abrir a [Área do Usuário](#área-do-usuário).
- **Ícone de sair** — clique para sair. O ícone fica esmaecido enquanto uma sincronização está em andamento ou quando o dispositivo está offline; a saída não está disponível nesses estados.

---

## Sincronização de Dados

O Dino sincroniza seus dados com o servidor em segundo plano. O **ícone de sincronização** na barra de ferramentas mostra o estado atual:

| Ícone | Significado |
|---|---|
| `sync` (estático) | Todos os dados estão atualizados. |
| `sync_problem` (pulsando) | Você tem alterações locais que ainda não foram sincronizadas. Clique para acionar uma sincronização. |
| `sync` (girando) | Uma sincronização está em andamento. |
| `sync_disabled` | O dispositivo está offline; a sincronização não está disponível. |
| `sync` com selo `!` | Foi encontrado um problema de sincronização. Verifique suas notificações para obter detalhes. |

Quando uma sincronização é concluída, uma notificação aparece brevemente na parte inferior da tela:

- *"Sincronização concluída"* — todos os dados sincronizados com sucesso.
- *"Sincronização concluída com erros. Não foi possível sincronizar: [itens]. Verifique suas notificações."* — uma ou mais coletas de dados não puderam ser sincronizadas. Uma notificação também é criada na sua lista de notificações.

---

## Notificações

Clique no **ícone de sino** na barra de ferramentas para abrir o menu suspenso de notificações. O selo no sino mostra o número de mensagens não lidas.

![Notifications dropdown open](../imgs/interface/index-notifications.png)

No menu suspenso, você pode:

1. **Clicar em uma notificação** para marcá-la como lida.
2. **Clicar no botão de seta** de uma notificação (se presente) para navegar diretamente para a área relevante do aplicativo.
3. **Marcar todas como lidas** — marca todas as notificações atuais como lidas.
4. **Ver todas as notificações** — navega para a página completa de [Notificações](../notifications/index.md).

---

## Área do Usuário

Clique no **ícone de configurações**, no seu **nome de usuário** ou no **contador de Créditos DINO-AI** para abrir a caixa de diálogo da Área do Usuário. Ela mostra seu nome completo e endereço de e-mail no topo.

![User area dialog open](../imgs/interface/index-user-area.png)

### Alterar Senha

1. Digite sua **Senha Atual**.
2. Digite uma **Nova Senha**.
3. **Confirme a Nova Senha**.
4. Clique no botão de seta para salvar.

Uma mensagem de erro aparecerá se a senha atual estiver incorreta ou se as novas senhas não coincidirem.

### Chaves de API

Veja ou defina sua **Chave de API DINO-AI**. Depois que uma chave válida é armazenada, ela é exibida em modo somente leitura. Use o ícone de olho para mostrar ou ocultar a chave e o ícone de copiar para copiá-la para a área de transferência.

### Créditos

Mostra seu **saldo de créditos DINO-AI** atual. Se uma integração de pagamento estiver configurada, um botão **Adicionar mais** estará disponível para comprar créditos adicionais.

!!! tip "Visibilidade"
    Esta seção só fica visível quando uma chave de API DINO-AI foi configurada.

### Tema do Dino

Personalize o esquema de cores do aplicativo:

- **Cor primária**, **Cor de destaque**, **Cor de aviso** — clique nos campos de cor para abrir um seletor de cores.
- **Nome do predefinido** — digite ou selecione um nome para salvar ou carregar um predefinido de cores.
- Clique em **Salvar** para salvar as cores atuais como um predefinido nomeado, ou em **Carregar** para aplicar um predefinido salvo.

Em dispositivos móveis, um **alternador de modo escuro/claro** também aparece aqui.

### Tutoriais

Clique em **Iniciar Tour do Dino** para reiniciar o tour guiado do aplicativo desde o início.

!!! tip "Disponibilidade"
    Esta seção só é exibida se o tour guiado estiver configurado na sua instalação.

### Backup e Restauração

*(Somente administradores, se ativado.)*

- **Fazer backup de dados** — baixa uma exportação completa do banco de dados do aplicativo como um arquivo JSON.
- **Restaurar dados** — envia um arquivo JSON exportado anteriormente para restaurar o banco de dados.

!!! warning "Cuidado com a Restauração"
    Restaurar dados substituirá o banco de dados atual. Essa ação não pode ser desfeita.