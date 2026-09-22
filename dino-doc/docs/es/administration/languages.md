---
title: Gestión de idiomas
description: Cómo gestionar las traducciones de la aplicación, incluida la adición de idiomas, la edición de texto y la exportación de archivos.
---

# Gestión de idiomas

La página **Idiomas** permite a los administradores gestionar todo el texto traducido que se utiliza en Dino. Desde aquí puedes consultar, editar y añadir traducciones, gestionar qué idiomas están disponibles y exportar archivos de traducción para respaldarlos o editarlos.

![Vista principal de la página Idiomas](../imgs/administration/languages.png)

!!! warning "Solo para administradores"
    Esta área solo es visible para los usuarios con el rol de Administrador. Si no la ves en la navegación, ponte en contacto con el administrador del sistema.

---

## Consultar las traducciones

La vista principal muestra una lista con todas las entradas de traducción. Cada entrada muestra su **clave** —el identificador interno que utiliza la aplicación— y, cuando se ha seleccionado un idioma, el texto traducido correspondiente.

Mientras se cargan los datos de traducción se muestra un indicador de carga.

### Filtrar la lista

Dos controles situados en la parte superior de la página te permiten acotar las entradas que se muestran:

- **Búsqueda por palabra clave** — escribe cualquier palabra para filtrar las entradas cuya clave o traducción contenga ese texto. La lista se actualiza a medida que escribes.
- **Selector de idioma** — una fila de botones muestra **Clave** y un botón por cada idioma disponible. Haz clic en el nombre de un idioma para mostrar sus traducciones junto a cada clave. Las entradas que no tengan traducción para el idioma seleccionado se muestran como *(Sin traducción)*.

---

## Editar una entrada de traducción

1. Haz clic en cualquier entrada de la lista para abrir el cuadro de diálogo **Editar traducción**.
2. El cuadro de diálogo muestra la **clave** y un campo de texto por cada idioma disponible.
3. Actualiza las traducciones según sea necesario.
4. Haz clic en **Guardar** para aplicar los cambios, o en **Deshacer** para cerrar sin guardar.

También puedes eliminar permanentemente una entrada individual desde este cuadro de diálogo haciendo clic en el botón **Eliminar**. Esto borra la clave de traducción y todas sus traducciones asociadas.

!!! warning
    Eliminar una entrada de traducción es permanente. Se borrarán la clave y todos sus valores de idioma.

---

## Añadir una nueva entrada de traducción

Utiliza esta opción cuando necesites añadir una clave de traducción que aún no existe en el sistema.

1. Haz clic en el botón **+ Traducción** de la barra de herramientas.
2. Se abrirá el cuadro de diálogo **Añadir traducción**. Contiene un campo de texto por cada idioma activo en ese momento.
3. Introduce el texto de la traducción para cada idioma según sea necesario.
4. Haz clic en **Guardar** para añadir la nueva entrada, o en **Deshacer** para cancelar.

Tras guardar la entrada aparecerá brevemente un mensaje de confirmación.

---

## Gestionar los idiomas

Utiliza esta opción para añadir un nuevo idioma, actualizar las traducciones de un idioma existente o eliminar un conjunto de traducciones personalizado.

1. Haz clic en el botón **Idioma** de la barra de herramientas.
2. Se abrirá el cuadro de diálogo **Configuración de idiomas**. Muestra una lista de los idiomas disponibles y ofrece las siguientes acciones:
   - **Botón +** para añadir un nuevo idioma.
   - Haz clic en el nombre de un idioma de la lista para seleccionarlo y ver una vista previa de sus traducciones.
   - **Actualizar traducción** (con un idioma seleccionado) para subir un nuevo archivo JSON.
   - **Eliminar traducción personalizada** para borrar los datos de traducción personalizada del idioma seleccionado.

### Añadir un nuevo idioma

1. Haz clic en el **botón +** situado en la parte superior del cuadro de diálogo.
2. Aparecerá un formulario que solicita una **etiqueta de idioma** (el nombre que aparecerá en la interfaz, por ejemplo "Francés" o "fr").
3. Opcionalmente, sube un **archivo de traducción JSON** haciendo clic en **Añadir JSON** y seleccionando un archivo de tu dispositivo. El contenido del archivo se mostrará en una vista previa antes de guardarlo.
4. Haz clic en **Guardar** para añadir el idioma, o en **Deshacer** para cancelar.

### Ver un idioma existente

Haz clic en el botón con el nombre de un idioma para seleccionarlo. El cuadro de diálogo mostrará una vista previa de todas las claves y valores de traducción almacenados actualmente para ese idioma.

### Actualizar las traducciones de un idioma

Con un idioma seleccionado, haz clic en **Actualizar traducción** para subir un nuevo archivo JSON. El cuadro de diálogo mostrará una vista previa de los cambios —claves añadidas y claves modificadas— antes de que guardes.

1. Haz clic en **Actualizar traducción** y selecciona un archivo JSON de tu dispositivo.
2. Revisa la vista previa con las filas añadidas y modificadas.
3. Haz clic en **Guardar** para aplicar la actualización, o en **Deshacer** para cancelar.

### Eliminar una traducción personalizada

Con un idioma seleccionado, haz clic en **Eliminar traducción personalizada** para borrar los datos de traducción personalizada de ese idioma.

!!! warning
    Esto elimina las traducciones personalizadas del idioma seleccionado. Es posible que el idioma permanezca en el sistema, pero su contenido personalizado se perderá.

---

## Exportar traducciones

Puedes descargar los datos de traducción de cualquier idioma como archivo JSON.

1. Haz clic en el botón **Exportar** (icono de descarga) de la barra de herramientas.
2. Se abrirá el cuadro de diálogo **Exportar** con una lista de los idiomas disponibles.
3. Haz clic en el nombre del idioma que quieras exportar. A la derecha aparecerá una vista previa de sus datos de traducción.
4. Haz clic en **Descargar** para guardar el archivo en tu dispositivo.