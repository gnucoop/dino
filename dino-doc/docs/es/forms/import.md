---
title: Importar datos
description: Aprende a importar datos estructurados en lote a cualquier esquema de formulario usando un archivo CSV o Excel. El asistente de dos pasos te permite cargar un archivo y luego asignar sus columnas a los campos del formulario.
---

# Importar datos

La página **Importar datos** te permite cargar envíos en lote a un esquema de formulario desde un archivo `.xls`, `.xlsx` o `.csv`. Un asistente de dos pasos te guía para cargar el archivo y asignar sus columnas a los campos del formulario.

![Vista principal de la página Importar datos](../imgs/forms/import.png)

## Acceder a la página de importación

1. Navega a la lista de **Formularios** y selecciona un esquema de formulario.
2. Desde la vista de datos del formulario, haz clic en **Importar** (el botón de la barra de herramientas).

## Paso 1 — Cargar archivo

El primer paso muestra una zona de arrastrar y soltar o un selector de archivos.

- **Formatos aceptados:** `.xls`, `.xlsx`, `.csv`
- **Tamaño máximo de archivo:** 20 MB

Para cargar:

1. Arrastra un archivo al área punteada **o** haz clic en **Elegir un archivo** para explorar.
2. Después de seleccionarlo, el nombre del archivo aparece en una etiqueta junto con la cantidad de columnas detectadas.
3. (Opcional) Deja marcado **Reutilizar métricas existentes con el mismo nombre** (opción predeterminada) para que cualquier métrica del archivo cuyo nombre coincida con una métrica que ya existe en el sistema se vincule a esa métrica existente en lugar de crear un duplicado. Desmárcalo para crear siempre nuevas métricas.
4. Haz clic en **Siguiente** (o en la etiqueta del paso «2 · Asignar campos») para continuar.

!!! tip "Formatos de archivo"
    Dino acepta los mismos tipos de archivo utilizados para la recolección de datos estándar. Asegúrate de que los encabezados de las columnas sean claros, ya que se usarán como sugerencias durante la asignación.

!!! note "Métricas identificadas por ID"
    Si una columna de métrica en tu archivo proporciona el **ID** (UUID) de la métrica, esa fila se vincula a la métrica existente con ese ID y no se crea ninguna métrica nueva. El ID tiene prioridad sobre el nombre de la métrica, por lo que esto ocurre independientemente de la opción **Reutilizar métricas existentes con el mismo nombre** (que solo se aplica a la coincidencia por nombre).

## Paso 2 — Asignar campos

Después de cargar, verás una tabla que enumera todas las columnas de tu archivo. Cada fila tiene tres columnas:

- **Columna del archivo** – el encabezado original de tu archivo.
- **Campo del formulario** – un menú desplegable donde seleccionas el campo correspondiente del formulario.
- **Estado** – indica si la columna está asignada, ignorada o tiene un error.

### Acciones de asignación

- **Seleccionar un campo del formulario** – abre el menú desplegable de una columna y elige el campo correcto. Puedes buscar dentro del menú.
- **Ignorar una columna** – selecciona la opción **— Ignorar esta columna —** en el menú desplegable, o haz clic en el botón **Ignorar** en la columna de estado. Las columnas ignoradas se muestran atenuadas.
- **Restaurar una columna ignorada** – haz clic en el botón **Restaurar** en la columna de estado.

### Asignación automática

Haz clic en **Asignación automática** para que Dino empareje automáticamente las columnas con los campos del formulario según la similitud de nombres. Este es un buen punto de partida: revisa y ajusta las asignaciones según sea necesario.

!!! tip "La asignación automática funciona mejor con encabezados que coinciden exactamente con las etiquetas de los campos o contienen palabras clave similares."

### Repetición

Si el campo del formulario seleccionado es un campo repetible (por ejemplo, varios números de teléfono), aparecerá un campo **Repetición** debajo del menú desplegable. Ingresa el índice de repetición (0, 1, 2, …) para asignar esta columna del archivo a una ocurrencia del grupo repetible.

### Resumen de la barra de herramientas

En la parte superior del área de asignación, puedes ver tres etiquetas:

- **Total de columnas** – número de columnas del archivo.
- **Asignadas** – columnas que se han asignado a un campo del formulario.
- **Ignoradas** – columnas que elegiste ignorar.

Usa el campo **Buscar columnas** para filtrar la tabla por nombre de columna del archivo.

## Aplicar importación

Cuando todas las columnas deseadas estén asignadas y no haya errores, el botón **Aplicar importación** se activará. Haz clic en él para iniciar la importación. Mientras se procesa, aparece un indicador de carga. Puedes hacer clic en **Atrás** para volver al paso 1 o cancelar la importación.

Después de una importación exitosa, volverás a la lista de datos del formulario, donde aparecerán los nuevos envíos.

!!! warning "Asignación duplicada"
    Si asignas el mismo campo del formulario a más de una columna del archivo, se mostrará un error de validación y el botón **Aplicar importación** permanecerá deshabilitado hasta que se corrija.