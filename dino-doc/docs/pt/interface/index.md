---
title: Navegação e Interface
description: Uma visão geral da estrutura da aplicação Dino — a barra lateral, a sincronização de dados, as notificações, o menu do utilizador e o encerramento de sessão.
---

# Navegação e Interface

Depois de iniciar sessão, todas as páginas do Dino são enquadradas por uma **barra lateral** à esquerda. Esta contém a navegação entre as áreas da aplicação e, na parte inferior, a sincronização de dados, as notificações e o cartão do utilizador.

![Vista principal da página de Navegação Principal](../imgs/interface/index.png)

---

## A Barra Lateral

No topo da barra lateral encontram-se o logótipo e o **botão de menu**, que expande a barra lateral para mostrar os nomes das secções ou a recolhe, deixando apenas os ícones.

!!! tip "Menu recolhido"
    Quando a barra lateral está recolhida, mostrando apenas os ícones, passe o cursor sobre um ícone para ver o nome da respetiva secção numa dica.

Num telemóvel ou num ecrã pequeno, a barra lateral fica oculta. Uma barra estreita no topo da página mostra então o botão de menu, que abre a barra lateral sobre a página, o logótipo e o botão de sincronização.

### Secções

A navegação lista as áreas do Dino que pode utilizar. Quais aparecem depende da configuração da sua instância do Dino e das suas permissões.

**Secções do utilizador**, sob o cabeçalho **Utilizador**:

| Secção | Descrição |
|---|---|
| Dashboard | O ecrã inicial. Ver [Dashboard](../dashboard/index.md). |
| Forms | Formulários de recolha de dados e dados submetidos. Ver [Forms](../forms/index.md). |
| Reports | Relatórios gerados. Ver [Reports](../reports/index.md). |
| Aggregation | Vista unificada dos dados submetidos em todos os formulários. Ver [Aggregation](../aggregation/index.md). |
| AI | O assistente DinoAi, quando ativado na sua instância. |
| Metrics | Dados de referência (projetos, posições, organizações, etc.). Ver [Metrics](../metrics/index.md). *(Oculto para utilizadores apenas convidados.)* |

**Secções de administração**, sob o cabeçalho **Administração**, visíveis apenas para administradores:

| Secção | Descrição |
|---|---|
| Users | Contas de utilizador e grupos de permissões. Ver [Users](../administration/users.md). |
| Languages | Gestão da tradução da interface. Ver [Managing Languages](../administration/languages.md). |

A sua instância pode mover algumas secções, como Metrics, Reports ou Aggregation, para as secções de administração. Quando a barra lateral está recolhida, os dois grupos são separados por uma linha em vez dos respetivos cabeçalhos.

---

## Sincronização de Dados

O Dino mantém os seus dados no dispositivo e sincroniza-os com o servidor em segundo plano. O botão **Sincronizar** na parte inferior da barra lateral mostra o estado atual e, quando a barra lateral está expandida, a hora da última sincronização concluída (ou *Nunca sincronizado*). Clique nele para iniciar uma sincronização.

| Botão | Significado |
|---|---|
| ícone `sync` | Todos os dados estão atualizados. |
| ícone `sync`, a rodar | Está em curso uma sincronização. |
| ícone `sync_problem` num botão colorido | Tem alterações locais que ainda não foram sincronizadas. Clique para as sincronizar. |
| distintivo `!` no ícone | Ocorreu um problema durante a última sincronização. Consulte as suas notificações para mais detalhes. |
| ícone `sync_disabled`, *Offline* | O dispositivo está offline; a sincronização não está disponível até a ligação ser restabelecida. |

Quando uma sincronização termina, aparece brevemente uma mensagem na parte inferior do ecrã:

- *"Sincronização concluída"* — todos os dados foram sincronizados com êxito.
- *"Sincronização concluída com erros. Não foi possível sincronizar: [itens]. Consulte as suas notificações."* — uma ou mais coleções de dados não puderam ser sincronizadas. É também criada uma notificação na sua lista de notificações.

!!! warning "Sessão expirada"
    Se a sua sessão tiver expirado, a sincronização para e o botão de sincronização mostra `sync_problem`. Os seus dados permanecem neste dispositivo. Clique no botão: o Dino tenta renovar a sessão e, se não conseguir, oferece **Ir para a página de acesso**, mantendo os dados neste dispositivo, ou **Mais tarde**. Inicie sessão novamente com a mesma conta para sincronizar os dados.

---

## Botões Utilitários

Abaixo do botão de sincronização, uma linha de pequenos botões dá acesso a:

- **Nova versão** — aparece um ícone de transferência quando está disponível uma nova versão do Dino. Clique nele para recarregar a aplicação e aplicar a atualização.
- **Notificações** — o sino, com um distintivo que conta as suas notificações não lidas. Ver [Notificações](#notificações) abaixo.
- **Modo claro / escuro** — um botão de sol e um de lua. São apresentados quando a barra lateral está expandida e em ecrãs pequenos; também pode alternar o modo a partir da [Área do utilizador](../user-area/index.md).
- **DINO-AI Credits** — um distintivo com os seus créditos de IA restantes, apresentado apenas quando o DINO-AI está configurado para a sua conta. Clique nele para abrir o separador de IA da Área do utilizador.

---

## Notificações

Clique no **sino** para abrir o painel de notificações. O cabeçalho mostra quantas notificações estão por ler. As notificações são agrupadas por dia, cada uma com a sua idade, e as mensagens repetidas são condensadas numa única linha com um contador (por exemplo ×3).

![Menu pendente de notificações aberto](../imgs/interface/index-notifications.png)

A partir do painel, pode:

1.  **Clicar numa notificação** para a marcar como lida. Se esta tiver uma ligação para algum ponto do Dino, indicada por uma seta à direita, o clique também o leva até lá.
2.  **Marca tudo como lido** — apresentado quando existem notificações não lidas.
3.  **Ver todas as notificações** — abre a página completa de [Notificações](../notifications/index.md).

---

## Cartão de Utilizador e Menu

Na base da barra lateral, o cartão de utilizador mostra as suas iniciais, o seu nome e uma linha com a sua função, o idioma da interface ativo e a versão do Dino. Clique no cartão para abrir o menu do utilizador:

- **Área do utilizador** — a página da sua conta, para alterar a palavra-passe, consultar a sua chave e créditos DINO-AI, personalizar o tema e muito mais. Ver [Área do utilizador](../user-area/index.md).
- **Linguagem** — escolha o idioma da interface.
- **Ajuda** — uma ligação para as diretrizes configuradas na sua instância, quando existem.
- As informações de compilação da instalação.

---

## Encerrar a Sessão

Clique no botão **Sair** junto ao seu cartão de utilizador. O Dino pergunta sempre o que fazer com os dados neste dispositivo:

- **Sair e apagar os dados** — encerra a sessão e elimina todos os dados locais deste dispositivo.
- **Encerrar a sessão e manter os dados** — encerra a sessão e leva-o à página de acesso, mantendo os dados neste dispositivo para o seu próximo início de sessão.
- **Cancelar** — mantém a sessão iniciada.

O botão Sair fica desativado e não pode ser utilizado enquanto está em curso uma sincronização ou quando o dispositivo está offline.

!!! warning "Dados ainda não sincronizados"
    Os dados que ainda não sincronizou existem apenas neste dispositivo: eliminá-los ao terminar a sessão faz com que se percam definitivamente. Se tiver dúvidas, sincronize primeiro ou escolha **Encerrar a sessão e manter os dados**. Iniciar sessão mais tarde com uma conta diferente também os elimina — ver [Iniciar sessão](../getting-started/login.md).