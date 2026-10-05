---
title: Lista de grupos
description: "Gestiona grupos de usuarios en Dino: consulta, crea, edita y elimina grupos de permisos con roles, formularios, reportes y métricas asignados."
---

# Lista de grupos

La página **Lista de grupos** muestra todos los grupos de usuarios de Dino. Desde aquí puedes consultar, editar, eliminar y crear grupos. Cada grupo define un conjunto de permisos y reglas de acceso al vincular un rol de usuario con formularios, reportes, estados del formulario y tipos de métricas específicos (como áreas, casos, proyectos, ubicaciones u organizaciones).

![Vista principal de la página Lista de grupos](../imgs/administration/groups-list.png)

## Descripción general de la lista

La tabla muestra las siguientes columnas:

- **Nombre de grupo** – el nombre del grupo de usuarios (visible de forma predeterminada).
- **ID** – identificador interno (oculto de forma predeterminada).
- **Fecha de creación** – cuándo se creó el grupo (oculta de forma predeterminada).

El número de elementos encontrados aparece encima de la tabla, junto al paginador. Usa el botón **Columnas** (información sobre herramientas *Personalizar las columnas*), encima de la tabla a la derecha, para cambiar qué columnas se muestran.

## Búsqueda y filtrado

Usa el campo **buscar por palabra clave** de la barra de herramientas para filtrar grupos por nombre. Abre el cuadro de diálogo **Filtros** para ver más opciones:

1. Haz clic en **Filtros**.
2. Establece un **Desde fecha** y un **Hasta la fecha** para restringir los resultados a los grupos creados en ese intervalo.
3. Acota la lista con uno o varios filtros de métricas: **Proyecto**, **Ubicación**, **Área**, **Caso** u **Organización**, según cuáles estén activos en tu implementación.
4. Haz clic en **Buscar** para aplicar los filtros, o en **Restablecer los filtros** para borrarlos.

Los filtros aplicados aparecen como etiquetas debajo de la barra de herramientas. Haz clic en el icono **cancelar** de una etiqueta para quitar ese filtro.

## Acciones sobre los grupos

Pasa el cursor sobre una fila para mostrar los iconos **Editar** y **Ver**. Haz clic en una fila para seleccionarla: la barra de acciones encima de la tabla mostrará entonces todas las acciones que puedes usar sobre ella:

- **Ver** – Ver los detalles del grupo (abre la página del grupo en modo de solo lectura)
- **Editar** – Editar las propiedades del grupo
- **Eliminar** – Eliminar el grupo (se requiere confirmación)

## Crear un grupo nuevo

Los grupos se crean y se editan en una página dedicada, no en un cuadro de diálogo.

1. Haz clic en **Añadir nuevo grupo** en la barra de herramientas. Se abre la página *Crear grupo*.
2. Escribe el **Nombre de grupo** en el encabezado de la página.
3. Elige los elementos del grupo, una pestaña a la vez. Cada pestaña muestra cuántos elementos contiene y solo aparece si su categoría tiene elementos:
    - **Rol de usuario** (obligatorio: un grupo contiene exactamente un rol; si añades otro, lo reemplaza)
    - **Formulario**
    - **Estado del formulario**
    - **Reporte**
    - Una pestaña por cada tipo de métrica activo (**Área**, **Caso**, **Proyecto**, **Ubicación**, **Organización**)
4. En el panel izquierdo, busca los elementos y haz clic en **Añadir** junto a cada uno que quieras, o en **Añadir todos los mostrados** para añadir todos los elementos de la lista. El panel derecho (*En el grupo*) muestra lo que el grupo contiene para esa categoría.
5. Haz clic en **Guardar**. Solo se habilita cuando el grupo tiene un nombre y un rol de usuario.

!!! tip "Opción Todos"
    Todas las categorías excepto Rol de usuario tienen una opción "Todos los…" en la parte superior de su lista (por ejemplo, *Todos los formularios*). Al elegirla, se reemplazan los elementos individuales; al añadir un elemento individual, se elimina. En las métricas con jerarquía, añadir un valor también añade sus elementos secundarios.

!!! note "Grupos de administrador"
    Si el rol del grupo es un rol de administrador, **Formulario** y **Reporte** siempre se establecen en **Todos** y quedan bloqueados, tal como indica un icono de candado: solo un grupo que tenga **Todos** en ellos puede crear nuevos esquemas. Elige un rol diferente para liberar el bloqueo.

## Editar o ver un grupo

1. En la tabla, haz clic en el icono **Editar** o **Ver** del grupo. Se abre la página *Editar grupo* o *Ver grupo*.

    ![Editor para modificar un grupo de permisos de usuario](../imgs/administration/groups-list-edit.png)

2. En el modo de edición puedes:
    - Cambiar el **Nombre de grupo**.
    - Añadir elementos desde el panel izquierdo, o quitarlos del panel derecho con el botón × (**Vaciar** elimina todos los elementos de la categoría).
3. Haz clic en **Guardar** para aplicar los cambios. No hay botón Cancelar: para salir sin guardar, vuelve atrás mediante el recorrido de navegación.

En el modo de visualización todo es de solo lectura y no hay **Guardar**.

## Eliminar un grupo

1. Haz clic en la fila del grupo para seleccionarla y, a continuación, haz clic en **Eliminar** en la barra de acciones.
2. Confirma la eliminación en el cuadro de diálogo que aparece.

!!! warning "Acción irreversible"
    Eliminar un grupo no se puede deshacer. Asegúrate de que ningún usuario dependa del grupo antes de eliminarlo.

## Páginas relacionadas

- [Lista de usuarios](users-list.md) – gestiona las cuentas de usuario individuales y sus asignaciones de grupo.
- [Métricas](../metrics/index.md) – configura los tipos de métricas que se pueden asignar a los grupos (áreas, casos, proyectos, etc.).
- [Formularios](../forms/edit-form-schema.md) – crea y edita formularios que se pueden vincular a los grupos.
- [Reportes](../reports/edit-report-schema.md) – gestiona los reportes disponibles para los grupos.
- [Descripción general de la interfaz](../interface/index.md) – conoce la navegación y el diseño general.