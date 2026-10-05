---
title: Métricas
description: Una visión general del área de Métricas en Dino — los tipos de datos de referencia que se utilizan para clasificar y vincular los datos de los formularios y los informes.
---

# Métricas

Las Métricas son las categorías de datos de referencia que se utilizan en todo Dino para clasificar, organizar y filtrar los datos recopilados. Las métricas se pueden asociar a los formularios recopilados y luego utilizarse para definir vistas sobre los datos de su instalación. Por ejemplo, las métricas se pueden usar para definir permisos de usuario: a un usuario determinado se le puede conceder acceso solo a algunos valores específicos de las métricas. Esto puede ser útil, por ejemplo, en una organización que opera en varios países, si desea limitar a ciertos usuarios el acceso únicamente a los datos del país donde operan. De manera similar, puede limitar el acceso de los usuarios de Dino según otros criterios utilizando otras métricas, como la métrica proyecto, para limitar el acceso a solo algunos proyectos, o la métrica organización, para limitar el acceso únicamente a los datos de algunos socios.

Además de utilizarse para limitar el acceso a los datos, las métricas también pueden emplearse para facilitar los filtros y las agregaciones. Por ejemplo, es posible que quiera contar cuántos formularios se han recopilado para un país determinado. En este caso, puedo filtrar los datos de mis formularios en función del valor de la métrica ubicación. Los filtros también pueden beneficiarse de la estructura jerárquica de las métricas. Por ejemplo, si tengo una estructura de ubicaciones de, digamos, tres niveles, porque asigno provincias (es decir, un valor de métrica para cada provincia), agrupadas en regiones (es decir, un valor de métrica para cada región, que se utiliza también como padre de las provincias), agrupadas en países (es decir, un valor de métrica para cada país, que se utiliza como padre de las regiones). Así, en este caso podría filtrar todos los formularios de una región determinada simplemente filtrando la región, seleccionando así todas las provincias que comparten la misma región.

Este mecanismo también puede utilizarse al generar informes. Los datos de un informe de un esquema de informe determinado pueden generarse utilizando un valor concreto de una métrica. Esto implicará que el esquema de informe se aplique a todos los formularios que tengan el mismo valor de métrica, siguiendo una jerarquía de valores de métrica.

Por último, las métricas pueden utilizarse para vincular los datos de distintos formularios. Por ejemplo, puedo tener un formulario para los datos personales de los beneficiarios —uno por persona— y luego otro formulario para sus visitas médicas —más de uno por persona—. La métrica caso puede utilizarse para vincular el formulario de datos personales con los formularios de visitas, y también para copiar algunos de los datos del formulario personal, como la fecha de nacimiento, a los formularios de visitas médicas.

Las distintas formas de utilizar las métricas hacen de esta entidad una herramienta potente para gestionar los datos.

La sección Métricas es donde gestiona las listas de valores disponibles para cada categoría. Sirve como centro neurálgico para todos sus datos de referencia.

![Vista principal de la página Métricas](../imgs/metrics/index.png)

---

## Tipos de métricas

La página principal muestra los tipos de métricas que están activos en su instalación de Dino. Cada tipo se muestra como una tarjeta con un icono y una etiqueta. Haga clic en cualquier tarjeta para abrir su página de gestión.

Según la configuración de su sistema, pueden estar disponibles algunos o todos los siguientes tipos de métricas:

| Tipo de métrica | Descripción |
|---|---|
| **Áreas temáticas** | Áreas de trabajo o agrupaciones temáticas para sus actividades. |
| **Casos** | Casos individuales, personas o beneficiarios a los que se hace seguimiento en los datos de los formularios. |
| **Ubicaciones** | Ubicaciones geográficas donde se recopilan datos o se desarrollan actividades. |
| **Proyectos** | Proyectos a los que se vinculan los datos de los formularios y los informes. |
| **Organizaciones** | Organizaciones que participan en las actividades o son responsables de ellas. |

!!! tip "Acceder a las métricas"
    Puede navegar al área de Métricas haciendo clic en **Métricas** en el menú principal de la aplicación.

---

## Qué puede hacer

Desde la página principal de Métricas, puede:

1.  **Ver todos los tipos de métricas activos** disponibles para sus datos.
2.  **Navegar a un tipo de métrica específico** haciendo clic en su tarjeta. Esto le lleva a una página dedicada donde puede gestionar la lista de valores de ese tipo (por ejemplo, añadir una nueva ubicación o editar el nombre de un proyecto).
3.  **Utilizar la ruta de navegación** en la parte superior de la página para hacer seguimiento de su recorrido dentro de la sección Métricas.

Para obtener instrucciones detalladas sobre cómo añadir, editar o eliminar valores dentro de un tipo de métrica específico, consulte la documentación de cada tipo de métrica:

- [Áreas temáticas](areas.md)
- [Casos](cases.md)
- [Ubicaciones](locations.md)
- [Organizaciones](organizations.md)
- [Proyectos](projects.md).

---

## Navegar por la sección Métricas

1.  En la página principal de Métricas, revise las tarjetas de cada tipo de métrica disponible.
2.  Haga clic en la tarjeta del tipo de métrica que desea gestionar (por ejemplo, **Ubicaciones**).
3.  Se le llevará a una página dedicada a ese tipo de métrica, donde podrá ver, añadir, editar o eliminar valores específicos.
4.  Utilice la ruta de navegación en la parte superior de la página para volver fácilmente a la página principal de Métricas o a otras secciones.

!!! warning "Configuración del sistema"
    Los tipos de métricas disponibles los configura su administrador del sistema. Si no ve un tipo de métrica específico que necesita, póngase en contacto con su administrador.

!!! warning "Eliminar un valor de métrica"
    Esto es aplicable a todas las métricas. Antes de eliminar un valor de métrica, por ejemplo una ubicación o un caso determinados, Dino comprueba si todavía está en uso. Si algún formulario lo utiliza, o tiene valores secundarios, se rechaza la eliminación (*Some forms use these metrics. You cannot delete them.* / *Some metrics have children. You cannot delete them.*). Si solo lo utilizan informes, aparece una advertencia y aún puede confirmar. Los permisos de grupo que hacen referencia al valor **no** se comprueban: elimínelo de cualquier grupo antes de borrarlo.