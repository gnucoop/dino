---
title: Gestión de Idiomas
description: Cómo gestionar las traducciones de la aplicación, incluyendo agregar idiomas, editar texto y exportar archivos.
---

# Gestión de Idiomas

La página **Idiomas** permite a los administradores gestionar todo el texto traducido que se utiliza en Dino. Desde aquí, puedes navegar, editar y agregar traducciones, gestionar qué idiomas están disponibles y exportar archivos de traducción para respaldo o edición.

![Gestión de Idiomas](../imgs/administration/languages.png)

!!! warning "Solo acceso de administrador"
    Esta área solo es visible para usuarios con el rol de Administrador. Si no puedes verla en la navegación, contacta a tu administrador del sistema.

---

## Navegando por las Traducciones

La vista principal muestra una lista de todas las entradas de traducción. Cada entrada muestra su **clave** — el identificador interno utilizado por la aplicación — y, cuando se selecciona un idioma, el texto traducido correspondiente.

Se muestra un indicador de carga mientras se obtienen los datos de traducción.

### Filtrando la Lista

Dos controles en la parte superior de la página te permiten reducir las entradas mostradas:

- **Búsqueda por palabra clave** — escribe cualquier palabra para filtrar las entradas cuya clave o traducción contenga ese texto. La lista se actualiza mientras escribes.
- **Selector de idioma** — una fila de botones muestra **Clave** y un botón por cada idioma disponible. Haz clic en el nombre de un idioma para mostrar las traducciones de ese idioma junto a cada clave. Las entradas sin traducción para el idioma seleccionado se muestran como *(Sin traducción)*.

---

## Editando una Entrada de Traducción

1. Haz clic en cualquier entrada de la lista para abrir el diálogo **Editar Traducción**.
2. El diálogo muestra la **clave** y un campo de texto para cada idioma disponible.
3. Actualiza las traducciones según sea necesario.
4. Haz clic en **Guardar** para aplicar tus cambios, o en **Deshacer** para cerrar sin guardar.

También puedes eliminar permanentemente una entrada individual desde este diálogo haciendo clic en el botón **Eliminar**. Esto borra la clave de traducción y todas sus traducciones asociadas.

!!! warning
    Eliminar una entrada de traducción es permanente. La clave y todos sus valores de idioma serán borrados.

---

## Agregando una Nueva Entrada de Traducción

Utiliza esto cuando necesites agregar una clave de traducción que aún no existe en el sistema.

1. Haz clic en el botón **+ Traducción** en la barra de herramientas.
2. Se abrirá el diálogo **Agregar Traducción**. Contiene un campo de texto por cada idioma actualmente activo.
3. Introduce el texto traducido para cada idioma según sea necesario.
4. Haz clic en **Guardar** para agregar la nueva entrada, o en **Deshacer** para cancelar.

Aparecerá un mensaje de confirmación brevemente después de que se haya guardado la entrada.

---

## Gestionando Idiomas

Utiliza esto para agregar un nuevo idioma, actualizar las traducciones de un idioma existente o eliminar un conjunto de traducciones personalizado.

1. Haz clic en el botón **Idioma** en la barra de herramientas.
2. Se abrirá el diálogo **Configuración de Idioma**. Muestra una lista de idiomas disponibles y proporciona las siguientes acciones:

### Agregando un Nuevo Idioma

1. Haz clic en el botón **+** en la parte superior del diálogo.
2. Aparecerá un formulario solicitando una **etiqueta de idioma** (el nombre que aparecerá en la interfaz, por ejemplo "Francés" o "fr").
3. Opcionalmente, sube un **archivo de traducción JSON** haciendo clic en **Agregar JSON** y seleccionando un archivo desde tu dispositivo. El contenido del archivo se previsualizará antes de guardar.
4. Haz clic en **Guardar** para agregar el idioma, o en **Deshacer** para cancelar.

### Viendo un Idioma Existente

Haz clic en un botón con el nombre de un idioma para seleccionarlo. El diálogo mostrará una vista previa de todas las claves y valores de traducción almacenados actualmente para ese idioma.

### Actualizando las Traducciones de un Idioma

Con un idioma seleccionado, haz clic en **Actualizar traducción** para subir un nuevo archivo JSON. El diálogo previsualizará los cambios — claves nuevas agregadas y claves modificadas — antes de que guardes.

1. Haz clic en **Actualizar traducción** y selecciona un archivo JSON desde tu dispositivo.
2. Revisa la vista previa que muestra las filas agregadas y modificadas.
3. Haz clic en **Guardar** para aplicar la actualización, o en **Deshacer** para cancelar.

### Eliminando una Traducción Personalizada

Con un idioma seleccionado, haz clic en **Eliminar traducción personalizada** para borrar los datos de traducción personalizados para ese idioma.

!!! warning
    Esto elimina las traducciones personalizadas para el idioma seleccionado. El idioma en sí puede permanecer en el sistema, pero su contenido personalizado se perderá.

---

## Exportando Traducciones

Puedes descargar los datos de traducción para cualquier idioma como un archivo JSON.

1. Haz clic en el botón **Exportar** (icono de descarga) en la barra de herramientas.
2. Se abrirá el diálogo **Exportar** mostrando una lista de idiomas disponibles.
3. Haz clic en el nombre del idioma que deseas exportar. Aparecerá una vista previa de sus datos de traducción a la derecha.
4. Haz clic en **Descargar** para guardar el archivo en tu dispositivo.