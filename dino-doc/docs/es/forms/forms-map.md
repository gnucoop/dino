---
title: Mapa de formularios
description: Visualiza los datos de los formularios en un mapa interactivo con opciones de filtrado.
---

# Mapa de formularios

La página Mapa de formularios muestra los datos de tus formularios en un mapa interactivo, lo que te permite visualizar la información geográficamente. Puedes filtrar los datos por fecha y por campos de datos específicos para centrarte en la información que necesitas.

Esto solo está disponible si la métrica de ubicación está activa en este form schema. Además, para cada ubicación se debe rellenar el atributo de coordenadas.

![Vista principal de la página Mapa de formularios](../imgs/forms/forms-map.png)

La página consta de dos áreas principales:

*   **El mapa**: un mapa interactivo que muestra marcadores agrupados para cada dato. Cada marcador se coloca según los datos de ubicación del dato.
*   **El panel de filtros**: un conjunto de controles en el lateral para filtrar los datos mostrados en el mapa.

## Ver los detalles de los datos

Cada marcador del mapa representa uno o varios datos en una ubicación específica.

1.  Haz clic en un marcador para abrir su ventana emergente.
2.  La ventana emergente muestra el nombre de la ubicación y los valores de los campos de datos clave de ese dato.

## Filtrar los datos en el mapa

Utiliza los filtros para acotar qué datos aparecen en el mapa.

### 1. Filtrar por rango de fechas

1.  En el campo **Rango de fechas**, haz clic en el icono del calendario.
2.  Selecciona una fecha de inicio y una fecha de fin en el selector de fechas.

### 2. Filtrar por campos de datos

Debajo del selector de fechas verás varios campos de texto. Cada campo corresponde a una columna de datos de tu formulario (p. ej., "Punto de atención", "Nacionalidad").

1.  Haz clic en cualquier campo (p. ej., "Nacionalidad").
2.  Empieza a escribir. Aparecerá una lista desplegable con los valores coincidentes de tus datos existentes.
3.  Puedes seleccionar un valor de la lista o escribir tu propio texto para filtrar los datos que contengan ese texto.
4.  Para borrar un filtro, haz clic en el icono **X** que aparece dentro del campo.

!!! tip "Uso de varios filtros"
    Puedes aplicar filtros en varios campos a la vez. El mapa solo mostrará los datos que cumplan **todos** los criterios de filtro activos.

### 3. Aplicar los filtros

Después de establecer el rango de fechas y los filtros de campos, haz clic en el botón **Aplicar filtros**.

El mapa se actualizará y mostrará solo los marcadores de los datos que cumplan todos los criterios seleccionados. La vista del mapa también hará zoom automáticamente para ajustarse a los marcadores filtrados.

!!! warning "Se requieren datos de ubicación"
    Los datos solo pueden aparecer en el mapa si tienen coordenadas geográficas válidas asociadas a su ubicación. Los datos sin esta información no se mostrarán.