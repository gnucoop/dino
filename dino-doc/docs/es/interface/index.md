---
title: Navegación e interfaz
description: "Una visión general del entorno de la aplicación Dino: la barra de herramientas, la navegación lateral, las notificaciones, la sincronización de datos y el área de usuario."
---

# Navegación e interfaz

La interfaz de Dino consta de una barra de herramientas superior y un menú de navegación lateral que están presentes en todas las páginas después de iniciar sesión.

![Vista principal de la página de navegación principal](../imgs/interface/index.png)

---

## Navegación lateral

El menú lateral te permite moverte entre las áreas principales de la aplicación.

**Secciones estándar** (visibles para todos los usuarios autenticados):

| Sección | Descripción |
|---|---|
| Panel | La pantalla de inicio. |
| Formularios | Formularios de recopilación de datos y envíos. |
| Informes | Informes generados. |
| Agregación | Vista unificada de los envíos de varios formularios. |
| Métricas | Datos de referencia (proyectos, ubicaciones, organizaciones, etc.). *(Oculta para usuarios solo invitados.)* |
| IA | Asistente de IA (DinoGPT). |

**Secciones de administración** (visibles solo para administradores, mostradas debajo de un separador):

| Sección | Descripción |
|---|---|
| Usuarios | Cuentas de usuario y grupos de permisos. |
| Idiomas | Gestión de la traducción de la interfaz. |

En pantallas grandes, el menú siempre está visible a la izquierda. En pantallas más pequeñas, se contrae y se puede abrir con el **botón de menú** (icono de hamburguesa) de la barra de herramientas superior. En cualquier tamaño de pantalla, haz clic en el botón de menú para expandir las etiquetas del menú o contraerlas y mostrar solo los iconos.

---

## Barra de herramientas superior

La barra de herramientas situada en la parte superior de la pantalla contiene los siguientes controles, de izquierda a derecha:

- **Alternador del menú** — abre o contrae el menú lateral.
- **Logotipo** — muestra el logotipo de tu organización o el de Dino.
- **Indicador de nueva versión** — aparece un icono de descarga cuando hay una nueva versión de Dino disponible. Haz clic en él para recargar la aplicación y aplicar la actualización.
- **Créditos DINO-AI** — muestra tu saldo de créditos de IA restante como una insignia. Haz clic para abrir el [área de usuario](#user-area) en el panel de créditos. *(Solo visible si se ha configurado una clave de API de DINO-AI.)*
- **Alternador de modo oscuro / claro** — un icono de sol, un control deslizante y un icono de luna. Usa el control deslizante para cambiar entre los temas claro y oscuro. *(Oculto en móvil: usa el área de usuario en su lugar.)*
- **Icono de información** — pasa el cursor por encima para ver la información de la versión de esta instalación.
- **Icono de ayuda** — abre la lista de reproducción del tutorial de Dino en una nueva pestaña.
- **Icono de configuración** — abre el [área de usuario](#user-area).
- **Icono de sincronización** — muestra el estado actual de la sincronización de datos. Haz clic para iniciar una sincronización manual.
- **Campana de notificaciones** — muestra el número de notificaciones no leídas como una insignia. La campana suena cuando llegan nuevas notificaciones. Consulta [Notificaciones](#notifications) más abajo.
- **Selector de idioma** — cambia el idioma de la interfaz.
- **Nombre de usuario** — haz clic para abrir el [área de usuario](#user-area).
- **Icono de cierre de sesión** — haz clic para cerrar sesión. El icono aparece atenuado mientras hay una sincronización en curso o cuando el dispositivo está sin conexión; el cierre de sesión no está disponible en esos estados.

---

## Sincronización de datos

Dino sincroniza tus datos con el servidor en segundo plano. El **icono de sincronización** de la barra de herramientas muestra el estado actual:

| Icono | Significado |
|---|---|
| `sync` (estático) | Todos los datos están actualizados. |
| `sync_problem` (pulsante) | Tienes cambios locales que aún no se han sincronizado. Haz clic para iniciar una sincronización. |
| `sync` (girando) | Hay una sincronización en curso. |
| `sync_disabled` | El dispositivo está sin conexión; la sincronización no está disponible. |
| `sync` con insignia `!` | Se ha producido un problema de sincronización. Consulta tus notificaciones para obtener más detalles. |

Cuando finaliza una sincronización, aparece brevemente una notificación en la parte inferior de la pantalla:

- *"Sincronización completada"* — todos los datos se sincronizaron correctamente.
- *"Sincronización completada con errores. No se pudieron sincronizar: [elementos]. Consulta tus notificaciones."* — una o varias recopilaciones de datos no se pudieron sincronizar. También se crea una notificación en tu lista de notificaciones.

---

## Notificaciones

Haz clic en el **icono de campana** de la barra de herramientas para abrir el menú desplegable de notificaciones. La insignia de la campana muestra el número de mensajes no leídos.

![Menú desplegable de notificaciones abierto](../imgs/interface/index-notifications.png)

Desde el menú desplegable puedes:

1.  **Hacer clic en una notificación** para marcarla como leída.
2.  **Hacer clic en el botón de flecha** de una notificación (si está presente) para ir directamente al área correspondiente de la aplicación.
3.  **Marcar todo como leído** — marca todas las notificaciones actuales como leídas.
4.  **Ver todas las notificaciones** — navega a la página completa de [Notificaciones](../notifications/index.md).

---

## Área de usuario

Haz clic en el **icono de configuración**, tu **nombre de usuario** o el **contador de créditos DINO-AI** para abrir el diálogo del área de usuario. En la parte superior se muestran tu nombre completo y tu dirección de correo electrónico.

![Diálogo del área de usuario abierto](../imgs/interface/index-user-area.png)

### Cambiar contraseña

1.  Introduce tu **Contraseña actual**.
2.  Introduce una **Nueva contraseña**.
3.  **Confirma la nueva contraseña**.
4.  Haz clic en el botón de flecha para guardar.

Aparecerá un mensaje de error si la contraseña actual es incorrecta o si las nuevas contraseñas no coinciden.

### Claves de API

Consulta o establece tu **clave de API de DINO-AI**. Una vez almacenada una clave válida, se muestra en modo de solo lectura. Usa el icono del ojo para mostrar u ocultar la clave, y el icono de copiar para copiarla al portapapeles.

### Créditos

Muestra tu **saldo actual de créditos DINO-AI**. Si se ha configurado una integración de pago, hay disponible un botón **Añadir más** para comprar créditos adicionales.

!!! tip "Visibilidad"
    Esta sección solo es visible cuando se ha configurado una clave de API de DINO-AI.

### Tema de DINO

Personaliza el esquema de colores de la aplicación:

- **Color primario**, **Color de acento**, **Color de advertencia** — haz clic en los campos de color para abrir un selector de color.
- **Nombre del preajuste** — escribe o selecciona un nombre para guardar o cargar un preajuste de color.
- Haz clic en **Guardar** para guardar los colores actuales como un preajuste con nombre, o en **Cargar** para aplicar un preajuste guardado.

En móvil, aquí también aparece un **alternador de modo oscuro / claro**.

### Tutoriales

Haz clic en **Iniciar el recorrido de Dino** para reiniciar desde el principio el recorrido guiado de la aplicación.

!!! tip "Disponibilidad"
    Esta sección solo se muestra si el recorrido guiado está configurado en tu instalación.

### Copia de seguridad y restauración

*(Solo administradores, si está habilitado.)*

- **Copia de seguridad de los datos** — descarga una exportación completa de la base de datos de la aplicación como archivo JSON.
- **Restaurar datos** — sube un archivo JSON exportado previamente para restaurar la base de datos.

!!! warning "Precaución al restaurar"
    Restaurar los datos reemplazará la base de datos actual. Esta acción no se puede deshacer.