---
title: Mapa de formularios
description: Visualice los datos de los formularios en un mapa interactivo con opciones de filtrado.
---

# Mapa de formularios

La página Mapa de formularios muestra los datos de sus formularios en un mapa interactivo, lo que le permite visualizar la información geográficamente. Puede filtrar los datos por fecha y por campos de datos específicos para centrarse en la información que necesita.

Esta página solo está disponible si la métrica de posiciones está activa en el form schema. Además, cada posición debe tener sus coordenadas rellenadas.

![Vista principal de la página Mapa de formularios](../imgs/forms/forms-map.png)

La página consta de dos áreas principales:

*   **El Mapa**: Un mapa interactivo que muestra marcadores agrupados para cada dato. Cada marcador se coloca según los datos de la posición en el dato.
*   **La barra de Filtros**: Un conjunto de controles en la parte superior de la página para filtrar los datos que se muestran en el mapa.

En la parte superior de la página, un contador muestra cuántos marcadores se están representando actualmente y cuántos elementos han encontrado los filtros activos.

!!! tip "Cambiar de visualización"
    Utilice los botones **Datos**, **Mapa** e **IA** de la barra de herramientas para moverse entre la tabla, el mapa y Datachat para el mismo form schema. El botón **Mapa** solo está habilitado cuando la métrica de posiciones está activa.

## Ver los detalles de los datos

Cada marcador del mapa representa uno o varios datos en una posición específica.

1.  Haga clic en un marcador para abrir su ventana emergente.
2.  La ventana emergente muestra el nombre de la posición seguido de los valores de las columnas de datos que ha mostrado para este form.
3.  Cuando varios datos comparten la misma posición, los marcadores se agrupan en un clúster. Haga clic en el clúster para ampliar hasta que aparezcan los marcadores individuales.

## Filtrar los datos en el mapa

Utilice los filtros para acotar qué datos aparecen en el mapa. La mayoría están en el cuadro de diálogo **Filtros**: haga clic en **Filtros** en la barra de herramientas para abrirlo, establezca los filtros en la pestaña **Simple** y, a continuación, haga clic en **Buscar** para aplicarlos.

### 1. Filtrar por rango de fechas

1.  En el cuadro de diálogo **Filtros**, haga clic en el icono del calendario del campo **Desde fecha**.
2.  Seleccione una fecha de inicio.
3.  Repita el proceso para el campo **Hasta la fecha** para establecer el final del rango.

### 2. Filtrar por campos de datos

Debajo de los campos de fecha, la pestaña **Simple** muestra varios campos de entrada. Cada campo corresponde a una columna de datos de su form (por ejemplo, "Punto de atención" o "Nacionalidad"), y también puede incluir campos de estado, usuario, posición, área, caso, organización o proyecto.

1.  Haga clic en cualquier campo (por ejemplo, "Nacionalidad").
2.  Empiece a escribir. Una lista desplegable muestra los valores coincidentes de sus datos existentes.
3.  Seleccione un valor de la lista, o escriba su propio texto para filtrar los datos que contengan ese texto.
4.  Para borrar un filtro, haga clic en el icono **X** que aparece dentro del campo.

Para los campos que aceptan más de un valor, puede marcar varias opciones en la lista desplegable antes de cerrarla.

!!! tip "Usar varios filtros"
    Puede aplicar filtros en varios campos al mismo tiempo. El mapa solo muestra los datos que coinciden con **todos** los criterios de filtro activos.

### 3. Usar filtros avanzados

1.  Haga clic en **Filtros** en la barra de herramientas para abrir el cuadro de diálogo de filtros.
2.  Cambie a la pestaña **Avanzado** para crear condiciones precisas, eligiendo el campo, el operador y el valor, y luego haga clic en **Crear Filtro**.
3.  Utilice **Todos** o **Cualquier** para decidir si los datos deben coincidir con todas las condiciones o con al menos una.
4.  Haga clic en **Buscar** para aplicar sus condiciones, o en **Restablecer los filtros** para empezar de nuevo.

Los filtros aplicados aparecen como chips debajo de la barra de herramientas. Haga clic en el icono **cancelar** de un chip para eliminar ese filtro concreto.

### 4. Guardar y reutilizar filtros

Si filtra este form con frecuencia, puede guardar su configuración como ajuste preestablecido desde el cuadro de diálogo **Filtros**. Los controles de ajustes preestablecidos no se muestran en pantallas pequeñas.

1.  Escriba un nombre en el campo **Elija un nombre preestablecido**.
2.  Haga clic en **Guardar** para almacenar la selección actual de filtros.
3.  Más adelante, elija el ajuste preestablecido de la lista y haga clic en **Aplicar** para restaurarlo.

### 5. Exportar los resultados

1.  Haga clic en **Exportar** en la barra de herramientas.
2.  Elija el formato de exportación y las columnas que desea incluir.
3.  Confirme para descargar un archivo que contenga los datos filtrados actualmente.

!!! warning "Se necesitan datos de posición"
    Los datos solo pueden aparecer en el mapa si tienen coordenadas geográficas válidas asociadas a su posición. Los datos que no tengan estos datos no se muestran, y no se cuentan entre los marcadores representados.

## Páginas relacionadas

*   [Forms](index.md)
*   [Editar form schema](edit-form-schema.md)
*   [Posiciones](../metrics/locations.md)
*   [Importar datos](import.md)