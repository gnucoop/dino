---
title: Métricas
description: Uma visão geral da área Métricas no Dino — os tipos de dados de referência usados para classificar e vincular dados de form e report.
---

# Métricas

As Métricas são as categorias de dados de referência usadas em todo o Dino para classificar, organizar e filtrar os dados coletados. As métricas podem ser associadas aos form coletados e então usadas para definir visualizações sobre os dados da sua instalação. Por exemplo, as métricas podem ser usadas para definir permissões de usuário: um determinado usuário pode receber acesso apenas a alguns valores específicos de métricas. Isso pode ser útil, por exemplo, em uma organização com atuação em vários países, se você quiser limitar certos usuários a acessar apenas os dados do país onde atuam. Da mesma forma, você pode limitar o acesso dos usuários do Dino seguindo outros critérios usando outras métricas, como a métrica projeto, para limitar o acesso a apenas alguns projetos, ou a métrica organização, para limitar o acesso apenas aos dados de alguns parceiros.

Além de serem usadas para limitar o acesso aos dados, as métricas também podem ser usadas para facilitar filtros e agregações. Por exemplo, posso querer contar quantos form foram coletados para um determinado país. Nesse caso, posso filtrar meus dados de form com base no valor da métrica localização. Os filtros também podem se beneficiar da estrutura hierárquica das métricas. Por exemplo, se eu tiver uma estrutura de localizações em, digamos, três níveis, porque mapeio províncias (ou seja, um valor de métrica para cada província), agrupadas em regiões (ou seja, um valor de métrica para cada região, que também é usado como pai das províncias), agrupadas em países (ou seja, um valor de métrica para cada país, que é usado como pai das regiões). Então, nesse caso, eu poderia filtrar todos os form de uma determinada região simplesmente filtrando a região, selecionando assim todas as províncias que compartilham a mesma região.

Esse mecanismo também pode ser usado ao gerar reports. Os dados de um report de um determinado report schema podem ser gerados usando um valor específico de uma métrica. Isso implicará que o report schema seja aplicado a todos os form que tenham o mesmo valor de métrica, seguindo uma hierarquia de valores de métrica.

Por fim, as métricas podem ser usadas para vincular dados de form diferentes. Por exemplo, posso ter um form para os dados pessoais dos beneficiários — um por pessoa — e depois outro form para suas consultas médicas — mais de um por pessoa. A métrica caso pode ser usada para vincular o form de dados pessoais aos form de consultas e também para copiar alguns dos dados do form pessoal, como a data de nascimento, para os form de consultas médicas.

As diferentes formas de usar as métricas fazem dessa entidade uma ferramenta poderosa para gerenciar dados.

A seção Métricas é onde você gerencia as listas de valores disponíveis para cada categoria. Ela serve como o hub central para todos os seus dados de referência.

![Visão principal da página Métricas](../imgs/metrics/index.png)

---

## Tipos de métrica

A página principal exibe os tipos de métrica que estão ativos na sua instalação do Dino. Cada tipo é mostrado como um cartão com um ícone e um rótulo. Clique em qualquer cartão para abrir sua página de gerenciamento.

Dependendo da configuração do seu sistema, alguns ou todos os seguintes tipos de métrica podem estar disponíveis:

| Tipo de métrica | Descrição |
|---|---|
| **Áreas temáticas** | Áreas de atuação ou agrupamentos temáticos para suas atividades. |
| **Casos** | Casos individuais, pessoas ou beneficiários acompanhados entre os dados de form. |
| **Localizações** | Localizações geográficas onde os dados são coletados ou as atividades ocorrem. |
| **Projetos** | Projetos aos quais os dados de form e os reports estão vinculados. |
| **Organizações** | Organizações envolvidas ou responsáveis pelas atividades. |

!!! tip "Acessando as Métricas"
    Você pode navegar até a área Métricas clicando em **Métricas** no menu principal da aplicação.

---

## O que você pode fazer

Na página principal de Métricas, você pode:

1.  **Ver todos os tipos de métrica ativos** disponíveis para seus dados.
2.  **Navegar até um tipo de métrica específico** clicando em seu cartão. Isso leva você a uma página dedicada onde você pode gerenciar a lista de valores daquele tipo (por exemplo, adicionar uma nova localização ou editar o nome de um projeto).
3.  **Usar o caminho de navegação** no topo da página para acompanhar seu percurso de navegação dentro da seção Métricas.

Para instruções detalhadas sobre como adicionar, editar ou excluir valores dentro de um tipo de métrica específico, consulte a documentação de cada tipo de métrica:

- [Áreas temáticas](areas.md)
- [Casos](cases.md)
- [Localizações](locations.md)
- [Organizações](organizations.md)
- [Projetos](projects.md).

---

## Navegando pela seção Métricas

1.  Na página principal de Métricas, revise os cartões de cada tipo de métrica disponível.
2.  Clique no cartão do tipo de métrica que você deseja gerenciar (por exemplo, **Localizações**).
3.  Você será levado a uma página dedicada àquele tipo de métrica, onde poderá visualizar, adicionar, editar ou excluir valores específicos.
4.  Use o caminho de navegação no topo da página para navegar facilmente de volta à página principal de Métricas ou para outras seções.

!!! warning "Configuração do sistema"
    Os tipos de métrica disponíveis são configurados pelo administrador do seu sistema. Se você não vir um tipo de métrica específico de que precisa, entre em contato com seu administrador.

!!! warning "Excluindo um valor de métrica"
    Isso vale para todas as métricas. Antes de excluir um valor de métrica, por exemplo uma determinada localização ou um caso, o Dino verifica se ele ainda está em uso. Se algum form o utiliza, ou se ele possui valores filhos, a exclusão é recusada (*Some forms use these metrics. You cannot delete them.* / *Some metrics have children. You cannot delete them.*). Se apenas reports o utilizam, você recebe um aviso e ainda pode confirmar. As permissões de grupo que fazem referência ao valor **não** são verificadas: remova-o de qualquer grupo antes de excluí-lo.