---
title: Mapa de Formularios
description: Visualice los envíos de formularios en un mapa interactivo con opciones de filtrado.
---

# Mapa de Formularios

La página Mapa de Formularios muestra sus envíos de formularios en un mapa interactivo, permitiéndole visualizar datos geográficamente. Puede filtrar los envíos por fecha y por campos de datos específicos para enfocarse en la información que necesita.

![Vista principal de la página Mapa de Formularios](../imgs/forms/forms-map.png)

La página consta de dos áreas principales:

*   **El mapa**: un mapa interactivo que muestra marcadores agrupados para cada envío. Cada marcador se coloca según los datos de ubicación del envío.
*   **El panel de filtros**: un conjunto de controles laterales para filtrar los datos mostrados en el mapa.

## Ver detalles de los envíos

Cada marcador en el mapa representa uno o varios envíos en una ubicación específica.

1.  Haga clic en un marcador para abrir su ventana emergente.
2.  La ventana emergente muestra el nombre de la ubicación y los valores de los campos de datos clave de ese envío.

## Filtrar envíos en el mapa

Use los filtros para reducir qué envíos aparecen en el mapa.

### 1. Filtrar por rango de fechas

1.  En el campo **Rango de fechas**, haga clic en el ícono del calendario.
2.  Seleccione una fecha de inicio y una fecha de finalización en el selector de fechas.

### 2. Filtrar por campos de datos

Debajo del selector de fechas, verá varios campos de entrada de texto. Cada campo corresponde a una columna de datos de su formulario (por ejemplo, "Punto de atención", "Nacionalidad").

1.  Haga clic en cualquier campo (p. ej., "Nacionalidad").
2.  Empiece a escribir. Aparecerá una lista desplegable con valores coincidentes de sus datos existentes.
3.  Puede seleccionar un valor de la lista o escribir su propio texto para filtrar los envíos que contengan ese texto.
4.  Para borrar un filtro, haga clic en el ícono **X** que aparece dentro del campo.

!!! tip "Usar múltiples filtros"
    Puede aplicar filtros en varios campos simultáneamente. El mapa solo mostrará los envíos que cumplan **todos** los criterios de filtro activos.

### 3. Aplicar los filtros

Después de establecer el rango de fechas y los filtros de campo, haga clic en el botón **Aplicar Filtros**.

El mapa se actualizará y mostrará solo los marcadores de los envíos que coincidan con todos los criterios seleccionados. La vista del mapa también se acercará automáticamente para ajustarse a los marcadores filtrados.

!!! warning "Datos de ubicación requeridos"
    Los envíos solo pueden aparecer en el mapa si tienen coordenadas geográficas válidas asociadas a su ubicación. Los envíos sin estos datos no se mostrarán.