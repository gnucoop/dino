---
title: Agregación
description: Consulta y gestiona los envíos de formularios agregados en Dino.
---

# Agregación

La página de Agregación te ofrece una vista centralizada de todos los envíos de formularios realizados a través de tus esquemas de formularios. Puedes explorar, filtrar y realizar acciones sobre los envíos sin tener que abrir cada formulario individualmente.

![Main view of the Aggregation page](../imgs/aggregation/index.png)

## Ver la lista de Agregación

La tabla principal muestra una fila por envío. De forma predeterminada, verás las columnas **Esquema de formulario** y **Estado**, pero puedes personalizar qué columnas aparecen usando el icono **Ver columnas** en el encabezado de la tabla.

- Cada fila muestra un icono de estado y, si el formulario tiene problemas de validación, un icono de advertencia.
- Pasa el cursor sobre una fila para ver un resaltado; haz clic en cualquier parte de una fila para seleccionarla y ver las acciones disponibles.

En la parte superior de la lista, el contador de **Elementos encontrados** y el paginador te indican cuántos envíos existen y te permiten navegar entre páginas.

Si no aplicas ningún filtro a la lista en la página de Agregación, verás el número total de formularios enviados a tu Dino que tienes permitido ver, según los permisos de tu usuario.

## Filtrar y buscar

Hay una barra de búsqueda y un panel de filtros disponibles para reducir la lista.

1. Haz clic en el **icono de búsqueda** en la barra superior para expandir el panel de filtros.
2. Usa el campo de **palabra clave** para buscar en todos los campos.
3. Usa los selectores de **rango de fechas** para filtrar por fecha de creación.
4. Aparecen filtros adicionales para **Área**, **Caso**, **Ubicación**, **Organización**, **Proyecto**, **Estado del formulario** y **Usuario**. Estos son dinámicos y respetan las definiciones de métricas de tu formulario.
5. Los filtros activos se muestran como etiquetas debajo de la barra de filtros: haz clic en el icono **cancelar** de una etiqueta para eliminarla.

!!! tip "Filtros preestablecidos"
    La página de Agregación no admite filtros preestablecidos guardados. Puedes combinar filtros cada vez que necesites una vista personalizada.

## Acciones de fila

Después de seleccionar una fila, los iconos de acción aparecen en la columna **Acciones**, en el lado derecho de la tabla.

| Icono | Acción | Descripción |
|-------|--------|-------------|
| `view` | Ver | Abrir el envío en modo de solo lectura. |
| `edit` | Editar | Modificar los datos del envío. |
| `print` | Imprimir | Generar un PDF del envío. |
| `delete` | Eliminar | Eliminar el envío tras la confirmación. |

Haz clic en **Más opciones** (tres puntos) para ver acciones adicionales de esa fila. Las acciones **Imprimir** y **Eliminar** piden confirmación antes de ejecutarse.

## Crear un nuevo envío

El botón flotante **+** en la parte inferior derecha de la pantalla te permite comenzar un nuevo envío.

![Dialog to choose a form schema and start a new submission](../imgs/aggregation/index-new.png)

1. Haz clic en el botón **+**. Se abre un diálogo que muestra los esquemas de formulario disponibles.
2. Selecciona o busca el esquema de formulario que quieras usar.
3. Después de seleccionarlo, irás directamente a la página [Editar formulario](../forms/edit-form.md) para rellenar los datos.

## Imprimir un PDF

Puedes generar un PDF de cualquier envío que incluya la etiqueta del esquema de formulario, los nombres de las métricas activas y los datos completados.

1. En la fila que quieras imprimir, haz clic en el icono **Impresora** (o usa el menú **Más opciones** si está disponible).
2. Confirma la acción cuando se te solicite.
3. El PDF se abre en una nueva pestaña del navegador o se descarga automáticamente.

El encabezado del PDF incluye el título del esquema de formulario y todos los nombres de las métricas actualmente activas en el sistema.

!!! warning "Disponibilidad de métricas"
    El PDF impreso incluye solo las métricas que están activas en el momento en que se genera la impresión. Si una métrica se añadió después de que se creara el envío, no aparecerá.