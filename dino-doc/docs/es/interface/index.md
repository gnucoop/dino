---
title: Navegación e interfaz
description: Una descripción general del shell de la aplicación Dino: la barra de herramientas, la navegación lateral, las notificaciones, la sincronización de datos y el área de usuario.
---

# Navegación e interfaz

La interfaz de Dino consta de una barra de herramientas superior y un menú de navegación lateral que están presentes en todas las páginas después de iniciar sesión.

![Main view of the Main Nav page](../imgs/interface/index.png)

---

## Navegación lateral

El menú lateral le permite moverse entre las áreas principales de la aplicación.

**Secciones estándar** (visibles para todos los usuarios autenticados):

| Sección | Descripción |
|---|---|
| Dashboard | La pantalla de inicio. |
| Formularios | Formularios de recopilación de datos y envíos. |
| Informes | Informes generados. |
| Agregación | Vista unificada de los envíos de varios formularios. |
| Métricas | Datos de referencia (proyectos, ubicaciones, organizaciones, etc.). *(Oculto para usuarios solo invitados).* |
| IA | Asistente de IA (DinoGPT). |

**Secciones de administración** (visibles solo para administradores, que aparecen debajo de un divisor):

| Sección | Descripción |
|---|---|
| Usuarios | Cuentas de usuario y grupos de permisos. |
| Idiomas | Gestión de traducciones de la interfaz. |

En pantallas grandes, el menú siempre está visible a la izquierda. En pantallas más pequeñas, se contrae y se puede abrir con el botón de menú (icono de hamburguesa) de la barra de herramientas superior. En cualquier tamaño de pantalla, haga clic en el botón de menú para expandir las etiquetas del menú o contraerlas para mostrar solo iconos.

---

## Barra de herramientas superior

La barra de herramientas de la parte superior de la pantalla contiene los siguientes controles, de izquierda a derecha:

- **Alternar menú** — abrir o contraer el menú lateral.
- **Logotipo** — muestra el logotipo de su organización.
- **Indicador de nueva versión** — aparece un icono de descarga cuando hay una nueva versión de Dino disponible. Haga clic en él para recargar la aplicación y aplicar la actualización.
- **Créditos DINO-AI** — muestra su saldo restante de créditos de IA como una insignia. Haga clic para abrir el [Área de usuario](#user-area) en el panel de Créditos. *(Solo visible si se ha configurado una clave API de DINO-AI).*
- **Alternador de modo oscuro / claro** — un icono de sol, un control deslizante y un icono de luna. Use el control deslizante para alternar entre los temas claro y oscuro. *(Oculto en móvil; use el Área de usuario en su lugar).*
- **Icono de información** — pase el cursor para ver la información de versión de esta instalación.
- **Icono de ayuda** — abre la lista de reproducción de tutoriales de Dino en una nueva pestaña.
- **Icono de configuración** — abre el [Área de usuario](#user-area).
- **Icono de sincronización** — muestra el estado actual de sincronización de datos. Haga clic para activar una sincronización manual.
- **Campana de notificaciones** — muestra el número de notificaciones no leídas como una insignia. La campana suena cuando llegan nuevas notificaciones. Consulte [Notificaciones](#notifications) a continuación.
- **Selector de idioma** — cambie el idioma de la interfaz.
- **Nombre de usuario** — haga clic para abrir el [Área de usuario](#user-area).
- **Icono de cerrar sesión** — haga clic para cerrar sesión. El icono aparece atenuado mientras hay una sincronización en curso o cuando el dispositivo está sin conexión; en esos estados no se puede cerrar sesión.

---

## Sincronización de datos

Dino sincroniza sus datos con el servidor en segundo plano. El **icono de sincronización** de la barra de herramientas muestra el estado actual:

| Icono | Significado |
|---|---|
| `sync` (estático) | Todos los datos están actualizados. |
| `sync_problem` (pulsante) | Tiene cambios locales que aún no se han sincronizado. Haga clic para activar una sincronización. |
| `sync` (girando) | Hay una sincronización en curso. |
| `sync_disabled` | El dispositivo está sin conexión; la sincronización no está disponible. |
| `sync` con insignia `!` | Se encontró un problema de sincronización. Consulte sus notificaciones para más detalles. |

Cuando se completa una sincronización, aparece una notificación brevemente en la parte inferior de la pantalla:

- *"Sincronización completa"* — todos los datos se sincronizaron correctamente.
- *"Sincronización completada con errores. No se pudieron sincronizar: [elementos]. Consulte sus notificaciones."* — uno o más conjuntos de datos no se pudieron sincronizar. También se crea una notificación en su lista de notificaciones.

---

## Notificaciones

Haga clic en el **icono de la campana** de la barra de herramientas para abrir el menú desplegable de notificaciones. La insignia de la campana muestra el número de mensajes no leídos.

![Notifications dropdown open](../imgs/interface/index-notifications.png)

Desde el menú desplegable puede:

1. **Hacer clic en una notificación** para marcarla como leída.
2. **Hacer clic en el botón de flecha** de una notificación (si está presente) para ir directamente al área correspondiente de la aplicación.
3. **Marcar todo como leído** — marca todas las notificaciones actuales como leídas.
4. **Ver todas las notificaciones** — navega a la página completa de [Notificaciones](../notifications/index.md).

---

## Área de usuario

Haga clic en el **icono de configuración**, en su **nombre de usuario** o en el **contador de créditos DINO-AI** para abrir el diálogo del Área de usuario. Muestra su nombre completo y su dirección de correo electrónico en la parte superior.

![User area dialog open](../imgs/interface/index-user-area.png)

### Cambiar contraseña

1. Introduzca su **contraseña actual**.
2. Introduzca una **nueva contraseña**.
3. **Confirme la nueva contraseña**.
4. Haga clic en el botón de flecha para guardar.

Aparecerá un mensaje de error si la contraseña actual es incorrecta o si las nuevas contraseñas no coinciden.

### Claves API

Vea o configure su **clave API de DINO-AI**. Una vez que se almacena una clave válida, se muestra en modo de solo lectura. Use el icono del ojo para mostrar u ocultar la clave y el icono de copiar para copiarla al portapapeles.

### Créditos

Muestra su **saldo actual de créditos DINO-AI**. Si hay una integración de pagos configurada, hay un botón **Añadir más** disponible para comprar créditos adicionales.

!!! tip "Visibilidad"
    Esta sección solo es visible cuando se ha configurado una clave API de DINO-AI.

### Tema DINO

Personalice la combinación de colores de la aplicación:

- **Color primario**, **color de acento**, **color de advertencia** — haga clic en los campos de color para abrir un selector de color.
- **Nombre del ajuste preestablecido** — escriba o seleccione un nombre para guardar o cargar un ajuste de color preestablecido.
- Haga clic en **Guardar** para guardar los colores actuales como un ajuste preestablecido con nombre, o en **Cargar** para aplicar un ajuste preestablecido guardado.

En el móvil, aquí también aparece un **alternador de modo oscuro / claro**.

### Tutoriales

Haga clic en **Iniciar el tour de Dino** para reiniciar el recorrido guiado de la aplicación desde el principio.

!!! tip "Disponibilidad"
    Esta sección solo se muestra si el recorrido guiado está configurado en su instalación.

### Copia de seguridad y restauración

*(Solo administradores, si está habilitado).*

- **Copia de seguridad de datos** — descarga una exportación completa de la base de datos de la aplicación como archivo JSON.
- **Restaurar datos** — carga un archivo JSON exportado previamente para restaurar la base de datos.

!!! warning "Precaución al restaurar"
    Restaurar los datos reemplazará la base de datos actual. Esta acción no se puede deshacer.