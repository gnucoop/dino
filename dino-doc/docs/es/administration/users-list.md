---
title: Lista de usuarios
description: Ver, editar y gestionar cuentas de usuario en tu organización de Dino.
---

# Lista de usuarios

La página Lista de usuarios proporciona una lista completa de todas las cuentas de usuario en tu organización de Dino. Desde aquí, puedes ver los detalles de los usuarios, editar cuentas y crear nuevos usuarios.

![Vista principal de la página Lista de usuarios](../imgs/administration/users-list.png)

## Entender la Lista de usuarios

La lista principal muestra información clave de cada usuario:

*   **Email:** La dirección de correo electrónico de inicio de sesión del usuario.
*   **Nombre completo:** El nombre asociado a la cuenta.
*   **Disabled:** Un interruptor que indica si la cuenta está activa o deshabilitada. Puedes hacer clic en este interruptor directamente en la lista para cambiar el estado.

Puedes ordenar la lista por las columnas **Email**, **Nombre completo** o **Fecha de creación**. Las columnas **ID** y **Fecha de creación** están ocultas de forma predeterminada. Para mostrar u ocultar columnas, haz clic en el botón **Columnas** situado encima de la lista, a la derecha, y selecciona las que quieras mostrar.

## Trabajar con la lista

### Buscar y filtrar

Usa la barra de búsqueda en la parte superior de la página para encontrar usuarios por su correo electrónico o nombre completo.

Para aplicar filtros más específicos:

1.  Haz clic en el botón **Filtros** en la barra de búsqueda.
2.  Establece una **Desde fecha** y una **Hasta la fecha** para filtrar por fecha de creación, y selecciona uno o varios grupos de usuarios para limitar la lista a los miembros de esos grupos.
3.  Haz clic en **Buscar** para aplicar los filtros, o en **Restablecer los filtros** para borrarlos.

Los filtros aplicados aparecen como chips debajo de la barra de búsqueda. Haz clic en el icono **cancelar** de un chip para eliminar ese filtro.

### Acciones sobre el usuario

Pasa el cursor sobre la fila de un usuario para mostrar los iconos **Editar** y **Ver**. Haz clic en cualquier parte de la fila para seleccionarla: la barra de acciones situada encima de la lista mostrará entonces todas las acciones que puedes realizar sobre el usuario seleccionado:

*   **Editar:** Abre el editor de usuario para modificar los detalles de la cuenta.
*   **Ver:** Abre una vista de solo lectura de los detalles del usuario.
*   **Eliminar:** Elimina permanentemente la cuenta de usuario. Se te pedirá que confirmes esta acción.

## Crear un nuevo usuario

Para agregar un nuevo usuario a tu organización:

1.  Haz clic en el botón **Agregar nuevo usuario** en la barra de herramientas situada encima de la lista.
2.  Se abrirá un formulario. Introduce el **Nombre completo** y el **Email** del nuevo usuario, y asígnalo a los grupos correspondientes en **User Permission Groups**. Para obtener más información sobre los grupos, consulta [Lista de grupos](groups-list.md).
    Según cómo Dino inicie la sesión de los usuarios, el formulario también puede solicitar una **Contraseña** y **confirmar Contraseña**, de al menos 9 caracteres.
3.  Haz clic en **Guardar** para crear la cuenta.

El botón **Guardar** permanece no disponible hasta que todos los campos obligatorios se hayan rellenado correctamente.

!!! tip "Modos de visualización y edición"
    El mismo formulario se utiliza para crear, editar y ver usuarios. En el modo **Ver**, todos los campos son de solo lectura y solo se muestra el botón **Cerrar**.

## Editar un usuario

Para modificar la información de un usuario existente:

1.  Pasa el cursor sobre la fila del usuario y haz clic en el icono **Editar**, o selecciona la fila y haz clic en **Editar** en la barra de acciones.
2.  En el editor, actualiza el nombre completo del usuario o sus asignaciones de grupo. La dirección de correo electrónico no se puede cambiar aquí.
3.  Haz clic en **Guardar** para aplicar los cambios.

!!! tip "Deshabilitación rápida"
    Puedes habilitar o deshabilitar rápidamente la capacidad de un usuario para iniciar sesión haciendo clic en el interruptor **Disabled** directamente en la lista, sin abrir el editor completo.

## Páginas relacionadas

*   [Usuarios](users.md)
*   [Lista de grupos](groups-list.md)