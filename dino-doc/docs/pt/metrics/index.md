---
title: Métricas
description: Uma visão geral da área de Métricas no Dino — os tipos de dados de referência usados para classificar e vincular dados de form e report.
---

# Métricas

As métricas são as categorias de dados de referência usadas em todo o Dino para classificar, organizar e filtrar os dados coletados. As métricas podem ser associadas aos form coletados e depois usadas para definir visualizações sobre os dados da sua instalação. Por exemplo, as métricas podem ser usadas para definir permissões de usuário: um determinado usuário pode receber acesso apenas a alguns valores específicos de métricas. Isso pode ser útil, por exemplo, em uma organização presente em vários países, se você quiser limitar certos usuários a acessar apenas os dados do país onde atuam. Da mesma forma, você pode limitar o acesso dos usuários do Dino seguindo outros critérios usando outras métricas, como a métrica projeto, para limitar o acesso a apenas alguns projetos, ou a métrica organização, para limitar o acesso apenas aos dados de alguns parceiros.

Além de serem usadas para limitar o acesso aos dados, as métricas também podem ser usadas para facilitar filtros e agregações. Por exemplo, posso querer contar quantos form foram coletados para um determinado país. Nesse caso, posso filtrar os dados do meu form com base no valor da métrica localização. Os filtros também podem se beneficiar da estrutura hierárquica das métricas. Por exemplo, se eu tiver uma estrutura de localização em, digamos, três níveis, porque mapeio províncias (ou seja, um valor de métrica para cada província), agrupadas em regiões (ou seja, um valor de métrica para cada região, que também é usado como pai das províncias), agrupadas em países (ou seja, um valor de métrica para cada país, que é usado como pai das regiões). Então, nesse caso, eu poderia filtrar todos os form de uma determinada região simplesmente filtrando a região, selecionando assim todas as províncias que compartilham a mesma região.

Esse mecanismo também pode ser usado ao gerar report. Um dado de report de um determinado report schema pode ser gerado usando um valor específico de uma métrica. Isso implicará que o report schema seja aplicado a todos os form que tenham o mesmo valor de métrica, seguindo uma hierarquia de valores de métrica.

Por fim, as métricas podem ser usadas para vincular dados de form diferentes. Por exemplo, posso ter um form para os dados pessoais dos beneficiários - um por pessoa - e depois outro form para suas visitas médicas - mais de um por pessoa. A métrica caso pode ser usada para vincular o form de dados pessoais aos form de visita e também para copiar alguns dos dados do form pessoal, como a data de nascimento, para os form de visita médica.

As diferentes formas de usar métricas tornam essa entidade uma ferramenta poderosa para gerenciar dados.

A seção Métricas é onde você gerencia as listas de valores disponíveis para cada categoria. Ela serve como o hub central para todos os seus dados de referência.

![Main view of the Metrics page](../imgs/metrics/index.png)

---

## Tipos de Métrica

A página principal exibe os tipos de métrica que estão ativos na sua instalação do Dino. Cada tipo é mostrado como um cartão com um ícone e um rótulo. Clique em qualquer cartão para abrir sua página de gerenciamento.

Dependendo da configuração do seu sistema, alguns ou todos os seguintes tipos de métrica podem estar disponíveis:

| Tipo de Métrica | Descrição |
|---|---|
| **Áreas Temáticas** | Áreas de trabalho ou agrupamentos temáticos para suas atividades. |
| **Casos** | Casos individuais, pessoas ou beneficiários acompanhados ao longo dos dados de form. |
| **Localizações** | Localizações geográficas onde os dados são coletados ou as atividades ocorrem. |
| **Projetos** | Projetos aos quais os dados de form e os report estão vinculados. |
| **Organizações** | Organizações envolvidas ou responsáveis pelas atividades. |

!!! tip "Acessando as Métricas"
    Você pode navegar até a área de Métricas clicando em **Métricas** no menu principal da aplicação.

---

## O Que Você Pode Fazer

Na página principal de Métricas, você pode:

1.  **Visualizar todos os tipos de métrica ativos** disponíveis para seus dados.
2.  **Navegar até um tipo de métrica específico** clicando em seu cartão. Isso leva você a uma página dedicada onde você pode gerenciar a lista de valores para aquele tipo (por exemplo, adicionar uma nova localização ou editar o nome de um projeto).
3.  **Usar o caminho de navegação** no topo da página para acompanhar seu percurso de navegação dentro da seção Métricas.

Para instruções detalhadas sobre como adicionar, editar ou excluir valores dentro de um tipo de métrica específico, consulte a documentação de cada tipo de métrica:

- [Áreas](areas.md)
- [Casos](cases.md)
- [Localizações](locations.md)
- [Organizações](organizations.md)
- [Projetos](projects.md).
---

## Navegando na Seção Métricas

1.  Na página principal de Métricas, revise os cartões de cada tipo de métrica disponível.
2.  Clique no cartão do tipo de métrica que você deseja gerenciar (por exemplo, **Localizações**).
3.  Você será levado a uma página dedicada para aquele tipo de métrica, onde poderá visualizar, adicionar, editar ou excluir valores específicos.
4.  Use o caminho de navegação no topo da página para navegar facilmente de volta à página principal de Métricas ou a outras seções.

!!! warning "Configuração do Sistema"
    Os tipos de métrica disponíveis são configurados pelo administrador do seu sistema. Se você não vir um tipo de métrica específico de que precisa, entre em contato com o seu administrador.

!!! warning "Excluindo um valor de métrica"
    Isso vale para todas as métricas. Excluir um valor de métrica, por exemplo uma determinada localização ou um caso, pode afetar os form que fazem referência a ele. É por isso que, antes de excluir um valor de métrica, o sistema verifica se há algum elemento no Dino associado a esse valor. Se houver dados de form, dados de report ou qualquer referência dentro das permissões, a exclusão desse valor não será permitida. Certifique-se de que nenhum registro ativo dependa de um valor de métrica antes de removê-lo.