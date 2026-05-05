---
title: Lista de grupos
description: Visualiza y gestiona los grupos de usuarios en la página de Lista de grupos en Dino. Aprende sobre filtros, la tabla de datos y cómo crear o editar grupos.
---

# Lista de grupos

La página de Lista de grupos muestra todos los grupos de usuarios en tu instancia de Dino. Desde aquí puedes ver, filtrar y crear nuevos grupos, o editar los existentes.

![Vista principal de la página de Lista de grupos](../imgs/administration/groups-list.png)

## Lo que ves

La página contiene:

- **Barra de búsqueda y filtros** – Usa los filtros disponibles para reducir la lista de grupos. Los filtros incluyen Proyecto, Ubicación, Área, Caso y Organización. También puedes usar el cuadro de búsqueda general para encontrar grupos por nombre.
- **Tabla de datos** – Muestra información clave de cada grupo, incluido el nombre del grupo. Las columnas adicionales (ID, fecha de creación) están ocultas por defecto, pero se pueden hacer visibles mediante el selector de columnas.
- **Botón de acción flotante** – Un botón "+" en la esquina inferior derecha abre el editor para crear un nuevo grupo.
- **Acciones de fila** – Haz clic en una fila para mostrar opciones en línea para seleccionar o expandir más detalles sobre ese grupo.

## Uso de filtros

1. Haz clic en el icono de filtro para abrir la barra de filtros.
2. Elige un tipo de filtro del menú desplegable (por ejemplo, **Proyecto**).
3. Selecciona o escribe el valor por el que deseas filtrar.
4. La lista se actualiza automáticamente para mostrar solo los grupos que coinciden.

!!! tip "Múltiples filtros"
    Puedes aplicar varios filtros a la vez para reducir aún más los resultados.

## Crear un nuevo grupo

1. Haz clic en el botón flotante **+** en la parte inferior derecha de la página.
2. Se abre el editor de grupos. Ingresa la información requerida:
   - **Nombre del grupo** – Un nombre único para el grupo.
3. Opcionalmente, asigna usuarios al grupo (consulta [Lista de usuarios](users-list.md) para gestionar usuarios individuales).
4. Haz clic en **Guardar** para crear el grupo. Aparece en la lista de inmediato.

## Editar o ver un grupo

- **Haz clic en cualquier lugar de una fila** para expandir o seleccionar el grupo. Las acciones disponibles dependen de tus permisos.
- Para abrir el editor completo de un grupo, haz clic en el icono de edición (lápiz) que aparece en la fila.
- Puedes cambiar el nombre del grupo y sus miembros.

!!! warning "Eliminar grupos"
    Eliminar un grupo elimina a todos sus miembros del grupo. Esta acción no se puede deshacer. Elimina mediante el icono de eliminar de la fila (papelera) después de expandir o seleccionar la fila.

## Páginas relacionadas

- [Lista de usuarios](users-list.md) – Gestiona cuentas de usuario individuales
- [Usuarios](users.md) – Resumen de la administración de usuarios
- [Notificaciones](../notifications/index.md) – Configura notificaciones para grupos