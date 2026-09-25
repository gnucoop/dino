---
title: Agregación
description: Consulta y gestiona los datos de formularios agregados en Dino.
---

# Agregación

La página Agregación te ofrece una vista centralizada de todos los datos de formularios de tus form schemas. Puedes explorar, filtrar y realizar acciones sobre los datos de formularios sin necesidad de abrir cada formulario individualmente.

![Vista principal de la página Agregación](../imgs/aggregation/index.png)

## Consultar la lista de agregación

La tabla principal muestra una fila por cada dato. De forma predeterminada verás las columnas **Form Schema** y **Status**, pero puedes personalizar qué columnas aparecen usando el icono **Personaliza las columnas** en el encabezado de la tabla.

- Cada fila muestra un icono de estado y, si el formulario tiene problemas de validación, un icono de advertencia.
- Pasa el cursor sobre una fila para ver un resaltado; haz clic en cualquier parte de una fila para seleccionarla y mostrar las acciones disponibles.

En la parte superior de la lista, el contador **Items found** y el paginador te indican cuántos datos existen y te permiten navegar entre páginas.

Si no aplicas ningún filtro a la lista en la página Agregación, verás el número total de formularios enviados a tu Dino que tienes permitido ver, según los permisos de tu usuario.

## Filtro y búsqueda

Hay una barra de búsqueda y un panel de filtros disponibles para acotar la lista.

1. Haz clic en el **icono de búsqueda** en la barra superior para expandir el panel de filtros.
2. Usa el campo **keyword** para buscar en todos los campos.
3. Usa los selectores de **rango de fechas** para filtrar por fecha de creación.
4. Aparecen filtros adicionales para **Area**, **Case**, **Location**, **Organization**, **Project**, **Form Status** y **User**. Estos son dinámicos y respetan las definiciones de métricas de tu formulario.
5. Los filtros activos se muestran como chips debajo de la barra de filtros: haz clic en el **icono de cancelar** de un chip para eliminarlo.

!!! tip "Filtros preestablecidos"
    La página Agregación no admite filtros preestablecidos guardados. Puedes combinar filtros cada vez que necesites una visualización personalizada.

## Acciones de fila

Después de seleccionar una fila, los iconos de acción aparecen en la columna **Actions** en el lado derecho de la tabla.

| Icono | Acción | Descripción |
|------|--------|-------------|
| `view` | View | Abrir el dato en modo de solo lectura. |
| `edit` | Edit | Modificar los datos del formulario. |
| `print` | Print | Generar un PDF del dato. |
| `delete` | Delete | Eliminar el dato tras la confirmación. |

Haz clic en **More Horiz** (tres puntos) para ver acciones adicionales para esa fila. Las acciones **Print** y **Delete** piden confirmación antes de ejecutarse.

## Crear un nuevo dato

El botón flotante **+** en la esquina inferior derecha de la pantalla te permite iniciar un nuevo dato.

![Diálogo para elegir un form schema e iniciar un nuevo dato](../imgs/aggregation/index-new.png)

1. Haz clic en el botón **+**. Se abre un diálogo que muestra los form schemas disponibles.
2. Selecciona o busca el form schema que quieras usar.
3. Tras la selección, accederás directamente a la página [Edit Form](../forms/edit-form.md) para rellenar los datos.

## Imprimir un PDF

Puedes generar un PDF de cualquier dato que incluya la etiqueta del form schema, los nombres de las métricas activas y los datos rellenados.

1. En la fila que quieras imprimir, haz clic en el icono **Printer** (o usa el menú **More Horiz** si está disponible).
2. Confirma la acción cuando se te solicite.
3. El PDF se abre en una nueva pestaña del navegador o se descarga automáticamente.

El encabezado del PDF incluye el título del form schema y todos los nombres de las métricas actualmente activas en el sistema.

!!! warning "Disponibilidad de métricas"
    El PDF impreso incluye solo las métricas que están activas en el momento en que activas la impresión. Si se añadió una métrica después de crear el dato, no aparecerá.