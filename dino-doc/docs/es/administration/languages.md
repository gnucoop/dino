---
title: Gestión de idiomas
description: Cómo gestionar las traducciones de la aplicación, incluyendo añadir idiomas, editar texto y exportar archivos.
---

# Gestión de idiomas

La página **Idiomas** permite a los administradores gestionar todo el texto traducido utilizado en Dino. Desde aquí puede explorar, editar y añadir traducciones, gestionar qué idiomas están disponibles y exportar archivos de traducción para copias de seguridad o para su edición.

![Vista principal de la página Idiomas](../imgs/administration/languages.png)

!!! warning "Solo acceso de administradores"
    Esta área solo es visible para los usuarios con el rol de Administrador. Si no puede verla en la navegación, póngase en contacto con el administrador del sistema.

---

## Exploración de traducciones

La vista principal muestra una lista de todas las entradas de traducción. Cada entrada muestra su **clave** — el identificador interno utilizado por la aplicación — y, cuando hay un idioma seleccionado, el texto traducido correspondiente.

Se muestra un indicador de carga mientras se obtienen los datos de traducción.

### Filtrado de la lista

Dos controles en la parte superior de la página le permiten reducir las entradas mostradas:

- **Búsqueda por palabra clave** — escriba cualquier palabra para filtrar las entradas cuya clave o traducción contenga ese texto. La lista se actualiza mientras escribe.
- **Selector de idioma** — una fila de botones muestra **Clave** y un botón para cada idioma disponible. Haga clic en un nombre de idioma para mostrar las traducciones de ese idioma junto a cada clave. Las entradas sin traducción para el idioma seleccionado se muestran como *(Sin traducción)*.

---

## Edición de una entrada de traducción

1. Haga clic en cualquier entrada de la lista para abrir el diálogo **Editar traducción**.
2. El diálogo muestra la **clave** y un campo de texto para cada idioma disponible.
3. Actualice las traducciones según sea necesario.
4. Haga clic en **Guardar** para aplicar los cambios, o en **Deshacer** para cerrar sin guardar.

También puede eliminar permanentemente una entrada individual desde este diálogo haciendo clic en el botón **Eliminar**. Esto elimina la clave de traducción y todas sus traducciones asociadas.

!!! warning
    La eliminación de una entrada de traducción es permanente. La clave y todos sus valores de idioma se eliminarán.

---

## Añadir una nueva entrada de traducción

Utilícelo cuando necesite añadir una clave de traducción que aún no exista en el sistema.

1. Haga clic en el botón **+ Traducción** de la barra de herramientas.
2. Se abrirá el diálogo **Añadir traducción**. Contiene un campo de texto para cada idioma actualmente activo.
3. Introduzca el texto de traducción para cada idioma según sea necesario.
4. Haga clic en **Guardar** para añadir la nueva entrada, o en **Deshacer** para cancelar.

Aparecerá un mensaje de confirmación brevemente después de que la entrada se haya guardado.

---

## Gestión de idiomas

Utilícelo para añadir un nuevo idioma, actualizar las traducciones de un idioma existente o eliminar un conjunto de traducciones personalizadas.

1. Haga clic en el botón **Idioma** de la barra de herramientas.
2. Se abrirá el diálogo **Configuración de idioma**. Muestra una lista de los idiomas disponibles y proporciona las siguientes acciones:
   - **Botón +** para añadir un nuevo idioma.
   - Haga clic en un nombre de idioma de la lista para seleccionarlo y ver una vista previa de sus traducciones.
   - **Actualizar traducción** (con un idioma seleccionado) para subir un nuevo archivo JSON.
   - **Eliminar traducción personalizada** para eliminar los datos de traducción personalizada del idioma seleccionado.

### Añadir un nuevo idioma

1. Haga clic en el **botón +** en la parte superior del diálogo.
2. Aparecerá un formulario en el que se solicita una **etiqueta de idioma** (el nombre que aparecerá en la interfaz, por ejemplo "Francés" o "fr").
3. Opcionalmente, suba un **archivo de traducción JSON** haciendo clic en **Añadir JSON** y seleccionando un archivo de su dispositivo. El contenido del archivo se mostrará en vista previa antes de guardarlo.
4. Haga clic en **Guardar** para añadir el idioma, o en **Deshacer** para cancelar.

### Visualización de un idioma existente

Haga clic en un botón de nombre de idioma para seleccionarlo. El diálogo mostrará una vista previa de todas las claves y valores de traducción almacenados actualmente para ese idioma.

### Actualización de las traducciones de un idioma

Con un idioma seleccionado, haga clic en **Actualizar traducción** para subir un nuevo archivo JSON. El diálogo mostrará una vista previa de los cambios — claves nuevas añadidas y claves modificadas — antes de guardar.

1. Haga clic en **Actualizar traducción** y seleccione un archivo JSON de su dispositivo.
2. Revise la vista previa que muestra las filas añadidas y modificadas.
3. Haga clic en **Guardar** para aplicar la actualización, o en **Deshacer** para cancelar.

### Eliminación de una traducción personalizada

Con un idioma seleccionado, haga clic en **Eliminar traducción personalizada** para eliminar los datos de traducción personalizada de ese idioma.

!!! warning
    Esto elimina las traducciones personalizadas del idioma seleccionado. El idioma en sí puede permanecer en el sistema, pero su contenido personalizado se perderá.

---

## Exportación de traducciones

Puede descargar los datos de traducción de cualquier idioma como archivo JSON.

1. Haga clic en el botón **Exportar** (icono de descarga) de la barra de herramientas.
2. Se abrirá el diálogo **Exportar** mostrando una lista de los idiomas disponibles.
3. Haga clic en el nombre del idioma que desea exportar. A la derecha aparecerá una vista previa de sus datos de traducción.
4. Haga clic en **Descargar** para guardar el archivo en su dispositivo.