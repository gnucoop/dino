---
title: Importar datos
description: Aprende a importar datos de forma masiva en cualquier esquema de formulario usando un archivo CSV o Excel. El asistente de dos pasos te permite subir un archivo y luego asignar sus columnas a los campos del formulario.
---

# Importar datos

La página **Importar datos** te permite cargar envíos de forma masiva en un esquema de formulario desde un archivo `.xls`, `.xlsx` o `.csv`. Un asistente de dos pasos te guía en la carga del archivo y en la asignación de las columnas del archivo a los campos del formulario.

![Main view of the Import Data page](../imgs/forms/import.png)

## Acceder a la página de importación

1. Ve a la lista de **Formularios** y selecciona un esquema de formulario.
2. Desde la vista de datos del formulario, haz clic en **Importar** (el botón de la barra de herramientas).

## Paso 1 — Subir archivo

El primer paso muestra una zona de arrastrar y soltar o un selector de archivos.

- **Formatos aceptados:** `.xls`, `.xlsx`, `.csv`
- **Tamaño máximo del archivo:** 20 MB

Para subir un archivo:

1. Arrastra un archivo a la zona punteada **o** haz clic en **Elegir un archivo** para buscarlo.
2. Después de seleccionarlo, el nombre del archivo aparece en un chip junto con el número de columnas detectadas.
3. (Opcional) Deja marcada la opción **Reutilizar métricas existentes con el mismo nombre** (es el valor por defecto) para que cualquier métrica del archivo cuyo nombre coincida con una métrica ya existente en el sistema se vincule a esa métrica existente en lugar de crear un duplicado. Desmárcala para crear siempre métricas nuevas.
4. Haz clic en **Siguiente** (o en la etiqueta del indicador de pasos «2 · Asignar campos») para continuar.

!!! tip "Formatos de archivo"
    Dino acepta los mismos tipos de archivo que se usan para la recolección de datos estándar. Asegúrate de que los encabezados de tus columnas sean claros; se usarán como sugerencias durante la asignación.

!!! note "Métricas identificadas por ID"
    Si una columna de métricas en tu archivo incluye el **ID** (UUID) de la métrica, esa fila se vincula a la métrica existente con ese ID y no se crea ninguna métrica nueva. El ID tiene prioridad sobre el nombre de la métrica, por lo que esto ocurre independientemente de la opción **Reutilizar métricas existentes con el mismo nombre** (que solo aplica a la coincidencia por nombre).

## Paso 2 — Asignar campos

Después de subir el archivo, verás una tabla con todas las columnas del archivo. Cada fila tiene tres columnas:

- **Columna del archivo** – el encabezado original de tu archivo.
- **Campo del formulario** – un menú desplegable en el que seleccionas el campo correspondiente del formulario.
- **Estado** – indica si la columna está asignada, ignorada o tiene un error.

### Acciones de asignación

- **Seleccionar un campo del formulario** – abre el desplegable de una columna y elige el campo correcto. Puedes buscar dentro del desplegable.
- **Ignorar una columna** – selecciona la opción **— Ignorar esta columna —** en el desplegable, o haz clic en el botón **Ignorar** de la columna Estado. Las columnas ignoradas se muestran atenuadas.
- **Restaurar una columna ignorada** – haz clic en el botón **Restaurar** de la columna Estado.

### Coincidencia automática

Haz clic en **Coincidencia automática** para que Dino empareje automáticamente las columnas con los campos del formulario según la similitud de los nombres. Es un buen punto de partida: revisa y ajusta las asignaciones según sea necesario.

!!! tip "La coincidencia automática funciona mejor con encabezados que coinciden exactamente con las etiquetas de los campos o que contienen palabras clave similares."

### Repetición

Si el campo del formulario seleccionado es un campo repetible (p. ej., varios números de teléfono), aparece un campo **Repetición** debajo del desplegable. Introduce el índice de repetición (0, 1, 2, …) para asignar esta columna del archivo a una de las ocurrencias del grupo repetible.

### Resumen de la barra de herramientas

En la parte superior del área de asignación, puedes ver tres chips:

- **Total de columnas** – número de columnas del archivo.
- **Asignadas** – columnas que se han asignado a un campo del formulario.
- **Ignoradas** – columnas que has elegido ignorar.

Usa el campo **Buscar columnas** para filtrar la tabla por nombre de columna del archivo.

## Aplicar importación

Cuando todas las columnas deseadas estén asignadas y no haya errores, el botón **Aplicar importación** se habilitará. Haz clic en él para iniciar la importación. Mientras se procesa, aparece un spinner. Puedes hacer clic en **Atrás** para volver al paso 1 o cancelar la importación.

Después de una importación correcta, volverás a la lista de datos del formulario, donde aparecerán los nuevos envíos.

!!! warning "Asignación duplicada"
    Si asignas el mismo campo del formulario a más de una columna del archivo, se mostrará un error de validación y el botón **Aplicar importación** permanecerá deshabilitado hasta que lo corrijas.