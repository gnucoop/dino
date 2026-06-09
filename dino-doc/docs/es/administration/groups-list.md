---
title: Lista de grupos
description: Vea y gestione grupos de usuarios en la página Lista de grupos de Dino. Conozca los filtros, la tabla de datos y cómo crear o editar grupos.
---

# Lista de grupos

La página Lista de grupos muestra todos los grupos de usuarios de su instancia de Dino. Desde aquí puede ver, filtrar y crear nuevos grupos, o editar los existentes.

![Vista principal de la página Lista de grupos](../imgs/administration/groups-list.png)

## Lo que ve

La página contiene:

- **Barra de búsqueda y filtros** – Utilice los filtros disponibles para reducir la lista de grupos. Los filtros incluyen Proyecto, Ubicación, Área, Caso y Organización. También puede usar el cuadro de búsqueda general para encontrar grupos por nombre.
- **Tabla de datos** – Muestra información clave de cada grupo, incluyendo el nombre del grupo. Las columnas adicionales (ID, fecha de creación) están ocultas por defecto, pero se pueden hacer visibles mediante el selector de columnas.
- **Botón de acción flotante** – Un botón "+" en la esquina inferior derecha abre el editor para crear un nuevo grupo.
- **Acciones de fila** – Haga clic en una fila para mostrar opciones en línea para seleccionar o expandir más detalles sobre ese grupo.

## Uso de filtros

1. Haga clic en el icono de filtro para abrir la barra de filtros.
2. Elija un tipo de filtro del menú desplegable (p. ej., **Proyecto**).
3. Seleccione o escriba el valor por el que desea filtrar.
4. La lista se actualiza automáticamente para mostrar solo los grupos que coinciden.

!!! tip "Filtros múltiples"
    Puede aplicar varios filtros a la vez para reducir aún más los resultados.

## Crear un nuevo grupo

1. Haga clic en el botón flotante **+** en la parte inferior derecha de la página.
2. Se abre el editor de grupos. Ingrese la información requerida:
   - **Nombre del grupo** – Un nombre único para el grupo.
3. Opcionalmente, asigne usuarios al grupo (consulte [Lista de usuarios](users-list.md) para gestionar usuarios individuales).
4. Haga clic en **Guardar** para crear el grupo. Aparece en la lista de inmediato.

## Editar o ver un grupo

- **Haga clic en cualquier parte de una fila** para expandir o seleccionar el grupo. Las acciones disponibles dependen de sus permisos.
- Para abrir el editor completo de un grupo, haga clic en el icono de edición (lápiz) que aparece en la fila.
- Puede cambiar el nombre del grupo y sus miembros.

!!! warning "Eliminar grupos"
    Eliminar un grupo elimina a todos sus miembros del grupo. Esta acción no se puede deshacer. Elimine mediante el icono de eliminar (papelera) de la fila después de expandir o seleccionar la fila.

## Páginas relacionadas

- [Lista de usuarios](users-list.md) – Gestionar cuentas de usuario individuales
- [Usuarios](users.md) – Resumen de la administración de usuarios
- [Notificaciones](../notifications/index.md) – Configurar notificaciones para grupos