---
title: Gestión de idiomas
description: Cómo administrar las traducciones de la aplicación, incluyendo añadir idiomas, editar texto y exportar archivos.
---

# Gestión de idiomas

La página **Idiomas** permite a los administradores gestionar todo el texto traducido que se utiliza en Dino. Desde aquí se pueden explorar, editar y agregar traducciones, gestionar qué idiomas están disponibles y exportar archivos de traducción para respaldo o edición.

![Vista principal de la página de Idiomas](../imgs/administration/languages.png)

!!! warning "Solo acceso de administrador"
    Esta área solo es visible para los usuarios con rol de Administrador. Si no la ves en la navegación, contacta con el administrador del sistema.

---

## Explorar traducciones

La vista principal muestra una lista de todas las entradas de traducción. Cada entrada presenta su **clave** —el identificador interno que usa la aplicación— y, cuando se selecciona un idioma, el texto traducido correspondiente.

Se muestra un indicador de carga mientras se obtienen los datos de traducción.

### Filtrar la lista

Dos controles en la parte superior de la página permiten acotar las entradas mostradas:

- **Búsqueda por palabra clave** — escribe cualquier palabra para filtrar las entradas cuya clave o traducción contengan ese texto. La lista se actualiza mientras escribes.
- **Selector de idioma** — una fila de botones muestra **Clave** y un botón por cada idioma disponible. Haz clic en el nombre de un idioma para mostrar las traducciones de ese idioma junto a cada clave. Las entradas sin traducción para el idioma seleccionado se muestran como *(Sin traducción)*.

---

## Editar una entrada de traducción

1. Haz clic en cualquier entrada de la lista para abrir el diálogo **Editar traducción**.
2. El diálogo muestra la **clave** y un campo de texto para cada idioma disponible.
3. Actualiza las traducciones según sea necesario.
4. Haz clic en **Guardar** para aplicar los cambios, o en **Deshacer** para cerrar sin guardar.

También puedes eliminar permanentemente una entrada individual desde este diálogo haciendo clic en el botón **Eliminar**. Esto borra la clave de traducción y todas sus traducciones asociadas.

!!! warning
    Eliminar una entrada de traducción es permanente. La clave y todos sus valores de idioma se eliminarán.

---

## Añadir una nueva entrada de traducción

Úsalo cuando necesites agregar una clave de traducción que aún no exista en el sistema.

1. Haz clic en el botón **+ Traducción** de la barra de herramientas.
2. Se abrirá el diálogo **Añadir traducción**. Contiene un campo de texto para cada idioma actualmente activo.
3. Introduce el texto de traducción para cada idioma según sea necesario.
4. Haz clic en **Guardar** para agregar la nueva entrada, o en **Deshacer** para cancelar.

Aparecerá brevemente un mensaje de confirmación después de guardar la entrada.

---

## Gestionar idiomas

Úsalo para añadir un nuevo idioma, actualizar las traducciones de un idioma existente o eliminar un conjunto de traducciones personalizadas.

1. Haz clic en el botón **Idioma** de la barra de herramientas.
2. Se abrirá el diálogo **Configuración de idioma**. Muestra una lista de idiomas disponibles y proporciona las siguientes acciones:
   - **Botón +** para añadir un nuevo idioma.
   - Haz clic en el nombre de un idioma en la lista para seleccionarlo y ver una vista previa de sus traducciones.
   - **Actualizar traducción** (con un idioma seleccionado) para subir un nuevo archivo JSON.
   - **Eliminar traducción personalizada** para borrar los datos de traducción personalizada del idioma seleccionado.

### Añadir un nuevo idioma

1. Haz clic en el **botón +** en la parte superior del diálogo.
2. Aparecerá un formulario pidiendo una **etiqueta de idioma** (el nombre que aparecerá en la interfaz, por ejemplo "Francés" o "fr").
3. Opcionalmente, sube un **archivo JSON de traducción** haciendo clic en **Añadir JSON** y seleccionando un archivo de tu dispositivo. El contenido del archivo se previsualizará antes de guardar.
4. Haz clic en **Guardar** para añadir el idioma, o en **Deshacer** para cancelar.

### Ver un idioma existente

Haz clic en el botón del nombre de un idioma para seleccionarlo. El diálogo mostrará una vista previa de todas las claves y valores de traducción almacenados actualmente para ese idioma.

### Actualizar las traducciones de un idioma

Con un idioma seleccionado, haz clic en **Actualizar traducción** para subir un nuevo archivo JSON. El diálogo previsualizará los cambios —nuevas claves añadidas y claves modificadas— antes de guardar.

1. Haz clic en **Actualizar traducción** y selecciona un archivo JSON de tu dispositivo.
2. Revisa la vista previa que muestra las filas añadidas y modificadas.
3. Haz clic en **Guardar** para aplicar la actualización, o en **Deshacer** para cancelar.

### Eliminar una traducción personalizada

Con un idioma seleccionado, haz clic en **Eliminar traducción personalizada** para borrar los datos de traducción personalizada de ese idioma.

!!! warning
    Esto elimina las traducciones personalizadas del idioma seleccionado. El idioma en sí puede permanecer en el sistema, pero su contenido personalizado se perderá.

---

## Exportar traducciones

Puedes descargar los datos de traducción de cualquier idioma como un archivo JSON.

1. Haz clic en el botón **Exportar** (icono de descarga) de la barra de herramientas.
2. Se abrirá el diálogo **Exportar** mostrando una lista de idiomas disponibles.
3. Haz clic en el nombre del idioma que deseas exportar. Aparecerá una vista previa de sus datos de traducción a la derecha.
4. Haz clic en **Descargar** para guardar el archivo en tu dispositivo.