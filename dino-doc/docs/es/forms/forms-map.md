---
title: Mapa de formularios
description: Visualiza los envíos de formularios en un mapa interactivo con opciones de filtrado.
---

# Mapa de formularios

La página Mapa de formularios muestra los envíos de tus formularios en un mapa interactivo, permitiéndote visualizar los datos geográficamente. Puedes filtrar los envíos por fecha y por campos de datos específicos para centrarte en la información que necesitas.

![Main view of the Forms Map page](../imgs/forms/forms-map.png)

La página consta de dos áreas principales:

*   **El mapa**: Un mapa interactivo que muestra marcadores agrupados para cada envío. Cada marcador se coloca según los datos de ubicación del envío.
*   **El panel de filtros**: Un conjunto de controles laterales para filtrar los datos mostrados en el mapa.

## Visualización de los detalles de los envíos

Cada marcador en el mapa representa uno o más envíos en una ubicación específica.

1.  Haz clic en un marcador para abrir su ventana emergente.
2.  La ventana emergente muestra el nombre de la ubicación y los valores de los campos de datos clave de ese envío.

## Filtrar envíos en el mapa

Usa los filtros para reducir qué envíos aparecen en el mapa.

### 1. Filtrar por rango de fechas

1.  En el campo **Rango de fechas**, haz clic en el icono de calendario.
2.  Selecciona una fecha de inicio y una fecha de fin en el selector de fechas.

### 2. Filtrar por campos de datos

Debajo del selector de fechas, verás varios campos de entrada de texto. Cada campo corresponde a una columna de datos de tu formulario (p. ej., "Punto de atención", "Nacionalidad").

1.  Haz clic en cualquier campo (p. ej., "Nacionalidad").
2.  Comienza a escribir. Aparecerá una lista desplegable con los valores coincidentes de tus datos existentes.
3.  Puedes seleccionar un valor de la lista o escribir tu propio texto para filtrar los envíos que contengan ese texto.
4.  Para borrar un filtro, haz clic en el icono **X** que aparece dentro del campo.

!!! tip "Uso de múltiples filtros"
    Puedes aplicar filtros en varios campos simultáneamente. El mapa solo mostrará los envíos que coincidan con **todos** los criterios de filtro activos.

### 3. Aplicar tus filtros

Después de configurar el rango de fechas y los filtros de campo, haz clic en el botón **Aplicar filtros**.

El mapa se actualizará y mostrará solo los marcadores de los envíos que coincidan con todos los criterios seleccionados. La vista del mapa también se acercará automáticamente para ajustarse a los marcadores filtrados.

!!! warning "Datos de ubicación obligatorios"
    Los envíos solo pueden aparecer en el mapa si tienen coordenadas geográficas válidas asociadas a su ubicación. Los envíos sin estos datos no se mostrarán.