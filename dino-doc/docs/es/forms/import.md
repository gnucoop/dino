---
title: Importar datos
description: Aprende a importar datos estructurados de forma masiva en cualquier form schema utilizando un archivo CSV o Excel. El asistente de dos pasos te permite subir un archivo y luego asignar sus columnas a los campos del form.
---

# Importar datos

La página **Importar datos** te permite subir datos de forma masiva a un form schema desde un archivo `.xls`, `.xlsx` o `.csv`. Un asistente de dos pasos te guía a través de la carga del archivo y la asignación de las columnas del archivo a los campos del form.

![Vista principal de la página Importar datos](../imgs/forms/import.png)

## Acceder a la página de importación

1. Navega a la lista **Forms** y selecciona un form schema.
2. Desde la visualización de datos del form, haz clic en **Importar** (el botón de la barra de herramientas).

## Paso 1 — Subir archivo

El primer paso muestra una zona de arrastrar y soltar o un selector de archivos.

- **Formatos aceptados:** `.xls`, `.xlsx`, `.csv`
- **Tamaño máximo de archivo:** 20 MB

Para subir un archivo:

1. Arrastra un archivo a la zona punteada **o** haz clic en **Elegir un archivo** para buscarlo.
2. Tras la selección, el nombre del archivo aparece en una etiqueta junto con el número de columnas detectadas.
3. (Opcional) Deja marcada la opción **Reutilizar métricas existentes con el mismo nombre** (predeterminada) para que cualquier métrica del archivo cuyo nombre coincida con una métrica ya presente en el sistema se vincule a esa métrica existente en lugar de crear un duplicado. Desmárcala para crear siempre métricas nuevas.
4. Haz clic en **Siguiente** (o en la etiqueta del paso "2 · Asignar campos") para continuar.

### Formatear el archivo de importación
Consulta la descripción en la sección [más abajo](#formato-del-archivo)

!!! tip "Formatos de archivo sencillos"
    Dino acepta el mismo archivo obtenido durante la [exportación](index.md#exportar). Por lo tanto, la forma más sencilla de obtener un archivo correctamente formateado para la importación es exportar primero algunos datos de un form del mismo schema y luego eliminar las filas que contienen los datos exportados, conservando solo los encabezados de columna. En cualquier caso, asegúrate de que los encabezados de columna sean claros: se usarán como sugerencias durante la asignación.

!!! note "Métricas identificadas por ID"
    Si una columna de métrica en tu archivo proporciona el **ID** (UUID) de la métrica, esa fila se vincula a la métrica existente con ese ID y no se crea ninguna métrica nueva. El ID tiene prioridad sobre el nombre de la métrica, por lo que esto ocurre independientemente de la opción **Reutilizar métricas existentes con el mismo nombre** (que solo se aplica a la coincidencia por nombre).

## Paso 2 — Asignar campos

Tras la carga, verás una tabla que lista todas las columnas de tu archivo. Cada fila tiene tres columnas:

- **Columna del archivo** – el encabezado original de tu archivo.
- **Campo del form** – un menú desplegable donde seleccionas el campo del form correspondiente.
- **Estado** – muestra si la columna está asignada, ignorada o tiene un error.

### Acciones de asignación

- **Seleccionar un campo del form** – abre el menú desplegable de una columna y elige el campo correcto. Puedes buscar dentro del menú desplegable.
- **Ignorar una columna** – selecciona la opción **— Ignorar esta columna —** en el menú desplegable, o haz clic en el botón **Ignorar** en la columna de estado. Las columnas ignoradas aparecen atenuadas.
- **Restaurar una columna ignorada** – haz clic en el botón **Restaurar** en la columna de estado.

### Coincidencia automática

Haz clic en **Coincidencia automática** para que Dino empareje automáticamente las columnas con los campos del form según la similitud de nombres. Es un buen punto de partida: revisa y ajusta las asignaciones según sea necesario.

!!! tip "La coincidencia automática funciona mejor con encabezados que coinciden exactamente con las etiquetas de los campos o que contienen palabras clave similares."

### Repetición

Si un campo del form seleccionado es un campo repetible (por ejemplo, varios números de teléfono), aparece una entrada de **Repetición** debajo del menú desplegable. Introduce el índice de repetición (0, 1, 2, …) para asignar esta columna del archivo a una ocurrencia del grupo repetible.

### Resumen de la barra de herramientas

En la parte superior del área de asignación, puedes ver tres etiquetas:

- **Columnas totales** – número de columnas del archivo.
- **Asignadas** – columnas que se han asignado a un campo del form.
- **Ignoradas** – columnas que decidiste ignorar.

Usa la entrada **Buscar columnas** para filtrar la tabla por el nombre de la columna del archivo.

## Aplicar la importación

Cuando todas las columnas deseadas estén asignadas y no existan errores, el botón **Aplicar importación** se activa. Haz clic en él para iniciar la importación. Mientras se procesa, aparece un indicador de carga. Puedes hacer clic en **Atrás** para volver al paso 1 o cancelar la importación.

Tras una importación exitosa, vuelves a la lista de datos del form, donde aparecen los nuevos datos.

!!! warning "Asignación duplicada"
    Si asignas el mismo campo del form a más de una columna del archivo, se muestra un error de validación y el botón **Aplicar importación** permanece desactivado hasta que se corrija.


## Formato del archivo

Describimos el procedimiento para importar datos de forma masiva utilizando un archivo Excel generado desde Google Sheets. El mismo procedimiento es válido para archivos CSV o si trabajas directamente con Excel.

Supongamos que quieres importar datos en un form llamado Projects que tiene 2 diapositivas, una de las cuales es una diapositiva repetible:

![El form Projects, con dos diapositivas, una de las cuales es repetible](../imgs/forms/import-repeating-slide.png)

El form Projects se creó utilizando el siguiente XLSForm. La hoja "survey" es

| type | name | label |
| ----- | ----- | ----- |
| **begin group** | **start** | **Start** |
| select\_one countries | country | Country |
| select\_multiple countries | country\_other | Other Countries |
| text | title | Project Title |
| date | project\_date\_start | Start date |
| select\_one donors | selected\_donor | Donor |
| integer | budget | Budget |
| boolean | isleader | Leading applicant |
| **end group** |  |  |
| **begin repeat** | **indicators** | **Indicators** |
| text | indic | Indicator description |
| integer | value\_indic | Value reached |
| **end repeat** |  |  |

y la hoja "choices" es

| list\_name | name | label |
| ----- | ----- | ----- |
| donors | ue | UE |
| donors | govita | ITALIAN GOVERNMENT |
| donors | un | UN |
| donors | pub | ALTRI DONATORI PUBBLICI |
| donors | la | ENTI LOCALI |
| donors | priv | DONATORI PRIVATI |
| donors | other | Others |
|  |  |  |
| countries | AFG | Afghanistan |
| countries | ALB | Albania |
| countries | DZA | Algeria |
| countries | ASM | American Samoa |

Sigue estos pasos:

1. Crea un archivo vacío con una sola hoja (los nombres del archivo y de la hoja no importan).   
2. En la primera fila debes poner los nombres de los campos del form y de los campos específicos de DINO. En este ejemplo, los campos del form pueden ser:  
   1. **country**  
   2. **country\_other**  
   3. **title**  
   4. **project\_date\_start**  
   5. **selected\_donor**  
   6. **budget**  
   7. **isleader**  
   8. ***indic*** (\*)  
   9. ***value\_indic*** (\*)

   ten en cuenta que los campos que están dentro de diapositivas repetibles deben tratarse de forma diferente (por eso pusimos un asterisco). Consulta la sección específica más abajo.

   Los campos específicos de DINO pueden ser:

   10. **created\_at**. La fecha de creación del form. Especifica esto solo si quieres que tus forms tengan una fecha de creación diferente a la fecha de importación;  
   11. **user\_data\_ref\_id**. El ID del usuario que se asociará al form (por defecto es el ID del usuario que importa los forms);  
   12. **area\_id**. El ID de la métrica AREA que se asociará al form;  
   13. \[area\_name\]  
   14. **case\_id**. El ID de la métrica CASE que se asociará al form;  
   15. \[case\_name\]	  
   16. **project\_id**. El ID de la métrica PROJECT que se asociará al form;  
   17. \[project\_name\]  
   18. \[project\_code\]  
   19. **location\_id**. El ID de la métrica LOCATION que se asociará al form;  
   20. \[location\_name\]  
   21. **organization\_id**. El ID de la métrica ORGANISATION que se asociará al form;  
   22. \[organization\_name\]

3. cada fila corresponderá a un nuevo form diferente. Así, si creamos un archivo con un encabezado \+ digamos, 5 filas de datos, si la carga es exitosa, crearemos 5 nuevos forms en DINO.   
4. No es necesario tener una columna para cada campo del form; no es necesario rellenar todas las filas de una columna dada, pero si un campo está vacío en todas las filas, se puede omitir.   
5. Los campos de fecha deben estar formateados YYYY-MM-DD como texto (ten cuidado).   
6. Los campos de selección única deben contener una de las opciones aceptadas tal como se especifica en "choices" (consulta el constructor de forms o el archivo XLSForm).   
7. Los campos de selección múltiple deben formatearse según el siguiente patrón: \[opt1, opt2\] (es decir, una lista de opciones entre corchetes).

Por ejemplo, un archivo válido podría ser el siguiente:

| country | country\_other | title | project\_date\_start | budget | isleader | area\_id |
| :---- | :---- | :---- | :---- | ----- | :---- | :---- |
| ALB | \[AFG,DZA\] | Human rights in education | 2022-01-28 | 120000 | true | 81387ff7-5c7d-44e7-9dc6-76b8d09265ac |
| ASM |  | A new approach to social justice | 2022-02-14 | 20000 |  | 81387ff7-5c7d-44e7-9dc6-76b8d09265ac |

En este caso estamos importando 2 forms; para ambos seleccionamos solo la métrica AREA. Además, observa que no proporcionamos todos los campos del form para todos los forms, pero para los campos donde proporcionamos un valor, seguimos estrictamente las indicaciones descritas anteriormente.

### Gestionar las métricas durante la importación

Durante la importación de algunos datos, en lo que respecta a las métricas, es posible que quieras:

- crear nuevas métricas durante la importación  
- reutilizar métricas ya creadas

Las reglas a seguir para gestionar correctamente las métricas son las siguientes:

| MÉTRICA | CREACIÓN DESDE LA UI | CREACIÓN DESDE IMPORTACIÓN | CREACIÓN \+ ASIGNACIÓN DESDE IMPORTACIÓN | USO DESDE IMPORTACIÓN | CREACIÓN \+ ASIGNACIÓN DESDE IMPORTACIÓN (parent) | USO COMO PARENT |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| **Case** | name | name | name | id, o name (con la opción reuse), o ambos | name | id, o name (con la opción reuse), o ambos |
| **Organization** | name | name | name | id, o name (con la opción reuse), o ambos | name | id, o name (con la opción reuse), o ambos |
| **Location** | name | name | name | id, o name (con la opción reuse), o ambos | name | id, o name (con la opción reuse), o ambos |
| **Area** | name | name | name | id, o name (con la opción reuse), o ambos | name | id, o name (con la opción reuse), o ambos |
| **Project** | name, code | name, code | name, code | id | name, code | id |

## Diapositivas repetibles

Si tienes campos en diapositivas repetibles, deben nombrarse de forma diferente. Cada campo en la diapositiva repetible debe llamarse \<field\_name\>\_\_X donde X es el número de repetición, desde 0 (correspondiente a una repetición) hasta N-1, donde N es el número total de repeticiones de la diapositiva en ese form.   
Por ejemplo, supongamos que tienes solo 1 repetición de la diapositiva repetible y quieres añadir ambos campos "Indicator description" y "Value reached". Tendrías que añadir estas dos columnas a tu archivo de importación:

| indic\_\_0 | value\_indic\_\_0 |
|  :---- | ----- |
| Number of children | 100 |

Así, por ejemplo, podríamos tener:

| country | budget | indic\_\_0 | value\_indic\_\_0 | indic\_\_1 | value\_indic\_\_1 | isleader |
| :---- | ----- | :---- | ----- | :---- | ----- | :---- |
| ALB | 120000 | Children | 100 |  |  | true |
| ASM | 20000 |  |  |  |  |  |
| AFG | 15000 | Parents | 45 | Schools | 34 | true |

## Errores

Comprueba los ID de tu archivo antes de importar. Si una columna hace referencia a una entidad mediante su ID (una métrica o un usuario) y en Dino no existe ninguna entidad con ese ID, los formularios importados no podrán sincronizarse con el servidor.