---
title: Gestión de Usuarios y Grupos
description: Cómo crear, editar y gestionar cuentas de usuario y grupos de permisos en Dino.
---

# Gestión de Usuarios y Grupos

El área de Usuarios permite a los administradores gestionar quién puede acceder a Dino y qué se les permite hacer. Se divide en dos secciones: **Usuarios**, para cuentas individuales, y **Grupos**, para conjuntos de permisos que pueden asignarse a varios usuarios a la vez.

![Gestión de Usuarios y Grupos](../imgs/administration/users.png)

!!! warning "Solo acceso de administrador"
    Esta área solo es visible para usuarios con el rol de Administrador. Si no puede verla en la navegación, contacte a su administrador del sistema.

---

## Navegando por el Área de Usuarios

Cuando abra el área de Usuarios, verá un menú con dos opciones:

- **Usuarios** — gestionar cuentas de usuario individuales.
- **Grupos** — gestionar grupos de permisos.

Haga clic en cualquiera de las opciones para abrir la sección correspondiente.

---

## Usuarios

### Explorando la Lista de Usuarios

La lista de Usuarios muestra todas las cuentas del sistema, mostrando la **dirección de correo electrónico**, el **nombre completo** de cada usuario y un **interruptor de Deshabilitado** que indica si la cuenta está actualmente activa.

El número total de usuarios que coinciden con sus filtros actuales se muestra en la parte superior de la lista.

### Búsqueda y Filtrado

- Escriba en el campo de **búsqueda por palabra clave** para filtrar usuarios por cualquier texto en sus detalles.
- Utilice los campos **Fecha desde** y **Fecha hasta** para filtrar por fecha de creación de la cuenta.
- Utilice el filtro **Grupos de Usuarios** para mostrar solo los usuarios que pertenecen a un grupo de permisos específico.
- Borre cualquier filtro haciendo clic en el icono **×** dentro de ese campo.

### Habilitar o Deshabilitar un Usuario

Cada fila contiene un interruptor en la columna **Deshabilitado**. Haga clic directamente en el interruptor en la lista para habilitar o deshabilitar una cuenta de usuario sin abrir el editor.

### Agregar un Nuevo Usuario

!!! note
    La creación de nuevas cuentas requiere una conexión a Internet activa. Si está fuera de línea, el botón de agregar mostrará un icono de conectividad y la acción no estará disponible.

1. Haga clic en el **botón +** (botón flotante en la parte inferior derecha de la página).
2. Se abrirá un cuadro de diálogo. Complete los siguientes campos:
    - **Nombre Completo** — obligatorio.
    - **Correo Electrónico** — obligatorio.
    - **Contraseña** y **Confirmar Contraseña** — obligatorios en algunas instalaciones (al menos 9 caracteres).
    - **Grupos de Permisos de Usuario** — seleccione uno o más grupos del menú desplegable para controlar a qué puede acceder este usuario.
3. Haga clic en **Guardar** para crear la cuenta.

Aparecerá un mensaje de confirmación en la parte inferior de la pantalla cuando el usuario se haya guardado correctamente.

### Editar un Usuario

1. Encuentre al usuario en la lista y haga clic en el **icono de lápiz** en su fila.
2. El cuadro de diálogo del editor se abrirá en modo de edición. Puede actualizar el **Nombre Completo** y los **Grupos de Permisos de Usuario**.
3. Haga clic en **Guardar** para aplicar sus cambios, o en **Cerrar** para descartarlos.

### Ver un Usuario

Haga clic en el **icono de ojo** en la fila de un usuario para abrir sus detalles en modo de solo lectura. No se pueden realizar cambios en este modo. Haga clic en **Cerrar** cuando termine.

### Eliminar un Usuario

1. Haga clic en el **icono de eliminar** en la fila del usuario.
2. Aparecerá un mensaje de confirmación. Confirme para eliminar la cuenta permanentemente.

!!! warning
    Eliminar una cuenta de usuario es permanente y no se puede deshacer.

---

## Grupos

Los grupos de permisos definen qué áreas, formularios, informes y datos puede acceder un conjunto de usuarios. Asignar un usuario a un grupo le otorga todos los permisos definidos para ese grupo.

### Explorando la Lista de Grupos

La lista de Grupos muestra todos los grupos de permisos por nombre. El recuento total se muestra en la parte superior de la página.

### Búsqueda y Filtrado

- Utilice el campo de **búsqueda por palabra clave** para filtrar grupos por nombre.
- Utilice los campos **Fecha desde** y **Fecha hasta** para filtrar por fecha de creación.
- Utilice los filtros de métricas (**Proyecto**, **Ubicación**, **Área Temática**, **Caso**, **Organización**) para encontrar grupos asociados con ámbitos de datos específicos.
- Borre cualquier filtro haciendo clic en el icono **×** dentro de ese campo.

### Agregar un Nuevo Grupo

1. Haga clic en el **botón +** (botón flotante en la parte inferior derecha de la página).
2. Se abrirá un cuadro de diálogo que muestra una lista categorizada de elementos disponibles para asignar al grupo. Los elementos se agrupan en categorías como **Roles**, **Esquemas de Formulario**, **Estados de Formulario**, **Esquemas de Informes** y cualquier tipo de métrica activa.
3. Ingrese un **nombre de grupo** en el campo de nombre en la parte superior del cuadro de diálogo.
4. Seleccione los elementos que desea incluir en el grupo haciendo clic en ellos. Debe seleccionarse al menos un **Rol** antes de poder guardar.
5. Haga clic en **Guardar** para crear el grupo.

Aparecerá un mensaje de confirmación con el nombre del grupo cuando se haya guardado.

### Editar un Grupo

1. Haga clic en el **icono de lápiz** en la fila de un grupo.
2. El cuadro de diálogo del editor se abrirá con la configuración actual del grupo precargada.
3. Actualice el nombre o agregue y elimine elementos según sea necesario. Debe permanecer seleccionado al menos un Rol.
4. Haga clic en **Guardar** para aplicar sus cambios.

### Ver un Grupo

Haga clic en el **icono de ojo** en la fila de un grupo para abrir su configuración en modo de solo lectura. Haga clic en **Cerrar** cuando termine.

### Eliminar un Grupo

1. Haga clic en el **icono de eliminar** en la fila del grupo.
2. Aparecerá un mensaje de confirmación. Confirme para eliminar el grupo permanentemente.

!!! warning
    Eliminar un grupo es permanente. Los usuarios que solo estaban asignados a ese grupo perderán los permisos asociados inmediatamente.

---

## Resolución de Problemas

### "No se pueden crear nuevas cuentas de Usuario mientras se está fuera de línea."

!!! warning
    Su dispositivo no está conectado a Internet. Las nuevas cuentas de usuario solo se pueden crear cuando está en línea. Verifique su conexión e intente nuevamente. La edición y visualización de usuarios existentes sigue disponible mientras está fuera de línea.

### "¡Ups! Algo salió mal al guardar el Usuario."

!!! warning
    No se pudo guardar el usuario, posiblemente debido a un error de validación o a un problema temporal del servidor. Verifique que todos los campos obligatorios estén completados correctamente e intente nuevamente. Si el problema persiste, contacte a su administrador del sistema.

### "¡Ups! Algo salió mal al realizar la acción solicitada."

!!! warning
    Este mensaje puede aparecer al guardar o eliminar un grupo. Puede indicar un problema del lado del servidor o un conflicto con datos existentes. Intente nuevamente después de un momento. Si el problema continúa, contacte a su administrador del sistema.