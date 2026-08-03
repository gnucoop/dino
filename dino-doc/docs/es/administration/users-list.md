---
title: Lista de Usuarios
description: Consulta, edita y gestiona las cuentas de usuario en tu organización Dino.
---

# Lista de Usuarios

La página Lista de Usuarios proporciona una lista completa de todas las cuentas de usuario en tu organización Dino. Desde aquí puedes ver los detalles del usuario, editar cuentas y crear nuevos usuarios.

![Main view of the Users List page](../imgs/administration/users-list.png)

## Entender la Lista de Usuarios

La lista principal muestra información clave para cada usuario:

*   **Correo electrónico:** La dirección de correo electrónico con la que el usuario inicia sesión.
*   **Nombre completo:** El nombre asociado a la cuenta.
*   **Deshabilitado:** Un interruptor que indica si la cuenta está activa o deshabilitada. Puedes hacer clic en este interruptor directamente en la lista para cambiar el estado.

Puedes ordenar la lista por la columna **Fecha de creación**. La columna **ID** está oculta por defecto.

## Trabajar con la lista

### Búsqueda y filtrado

Usa la barra de búsqueda en la parte superior de la página para encontrar usuarios por su correo electrónico o nombre completo.

Para aplicar filtros más específicos:

1.  Haz clic en el icono de filtro de la barra de búsqueda.
2.  En la sección **Grupos de permisos de usuario**, puedes seleccionar uno o más grupos de usuarios para filtrar la lista y mostrar solo los miembros de esos grupos.

### Acciones del usuario

Cada fila de usuario tiene un menú de acciones (tres puntos verticales) en el lado derecho. Haz clic en él para acceder a las siguientes opciones:

*   **Editar:** Abre el editor de usuario para modificar los detalles de la cuenta.
*   **Eliminar:** Elimina permanentemente la cuenta de usuario. Se te pedirá que confirmes esta acción.
*   **Ver:** Abre una vista de solo lectura de los detalles del usuario.

También puedes hacer clic en cualquier parte de la fila de un usuario para seleccionarla, o hacer clic en el icono de expandir para ver un resumen de la información del usuario directamente en la lista.

## Crear un nuevo usuario

Para agregar un nuevo usuario a tu organización:

1.  Haz clic en el botón flotante azul **+** en la esquina inferior derecha de la pantalla.
2.  Se abrirá un formulario. Introduce los datos del nuevo usuario, incluidos el correo electrónico y el nombre, y asígnalo a los grupos de usuarios correspondientes. Para obtener más información sobre los grupos, consulta [Lista de grupos](groups-list.md).
3.  Haz clic en **Guardar** para crear la cuenta. El nuevo usuario recibirá un correo electrónico con instrucciones para establecer su contraseña.

!!! warning "Restricción sin conexión"
    El botón **+** estará deshabilitado (mostrando un icono de Wi-Fi apagado) si no estás conectado a internet. No se pueden crear cuentas de usuario nuevas sin conexión. Aún puedes ver y editar usuarios existentes sin conexión.

## Editar un usuario

Para modificar la información de un usuario existente:

1.  Haz clic en el menú de acciones (tres puntos) en la fila del usuario.
2.  Selecciona **Editar**.
3.  En el editor, actualiza cualquiera de los detalles del usuario o sus asignaciones de grupos.
4.  Haz clic en **Guardar** para aplicar los cambios.

!!! tip "Desactivación rápida"
    Puedes habilitar o deshabilitar rápidamente la capacidad de un usuario para iniciar sesión haciendo clic en el interruptor **Deshabilitado** directamente en la lista, sin abrir el editor completo.