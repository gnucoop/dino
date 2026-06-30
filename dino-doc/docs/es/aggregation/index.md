---
title: Agregación
description: Ver y gestionar los envíos de formularios agregados en Dino.
---

# Agregación

La página de Agregación te ofrece una vista centralizada de todos los envíos de formularios en tus proyectos. Puedes explorar, filtrar y realizar acciones sobre los envíos sin tener que abrir cada formulario individualmente.

![Main view of the Aggregation page](../imgs/aggregation/index.png)

## Visualización de la lista de agregación

La tabla principal muestra una fila por cada envío. Por defecto, ves las columnas **Esquema del formulario** y **Estado**, pero puedes personalizar las columnas que aparecen usando el icono **View Week** en el encabezado de la tabla.

- Cada fila muestra un icono de estado y, si el formulario tiene problemas de validación, un icono de advertencia.
- Pasa el cursor sobre una fila para ver un resaltado; haz clic en cualquier lugar de una fila para seleccionarla y mostrar las acciones disponibles.

En la parte superior de la lista, el contador **Elementos encontrados** y el paginador te permiten saber cuántos envíos existen y navegar por las páginas.

## Filtrado y búsqueda

Hay una barra de búsqueda y un panel de filtros disponibles para reducir la lista.

1. Haz clic en el **icono de búsqueda** en la barra superior para expandir el panel de filtros.
2. Usa el campo **palabra clave** para buscar en todos los campos.
3. Usa los selectores de **rango de fechas** para filtrar por fecha de creación.
4. Aparecen filtros adicionales para **Área**, **Caso**, **Ubicación**, **Organización**, **Proyecto**, **Estado del formulario** y **Usuario**. Estos son dinámicos y respetan las definiciones de métricas de tu formulario.
5. Los filtros activos se muestran como chips debajo de la barra de filtros: haz clic en el icono **cancelar** en un chip para eliminarlo.

!!! tip "Filtros predefinidos"
    La página de Agregación no admite filtros predefinidos guardados. Puedes combinar filtros cada vez que necesites una vista personalizada.

## Acciones de fila

Después de seleccionar una fila, los iconos de acción aparecen en la columna **Acciones** en el lado derecho de la tabla.

| Icono | Acción | Descripción |
|------|--------|-------------|
| `visibility` | Ver | Abre el envío en modo solo lectura. |
| `create` | Editar | Modifica los datos del envío. |
| `printer` | Imprimir | Genera un PDF del envío. |
| `delete` | Eliminar | Elimina el envío tras la confirmación. |

Haz clic en **More Horiz** (tres puntos) para ver acciones adicionales para esa fila. Las acciones **Imprimir** y **Eliminar** solicitan confirmación antes de ejecutarse.

## Crear un nuevo envío

El botón flotante **+** en la parte inferior derecha de la pantalla te permite iniciar un nuevo envío.

![Diálogo para elegir un esquema de formulario e iniciar un nuevo envío](../imgs/aggregation/index-new.png)

1. Haz clic en el botón **+**. Se abre un diálogo que muestra los esquemas de formulario disponibles.
2. Selecciona o busca el esquema de formulario que deseas usar.
3. Después de la selección, serás llevado directamente a la página [Editar formulario](../forms/edit-form.md) para completar los datos.

## Imprimir un PDF

Puedes generar un PDF de cualquier envío que incluya la etiqueta del esquema del formulario, los nombres de las métricas activas y los datos ingresados.

1. En la fila que deseas imprimir, haz clic en el icono **Impresora** (o usa el menú **More Horiz** si está disponible).
2. Confirma la acción cuando se te solicite.
3. El PDF se abre en una nueva pestaña del navegador o se descarga automáticamente.

El encabezado del PDF incluye el título del esquema del formulario y todos los nombres de métricas actualmente activos en el sistema.

!!! warning "Disponibilidad de métricas"
    El PDF impreso incluye solo las métricas que están activas en el momento en que inicias la impresión. Si se agregó una métrica después de crear el envío, no aparecerá.
