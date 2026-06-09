---
title: Lista de Usuarios
description: Vea, edite y administre cuentas de usuario en su organización de Dino.
---

# Lista de Usuarios

La página Lista de Usuarios muestra una lista completa de todas las cuentas de usuario en su organización de Dino. Desde aquí puede ver los detalles de los usuarios, editar cuentas y crear nuevos usuarios.

![Vista principal de la página Lista de Usuarios](../imgs/administration/users-list.png)

## Comprender la Lista de Usuarios

La lista principal muestra información clave de cada usuario:
*   **Correo electrónico:** La dirección de correo electrónico de inicio de sesión del usuario.
*   **Nombre completo:** El nombre asociado a la cuenta.
*   **Deshabilitado:** Un interruptor que indica si la cuenta está activa o deshabilitada. Puede hacer clic en este interruptor directamente en la lista para cambiar el estado.

Puede ordenar la lista por la columna **Fecha de creación**. La columna **ID** está oculta de forma predeterminada.

## Trabajar con la Lista

### Búsqueda y Filtrado

Use la barra de búsqueda en la parte superior de la página para encontrar usuarios por su correo electrónico o nombre completo.

Para aplicar filtros más específicos:
1.  Haga clic en el icono de filtro en la barra de búsqueda.
2.  En la sección **Grupos de permisos de usuario**, puede seleccionar uno o más grupos de usuarios para filtrar la lista y mostrar solo los miembros de esos grupos.

### Acciones de Usuario

Cada fila de usuario tiene un menú de acciones (tres puntos verticales) en el lado derecho. Haga clic en él para acceder a las siguientes opciones:

*   **Editar:** Abre el editor de usuario para modificar los detalles de la cuenta.
*   **Eliminar:** Elimina permanentemente la cuenta de usuario. Se le pedirá que confirme esta acción.
*   **Ver:** Abre una vista de solo lectura de los detalles del usuario.

También puede hacer clic en cualquier lugar de la fila de un usuario para seleccionarla, o hacer clic en el icono de expandir para ver un resumen de la información del usuario directamente en la lista.

## Crear un Nuevo Usuario

Para agregar un nuevo usuario a su organización:

1.  Haga clic en el botón flotante azul **+** en la esquina inferior derecha de la pantalla.
2.  Se abrirá un formulario. Ingrese los detalles del nuevo usuario, incluidos correo electrónico, nombre y asígnelo a los grupos de usuarios correspondientes. Para obtener más información sobre los grupos, consulte [Lista de grupos](groups-list.md).
3.  Haga clic en **Guardar** para crear la cuenta. El nuevo usuario recibirá un correo electrónico con instrucciones para establecer su contraseña.

!!! warning "Restricción sin conexión"
    El botón **+** estará deshabilitado (mostrando un icono de Wi-Fi apagado) si no está conectado a Internet. No se pueden crear nuevas cuentas de usuario sin conexión. Aún puede ver y editar usuarios existentes sin conexión.

## Editar un Usuario

Para modificar la información de un usuario existente:

1.  Haga clic en el menú de acciones (tres puntos) en la fila del usuario.
2.  Seleccione **Editar**.
3.  En el editor, actualice cualquiera de los detalles del usuario o asignaciones de grupos.
4.  Haga clic en **Guardar** para aplicar los cambios.

!!! tip "Deshabilitado rápido"
    Puede habilitar o deshabilitar rápidamente la capacidad de inicio de sesión de un usuario haciendo clic en el interruptor **Deshabilitado** directamente en la lista, sin necesidad de abrir el editor completo.