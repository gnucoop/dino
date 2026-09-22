---
title: Lista de grupos
description: "Administre grupos de usuarios en Dino: vea, cree, edite y elimine grupos de permisos con roles, form schemas, report schemas y métricas asignados."
---

# Lista de grupos

La página **Lista de grupos** muestra todos los grupos de usuarios en Dino. Desde aquí puede ver, editar, eliminar y crear grupos. Cada grupo define un conjunto de permisos y reglas de acceso al vincular un rol de usuario con form schemas, report schemas, estados de form y tipos de métricas específicos (como áreas, casos, proyectos, ubicaciones u organizaciones).

![Vista principal de la página Lista de grupos](../imgs/administration/groups-list.png)

## Descripción general de la lista

La tabla muestra las siguientes columnas:

- **Nombre del grupo**: el nombre del grupo de usuarios (visible de forma predeterminada).
- **ID**: identificador interno (oculto de forma predeterminada).
- **Fecha de creación**: cuándo se creó el grupo (oculta de forma predeterminada).

Puede personalizar qué columnas aparecen haciendo clic en el icono **Ver columnas** (también llamado icono **hotdog** por los programadores de software) en el lado derecho del encabezado de la tabla.

## Búsqueda y filtrado

Use la **barra de búsqueda** en la parte superior de la página para filtrar grupos por palabra clave. El panel **Filtros** (expandible) le permite acotar la lista por:

- Rango de fechas (desde/hasta)
- Cualquier tipo de métrica definido en su implementación, es decir, uno o más de los siguientes: Proyecto, Ubicación, Área, Caso, Organización

También puede guardar y cargar ajustes predefinidos de filtros usando el gestor de ajustes predefinidos.

## Acciones sobre los grupos

Cada fila tiene tres iconos de acción a la derecha:

- **Ver**: ver los detalles del grupo (abre el editor en modo de solo lectura)
- **Editar**: editar las propiedades del grupo
- **Eliminar**: eliminar el grupo (requiere confirmación)


## Crear un nuevo grupo

1. Haga clic en el botón flotante **+** en la esquina inferior derecha de la pantalla.
2. En el cuadro de diálogo del editor que se abre, introduzca un **Nombre del grupo** (obligatorio).
3. Navegue por las pestañas para seleccionar:
    - **Rol de usuario** (obligatorio: debe elegir exactamente un rol)
    - **Form schemas**
    - **Estados del form**
    - **Report schemas**
    - **Tipos de métricas** (todos los tipos activos para su implementación: Área, Caso, Proyecto, Ubicación, Organización), si están activos
4. En el cuadro de diálogo de **elementos disponibles** a la derecha, seleccione uno o más elementos haciendo clic en el icono **añadir** junto a cada elemento para moverlo al panel **Elementos del grupo**.
5. Haga clic en **Guardar**.

!!! tip "Opción «Todos»"
    Para los tipos de métricas y otras categorías, es posible que vea una opción «Todos …». Al seleccionarla, la restricción se aplica a todos los elementos de ese tipo.

## Editar o ver un grupo

1. En la tabla, haga clic en el icono **Editar** (edit) o **Ver** (view) del grupo que desea modificar.
2. En el cuadro de diálogo del editor, puede:
    - Cambiar el **Nombre del grupo**.
    - Añadir o quitar elementos de cualquier pestaña (solo en modo de edición).
    - Quitar elementos haciendo clic en el icono **eliminar** junto a ellos.
3. Haga clic en **Guardar** para aplicar los cambios (el modo de vista solo muestra un botón **Cerrar**).

## Eliminar un grupo

1. Haga clic en el icono **eliminar** del grupo.
2. Confirme la eliminación en el cuadro de diálogo que aparece.

!!! warning "Acción irreversible"
    La eliminación de un grupo no se puede deshacer. Asegúrese de que ningún usuario dependa del grupo antes de eliminarlo.

## Páginas relacionadas

- [Lista de usuarios](users-list.md): administre cuentas de usuario individuales y sus asignaciones de grupos.
- [Métricas](../metrics/index.md): configure los tipos de métricas que se pueden asignar a los grupos (áreas, casos, proyectos, etc.).
- [Form schemas](../forms/edit-form-schema.md): cree y edite form schemas que se pueden vincular a grupos.
- [Report schemas](../reports/edit-report-schema.md): administre los report schemas disponibles para los grupos.
- [Descripción general de la interfaz](../interface/index.md): conozca la navegación y el diseño general.