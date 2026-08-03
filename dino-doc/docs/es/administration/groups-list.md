---
title: Lista de grupos
description: "Administre los grupos de usuarios en Dino: vea, cree, edite y elimine grupos de permisos con roles, formularios, informes y métricas asignados."
---

# Lista de grupos

La página **Lista de grupos** muestra todos los grupos de usuarios en Dino. Desde aquí puede ver, editar, eliminar y crear grupos. Cada grupo define un conjunto de permisos y reglas de acceso al vincular un rol de usuario con esquemas de formularios, esquemas de informes, estados de formularios y tipos de métricas específicos (como áreas, casos, proyectos, ubicaciones u organizaciones).

![Main view of the Groups List page](../imgs/administration/groups-list.png)

## Resumen de la lista

La tabla muestra las siguientes columnas:

- **Nombre del grupo** – el nombre del---
title: Lista de grupos
description: Administre los grupos de usuarios en Dino: vea, cree, edite y elimine grupos de permisos con roles, formularios, informes y métricas asignados.
---

# Lista de grupos

La página **Lista de grupos** muestra todos los grupos de usuarios en Dino. Desde aquí puede ver, editar, eliminar y crear grupos. Cada grupo define un conjunto de permisos y reglas de acceso al vincular un rol de usuario con esquemas de formularios, esquemas de informes, estados de formularios y tipos de métricas específicos (como áreas, casos, proyectos, posiciones u organizaciones).

![Main view of the Groups List page](../imgs/administration/groups-list.png)

## Resumen de la lista

La tabla muestra las siguientes columnas:

- **Nombre del grupo**: el nombre del grupo de usuarios (visible de forma predeterminada).
- **ID**: identificador interno (oculto de forma predeterminada).
- **Fecha de creación**: cuándo se creó el grupo (oculta de forma predeterminada).

Puede personalizar qué columnas aparecen haciendo clic en el icono **Ver columnas** (¡también llamado icono **hotdog** por los programadores de software!) en el lado derecho del encabezado de la tabla.

## Búsqueda y filtrado

Use la **barra de búsqueda** en la parte superior de la página para filtrar grupos por palabra clave. El panel **Filtros** (expandible) le permite reducir la lista por:

- Rango de fechas (desde/hasta)
- Cualquier tipo de métrica definido en su implementación, es decir, uno o más de los siguientes: Proyecto, Posición, Área, Caso, Organización

También puede guardar y cargar ajustes predefinidos de filtros mediante el administrador de ajustes predefinidos.

## Acciones sobre los grupos

Cada fila tiene tres iconos de acción a la derecha:

- **Ver**: ver los detalles del grupo (abre el editor en modo de solo lectura).
- **Editar**: editar las propiedades del grupo.
- **Eliminar**: eliminar el grupo (se requiere confirmación).

## Creación de un nuevo grupo

1. Haga clic en el botón flotante **+** en la parte inferior derecha de la pantalla.
2. En el cuadro de diálogo del editor que se abre, introduzca un **Nombre del grupo** (obligatorio).
3. Navegue por las pestañas para seleccionar:
    - **Rol de usuario** (obligatorio: debe elegir exactamente un rol).
    - **Esquemas de formularios**.
    - **Estados de formularios**.
    - **Esquemas de informes**.
    - **Tipos de métricas** (todos los tipos activos para su implementación: Área, Caso, Proyecto, Posición, Organización), si está activo.
4. En el cuadro de diálogo **elementos disponibles** de la derecha, seleccione uno o más elementos haciendo clic en el icono **agregar** junto a cada elemento para moverlo al panel **Elementos del grupo**.
5. Haga clic en **Guardar**.

!!! tip "Opción Todos"
    Para los tipos de métricas y otras categorías, es posible que vea una opción "Todos...". Si la selecciona, la restricción se aplica a todos los elementos de ese tipo.

## Edición o visualización de un grupo

1. En la tabla, haga clic en el icono **Editar** (editar) o **Ver** (ver) del grupo que desee modificar.
2. En el cuadro de diálogo del editor, puede:
    - Cambiar el **Nombre del grupo**.
    - Agregar o quitar elementos de cualquier pestaña (solo en modo de edición).
    - Quitar elementos haciendo clic en el icono **eliminar** junto a ellos.
3. Haga clic en **Guardar** para aplicar los cambios (el modo de ver solo muestra un botón **Cerrar**).

## Eliminación de un grupo

1. Haga clic en el icono **eliminar** del grupo.
2. Confirme la eliminación en el cuadro de diálogo que aparece.

!!! warning "Acción irreversible"
    La eliminación de un grupo no se puede deshacer. Asegúrese de que ningún usuario dependa del grupo antes de eliminarlo.

## Páginas relacionadas

- [Lista de usuarios](users-list.md): administre las cuentas de usuario individuales y sus asignaciones de grupos.
- [Métricas](../metrics/index.md): configure los tipos de métricas que se pueden asignar a los grupos (áreas, casos, proyectos, etc.).
- [Esquemas de formularios](../forms/edit-form-schema.md): cree y edite esquemas de formularios que se puedan vincular a los grupos.
- [Esquemas de informes](../reports/edit-report-schema.md): administre los esquemas de informes disponibles para los grupos.
- [Resumen de la interfaz](../interface/index.md): obtenga información sobre la navegación y el diseño general.